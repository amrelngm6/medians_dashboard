/**
* @Package: Medians  Dashboard
* @Version: 1.0.0
*/

jQuery(function($) {

    'use strict';

    var MediansSettings = window.MediansSettings || {};

    /*--------------------------------
        Sparkline Chart
     --------------------------------*/
    MediansSettings.dbSparklineChart = function() {

        if ($.isFunction($.fn.sparkline)) {

            $('.db_dynamicbar').sparkline([6.2, 8.4, 8.8, 8, 9.2, 8.8, 8, 7.5, 5.2, 9.9, 9, 9, 8.4, 9, 8.8, 8, 9.5, 9.2, 9.9, 9, 9,8, 7.1, 9, 9, 9.5, 8, 9.5, 9.8], {
                type: 'bar',
                barColor: '#e77512',
                height: '80',
                barWidth: '10',
                barSpacing: 1,
            });

            $('.db_linesparkline').sparkline([2000, 3454, 5454, 2323, 3432, 2323, 3432, 4656, 2897, 3545, 4232, 5434, 4656, 4656, 2897, 3545, 4232, 5434, 4656, 2323, 3432, 4656, 2897, 3545, 4232, 5434, 4656, 3567, 4878, 3676, 3787], {
                type: 'line',
                width: '100%',
                height: '80',
                lineWidth: 2,
                lineColor: '#e77512',
                fillColor: 'rgba(255,255,255,0.2)',
                highlightSpotColor: '#3F51B5',
                highlightLineColor: '#3F51B5',
                spotRadius: 3,
            });

            $('.db_linesparkline2').sparkline([3545, 4232, 5434, 4656, 4656, 2897, 3545, 4232, 5434, 2000, 3454, 5454, 2323, 3432, 2323, 3432, 4656, 2897, 4656, 2323, 3432, 4656, 2897, 3545, 4232, 5434, 4656, 3567, 4878, 3676, 3787], {
                type: 'line',
                width: '100%',
                height: '80',
                lineWidth: 2,
                lineColor: '#ffb426',
                fillColor: 'rgba(255,255,255,0.2)',
                highlightSpotColor: '#ffb426',
                highlightLineColor: '#ffb426',
                spotRadius: 3,
            });


            // Bar + line composite charts
            $('.db_compositebar').sparkline([4, 6, 7, 7, 4, 3, 2, 4, 6, 7, 4, 6, 7, 7, 4, 3, 2, 4, 6, 7,7, 4, 3, 1, 4, 6, 5, 9], {
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




    /*--------------------------------
        Easy PIE
     --------------------------------*/
    MediansSettings.dbEasyPieChart = function() {

        if ($.isFunction($.fn.easyPieChart)) {

            $('.db_easypiechart1').easyPieChart({
                barColor: '#ffb426',
                trackColor: '#f5f5f5',
                scaleColor: '#f5f5f5',
                lineCap: 'square',
                lineWidth: 6,
                size: 120,
                animate: 2000,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
        }

    };




    /*--------------------------------
        Morris 
     --------------------------------*/
    MediansSettings.dbMorrisChart = function() {

        if ($('#morris-area-example').length) {

            Morris.Area({
              element: 'morris-area-example',
              lineColors: ['#fea01d', '#63CF72', '#FABA66'],
              data: [{
                  y: '2012',
                  a: 190
                },
                {
                  y: '2013',
                  a: 125
                },
                {
                  y: '2014',
                  a: 100
                },
                {
                  y: '2015',
                  a: 155
                },
                {
                  y: '2016',
                  a: 100
                },
                {
                  y: '2017',
                  a: 140
                },
                {
                  y: '2018',
                  a: 180
                }
              ],
              xkey: 'y',
              ykeys: ['a'],
              labels: ['Series A']
            });
          }
          
        /*Area Graph*/
        // Use Morris.Area instead of Morris.Line
        Morris.Area({
            element: 'db_morris_area_graph',
            data: [{
                x: '2017 Q1',
                y: 3,
                z: 2
            }, {
                x: '2017 Q2',
                y: 2,
                z: 1
            }, {
                x: '2017 Q3',
                y: 1,
                z: 2
            }, {
                x: '2017 Q4',
                y: 2,
                z: 2
            }, {
                x: '2017 Q5',
                y: 4,
                z: 2
            }, {
                x: '2017 Q6',
                y: 2,
                z: 4
            }],
            resize: true,
            redraw: true,
            xkey: 'x',
            ykeys: ['y', 'z'],
            labels: ['Y', 'Z'],
            lineColors: ['#ffb426', '#e77512'],
            pointFillColors: ['#E91E63']
        }).on('click', function(i, row) {
            console.log(i, row);
        });


    };



    /*--------------------------------
        Rickshaw charts
     --------------------------------*/
    MediansSettings.dbRickshawChart = function() {



        /*------------------- extensions chart - start----------------------*/

        // set up our data series with 100 random data points

        var seriesData = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];
        var random = new Rickshaw.Fixtures.RandomData(150);

        for (var i = 0; i < 50; i++) {
            random.addData(seriesData);
        }

        // instantiate our graph!

        var graph = new Rickshaw.Graph({
            element: document.getElementById("chart"),
            width: $(".rickshaw_ext").width(),
            height: 235,
            renderer: 'area',
            stroke: true,
            preserve: true,
            series: [{
                color: '#3F51B5',
                data: seriesData[0],
                name: 'Upload'
            }, {
                color: '#E91E63',
                data: seriesData[1],
                name: 'Download'
            }, {
                color: '#ffb426',
                data: seriesData[2],
                name: 'Speed'
            }]
        });

        graph.render();

        var preview = new Rickshaw.Graph.RangeSlider({
            graph: graph,
            element: document.getElementById('preview'),
        });

        var hoverDetail = new Rickshaw.Graph.HoverDetail({
            graph: graph,
            xFormatter: function(x) {
                return new Date(x * 1000).toString();
            }
        });

        var annotator = new Rickshaw.Graph.Annotate({
            graph: graph,
            element: document.getElementById('timeline')
        });

        var legend = new Rickshaw.Graph.Legend({
            graph: graph,
            element: document.getElementById('legend')

        });

        var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
            graph: graph,
            legend: legend
        });

        var order = new Rickshaw.Graph.Behavior.Series.Order({
            graph: graph,
            legend: legend
        });

        var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
            graph: graph,
            legend: legend
        });

        var smoother = new Rickshaw.Graph.Smoother({
            graph: graph,
            element: document.querySelector('#smoother')
        });

        var ticksTreatment = 'glow';

        var xAxis = new Rickshaw.Graph.Axis.Time({
            graph: graph,
            ticksTreatment: ticksTreatment,
            timeFixture: new Rickshaw.Fixtures.Time.Local()
        });

        xAxis.render();

        var yAxis = new Rickshaw.Graph.Axis.Y({
            graph: graph,
            tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
            ticksTreatment: ticksTreatment
        });

        yAxis.render();


        var controls = new RenderControls({
            element: document.querySelector('form#rickshaw_side_panel'),
            graph: graph
        });

        // add some data every so often

        var messages = [
            "Changed home page welcome message",
            "Minified JS and CSS",
            "Changed button color from blue to green",
            "Refactored SQL query to use indexed columns",
            "Added additional logging for debugging",
            "Fixed typo",
            "Rewrite conditional logic for clarity",
            "Added documentation for new methods"
        ];

        setInterval(function() {
            random.removeData(seriesData);
            random.addData(seriesData);
            graph.update();

        }, 3000);

        function addAnnotation(force) {
            if (messages.length > 0 && (force || Math.random() >= 0.95)) {
                annotator.add(seriesData[2][seriesData[2].length - 1].x, messages.shift());
                annotator.update();
            }
        }

        addAnnotation(true);
        setTimeout(function() {
            setInterval(addAnnotation, 6000)
        }, 6000);

        var previewXAxis = new Rickshaw.Graph.Axis.Time({
            graph: graph,
            timeFixture: new Rickshaw.Fixtures.Time.Local(),
            ticksTreatment: ticksTreatment
        });

        previewXAxis.render();


        /*------------------- extensions chart - end----------------------*/



    };





    /*--------------------------------
         gauge meter
     --------------------------------*/
    MediansSettings.dbGaugemeter = function() {

        if ($("#gauge-meter").length) {
            var opts = {
                lines: 1, // The number of lines to draw
                angle: 0.05, // The length of each line
                lineWidth: 0.30, // The line thickness
                pointer: {
                    length: 0.40, // The radius of the inner circle
                    strokeWidth: 0.038, // The rotation offset
                    color: '#ffffff' // Fill color
                },
                limitMax: 'false', // If true, the pointer will not go past the end of the gauge
                colorStart: '#ffb426', // Colors
                colorStop: '#ffb426', // just experiment with them
                strokeColor: '#ffffff', // to see which ones work best for you
                generateGradient: false
            };
            var target = document.getElementById('gauge-meter'); // your canvas element
            var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
            gauge.maxValue = 100; // set max gauge value
            gauge.animationSpeed = 90; // set animation speed (32 is default value)

            gauge.set(56); // set actual value
            gauge.setTextField(document.getElementById("gauge-meter-text"));
            randomGauge();

        }

        function randomGauge() {
            setTimeout(function() {
                var val = Math.random() * 99;
                gauge.set(val); // set actual va{lue
                AnimationUpdater.run();
                randomGauge();
            }, 2000);
        }

    };



    /******************************
     initialize respective scripts 
     *****************************/
    $(document).ready(function() {
        MediansSettings.dbSparklineChart();
        //MediansSettings.dbEasyPieChart();
        MediansSettings.dbMorrisChart();
        //MediansSettings.dbRickshawChart();
        //MediansSettings.dbGaugemeter();
    });

    $(window).resize(function() {
        MediansSettings.dbSparklineChart();
    });

    $(window).load(function() {});

});
