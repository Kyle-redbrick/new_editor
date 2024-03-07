import Line from "./line";
import Block, {
  GameObject,
  Property,
  Action,
  Constant,
  Util,
  Variable,
  Operator
} from "./block";

class Context {
  constructor(props = {}) {
    this.id = props.id || Context.generateId();
    this.lines = [new Line({ parent: this })];
    this.prototypesInfo = props.prototypesInfo;
    this.prototypeBlocks = props.prototypeBlocks || [];
  }

  get type() {
    return "Context"
  }

  clone() {
    const clone = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );
    clone.id = Context.generateId();
    clone.lines = this.lines.map(line => line.clone());
    return clone;
  }
  getLines() {
    return this.lines;
  }
  getDisplayLines() {
    const lines = [];
    let lineNum = 0;
    Context.traverse(this.lines, {
      onLine(line) {
        const parentLine = line.findParent({ type: "Line" });
        if (parentLine && parentLine.folded) {
          lineNum++;
        } else {
          if (line.block.data) {
            line.lineNum = lineNum;
            lineNum++;
          } else {
            line.lineNum = null;
          }
          lines.push(line);
        }
      }
    });
    return lines;
  }
  getLineAt(lineNum) {
    return this.getDisplayLines()[lineNum];
  }
  deleteLine(line) {
    const lines = line.parent.getLines();
    const index = lines.indexOf(line);
    if (index >= 0) lines.splice(index, 1);
  }

  getBlockWithId(blockId) {
    let _block;
    Context.traverse(this, {
      onBlock(block) {
        if (block.id === blockId) {
          _block = block;
        }
      }
    });
    return _block;
  }
  getBlockAt(lineNum, blockNum) {
    const line = this.getLineAt(lineNum);
    const blocks = line.getDisplayBlocks();
    return blocks[blockNum];
  }

  updatePrototypesInfo(prototypesInfo) {
    this.prototypesInfo = prototypesInfo;
    this.updatePrototypeBlocks();
  }
  updatePrototypeBlocks() {
    const { gameObjects, sceneIds, variables, strings } =
      this.prototypesInfo || {};
    this.prototypeBlocks = [
      ...GameObject.getPrototypeBlocks(gameObjects),
      ...Property.getPrototypeBlocks(),
      ...Action.getPrototypeBlocks(),
      ...Constant.getPrototypeBlocks({ gameObjects, sceneIds, strings }),
      ...Util.getPrototypeBlocks(),
      ...Variable.getPrototypeBlocks(variables),
      ...Operator.getPrototypeBlocks()
    ];
  }
  getGameObjectInfoWithName(name) {
    const { gameObjects } = this.prototypesInfo || {};
    if (!gameObjects) return;
    return gameObjects.find(gameObject => gameObject.name === name);
  }
  getPrototypeBlocks() {
    if (
      this.prototypesInfo &&
      this.prototypesInfo.filter &&
      Object.keys(this.prototypesInfo.filter).length > 0
    ) {
      return this.getFilteredPrototypeBlocks();
    } else {
      return this.prototypeBlocks;
    }
  }
  getFilteredPrototypeBlocks() {
    const { filter } = this.prototypesInfo;
    const filteredPrototypeBlocks = this.prototypeBlocks.filter(
      prototypeBlock => {
        for (let category in filter) {
          const categoryConstructor = Block.getConstructorByName(category);
          const categoryFilter = filter[category];
          if (prototypeBlock instanceof categoryConstructor) {
            if (categoryFilter.length > 0) {
              if (categoryFilter.includes(prototypeBlock.data)) {
                return true;
              }
            } else {
              return true;
            }
          }
        }
        return false;
      }
    );
    return filteredPrototypeBlocks;
  }

  static traverse(oobcObject, behavior) {
    const { onContext, onLine, onBlock } = behavior;
    if (oobcObject instanceof Context) {
      if (onContext) onContext(oobcObject);
      if (oobcObject.lines) Context.traverse(oobcObject.lines, behavior);
    } else if (oobcObject instanceof Array) {
      for (let i = 0; i < oobcObject.length; i++) {
        if (oobcObject[i]) Context.traverse(oobcObject[i], behavior);
      }
    } else if (oobcObject instanceof Line) {
      if (onLine) onLine(oobcObject);
      if (oobcObject.block) Context.traverse(oobcObject.block, behavior);
    } else if (oobcObject instanceof Block) {
      if (onBlock) onBlock(oobcObject);
      if (oobcObject.children) Context.traverse(oobcObject.children, behavior);
    } else {
      console.warn(
        "oobc context traverse warning::unknown oobcObject",
        oobcObject
      );
    }
  }
  findParent() {
    return null;
  }
  match(where) {
    const { type, id } = where;
    if (type && type !== this.type)
      return false;
    if (id && id !== this.id) return false;
    return true;
  }

  static generateId() {
    const charSet = "abcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 6; i++) {
      const index = Math.floor(Math.random() * charSet.length);
      id += charSet.substring(index, index + 1);
    }
    return id;
  }
  static fromJSON(json) {
    const contextJSON = json || { lines: [] }
    const context = new Context();
    const lines = contextJSON.lines.map(line => Line.fromJSON(line, context));
    context.lines = lines;
    return context;
  }
  toJSON() {
    return {
      lines: this.lines.map(line => line.toJSON())
    };
  }
  toJavascript() {
    let code = "";
    for (let i in this.lines) {
      const line = this.lines[i];
      const lineCode = line.toJavascript();
      if (lineCode) {
        if (code !== "") {
          code += "\n";
        }
        code += lineCode;
      }
    }
    return code;
  }
}

export default Context;
