angular.module('foodXApp')
  .directive('addInput', function ($compile) { // inject $compile service as dependency
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            // click on the button to add new input field
            element.find('button').bind('click', function () {
                // I'm using Angular syntax. Using jQuery will have the same effect
                // Create input element
                var input = angular.element('<div><input type="text" ng-model="subcategory[' + scope.inputCounter + ']"></div>');
                // Compile the HTML and assign to scope
                var compile = $compile(input)(scope);

                // Append input to div
               element.append(input);

                // Increment the counter for the next input to be added
                scope.inputCounter++;
            });
        }
    }
});