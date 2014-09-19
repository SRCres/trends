define([
  'jquery',
  'bootstrap',
  'marionette',
  'appConfig',
  'text!templates/Commons/menu.html'
], function($, Bootstrap, Marionette, appConfig, menuTemplate) {
  var Menu = Marionette.ItemView.extend({
    template: _.template(menuTemplate, { variable: 'grid' }),
    className: 'container-fluid',

    ui: {
      btn_grid: '.btn-grid',
      popover_content: '.popover-content'
    },

    onOverCell: function(evt) {
      var cell = $(evt.currentTarget),
          column = +cell.data('col');

      $('.popover > .popover-content .cell').removeClass('btn-primary');

      cell.addClass('btn-primary');
      for (var i = column; i > 0; i--) {
        cell.prevAll(':nth-child(6n+' + i + ')').addClass('btn-primary');
      }
    },

    onClickCell: function() {
      this.ui.btn_grid.popover('hide');
    },

    onRender: function() {
      _.defer(function() {
        this.ui.btn_grid.popover({
          html: true,
          content: this.ui.popover_content.html(),
          viewport: { selector: 'body', padding: '10' },
          placement: 'bottom',
          toggle: 'popover'
        });

        this.ui.btn_grid.on('shown.bs.popover', function() {
          $('.popover > .popover-content .cell')
            .on('mouseover', this.onOverCell.bind(this))
            .one('click', this.onClickCell.bind(this));
        }.bind(this));
      }.bind(this));
    },

    serializeData: function() {
      return {
        max_columns: appConfig.grid.max_columns,
        max_rows: appConfig.grid.max_rows
      };
    }
  });

  return Menu;
});