define(function() {
  var mock = [],
      categories = [
        'arts',
        'entertainment',
        'geography',
        'history',
        'science',
        'sports'
      ];

  for (var i = 0; i < 1000; i++) {
    mock.push({
      text: 'trend ' + i,
      category: categories[Math.floor(Math.random() * categories.length)],
      visible: false
    });
  }

  return mock;
});