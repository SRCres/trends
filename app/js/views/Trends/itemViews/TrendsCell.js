define([
  'marionette',
  'appConfig',
  'views/Trends/itemViews/Trend'
], function(Marionette, appConfig, TrendItemView) {
  var TrendsCell = Marionette.ItemView.extend({
    template: _.template(''),
    className: 'trends-cell horizontal',

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
      var translate3d, translate;

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
      var trendModel = _.sample(this.collection.where({ visible: false })),
          trendItemView = new TrendItemView({ model: trendModel });

      trendModel.set('visible', true);

      return trendItemView;
    },

    updateTrendsCell: function() {
      var translate3d = '0,0,0';

      if (this.current_trend) {
        this.current_trend.model.set('visible', false);
        this.current_trend.destroy();
      }

      this.current_trend = this.new_trend;

      this.$el.removeClass('horizontal vertical');
      this.$el.css({
        transform: 'translate3d(' + translate3d + ')',
        '-webkit-transform': 'translate3d(' + translate3d + ')',
        transition: 'transform 0s',
        '-webkit-transition': '-webkit-transform 0s'
      });
      this.startTimer();
    },

    slideRight: function() {
      var pretranslate3d = -this.$el.width() * 0.5 + 'px,0,0',
          translate3d = '0,0,0';

      this.$el
        .removeClass('vertical')
        .addClass('horizontal');

      this.new_trend = this.createTrend();
      this.$el.prepend(this.new_trend.$el);

      this.$el.css({
        transform: 'translate3d(' + pretranslate3d + ')',
        '-webkit-transform': 'translate3d(' + pretranslate3d + ')'
      });

      _.defer(function() {
        this.$el.css({
          transform: 'translate3d(' + translate3d + ')',
          '-webkit-transform': 'translate3d(' + translate3d + ')',
           transition: 'transform 1s',
          '-webkit-transition': '-webkit-transform 1s'
        });
      }.bind(this));
    },

    slideLeft: function() {
      var translate3d = -this.$el.width() + 'px,0,0';

      this.$el
        .removeClass('vertical')
        .addClass('horizontal');

      this.new_trend = this.createTrend();
      this.$el.append(this.new_trend.$el);

      this.$el.css({
        transform: 'translate3d(' + translate3d + ')',
        '-webkit-transform': 'translate3d(' + translate3d + ')',
         transition: 'transform 1s',
        '-webkit-transition': '-webkit-transform 1s'
      });
    },

    slideUp: function() {
      var translate3d = '0,' + -this.$el.height() + 'px,0';

      this.$el
        .removeClass('horizontal')
        .addClass('vertical');

      this.new_trend = this.createTrend();
      this.$el.append(this.new_trend.$el);

      this.$el.css({
        transform: 'translate3d(' + translate3d + ')',
        '-webkit-transform': 'translate3d(' + translate3d + ')',
         transition: 'transform 1s',
        '-webkit-transition': '-webkit-transform 1s'
      });
    },

    slideDown: function() {
      var pretranslate3d = '0,' + -this.$el.height() + 'px,0',
          translate3d = '0,0,0';

      this.$el
        .removeClass('horizontal')
        .addClass('vertical');

      this.new_trend = this.createTrend();
      this.$el.prepend(this.new_trend.$el);

      this.$el.css({
        transform: 'translate3d(' + pretranslate3d + ')',
        '-webkit-transform': 'translate3d(' + pretranslate3d + ')'
      });

      _.defer(function() {
        this.$el.css({
          transform: 'translate3d(' + translate3d + ')',
          '-webkit-transform': 'translate3d(' + translate3d + ')',
           transition: 'transform 1s',
          '-webkit-transition': '-webkit-transform 1s'
        });
      }.bind(this));
    },

    onRender: function() {
      this.new_trend = this.createTrend();
      this.$el.append(this.new_trend.$el);
      this.updateTrendsCell();
    }
  });

  return TrendsCell;
});