define([
  'marionette',
  'appConfig',
  'app',
  'views/Trends/itemViews/TrendsCell'
], function(Marionette, appConfig, App, TrendsCellItemView) {
  var Cell = Marionette.ItemView.extend({
    template: _.template(''),
    className: 'cell',

    modelEvents: {
      'change width, height': 'onChangeSize'
    },

    onChangeSize: function() {
      this.$el.css({
        width: this.model.get('width'),
        height: this.model.get('height')
      });
    },

    onRender: function() {
      var trendsCellItemView = new TrendsCellItemView({ collection: App.mock });

      this.$el.html(trendsCellItemView.$el);
      this.onChangeSize();
    }
  });

  return Cell;
});