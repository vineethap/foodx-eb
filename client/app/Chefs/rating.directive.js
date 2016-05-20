angular.module('foodXApp')
.directive('starRating', function () {
    return {  
        scope: {
          rating: '=',
          readOnly: '@',
          click: "&",
          mouseHover: "&",
          mouseLeave: "&"
        },      
        restrict: 'EA',

        template:
            "<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer' ng-repeat='idx in maxRatings track by $index'> \
                <img ng-src='{{(rating <= $index) &&\"assets/img/star-empty-lg.png\" || \"assets/img/star-fill-lg.png\"}}' \
                '></img> \
            </div>",
        controller: function ($scope) {
            $scope.maxRatings = [];

            for (var i = 1; i <= 5; i++) {
                $scope.maxRatings.push({});
            };

            $scope.click = function (param) {
                $scope.rating = param;
            };
        }
    };
});