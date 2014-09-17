define([
  'marionette',
  'appConfig',
  'app',
  'js/controllers/menu.js',
  'js/controllers/trends.js'
], function(Marionette, appConfig, App, menuController, trendsController) {
  var ApplicationController = Marionette.Controller.extend({
    initRoute: function() {
      Backbone.history.navigate('home', { trigger: true });
    },

    navigateTo: function(options) {
      options.controller.start(options.params);
    },

    showHome: function(rows, cols) {
      if (rows < 1) {
        rows = 1;
      } if (rows > appConfig.max_rows) {
        rows = appConfig.grid.max_rows;
      }

      if (cols < 1) {
        cols = 1;
      } if (cols > appConfig.max_columns) {
        cols = appConfig.grid.max_columns;
      }

      App.size = {
        rows: rows,
        cols: cols
      };

      menuController.start(App.menu);
      trendsController.start(App.trends);

      App.trigger('change:grid');
    }
  });

  return new ApplicationController();
});

