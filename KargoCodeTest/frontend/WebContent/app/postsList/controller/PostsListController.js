var postsListCtrl = function postsListCtrl (postsService, $scope, $state) {
  $scope.posts = [];

  postsService.getPosts().then(function (posts) {
    $scope.posts = posts;
  }, function (error) {
  });

  $scope.showDetails = function (postId) {
    $state.go('postDetail', {
      postId: postId
    });
  };
};

postsListCtrl.$inject = ['postsService', '$scope', '$state'];
angular.module('app.posts').controller('postsListController', postsListCtrl);

