(async () => {

    if (!document.getElementById('world-map'))
        return;

    const topology = await fetch(
        '/assets/plugins/highcharts/data.json'
    ).then(response => response.json());

    
    /** Load data from Josn file */
    var data;
    await fetch('/data/map/world.json')
    .then(res => res.json())
    .then(output => {
        data = output;
    });

    var initialMapName = 'Visitors by country',
            initialMapKey = 'custom/world';

    Highcharts.mapChart('world-map', {
        chart: {
            map: topology
        },

        title: {
            text: initialMapName,
            align: 'left'
        },


        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 60
        },

        tooltip: {
            valueDecimals: 1,
            valueSuffix: ' Visits'
        },

        series: [{
            data,
            topology,
            joinBy: ['hc-key', 'key'],
            name: initialMapName,
            dataLabels: {
                formatter: function () {
                    return this.point.properties && this.point.properties[
                        'hc-a2'];
                }
            },
            custom: {
                mapName: initialMapName,
                mapKey: initialMapKey
            }
        }]
    });

})();
// Source: https://www.bls.gov/web/laus/laumstrk.htm

(async () => {

    if (!document.getElementById('us-map'))
        return;

    const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/us/custom/us-small.topo.json'
    ).then(response => response.json());

    // Load the data from the HTML table and tag it with an upper case name used
    // for joining
    const data = [];

    Highcharts.data({
        table: document.getElementById('data'),
        startColumn: 1,
        firstRowAsNames: false,
        complete: function (options) {
            options.series[0].data.forEach(function (p) {
                data.push({
                    ucName: p[0],
                    value: p[1]
                });
            });
        }
    });

    // Prepare map data for joining
    topology.objects.default.geometries.forEach(function (g) {
        if (g.properties && g.properties.name) {
            g.properties.ucName = g.properties.name.toUpperCase();
        }
    });

    // Initialize the chart
    Highcharts.mapChart('us-map', {

        title: {
            text: 'Sales Map in US in 2024',
            align: 'left'
        },

        subtitle: {
            text: 'Small US map with data labels',
            align: 'left'
        },

        mapNavigation: {
            enabled: true,
            enableButtons: false
        },

        xAxis: {
            labels: {
                enabled: false
            }
        },

        colorAxis: {
            labels: {
                format: '{value}%'
            },
            stops: [
                [0.2, '#188e2a'], // Green
                [0.6, '#fee401'], // Yellow
                [1, '#df1309'] // Red
            ],
            min: 0,
            max: 6
        },

        series: [{
            mapData: topology,
            data,
            joinBy: 'ucName',
            name: 'Unemployment rate per 2024',
            dataLabels: {
                enabled: true,
                format: '{point.properties.hc-a2}',
                style: {
                    fontSize: '10px'
                }
            },
            tooltip: {
                valueSuffix: '%'
            }
        }, {
        // The connector lines
            type: 'mapline',
            data: Highcharts.geojson(topology, 'mapline'),
            color: 'silver',
            accessibility: {
                enabled: false
            }
        }]
    });

})();




