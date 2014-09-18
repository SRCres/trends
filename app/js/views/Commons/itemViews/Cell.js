define([
  'marionette',
  'appConfig',
  'app',
  'views/Trends/itemViews/TrendsCell'
], function(Marionette, appConfig, App, TrendsCellItemView) {
  var Cell = Marionette.ItemView.extend({
    template: _.template(''),

    modelEvents: {
      'change size': 'onChangeSize'
    },

    onChangeSize: function() {
      this.$el.removeClass();
      this.$el.addClass('cell cell-' + App.size.cols + '-' + App.size.rows);
    },

    onRender: function() {
      var trendsCellItemView = new TrendsCellItemView({ collection: App.trends });

      this.$el.html(trendsCellItemView.$el);
      this.onChangeSize();
    }
  });

  return Cell;
});