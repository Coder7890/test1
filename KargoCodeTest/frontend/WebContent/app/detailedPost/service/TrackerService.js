var trackerService = function trackerService(trackerAPI, $interpolate, $http, $q) {

  var getParsedTrackerURL = function getTrackerURL(givenFromDate, givenToDate) {
    return $interpolate(trackerAPI)({ fromDate: givenFromDate, toDate: givenToDate });
  };

  this.getTrackerData = function getTrackerData(fromDate, toDate) {
    var dfd = $q.defer();

    $http.get(getParsedTrackerURL(fromDate, toDate))
      .then(function (res) {
          var response = {
            data: getProcessedTrackerData(res.data.data)
          };

          dfd.resolve(response);
         }, 
         function (error) {
           dfd.reject(error);
         });

    return dfd.promise;
  };

  var getProcessedTrackerData = function getProcessedTrackerData(data) {
    data.sort(function(a, b){ 
      return new Date(a.date) - new Date(b.date); 
    });

    var givenDatesArray = getDates(data, 'date')

    var firstDate = new Date(data[0].date);
    var lastDate = new Date(data[data.length-1].date);

    var processedData = [];
    var datestr = '';

    for(var d = firstDate; d.getTime() <= lastDate.getTime(); d.setDate(d.getDate()+1)) {
      datestr = dateToYMD(d);
      if(givenDatesArray[datestr]) {
          //this date exists in your data, copy it
        processedData.push(givenDatesArray[datestr]);
      } else {
          //this date does not exist, create a default
        processedData.push(generateMissingData(datestr, d.getTime()));
      }
    }
    
    return processedData;
  };

  var generateMissingData = function generateMissingData(datestr, generatedId) {
    return {id:generatedId, hits:0, date: datestr};
  };

  var getDates = function getDates(srcArray, key) {
    var getDatesArray = {};
    var i, l, index;
    for(i = 0, l = srcArray.length; i < l; i++) {
      getDatesArray[srcArray[i][key]] = srcArray[i];
    }
    return getDatesArray;
  };

  var dateToYMD = function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  };


};

trackerService.$inject = ['trackerAPI', '$interpolate', '$http', '$q'];
angular.module('app.posts').service('trackerService', trackerService);
