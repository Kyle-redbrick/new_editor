import Context from "./context";
import Block, {
  GameObject,
  Variable,
  FunctionBlock,
  Util,
  Callback
} from "./block";
import { STATE } from "./type";

class Line {
  constructor(props = {}) {
    this.id = props.id || Context.generateId();
    this.parent = props.parent;
    this.block =
      props.block ||
      new Block({
        parent: this,
        state: STATE.INSTANCE
      });
    this.lineNum = props.lineNum || null;
    this.folded = props.folded || false;
    this.disabled = props.disabled || false;
    this.comment = props.comment || null;
  }

  get type() {
    return "Line"
  }

  clone(parent) {
    const clone = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );
    clone.id = Context.generateId();
    clone.parent = parent;
    clone.block = this.block.clone(clone);
    return clone;
  }
  fold() {
    this.folded = true;
  }
  unfold() {
    this.folded = false;
  }
  isFoldable() {
    const callbackBlock = this.getCallbackBlock();
    return !!callbackBlock;
  }
  enable() {
    this.disabled = false;
  }
  disable() {
    this.disabled = true;
  }
  isDisabled() {
    if (this.disabled) {
      return true;
    } else {
      const disabledParentLine = this.findParent({
        type: "Line",
        disabled: true
      });
      return !!disabledParentLine;
    }
  }
  isLastSibling() {
    const siblings = this.getSiblings();
    const lastSibling = siblings[siblings.length - 1];
    return this === lastSibling;
  }
  isEmpty() {
    if (this.block) {
      return !this.block.data && !this.block.children;
    } else {
      return true;
    }
  }
  isEqual(line) {
    if(!(line instanceof Line)) {
      return false;
    }
    
    const blocks = this.getDisplayBlocks();
    const targetBlocks = line.getDisplayBlocks();
    if(blocks.length !== targetBlocks.length) {
      return false;
    }

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const targetBlock = targetBlocks[i];
      if(!block.isEqual(targetBlock)) {
        return false;
      }
    }
    return true;
  }

  moveBefore(targetLine) {
    const sourceParent = this.parent;
    const targetParent = targetLine.parent;

    const sourceSiblings = sourceParent.getLines();
    const sourceIndex = sourceSiblings.indexOf(this);
    sourceSiblings.splice(sourceIndex, 1);

    if (sourceParent === targetParent) {
      const targetIndex = sourceSiblings.indexOf(targetLine);
      sourceSiblings.splice(targetIndex, 0, this);
      return sourceIndex !== targetIndex;
    } else {
      const targetSiblings = targetParent.getLines();
      const targetIndex = targetSiblings.indexOf(targetLine);
      targetSiblings.splice(targetIndex, 0, this);
      this.parent = targetParent;
      return true;
    }
  }
  moveAfter(targetLine) {
    const sourceParent = this.parent;
    const targetParent = targetLine.parent;

    const sourceSiblings = sourceParent.getLines();
    const sourceIndex = sourceSiblings.indexOf(this);
    sourceSiblings.splice(sourceIndex, 1);

    const callbackBlock = targetLine.getCallbackBlock();
    if (callbackBlock && !targetLine.folded) {
      const targetSiblings = callbackBlock.getLines();
      targetSiblings.splice(0, 0, this);
      this.parent = callbackBlock;
      return !(sourceParent === callbackBlock && sourceIndex === 0);
    } else {
      const targetSiblings = targetParent.getLines();
      const targetIndex = targetSiblings.indexOf(targetLine) + 1;
      targetSiblings.splice(targetIndex, 0, this);
      this.parent = targetParent;
      return !(sourceParent === targetParent && sourceIndex === targetIndex);
    }
  }
  moveToLastOfContext() {
    const context = this.getParentContext();
    if (!context) return false;

    const sourceParent = this.parent;
    const sourceSiblings = sourceParent.getLines();
    const sourceIndex = sourceSiblings.indexOf(this);
    sourceSiblings.splice(sourceIndex, 1);

    const targetSiblings = context.getLines();
    const targetIndex = targetSiblings.length;
    targetSiblings.splice(targetIndex, 0, this);
    this.parent = context;

    return !(sourceParent === context && sourceIndex === targetIndex);
  }

  addEmptyAfter() {
    const line = new Line();
    this.addAfter(line);
    return line;
  }
  addAfter(line) {
    const callbackBlock = this.getCallbackBlock();
    if (callbackBlock && !this.folded) {
      callbackBlock.addLineAt(line, 0);
    } else {
      const siblings = this.getSiblings();
      const targetIndex = siblings.indexOf(this) + 1;
      siblings.splice(targetIndex, 0, line);
      line.parent = this.parent;
    }
  }

  getAvailableRootBlockTypes() {
    return [GameObject, Variable, FunctionBlock, Util];
  }
  checkAvailableForRootBlock(block) {
    const availableRootBlockTypes = this.getAvailableRootBlockTypes();
    for (let i in availableRootBlockTypes) {
      const availableRootBlockType = availableRootBlockTypes[i];
      if (block instanceof availableRootBlockType) {
        return true;
      }
    }
  }
  isAvailableParentFor(block) {
    const availableParentTypes = block.getAvailableParentTypes();
    return availableParentTypes.includes(Line);
  }

  addSibling() {
    const sibling = new Line({ parent: this.parent });
    if (this.parent instanceof Context) {
      this.parent.lines.push(sibling);
    } else if (this.parent instanceof Callback) {
      this.parent.children.push(sibling);
    }
  }
  getSiblings() {
    if (this.parent instanceof Context) {
      return this.parent.lines;
    } else if (this.parent instanceof Callback) {
      return this.parent.children;
    } else {
      return [];
    }
  }
  getNextDisplayLine() {
    const context = this.getParentContext();
    if (!context) return;
    const displayLines = context.getDisplayLines();
    const index = displayLines.indexOf(this);
    if (index >= 0) {
      return displayLines[index + 1];
    } else {
      return;
    }
  }
  getCallbackBlock() {
    const displayBlocks = this.getDisplayBlocks();
    const callbackBlock = displayBlocks.find(
      block => block instanceof Callback
    );
    return callbackBlock;
  }
  getDisplayBlocks() {
    const blocks = [];
    const lineId = this.id;
    Context.traverse(this, {
      onBlock(block) {
        const parentLine = block.getParentLine();
        if (parentLine.id === lineId) {
          blocks.push(block);
        }
      }
    });
    return blocks;
  }
  getDepth(depth = 0) {
    if (this.parent instanceof Callback) {
      const parentLine = this.parent.getParentLine();
      return parentLine.getDepth(depth + 1);
    } else {
      return depth;
    }
  }
  getParentContext() {
    return this.findParent({ type: "Context" });
  }
  findParent(where) {
    if (!this.parent) return;
    if (this.parent.match(where)) {
      return this.parent;
    } else {
      return this.parent.findParent(where);
    }
  }
  match(where) {
    const { type, id, lineNum, disabled } = where;
    if (type && type !== this.type)
      return false;
    if (id && id !== this.id) return false;
    if (lineNum && lineNum !== this.lineNum) return false;
    if (disabled && disabled !== this.disabled) return false;
    return true;
  }

  static fromJSON(json, parent) {
    const line = new Line({
      parent,
      folded: json.folded,
      disabled: json.disabled,
      comment: json.comment
    });
    line.block = Block.fromJSON(json.block, line);
    return line;
  }
  toJSON() {
    return {
      block: this.block.toJSON(),
      folded: this.folded,
      disabled: this.disabled
    };
  }
  toJavascript() {
    if (this.disabled) {
      return;
    } else {
      return this.block.toJavascript();
    }
  }
}

export default Line;
