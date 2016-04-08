require([
    'require/domReady'
  , 'angular'
  , './app'
  , 'Atem-MOM/project/Project'
  , 'Atem-IO/io/staticBrowserREST'
  , 'Atem-IO/io/InMemory'

  , 'Atem-MOM/rendering/basics'
  , 'Atem-MOM-Toolkit/dataTransformationCaches/DrawPointsProvider'
  , 'Atem-MOM-Toolkit/dataTransformationCaches/BBoxProvider'
  , 'Atem-MOM-Toolkit/services/glyph/GlyphUIService'
  , 'Atem-CPS-Toolkit/services/dragAndDrop/DragDataService'
  , 'Atem-CPS-Toolkit/services/dragAndDrop/DragIndicatorService'
  , 'Atem-MOM/cpsTools'
  , 'Atem-MOM/errors'
],
function (
    domReady
  , angular
  , angularApp
  , Project
  , ioREST
  , InMemory

  , renderingBasics
  , DrawPointsProvider
  , BBoxProvider
  , GlyphUIService
  , DragDataService
  , DragIndicatorService
  , cpsTools
  , errors
) {
    "use strict";
    /*global document:true*/
    document.body.classList.add('dependencies-ready');
    function main() {
        var projectDir = 'project'
          , drawPointsOutlineProvider = new DrawPointsProvider(renderingBasics.outlinesRenderer)
          , glyphUIService = new GlyphUIService(document, drawPointsOutlineProvider)
          , dragDataService = new DragDataService()
          , dragIndicatorService = new DragIndicatorService()
          , io = new InMemory()
          // InMemory is its own event emitter
          //, fsEvents = io
          // BUT, we don't use fsEvents currently (see also MOM/project/Project)
          , cpsLibIoMounts = [
                // add more of these configuration objects to include more
                // libraries each object yields in a call to MountingIO.mount
                // the keys correlate with the argument names of MountingIO
                // however, Project does some augmentation.
                {
                    io: ioREST
                  , mountPoint: 'lib/MOM'
                  , pathOffset: 'lib/bower_components/Atem-MOM/lib/cpsLib'
                }
            ]
          , project = new Project(io, projectDir, undefined, cpsLibIoMounts)
          , promise
          ;

        angularApp.constant('cpsTools', cpsTools);
        // render glyphs
        angularApp.constant('glyphUIService', glyphUIService);
        // for cps-panel
        angularApp.constant('dragDataService', dragDataService);
        angularApp.constant('dragIndicatorService', dragIndicatorService);

        // TODO: make a way to switch projects from within the app
        angularApp.constant('project', project);
        angularApp.constant('cpsController', project.controller);
        angularApp.constant('ruleController', project.ruleController);

        io.mkDir(false, 'project');
        promise = ioREST.copyRecursive(true, 'project', io, 'project')
                 .then(project.load.bind(project, true))
                 // currently no async openSession (no bi issue since we
                 // use mostly InMemoryIO)
                 .then(project.openSession.bind(project, false))
                 .then(null, errors.unhandledPromise)
                 ;
        // this should be the last thing here, because domReady will execute
        // immediately if the DOM is already ready.
        domReady(function() {
            promise.then(angular.bootstrap.bind(angular, document, [angularApp.name]))
                   .then(null, errors.unhandledPromise)
                   ;
        });
    }
    main();
});
