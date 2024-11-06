/**
 * @Package: Medians  Dashboard
 * @Version: 1.0.0
 */

jQuery(function ($) {

    'use strict';

    var MediansSettings = window.MediansSettings || {};

    /*--------------------------------
        Chart Js Chart
     --------------------------------*/
    MediansSettings.chartJS = function () {



        if ($(".bar-chartjs").length) {
            
            var randomScalingFactor = function () {
                return Math.round(Math.random() * 100)
            };

            const chartsList = document.querySelectorAll('.bar-chartjs');
            
            chartsList.forEach(ctx => {
                
                let chartColor = jQuery(ctx).data('color');
                let chartLabel = jQuery(ctx).data('label');
                let chartLimit = jQuery(ctx).data('limit');

                new Chart(ctx, {
                    type: 'bar',
                    
                    data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].slice(0,  chartLimit ?? 12 ),
                    datasets: 
                        [{
                            label: chartLabel ?? "Visits",
                            // borderColor: "rgba(0,0,0,1)",
                            color: chartColor ?? "rgb(0,42,82)",
                            backgroundColor: chartColor ?? "rgb(0,42,82)",
                            borderRadius: 200,
                            barThickness: 7,
                            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()].slice(0,  chartLimit ?? 12 ),
                            borderWidth: 1
                        }]
                    },
                });
            })
        }

        
        if ($('#statistics-chart').length) {
            var barChartCanvas = $("#statistics-chart").get(0).getContext("2d");
            var barChart = new Chart(barChartCanvas, {
                type: 'bar',
                data: {
                    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10",],
                    datasets: [{
                        label: 'Revenue',
                        data: [39, 19, 25, 16, 31, 39, 23, 20, 23, 18],
                        backgroundColor: '#19d895'
                    },
                    {
                        label: 'Sales',
                        data: [27, 12, 26, 15, 21, 27, 13, 19, 32, 22],
                        backgroundColor: '#2196f3'
                    }
                    ]
                },
                options: {
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }
                    },

                    scales: {
                        responsive: true,
                        maintainAspectRatio: true,
                        yAxes: [{
                            stacked: true,
                            display: false,
                            gridLines: {
                                color: 'rgba(0, 0, 0, 0.03)',
                            }
                        }],
                        xAxes: [{
                            stacked: true,
                            display: false,
                            barPercentage: 0.3,
                            gridLines: {
                                display: false,
                            }
                        }]
                    },
                    legend: {
                        display: false
                    }
                }
            });
        }

        /*Line Chart*/
        if ($(".line-chartjs").length) {
            
            var randomScalingFactor = function () {
                return Math.round(Math.random() * 100)
            };

            const chartsList = document.querySelectorAll('.line-chartjs');
            
            chartsList.forEach(ctx => {
                
                let chartColor = jQuery(ctx).data('color');
                let chartLabel = jQuery(ctx).data('label');
                let chartFillArea = jQuery(ctx).data('fill');

                new Chart(ctx, {
                    type: 'line',
                    data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: 
                        [{
                            label: chartLabel ?? "Visits",
                            fill: chartFillArea ?? false,
                            // borderColor: "rgba(0,0,0,1)",
                            borderColor: chartColor ?? "rgb(0,42,82)",
                            cubicInterpolationMode: 'monotone',     // Smooth the line
                            tension: 0.4  ,
                            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
                            borderWidth: 1
                        }]
                    },
                    
                });
            })


        }

        /* Clean Line Chart */
        if ($(".clean-line-chartjs").length) {
            var randomScalingFactor = function () {
                return Math.round(Math.random() * 100)
            };

            const chartsList = document.querySelectorAll('.clean-line-chartjs');
            
            chartsList.forEach(ctx => {
                
                let chartColor = jQuery(ctx).data('color');
                let chartLabel = jQuery(ctx).data('label');
                let chartFillArea = jQuery(ctx).data('fill');

                new Chart(ctx, {
                    type: 'line',
                    data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: 
                        [{
                            label: chartLabel ?? "Visits",
                            fill: chartFillArea ?? false,
                            // borderColor: "rgba(0,0,0,1)",
                            borderColor: chartColor ?? "rgb(0,42,82)",
                            cubicInterpolationMode: 'monotone',     // Smooth the line
                            tension: 0.4  ,
                            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        elements: {
                            point:{
                                radius: 0
                            }
                        },
                        scales: {
                            x: {
                                display: false  // Hides the x-axis
                            },
                            y: {
                                display: false  // Hides the y-axis
                            }
                        },
                        plugins: {
                            legend: {
                                display: false,
                            }
                        }
                    }
                });
            })

                

        }


        
        /* Clean Line Chart */
        if ($(".clean-bar-chartjs").length) {
            var randomScalingFactor = function () {
                return Math.round(Math.random() * 100)
            };

            const chartsList = document.querySelectorAll('.clean-bar-chartjs');
            
            chartsList.forEach(ctx => {
                
                let chartColor = jQuery(ctx).data('color');
                let chartLabel = jQuery(ctx).data('label');
                let chartLimit = jQuery(ctx).data('limit');

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].slice(0,  chartLimit ?? 12 ),
                    datasets: 
                        [{
                            label: chartLabel ?? "Visits",
                            // borderColor: "rgba(0,0,0,1)",
                            color: chartColor ?? "rgb(0,42,82)",
                            backgroundColor: chartColor ?? "rgb(0,42,82)",
                            barThickness: 7,
                            borderRadius: 100,
                            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()].slice(0,  chartLimit ?? 12 ),
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                display: false  // Hides the x-axis
                            },
                            y: {
                                display: false  // Hides the y-axis
                            },

                        },
                        plugins: {
                            legend: {
                                display: false,
                            }
                        }
                    }
                });
            })

                

        }


        
        /* Clean Pie Chart */
        if ($(".clean-pie-chartjs").length) {
            var randomScalingFactor = function () {
                return Math.round(Math.random() * 100)
            };

            const chartsList = document.querySelectorAll('.clean-pie-chartjs');
            
            chartsList.forEach(ctx => {
                
                let chartColor = jQuery(ctx).data('color');
                let chartLabel = jQuery(ctx).data('label');
                let chartLimit = jQuery(ctx).data('limit');

                new Chart(ctx, {
                    type: 'pie',
                    data: {
                    labels: ["Completed", "Pending", "Canceled", "Delyed", "Testing"].slice(0,  chartLimit ?? 12 ),
                    datasets: 
                        [{
                            label: chartLabel ?? "Visits",
                            // borderColor: "rgba(0,0,0,1)",
                            color: chartColor ?? "",
                            backgroundColor: chartColor ?? ["#002a52", "#51bd50","#f8285a","#171922", "#ffa600", "#ffa600"].slice(0,  chartLimit ?? 12 ),
                            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()].slice(0,  chartLimit ?? 12 ),
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                display: false  // Hides the x-axis
                            },
                            y: {
                                display: false  // Hides the y-axis
                            }
                        },
                        plugins: {
                            legend: {
                                display: false,
                            }
                        }
                    }
                });
            })

                

        }
        
        /* Clean Doughnut Chart */
        if ($(".clean-doughnut-chartjs").length) {
            var randomScalingFactor = function () {
                return Math.round(Math.random() * 100)
            };

            const chartsList = document.querySelectorAll('.clean-doughnut-chartjs');
            
            chartsList.forEach(ctx => {
                
                let chartColor = jQuery(ctx).data('color');
                let chartLabel = jQuery(ctx).data('label');
                let chartLimit = jQuery(ctx).data('limit');

                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                    labels: ["Completed", "Pending", "Canceled", "Delyed", "Testing"].slice(0,  chartLimit ?? 5 ),
                    datasets: 
                        [{
                            label: chartLabel ?? "Visits",
                            // borderColor: "rgba(0,0,0,1)",
                            color: chartColor ?? "",
                            backgroundColor: chartColor ?? ["#002a52", "#51bd50","#f8285a","#171922", "#ffa600", "#ffa600"].slice(0,  chartLimit ?? 5 ),
                            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()].slice(0,  chartLimit ?? 5 ),
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                display: false  // Hides the x-axis
                            },
                            y: {
                                display: false  // Hides the y-axis
                            }
                        },
                        plugins: {
                            legend: {
                                display: false,
                            }
                        }
                    }
                });
            })

                

        }


        if ($(".pie-chartjs").length) {
            var randomScalingFactor = function () {
                return Math.round(Math.random() * 100)
            };

            const chartsList = document.querySelectorAll('.pie-chartjs');
            
            chartsList.forEach(ctx => {
                
                let chartColor = jQuery(ctx).data('color');
                let chartLabel = jQuery(ctx).data('label');
                let chartLimit = jQuery(ctx).data('limit');

                new Chart(ctx, {
                    type: 'pie',
                    data: {
                    labels: ["Completed", "Pending", "Canceled", "Delyed", "Testing"].slice(0,  chartLimit ?? 5 ),
                    datasets: 
                        [{
                            label: chartLabel ?? "Visits",
                            // borderColor: "rgba(0,0,0,1)",
                            color: chartColor ?? "",
                            backgroundColor: chartColor ?? ["#002a52", "#51bd50","#f8285a","#171922", "#ffa600", "#ffa600"].slice(0,  chartLimit ?? 5 ),
                            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()].slice(0,  chartLimit ?? 5 ),
                            borderWidth: 1
                        }]
                    },
                   
                });
            })
        }

        if ($(".doughnut-chartjs").length) {
            var randomScalingFactor = function () {
                return Math.round(Math.random() * 100)
            };

            const chartsList = document.querySelectorAll('.doughnut-chartjs');
            
            chartsList.forEach(ctx => {
                
                let chartColor = jQuery(ctx).data('color');
                let chartLabel = jQuery(ctx).data('label');
                let chartLimit = jQuery(ctx).data('limit');

                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                    labels: ["Completed", "Pending", "Canceled", "Delyed", "Testing"].slice(0,  chartLimit ?? 5 ),
                    datasets: 
                        [{
                            label: chartLabel ?? "Visits",
                            // borderColor: "rgba(0,0,0,1)",
                            color: chartColor ?? "",
                            backgroundColor: chartColor ?? ["#002a52", "#51bd50","#f8285a","#171922", "#ffa600", "#ffa600"].slice(0,  chartLimit ?? 5 ),
                            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()].slice(0,  chartLimit ?? 5 ),
                            borderWidth: 1
                        }]
                    },
                   
                });
            })

        }



        if ($("#polar-chartjs").length) {
            /*Polar Chart*/

            var polarData = [{
                value: 300,
                color: "#E91E63",
                highlight: "rgba(250,133,100,0.8)",
                label: "Accent"
            }, {
                value: 150,
                color: "rgba(63,81,181,1)",
                highlight: "rgba(63,81,181,0.8)",
                label: "Primary"
            }, {
                value: 50,
                color: "#FFC107",
                highlight: "#FFC870",
                label: "Yellow"
            }, {
                value: 120,
                color: "rgba(103,58,183,1.0)",
                highlight: "rgba(103,58,183,0.8)",
                label: "Purple"
            }

            ];

            var ctxp = document.getElementById("polar-chartjs").getContext("2d");
            window.myPolarArea = new Chart(ctxp).PolarArea(polarData, {
                responsive: true
            });

        }




        if ($("#radar-chartjs").length) {


            /*Radar Chart*/
            var radarChartData = {
                labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
                datasets: [{
                    label: "My First dataset",
                    fillColor: "rgba(63,81,181,0.4)",
                    strokeColor: "rgba(63,81,181,1)",
                    pointColor: "rgba(63,81,181,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(63,81,181,1)",
                    data: [65, 59, 90, 81, 56, 55, 40]
                }, {
                    label: "My Second dataset",
                    fillColor: "rgba(103,58,183,0.4)",
                    strokeColor: "rgba(103,58,183,1.0)",
                    pointColor: "rgba(103,58,183,1.0)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(103,58,183,1.0)",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }]
            };

            window.myRadar = new Chart(document.getElementById("radar-chartjs").getContext("2d")).Radar(radarChartData, {
                responsive: true
            });
        }

    };

    /*--------------------------------
        Sparkline Chart
     --------------------------------*/
    MediansSettings.dbSparklineChart = function () {

        if ($.isFunction($.fn.sparkline)) {

            $('.db_dynamicbar').sparkline([6.2, 8.4, 8.8, 8, 9.2, 8.8, 8, 7.5, 5.2, 9.9, 9, 9, 8.4, 9, 8.8, 8, 9.5, 9.2, 9.9, 9, 9, 8, 7.1, 9, 9, 9.5, 8, 9.5, 9.8], {
                type: 'bar',
                barColor: '#e77512',
                height: '80',
                barWidth: '10',
                barSpacing: 1,
            });

            $('.sparklinedash').sparkline([10, 5, 6, 10, 9, 12, 4, 9, 7.5, 5.2, 9.9, 9, 9, 8.4], {
                type: 'bar',
                height: '60',
                barWidth: '4',
                resize: true,
                barSpacing: '5',
                barColor: '#fb9678'
            });
            $('.sparklinedash2').sparkline([7, 5, 6, 10, 9, 12, 7, 9, 6.2, 8.4, 8.8, 8, 9.2, 8.8], {
                type: 'bar',
                height: '60',
                barWidth: '4',
                resize: true,
                barSpacing: '5',
                barColor: '#ab8ce4'
            });
            $(".sparkline8").sparkline([2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
                type: 'line',
                width: '100%',
                height: '60',
                lineColor: '#99d683',
                fillColor: '#99d683',
                maxSpotColor: '#99d683',
                highlightLineColor: 'rgba(0, 0, 0, 0.2)',
                highlightSpotColor: '#99d683'
            });
            $(".sparkline9").sparkline([0, 2, 8, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
                type: 'line',
                width: '100%',
                height: '60',
                lineColor: '#13dafe',
                fillColor: '#13dafe',
                minSpotColor: '#13dafe',
                maxSpotColor: '#13dafe',
                highlightLineColor: 'rgba(0, 0, 0, 0.2)',
                highlightSpotColor: '#13dafe'
            });

            $(".watch1").sparkline([2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
                type: 'line',
                width: '100%',
                height: '80',
                lineColor: '#13dafe',
                fillColor: 'rgba(19, 218, 254, 0.3)',
                maxSpotColor: '#99d683',
                highlightLineColor: 'rgba(0, 0, 0, 0.2)',
                highlightSpotColor: 'rgba(0,0,0,.2)'
            });
            $('.watch2').sparkline([0, 13, 10, 14, 15, 10, 18, 15, 19], {
                type: 'line',
                width: '100%',
                height: '80',
                lineColor: '#6164c1',
                fillColor: 'rgba(97, 100, 193, 0.3)',
                highlightLineColor: 'rgba(0,0,0,.1)',
                highlightSpotColor: 'rgba(0,0,0,.2)'
            });
            $(".watch3").sparkline([0, 2, 8, 6, 8, 5, 6, 4, 8, 6, 6, 2], {
                type: 'line',
                width: '100%',
                height: '80',
                lineColor: '#fa8282',
                fillColor: 'rgba(255,211,152,.8)',
                minSpotColor: '#13dafe',
                maxSpotColor: '#13dafe',
                highlightLineColor: 'rgba(0, 0, 0, 0.2)',
                highlightSpotColor: '#13dafe'
            });
            $(".watch4").sparkline([3, 7, 5, 6, 8, 7, 6, 7, 8, 6, 6, 9], {
                type: 'line',
                width: '100%',
                height: '80',
                lineColor: '#13dafe',
                fillColor: 'rgba(153,214,131,.7)',
                minSpotColor: '#13dafe',
                maxSpotColor: '#13dafe',
                highlightLineColor: 'rgba(0, 0, 0, 0.2)',
                highlightSpotColor: '#13dafe'
            });
            $(".watch5").sparkline([2, 5, 6, 6, 9, 5, 7, 7, 8, 5, 6, 8], {
                type: 'line',
                width: '100%',
                height: '80',
                lineColor: '#fc6180',
                fillColor: 'rgba(252, 97, 128, 0.3)',
                maxSpotColor: '#99d683',
                highlightLineColor: 'rgba(0, 0, 0, 0.2)',
                highlightSpotColor: 'rgba(0,0,0,.2)'
            });


            // Bar + line composite charts
            $('.db_compositebar').sparkline([4, 6, 7, 7, 4, 3, 2, 4, 6, 7, 4, 6, 7, 7, 4, 3, 2, 4, 6, 7, 7, 4, 3, 1, 4, 6, 5, 9], {
                type: 'bar',
                barColor: '#3F51B5',
                height: '80',
                barWidth: '10',
                barSpacing: 1,
            });

            $('.db_compositebar').sparkline([4, 1, 5, 7, 9, 9, 8, 8, 4, 7, 9, 4, 6, 7, 7, 4, 3, 2, 4, 6, 7, 9, 8, 8, 4, 2, 5, 6, 7], {
                composite: true,
                fillColor: 'rgba(103,58,183,0)',
                type: 'line',
                width: '100%',
                height: '80',
                lineWidth: 2,
                lineColor: '#ffb426',
                highlightSpotColor: '#E91E63',
                highlightLineColor: '#ffb426',
                spotRadius: 3,
            });

        }

    };






    /******************************
     initialize respective scripts 
     *****************************/
    $(document).ready(function () {
        MediansSettings.dbSparklineChart();
    });

    $(window).resize(function () {
        MediansSettings.dbSparklineChart();
    });

    $(window).load(function () {
        MediansSettings.chartJS();
    });

});