
'use strict';

angular.module('foodXApp')
  .directive('fileupload', () => ({
    templateUrl: 'components/fileupload/fileupload.html',
    restrict: 'E',
    controller: 'FileuploadController',
    controllerAs: 'vm'
  }));
