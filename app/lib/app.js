define([
    'angular'
  , './app-controller'
  , './app-directive'
  , './glyphs/glyphs'
  , './cpsPanel/cpsPanel'
], function(
    angular
  , Controller
  , directive
  , glyphs
  , textEditor
  , cpsPanel
) {
    "use strict";
    return angular.module('mtk.MOMDeveloper', [glyphs.name, cpsPanel.name])
      .controller('AppController', Controller)
      .directive('mtkMomDeveloper', directive)
      ;
});
