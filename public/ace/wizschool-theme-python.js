define("ace/theme/wizschool-python", [
  "require",
  "exports",
  "module",
  "ace/lib/dom"
], function(e, t, n) {
  (t.isDark = !1),
    (t.cssClass = "ace-wizschool-python"),
    (t.cssText = `
    :root {
      --editorColor01: #66d9ef;
      --editorColor02: #f92672;
      --editorColor03: #fd971f;
      --editorColor04: #a6e22e;
      --editorColor05: #ae81ff;
      --editorColor06: #D3D3D3;
      --editorColor07: rgba(128, 125, 124, 1);
      --editorColor08: rgba(44, 158, 224, 0.2);
      --editorColor09: #272b37;
      --editorColor10: #141821;
      --editorColor11: #272b37;

      --editorColorWH: #2f3443;
      --editorColorBK: #FFFFFF;
      --editorColorLine: rgba(0, 0, 0, 0.071);
      --editorColorSelection: #999999;

      --editorColorStep: #c6dbae;
      --editorColorBracket: #bfbfbf;
      --editorColorFold: #FFFFFF;
    }
    
    .ace-wizschool-python {
      background-color: var(--editorColorWH);
      color: var(--editorColorBK);
      background: transparent;
    }
    .ace-wizschool-python .ace_gutter {
      // background: rgba(216, 216, 216, 0.2);
      color: var(--editorColorFold);
      z-index: 0; /* temporary */
    }
    .ace-wizschool-python .ace_print-margin {
      width: 1px;
      background-color: var(--editorColorWH);
    }
    .ace-wizschool-python .ace_cursor {
      color: white;
    }
    .ace-wizschool-python .ace_marker-layer .ace_selection {
      background: gray;
    }
    .ace-wizschool-python.ace_multiselect .ace_selection.ace_start {
      box-shadow: 0 0 3px 0px var(--editorColorWH);
    }
    .ace-wizschool-python .ace_marker-layer .ace_step {
      background: var(--editorColorStep);
    }
    .ace-wizschool-python .ace_marker-layer .ace_bracket {
      margin: -1px 0 0 -1px;
      border: 1px solid var(--editorColorBracket);
    }
    .ace-wizschool-python .ace_marker-layer .ace_active-line {
      background: var(--editorColorLine);
    }
    .ace-wizschool-python .ace_gutter-active-line {
      background-color: green;
    }
    .ace-wizschool-python .ace_marker-layer .ace_selected-word {
      border: 1px solid var(--editorColorSelection);
    }
    .ace-wizschool-python .ace_constant.ace_language {
      color: var(--editorColor05);
    }
    .ace-wizschool-python .ace_keyword {
      color : #DE677D
    },
    .ace-wizschool-python .ace_meta,
    .ace-wizschool-python .ace_variable.ace_language {
      color: var(--editorColor02);
    }
    .ace-wizschool-python .ace_invisible {
      color: var(--editorColorBracket);
    }
    .ace-wizschool-python .ace_constant.ace_character,
    .ace-wizschool-python .ace_constant.ace_other {
      color: var(--editorColor06);
    }
    .ace-wizschool-python .ace_constant.ace_numeric {
      color: #F1F257;
    }
    .ace-wizschool-python .ace_entity.ace_other.ace_attribute-name,
    .ace-wizschool-python .ace_support.ace_constant,
    .ace-wizschool-python .ace_support.ace_function {
      color: #B472FF;
    }
    .ace-wizschool-python .ace_fold {
      background-color: var(--editorColor01);
      border-color: var(--editorColorFold);
    }
    .ace-wizschool-python .ace_entity.ace_name.ace_tag,
    .ace-wizschool-python .ace_support.ace_class,
    .ace-wizschool-python .ace_support.ace_type {
      color: #CFCFD0;
    }
    .ace-wizschool-python .ace_storage {
      color: var(--editorColor01);
    }
    .ace-wizschool-python .ace_string {
      color: #52C8FF;
    }
    .ace-wizschool-python .ace_comment {
      color: #686868;
    }
    .ace-wizschool-python .ace_indent-guide {
      border-right:1px solid var(--W_White);
    }
    .ace_entity.ace_name.ace_function {
      color: #FF9D19;
    }
    `);
  var r = e("../lib/dom");
  r.importCssString(t.cssText, t.cssClass);
});
(function() {
  window.require(["ace/theme/wizschool-python"], function(m) {
    if (typeof module == "object" && typeof exports == "object" && module) {
      module.exports = m;
    }
  });
})();
