angular.module('hearthDisease', ['ngMaterial'], function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('red')
      .dark();
  })
  .controller('HearthDiseaseController', function HearthDiseaseController($http) {
    this.htn = false;
    this.fbs = false;
    this.famhist = false;
    this.sex = 1;
    this.age = 54;
    this.chol = 200;
    this.cigs = 10;
    this.years = 30;

    this.prob = 0;

    this.getProbabilities = function(){
        $http.get("/" + [this.htn, this.fbs, this.famhist, this.sex, this.age, this.chol, this.cigs, this.years].join("/"))
        .then(function(response) {
            console.log(response.data);
        });
    }

});