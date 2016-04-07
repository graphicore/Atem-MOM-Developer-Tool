define([
    'angular'
  , './glyphs-controller'
  , './glyphs-directive'
  , './glyph-directive'
], function(
    angular
  , Controller
  , directive
  , glyphDirective
) {
    "use strict";
    return angular.module('mtk.Glyphs', [])
           .controller('GlyphsController', Controller)
           .directive('mtkGlyphs', directive)
           .directive('mtkGlyph', glyphDirective)
           ;
});
