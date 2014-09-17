define([
  'marionette',
  'text!templates/Trends/trend.html'
], function(Marionette, trendTemplate) {
  var Trend = Marionette.ItemView.extend({
    template: _.template(trendTemplate, { variable: 'trend' }),
    className: 'trend',

    initialize: function() {
      this.render();
    },

    onRender: function() {
      this.$el.addClass('bg-' + this.model.get('category'));
    }
  });

  return Trend;
});