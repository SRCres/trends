define([
  'backbone',
  'marionette',
  'app',
  'mock',
  'collections/Trends',
  'views/Commons/collectionViews/Cells'
], function(Backbone, Marionette, App, mock, TrendsCollection, CellsCollectionView) {
  var Trends = Marionette.Controller.extend({
    start: function(region) {
      if (!this.cellsCollectionView) {
        this.region = region;
        this.cellsCollectionView = new CellsCollectionView({ collection: new Backbone.Collection() });
        this.region.show(this.cellsCollectionView);
        App.trends = new TrendsCollection(_.shuffle(mock));
        App.on('change:grid', this.onChangeGrid, this);
      }
    },

    onChangeGrid: function() {
      var cells = [];

      for (var i = 0; i < App.size.cols; i++) {
        for (var j = 0; j < App.size.rows; j++) {
          cells.push({
            id: '' + i + '-' + j,
            size: {
              cols: App.size.cols,
              rows: App.size.rows
            }
          });
        }
      }

      this.cellsCollectionView.collection.set(cells);
    }
  });

  return new Trends();
});