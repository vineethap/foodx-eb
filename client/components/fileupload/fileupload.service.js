'use strict';

(function() {

    function UploadService($location, $http, $cookies, $q, appConfig, Util) {
        var safeCb = Util.safeCb;

        var fileUpload = {

          uploadfile(files, id, callback) {
            var fd = new FormData();
            var url = '/api/files';

            angular.forEach(files, function(file) {
                fd.append('file', file);
            });
           	return $http.post(url, fd, {
              withCredentials: true,
              headers: {
                  'Content-Type': undefined,
                  id: id
              },
              transformRequest: angular.identity
          	}).then(data => {
              return data;
            }).catch(err => {
              return safeCb(callback)(err);
            })
          },

          updateItem(files, id,data,name, callback) {
              var fd = new FormData();
              var url = '/api/items/featured';

              angular.forEach(files, function(file) {
                  fd.append('file', file);
              });
              return $http.post(url, fd, {
                withCredentials: true,
                headers: {
                    'Content-Type': undefined,
                    id: id,
                    name:name,
                    data:data
                },

                transformRequest: angular.identity
              }).then(data => {
                return data;
              }).catch(err => {
                return safeCb(callback)(err);
              })
            },

          formSubmit(files, data, callback) {
            
            var url = '/api/items';
            var fd = new FormData();
             for ( var i = 0; i <= files.length; i++) {
              
              fd.append('file', files[i]);

           
            console.log(fd, files[i])
            return $http.post(url, fd, {
              withCredentials: true,
              headers: {
                  'Content-Type': undefined,
                  data: data
              },
              transformRequest: angular.identity
            }).then(data => {
              return data;
            }).catch(err => {
              return safeCb(callback)(err);
            })
           }
        }
        };
        return fileUpload;
    }
    angular.module('foodXApp')
        .factory('fileUpload', UploadService);

})();
