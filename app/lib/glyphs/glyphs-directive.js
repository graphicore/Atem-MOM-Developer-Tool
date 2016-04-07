define([
    'require/text!./glyphs.tpl'
    ], function(
    template
) {
    "use strict";
    function glyphsDirective() {
        return {
            restrict: 'E' // only matches element names
          , controller: 'GlyphsController'
          , replace: false
          , template: template
          , scope: {}
          , controllerAs: 'ctrl'
          , bindToController: true
        };
    }
    glyphsDirective.$inject = [];
    return glyphsDirective;
});
