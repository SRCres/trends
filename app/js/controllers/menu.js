define([
  'backbone',
  'marionette',
  'views/Commons/itemViews/Menu'
], function(Backbone, Marionette, MenuItemView) {
  var Menu = Marionette.Controller.extend({
    start: function(region) {
      if (!this.menuItemView) {
        this.region = region;

        this.menuItemView = new MenuItemView();
        this.menuItemView.on('grid:size', function(size) {
          var rows = size.substr(0, 1) || 1,
              cols = size.substr(1) || 1;

          Backbone.history.navigate('home/' + rows + '/' + cols, { trigger: true });
        });

        this.region.show(this.menuItemView);
      }
    }
  });

  return new Menu();
});