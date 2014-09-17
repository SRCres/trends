require.config({
  paths: {
    app: 'js/app',
    collections: 'js/collections',
    controllers: 'js/controllers',
    helpers: 'js/helpers',
    models: 'js/models',
    routers: 'js/routers',
    templates: 'templates',
    views: 'js/views',
    jquery: 'vendor/jquery/dist/jquery',
    bootstrap: 'vendor/bootstrap/dist/js/bootstrap',
    underscore: 'vendor/underscore/underscore',
    backbone: 'vendor/backbone/backbone',
    marionette: 'vendor/marionette/lib/backbone.marionette',
    text: 'vendor/requirejs-text/text'
  },
  shim: {
    jquery: {
      exports: 'jQuery'
    },

    bootstrap: {
      deps: ['jquery'],
      exports: 'Bootstrap'
    },

    underscore: {
      exports: '_'
    },

    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },

    marionette: {
      deps: ['backbone'],
      exports: 'Backbone.Marionette'
    }
  }
});