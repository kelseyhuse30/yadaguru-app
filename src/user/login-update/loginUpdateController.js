define(['app'], function (app) {

  'use strict';

  /**
   * Controller for the login-update user subview
   */
  app.register.controller('LoginUpdateController', ['$scope', 'yg.services.user', '$state', '$modal', 'yg.services.api', '$stateParams',
    function ($scope, userService, $state, $modal, yadaApi, $stateParams) {

      /**
       * Shows the update login code send code modal.
       */
      $scope.showLoginUpdateSendCodeModal = function() {
        yadaApi.users.put(userService.getCurrentUserId(), {}).then(function() {
          var modalInstance = $modal.open({
            templateUrl: 'loginUpdateSendCodeModal.html',
            controller: 'UserModalController'
          });
          modalInstance.result.then(function() {
            $scope.isLoginUpdateFormVisible = true;
          });
        });
      };

      /**
       * Updates user login code.
       */
      $scope.updateLoginCode = function () {
        yadaApi.users.put(userService.getCurrentUserId(), {
          confirm_code: $scope.confirmCode,
          personal_code: $scope.personalCode
        }).then(function() {
          $scope.confirmCode = '';
          $scope.personalCode = '';
          var modalInstance = $modal.open({
            templateUrl: 'loginUpdateCompletionModal.html',
            controller: 'UserModalController'
          });
          modalInstance.result.then(function() {
            $state.go(next);
          })
        });
      };

      var next = $stateParams.next || 'user';
      $scope.showLoginUpdateSendCodeModal();

    }]);

});
