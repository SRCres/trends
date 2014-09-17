define([
  'marionette',
  'controllers/appController'
], function(Marionette, appController) {
  var AppRouter = Marionette.AppRouter.extend({
    controller: appController,

    appRoutes: {
      '': 'initRoute',
      'home(/:rows/:cols)': 'showHome',
      '*action': 'initRoute'
    }
  });

  return AppRouter;
});
