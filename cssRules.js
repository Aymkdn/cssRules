(function(window, document, undefined) {
  /**
    @name $CSS()
    @class This is the object uses for all $CSS stuff
  */
  function $CSS() {
    if (!(this instanceof arguments.callee)) return new arguments.callee();
  }
  
  $CSS.prototype = {
    /**
     * @name $CSS().findRule
     * @description Find a CSS Rule 
     * @param {String} search The CSS rule to search for (e.g. "#content" or "h1" or ".myclass > p")
     * @param {String} [scope=""] If you want to search for a rule in a specific CSS file, you can provide the stylesheet filename
     * @return {Array} An array of objets {stylesheet:cssStyleSheet, rules:cssRulesList, index:IndexInRules, rule:cssRule}
     * @example
     *   
     */
    findRule:function(search, scope) {
      var sheets = document.styleSheets;
      var sheet, rules, i, j, len, result=[];
      var _this = this;
      search = search.toLowerCase();
      for (i=0; i<sheets.length; i++) {
        if (!scope || (scope && sheets[i].href && sheets[i].href.slice(-1 * scope.length) === scope)) {
          sheet=sheets[i];
          rules=sheet.cssRules ? sheet.cssRules : sheet.rules;
          // go thru all the rules for the selected sheet
          for (j=0, len=rules.length; j<len; j++){
            if (rules[j].selectorText && rules[j].selectorText.toLowerCase() === search) {
              result.push({stylesheet:sheet, rules:rules, index:j, rule:rules[j]})
            }
          }
        }
      }
      
      return result;
    },
    /**
     * @name $CSS().modifyRule
     * @description It will modify a rule
     * @param {Array} rules An array of object with {stylesheet, rule}
     * @param {String} prop The CSS property to change (e.g. "color" or "display" or "backgroundColor")
     * @param {String} val The new CSS value to apply
     */
    modifyRule:function(rules, prop, val) {
      for (var i=0; i<rules.length; i++)
        rules[i].rule.style[prop] = val;
      return this;
    },
    /**
     * @name $CSS().deleteRule
     * @description It will delete a rule
     * @param {Array} rules An array of object with {stylesheet, rule}
     * @param {String} prop The CSS property to change (e.g. "color" or "display" or "backgroundColor")
     * @param {String} val The new CSS value to apply
     */
    deleteRule:function(rules) {
      if (rules.length === 0) return this;
      var crossDelete;
      for (var i=0; i<rules.length; i++) {
        (rules[i].stylesheet.deleteRule ? rules[i].stylesheet.deleteRule : rules[i].stylesheet.removeRule)(rules[i].index);
      }
    }
  }

  return window.$CSS = $CSS;

})(this,document);
