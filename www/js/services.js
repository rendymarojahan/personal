angular.module('starter.services', [])

.factory('Auth', function ($firebaseAuth) {
        return $firebaseAuth(firebase.auth());
})

.factory('myCache', function ($cacheFactory) {
        return $cacheFactory('myCache', function ($cacheFactory) {
            return $cacheFactory('myCache');
        });
})

.factory('TransactionFactory', function ($firebaseArray, $q, myCache, $timeout) {
        var fb = firebase.database().ref();
        var ref = {};
        var overviewsRef = {};
        var ovRef = fb.child("overviews");
        return {
            ref: function () {
                ref = fb.child("publics").child(thisPublicId).child(thisUserId);
                return ref;
            },
            ovRef: function () {
                return ovRef;
            },
            getOverviews: function () {
                ref = fb.child("overviews");
                overviewsRef = $firebaseArray(ref);
                return overviewsRef;
            },
            getOverview: function (overviewid) {
                var thisOverview = overviewsRef.$getRecord(overviewid);
                return thisOverview;
            }
            
            
        };
})

    
;

function RandomHouseCode() {
    return Math.floor((Math.random() * 100000000) + 100);
}