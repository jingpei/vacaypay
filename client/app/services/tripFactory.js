(function() {
  'use strict';
  angular.module('app')
  .factory('Trip', function ($http, $cacheFactory, $window, Auth) {

    var currentUser = $window.localStorage.getItem('userID');
    var cache = $cacheFactory('tripData');
    // var currentTripData;

    var services = {
      createTrip: createTrip,
      cacheTrip: cacheTrip,
      // currentTrip: currentTrip,
      hasTrip: hasTrip
    };

    return services;

    function createTrip(trip, callback) {
      $http.post('/trips', {
        id: currentUser,
        name: trip.name,
        code: trip.code
      })
      .then(function (res) {
        // currentTripData = res.data;
        cacheTrip(res.data);
        callback();
      });
    }

    function cacheTrip (trip) {
      cache.put('_id', trip.id);
      cache.put('creator', trip.creator);
      cache.put('participants', trip.participants);
      cache.put('name', trip.name);
      cache.put('code', trip.code);
      cache.put('expenses', trip.expenses);
      return cache;
    }

    // function currentTrip() {
    //   return currentTripData;
    // }

    function hasTrip(callback) {
      $http.get('/trips', {
        params: { id: currentUser }
      })
      .then( function (res) {
        // currentTripData = res.data[0];
        cacheTrip(res.data);
        callback(res.data);
      });
    }

  });


})();
