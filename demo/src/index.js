
import Chart from 'chart.js';
import 'moment'
import 'chartjs-plugin-streaming';

function init(){
    let count = 0;
    var socket = io();

    let new_data = []
    socket.on('data', function(data){
        new_data.push(JSON.parse(data))
    })

    socket.on('tick', update_ticks);

    var ctx = document.getElementById('myChart');

    let disable_lines = {
        elements: {
            line: {
                tension: 0 // disables bezier curves
            }
        }
    }

    let disable_animations = {
        animation: {
            duration: 0 // general animation time
        },
        hover: {
            animationDuration: 0 // duration of animations when hovering an item
        },
            responsiveAnimationDuration: 0 // animation duration after a resize
        }
    
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: "Live Signal",
                    pointBackgroundColor: "orange",
                    pointBorderColor: "orange",
                    pointRadius: 2,
                    fill: false,
                    data: []
                }
            ]
        },
        options: {
            ...disable_lines,
            ...disable_animations,
            scales: {
                yAxes: [{
                    // scaleLabel:{
                    //     labelString: "mV",
                    //     display: true
                    // }
                }],
                xAxes: [{
                    type: 'realtime',
                    // scaleLabel: {
                    //     labelString: "Time",
                    //     display: true,
                    // },
                    realtime: {
                    delay: 10,
                    onRefresh: function(chart) {
                        new_data.forEach((value)=>{
                            chart.data.datasets[0].data.push(value)
                        })
                        new_data = []
                    }
                    }
                }]
            }
        }
      });
}

function update_ticks(seconds){
    document.querySelector(".seconds").innerHTML = String(seconds % 60).padStart(2, "0")
    document.querySelector(".minutes").innerHTML = String(Math.floor(seconds / 60) % 60).padStart(2, "0")
    document.querySelector(".hours").innerHTML = String(Math.floor(seconds / 60 / 60) % 24).padStart(2, "0")
}

document.addEventListener("DOMContentLoaded", init);