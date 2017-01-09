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

  $scope.menuhome = "";
  $scope.menuprofile = "";
  $scope.menuproject = "";
  $scope.menublog = "";
  $scope.menuqualification = "";
  $scope.menucontact = "";
  $scope.trighome = function() {
    $scope.menuhome = "active";
    $scope.menuprofile = "";
    $scope.menuproject = "";
    $scope.menublog = "";
    $scope.menuqualification = "";
    $scope.menucontact = "";
  };
  $scope.trigprofile = function() {
    $scope.menuprofile = "active";
    $scope.menuhome = "";
    $scope.menuproject = "";
    $scope.menublog = "";
    $scope.menuqualification = "";
    $scope.menucontact = "";
  };
  $scope.trigproject = function() {
    $scope.menuproject = "active";
    $scope.menuhome = "";
    $scope.menuprofile = "";
    $scope.menublog = "";
    $scope.menuqualification = "";
    $scope.menucontact = "";
  };
  $scope.trigblog = function() {
    $scope.menublog = "active";
    $scope.menuhome = "";
    $scope.menuprofile = "";
    $scope.menuproject = "";
    $scope.menuqualification = "";
    $scope.menucontact = "";
  };
  $scope.trigqualification = function() {
    $scope.menuqualification = "active";
    $scope.menuhome = "";
    $scope.menuprofile = "";
    $scope.menuproject = "";
    $scope.menublog = "";
    $scope.menucontact = "";
  };
  $scope.trigcontact = function() {
    $scope.menucontact = "active";
    $scope.menuhome = "";
    $scope.menuprofile = "";
    $scope.menuproject = "";
    $scope.menublog = "";
    $scope.menuqualification = "";
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
        TransactionFactory.getProject($stateParams.projectId).then(function(data){
          $scope.project = data;
        })
        refresh($scope.overviews, $scope, TransactionFactory);
      }).catch(function (error) {
          console.error("Error:", error);
      });

  }

  $scope.$on('$ionicView.beforeEnter', function () {
    refresh($scope.overviews, $scope.project, $scope);
  });

  function refresh(overviews, project, $scope, item) {
  }
})

.controller('carrierCtrl', function($scope, $state, $stateParams, $filter, $ionicLoading, TransactionFactory, MasterFactory, $ionicPopup, myCache) {
  $scope.overviews = [];
  $scope.projects = [];

  if ($stateParams.carrierId === '') {
      $scope.article = "Carrier";
      $scope.overviews = TransactionFactory.getProjects($scope.article);
      $scope.overviews.$loaded().then(function (x) {
        $scope.project = $scope.overviews[0];
        refresh($scope.overviews, $scope, TransactionFactory);
      }).catch(function (error) {
          console.error("Error:", error);
      });
  } else {
      $scope.article = "Carrier";
      $scope.overviews = TransactionFactory.getProjects($scope.article);
      $scope.overviews.$loaded().then(function (x) {
        TransactionFactory.getProject($stateParams.carrierId).then(function(data){
          $scope.project = data;
        })
        refresh($scope.overviews, $scope, TransactionFactory);
      }).catch(function (error) {
          console.error("Error:", error);
      });

  }

  $scope.$on('$ionicView.beforeEnter', function () {
    refresh($scope.overviews, $scope.project, $scope);
  });

  function refresh(overviews, project, $scope, item) {
  }
})