(async () => {

    /**
 * This is a complicated demo of Highcharts Maps, not intended to get you up to
 * speed quickly, but to show off some basic maps and features in one single
 * place. For the basic demo, check out
 * https://www.highcharts.com/demo/maps/tooltip instead.
 *
 */

    // Get all HTML elements
    const datalist = document.getElementById('maps'),
        input = document.getElementById('map-datalist-input'),
        prevMapButton = document.getElementById('prev-map-btn'),
        nextMapButton = document.getElementById('next-map-btn'),
        dataLabelsCheckbox = document.getElementById('datalabels-checkbox'),
        mapNameHeader = document.getElementById('map-name-header');

    if (!datalist)
    {
        return;
    }
        

    // Base path to maps
    const baseMapPath = 'https://code.highcharts.com/mapdata/',
        options = [], // Options elements
        allMaps = {},
        mapsToSkip = [
            'World, Eckert III projection, high resolution',
            'World, Eckert III projection, low resolution',
            'World, Eckert III projection, medium resolution',
            'World, Robinson projection, high resolution',
            'World, Robinson projection, low resolution',
            'World, Robinson projection, medium resolution'
        ];

    // Populate dropdown options
    for (const [mapGroup, maps] of Object.entries(Highcharts.mapDataIndex)) {
        if (mapGroup !== 'version') {
            Highcharts.merge(true, allMaps, maps);
        }
    }

    // Remove unwanted text from maps display name
    for (const key of Object.keys(allMaps)) {
        if (key.includes(', Miller projection')) {
            allMaps[key.replace(', Miller projection', '')] = allMaps[key];
            delete allMaps[key];
        }
    }

    for (const [desc, path] of Object.entries(allMaps)) {
        if (!mapsToSkip.includes(desc)) {
            const option = document.createElement('option');
            option.value = desc; // Display name
            option.dataset.value = path; // Desired value
            options.push(option);
        }
    }

    datalist.append(...options);

    const searchText = `Search in ${Object.keys(options).length} maps`;
    input.placeholder = searchText;

    // Helper functions
    function setAttributes(el, attrs) {
        for (const key in attrs) {
            if (Object.prototype.hasOwnProperty.call(attrs, key)) {
                el.setAttribute(key, attrs[key]);
            }
        }
    }

    function fillInfo(mapName) {
        

        mapNameHeader.innerText = mapName;
    }

    function resetDrilldown(chart) {
        // Reset drilldown functionalities
        if (chart.breadcrumbs && chart.breadcrumbs.elementList[0]) {
            chart.breadcrumbs.destroy();
            delete chart.breadcrumbs;
            delete chart.drilldown;
            delete chart.drilldownLevels;
        }
    }

    // Initial creation of the chart
    (async () => {
        const initialMapName = 'All Visitors',
            initialMapKey = 'custom/world',
            mapData = await fetch(`https://code.highcharts.com/mapdata/${initialMapKey}.topo.json`)
                .then(response => response.json())
                .catch(e => {});

        fillInfo(initialMapName, initialMapKey);

        // On point click, look for a detailed map to drill into
        const drilldown = async function (e) {
            const map = Object.entries(allMaps).find(map =>
                map[0] === e.point.name
            ) || Object.entries(allMaps).find(map =>
                map[0].indexOf(e.point.name) === 0
            );
            if (!e.seriesOptions && map) {
                const chart = this,
                    mapName = map[0],
                    mapKey = map[1].slice(0, -3);

                // Handle error, the timeout is cleared on success
                let fail = setTimeout(() => {
                    if (!Highcharts.maps[mapKey]) {
                        chart.showLoading(
                            '<i class="fa fa-frown"></i> Map not ' +
                            'found'
                        );
                        fail = setTimeout(() => {
                            chart.hideLoading();
                        }, 1000);
                    }
                }, 3000);

                // Show the Font Awesome spinner
                chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>');

                fillInfo(mapName, mapKey);
                input.value = mapName;
                prevMapButton.style.opacity = 1;
                nextMapButton.style.opacity = 1;

                // Load the drilldown map
                const topology = await fetch(
                    `https://code.highcharts.com/mapdata/${mapKey}.topo.json`
                ).then(response => response.json());

                const data =
                    topology.objects.default.geometries.map((g, value) => ({
                        key: g.properties['hc-key'],
                        drilldown: g.properties['hc-key'],
                        value
                    }));

                // Data labels formatter. Use shorthand codes for world and US
                const formatter = function () {
                    return (
                        mapKey === 'custom/world' ||
                        mapKey === 'countries/us/us-all'
                    ) ?
                        (this.point.properties && this.point.properties['hc-a2']) :
                        this.point.name;
                };

                // Hide loading and add series
                chart.hideLoading();
                clearTimeout(fail);
                chart.addSeriesAsDrilldown(e.point, {
                    mapData: topology,
                    name: e.point.name,
                    data,
                    joinBy: ['hc-key', 'key'],
                    dataLabels: {
                        formatter
                    },
                    custom: {
                        mapName,
                        mapKey
                    }
                });

                // Update credits in afterDrilldown. The chart is not ready yet.
            }
        };

        // On drill up, reset to the top-level map view
        const afterDrillUp = function (e) {
            const {
                mapName,
                mapKey
            } = e.seriesOptions.custom;
            if (mapName && mapKey) {
                fillInfo(mapName, mapKey);
                input.value = mapName;
            }
            this.credits.update();
        };

        /** Load data from Josn file */
        var data;
        await fetch('/data/map/world.json')
        .then(res => res.json())
        .then(output => {
            data = output;
        });

        const chart = Highcharts.mapChart('world-map2', {
            accessibility: {
                series: {
                    descriptionFormat: '{series.name}, map with ' +
                        '{series.points.length} areas.',
                    pointDescriptionEnabledThreshold: 50
                }
            },

            chart: {
                events: {
                    drilldown,
                    afterDrillUp,
                    afterDrilldown: function () {
                        this.credits.update();
                    }
                }
            },

            colorAxis: {
                min: 0
            },

            drilldown: {
                activeDataLabelStyle: {
                    color: '#fff',
                    fontWeight: 'normal',
                    textDecoration: 'none'
                }
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    alignTo: 'spacingBox',
                    x: 10
                }
            },

            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'bottom'
            },

            plotOptions: {
                map: {
                    dataLabels: {
                        enabled: dataLabelsCheckbox.checked
                    }
                }
            },

            series: [{
                data,
                mapData,
                joinBy: ['hc-key', 'key'],
                name: initialMapName,
                dataLabels: {
                    formatter: function () {
                        return this.point.properties && this.point.properties[
                            'hc-a2'];
                    }
                },
                custom: {
                    mapName: initialMapName,
                    mapKey: initialMapKey
                }
            }],

            title: {
                text: null
            },

            responsive: {
                rules: [{
                    condition: {
                        callback() {
                            return document.body.offsetWidth < 753;
                        }
                    },
                    chartOptions: {
                        colorAxis: {
                            layout: 'horizontal'
                        },
                        legend: {
                            align: 'center'
                        },
                        mapNavigation: {
                            buttonOptions: {
                                verticalAlign: 'bottom'
                            }
                        }
                    }
                }]
            }
        });

        async function updateChart(mapName) {
            const mapKey = allMaps[mapName].slice(0, -3);

            // Show loading
            chart.showLoading('<i class="fa fa-spinner fa-spin fa-2x"></i>');

            fillInfo(mapName, mapKey);

            const mapData = await fetch(`${baseMapPath}${mapKey}.topo.json`)
                .then(response => response.json())
                .catch(e => {});

            if (!mapData) {
                chart.showLoading('<i class="fa fa-frown"></i> Map not found');
                return;
            }

            // Data labels formatter. Use shorthand codes for world and US
            const formatter = function () {
                return (
                    mapKey === 'custom/world' ||
                    mapKey === 'countries/us/us-all'
                ) ?
                    (this.point.properties && this.point.properties['hc-a2']) :
                    this.point.name;
            };

            
            /** Load data from Josn file */
            var data;
            await fetch('/data/map/world.json')
            .then(res => res.json())
            .then(output => {
                data = output;
            });
            
            chart.series[0].update({
                mapData,
                data,
                name: mapName,
                dataLabels: {
                    formatter
                },
                custom: {
                    mapName,
                    mapKey
                }
            });
            chart.hideLoading();
            chart.credits.update();
        }

        // Change map on input change
        input.addEventListener('input', async function () {
            if (allMaps[this.value]) {
                prevMapButton.style.opacity = 1;
                nextMapButton.style.opacity = 1;
                const pointOnCurrentMap =
                    chart.series[0].points.find(point => point.name === this.value);

                if (pointOnCurrentMap) {
                    pointOnCurrentMap.doDrilldown();
                } else {
                    resetDrilldown(chart);
                    updateChart(this.value);
                }
            }
        });

        // Toggle data labels
        dataLabelsCheckbox.addEventListener('click', function () {
            chart.update({
                plotOptions: {
                    map: {
                        dataLabels: {
                            enabled: this.checked
                        }
                    }
                }
            });
        });

        // Switch to previous map on button click
        prevMapButton.addEventListener('click', function () {
            const desiredIndex = Object.keys(allMaps).indexOf(input.value) - 1,
                [mapName] = Object.entries(allMaps)[
                    desiredIndex < 0 ?
                        Object.keys(allMaps).length - 1 :
                        desiredIndex
                ];
            resetDrilldown(chart);
            updateChart(mapName);
            input.value = mapName;
        });

        // Switch to next map on button click
        nextMapButton.addEventListener('click', function () {
            const desiredIndex = Object.keys(allMaps).indexOf(input.value) + 1,
                [mapName] = Object.entries(allMaps)[
                    desiredIndex > Object.keys(allMaps).length - 1 ?
                        0 :
                        desiredIndex
                ];
            resetDrilldown(chart);
            updateChart(mapName);
            input.value = mapName;
        });
    })();

})();