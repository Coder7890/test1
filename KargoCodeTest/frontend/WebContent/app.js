var postsModule = angular.module('app.posts', [
  'ui.router'
]);

postsModule.constant('postsAPI', 'http://jsonplaceholder.typicode.com/posts');
postsModule.constant('trackerAPI', 'http://kargotest.herokuapp.com/api/trackers?from={{fromDate}}&to={{toDate}}');

postsModule.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('postsList', {
    url: '/',
    template: '<posts-list></posts-list>'
  })

  .state('postDetail', {
    url: '/:postId',
    controller: 'detailedPostController',
    templateUrl: 'app/detailedPost/template/DetailedPost.html'

  });

});