.controller('profileCtrl', function($scope, $state, $ionicLoading, ContactsFactory, TransactionFactory, $ionicPopup, myCache) {

  $scope.profile = {};
  $scope.profile = ContactsFactory.getProfile();
  $scope.profile.$loaded().then(function (x) {
    refresh($scope.profile, $scope, ContactsFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.article = "Project";
  $scope.projects = TransactionFactory.getProjects($scope.article);
  $scope.projects.$loaded().then(function (x) {
    refresh($scope.projects, $scope, TransactionFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  function refresh(profile, $scope, ContactsFactory) {
  }
})

.controller('blogCtrl', function($scope, $state, $ionicLoading, TransactionFactory, MasterFactory, $ionicPopup, myCache) {

  $scope.doRefresh = function (){

    $scope.sciences = [];
    $scope.articles = "Science";
    $scope.sciences = TransactionFactory.getBlogs($scope.articles);
    $scope.sciences.$loaded().then(function (x) {
      angular.forEach($scope.sciences, function (data) {
          if (data.kind === "Blog") {
            data.class = "col-d";
            data.isblog = true;
            data.isvideo = false;
            if (data.video !== "Kosong"){
              data.isvideo = true;
            }
          } else if (data.kind === "Note") {
            data.class = "col-in-at";
            data.isnote = true;
          } else if (data.kind === "Link") {
            data.class = "col-in";
            data.islink = true;
          } else if (data.kind === "Quote") {
            data.class = "col-on";
            data.isquote = true;
          } else if (data.kind === "Picture") {
            data.class = "col-d";
            data.ispicture = true;
          }
          if (data.comments !== undefined){
            data.comment = data.comments.length;
          }
      })
      refresh($scope.sciences, $scope, TransactionFactory);
      $scope.$broadcast('scroll.refreshComplete');
    }).catch(function (error) {
        console.error("Error:", error);
    });

  };

  $scope.healths = [];
  $scope.article = "Health";
  $scope.healths = TransactionFactory.getBlogs($scope.article);
  $scope.healths.$loaded().then(function (x) {
    angular.forEach($scope.healths, function (data) {
        if (data.kind === "Blog") {
          data.class = "col-d";
          data.isblog = true;
          data.isvideo = false;
          if (data.video !== "Kosong"){
            data.isvideo = true;
          }
        } else if (data.kind === "Note") {
          data.class = "col-in-at";
          data.isnote = true;
        } else if (data.kind === "Link") {
          data.class = "col-in";
          data.islink = true;
        } else if (data.kind === "Quote") {
          data.class = "col-on";
          data.isquote = true;
        } else if (data.kind === "Picture") {
          data.class = "col-d";
          data.ispicture = true;
        }
        if (data.comments !== undefined){
          data.comment = data.comments.length;
        }
    })
    refresh($scope.healths, $scope, TransactionFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.politics = [];
  $scope.articlep = "Politic";
  $scope.politics = TransactionFactory.getBlogs($scope.articlep);
  $scope.politics.$loaded().then(function (x) {
    angular.forEach($scope.politics, function (data) {
        if (data.kind === "Blog") {
          data.class = "col-d";
          data.isblog = true;
          data.isvideo = false;
          if (data.video !== "Kosong"){
            data.isvideo = true;
          }
        } else if (data.kind === "Note") {
          data.class = "col-in-at";
          data.isnote = true;
        } else if (data.kind === "Link") {
          data.class = "col-in";
          data.islink = true;
        } else if (data.kind === "Quote") {
          data.class = "col-on";
          data.isquote = true;
        } else if (data.kind === "Picture") {
          data.class = "col-d";
          data.ispicture = true;
        }
        if (data.comments !== undefined){
          data.comment = data.comments.length;
        }
    })
    refresh($scope.politics, $scope, TransactionFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.sciences = [];
  $scope.articles = "Science";
  $scope.sciences = TransactionFactory.getBlogs($scope.articles);
  $scope.sciences.$loaded().then(function (x) {
    angular.forEach($scope.sciences, function (data) {
        if (data.kind === "Blog") {
          data.class = "col-d";
          data.isblog = true;
          data.isvideo = false;
          if (data.video !== "Kosong"){
            data.isvideo = true;
          }
        } else if (data.kind === "Note") {
          data.class = "col-in-at";
          data.isnote = true;
        } else if (data.kind === "Link") {
          data.class = "col-in";
          data.islink = true;
        } else if (data.kind === "Quote") {
          data.class = "col-on";
          data.isquote = true;
        } else if (data.kind === "Picture") {
          data.class = "col-d";
          data.ispicture = true;
        }
        if (data.comments !== undefined){
          data.comment = data.comments.length;
        }
    })
    refresh($scope.sciences, $scope, TransactionFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.sports = [];
  $scope.articlesp = "Sport";
  $scope.sports = TransactionFactory.getBlogs($scope.articlesp);
  $scope.sports.$loaded().then(function (x) {
    angular.forEach($scope.sports, function (data) {
        if (data.kind === "Blog") {
          data.class = "col-d";
          data.isblog = true;
          data.isvideo = false;
          if (data.video !== "Kosong"){
            data.isvideo = true;
          }
        } else if (data.kind === "Note") {
          data.class = "col-in-at";
          data.isnote = true;
        } else if (data.kind === "Link") {
          data.class = "col-in";
          data.islink = true;
        } else if (data.kind === "Quote") {
          data.class = "col-on";
          data.isquote = true;
        } else if (data.kind === "Picture") {
          data.class = "col-d";
          data.ispicture = true;
        }
        if (data.comments !== undefined){
          data.comment = data.comments.length;
        }
    })
    refresh($scope.sports, $scope, TransactionFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.technos = [];
  $scope.articlet = "Technology";
  $scope.technos = TransactionFactory.getBlogs($scope.articlet);
  $scope.technos.$loaded().then(function (x) {
    angular.forEach($scope.technos, function (data) {
        if (data.kind === "Blog") {
          data.class = "col-d";
          data.isblog = true;
          data.isvideo = false;
          if (data.video !== "Kosong"){
            data.isvideo = true;
          }
        } else if (data.kind === "Note") {
          data.class = "col-in-at";
          data.isnote = true;
        } else if (data.kind === "Link") {
          data.class = "col-in";
          data.islink = true;
        } else if (data.kind === "Quote") {
          data.class = "col-on";
          data.isquote = true;
        } else if (data.kind === "Picture") {
          data.class = "col-d";
          data.ispicture = true;
        }
        if (data.comments !== undefined){
          data.comment = data.comments.length;
        }
    })
    refresh($scope.technos, $scope, TransactionFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.$on('$ionicView.beforeEnter', function () {
    refresh($scope.healths, $scope.politics, $scope.sciences, $scope.sports, $scope.technos, $scope);
  });

  function refresh(healths, politics, sciences, sports, technos, $scope, item) {
  }
})

.controller('detailCtrl', function($scope, $state, $stateParams, $filter, $ionicLoading, TransactionFactory, MasterFactory, $ionicPopup, myCache) {
  $scope.detail = {'title': '','desc': '','picture': ''};
  var getdetail = TransactionFactory.getBlog($stateParams.detailId);

  if ($stateParams.detailId === '') {
    $state.go('app.blog');
  } else {
    var getdetail = TransactionFactory.getBlog($stateParams.detailId);
    $scope.detail = getdetail;
  }

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.detail = getdetail;
  });

  function refresh(detail, project, $scope, item) {
    $scope.detail = {'title': '','desc': '','picture': ''};
  }
})

.controller('contactCtrl', function($scope, $stateParams, $ionicLoading, $http) {
  $scope.email = {'name': '','contact': '','topic': '','message': ''};

  $scope.sendEmail = function (email) {

      $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
      });
      var receiper = "rendy.marojahan@gmail.com";
      var from = function() { return email.name +" "+ email.contact;}

      location.href = 'mailto:'+ receiper + '?subject=' + email.topic + '&body=' + email.message + '&header=' + from;

      $ionicLoading.hide();
      refresh($scope.email, $scope);
  };

  function refresh(email, $scope) {

    $scope.email = {'name': '','contact': '','topic': '','message': ''};
  }
});
