define(['app'], function (app) {

  'use strict';

  /**
   * Controller for user/sms setup
   */
  app.register.controller('SmsController', ['$scope', '$cookies',
    function ($scope, $cookies) {

      /**
       * Updates user with phone number and advances sms setup.
       */
      $scope.submitMobile = function () {
        //TODO POST to submit number to server
        console.log('mobileNumber: ', $scope.mobileNumber);
        $scope.smsSetupStep = 2;
      };

      /**
       * Displays confirmation code message.
       */
      $scope.confirmCode = function () {
        $scope.smsSetupStep = 3;
      };

      /**
       * Updates the user with personal and sponsor code.
       */
      $scope.updateUser = function () {
        //TODO POST to create new user for number
        console.log('smsCode: ', $scope.smsCode);
        console.log('personalCode: ', $scope.personalCode);
        console.log('sponsorCode: ', $scope.sponsorCode);
        $scope.isCompletionModalVisible = true;
      };

      /**
       * Sets a cookie, indicating initial mobile setup has been completed.
       */
      $scope.endInitialMobileSetup = function () {
        $cookies.put('initialSmsSetupComplete', true);
      };

      $scope.editLoginCode = function () {
        $scope.smsSetupStep = 2;
        $scope.showInitialSetup = true;
      };

      $scope.$parent.showAdd = false;
      $scope.isCompletionModalVisible = false;
      $scope.isSmsSetup = $cookies.get('initialSmsSetupComplete') || false;
      $scope.showInitialSetup = angular.copy(!$scope.isSmsSetup);
      console.log($scope.isSmsSetup);

      $scope.smsSetupStep = 1;



    }]);


});
