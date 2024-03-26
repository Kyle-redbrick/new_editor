define("ace/theme/wizschool", [
  "require",
  "exports",
  "module",
  "ace/lib/dom",
], function (e, t, n) {
  (t.isDark = !1),
    (t.cssClass = "ace-wizschool"),
    (t.cssText = `
    .ace-wizschool {
      background-color: #2f3443;
      color: #ffffff;
    }
    .ace-wizschool .ace_gutter {
      // background: rgba(216, 216, 216, 0.2);
      color: #ffffff;
      z-index: 0; /* temporary */
    }
    .ace-wizschool .ace_print-margin {
      width: 1px;
      background-color: #2f3443;
    }
    .ace-wizschool .ace_cursor {
      color: #ffffff;
    }
    .ace-wizschool .ace_marker-layer .ace_selection {
      background: #999999;
    }
    .ace-wizschool.ace_multiselect .ace_selection.ace_start {
      box-shadow: 0 0 3px 0px #2f3443;
    }
    .ace-wizschool .ace_marker-layer .ace_step {
      background: #c6dbae;
    }
    .ace-wizschool .ace_marker-layer .ace_bracket {
      margin: -1px 0 0 -1px;
      border: 1px solid #bfbfbf;
    }
    .ace-wizschool .ace_marker-layer .ace_active-line {
      background: rgba(0, 0, 0, 0.071);
    }
    .ace-wizschool .ace_gutter-active-line {
      background-color: rgba(0, 0, 0, 0.071);
    }
    .ace-wizschool .ace_marker-layer .ace_selected-word {
      border: 1px solid #999999;
    }
    .ace-wizschool .ace_constant.ace_language {
      color: #ae81ff;
    }
    .ace-wizschool .ace_keyword,
    .ace-wizschool .ace_meta,
    .ace-wizschool .ace_variable.ace_language {
      color: #f92672;
    }
    .ace-wizschool .ace_invisible {
      color: #bfbfbf;
    }
    .ace-wizschool .ace_constant.ace_character,
    .ace-wizschool .ace_constant.ace_other {
      color: var(--editorColor06);
    }
    .ace-wizschool .ace_constant.ace_numeric {
      color: #ae81ff;
    }
    .ace-wizschool .ace_entity.ace_other.ace_attribute-name,
    .ace-wizschool .ace_support.ace_constant,
    .ace-wizschool .ace_support.ace_function {
      color: #ffffff;
    }
    .ace-wizschool .ace_fold {
      background-color: #66d9ef;
      border-color: #ffffff;
    }
    .ace-wizschool .ace_entity.ace_name.ace_tag,
    .ace-wizschool .ace_support.ace_class,
    .ace-wizschool .ace_support.ace_type {
      color: var(--editorColor02);
    }
    .ace-wizschool .ace_storage {
      color: #66d9ef;
    }
    .ace-wizschool .ace_string {
      color: #fd971f;
    }
    .ace-wizschool .ace_comment {
      color: rgba(128, 125, 124, 1);
    }
    .ace-wizschool .ace_indent-guide {
      border-right:1px solid var(--W_White);
    }
    .ace_entity.ace_name.ace_function {
      color: #a6e22e;
    }
    `);
  var r = e("../lib/dom");
  r.importCssString(t.cssText, t.cssClass);
});
(function () {
  window.require(["ace/theme/wizschool"], function (m) {
    if (typeof module == "object" && typeof exports == "object" && module) {
      module.exports = m;
    }
  });
})();
