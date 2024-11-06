/**
 * @Package: Medians  Dashboard
 * @Version: 1.0.0
 */

jQuery(function ($) {

    'use strict';

    var MediansSettings = window.MediansSettings || {};

    /*--------------------------------
        Vis Timeline
     --------------------------------*/
    MediansSettings.timeline = function () {

        if ($("#visualization").length) {
            var container = document.getElementById('visualization');

            // Create a DataSet (allows two way data-binding)
            var items = new vis.DataSet([
                
                {id: 1, content: '<img src="/data/profile/avatar-1.png" /> Footer change color', start: '2024-11-21'},
                {id: 2, content: '<img src="/data/profile/avatar-5.png" /> Clean old files', start: '2024-11-09'},
                {id: 3, content: '<img src="/data/profile/avatar-3.png" /> Add dark theme', start: '2024-11-09'},
                {id: 4, content: '<img src="/data/profile/avatar-4.png" /> Handle Repository', start: '2024-11-10', end: '2024-11-18'},
                {id: 5, content: '<img src="/data/profile/avatar-5.png" /> Clean old files', start: '2024-11-20'},
                {id: 6, content: '<img src="/data/profile/avatar-2.png" /> Develop caching algorithm', start: '2024-11-02'},
                {id: 7, content: '<img src="/data/profile/avatar-1.png" /> Footer change color', start: '2024-11-03'},
                {id: 8, content: '<img src="/data/profile/avatar-2.png" /> Fix Sideabr Issue', start: '2024-11-04'},
                {id: 9, content: '<img src="/data/profile/avatar-3.png" /> Add dark theme', start: '2024-11-05'},
                {id: 10, content: '<img src="/data/profile/avatar-5.png" /> Clean old files', start: '2024-11-16'},
                {id: 11, content: '<img src="/data/profile/avatar-2.png" /> Develop caching algorithm', start: '2024-11-17'},
                {id: 12, content: '<img src="/data/profile/avatar-2.png" /> Fix Sideabr Issue', start: '2024-11-14'}
            ]);

            // Configuration for the Timeline
            var options = {};

            // Create a Timeline
            var timeline = new vis.Timeline(container, items, options);
        }

    };






    /******************************
     initialize respective scripts 
     *****************************/
    $(document).ready(function () {
    });

    $(window).resize(function () {
    });

    $(window).load(function () {
        MediansSettings.timeline();
    });

});