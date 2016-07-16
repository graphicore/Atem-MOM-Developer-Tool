define([
    'bower_components/Atem-RequireJS-Config/browserConfig'
], function(
    configure
) {
    "use strict";
    var setup = {
        baseUrl: 'lib'
      , bowerPrefix: 'bower_components'
      , paths: {
            'Atem-MOM-Developer-Tool': './'
        }
    }
    configure(setup, require);
    return require;
});
