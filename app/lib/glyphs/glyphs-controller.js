define([], function() {
    "use strict";
    function GlyphsController($scope, selectGlyphs) {
        this.$scope = $scope;

        this.$scope.selectGlyphs = selectGlyphs;

        // a default value
        this.$scope.selector = 'glyph#a';
        this.$scope.glyphControlsVisible = true;
        this.$scope.glypsize = this.$scope.initialGlypsize = 512;
    }
    GlyphsController.$inject = ['$scope', 'selectGlyphs'];
    var _p = GlyphsController.prototype;

    _p.toggleGlyphControls = function() {
        this.$scope.glyphControlsVisible = !this.$scope.glyphControlsVisible;
        this.$scope.$broadcast('show-glyph-controls', this.$scope.glyphControlsVisible);
    };

    return GlyphsController;
});
