define(function() {
  var mock = [],
      categories = [
        'success',
        'info',
        'warning',
        'danger'
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