angular.module('app.posts').directive('postsList', function () {
  return {
    restrict: 'EA',
    replace: true,
    controller: 'postsListController',
    templateUrl: 'app/postsList/template/PostsList.html',
    scope: {
      onItemClick: '&'
    }
  };
});