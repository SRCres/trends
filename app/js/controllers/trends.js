define([
  'backbone',
  'marionette',
  'app',
  'mock',
  'views/Commons/collectionViews/Cells'
], function(Backbone, Marionette, App, mock, CellsCollectionView) {
  var Trends = Marionette.Controller.extend({
    start: function(region) {
      if (!this.cellsCollectionView) {
        this.region = region;
        this.cellsCollectionView = new CellsCollectionView({ collection: new Backbone.Collection() });
        this.region.show(this.cellsCollectionView);
        App.mock = new Backbone.Collection(mock);
        App.on('change:grid', this.onChangeGrid, this);
      }
    },

    onChangeGrid: function() {
      var cells = [];

      for (var i = 0; i < App.size.rows; i++) {
        for (var j = 0; j < App.size.cols; j++) {
          cells.push({
            id: '' + i + j,
            width: 100 / App.size.cols + '%',
            height: 100 / App.size.rows + '%'
          });
        }
      }

      this.cellsCollectionView.collection.set(cells);
    }
  });

  return new Trends();
});