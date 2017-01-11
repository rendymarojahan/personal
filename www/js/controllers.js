angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {

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
    $scope.menutop = "display: none;";
    $state.go('app.rendy');
  };
  $scope.trigprofile = function() {
    $scope.menuprofile = "active";
    $scope.menuhome = "";
    $scope.menuproject = "";
    $scope.menublog = "";
    $scope.menuqualification = "";
    $scope.menucontact = "";
    $scope.menutop = "display: none;";
    $state.go('app.profile');
  };
  $scope.trigproject = function() {
    $scope.menuproject = "active";
    $scope.menuhome = "";
    $scope.menuprofile = "";
    $scope.menublog = "";
    $scope.menuqualification = "";
    $scope.menucontact = "";
    $scope.menutop = "display: none;";
    $state.go('app.project');
  };
  $scope.trigblog = function() {
    $scope.menublog = "active";
    $scope.menuhome = "";
    $scope.menuprofile = "";
    $scope.menuproject = "";
    $scope.menuqualification = "";
    $scope.menucontact = "";
    $scope.menutop = "display: none;";
    $state.go('app.blog');
  };
  $scope.trigqualification = function() {
    $scope.menuqualification = "active";
    $scope.menuhome = "";
    $scope.menuprofile = "";
    $scope.menuproject = "";
    $scope.menublog = "";
    $scope.menucontact = "";
    $scope.menutop = "display: none;";
    $state.go('app.carrier');
  };
  $scope.trigcontact = function() {
    $scope.menucontact = "active";
    $scope.menuhome = "";
    $scope.menuprofile = "";
    $scope.menuproject = "";
    $scope.menublog = "";
    $scope.menuqualification = "";
    $scope.menutop = "display: none;";
    $state.go('app.contact');
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
  $ionicLoading.show();
  $scope.overviews = [];
  $scope.overviews = TransactionFactory.getOverviews();
  $scope.overviews.$loaded().then(function (x) {
    refresh($scope.overviews, $scope, TransactionFactory);
    $ionicLoading.hide();
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
  $ionicLoading.show();
  $scope.overviews = [];
  $scope.projects = [];
  $scope.jalan = document.URL;

  if ($stateParams.projectId === '') {
      $scope.article = "Project";
      $scope.overviews = TransactionFactory.getProjects($scope.article);
      $scope.overviews.$loaded().then(function (x) {
        $scope.project = $scope.overviews[0];
        refresh($scope.overviews, $scope, TransactionFactory);
        $ionicLoading.hide();
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
        $ionicLoading.hide();
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
  $ionicLoading.show();
  $scope.overviews = [];
  $scope.projects = [];
  $scope.jalanc = window.location.href.toString();

  if ($stateParams.carrierId === '') {
      $scope.article = "Carrier";
      $scope.overviews = TransactionFactory.getProjects($scope.article);
      $scope.overviews.$loaded().then(function (x) {
        $scope.project = $scope.overviews[0];
        refresh($scope.overviews, $scope, TransactionFactory);
        $ionicLoading.hide();
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
        $ionicLoading.hide();
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
  $ionicLoading.show();
  $scope.profile = {};
  $scope.profile = ContactsFactory.getProfile();
  $scope.profile.$loaded().then(function (x) {
    refresh($scope.profile, $scope, ContactsFactory);
    $ionicLoading.hide();
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
  $ionicLoading.show();
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
            var total = 0;
            angular.forEach(data.comments, function (comment) {
              total++;
            })
            data.comment = total;
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
            var total = 0;
            angular.forEach(data.comments, function (comment) {
              total++;
            })
            data.comment = total;
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
            var total = 0;
            angular.forEach(data.comments, function (comment) {
              total++;
            })
            data.comment = total;
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
            var total = 0;
            angular.forEach(data.comments, function (comment) {
              total++;
            })
            data.comment = total;
          }
    })
    refresh($scope.sciences, $scope, TransactionFactory);
    $ionicLoading.hide();
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
            var total = 0;
            angular.forEach(data.comments, function (comment) {
              total++;
            })
            data.comment = total;
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
            var total = 0;
            angular.forEach(data.comments, function (comment) {
              total++;
            })
            data.comment = total;
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

.controller('detailCtrl', function($scope, $state, $stateParams, $filter, $ionicModal, $ionicLoading, TransactionFactory, MasterFactory, $ionicPopup, myCache) {
  $ionicLoading.show();
  $scope.detail = {'title': '','desc': '','picture': ''};
  $scope.comment = {'data': ''};
  $scope.jaland = window.location.href.toString();

  $scope.guest = function(gate) {
    $ionicLoading.show({
        template: 'Logging in...'
    });

    if (gate){
      if (gate === "Facebook"){
        var pass = new firebase.auth.FacebookAuthProvider();
      } else if (gate === "Google"){
        var pass = new firebase.auth.GoogleAuthProvider();
      }else if (gate === "Twitter"){
        var pass = new firebase.auth.TwitterAuthProvider();
      }
      firebase.auth().signInWithPopup(pass).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        // The signed-in user info.
        var user = result.user;
        myCache.put('thisUserName', user.displayName);
        myCache.put('thisUserPhoto', user.photoURL);
        myCache.put('thisUserEmail', user.email);
        myCache.put('thisUserLogin', true);
        $scope.login = true;
        $ionicLoading.hide();
        $scope.modal.hide();
        $state.reload('app.detail/$stateParams.detailId');
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        if (errorCode) {
          if (errorCode === 'auth/operation-not-supported-in-this-environment') {
            alert('Your Device not supported');
          } else if (errorCode === 'auth/unauthorized-domain') {
            alert('Domain unauthorized');
          } else if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('Account exists with different credential');
          } else if (errorCode === 'auth/auth-domain-config-required') {
            alert('Auth not provided');
          } else if (errorCode === 'auth/cancelled-popup-request') {
            alert('Canceled popup request');
          } else if (errorCode === 'auth/operation-not-allowed') {
            alert('Credential not provided');
          } else if (errorCode === 'auth/popup-blocked') {
            alert('Popup blocked, Enable your popup');
          } else if (errorCode === 'auth/popup-closed-by-user') {
            alert('Popup closed before process completed');
          }
          
        } else if (errorMessage){
          alert('Email Used');
        } else if (credential){
          alert('Credential Used');
        }
        
        $ionicLoading.hide();
        $scope.modal.hide();
        $state.reload('app.detail/$stateParams.detailId');
      });
    }

    
  }

  $scope.comm = function (data) {

      // Validate form data
      if (typeof data.data === 'undefined' || data.data === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please give your comment"
          return;
      }

      $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
      });

      /* PREPARE DATA FOR FIREBASE*/
      $scope.temp = {
          comment: data.data,
          commentator: $scope.username,
          picture: $scope.userphoto,
          datecreated: Date.now()
      }

      /* SAVE MEMBER DATA */
      var ref = TransactionFactory.cRef();
      var cref = ref.child($stateParams.detailId).child("comments");
      cref.push($scope.temp);
      $ionicLoading.hide();
      $scope.comment = {'data': ''};
      $state.reload('app.detail/$stateParams.detailId');
  };

  if ($stateParams.detailId === '') {
    $state.go('app.blog');
  } else {
    TransactionFactory.getArticle($stateParams.detailId).then(function(data){
      if (data.video !== "Kosong"){
        $scope.isvideo = true;
      }
      if (data.comments !== undefined){
        var total = 0;
        angular.forEach(data.comments, function (comment) {
          total++;
        })
        data.comment = total;
      }
      $scope.detail = data;
      $ionicLoading.hide();
    })
  }

  $scope.$on('$ionicView.beforeEnter', function () {
    TransactionFactory.getArticle($stateParams.detailId).then(function(data){
      if (data.comments !== undefined){
        var total = 0;
        angular.forEach(data.comments, function (comment) {
          total++;
        })
        data.comment = total;
      }
      $scope.detail = data;
    })
    $scope.username = myCache.get('thisUserName');
    $scope.userphoto = myCache.get('thisUserPhoto');
    $scope.login = myCache.get('thisUserLogin');
  });

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.gate = function () {
    if ($scope.login) {
      $state.reload('');
    }else if(!$scope.login){
      $scope.modal.show();
    }
  };

  function refresh(detail, comment, project, $scope, item) {
    $scope.detail = {'title': '','desc': '','picture': ''};
    $scope.comment = {'data': ''};
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
