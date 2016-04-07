define([
    'angular'
  , './app-controller'
  , './app-directive'
  , './glyphs/glyphs'
  , 'Atem-CPS-Developer-Tool/cpsPanel/cpsPanel'
], function(
    angular
  , Controller
  , directive
  , glyphs
  , cpsPanel
) {
    "use strict";
    return angular.module('mtk.MOMDeveloper', [glyphs.name, cpsPanel.name])
      .controller('AppController', Controller)
      .directive('mtkMomDeveloper', directive)
      ;
});
