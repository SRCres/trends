define([
  'backbone'
], function(Backbone) {
  var Trends = Backbone.Collection.extend({
    pointer: 0,

    next: function() {
      if (++this.pointer >= this.length) {
        this.pointer = 0;
      }

      return this.at(this.pointer);
    },

    prev: function() {
      if (--this.pointer <= 0) {
        this.pointer = this.length - 1;
      }

      return this.at(this.pointer);
    }
  });

  return Trends;
});