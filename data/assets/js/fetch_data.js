var time = [];
var dataOne = [];
var dataTwo = [];
var header = [];
var updateInterval = 100000;
const csv_header_url = "csv_data/header.csv";
const csv_data_url = "csv_data/data.csv";

setInterval(function getData() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tempinid").innerHTML = this.responseText;
        }
    };

    xhttp.open("GET", "tempin", true);
    xhttp.send();
}, 50000);

setInterval(function getData() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tempoutid").innerHTML = this.responseText;
        }
    };

    xhttp.open("GET", "tempout", true);
    xhttp.send();
}, 50000);

// // Request data using D3
// d3
//     .csv(csv_data_url)
//     .then(makeChart);

// d3.text(csv_data_url, function (text) {
//     var data = d3.csv.parseRows(text, function (d) {
//         return d.map(Number)
//     });
// })
//     .then(function(data){
//         console.log(typeof(data))
//         console.log(data.split(','))
//     });

// function visualize(csvData2) {
//     var c1Data = csvData2.map(function (d) {
//         return +d;
//     });
//     console.log(c1Data)
// }

// jQuery.get(csv_data_url, function (dataFromCSV) {

//     // for (let i = 0; i < dataFromJson.curves.length; i++) {
//     //     header.push(dataFromJson.curves[i].name);
//     // }

//     for (let i = 0; i < dataFromCSV.length; i++) {
//         time.push(dataFromCSV);
//     }

//     for (let i = 0; i < dataFromCSV.length; i++) {
//         pressureData.push(dataFromCSV[i][2]);
//     }

//     for (let i = 0; i < dataFromCSV.length; i++) {
//         tempData.push(dataFromCSV[i][4]);
//     }

//     if (Array.isArray(pressureData)) {
//         console.log("Array");
//     }
//     else {
//         console.log("Not an array");
//     }
//     console.log(time);

// });

function parseData() {
    Papa.parse(csv_header_url, {
        download: true,
        dynamicTyping: true,
        complete: function (results) {

            // Headers
            for (let i = 0; i < results.data[0].length; i++) {
                header.push(results.data[0][i]);
            }
            console.log(results.data[0]);
        }
    });

    Papa.parse(csv_data_url, {
        download: true,
        dynamicTyping: true,
        complete: function (results) {

            // X axis
            for (let i = 0; i < results.data.length; i++) {
                time.push(results.data[i][1]);
            }

            // Y axis
            for (let i = 0; i < results.data.length; i++) {
                dataOne.push(results.data[i][9]);
            }

            // Y axis
            for (let i = 0; i < results.data.length; i++) {
                dataTwo.push(results.data[i][10]);
            }

            console.log(time);
            console.log(dataOne);
            console.log(dataTwo);

            // makeChart(time, dataOne, dataTwo);
        }
    });
}

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
        labels: time,
        datasets: [
            {
                label: header[9],
                backgroundColor: 'rgba(39, 174, 96, 0.2)',
                borderColor: 'rgb(39, 174, 96)',
                borderWidth: '2',
                pointRadius: '0',
                data: dataOne,
                yAxisID: 'y-axis-1'
            },
            {
                label: header[10],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: '2',
                pointRadius: '0',
                data: dataTwo,
                yAxisID: 'y-axis-2'
            }
        ]
    },
    // Configuration options go here
    options: {
        // maintainAspectRatio: false,
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        title: {
            display: true,
            text: 'Chart.js - Multi Axis Line Chart'
        },
        scales: {
            yAxes: [{
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'left',
                id: 'y-axis-1',
                ticks: {
                    min: 15,
                    max: 35,
                    beginAtZero: false
                }
            }, {
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'right',
                id: 'y-axis-2',
                ticks: {
                    min: 15,
                    max: 35,
                    beginAtZero: false
                },
                // grid line settings
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            }],
        }
    }
});

console.log(Object.keys(dataOne).length);

function makeChart(time, dataOne, dataTwo) {
    if (time && dataOne && dataTwo) {
        console.log(time);
        chart.data.label.push(new Date());
        chart.data.datasets.forEach(function(dataset) {dataset.data.push(dataOne)});

        chart.data.label.push(time);
        chart.data.datasets.forEach(function(dataset) {dataset.data.push(dataTwo)});
    }
}

// function addData(chart, label, data) {
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
//     });
//     chart.update();
// }

function updateData() {
    console.log("updating data...");
    parseData();
    makeChart(time, dataOne, dataTwo);
    chart.update();
    setInterval(updateData, updateInterval);
}
updateData();

// var ctx = document.getElementById('myChart').getContext('2d');
// var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'line',

//     // The data for our dataset
//     data: {
//         labels: time,
//         datasets: [{
//             label: 'DRAW DOWN PRESSURE',
//             backgroundColor: 'rgba(39, 174, 96, 0.2)',
//             borderColor: 'rgb(39, 174, 96)',
//             borderWidth: '2',
//             pointRadius: '0',
//             data: pressureData,
//             yAxisID: 'y-axis-1'
//         },
//         {
//             label: 'TRANSDUCER TEMPERATURE',
//             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//             borderColor: 'rgb(255, 99, 132)',
//             borderWidth: '2',
//             pointRadius: '0',
//             data: tempData,
//             yAxisID: 'y-axis-2'
//         }]
//     },

//     // Configuration options go here
//     options: {
//         responsive: true,
//         hoverMode: 'index',
//         stacked: false,
//         title: {
//             display: true,
//             text: 'Chart.js Line Chart - Multi Axis'
//         },
//         scales: {
//             yAxes: [{
//                 type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
//                 display: true,
//                 position: 'left',
//                 id: 'y-axis-1',
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }, {
//                 type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
//                 display: true,
//                 position: 'right',
//                 id: 'y-axis-2',
//                 ticks: {
//                     beginAtZero: false
//                 },
//                 // grid line settings
//                 gridLines: {
//                     drawOnChartArea: false, // only want the grid lines for one axis to show up
//                 },
//             }],
//         }
//     }
// });
