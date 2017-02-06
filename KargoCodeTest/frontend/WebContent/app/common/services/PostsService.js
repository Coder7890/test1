var postsService = function postsService ($http, $q, postsAPI) {

  this.getPosts = function getPosts () {
    var dfd = $q.defer();

    $http.get(postsAPI).then(function (response) {
      dfd.resolve(response.data);
    }, function (error) {
      dfd.reject(error);
    });
    return dfd.promise;
  };

  this.getPost = function getPost (postId) {
    var dfd = $q.defer();

    $http.get(postsAPI + '/' + postId)
     .then(function (response) {
      dfd.resolve(response.data);
    }, function (error) {
      dfd.reject(error);
    });
    return dfd.promise;
  };

};

postsService.$inject = ['$http', '$q', 'postsAPI'];
angular.module('app.posts').service('postsService', postsService);

