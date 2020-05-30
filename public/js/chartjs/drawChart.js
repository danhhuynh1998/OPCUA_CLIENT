
$(document).ready(function(){
var data1 =[];
function exportFunc1() {
  var format = $("#format").val();
    FusionCharts.items['update-chart-using-API-methods'].exportChart({
      exportFormat: format
    });
}
$(".export1").click(()=>{
  exportFunc1();
});
function exportFunc2() {
  var format = $("#format").val();
  FusionCharts.items['update-chart-using-API-methods1'].exportChart({
    exportFormat: format
  });
}
$(".export2").click(()=>{
exportFunc2();
});
function exportFunc3() {
  var format = $("#format").val();
  FusionCharts.items['update-chart-using-API-methods2'].exportChart({
    exportFormat: format
  });
}
$(".export3").click(()=>{
exportFunc3();
});
function exportFunc4() {
  var format = $("#format").val();
  FusionCharts.items['update-chart-using-API-methods3'].exportChart({
    exportFormat: format
  });
}
$(".export4").click(()=>{
exportFunc4();
});
function exportFunc5() {
  var format = $("#format").val();
  FusionCharts.items['update-chart-using-API-methods4'].exportChart({
    exportFormat: format
  });
}
$(".export5 ").click(()=>{
exportFunc5();
});

$('#draw').click(() => {
switch ($('#c').val().toString()) {
  //#region  flo
  case 'flo':
    let a = 0;
    $('.export2').css('display','none');
    $('.export1').css('display','block');
    $('.export3').css('display','none');
    $('.export4').css('display','none');
    $('.export5').css('display','none');
    
    $('#chart-container').css('display','block');
    $('#chart-container1').css('display','none');
    $('#chart-container2').css('display','none');
    $('#chart-container3').css('display','none');
    $('#chart-container4').css('display','none');
    $('#chart-container5').css('display','none');
    $('#chart-container6').css('display','none');
      Promise.all([
          fetch(
            "http://vietscada.com:3700/api/flo"
          )
        ]).then(async([res1, res2]) => {
          const data = await res1.json();
          console.log(data)
          for(let i = 0; i < data.length; i++){
            data1.push([data[i].time,data[i].value]);
          };
          var schema = [
            {"name": "Time","type": "date","format": '%m/%d/%Y %H:%M:%S'},
            {"name": "Nồng độ","type": "number"}
          ];
          const dataStore = new FusionCharts.DataStore();
          const dataSource = {
             chart: {
                      exportEnabled: "1",
                      exportShowMenuItem: "0",
                      theme: "candy"
              },
            caption: {
              text: "Monitor Flo Changed"
            },
            yaxis: [
              {
                plot: "Nồng độ",
                title: "Nồng độ",
                format: {
                  suffix: "mg/l"
                },
                referencezone: [
                  {
                    label: "Comfortable temp. range",
                    valuemin: "15",
                    valuemax: "40",
                    style: {
                      marker: {
                        fill: "#B4F5E6",
                        stroke: "#B4F5E6"
                      },
                      "marker-text": {
                        fill: "#000000"
                      },
                      "marker:hover": {
                        fill: "#dd1328"
                      },
                      "marker-zone:hover": {
                        stroke: "#dd1328"
                      },
                      "marker-notch:hover": {
                        stroke: "#B4F5E6"
                      }
                    }
                  }
                ]
              }
            ]
          };
          dataSource.data = dataStore.createDataTable(data1, schema);
          var realtimeChart = new FusionCharts({
                  type: "timeseries",
                  renderAt: "chart-container",
                  id:"update-chart-using-API-methods",
                width: "100%",
                height: "500",
                dataSource: dataSource
          }).render();
  realtimeChart.render();
  })
  //#endregion
    break;
    //#region  fe
    case 'fe':

      $('#chart-container').css('display','none');
      $('#chart-container1').css('display','block');
      $('#chart-container2').css('display','none');
      $('#chart-container3').css('display','none');
      $('#chart-container4').css('display','none');
      $('#chart-container5').css('display','none');
      $('#chart-container6').css('display','none');
      $('.export1').css('display','none');
      $('.export2').css('display','block');
      $('.export3').css('display','none');
      $('.export4').css('display','none');
      $('.export5').css('display','none');
    

      Promise.all([
          fetch(
            "http://vietscada.com:3700/api/fe"
          )
        ]).then(async([res1, res2]) => {
          const data = await res1.json();
          console.log(data)
          for(let i = 0; i < data.length; i++){
            data1.push([data[i].time,data[i].value]);
          };
          var schema = [
            {"name": "Time","type": "date","format": '%m/%d/%Y %H:%M:%S'},
            {"name": "Nồng độ","type": "number"}
          ];
          const dataStore = new FusionCharts.DataStore();
          const dataSource = {
             chart: {
                      exportEnabled: "1",
                      exportShowMenuItem: "0",
                      theme: "candy"
              },
            caption: {
              text: "Monitor Fe Changed"
            },
            yaxis: [
              {
                plot: "Nồng độ",
                title: "Nồng độ",
                format: {
                  suffix: "mg/l"
                },
                referencezone: [
                  {
                    label: "Comfortable temp. range",
                    valuemin: "15",
                    valuemax: "40",
                    style: {
                      marker: {
                        fill: "#B4F5E6",
                        stroke: "#B4F5E6"
                      },
                      "marker-text": {
                        fill: "#000000"
                      },
                      "marker:hover": {
                        fill: "#dd1328"
                      },
                      "marker-zone:hover": {
                        stroke: "#dd1328"
                      },
                      "marker-notch:hover": {
                        stroke: "#B4F5E6"
                      }
                    }
                  }
                ]
              }
            ]
          };
          dataSource.data = dataStore.createDataTable(data1, schema);
          var realtimeChart = new FusionCharts({
                  type: "timeseries",
                  renderAt: "chart-container1",
                  id:"update-chart-using-API-methods1",
                width: "100%",
                height: "500",
                dataSource: dataSource
          }).render();
      realtimeChart.render();

      });
      //#endregion
    break;
    //#region  clo
    case 'clo':
      $('#chart-container').css('display','none');
      $('#chart-container1').css('display','none');
      $('#chart-container2').css('display','block');
      $('#chart-container3').css('display','none');
      $('#chart-container4').css('display','none');
      $('#chart-container5').css('display','none');
      $('#chart-container6').css('display','none');
      $('.export2').css('display','none');
    $('.export3').css('display','block');
    $('.export1').css('display','none');
    $('.export4').css('display','none');
    $('.export5').css('display','none');
    
      Promise.all([
          fetch(
            "http://vietscada.com:3700/api/clo"
          )
        ]).then(async([res1, res2]) => {
          const data = await res1.json();
          console.log(data)
          for(let i = 0; i < data.length; i++){
            data1.push([data[i].time,data[i].value]);
          };
          var schema = [
            {"name": "Time","type": "date","format": '%m/%d/%Y %H:%M:%S'},
            {"name": "Nồng độ","type": "number"}
          ];
          const dataStore = new FusionCharts.DataStore();
          const dataSource = {
             chart: {
                      exportEnabled: "1",
                      exportShowMenuItem: "0",
                      theme: "candy"
              },
            caption: {
              text: "Monitor Clo Changed"
            },
            yaxis: [
              {
                plot: "Nồng độ",
                title: "Nồng độ",
                format: {
                  suffix: "mg/l"
                },
                referencezone: [
                  {
                    label: "Comfortable temp. range",
                    valuemin: "15",
                    valuemax: "40",
                    style: {
                      marker: {
                        fill: "#B4F5E6",
                        stroke: "#B4F5E6"
                      },
                      "marker-text": {
                        fill: "#000000"
                      },
                      "marker:hover": {
                        fill: "#dd1328"
                      },
                      "marker-zone:hover": {
                        stroke: "#dd1328"
                      },
                      "marker-notch:hover": {
                        stroke: "#B4F5E6"
                      }
                    }
                  }
                ]
              }
            ]
          };
          dataSource.data = dataStore.createDataTable(data1, schema);
          var realtimeChart = new FusionCharts({
                  type: "timeseries",
                  renderAt: "chart-container2",
                  id:"update-chart-using-API-methods2",
                width: "100%",
                height: "500",
                dataSource: dataSource
          }).render();
          
      realtimeChart.render();
      });
      //#endregion
    break;
    //#region  al
    case 'al':
      $('#chart-container').css('display','none');
      $('#chart-container1').css('display','none');
      $('#chart-container2').css('display','none');
      $('#chart-container3').css('display','block');
      $('#chart-container4').css('display','none');
      $('#chart-container5').css('display','none');
      $('#chart-container6').css('display','none');
      $('.export2').css('display','none');
      $('.export4').css('display','block');
      $('.export3').css('display','none');
      $('.export1').css('display','none');
      $('.export5').css('display','none');
    
      Promise.all([
          fetch(
            "http://vietscada.com:3700/api/fe"
          )
        ]).then(async([res1, res2]) => {
          const data = await res1.json();
          console.log(data)
          for(let i = 0; i < data.length; i++){
            data1.push([data[i].time,data[i].value]);
          };
          var schema = [
            {"name": "Time","type": "date","format": '%m/%d/%Y %H:%M:%S'},
            {"name": "Nồng độ","type": "number"}
          ];
          const dataStore = new FusionCharts.DataStore();
          const dataSource = {
             chart: {
                      exportEnabled: "1",
                      exportShowMenuItem: "0",
                      theme: "candy"
              },
            caption: {
              text: "Monitor Al Changed"
            },
            yaxis: [
              {
                plot: "Nồng độ",
                title: "Nồng độ",
                format: {
                  suffix: "mg/l"
                },
                referencezone: [
                  {
                    label: "Comfortable temp. range",
                    valuemin: "15",
                    valuemax: "40",
                    style: {
                      marker: {
                        fill: "#B4F5E6",
                        stroke: "#B4F5E6"
                      },
                      "marker-text": {
                        fill: "#000000"
                      },
                      "marker:hover": {
                        fill: "#dd1328"
                      },
                      "marker-zone:hover": {
                        stroke: "#dd1328"
                      },
                      "marker-notch:hover": {
                        stroke: "#B4F5E6"
                      }
                    }
                  }
                ]
              }
            ]
          };
          dataSource.data = dataStore.createDataTable(data1, schema);
          var realtimeChart = new FusionCharts({
                  type: "timeseries",
                  renderAt: "chart-container3",
                  id:"update-chart-using-API-methods3",
                width: "100%",
                height: "500",
                dataSource: dataSource
          }).render();
         
      realtimeChart.render();
      });
      //#endregion
    break;
    case 'cuso4':
      //#region  cuso4
      $('#chart-container').css('display','none');
      $('#chart-container1').css('display','none');
      $('#chart-container2').css('display','none');
      $('#chart-container3').css('display','none');
      $('#chart-container4').css('display','block');
      $('#chart-container5').css('display','none');
      $('#chart-container6').css('display','none');
      $('.export2').css('display','none');
      $('.export5').css('display','block');
      $('.export3').css('display','none');
      $('.export4').css('display','none');
      $('.export1').css('display','none');
    
      Promise.all([
          fetch(
            "http://vietscada.com:3700/api/cuso4"
          )
        ]).then(async([res1, res2]) => {
          const data = await res1.json();
          console.log(data)
          for(let i = 0; i < data.length; i++){
            data1.push([data[i].time,data[i].value]);
          };
          var schema = [
            {"name": "Time","type": "date","format": '%m/%d/%Y %H:%M:%S'},
            {"name": "Nồng độ","type": "number"}
          ];
          const dataStore = new FusionCharts.DataStore();
          const dataSource = {
             chart: {
                      exportEnabled: "1",
                      exportShowMenuItem: "0",
                      theme: "candy"
              },
            caption: {
              text: "Monitor CuSO4 Changed"
            },
            yaxis: [
              {
                plot: "Nồng độ",
                title: "Nồng độ",
                format: {
                  suffix: "mg/l"
                },
                referencezone: [
                  {
                    label: "Comfortable temp. range",
                    valuemin: "15",
                    valuemax: "40",
                    style: {
                      marker: {
                        fill: "#B4F5E6",
                        stroke: "#B4F5E6"
                      },
                      "marker-text": {
                        fill: "#000000"
                      },
                      "marker:hover": {
                        fill: "#dd1328"
                      },
                      "marker-zone:hover": {
                        stroke: "#dd1328"
                      },
                      "marker-notch:hover": {
                        stroke: "#B4F5E6"
                      }
                    }
                  }
                ]
              }
            ]
          };
          dataSource.data = dataStore.createDataTable(data1, schema);
          var realtimeChart = new FusionCharts({
                  type: "timeseries",
                  renderAt: "chart-container4",
                  id:"update-chart-using-API-methods4",
                width: "100%",
                height: "500",
                dataSource: dataSource
          }).render();
      realtimeChart.render();
      });
      //#endregion
    break;
}

})
})

