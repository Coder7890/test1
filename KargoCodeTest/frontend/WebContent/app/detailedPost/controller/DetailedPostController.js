var detailedPostController = function detailedPostController ($scope, $stateParams, postsService, trackerService) {
  $scope.post = {};
  $scope.trackerData = {};

  postsService.getPost($stateParams.postId)
    .then(function (response) {
    $scope.post = response;
  }, function (error) {
  });

  var testFromDate = '2015-01-01';
  var testToDate= '2015-03-01';

  var getTrackerData = function getTrackerData() {
    trackerService.getTrackerData(testFromDate, testToDate)
    .then(function (response) {
       $scope.trackerData = response;
      }, function (error) {
      });
  };

  getTrackerData();
};

detailedPostController.$inject = [ '$scope', '$stateParams', 'postsService', 'trackerService' ];
angular.module('app.posts').controller('detailedPostController', detailedPostController);