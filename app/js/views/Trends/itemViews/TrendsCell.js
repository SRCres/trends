define([
  'marionette',
  'appConfig',
  'views/Trends/itemViews/Trend'
], function(Marionette, appConfig, TrendItemView) {
  var TrendsCell = Marionette.ItemView.extend({
    template: _.template(''),
    className: 'trends-cell',

    initialize: function() {
      this.render();
    },

    startTimer: function() {
      this.start_time = null;
      this.end_time = _.random(appConfig.grid.min_delay, appConfig.grid.max_delay);
      requestAnimationFrame(this.tick.bind(this));
    },

    tick: function(timestamp) {
      if (!this.start_time) {
        this.start_time = timestamp;
      }

      var delta = timestamp - this.start_time;

      if (delta < this.end_time) {
        requestAnimationFrame(this.tick.bind(this));
      } else {
        this.switchTrend();
      }
    },

    switchTrend: function() {
      this.new_trend = this.createTrend();

      switch(_.random(3)) {
        case 0: // slide right
          this.slideRight();
          break;

        case 1: // slide left
          this.slideLeft();
          break;

        case 2: // slide up
          this.slideUp();
          break;

        case 3: // slide down
          this.slideDown();
          break;
      }

      this.$el.one('webkitTransitionEnd transitionend', function() {
        this.updateTrendsCell();
      }.bind(this));
    },

    createTrend: function() {
      var trendModel = this.collection.next(),
          trendItemView = new TrendItemView({ model: trendModel });

      return trendItemView;
    },

    updateTrendsCell: function() {
      if (this.current_trend) {
        this.current_trend.destroy();
      }

      this.current_trend = this.new_trend;

      this.$el.removeClass('horizontal vertical slide right left up down');
      this.startTimer();
    },

    slideRight: function() {
      this.$el
        .prepend(this.new_trend.$el)
        .addClass('horizontal slide right');
    },

    slideLeft: function() {
      this.$el
        .append(this.new_trend.$el)
        .addClass('horizontal slide left');
    },

    slideUp: function() {
      this.$el
        .append(this.new_trend.$el)
        .addClass('vertical slide up');
    },

    slideDown: function() {
      this.$el
        .prepend(this.new_trend.$el)
        .addClass('vertical slide down');
    },

    onRender: function() {
      this.new_trend = this.createTrend();
      this.$el.append(this.new_trend.$el);
      this.updateTrendsCell();
    }
  });

  return TrendsCell;
});