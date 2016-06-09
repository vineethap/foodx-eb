angular.module('foodXApp').directive('basicClick', function($parse, $rootScope) {
  return {
    compile: function(elem, attr) {
      var fn = $parse(attr.basicClick);
      return function(scope, elem) {
        elem.on('click', function(e) {
          fn(scope, {$event: e});
          scope.$apply();
        });
      };
    }
  };
});