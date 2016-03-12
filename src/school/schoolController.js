define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the school view.
   */
  app.register.controller('SchoolController', ['$scope', '$rootScope', '$moment', 'yg.services.api', '$cookies',
    function ($scope, $rootScope, $moment, $YadaAPI, $cookies) {

      /**
       * Gets all schools and adds them to the $scope.schools.
       */
      $scope.getSchools = function () {
        $YadaAPI.schools.get($rootScope.user_id).then($scope.processSchools);
      };

      /**
       * Adds response data from a call to GET schools to $scope.schools.
       *
       * @param  {object}  resp  The response object.
       */
      $scope.processSchools = function(resp) {
        resp.data.forEach(function (school) {
          $scope.schools.push({
            id: school.id,
            name: school.name,
            dueDate: moment.utc(school.due_date).format('M/D/YYYY'),
            isActive: school.is_active
          });
        })
      };

      /**
       * Updates the active/inactive status of a school
       *
       * @param {number}   id         The school ID to update.
       * @param {boolean}  is_active  The active status.
       */
      $scope.updateActive = function (id, is_active) {
        $YadaAPI.schools.put(id, {
          is_active: is_active
        }, $rootScope.user_id);
      };

      /**
       * Ends the onboarding process and drops a cookie.
       * TODO Move this logic to another controller.
       */
      $scope.endOnboarding = function () {
        $scope.isOnboarding = false;
        $scope.currentStep = 0;
        $cookies.put('yg-ob-complete', true);
      };

      $scope.schools = [];
      $scope.$parent.showAdd = true;
      $rootScope.user_id = $cookies.get('yg-uid');

      if (!$scope.user_id) {
        $scope.isOnboarding = true;
      } else {
        $scope.getSchools();
      }

    }]);

  /**
   * Controller for the FAQ modal.
   */
  app.register.controller('FaqModalController', ['$scope', '$modalInstance', 'question', 'yg.services.help',
    function ($scope, $modalInstance, question, helpService) {

      var promise = helpService.getHelpMessage(question).then(function(resp) {
        $scope.content = resp.data[0].content;
      }, function() {
        $scope.content = 'There was a problem loading this help text. Please try again.'
      });

      $scope.close = function () {
        $modalInstance.dismiss();
      };
    }]);

});
