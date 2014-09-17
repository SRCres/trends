define([
  'marionette',
], function(Marionette) {
  var App = new Marionette.Application();

  App.addInitializer(function(options) {
    App.addRegions({
      menu: '#menu',
      trends: '#trends'
    });
  });

  return App;
});
