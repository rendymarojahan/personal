// Ionic Starter App
var fb = new Firebase("https://rendymarojahan-ae340.firebaseio.com");
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-datepicker', 'starter.services', 'angular.filter', 'angularMoment', 'firebase', 'ngStorage', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $state, Auth, $cordovaStatusbar, $cordovaSplashscreen, $cordovaTouchID, $localStorage) {
  $ionicPlatform.ready(function() {
    setTimeout(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
                }
    }, 300);
    setTimeout(function () {
            if (typeof $localStorage.enableTouchID === 'undefined' || $localStorage.enableTouchID === '' || $localStorage.enableTouchID === false) {
                //should already be on login page
                $state.go("login");
            } else {
                $cordovaTouchID.checkSupport().then(function () {
                    $cordovaTouchID.authenticate("All users with a Touch ID profile on the device will have access to this app").then(function () {
                        $state.go("loginauto");
                    }, function (error) {
                        console.log(JSON.stringify(error));
                        $state.go("login");
                    });
                }, function (error) {
                    console.log(JSON.stringify(error));
                    $state.go("login");
                });
            }
    }, 750);
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            if (error === "AUTH_REQUIRED") {
                $ionicHistory.clearCache();
                $rootScope.authData = '';
                fb.unauth();
                $state.go("login");
            }
    });
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: '/login',
    cache: false,
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.order', {
    url: '/order',
    views: {
      'menuContent': {
        templateUrl: 'templates/order.html',
        controller: 'orderCtrl'
      }
    }
  })

  .state('app.dimension', {
    url: '/dimension',
    views: {
      'menuContent': {
        templateUrl: 'templates/dimension.html',
        controller: 'dimensionCtrl'
      }
    }
  })

  .state('app.wax', {
    url: '/wax',
    views: {
      'menuContent': {
        templateUrl: 'templates/wax.html',
        controller: 'waxCtrl'
      }
    }
  })

  .state('app.casting', {
    url: '/casting',
    views: {
      'menuContent': {
        templateUrl: 'templates/casting.html',
        controller: 'castingCtrl'
      }
    }
  })

  .state('app.finishing', {
    url: '/finishing',
    views: {
      'menuContent': {
        templateUrl: 'templates/finishing.html',
        controller: 'finishingCtrl'
      }
    }
  })

  .state('app.setting', {
    url: '/setting',
    views: {
      'menuContent': {
        templateUrl: 'templates/setting.html',
        controller: 'settingCtrl'
      }
    }
  })

  .state('app.polishing', {
    url: '/polishing',
    views: {
      'menuContent': {
        templateUrl: 'templates/polishing.html',
        controller: 'polishingCtrl'
      }
    }
  })

  .state('app.chrome', {
    url: '/chrome',
    views: {
      'menuContent': {
        templateUrl: 'templates/chrome.html',
        controller: 'chromeCtrl'
      }
    }
  })

  .state('app.inventoryuses', {
    url: '/inventoryuses/:inventoryusesId',
    views: {
      'menuContent': {
        templateUrl: 'templates/inventoryuses.html',
        controller: 'inventoryusesCtrl'
      }
    }
  })

  .state('app.transferbahan', {
    url: '/transferbahan/:transferbahanId',
    views: {
      'menuContent': {
        templateUrl: 'templates/transferbahan.html',
        controller: 'transferbahanCtrl'
      }
    }
  })

  .state('app.registration', {
    url: '/registration',
    views: {
      'menuContent': {
        templateUrl: 'templates/registration.html',
        controller: 'registrationCtrl'
      }
    }
  })

  .state('app.employee', {
    url: '/employee/:employeeId',
    views: {
      'menuContent': {
        templateUrl: 'templates/employee.html',
        controller: 'employeeCtrl'
      }
    }
  })

  .state('app.price', {
    url: '/price/:priceId',
    views: {
      'menuContent': {
        templateUrl: 'templates/price.html',
        controller: 'priceCtrl'
      }
    }
  })

  .state('app.susut', {
    url: '/susut/:susutId',
    views: {
      'menuContent': {
        templateUrl: 'templates/susut.html',
        controller: 'susutCtrl'
      }
    }
  })

  .state('app.sankcost', {
    url: '/sankcost/:sankcostId',
    views: {
      'menuContent': {
        templateUrl: 'templates/sankcost.html',
        controller: 'sankcostCtrl'
      }
    }
  })

  .state('app.inventory', {
    url: '/inventory',
    views: {
      'menuContent': {
        templateUrl: 'templates/inventory.html',
        controller: 'inventoryCtrl'
      }
    }
  })

  .state('app.rawinventory', {
    url: '/rawinventory/:inventoryId',
    views: {
      'menuContent': {
        templateUrl: 'templates/rawinventory.html',
        controller: 'rawinventoryCtrl'
      }
    }
  })

  .state('app.addinventory', {
    url: '/addinventory',
    views: {
      'menuContent': {
        templateUrl: 'templates/addinventory.html',
        controller: 'addinventoryCtrl'
      }
    }
  })

  .state('app.material', {
    url: '/material',
    views: {
      'menuContent': {
        templateUrl: 'templates/material.html',
        controller: 'materialCtrl'
      }
    }
  })

  .state('app.rawmaterial', {
    url: '/rawmaterial/:materialId',
    views: {
      'menuContent': {
        templateUrl: 'templates/rawmaterial.html',
        controller: 'rawmaterialCtrl'
      }
    }
  })

  .state('app.addmaterial', {
    url: '/addmaterial',
    views: {
      'menuContent': {
        templateUrl: 'templates/addmaterial.html',
        controller: 'addmaterialCtrl'
      }
    }
  })

  .state('app.product', {
    url: '/product',
    views: {
      'menuContent': {
        templateUrl: 'templates/product.html',
        controller: 'productCtrl'
      }
    }
  })

  .state('app.addproduct', {
    url: '/addproduct/:productId',
    views: {
      'menuContent': {
        templateUrl: 'templates/addproduct.html',
        controller: 'addproductCtrl'
      }
    }
  })

  .state('app.contact', {
    url: '/contact',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact.html',
        controller: 'contactCtrl'
      }
    }
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.dashboard', {
      url: '/dashboard/:memberId/:level',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html',
          controller: 'dashboardCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app');
});
