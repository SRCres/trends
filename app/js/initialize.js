require([
  'app',
  'routers/AppRouter'
], function(App, AppRouter) {
  App.addInitializer(function() {
    App.router = new AppRouter();
    Backbone.history.start();
  });

  App.start();
});