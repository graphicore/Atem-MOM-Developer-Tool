define([
    'Atem-MOM/errors'
], function(
    errors
) {
    "use strict";
    /*global console:true*/

    var CPSError = errors.CPS;

    function GlyphsController($scope, momController) {
        this.$scope = $scope;
        this._momController = momController;

        this._lastSelection = [];

        // a default value
        this.$scope.selector = 'glyph#a';
        this.$scope.glyphControlsVisible = true;
        this.$scope.glypsize = this.$scope.initialGlypsize = 512;
    }
    GlyphsController.$inject = ['$scope', 'momController'];
    var _p = GlyphsController.prototype;

    _p.toggleGlyphControls = function() {
        this.$scope.glyphControlsVisible = !this.$scope.glyphControlsVisible;
        this.$scope.$broadcast('show-glyph-controls', this.$scope.glyphControlsVisible);
    };

    _p._selectGlyphs = function(selector) {
        try {
            return this._momController.queryAll(selector)
                .filter(function(item){ return item.type === 'glyph'; });
        }
        catch(error) {
            if(!(error instanceof CPSError))
                throw error;
            console.warn('selector "' + selector + '" did not parse:', error.message);
        }
        return false;
    };

    _p.selectGlyphs = function(selector) {
        var result = this._selectGlyphs(selector);
        if(!result)
            return this._lastSelection;
        this._lastSelection = result;
        return result;
    };

    return GlyphsController;
});
