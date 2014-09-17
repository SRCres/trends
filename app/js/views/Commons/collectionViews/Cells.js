define([
  'marionette',
  'views/Commons/itemViews/Cell'
], function(Marionette, CellItemView) {
  var Cells = Marionette.CollectionView.extend({
    childView: CellItemView,
    className: 'row'
  });

  return Cells;
});