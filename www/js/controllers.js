angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.menutop = "display: none;";
  $scope.trigmenutop = function() {
    if ($scope.menutop === "display: none;") {
        $scope.menutop = "display: block;";
    } else if ($scope.menutop === "display: block;") {
        $scope.menutop = "display: none;";
    }
  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('rendyCtrl', function($scope, $state, $ionicLoading, TransactionFactory, $ionicPopup, myCache) {
  $scope.overviews = [];

  $scope.overviews = TransactionFactory.getOverviews();
  $scope.overviews.$loaded().then(function (x) {
    refresh($scope.overviews, $scope, TransactionFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.$on('$ionicView.beforeEnter', function () {
    refresh($scope.overviews, $scope);
  });

  function refresh(overviews, $scope, item) {
  }
})

.controller('projectCtrl', function($scope, $state, $stateParams, $filter, $ionicLoading, TransactionFactory, MasterFactory, $ionicPopup, myCache) {
  $scope.overviews = [];
  $scope.projects = [];

  if ($stateParams.projectId === '') {
      $scope.article = "Project";
      $scope.overviews = TransactionFactory.getProjects($scope.article);
      $scope.overviews.$loaded().then(function (x) {
        $scope.project = $scope.overviews[0];
        refresh($scope.overviews, $scope, TransactionFactory);
      }).catch(function (error) {
          console.error("Error:", error);
      });
  } else {
      $scope.article = "Project";
      $scope.overviews = TransactionFactory.getProjects($scope.article);
      $scope.overviews.$loaded().then(function (x) {
        var index = $scope.overviews.indexOf($stateParams.projectId);
        $scope.project = $scope.overviews[index];
        refresh($scope.overviews, $scope, TransactionFactory);
      }).catch(function (error) {
          console.error("Error:", error);
      });
      //$scope.project = TransactionFactory.getProject($stateParams.projectId);
  }

  $scope.focus = function(item) {
    $state.go('app.project', { projectId: item.$id });
  };

  $scope.$on('$ionicView.beforeEnter', function () {
    refresh($scope.overviews, $scope.project, $scope);
  });

  function refresh(overviews, project, $scope, item) {
  }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
