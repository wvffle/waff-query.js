var isArrayLike = function(array) {
  return array instanceof Array ||
    array instanceof NodeList ||
    array instanceof HTMLCollection;
};

var from = function(array) {
  if (array instanceof Array) return array;
  var res = [];
  [].push.apply(res, array);
  return res;
};

var array = {
  arrayLike: isArrayLike,
  from: from
};

module.exports = array;