angular.module('hearthDisease', ['ngMaterial'], function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('red')
      .dark();
  })
  .controller('HearthDiseaseController', function HearthDiseaseController($scope, $http) {

    this.getProbabilities = function(){
        var htn = this.htn ? 1 : 0;
        var fbs = this.fbs ? 1 : 0;
        var famhist = this.famhist ? 1 : 0;

        $http.get("/" + [htn, fbs, famhist, this.sex, this.age, this.chol, this.cigs, this.years].join("/"))
        .then(function(response) {
            $scope.prob = response.data[1]*100;
        });

        var probAges = [];
        var ages = [];
        for(var i=25; i <= 80; i = i + 5){
            ages.push(i);
            $http.get("/" + [htn, fbs, famhist, this.sex, i, this.chol, this.cigs, this.years].join("/"))
                .then(function(response) {
                    probAges.push(response.data[1]);
                    if(probAges.length == 12){
                        probAges = probAges.sort();

                        drawChart(ages, probAges, "agesPlot");
                    }

                });
        }
    }


    function drawChart(xData, yData, divId){
        agesDiv = document.getElementById(divId);

        var trace = {
            x: xData,
            y: yData,
            marker: { color: "#F44336" }
        }

        var layout = {
          title: 'Probability by Age',
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          titlefont: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#FAFAFA'
          },
          xaxis: {
            title: 'Age',
            tickfont : {
                color: '#FAFAFA'
            },
            titlefont: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#FAFAFA'
            }
          },
          yaxis: {
            title: 'Probability',
            tickfont : {
                color: '#FAFAFA'
            },
            titlefont: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#FAFAFA'
            }
          }
        };

        Plotly.newPlot(agesDiv, [trace], layout);
    }

});