angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, CurrentUserService, TransactionFactory, myCache) {

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

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.fullname = CurrentUserService.fullname;
  $scope.photo = CurrentUserService.picture;
  $scope.level = CurrentUserService.level;
  $scope.userid = myCache.get('thisMemberId');

  $scope.message = "";
  $scope.trigmessage = function() {
    if ($scope.message === "") {
        $scope.message = "open";
    } else if ($scope.message === "open") {
        $scope.message = "";
    }
    refresh($scope.transactions, $scope, TransactionFactory);
  };

  $scope.profile = "";
  $scope.trigprofile = function() {
    if ($scope.profile === "") {
        $scope.profile = "open";
    } else if ($scope.profile === "open") {
        $scope.profile = "";
    }
  };

  $scope.home = "";
  $scope.trighome = function() {
    if ($scope.home === "") {
        $scope.home = "active";
        $scope.homeshow = "display: block;";
    } else if ($scope.home === "active") {
        $scope.home = "";
        $scope.homeshow = "display: none;";
    }
  };
  $scope.order = "";
  $scope.trigorder = function() {
    if ($scope.order === "") {
        $scope.order = "active";
        $scope.ordershow = "display: block;";
    } else if ($scope.order === "active") {
        $scope.order = "";
        $scope.ordershow = "display: none;";
    }
  };
  $scope.prod = "";
  $scope.trigprod = function() {
    if ($scope.prod === "") {
        $scope.prod = "active";
        $scope.prodshow = "display: block;";
    } else if ($scope.prod === "active") {
        $scope.prod = "";
        $scope.prodshow = "display: none;";
    }
  };
  $scope.inven = "";
  $scope.triginven = function() {
    if ($scope.inven === "") {
        $scope.inven = "active";
        $scope.invenshow = "display: block;";
    } else if ($scope.inven === "active") {
        $scope.inven = "";
        $scope.invenshow = "display: none;";
    }
  };
  $scope.purc = "";
  $scope.trigpurc = function() {
    if ($scope.purc === "") {
        $scope.purc = "active";
        $scope.purcshow = "display: block;";
    } else if ($scope.purc === "active") {
        $scope.purc = "";
        $scope.purcshow = "display: none;";
    }
  };
  $scope.mast = "";
  $scope.trigmast = function() {
    if ($scope.mast === "") {
        $scope.mast = "active";
        $scope.mastshow = "display: block;";
    } else if ($scope.mast === "active") {
        $scope.mast = "";
        $scope.mastshow = "display: none;";
    }
  };
  $scope.sett = "";
  $scope.trigsett = function() {
    if ($scope.sett === "") {
        $scope.sett = "active";
        $scope.settshow = "display: block;";
    } else if ($scope.sett === "active") {
        $scope.sett = "";
        $scope.settshow = "display: none;";
    }
  };

  $scope.transactions = [];
  $scope.transactions = TransactionFactory.getTransactions();
  $scope.transactions.$loaded().then(function (x) {
    refresh($scope.transactions, $scope, TransactionFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  function refresh(transactions, $scope, item) {
    var notif = 0;
    var index;
    //
    for (index = 0; index < transactions.length; ++index) {
        //
        var transaction = transactions[index];
        //
        if (transaction.newly === true) {
            notif = notif + 1;
        }
    }
    $scope.notify = notif;
  }
})

.controller('dashboardCtrl', function($scope, CurrentUserService, myCache, TransactionFactory, ContactsFactory, AccountsFactory, MasterFactory) {
  $scope.fullname = CurrentUserService.fullname;
  $scope.photo = CurrentUserService.picture;
  $scope.level = CurrentUserService.level;
  $scope.userid = myCache.get('thisMemberId');

  $scope.doRefresh = function (){

    $scope.transactions = [];
    $scope.transactions = TransactionFactory.getTransactions();
    $scope.transactions.$loaded().then(function (x) {
      var outstanding = 0;
      var total = 0;
      var index;
      //
      for (index = 0; index < $scope.transactions.length; ++index) {
          //
          var transaction = $scope.transactions[index];
          //
          total++;
          if (transaction.newly === true) {
              outstanding = outstanding + 1;
          }
      }
      $scope.notify = outstanding;
      $scope.totalorder = total;
    }).catch(function (error) {
        console.error("Error:", error);
    });

    $scope.contacts = ContactsFactory.getContacts();
    $scope.contacts.$loaded().then(function (x) {
      var employee = 0;
      var index;
      //
      for (index = 0; index < $scope.contacts.length; ++index) {
          //
          var contact = $scope.contacts[index];
          //
          if (contact.status === "active") {
              employee = employee + 1;
          }
      }
      $scope.activeemployee = employee;
    }).catch(function (error) {
        console.error("Error:", error);
    });

    $scope.users = AccountsFactory.getUsers();
    $scope.users.$loaded().then(function (x) {
      var juser = 0;
      var index;
      //
      for (index = 0; index < $scope.users.length; ++index) {
          juser++;
      }
      $scope.jumlahuser = juser;
    }).catch(function (error) {
        console.error("Error:", error);
    });

    $scope.inventories = MasterFactory.getInventories();
    $scope.inventories.$loaded().then(function (x) {
      var empty = 0;
      var index;
      //
      for (index = 0; index < $scope.inventories.length; ++index) {
          //
          var inventory = $scope.inventories[index];
          //
          if (inventory.stock === 0) {
              empty = empty + 1;
          }
      }
      $scope.emptyinven = empty;
    }).catch(function (error) {
        console.error("Error:", error);
    });

    $scope.materials = MasterFactory.getMaterials();
    $scope.materials.$loaded().then(function (x) {
      var empty = 0;
      var index;
      //
      for (index = 0; index < $scope.materials.length; ++index) {
          //
          var material = $scope.materials[index];
          //
          if (material.stock === 0) {
              empty = empty + 1;
          }
      }
      $scope.emptyraw = empty;
    }).catch(function (error) {
        console.error("Error:", error);
    });

  };

  $scope.transactions = [];
  $scope.transactions = TransactionFactory.getTransactions();
  $scope.transactions.$loaded().then(function (x) {
    $scope.doRefresh();
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.contacts = ContactsFactory.getContacts();
  $scope.contacts.$loaded().then(function (x) {
    $scope.doRefresh();
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.users = AccountsFactory.getUsers();
  $scope.users.$loaded().then(function (x) {
    $scope.doRefresh();
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.inventories = MasterFactory.getInventories();
  $scope.inventories.$loaded().then(function (x) {
    $scope.doRefresh();
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.materials = MasterFactory.getMaterials();
  $scope.materials.$loaded().then(function (x) {
    $scope.doRefresh();
  }).catch(function (error) {
      console.error("Error:", error);
  });

  function refresh(transactions, contacts, users, $scope, item) {
  }
})

.controller('orderCtrl', function($scope, ionicDatePicker, $state, $stateParams, $ionicHistory, $ionicLoading, MasterFactory, ContactsFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {
  
  $scope.pesanan = {'kode': '','pelanggan': '','berat': '','berlian': '','express': ''};
  $scope.OrderDate = '';
  $scope.DeadlineDate = '';
  $scope.products = [];
  $scope.materials = [];
  $scope.materials = MasterFactory.getMaterials();
  $scope.materials.$loaded().then(function (x) {
    $scope.selmat = $scope.materials;
    refresh($scope.materials, $scope, MasterFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  $scope.products = MasterFactory.getProducts();
  $scope.products.$loaded().then(function (x) {
    $scope.selpro = $scope.products;
    refresh($scope.products, $scope, MasterFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  var tanggal = {
    callback: function (val) {  //Mandatory
      $scope.OrderDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };
  var deadline = {
    callback: function (val) {  //Mandatory
      $scope.DeadlineDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(tanggal);
  };
  $scope.DeadlinePicker = function(){
    ionicDatePicker.openDatePicker(deadline);
  };

  $scope.new = "btn-default";
  $scope.repair = "btn-default";
  $scope.trignew = function() {
    $scope.new = "btn-primary";
    $scope.repair = "btn-default";
    $scope.process = "3D";
  };
  $scope.trigrepair = function() {
    $scope.new = "btn-default";
    $scope.repair = "btn-primary";
    $scope.process = "Finishing";
  };

  $scope.cancelOrder = function(pesanan, selpro, selmat) {
    $scope.pesanan = {};
    $scope.selmat = {};
    $scope.selpro = {};
    $scope.new = "btn-default";
    $scope.repair = "btn-default";
    $scope.OrderDate = '';
    $scope.DeadlineDate = '';
  };

  $scope.createOrder = function (pesanan, selpro, selmat) {
      
      // Validate form data
      if (typeof pesanan.kode === 'undefined' || pesanan.kode === '') {
          alert("Kode Order Belum diisi");
          return;
      }
      if (typeof pesanan.pelanggan === 'undefined' || pesanan.pelanggan === '') {
          alert("Nama Pelanggan Belum diisi");
          return;
      }
      if (typeof pesanan.berat === 'undefined' || pesanan.berat === '') {
          alert("Target Berat Belum diisi");
          return;
      }
      if (typeof pesanan.berlian === 'undefined' || pesanan.berlian === '') {
          alert("Jumlah Berlian belum diisi");
          return;
      }
      if (typeof pesanan.express === 'undefined' || pesanan.express === '') {
          pesanan.express = false;
          return;
      }
      if (typeof selpro.nama === 'undefined' || selpro.nama === '') {
          alert("Product belum dipilih");
          return;
      }
      if (typeof selmat.jenis === 'undefined' || selmat.jenis === '') {
          alert("Tipe Material belum dipilih");
          return;
      }
      if ($scope.process === 'undefined' || $scope.process === '') {
          alert("Pilih New atau Repair");
          return;
      }
      if ($scope.OrderDate === 'undefined' || $scope.OrderDate === '') {
          alert("Tanggal pesanan belum dipilih");
          return;
      }
      if ($scope.DeadlineDate === 'undefined' || $scope.DeadlineDate === '') {
          alert("Tanggal Deadline belum dipilih");
          return;
      }

      if ($scope.inEditMode) {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Editing...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var photo = $scope.item.photo;
        var gender = $scope.gender;
        var title = $scope.title;
        $scope.temp = {
            fullname: uses.fullname,
            picture: photo,
            address: uses.address,
            phone: uses.phone,
            gender: gender,
            title: title,
            status: "active",
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        /* SAVE MATERIAL DATA */
        var employeeref = ContactsFactory.eRef();
        var newData = employeeref.child($stateParams.employeeId);
        newData.update($scope.temp, function (ref) {
        });
        $ionicHistory.goBack();
      }else {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var photo = selpro.picture;
        var product = selpro.nama;
        var material = selmat.jenis;
        $scope.temp = {
            kode: pesanan.kode,
            pelanggan: pesanan.pelanggan,
            berat: pesanan.berat,
            berlian: pesanan.berlian,
            express: pesanan.express,
            process: $scope.process,
            tanggalorder: $scope.OrderDate.getTime(),
            tanggaldeadline: $scope.DeadlineDate.getTime(),
            picture: photo,
            product: product,
            material: material,
            newly: true,
            addedby: CurrentUserService.fullname,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        var ref = fb.child("transactions").child("orders");
        ref.push($scope.temp);
      }

      $ionicLoading.hide();
      $scope.pesanan = {};
      $scope.selmat = {};
      $scope.selpro = {};
      $scope.new = "btn-default";
      $scope.repair = "btn-default";
      $scope.OrderDate = '';
      $scope.DeadlineDate = '';
      refresh($scope.pesanan, $scope.selmat, $scope.selpro, $scope.item, $scope);
  };

  function refresh(pesanan, $scope, item) {
    $scope.pesanan = {};
    $scope.selmat = {'jenis': 'not in list'};
    $scope.selpro = {'fullname': 'not in list'};
    $scope.new = "btn-default";
    $scope.repair = "btn-default";
    $scope.item = {'photo': ''};
    $scope.OrderDate = '';
    $scope.DeadlineDate = '';
  }
})

.controller('dimensionCtrl', function($scope, ionicDatePicker, $state, $stateParams, $ionicHistory, $ionicLoading, MasterFactory, TransactionFactory, ContactsFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {
  
  $scope.pesanan = {'kode': '','pelanggan': '','berat': '','berlian': '','express': ''};
  $scope.OrderDate = '';
  $scope.DeadlineDate = '';
  $scope.contacts = ContactsFactory.getContacts();
  $scope.contacts.$loaded().then(function (x) {
    $scope.selpic = $scope.contacts;
    refresh($scope.contacts, $scope, ContactsFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  $scope.processCode = "3D";
  $scope.transactions = [];
  $scope.transactions = TransactionFactory.getDimension($scope.processCode);
  $scope.transactions.$loaded().then(function (x) {
    $scope.selor = $scope.transactions;
    refresh($scope.transactions, $scope, TransactionFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  var tanggal = {
    callback: function (val) {  //Mandatory
      $scope.OrderDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };
  var deadline = {
    callback: function (val) {  //Mandatory
      $scope.DeadlineDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(tanggal);
  };
  $scope.DeadlinePicker = function(){
    ionicDatePicker.openDatePicker(deadline);
  };

  $scope.sorder = false;
  $scope.ordershow = "fa fa-chevron-up";
  $scope.trigorder = function() {
    if ($scope.sorder === false) {
        $scope.sorder = true;
        $scope.ordershow = "fa fa-chevron-down";
    } else if ($scope.sorder === true) {
        $scope.sorder = false;
        $scope.ordershow = "fa fa-chevron-up";
    }
  };

  $scope.cancelOrder = function(pesanan, selor, selpic) {
    $scope.pesanan = {};
    $scope.selpic = {};
    $scope.selor = {};
    $scope.sorder = false;
    $scope.ordershow = "fa fa-chevron-up";
    $scope.OrderDate = '';
    $scope.DeadlineDate = '';
  };

  $scope.createOrder = function (pesanan, selor, selpic) {
      
      // Validate form data
      if (typeof pesanan.express === 'undefined' || pesanan.express === '') {
          alert("Process 3D belum di Approve");
          return;
      }
      if (typeof selor.picture === 'undefined' || selor.picture === '') {
          alert("Order belum dipilih");
          return;
      }
      if (typeof selpic.fullname === 'undefined' || selpic.fullname === '') {
          alert("PIC belum dipilih");
          return;
      }
      if ($scope.OrderDate === 'undefined' || $scope.OrderDate === '') {
          alert("Tanggal pesanan belum dipilih");
          return;
      }
      if ($scope.DeadlineDate === 'undefined' || $scope.DeadlineDate === '') {
          alert("Tanggal Deadline belum dipilih");
          return;
      }

      if ($scope.inEditMode) {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Editing...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var photo = $scope.item.photo;
        var gender = $scope.gender;
        var title = $scope.title;
        $scope.temp = {
            fullname: uses.fullname,
            picture: photo,
            address: uses.address,
            phone: uses.phone,
            gender: gender,
            title: title,
            status: "active",
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        /* SAVE MATERIAL DATA */
        var employeeref = ContactsFactory.eRef();
        var newData = employeeref.child($stateParams.employeeId);
        newData.update($scope.temp, function (ref) {
        });
        $ionicHistory.goBack();
      }else {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var proces = "Wax";
        $scope.temp = {
            process: proces,
            newly: false,
            addedby: CurrentUserService.fullname,
            dateupdated: Date.now()
        }

        /* UPDATE ORDER DATA */
        var orderref = TransactionFactory.tRef();
        var newData = orderref.child(selor.$id);
        newData.update($scope.temp, function (ref) {
        });


        /* PREPARE DATA FOR FIREBASE*/
        var photo = selor.picture;
        $scope.temp = {
            kode: selor.kode,
            tanggalmulai: $scope.OrderDate.getTime(),
            tanggalselesai: $scope.DeadlineDate.getTime(),
            picture: photo,
            pic: selpic.fullname,
            approval: pesanan.express,
            newly: true,
            addedby: CurrentUserService.fullname,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE 3D DATA */
        var ref = fb.child("transactions").child("dimension");
        ref.push($scope.temp);
      }

      $ionicLoading.hide();
      $scope.pesanan = {};
      $scope.selor = {};
      $scope.selpic = {};
      $scope.sorder = false;
      $scope.ordershow = "fa fa-chevron-up";
      $scope.OrderDate = '';
      $scope.DeadlineDate = '';
      refresh($scope.pesanan, $scope.selor, $scope.selpic, $scope.item, $scope);
  };

  function refresh(pesanan, $scope, item) {
    $scope.pesanan = {};
    $scope.selor = {'jenis': 'not in list'};
    $scope.selpic = {'fullname': 'not in list'};
    $scope.sorder = false;
    $scope.ordershow = "fa fa-chevron-up";
    $scope.item = {'photo': ''};
    $scope.OrderDate = '';
    $scope.DeadlineDate = '';
  }
})

.controller('waxCtrl', function($scope, ionicDatePicker, $state, $stateParams, $ionicHistory, $ionicLoading, MasterFactory, TransactionFactory, ContactsFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {
  
  $scope.pesanan = {'kode': '','pelanggan': '','berat': '','berlian': '','express': ''};
  $scope.OrderDate = '';
  $scope.DeadlineDate = '';
  $scope.contacts = ContactsFactory.getContacts();
  $scope.contacts.$loaded().then(function (x) {
    $scope.selpic = $scope.contacts;
    refresh($scope.contacts, $scope, ContactsFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  $scope.processCode = "Wax";
  $scope.transactions = [];
  $scope.transactions = TransactionFactory.getDimension($scope.processCode);
  $scope.transactions.$loaded().then(function (x) {
    $scope.selor = $scope.transactions;
    refresh($scope.transactions, $scope, TransactionFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  var tanggal = {
    callback: function (val) {  //Mandatory
      $scope.OrderDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };
  var deadline = {
    callback: function (val) {  //Mandatory
      $scope.DeadlineDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(tanggal);
  };
  $scope.DeadlinePicker = function(){
    ionicDatePicker.openDatePicker(deadline);
  };

  $scope.sorder = false;
  $scope.ordershow = "fa fa-chevron-up";
  $scope.trigorder = function() {
    if ($scope.sorder === false) {
        $scope.sorder = true;
        $scope.ordershow = "fa fa-chevron-down";
    } else if ($scope.sorder === true) {
        $scope.sorder = false;
        $scope.ordershow = "fa fa-chevron-up";
    }
  };

  $scope.cancelOrder = function(pesanan, selor, selpic) {
    $scope.pesanan = {};
    $scope.selpic = {};
    $scope.selor = {};
    $scope.sorder = false;
    $scope.ordershow = "fa fa-chevron-up";
    $scope.OrderDate = '';
    $scope.DeadlineDate = '';
  };

  $scope.createOrder = function (pesanan, selor, selpic) {
      
      // Validate form data
      if (typeof pesanan.express === 'undefined' || pesanan.express === '') {
          alert("Process Wax belum di Approve");
          return;
      }
      if (typeof selor.picture === 'undefined' || selor.picture === '') {
          alert("Order belum dipilih");
          return;
      }
      if (typeof selpic.fullname === 'undefined' || selpic.fullname === '') {
          alert("PIC belum dipilih");
          return;
      }
      if ($scope.OrderDate === 'undefined' || $scope.OrderDate === '') {
          alert("Tanggal pesanan belum dipilih");
          return;
      }
      if ($scope.DeadlineDate === 'undefined' || $scope.DeadlineDate === '') {
          alert("Tanggal Deadline belum dipilih");
          return;
      }

      if ($scope.inEditMode) {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Editing...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var photo = $scope.item.photo;
        var gender = $scope.gender;
        var title = $scope.title;
        $scope.temp = {
            fullname: uses.fullname,
            picture: photo,
            address: uses.address,
            phone: uses.phone,
            gender: gender,
            title: title,
            status: "active",
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        /* SAVE MATERIAL DATA */
        var employeeref = ContactsFactory.eRef();
        var newData = employeeref.child($stateParams.employeeId);
        newData.update($scope.temp, function (ref) {
        });
        $ionicHistory.goBack();
      }else {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var proces = "Casting";
        $scope.temp = {
            process: proces,
            newly: false,
            addedby: CurrentUserService.fullname,
            dateupdated: Date.now()
        }

        /* UPDATE ORDER DATA */
        var orderref = TransactionFactory.tRef();
        var newData = orderref.child(selor.$id);
        newData.update($scope.temp, function (ref) {
        });


        /* PREPARE DATA FOR FIREBASE*/
        var photo = selor.picture;
        $scope.temp = {
            kode: selor.kode,
            tanggalmulai: $scope.OrderDate.getTime(),
            tanggalselesai: $scope.DeadlineDate.getTime(),
            picture: photo,
            pic: selpic.fullname,
            approval: pesanan.express,
            newly: true,
            addedby: CurrentUserService.fullname,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE 3D DATA */
        var ref = fb.child("transactions").child("wax");
        ref.push($scope.temp);
      }

      $ionicLoading.hide();
      $scope.pesanan = {};
      $scope.selor = {};
      $scope.selpic = {};
      $scope.sorder = false;
      $scope.ordershow = "fa fa-chevron-up";
      $scope.OrderDate = '';
      $scope.DeadlineDate = '';
      refresh($scope.pesanan, $scope.selor, $scope.selpic, $scope.item, $scope);
  };

  function refresh(pesanan, $scope, item) {
    $scope.pesanan = {};
    $scope.selor = {'jenis': 'not in list'};
    $scope.selpic = {'fullname': 'not in list'};
    $scope.sorder = false;
    $scope.ordershow = "fa fa-chevron-up";
    $scope.item = {'photo': ''};
    $scope.OrderDate = '';
    $scope.DeadlineDate = '';
  }
})

.controller('castingCtrl', function($scope, ionicDatePicker, $state, $stateParams, $ionicHistory, $ionicLoading, MasterFactory, TransactionFactory, ContactsFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {
  
  $scope.pesanan = {'kode': '','beratawal': '','beratakhir': '','berlian': '','express': ''};
  $scope.OrderDate = '';
  $scope.DeadlineDate = '';
  $scope.materials = [];
  $scope.materials = MasterFactory.getMaterials();
  $scope.materials.$loaded().then(function (x) {
    $scope.selmat = $scope.materials;
    refresh($scope.materials, $scope, MasterFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  $scope.contacts = ContactsFactory.getContacts();
  $scope.contacts.$loaded().then(function (x) {
    $scope.selpic = $scope.contacts;
    refresh($scope.contacts, $scope, ContactsFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  $scope.processCode = "Casting";
  $scope.transactions = [];
  $scope.transactions = TransactionFactory.getDimension($scope.processCode);
  $scope.transactions.$loaded().then(function (x) {
    $scope.selor = $scope.transactions;
    refresh($scope.transactions, $scope, TransactionFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  var tanggal = {
    callback: function (val) {  //Mandatory
      $scope.OrderDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };
  var deadline = {
    callback: function (val) {  //Mandatory
      $scope.DeadlineDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(tanggal);
  };
  $scope.DeadlinePicker = function(){
    ionicDatePicker.openDatePicker(deadline);
  };

  $scope.sorder = false;
  $scope.ordershow = "fa fa-chevron-up";
  $scope.trigorder = function() {
    if ($scope.sorder === false) {
        $scope.sorder = true;
        $scope.ordershow = "fa fa-chevron-down";
    } else if ($scope.sorder === true) {
        $scope.sorder = false;
        $scope.ordershow = "fa fa-chevron-up";
    }
  };

  $scope.cancelOrder = function(pesanan, selor, selpic, selmat) {
    $scope.pesanan = {};
    $scope.selpic = {};
    $scope.selor = {};
    $scope.selmat = {};
    $scope.sorder = false;
    $scope.ordershow = "fa fa-chevron-up";
    $scope.OrderDate = '';
    $scope.DeadlineDate = '';
  };

  $scope.createOrder = function (pesanan, selor, selpic, selmat) {
      
      // Validate form data
      if (typeof pesanan.beratawal === 'undefined' || pesanan.beratawal === '') {
          alert("Bahan Mulai belum diisi");
          return;
      }
      if (typeof pesanan.beratakhir === 'undefined' || pesanan.beratakhir === '') {
          alert("Bahan Akhir belum diisi");
          return;
      }
      if (typeof selor.picture === 'undefined' || selor.picture === '') {
          alert("Order belum dipilih");
          return;
      }
      if (typeof selpic.fullname === 'undefined' || selpic.fullname === '') {
          alert("PIC belum dipilih");
          return;
      }
      if ($scope.OrderDate === 'undefined' || $scope.OrderDate === '') {
          alert("Tanggal pesanan belum dipilih");
          return;
      }
      if ($scope.DeadlineDate === 'undefined' || $scope.DeadlineDate === '') {
          alert("Tanggal Deadline belum dipilih");
          return;
      }
      if (typeof selmat.jenis === 'undefined' || selmat.jenis === '') {
          alert("Jenis Material belum dipilih");
          return;
      }

      if ($scope.inEditMode) {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Editing...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var photo = $scope.item.photo;
        var gender = $scope.gender;
        var title = $scope.title;
        $scope.temp = {
            fullname: uses.fullname,
            picture: photo,
            address: uses.address,
            phone: uses.phone,
            gender: gender,
            title: title,
            status: "active",
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        /* SAVE MATERIAL DATA */
        var employeeref = ContactsFactory.eRef();
        var newData = employeeref.child($stateParams.employeeId);
        newData.update($scope.temp, function (ref) {
        });
        $ionicHistory.goBack();
      }else {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var proces = "Finishing";
        $scope.temp = {
            process: proces,
            newly: false,
            addedby: CurrentUserService.fullname,
            dateupdated: Date.now()
        }

        /* UPDATE ORDER DATA */
        var orderref = TransactionFactory.tRef();
        var newData = orderref.child(selor.$id);
        newData.update($scope.temp, function (ref) {
        });


        /* PREPARE DATA FOR FIREBASE*/
        var sank = parseFloat(pesanan.beratawal) - parseFloat(pesanan.beratakhir);
        var sankcost = sank * parseFloat(selmat.harga);
        var photo = selor.picture;
        $scope.temp = {
            kode: selor.kode,
            tanggalmulai: $scope.OrderDate.getTime(),
            tanggalselesai: $scope.DeadlineDate.getTime(),
            picture: photo,
            pic: selpic.fullname,
            beratawal: pesanan.beratawal,
            beratakhir: pesanan.beratakhir,
            sank: sank.toFixed(2),
            sankcost: sankcost.toFixed(0),
            newly: true,
            addedby: CurrentUserService.fullname,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE 3D DATA */
        var ref = fb.child("transactions").child("casting");
        ref.push($scope.temp);
      }

      $ionicLoading.hide();
      $scope.pesanan = {};
      $scope.selor = {};
      $scope.selpic = {};
      $scope.selmat = {};
      $scope.sorder = false;
      $scope.ordershow = "fa fa-chevron-up";
      $scope.OrderDate = '';
      $scope.DeadlineDate = '';
      refresh($scope.pesanan, $scope.selor, $scope.selpic, $scope.item, $scope);
  };

  function refresh(pesanan, $scope, item) {
    $scope.pesanan = {};
    $scope.selor = {'jenis': 'not in list'};
    $scope.selpic = {'fullname': 'not in list'};
    $scope.selmat = {'jenis': 'not in list'};
    $scope.sorder = false;
    $scope.ordershow = "fa fa-chevron-up";
    $scope.item = {'photo': ''};
    $scope.OrderDate = '';
    $scope.DeadlineDate = '';
  }
})

.controller('finishingCtrl', function($scope, ionicDatePicker, $state, $stateParams, $ionicHistory, $ionicLoading, MasterFactory, TransactionFactory, ContactsFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {
  
  $scope.pesanan = {'kode': '','beratawal': '','beratakhir': '','berlian': '','express': ''};
  $scope.OrderDate = '';
  $scope.DeadlineDate = '';
  $scope.materials = [];
  $scope.materials = MasterFactory.getMaterials();
  $scope.materials.$loaded().then(function (x) {
    $scope.selmat = $scope.materials;
    refresh($scope.materials, $scope, MasterFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  $scope.contacts = ContactsFactory.getContacts();
  $scope.contacts.$loaded().then(function (x) {
    $scope.selpic = $scope.contacts;
    refresh($scope.contacts, $scope, ContactsFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  $scope.processCode = "Finishing";
  $scope.transactions = [];
  $scope.transactions = TransactionFactory.getDimension($scope.processCode);
  $scope.transactions.$loaded().then(function (x) {
    $scope.selor = $scope.transactions;
    refresh($scope.transactions, $scope, TransactionFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  var tanggal = {
    callback: function (val) {  //Mandatory
      $scope.OrderDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };
  var deadline = {
    callback: function (val) {  //Mandatory
      $scope.DeadlineDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(tanggal);
  };
  $scope.DeadlinePicker = function(){
    ionicDatePicker.openDatePicker(deadline);
  };

  $scope.sorder = false;
  $scope.ordershow = "fa fa-chevron-up";
  $scope.trigorder = function() {
    if ($scope.sorder === false) {
        $scope.sorder = true;
        $scope.ordershow = "fa fa-chevron-down";
    } else if ($scope.sorder === true) {
        $scope.sorder = false;
        $scope.ordershow = "fa fa-chevron-up";
    }
  };

  $scope.cancelOrder = function(pesanan, selor, selpic, selmat) {
    $scope.pesanan = {};
    $scope.selpic = {};
    $scope.selor = {};
    $scope.selmat = {};
    $scope.sorder = false;
    $scope.ordershow = "fa fa-chevron-up";
    $scope.OrderDate = '';
    $scope.DeadlineDate = '';
  };

  $scope.createOrder = function (pesanan, selor, selpic, selmat) {
      
      // Validate form data
      if (typeof pesanan.beratawal === 'undefined' || pesanan.beratawal === '') {
          alert("Bahan Mulai belum diisi");
          return;
      }
      if (typeof pesanan.beratakhir === 'undefined' || pesanan.beratakhir === '') {
          alert("Bahan Akhir belum diisi");
          return;
      }
      if (typeof pesanan.tambahbahan === 'undefined' || pesanan.tambahbahan === '') {
          alert("Tambah Bahan belum diisi");
          return;
      }
      if (typeof selor.picture === 'undefined' || selor.picture === '') {
          alert("Order belum dipilih");
          return;
      }
      if (typeof selpic.fullname === 'undefined' || selpic.fullname === '') {
          alert("PIC belum dipilih");
          return;
      }
      if ($scope.OrderDate === 'undefined' || $scope.OrderDate === '') {
          alert("Tanggal pesanan belum dipilih");
          return;
      }
      if ($scope.DeadlineDate === 'undefined' || $scope.DeadlineDate === '') {
          alert("Tanggal Deadline belum dipilih");
          return;
      }
      if (typeof selmat.jenis === 'undefined' || selmat.jenis === '') {
          alert("Jenis Material belum dipilih");
          return;
      }

      if ($scope.inEditMode) {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Editing...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var photo = $scope.item.photo;
        var gender = $scope.gender;
        var title = $scope.title;
        $scope.temp = {
            fullname: uses.fullname,
            picture: photo,
            address: uses.address,
            phone: uses.phone,
            gender: gender,
            title: title,
            status: "active",
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        /* SAVE MATERIAL DATA */
        var employeeref = ContactsFactory.eRef();
        var newData = employeeref.child($stateParams.employeeId);
        newData.update($scope.temp, function (ref) {
        });
        $ionicHistory.goBack();
      }else {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var proces = "Setting";
        $scope.temp = {
            process: proces,
            newly: false,
            addedby: CurrentUserService.fullname,
            dateupdated: Date.now()
        }

        /* UPDATE ORDER DATA */
        var orderref = TransactionFactory.tRef();
        var newData = orderref.child(selor.$id);
        newData.update($scope.temp, function (ref) {
        });


        /* PREPARE DATA FOR FIREBASE*/
        var susut = parseFloat(pesanan.beratawal) - parseFloat(pesanan.beratakhir);
        var jatahsusut = susut * parseFloat(selmat.harga);
        var photo = selor.picture;
        $scope.temp = {
            kode: selor.kode,
            tanggalmulai: $scope.OrderDate.getTime(),
            tanggalselesai: $scope.DeadlineDate.getTime(),
            picture: photo,
            pic: selpic.fullname,
            beratawal: pesanan.beratawal,
            beratakhir: pesanan.beratakhir,
            tambahbahan: pesanan.tambahbahan,
            susut: susut.toFixed(2),
            jatahsusut: jatahsusut.toFixed(0),
            newly: true,
            addedby: CurrentUserService.fullname,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE 3D DATA */
        var ref = fb.child("transactions").child("finishing");
        ref.push($scope.temp);
      }

      $ionicLoading.hide();
      $scope.pesanan = {};
      $scope.selor = {};
      $scope.selpic = {};
      $scope.selmat = {};
      $scope.sorder = false;
      $scope.ordershow = "fa fa-chevron-up";
      $scope.OrderDate = '';
      $scope.DeadlineDate = '';
      refresh($scope.pesanan, $scope.selor, $scope.selpic, $scope.item, $scope);
  };

  function refresh(pesanan, $scope, item) {
    $scope.pesanan = {};
    $scope.selor = {'jenis': 'not in list'};
    $scope.selpic = {'fullname': 'not in list'};
    $scope.selmat = {'jenis': 'not in list'};
    $scope.sorder = false;
    $scope.ordershow = "fa fa-chevron-up";
    $scope.item = {'photo': ''};
    $scope.OrderDate = '';
    $scope.DeadlineDate = '';
  }
})

.controller('settingCtrl', function($scope, ionicDatePicker, $state, $stateParams, $ionicHistory, $ionicLoading, MasterFactory, TransactionFactory, ContactsFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {
  
  $scope.pesanan = {'kode': '','beratawal': '','beratakhir': '','berlian': '','express': ''};
  $scope.OrderDate = '';
  $scope.DeadlineDate = '';
  $scope.materials = [];
  $scope.materials = MasterFactory.getMaterials();
  $scope.materials.$loaded().then(function (x) {
    $scope.selmat = $scope.materials;
    refresh($scope.materials, $scope, MasterFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  $scope.contacts = ContactsFactory.getContacts();
  $scope.contacts.$loaded().then(function (x) {
    $scope.selpic = $scope.contacts;
    refresh($scope.contacts, $scope, ContactsFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  $scope.processCode = "Setting";
  $scope.transactions = [];
  $scope.transactions = TransactionFactory.getDimension($scope.processCode);
  $scope.transactions.$loaded().then(function (x) {
    $scope.selor = $scope.transactions;
    refresh($scope.transactions, $scope, TransactionFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  var tanggal = {
    callback: function (val) {  //Mandatory
      $scope.OrderDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };
  var deadline = {
    callback: function (val) {  //Mandatory
      $scope.DeadlineDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(tanggal);
  };
  $scope.DeadlinePicker = function(){
    ionicDatePicker.openDatePicker(deadline);
  };

  $scope.sorder = false;
  $scope.ordershow = "fa fa-chevron-up";
  $scope.trigorder = function() {
    if ($scope.sorder === false) {
        $scope.sorder = true;
        $scope.ordershow = "fa fa-chevron-down";
    } else if ($scope.sorder === true) {
        $scope.sorder = false;
        $scope.ordershow = "fa fa-chevron-up";
    }
  };

  $scope.cancelOrder = function(pesanan, selor, selpic, selmat) {
    $scope.pesanan = {};
    $scope.selpic = {};
    $scope.selor = {};
    $scope.selmat = {};
    $scope.sorder = false;
    $scope.ordershow = "fa fa-chevron-up";
    $scope.OrderDate = '';
    $scope.DeadlineDate = '';
  };

  $scope.createOrder = function (pesanan, selor, selpic, selmat) {
      
      // Validate form data
      if (typeof pesanan.beratawal === 'undefined' || pesanan.beratawal === '') {
          alert("Bahan Mulai belum diisi");
          return;
      }
      if (typeof pesanan.beratakhir === 'undefined' || pesanan.beratakhir === '') {
          alert("Bahan Akhir belum diisi");
          return;
      }
      if (typeof selor.picture === 'undefined' || selor.picture === '') {
          alert("Order belum dipilih");
          return;
      }
      if (typeof selpic.fullname === 'undefined' || selpic.fullname === '') {
          alert("PIC belum dipilih");
          return;
      }
      if ($scope.OrderDate === 'undefined' || $scope.OrderDate === '') {
          alert("Tanggal pesanan belum dipilih");
          return;
      }
      if ($scope.DeadlineDate === 'undefined' || $scope.DeadlineDate === '') {
          alert("Tanggal Deadline belum dipilih");
          return;
      }
      if (typeof selmat.jenis === 'undefined' || selmat.jenis === '') {
          alert("Jenis Material belum dipilih");
          return;
      }

      if ($scope.inEditMode) {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Editing...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var photo = $scope.item.photo;
        var gender = $scope.gender;
        var title = $scope.title;
        $scope.temp = {
            fullname: uses.fullname,
            picture: photo,
            address: uses.address,
            phone: uses.phone,
            gender: gender,
            title: title,
            status: "active",
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        /* SAVE MATERIAL DATA */
        var employeeref = ContactsFactory.eRef();
        var newData = employeeref.child($stateParams.employeeId);
        newData.update($scope.temp, function (ref) {
        });
        $ionicHistory.goBack();
      }else {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var proces = "Polishing";
        $scope.temp = {
            process: proces,
            newly: false,
            addedby: CurrentUserService.fullname,
            dateupdated: Date.now()
        }

        /* UPDATE ORDER DATA */
        var orderref = TransactionFactory.tRef();
        var newData = orderref.child(selor.$id);
        newData.update($scope.temp, function (ref) {
        });


        /* PREPARE DATA FOR FIREBASE*/
        var susut = parseFloat(pesanan.beratawal) - parseFloat(pesanan.beratakhir);
        var jatahsusut = susut * parseFloat(selmat.harga);
        var photo = selor.picture;
        $scope.temp = {
            kode: selor.kode,
            tanggalmulai: $scope.OrderDate.getTime(),
            tanggalselesai: $scope.DeadlineDate.getTime(),
            picture: photo,
            pic: selpic.fullname,
            beratawal: pesanan.beratawal,
            beratakhir: pesanan.beratakhir,
            susut: susut.toFixed(2),
            jatahsusut: jatahsusut.toFixed(0),
            newly: true,
            addedby: CurrentUserService.fullname,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE 3D DATA */
        var ref = fb.child("transactions").child("setting");
        ref.push($scope.temp);
      }

      $ionicLoading.hide();
      $scope.pesanan = {};
      $scope.selor = {};
      $scope.selpic = {};
      $scope.selmat = {};
      $scope.sorder = false;
      $scope.ordershow = "fa fa-chevron-up";
      $scope.OrderDate = '';
      $scope.DeadlineDate = '';
      refresh($scope.pesanan, $scope.selor, $scope.selpic, $scope.item, $scope);
  };

  function refresh(pesanan, $scope, item) {
    $scope.pesanan = {};
    $scope.selor = {'jenis': 'not in list'};
    $scope.selpic = {'fullname': 'not in list'};
    $scope.selmat = {'jenis': 'not in list'};
    $scope.sorder = false;
    $scope.ordershow = "fa fa-chevron-up";
    $scope.item = {'photo': ''};
    $scope.OrderDate = '';
    $scope.DeadlineDate = '';
  }
})

.controller('polishingCtrl', function($scope, ionicDatePicker, $state, $stateParams, $ionicHistory, $ionicLoading, MasterFactory, TransactionFactory, ContactsFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {
  
  $scope.pesanan = {'kode': '','beratawal': '','beratakhir': '','berlian': '','express': ''};
  $scope.OrderDate = '';
  $scope.DeadlineDate = '';
  $scope.materials = [];
  $scope.materials = MasterFactory.getMaterials();
  $scope.materials.$loaded().then(function (x) {
    $scope.selmat = $scope.materials;
    refresh($scope.materials, $scope, MasterFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  $scope.contacts = ContactsFactory.getContacts();
  $scope.contacts.$loaded().then(function (x) {
    $scope.selpic = $scope.contacts;
    refresh($scope.contacts, $scope, ContactsFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  $scope.processCode = "Polishing";
  $scope.transactions = [];
  $scope.transactions = TransactionFactory.getDimension($scope.processCode);
  $scope.transactions.$loaded().then(function (x) {
    $scope.selor = $scope.transactions;
    refresh($scope.transactions, $scope, TransactionFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  var tanggal = {
    callback: function (val) {  //Mandatory
      $scope.OrderDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };
  var deadline = {
    callback: function (val) {  //Mandatory
      $scope.DeadlineDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(tanggal);
  };
  $scope.DeadlinePicker = function(){
    ionicDatePicker.openDatePicker(deadline);
  };

  $scope.sorder = false;
  $scope.ordershow = "fa fa-chevron-up";
  $scope.trigorder = function() {
    if ($scope.sorder === false) {
        $scope.sorder = true;
        $scope.ordershow = "fa fa-chevron-down";
    } else if ($scope.sorder === true) {
        $scope.sorder = false;
        $scope.ordershow = "fa fa-chevron-up";
    }
  };

  $scope.cancelOrder = function(pesanan, selor, selpic, selmat) {
    $scope.pesanan = {};
    $scope.selpic = {};
    $scope.selor = {};
    $scope.selmat = {};
    $scope.sorder = false;
    $scope.ordershow = "fa fa-chevron-up";
    $scope.OrderDate = '';
    $scope.DeadlineDate = '';
  };

  $scope.createOrder = function (pesanan, selor, selpic, selmat) {
      
      // Validate form data
      if (typeof pesanan.beratawal === 'undefined' || pesanan.beratawal === '') {
          alert("Bahan Mulai belum diisi");
          return;
      }
      if (typeof pesanan.beratakhir === 'undefined' || pesanan.beratakhir === '') {
          alert("Bahan Akhir belum diisi");
          return;
      }
      if (typeof selor.picture === 'undefined' || selor.picture === '') {
          alert("Order belum dipilih");
          return;
      }
      if (typeof selpic.fullname === 'undefined' || selpic.fullname === '') {
          alert("PIC belum dipilih");
          return;
      }
      if ($scope.OrderDate === 'undefined' || $scope.OrderDate === '') {
          alert("Tanggal pesanan belum dipilih");
          return;
      }
      if ($scope.DeadlineDate === 'undefined' || $scope.DeadlineDate === '') {
          alert("Tanggal Deadline belum dipilih");
          return;
      }
      if (typeof selmat.jenis === 'undefined' || selmat.jenis === '') {
          alert("Jenis Material belum dipilih");
          return;
      }

      if ($scope.inEditMode) {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Editing...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var photo = $scope.item.photo;
        var gender = $scope.gender;
        var title = $scope.title;
        $scope.temp = {
            fullname: uses.fullname,
            picture: photo,
            address: uses.address,
            phone: uses.phone,
            gender: gender,
            title: title,
            status: "active",
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        /* SAVE MATERIAL DATA */
        var employeeref = ContactsFactory.eRef();
        var newData = employeeref.child($stateParams.employeeId);
        newData.update($scope.temp, function (ref) {
        });
        $ionicHistory.goBack();
      }else {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var proces = "Chrome";
        $scope.temp = {
            process: proces,
            newly: false,
            addedby: CurrentUserService.fullname,
            dateupdated: Date.now()
        }

        /* UPDATE ORDER DATA */
        var orderref = TransactionFactory.tRef();
        var newData = orderref.child(selor.$id);
        newData.update($scope.temp, function (ref) {
        });


        /* PREPARE DATA FOR FIREBASE*/
        var susut = parseFloat(pesanan.beratawal) - parseFloat(pesanan.beratakhir);
        var jatahsusut = susut * parseFloat(selmat.harga);
        var photo = selor.picture;
        $scope.temp = {
            kode: selor.kode,
            tanggalmulai: $scope.OrderDate.getTime(),
            tanggalselesai: $scope.DeadlineDate.getTime(),
            picture: photo,
            pic: selpic.fullname,
            beratawal: pesanan.beratawal,
            beratakhir: pesanan.beratakhir,
            susut: susut.toFixed(2),
            jatahsusut: jatahsusut.toFixed(0),
            newly: true,
            addedby: CurrentUserService.fullname,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE 3D DATA */
        var ref = fb.child("transactions").child("polishing");
        ref.push($scope.temp);
      }

      $ionicLoading.hide();
      $scope.pesanan = {};
      $scope.selor = {};
      $scope.selpic = {};
      $scope.selmat = {};
      $scope.sorder = false;
      $scope.ordershow = "fa fa-chevron-up";
      $scope.OrderDate = '';
      $scope.DeadlineDate = '';
      refresh($scope.pesanan, $scope.selor, $scope.selpic, $scope.item, $scope);
  };

  function refresh(pesanan, $scope, item) {
    $scope.pesanan = {};
    $scope.selor = {'jenis': 'not in list'};
    $scope.selpic = {'fullname': 'not in list'};
    $scope.selmat = {'jenis': 'not in list'};
    $scope.sorder = false;
    $scope.ordershow = "fa fa-chevron-up";
    $scope.item = {'photo': ''};
    $scope.OrderDate = '';
    $scope.DeadlineDate = '';
  }
})

.controller('chromeCtrl', function($scope, ionicDatePicker, $state, $stateParams, $ionicHistory, $ionicLoading, MasterFactory, TransactionFactory, ContactsFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {
  
  $scope.pesanan = {'kode': '','beratawal': '','beratakhir': '','berlian': '','express': ''};
  $scope.OrderDate = '';
  $scope.DeadlineDate = '';
  $scope.materials = [];
  $scope.materials = MasterFactory.getMaterials();
  $scope.materials.$loaded().then(function (x) {
    $scope.selmat = $scope.materials;
    refresh($scope.materials, $scope, MasterFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  $scope.contacts = ContactsFactory.getContacts();
  $scope.contacts.$loaded().then(function (x) {
    $scope.selpic = $scope.contacts;
    refresh($scope.contacts, $scope, ContactsFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  $scope.processCode = "Chrome";
  $scope.transactions = [];
  $scope.transactions = TransactionFactory.getDimension($scope.processCode);
  $scope.transactions.$loaded().then(function (x) {
    $scope.selor = $scope.transactions;
    refresh($scope.transactions, $scope, TransactionFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  var tanggal = {
    callback: function (val) {  //Mandatory
      $scope.OrderDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };
  var deadline = {
    callback: function (val) {  //Mandatory
      $scope.DeadlineDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(tanggal);
  };
  $scope.DeadlinePicker = function(){
    ionicDatePicker.openDatePicker(deadline);
  };

  $scope.sorder = false;
  $scope.ordershow = "fa fa-chevron-up";
  $scope.trigorder = function() {
    if ($scope.sorder === false) {
        $scope.sorder = true;
        $scope.ordershow = "fa fa-chevron-down";
    } else if ($scope.sorder === true) {
        $scope.sorder = false;
        $scope.ordershow = "fa fa-chevron-up";
    }
  };

  $scope.cancelOrder = function(pesanan, selor, selpic, selmat) {
    $scope.pesanan = {};
    $scope.selpic = {};
    $scope.selor = {};
    $scope.selmat = {};
    $scope.sorder = false;
    $scope.ordershow = "fa fa-chevron-up";
    $scope.OrderDate = '';
    $scope.DeadlineDate = '';
  };

  $scope.createOrder = function (pesanan, selor, selpic, selmat) {
      
      // Validate form data
      if (typeof pesanan.beratawal === 'undefined' || pesanan.beratawal === '') {
          alert("Bahan Mulai belum diisi");
          return;
      }
      if (typeof pesanan.beratakhir === 'undefined' || pesanan.beratakhir === '') {
          alert("Bahan Akhir belum diisi");
          return;
      }
      if (typeof pesanan.express === 'undefined' || pesanan.express === '') {
          pesanan.express = false;
          return;
      }
      if (typeof selor.picture === 'undefined' || selor.picture === '') {
          alert("Order belum dipilih");
          return;
      }
      if (typeof selpic.fullname === 'undefined' || selpic.fullname === '') {
          alert("PIC belum dipilih");
          return;
      }
      if ($scope.OrderDate === 'undefined' || $scope.OrderDate === '') {
          alert("Tanggal pesanan belum dipilih");
          return;
      }
      if ($scope.DeadlineDate === 'undefined' || $scope.DeadlineDate === '') {
          alert("Tanggal Deadline belum dipilih");
          return;
      }
      if (typeof selmat.jenis === 'undefined' || selmat.jenis === '') {
          alert("Jenis Material belum dipilih");
          return;
      }

      if ($scope.inEditMode) {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Editing...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var photo = $scope.item.photo;
        var gender = $scope.gender;
        var title = $scope.title;
        $scope.temp = {
            fullname: uses.fullname,
            picture: photo,
            address: uses.address,
            phone: uses.phone,
            gender: gender,
            title: title,
            status: "active",
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        /* SAVE MATERIAL DATA */
        var employeeref = ContactsFactory.eRef();
        var newData = employeeref.child($stateParams.employeeId);
        newData.update($scope.temp, function (ref) {
        });
        $ionicHistory.goBack();
      }else {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var proces = "Done";
        $scope.temp = {
            process: proces,
            newly: false,
            addedby: CurrentUserService.fullname,
            dateupdated: Date.now()
        }

        /* UPDATE ORDER DATA */
        var orderref = TransactionFactory.tRef();
        var newData = orderref.child(selor.$id);
        newData.update($scope.temp, function (ref) {
        });


        /* PREPARE DATA FOR FIREBASE*/
        var photo = selor.picture;
        $scope.temp = {
            kode: selor.kode,
            tanggalmulai: $scope.OrderDate.getTime(),
            tanggalselesai: $scope.DeadlineDate.getTime(),
            picture: photo,
            pic: selpic.fullname,
            beratawal: pesanan.beratawal,
            beratakhir: pesanan.beratakhir,
            reject: pesanan.express,
            newly: true,
            addedby: CurrentUserService.fullname,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE 3D DATA */
        var ref = fb.child("transactions").child("chrome");
        ref.push($scope.temp);
      }

      $ionicLoading.hide();
      $scope.pesanan = {};
      $scope.selor = {};
      $scope.selpic = {};
      $scope.selmat = {};
      $scope.sorder = false;
      $scope.ordershow = "fa fa-chevron-up";
      $scope.OrderDate = '';
      $scope.DeadlineDate = '';
      refresh($scope.pesanan, $scope.selor, $scope.selpic, $scope.item, $scope);
  };

  function refresh(pesanan, $scope, item) {
    $scope.pesanan = {};
    $scope.selor = {'jenis': 'not in list'};
    $scope.selpic = {'fullname': 'not in list'};
    $scope.selmat = {'jenis': 'not in list'};
    $scope.sorder = false;
    $scope.ordershow = "fa fa-chevron-up";
    $scope.item = {'photo': ''};
    $scope.OrderDate = '';
    $scope.DeadlineDate = '';
  }
})

.controller('inventoryusesCtrl', function($scope, $state, $stateParams, $ionicHistory, $ionicLoading, MasterFactory, ContactsFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {

  $scope.uses = {'number': '','inventory': '','PIC': '','photo': '','picture': ''};
  $scope.selinven = {};
  $scope.selpic = {};
  $scope.inEditMode = false;
  $scope.inventories = [];
  $scope.contacts = [];
  $scope.inventories = MasterFactory.getInventories();
  $scope.inventories.$loaded().then(function (x) {
    $scope.selinven = $scope.inventories;
    refresh($scope.inventories, $scope, MasterFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  $scope.contacts = ContactsFactory.getContacts();
  $scope.contacts.$loaded().then(function (x) {
    $scope.selpic = $scope.contacts;
    refresh($scope.contacts, $scope, ContactsFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.stock = $scope.selinven.stock;
  });

  $scope.myFunc = function() {
    if($scope.uses.number !== undefined){
      if(parseFloat($scope.selinven.stock) > parseFloat($scope.uses.number)){
        $scope.stock = parseFloat($scope.selinven.stock) - parseFloat($scope.uses.number);
      } else {
        alert("Stock tidak cukup");
        $scope.uses.number = "";
        $scope.stock = parseFloat($scope.selinven.stock);
      }
    } else {
      $scope.stock = parseFloat($scope.selinven.stock);
    }
  };

  $scope.createUses = function (uses, selinven, selpic) {
      
      // Validate form data
      if (typeof uses.number === 'undefined' || uses.number === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter number"
          return;
      }

      if ($scope.inEditMode) {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Editing...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var currentstock = parseFloat(selinven.stock) - parseFloat($scope.uses.number);;
        $scope.temp = {
            stock: currentstock,
            addedby: CurrentUserService.fullname,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MATERIAL DATA */
        var inventoryref = MasterFactory.iRef();
        var newData = inventoryref.child(selinven.$id);
        newData.update($scope.temp, function (ref) {
        });

        /* PREPARE DATA FOR FIREBASE*/
        var photo = selinven.picture;
        var pic = selpic.fullname;
        $scope.temp = {
            number: uses.number,
            name: selinven.name,
            inventoryid: selinven.$id,
            picture: photo,
            pic: pic,
            status: "active",
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        var ref = fb.child("transactions").child("inventoryuses");
        ref.push($scope.temp);
        $ionicHistory.goBack();
      }else {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var currentstock = parseFloat(selinven.stock) - parseFloat($scope.uses.number);
        $scope.temp = {
            stock: currentstock,
            addedby: CurrentUserService.fullname,
            dateupdated: Date.now()
        }

        /* SAVE MATERIAL DATA */
        var inventoryref = MasterFactory.iRef();
        var newData = inventoryref.child(selinven.$id);
        newData.update($scope.temp, function (ref) {
        });

        /* PREPARE DATA FOR FIREBASE*/
        var photo = selinven.picture;
        var pic = selpic.fullname;
        $scope.temp = {
            number: uses.number,
            name: selinven.name,
            inventoryid: selinven.$id,
            picture: photo,
            pic: pic,
            status: "active",
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        var ref = fb.child("transactions").child("inventoryuses");
        ref.push($scope.temp);
      }

      $ionicLoading.hide();
      refresh($scope.uses, $scope);
  };

  function refresh(uses, $scope, stock) {
    $scope.uses = {'number': '','inventory': '','PIC': '','photo': '','picture': ''};
    $scope.selinven = {'stock': '','name': ''};
    $scope.selpic = {'fullname': ''};
  }
})

.controller('transferbahanCtrl', function($scope, $state, $stateParams, $ionicHistory, $ionicLoading, MasterFactory, ContactsFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {

  $scope.transfer = {'beratjadi': ''};
  $scope.item = {'photo': ''};
  $scope.selpic = {};
  $scope.inEditMode = false;
  $scope.materials = [];
  $scope.materials = MasterFactory.getMaterials();
  $scope.materials.$loaded().then(function (x) {
    $scope.selmat = $scope.materials;
    refresh($scope.materials, $scope, MasterFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });
  $scope.contacts = ContactsFactory.getContacts();
  $scope.contacts.$loaded().then(function (x) {
    $scope.selpic = $scope.contacts;
    refresh($scope.contacts, $scope, ContactsFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.$on('$ionicView.beforeEnter', function () {
  });

  $scope.calBerat = function(materials) {
    var total = 0;
    var berat = 0;
    var harga = 0;
    var nilai = 0;
    var index;
    //
    for (index = 0; index < materials.length; ++index) {
        //
        var material = materials[index];
        //
        total++;
        if (material.transfer === true) {
          if (!isNaN(material.berattransfer)) {
            berat = berat + parseFloat(material.berattransfer);
            nilai = parseFloat(material.berattransfer) * parseFloat(material.harga);
            harga = harga + nilai;
          }
        }
    }
    $scope.beratbahan = berat;
    $scope.hargabahan = harga;
  };

  $scope.takepic = function() {
    
    var filesSelected = document.getElementById("nameImg").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent) {
        var textAreaFileContents = document.getElementById(
          "textAreaFileContents"
        );
        $scope.item = {
          photo: fileLoadedEvent.target.result
        };
        $scope.transfer.photo = fileLoadedEvent.target.result;
        PickTransactionServices.updatePhoto($scope.item.photo);
      };

      fileReader.readAsDataURL(fileToLoad);
    }
  };

  $scope.createTransfer = function (transfer, materials, selpic, selmat) {
      
      // Validate form data
      if (typeof selmat.jenis === 'undefined' || selmat.jenis === '') {
          alert("Transfer to Belum pilih");
          return;
      }
      if (typeof transfer.beratjadi === 'undefined' || transfer.beratjadi === '') {
          alert("Berat Jadi Belum Diisi");
          return;
      }
      if (typeof selmat.harga === 'undefined' || selmat.harga === '') {
          alert("Harga Belum Diisi");
          return;
      }
      if (typeof selpic.fullname === 'undefined' || selpic.fullname === '') {
          alert("PIC belum dipilih");
          return;
      }

      if ($scope.inEditMode) {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Editing...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var index;
        //
        for (index = 0; index < materials.length; ++index) {
            //
            var material = materials[index];
            //
            if (material.transfer === true) {
              if (!isNaN(material.berattransfer)) {
                var currentstock = parseFloat(material.stock) - parseFloat(material.berattransfer);
                $scope.temp = {
                    stock: currentstock,
                    addedby: CurrentUserService.fullname,
                    dateupdated: Date.now()
                }
                /* SAVE MATERIAL DATA */
                var materialref = MasterFactory.mRef();
                var newData = materialref.child(material.$id);
                newData.update($scope.temp, function (ref) {
                });
              }
            }
        }
        

        /* PREPARE DATA FOR FIREBASE*/
        var sank = parseFloat($scope.beratbahan) - parseFloat(transfer.beratjadi);
        var sankcost = sank * parseFloat($scope.hargabahan);
        var photo = selmat.picture;
        var pic = selpic.fullname;
        $scope.temp = {
            stock: transfer.beratjadi,
            harga: $scope.hargabahan,
            transfer: false,
            berattransfer: "",
            picture: photo,
            pic: pic,
            sank: sank.toFixed(2),
            sankcost: sankcost.toFixed(0),
            addedby: CurrentUserService.fullname,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        var materialref = MasterFactory.mRef();
        var newData = materialref.child(selmat.$id);
        newData.update($scope.temp, function (ref) {
        });
        $ionicHistory.goBack();
      }else {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var index;
        //
        for (index = 0; index < materials.length; ++index) {
            //
            var material = materials[index];
            //
            if (material.transfer === true) {
              if (!isNaN(material.berattransfer)) {
                var currentstock = parseFloat(material.stock) - parseFloat(material.berattransfer);
                $scope.temp = {
                    stock: currentstock,
                    addedby: CurrentUserService.fullname,
                    dateupdated: Date.now()
                }
                /* SAVE MATERIAL DATA */
                var materialref = MasterFactory.mRef();
                var newData = materialref.child(material.$id);
                newData.update($scope.temp, function (ref) {
                });
              }
            }
        }
        

        /* PREPARE DATA FOR FIREBASE*/
        var sank = parseFloat($scope.beratbahan) - parseFloat(transfer.beratjadi);
        var sankcost = sank * parseFloat($scope.hargabahan);
        var photo = selmat.picture;
        var pic = selpic.fullname;
        $scope.temp = {
            stock: transfer.beratjadi,
            harga: $scope.hargabahan,
            transfer: false,
            berattransfer: "",
            picture: photo,
            pic: pic,
            sank: sank.toFixed(2),
            sankcost: sankcost.toFixed(0),
            addedby: CurrentUserService.fullname,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        var materialref = MasterFactory.mRef();
        var newData = materialref.child(selmat.$id);
        newData.update($scope.temp, function (ref) {
        });
      }

      $ionicLoading.hide();
      refresh($scope.transfer, $scope);
  };

  function refresh(transfer, $scope, item) {
    $scope.transfer = {'beratjadi': ''};
    $scope.selmat = {'jenis': 'not in list'};
    $scope.selpic = {'fullname': 'not in list'};
    $scope.beratbahan = "";
    $scope.hargabahan = "";
    $scope.item = {'photo': ''};
  }
})

.controller('registrationCtrl', function($scope, $state, $ionicLoading, MembersFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {

  $scope.user = {};
  $scope.item = {'photo': ''};

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.item.photo = PickTransactionServices.photoSelected;
  });

  // Gender
  $scope.male = "";
  $scope.female = "";
  $scope.trigmale = function() {
    $scope.male = "checked";
    $scope.female = "";
    $scope.gender = "male";
  };
  $scope.trigfemale = function() {
    $scope.male = "";
    $scope.female = "checked";
    $scope.gender = "female";
  };

  // User Level
  $scope.admin = "";
  $scope.finance = "";
  $scope.sales = "";
  $scope.customer = "";
  $scope.trigadmin = function() {
    $scope.admin = "checked";
    $scope.finance = "";
    $scope.sales = "";
    $scope.customer = "";
    $scope.level = "admin";
  };
  $scope.trigfinance = function() {
    $scope.admin = "";
    $scope.finance = "checked";
    $scope.sales = "";
    $scope.customer = "";
    $scope.level = "finance";
  };
  $scope.trigsales = function() {
    $scope.admin = "";
    $scope.finance = "";
    $scope.sales = "checked";
    $scope.customer = "";
    $scope.level = "sales";
  };
  $scope.trigcustomer = function() {
    $scope.admin = "";
    $scope.finance = "";
    $scope.sales = "";
    $scope.customer = "checked";
    $scope.level = "customer";
  };

  $scope.takepic = function() {
    
    var filesSelected = document.getElementById("nameImg").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent) {
        var textAreaFileContents = document.getElementById(
          "textAreaFileContents"
        );
        $scope.item = {
          photo: fileLoadedEvent.target.result
        };
        PickTransactionServices.updatePhoto($scope.item.photo);
      };

      fileReader.readAsDataURL(fileToLoad);
    }
  };

  $scope.createMember = function (user) {
      var email = user.email;
      var password = user.password;
      var filesSelected = document.getElementById("nameImg").files;
      if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
          var textAreaFileContents = document.getElementById(
            "textAreaFileContents"
          );
          $scope.item = {
            photo: fileLoadedEvent.target.result
          };
          PickTransactionServices.updatePhoto($scope.item.photo);
        };

        fileReader.readAsDataURL(fileToLoad);
      }

      // Validate form data
      if (typeof user.fullname === 'undefined' || user.fullname === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your name"
          return;
      }
      if (typeof user.email === 'undefined' || user.email === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your email"
          return;
      }
      if (typeof user.password === 'undefined' || user.password === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your password"
          return;
      }

      $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br>Registering...'
      });

      fb.createUser({
          email: user.email,
          password: user.password
      }, function (error, userData) {
          if (error) {
              switch (error.code) {
                  case "EMAIL_TAKEN":
                      $ionicLoading.hide();
                      $ionicPopup.alert({title: 'Register Failed', template: 'The email entered is already in use!'});
                      break;
                  case "INVALID_EMAIL":
                      $ionicLoading.hide();
                      $ionicPopup.alert({title: 'Register Failed', template: 'The specified email is not a valid email!'});
                      break;
                  default:
                      $ionicLoading.hide();
                      $ionicPopup.alert({title: 'Register Failed', template: 'Oops. Something went wrong!'});
              }
          } else {
              fb.authWithPassword({
                  "email": user.email,
                  "password": user.password
              }, function (error, authData) {
                  if (error) {
                      $ionicLoading.hide();
                      $ionicPopup.alert({title: 'Register Failed', template: 'Error. Login failed!'});
                  } else {

                      /* PREPARE DATA FOR FIREBASE*/
                      var photo = $scope.item.photo;
                      var gender = $scope.gender;
                      var level = $scope.level;
                      $scope.temp = {
                          fullname: user.fullname,
                          picture: photo,
                          email: user.email,
                          gender: gender,
                          level: level,
                          datecreated: Date.now(),
                          dateupdated: Date.now()
                      }

                      /* SAVE MEMBER DATA */
                      var membersref = MembersFactory.ref();
                      var newUser = membersref.child(authData.uid);
                      newUser.update($scope.temp, function (ref) {
                      addImage = newUser.child("images");
                      });
                      MembersFactory.getMember(authData).then(function (thisuser) {
                        /* Save user data for later use */
                        myCache.put('thisUserName', thisuser.fullname);
                        myCache.put('thisMemberId', authData.uid);
                        CurrentUserService.updateUser(thisuser);
                      });

                      $ionicLoading.hide();
                      $state.go('app.dashboard');
                  }
              });
          }
      });
  };
})

.controller('employeeCtrl', function($scope, $state, $stateParams, $ionicHistory, $ionicLoading, MembersFactory, ContactsFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {

  $scope.user = {'fullname': '','address': '','phone': '','photo': '','picture': ''};
  $scope.item = {'photo': ''};
  $scope.inEditMode = false;

  $scope.$on('$ionicView.beforeEnter', function () {
    if ($scope.user.picture === ""){
       $scope.item.photo = PickTransactionServices.photoSelected;
    } else {
      $scope.item = {'photo': $scope.user.picture};
    }
    if ($scope.user.gender === "male"){
      $scope.male = "checked";
    } 
    else if ($scope.user.gender === "female"){
      $scope.female = "checked";
    }
    if ($scope.user.title === "admin"){
      $scope.admin = "checked";
    } 
    else if ($scope.user.title === "supervisor"){
      $scope.finance = "checked";
    }
    else if ($scope.user.title === "worker"){
      $scope.sales = "checked";
    }
    else if ($scope.user.title === "owner"){
      $scope.customer = "checked";
    }
  });

  if ($stateParams.employeeId === '') {
      //
      // Create Employee
      //
      $scope.item = {'photo': ''};
  } else {
      //
      // Edit Employee
      //
      var getemployee = ContactsFactory.getEmployee($stateParams.employeeId);
      $scope.inEditMode = true;
      $scope.user = getemployee;
      $scope.item = {'photo': $scope.user.picture};
      $scope.gender = $scope.user.gender;
      $scope.title = $scope.user.title;
      if ($scope.user.gender === "male"){
        $scope.male = "checked";
      } 
      else if ($scope.user.gender === "female"){
        $scope.female = "checked";
      }
      if ($scope.user.title === "admin"){
        $scope.admin = "checked";
      } 
      else if ($scope.user.title === "supervisor"){
        $scope.finance = "checked";
      }
      else if ($scope.user.title === "worker"){
        $scope.sales = "checked";
      }
      else if ($scope.user.title === "owner"){
        $scope.customer = "checked";
      }
  }

  // Gender
  $scope.male = "";
  $scope.female = "";
  $scope.trigmale = function() {
    $scope.male = "checked";
    $scope.female = "";
    $scope.gender = "male";
  };
  $scope.trigfemale = function() {
    $scope.male = "";
    $scope.female = "checked";
    $scope.gender = "female";
  };

  // User Level
  $scope.admin = "";
  $scope.finance = "";
  $scope.sales = "";
  $scope.customer = "";
  $scope.trigadmin = function() {
    $scope.admin = "checked";
    $scope.finance = "";
    $scope.sales = "";
    $scope.customer = "";
    $scope.title = "admin";
  };
  $scope.trigfinance = function() {
    $scope.admin = "";
    $scope.finance = "checked";
    $scope.sales = "";
    $scope.customer = "";
    $scope.title = "supervisor";
  };
  $scope.trigsales = function() {
    $scope.admin = "";
    $scope.finance = "";
    $scope.sales = "checked";
    $scope.customer = "";
    $scope.title = "worker";
  };
  $scope.trigcustomer = function() {
    $scope.admin = "";
    $scope.finance = "";
    $scope.sales = "";
    $scope.customer = "checked";
    $scope.title = "owner";
  };

  $scope.takepic = function() {
    
    var filesSelected = document.getElementById("nameImg").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent) {
        var textAreaFileContents = document.getElementById(
          "textAreaFileContents"
        );
        $scope.item = {
          photo: fileLoadedEvent.target.result
        };
        $scope.user.photo = fileLoadedEvent.target.result;
        PickTransactionServices.updatePhoto($scope.item.photo);
      };

      fileReader.readAsDataURL(fileToLoad);
    }
  };

  $scope.createMember = function (user) {
      var email = user.email;
      var password = user.password;
      var filesSelected = document.getElementById("nameImg").files;
      if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
          var textAreaFileContents = document.getElementById(
            "textAreaFileContents"
          );
          $scope.item = {
            photo: fileLoadedEvent.target.result
          };
          PickTransactionServices.updatePhoto($scope.item.photo);
        };

        fileReader.readAsDataURL(fileToLoad);
      }

      // Validate form data
      if (typeof user.fullname === 'undefined' || user.fullname === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your name"
          return;
      }
      if (typeof user.address === 'undefined' || user.address === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your address"
          return;
      }
      if (typeof user.phone === 'undefined' || user.phone === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your phone"
          return;
      }

      if ($scope.inEditMode) {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Editing...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var photo = $scope.item.photo;
        var gender = $scope.gender;
        var title = $scope.title;
        $scope.temp = {
            fullname: user.fullname,
            picture: photo,
            address: user.address,
            phone: user.phone,
            gender: gender,
            title: title,
            status: "active",
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        /* SAVE MATERIAL DATA */
        var employeeref = ContactsFactory.eRef();
        var newData = employeeref.child($stateParams.employeeId);
        newData.update($scope.temp, function (ref) {
        });
        $ionicHistory.goBack();
      }else {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var photo = $scope.item.photo;
        var gender = $scope.gender;
        var title = $scope.title;
        $scope.temp = {
            fullname: user.fullname,
            picture: photo,
            address: user.address,
            phone: user.phone,
            gender: gender,
            title: title,
            status: "active",
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        var ref = fb.child("employees");
        ref.push($scope.temp);
      }

      $ionicLoading.hide();
      refresh($scope.user, $scope);
  };

  function refresh(user, $scope, item) {

    $scope.user = {'fullname': '','address': '','phone': '','photo': '','picture': ''};
    $scope.item = {'photo': ''};
    $scope.male = "";
    $scope.female = "";
    $scope.admin = "";
    $scope.finance = "";
    $scope.sales = "";
    $scope.customer = "";
  }
})

.controller('priceCtrl', function($scope, $state, $stateParams, $ionicHistory, $ionicLoading, MembersFactory, MasterFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {

  $scope.setting = {'price': ''};
  $scope.inEditMode = false;
  $scope.settings = MasterFactory.getPrices();
  $scope.settings.$loaded().then(function (x) {
    refresh($scope.settings, $scope, MasterFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  // Complexity
  $scope.low = "";
  $scope.mid = "";
  $scope.high = "";
  $scope.triglow = function() {
    $scope.low = "checked";
    $scope.mid = "";
    $scope.high = "";
    $scope.complexity = "low";
    $scope.prid = "-KRNtH4hGZW-xdFRSX4q";
    var getprices = MasterFactory.getPrice($scope.prid);
    $scope.inEditMode = true;
    $scope.setting.price = getprices.price;
  };
  $scope.trigmid = function() {
    $scope.low = "";
    $scope.mid = "checked";
    $scope.high = "";
    $scope.complexity = "mid";
    $scope.prid = "-KRNtMcNIFHKj41fuby0";
    var getprices = MasterFactory.getPrice($scope.prid);
    $scope.inEditMode = true;
    $scope.setting.price = getprices.price;
  };
  $scope.trighigh = function() {
    $scope.low = "";
    $scope.mid = "";
    $scope.high = "checked";
    $scope.complexity = "high";
    $scope.prid = "-KRNtP2OhzdfoJiWPMfX";
    var getprices = MasterFactory.getPrice($scope.prid);
    $scope.inEditMode = true;
    $scope.setting.price = getprices.price;
  };

  $scope.$on('$ionicView.beforeEnter', function () {
    if ($scope.setting.complexity === "low"){
      $scope.low = "checked";
    } 
    else if ($scope.setting.complexity === "mid"){
      $scope.mid = "checked";
    }
    else if ($scope.setting.complexity === "high"){
      $scope.high = "checked";
    }
    
  });

  if ($scope.inEditMode) {
      var getprices = MasterFactory.getPrice($scope.prid);
      $scope.inEditMode = true;
      $scope.setting = getprices;
  }

  $scope.createPrice = function (setting) {

      // Validate form data
      if (typeof setting.price === 'undefined' || setting.price === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter price"
          return;
      }

      if ($scope.inEditMode) {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Editing...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var complexity = $scope.complexity;
        $scope.temp = {
            price: setting.price,
            complexity: complexity,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }
        /* SAVE PRICE DATA */
        var priceref = MasterFactory.prRef();
        var newData = priceref.child($scope.prid);
        newData.update($scope.temp, function (ref) {
        });
      }else {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var complexity = $scope.complexity;
        $scope.temp = {
            price: setting.price,
            complexity: complexity,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        var ref = fb.child("master").child("price");
        ref.push($scope.temp);
      }

      $ionicLoading.hide();
      refresh($scope.setting, $scope);
  };

  function refresh(setting, $scope, item) {

    $scope.setting = {'price': '','complexity': ''};
    $scope.low = "";
    $scope.mid = "";
    $scope.high = "";
  }
})

.controller('susutCtrl', function($scope, $state, $stateParams, $ionicHistory, $ionicLoading, MembersFactory, MasterFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {

  $scope.setting = {'susut': ''};
  $scope.inEditMode = false;
  $scope.settings = MasterFactory.getSusuts();
  $scope.settings.$loaded().then(function (x) {
    refresh($scope.settings, $scope, MasterFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  // Complexity
  $scope.finishing = "";
  $scope.settingg = "";
  $scope.polishing = "";
  $scope.trigfinish = function() {
    $scope.finishing = "checked";
    $scope.settingg = "";
    $scope.polishing = "";
    $scope.process = "finishing";
    $scope.prid = "-KROB-59GBJy9LhjtsVl";
    var getsusuts = MasterFactory.getSusut($scope.prid);
    $scope.setting.susut = getsusuts.susut;
    $scope.inEditMode = true;
  };
  $scope.trigsetting = function() {
    $scope.finishing = "";
    $scope.settingg = "checked";
    $scope.polishing = "";
    $scope.process = "setting";
    $scope.prid = "-KROB09hw2E_UuR8sTiV";
    var getsusuts = MasterFactory.getSusut($scope.prid);
    $scope.setting.susut = getsusuts.susut;
    $scope.inEditMode = true;
  };
  $scope.trigpolish = function() {
    $scope.finishing = "";
    $scope.settingg = "";
    $scope.polishing = "checked";
    $scope.process = "polishing";
    $scope.prid = "-KROB10fm8kIZizhvfrH";
    var getsusuts = MasterFactory.getSusut($scope.prid);
    $scope.setting.susut = getsusuts.susut;
    $scope.inEditMode = true;
  };

  $scope.$on('$ionicView.beforeEnter', function () {
    if ($scope.setting.process === "finishing"){
      $scope.finishing = "checked";
    } 
    else if ($scope.setting.process === "setting"){
      $scope.settingg = "checked";
    }
    else if ($scope.setting.process === "polishing"){
      $scope.polishing = "checked";
    }
    
  });

  if ($scope.inEditMode) {
      var getsusuts = MasterFactory.getSusut($scope.prid);
      $scope.setting.susut = getsusuts.susut;
      $scope.inEditMode = true;
  }

  $scope.createSusut = function (setting) {

      // Validate form data
      if (typeof setting.susut === 'undefined' || setting.susut === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter susut"
          return;
      }

      if ($scope.inEditMode) {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Editing...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        $scope.temp = {
            susut: setting.susut,
            process: $scope.process,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }
        /* SAVE PRICE DATA */
        var susutref = MasterFactory.sRef();
        var newData = susutref.child($scope.prid);
        newData.update($scope.temp, function (ref) {
        });
      }else {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        $scope.temp = {
            susut: setting.susut,
            process: $scope.process,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        var ref = fb.child("master").child("susut");
        ref.push($scope.temp);
      }

      $ionicLoading.hide();
      refresh($scope.setting, $scope);
  };

  function refresh(setting, $scope, item) {

    $scope.setting = {'susut': '','process': ''};
    $scope.finishing = "";
    $scope.settingg = "";
    $scope.polishing = "";
  }
})

.controller('sankcostCtrl', function($scope, $state, $stateParams, $ionicHistory, $ionicLoading, MembersFactory, MasterFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {

  $scope.setting = {'sank': ''};
  $scope.inEditMode = false;
  $scope.settings = MasterFactory.getSanks();
  $scope.settings.$loaded().then(function (x) {
    refresh($scope.settings, $scope, MasterFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  // Complexity
  $scope.casting = "";
  $scope.transfering = "";
  $scope.inventoring = "";
  $scope.trigcasting = function() {
    $scope.casting = "checked";
    $scope.transfering = "";
    $scope.inventoring = "";
    $scope.process = "casting";
    $scope.prid = "-KROJAqpfuVHGgHJSoHo";
    var getsanks = MasterFactory.getSank($scope.prid);
    $scope.setting.sank = getsanks.sank;
    $scope.inEditMode = true;
  };
  $scope.trigtransfer = function() {
    $scope.casting = "";
    $scope.transfering = "checked";
    $scope.inventoring = "";
    $scope.process = "transfering";
    $scope.prid = "-KROJDSnXGhET76giV05";
    var getsanks = MasterFactory.getSank($scope.prid);
    $scope.setting.sank = getsanks.sank;
    $scope.inEditMode = true;
  };
  $scope.triginventor = function() {
    $scope.casting = "";
    $scope.transfering = "";
    $scope.inventoring = "checked";
    $scope.process = "inventoring";
    $scope.prid = "-KROJEFWXcsUVnsiz_PV";
    var getsanks = MasterFactory.getSank($scope.prid);
    $scope.setting.sank = getsanks.sank;
    $scope.inEditMode = true;
  };

  $scope.$on('$ionicView.beforeEnter', function () {
    if ($scope.setting.process === "casting"){
      $scope.casting = "checked";
    } 
    else if ($scope.setting.process === "transfering"){
      $scope.transfering = "checked";
    }
    else if ($scope.setting.process === "inventoring"){
      $scope.inventoring = "checked";
    }
    
  });

  if ($scope.inEditMode) {
      var getsanks = MasterFactory.getSank($scope.prid);
      $scope.setting.sank = getsanks.sank;
      $scope.inEditMode = true;
  }

  $scope.createSank = function (setting) {

      // Validate form data
      if (typeof setting.sank === 'undefined' || setting.sank === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter sank"
          return;
      }

      if ($scope.inEditMode) {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Editing...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        $scope.temp = {
            sank: setting.sank,
            process: $scope.process,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }
        /* SAVE PRICE DATA */
        var sankref = MasterFactory.skRef();
        var newData = sankref.child($scope.prid);
        newData.update($scope.temp, function (ref) {
        });
      }else {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        $scope.temp = {
            sank: setting.sank,
            process: $scope.process,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }

        /* SAVE MEMBER DATA */
        var ref = fb.child("master").child("sank");
        ref.push($scope.temp);
      }

      $ionicLoading.hide();
      refresh($scope.setting, $scope);
  };

  function refresh(setting, $scope, item) {

    $scope.setting = {'sank': '','process': ''};
    $scope.casting = "";
    $scope.transfering = "";
    $scope.inventoring = "";
  }
})

.controller('inventoryCtrl', function($scope, $state, $ionicLoading, MasterFactory, $ionicPopup, myCache) {

  $scope.inventories = [];

  $scope.inventories = MasterFactory.getInventories();
  $scope.inventories.$loaded().then(function (x) {
    refresh($scope.inventories, $scope, MasterFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.$on('$ionicView.beforeEnter', function () {
    refresh($scope.inventories, $scope);
  });

  $scope.edit = function(item) {
    $state.go('app.rawinventory', { inventoryId: item.$id });
  };

  function refresh(inventories, $scope, item) {
  }
})

.controller('addinventoryCtrl', function($scope, $state, $ionicLoading, MasterFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {

  $scope.inventory = {'name': '','jumlah': '','harga': '','photo': '','picture': ''};
  $scope.item = {'photo': ''};

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.item.photo = PickTransactionServices.photoSelected;
  });

  $scope.takepic = function() {
    
    var filesSelected = document.getElementById("nameImg").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent) {
        var textAreaFileContents = document.getElementById(
          "textAreaFileContents"
        );
        $scope.item = {
          photo: fileLoadedEvent.target.result
        };
        PickTransactionServices.updatePhoto($scope.item.photo);
      };

      fileReader.readAsDataURL(fileToLoad);
    }
  };

  $scope.createInventory = function (inventory) {
      var filesSelected = document.getElementById("nameImg").files;
      if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
          var textAreaFileContents = document.getElementById(
            "textAreaFileContents"
          );
          $scope.item = {
            photo: fileLoadedEvent.target.result
          };
        };

        fileReader.readAsDataURL(fileToLoad);
      }

      // Validate form data
      if (typeof inventory.name === 'undefined' || inventory.name === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter name"
          return;
      }
      if (typeof inventory.jumlah === 'undefined' || inventory.jumlah === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter jumlah"
          return;
      }
      if (typeof inventory.harga === 'undefined' || inventory.harga === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter harga"
          return;
      }

      $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
      });

      /* PREPARE DATA FOR FIREBASE*/
      var photo = $scope.item.photo;
      $scope.temp = {
          name: inventory.name,
          picture: photo,
          harga: inventory.harga,
          stock: inventory.jumlah,
          addedby: CurrentUserService.fullname,
          datecreated: Date.now(),
          dateupdated: Date.now()
      }

      /* SAVE MEMBER DATA */
      var ref = fb.child("master").child("inventory");
      ref.push($scope.temp);

      $ionicLoading.hide();
      refresh($scope.inventory, $scope);
  };

  function refresh(inventory, $scope, item) {

    $scope.inventory = {'name': '','berat': '','harga': '','picture': ''};
    $scope.item = {'photo': ''};
  }
})

.controller('rawinventoryCtrl', function($scope, $state, $stateParams, $ionicLoading, $ionicHistory, MasterFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {

  $scope.inventory = {'name': '','jumlah': '','harga': '','photo': '','picture': ''};
  $scope.item = {'photo': ''};
  $scope.inEditMode = false;
  var getinventory = MasterFactory.getInventory($stateParams.inventoryId);
  $scope.stock = getinventory.jumlah;

  if ($stateParams.inventoryId === '') {
      //
      // Create Material
      //
      $scope.item = {'photo': ''};
  } else {
      //
      // Edit Material
      //
      var getinventory = MasterFactory.getInventory($stateParams.inventoryId);
      $scope.inEditMode = true;
      $scope.inventory = getinventory;
      $scope.inventory.jumlah = "";
      $scope.stock = $scope.inventory.stock;
      $scope.item = {'photo': $scope.inventory.picture};
  }

  $scope.myFunc = function() {
    if($scope.inventory.jumlah !== undefined){
      $scope.stock = parseFloat($scope.inventory.jumlah) + parseFloat($scope.inventory.stock);
    } else {
      $scope.stock = $scope.inventory.stock;
    }
  };

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.inventory = getinventory;
    $scope.stock = $scope.inventory.stock;
    $scope.item = {'photo': $scope.inventory.picture};
  });

  $scope.takepic = function() {
    
    var filesSelected = document.getElementById("nameImg").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent) {
        var textAreaFileContents = document.getElementById(
          "textAreaFileContents"
        );
        $scope.item = {
          photo: fileLoadedEvent.target.result
        };
        $scope.inventory.photo = fileLoadedEvent.target.result;
      };

      fileReader.readAsDataURL(fileToLoad);
    }
  };

  $scope.createInventory = function () {
      var filesSelected = document.getElementById("nameImg").files;
      if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
          var textAreaFileContents = document.getElementById(
            "textAreaFileContents"
          );
          $scope.item = {
            photo: fileLoadedEvent.target.result
          };
        };

        fileReader.readAsDataURL(fileToLoad);
      }

      // Validate form data
      if (typeof $scope.inventory.name === 'undefined' || $scope.inventory.name === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter name"
          return;
      }
      if (typeof $scope.inventory.jumlah === 'undefined' || $scope.inventory.jumlah === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter jumlah"
          return;
      }
      if (typeof $scope.inventory.harga === 'undefined' || $scope.inventory.harga === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter harga"
          return;
      }

      $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br>Editing...'
      });

      /* PREPARE DATA FOR FIREBASE*/
      var photo = $scope.item.photo;
      var currentstock = $scope.stock;
      $scope.temp = {
          name: $scope.inventory.name,
          picture: photo,
          harga: $scope.inventory.harga,
          stock: currentstock,
          addedby: CurrentUserService.fullname,
          datecreated: Date.now(),
          dateupdated: Date.now()
      }

      /* SAVE MATERIAL DATA */
      var inventoryref = MasterFactory.iRef();
      var newData = inventoryref.child($stateParams.inventoryId);
      newData.update($scope.temp, function (ref) {
      });

      $scope.temp = {};
      $ionicLoading.hide();
      refresh($scope.inventory, $scope.temp, $scope);
      $ionicHistory.goBack();
  };

  function refresh(temp, inventory, $scope, item) {

    $scope.inventory = {'name': '','jumlah': '','harga': '','picture': ''};
    $scope.item = {'photo': ''};
    $scope.stock = "";
    $scope.temp = {};
  }
})

.controller('materialCtrl', function($scope, $state, $ionicLoading, MasterFactory, $ionicPopup, myCache) {

  $scope.materials = [];

  $scope.materials = MasterFactory.getMaterials();
  $scope.materials.$loaded().then(function (x) {
    refresh($scope.materials, $scope, MasterFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.$on('$ionicView.beforeEnter', function () {
    refresh($scope.materials, $scope);
  });

  $scope.edit = function(item) {
    $state.go('app.rawmaterial', { materialId: item.$id });
  };

  function refresh(materials, $scope, item) {
  }
})

.controller('addmaterialCtrl', function($scope, $state, $ionicLoading, MasterFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {

  $scope.material = {'jenis': '','berat': '','harga': '','photo': '','picture': ''};
  $scope.item = {'photo': ''};

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.item.photo = PickTransactionServices.photoSelected;
  });

  $scope.takepic = function() {
    
    var filesSelected = document.getElementById("nameImg").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent) {
        var textAreaFileContents = document.getElementById(
          "textAreaFileContents"
        );
        $scope.item = {
          photo: fileLoadedEvent.target.result
        };
        PickTransactionServices.updatePhoto($scope.item.photo);
      };

      fileReader.readAsDataURL(fileToLoad);
    }
  };

  $scope.createMaterial = function (material) {
      var filesSelected = document.getElementById("nameImg").files;
      if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
          var textAreaFileContents = document.getElementById(
            "textAreaFileContents"
          );
          $scope.item = {
            photo: fileLoadedEvent.target.result
          };
        };

        fileReader.readAsDataURL(fileToLoad);
      }

      // Validate form data
      if (typeof material.jenis === 'undefined' || material.jenis === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter jenis"
          return;
      }
      if (typeof material.berat === 'undefined' || material.berat === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter berat"
          return;
      }
      if (typeof material.harga === 'undefined' || material.harga === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter harga"
          return;
      }

      $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
      });

      /* PREPARE DATA FOR FIREBASE*/
      var photo = $scope.item.photo;
      $scope.temp = {
          jenis: material.jenis,
          picture: photo,
          harga: material.harga,
          stock: material.berat,
          transfer: false,
          berattransfer: "",
          addedby: CurrentUserService.fullname,
          datecreated: Date.now(),
          dateupdated: Date.now()
      }

      /* SAVE MEMBER DATA */
      var ref = fb.child("master").child("material");
      ref.push($scope.temp);

      $ionicLoading.hide();
      refresh($scope.material, $scope);
  };

  function refresh(material, $scope, item) {

    $scope.material = {'jenis': '','berat': '','harga': '','picture': ''};
    $scope.item = {'photo': ''};
  }
})

.controller('rawmaterialCtrl', function($scope, $state, $stateParams, $ionicLoading, $ionicHistory, MasterFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {

  $scope.material = {'jenis': '','berat': '','harga': '','photo': '','picture': ''};
  $scope.item = {'photo': ''};
  $scope.inEditMode = false;
  var getmaterial = MasterFactory.getMaterial($stateParams.materialId);
  $scope.stock = getmaterial.berat;

  if ($stateParams.materialId === '') {
      //
      // Create Material
      //
      $scope.item = {'photo': ''};
  } else {
      //
      // Edit Material
      //
      var getmaterial = MasterFactory.getMaterial($stateParams.materialId);
      $scope.inEditMode = true;
      $scope.material = getmaterial;
      $scope.material.berat = "";
      $scope.stock = $scope.material.stock;
      $scope.item = {'photo': $scope.material.picture};
  }

  $scope.myFunc = function() {
    if($scope.material.berat !== undefined){
      $scope.stock = parseFloat($scope.material.berat) + parseFloat($scope.material.stock);
    } else {
      $scope.stock = $scope.material.stock;
    }
    
  };

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.material = getmaterial;
    $scope.stock = $scope.material.stock;
    $scope.item = {'photo': $scope.material.picture};
  });

  $scope.takepic = function() {
    
    var filesSelected = document.getElementById("nameImg").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent) {
        var textAreaFileContents = document.getElementById(
          "textAreaFileContents"
        );
        $scope.item = {
          photo: fileLoadedEvent.target.result
        };
        $scope.material.photo = fileLoadedEvent.target.result;
      };

      fileReader.readAsDataURL(fileToLoad);
    }
  };

  $scope.createMaterial = function () {
      var filesSelected = document.getElementById("nameImg").files;
      if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
          var textAreaFileContents = document.getElementById(
            "textAreaFileContents"
          );
          $scope.item = {
            photo: fileLoadedEvent.target.result
          };
        };

        fileReader.readAsDataURL(fileToLoad);
      }

      // Validate form data
      if (typeof $scope.material.jenis === 'undefined' || $scope.material.jenis === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter jenis"
          return;
      }
      if (typeof $scope.material.berat === 'undefined' || $scope.material.berat === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter berat"
          return;
      }
      if (typeof $scope.material.harga === 'undefined' || $scope.material.harga === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter harga"
          return;
      }

      $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br>Editing...'
      });

      /* PREPARE DATA FOR FIREBASE*/
      var photo = $scope.item.photo;
      var currentstock = $scope.stock;
      $scope.temp = {
          jenis: $scope.material.jenis,
          picture: photo,
          harga: $scope.material.harga,
          stock: currentstock,
          addedby: CurrentUserService.fullname,
          datecreated: Date.now(),
          dateupdated: Date.now()
      }

      /* SAVE MATERIAL DATA */
      var materialref = MasterFactory.mRef();
      var newData = materialref.child($stateParams.materialId);
      newData.update($scope.temp, function (ref) {
      });

      $scope.temp = {};
      $ionicLoading.hide();
      refresh($scope.material, $scope.temp, $scope);
      $ionicHistory.goBack();
  };

  function refresh(temp, material, $scope, item) {

    $scope.material = {'jenis': '','berat': '','harga': '','picture': ''};
    $scope.item = {'photo': ''};
    $scope.stock = "";
    $scope.temp = {};
  }
})

.controller('productCtrl', function($scope, $state, $ionicLoading, MasterFactory, $ionicPopup, myCache) {

  $scope.products = [];

  $scope.products = MasterFactory.getProducts();
  $scope.products.$loaded().then(function (x) {
    refresh($scope.products, $scope, MasterFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.$on('$ionicView.beforeEnter', function () {
    refresh($scope.products, $scope);
  });

  $scope.edit = function(item) {
    $state.go('app.addproduct', { productId: item.$id });
  };

  function refresh(products, $scope, item) {
  }
})

.controller('addproductCtrl', function($scope, $state, $stateParams, $ionicHistory, $ionicLoading, MasterFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {

  $scope.product = {'nama': '','berat': '','harga': '','photo': '','picture': ''};
  $scope.item = {'photo': ''};
  $scope.inEditMode = false;

  $scope.$on('$ionicView.beforeEnter', function () {
    if ($scope.product.picture === ""){
       $scope.item.photo = PickTransactionServices.photoSelected;
    } else {
      $scope.item = {'photo': $scope.product.picture};
    }
  });

  if ($stateParams.productId === '') {
      //
      // Create Product
      //
      $scope.item = {'photo': ''};
  } else {
      //
      // Edit Product
      //
      var getproduct = MasterFactory.getProduct($stateParams.productId);
      $scope.inEditMode = true;
      $scope.product = getproduct;
      $scope.item = {'photo': $scope.product.picture};
  }

  $scope.takepic = function() {
    
    var filesSelected = document.getElementById("nameImg").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent) {
        var textAreaFileContents = document.getElementById(
          "textAreaFileContents"
        );
        $scope.item = {
          photo: fileLoadedEvent.target.result
        };
        $scope.product.photo = fileLoadedEvent.target.result;
        PickTransactionServices.updatePhoto($scope.item.photo);
      };

      fileReader.readAsDataURL(fileToLoad);
    }
  };

  $scope.createProduct = function (product) {
      var filesSelected = document.getElementById("nameImg").files;
      if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
          var textAreaFileContents = document.getElementById(
            "textAreaFileContents"
          );
          $scope.item = {
            photo: fileLoadedEvent.target.result
          };
        };

        fileReader.readAsDataURL(fileToLoad);
      }

      // Validate form data
      if (typeof product.nama === 'undefined' || product.nama === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter nama"
          return;
      }
      if (typeof product.berat === 'undefined' || product.berat === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter berat"
          return;
      }
      if (typeof product.harga === 'undefined' || product.harga === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter harga"
          return;
      }

      if ($scope.inEditMode) {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Editing...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var photo = $scope.item.photo;
        $scope.temp = {
            nama: product.nama,
            picture: photo,
            harga: product.harga,
            berat: product.berat,
            addedby: CurrentUserService.fullname,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }
        /* SAVE PRODUCT DATA */
        var productref = MasterFactory.pRef();
        var newData = productref.child($stateParams.productId);
        newData.update($scope.temp, function (ref) {
        });
        $ionicHistory.goBack();
      }else {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
        });
        /* PREPARE DATA FOR FIREBASE*/
        var photo = $scope.item.photo;
        $scope.temp = {
            nama: product.nama,
            picture: photo,
            harga: product.harga,
            berat: product.berat,
            addedby: CurrentUserService.fullname,
            datecreated: Date.now(),
            dateupdated: Date.now()
        }
        /* SAVE PRODUCT DATA */
        var ref = fb.child("master").child("product");
        ref.push($scope.temp);
      }

      $ionicLoading.hide();
      refresh($scope.product, $scope);
  };

  function refresh(product, $scope, item) {

    $scope.product = {'nama': '','berat': '','harga': '','picture': ''};
    $scope.item = {'photo': ''};
  }
})

.controller('contactCtrl', function($scope, $state, $ionicLoading, ContactsFactory, $ionicPopup, myCache) {

  $scope.contacts = [];

  $scope.contacts = ContactsFactory.getContacts();
  $scope.contacts.$loaded().then(function (x) {
    refresh($scope.contacts, $scope, ContactsFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.$on('$ionicView.beforeEnter', function () {
    refresh($scope.contacts, $scope);
  });

  $scope.edit = function(item) {
    $state.go('app.employee', { employeeId: item.$id });
  };

  function refresh(contacts, $scope, item) {
  }
})

.controller('profileCtrl', function($scope, $state, $ionicLoading, MembersFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {

  $scope.fullname = CurrentUserService.fullname;
  $scope.photo = CurrentUserService.picture;
  $scope.level = CurrentUserService.level;
  $scope.user = {};
  $scope.item = {'photo': ''};

  // Gender
  $scope.male = "";
  $scope.female = "";
  $scope.trigmale = function() {
    $scope.male = "checked";
    $scope.female = "";
    $scope.gender = "male";
  };
  $scope.trigfemale = function() {
    $scope.male = "";
    $scope.female = "checked";
    $scope.gender = "female";
  };

  // User Level
  $scope.admin = "";
  $scope.finance = "";
  $scope.sales = "";
  $scope.customer = "";
  $scope.trigadmin = function() {
    $scope.admin = "checked";
    $scope.finance = "";
    $scope.sales = "";
    $scope.customer = "";
    $scope.level = "admin";
  };
  $scope.trigfinance = function() {
    $scope.admin = "";
    $scope.finance = "checked";
    $scope.sales = "";
    $scope.customer = "";
    $scope.level = "finance";
  };
  $scope.trigsales = function() {
    $scope.admin = "";
    $scope.finance = "";
    $scope.sales = "checked";
    $scope.customer = "";
    $scope.level = "sales";
  };
  $scope.trigcustomer = function() {
    $scope.admin = "";
    $scope.finance = "";
    $scope.sales = "";
    $scope.customer = "checked";
    $scope.level = "customer";
  };

  $scope.test = function() {
    $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br>Registering...'
      });
  };

  $scope.createMember = function (user) {
      var email = user.email;
      var password = user.password;
      var filesSelected = document.getElementById("nameImg").files;
      if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
          var textAreaFileContents = document.getElementById(
            "textAreaFileContents"
          );
          $scope.item = {
            photo: fileLoadedEvent.target.result
          };
        };

        fileReader.readAsDataURL(fileToLoad);
      }

      // Validate form data
      if (typeof user.fullname === 'undefined' || user.fullname === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your name"
          return;
      }
      if (typeof user.email === 'undefined' || user.email === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your email"
          return;
      }
      if (typeof user.password === 'undefined' || user.password === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your password"
          return;
      }

      $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br>Registering...'
      });

      fb.createUser({
          email: user.email,
          password: user.password
      }, function (error, userData) {
          if (error) {
              switch (error.code) {
                  case "EMAIL_TAKEN":
                      $ionicLoading.hide();
                      $ionicPopup.alert({title: 'Register Failed', template: 'The email entered is already in use!'});
                      break;
                  case "INVALID_EMAIL":
                      $ionicLoading.hide();
                      $ionicPopup.alert({title: 'Register Failed', template: 'The specified email is not a valid email!'});
                      break;
                  default:
                      $ionicLoading.hide();
                      $ionicPopup.alert({title: 'Register Failed', template: 'Oops. Something went wrong!'});
              }
          } else {
              fb.authWithPassword({
                  "email": user.email,
                  "password": user.password
              }, function (error, authData) {
                  if (error) {
                      $ionicLoading.hide();
                      $ionicPopup.alert({title: 'Register Failed', template: 'Error. Login failed!'});
                  } else {

                      /* PREPARE DATA FOR FIREBASE*/
                      var photo = $scope.item.photo;
                      var gender = $scope.gender;
                      var level = $scope.level;
                      $scope.temp = {
                          fullname: user.fullname,
                          picture: photo,
                          email: user.email,
                          gender: gender,
                          level: level,
                          datecreated: Date.now(),
                          dateupdated: Date.now()
                      }

                      /* SAVE MEMBER DATA */
                      var membersref = MembersFactory.ref();
                      var newUser = membersref.child(authData.uid);
                      newUser.update($scope.temp, function (ref) {
                      addImage = newUser.child("images");
                      });
                      MembersFactory.getMember(authData).then(function (thisuser) {
                        /* Save user data for later use */
                        myCache.put('thisUserName', thisuser.fullname);
                        myCache.put('thisMemberId', authData.uid);
                        CurrentUserService.updateUser(thisuser);
                      });

                      $ionicLoading.hide();
                      $state.go('app.playlists');
                  }
              });
          }
      });
  };
})

.controller('loginCtrl', function($scope, $rootScope, $stateParams, $ionicHistory, $cacheFactory, $ionicLoading, $ionicPopup, $state, MembersFactory, myCache, CurrentUserService) {

  $scope.user = {};
    $scope.doLogIn = function (user) {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Loggin In...'
        });

        /* Check user fields*/
        if (!user.email || !user.password) {
            $ionicLoading.hide();
            $ionicPopup.alert({title: 'Login Failed', template: 'Please check your Email or Password!'});
            return;
        }

        /* Authenticate User */
        fb.authWithPassword({
            "email": user.email,
            "password": user.password
        }, function (error, authData) {
            if (error) {
                //console.log("Login Failed!", error);
                $ionicLoading.hide();
                $ionicPopup.alert({title: 'Login Failed', template: 'Check your credentials and try again!'});
            } else {
                
                MembersFactory.getMember(authData).then(function (thisuser) {
                    
                    /* Save user data for later use */
                    myCache.put('thisUserName', thisuser.fullname);
                    myCache.put('thisUserLevel', thisuser.level);
                    myCache.put('thisMemberId', authData.uid);
                    CurrentUserService.updateUser(thisuser);
                        $ionicLoading.hide();
                        $state.go('app.dashboard', { memberId: authData.uid, level: thisuser.level });
                });
            }
        });
    }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
