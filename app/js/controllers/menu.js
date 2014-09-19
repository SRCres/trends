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

        this.region.show(this.menuItemView);
      }
    }
  });

  return new Menu();
});