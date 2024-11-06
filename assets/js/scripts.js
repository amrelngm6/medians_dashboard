

jQuery(function($) {

    'use strict';

    var MediansSettings = window.MediansSettings || {};

    /*--------------------------------
         Window Based Layout
     --------------------------------*/
    MediansSettings.windowBasedLayout = function() {
        var width = window.innerWidth;
        //console.log(width);

        if (jQuery("body").hasClass("chat-open") || jQuery("body").hasClass("sidebar-collapse")) {

            MediansSettings.mainmenuCollapsed();

        } else if (width < 767) {

            // small window
            jQuery(".page-topbar").addClass("sidebar_shift").removeClass("chat_shift");
            jQuery(".page-sidebar").addClass("collapseit").removeClass("expandit");
            jQuery("#main-content").addClass("sidebar_shift").removeClass("chat_shift");
            jQuery(".page-chatapi").removeClass("showit").addClass("hideit");
            jQuery(".chatapi-windows").removeClass("showit").addClass("hideit");
            MediansSettings.mainmenuCollapsed();

        } else {

            // large window
            jQuery(".page-topbar").removeClass("sidebar_shift chat_shift");
            jQuery(".page-sidebar").removeClass("collapseit chat_shift");
            jQuery("#main-content").removeClass("sidebar_shift chat_shift");
            MediansSettings.mainmenuScroll();
        }

    }

    /*--------------------------------
         Window Based Layout
     --------------------------------*/
    MediansSettings.onLoadTopBar = function() {

        jQuery(".page-topbar .message-toggle-wrapper").addClass("showopacity");
        jQuery(".page-topbar .notify-toggle-wrapper").addClass("showopacity");
        jQuery(".page-topbar .searchform").addClass("showopacity");
        jQuery(".page-topbar li.profile").addClass("showopacity");
    }

    /*--------------------------------
        Modals
     --------------------------------*/
     MediansSettings.modals = function() {

        jQuery(document).on('click', '.open-modal', function() {
            jQuery(jQuery(this).data('modal')).removeClass('fade').addClass('show')
        });

        jQuery(document).on('click', '.close-modal', function() {
            jQuery(jQuery(this).data('modal')).removeClass('show').addClass('fade')
        });
    }
    /*--------------------------------
         CHAT API
     --------------------------------*/
    MediansSettings.chatAPI = function() {

        jQuery('.toggle_chat').on('click', function() {

            var chatarea = jQuery(".page-chatapi");
            var chatwindow = jQuery(".chatapi-windows");
            var topbar = jQuery(".page-topbar");
            var mainarea = jQuery("#main-content");
            var menuarea = jQuery(".page-sidebar");

            if (chatarea.hasClass("hideit")) {
                chatarea.addClass("showit").removeClass("hideit");
                chatwindow.addClass("showit").removeClass("hideit");
                topbar.addClass("chat_shift");
                mainarea.addClass("chat_shift");
                menuarea.addClass("chat_shift");
                MediansSettings.mainmenuCollapsed();
            } else {
                chatarea.addClass("hideit").removeClass("showit");
                chatwindow.addClass("hideit").removeClass("showit");
                topbar.removeClass("chat_shift");
                mainarea.removeClass("chat_shift");
                menuarea.removeClass("chat_shift");
                //MediansSettings.mainmenuScroll();
                MediansSettings.windowBasedLayout();
            }
        });

        jQuery(document).on('click', '.page-topbar .sidebar_toggle', function() {
            var chatarea = jQuery(".page-chatapi");
            var chatwindow = jQuery(".chatapi-windows");
            var topbar = jQuery(".page-topbar");
            var mainarea = jQuery("#main-content");
            var menuarea = jQuery(".page-sidebar");

            if (menuarea.hasClass("collapseit") || menuarea.hasClass("chat_shift")) {
                menuarea.addClass("expandit").removeClass("collapseit").removeClass("chat_shift");
                topbar.removeClass("sidebar_shift").removeClass("chat_shift");
                mainarea.removeClass("sidebar_shift").removeClass("chat_shift");
                chatarea.addClass("hideit").removeClass("showit");
                chatwindow.addClass("hideit").removeClass("showit");
                MediansSettings.mainmenuScroll();
            } else {
                menuarea.addClass("collapseit").removeClass("expandit").removeClass("chat_shift");
                topbar.addClass("sidebar_shift").removeClass("chat_shift");
                mainarea.addClass("sidebar_shift").removeClass("chat_shift");
                MediansSettings.mainmenuCollapsed();
            }
        });

    };

    /*--------------------------------
         CHAT API Scroll
     --------------------------------*/
    MediansSettings.chatApiScroll = function() {

        var topsearch = jQuery(".page-chatapi .search-bar").height();
        var height = window.innerHeight - topsearch;
        jQuery('.chat-wrapper').height(height).perfectScrollbar({
            suppressScrollX: true
        });
    };

    /*--------------------------------
         CHAT API window
     --------------------------------*/
    MediansSettings.chatApiWindow = function() {


        jQuery('.msg-user').on('click', function() {
            jQuery(".page-chatapi").removeClass("hideit").addClass("showit");
            jQuery(".chatapi-windows").removeClass("hideit").addClass("showit");

            var name = jQuery(this).attr("data-name");
            var img = jQuery(this).attr("data-img");
            var id = jQuery(this).attr("data-user-id");
            var status = 'available';

            if (jQuery(".chatapi-windows #user-window" + id).length) {

                jQuery(".chatapi-windows #user-window" + id).removeClass("minimizeit").show();

            } else {
                var msg = chatformat_msg('I am really interested in buying bitcoin and other Cryptocurrency', 'receive', name);
                msg += chatformat_msg('Yes! Thanks for contacting me ;)', 'sent', 'You');
                var html = "<div class='user-window' id='user-window" + id + "' data-user-id='" + id + "'>";
                html += "<div class='controlbar'><img src='" + img + "' data-user-id='" + id + "' rel='tooltip' data-animate='animated fadeIn' data-toggle='tooltip' data-original-title='" + name + "' data-placement='top' data-color-class='primary'><span class='status " + status + "'><i class='fa fa-circle'></i></span><span class='name'>" + name + "</span><span class='opts'><i class='fa fa-times closeit' data-user-id='" + id + "'></i><i class='fa fa-minus minimizeit' data-user-id='" + id + "'></i></span></div>";
                html += "<div class='chatarea'>" + msg + "</div>";
                html += "<div class='typearea'><input type='text' data-user-id='" + id + "' placeholder='Type & Enter' class='form-control'></div>";
                html += "</div>";
                jQuery(".chatapi-windows").append(html);
            }
        });

        jQuery('.page-chatapi .user-row').on('click', function() {

            var name = jQuery(this).find(".user-info h4 a").html();
            var img = jQuery(this).find(".user-img a img").attr("src");
            var id = jQuery(this).attr("data-user-id");
            var status = jQuery(this).find(".user-info .status").attr("data-status");

            if (jQuery(this).hasClass("active")) {
                jQuery(this).toggleClass("active");

                jQuery(".chatapi-windows #user-window" + id).hide();

            } else {
                jQuery(this).toggleClass("active");

                if (jQuery(".chatapi-windows #user-window" + id).length) {

                    jQuery(".chatapi-windows #user-window" + id).removeClass("minimizeit").show();

                } else {
                    var msg = chatformat_msg('I am really interested in buying bitcoin and other Cryptocurrency', 'receive', name);
                    msg += chatformat_msg('Yes! Thanks for contacting me ;)', 'sent', 'You');
                    var html = "<div class='user-window' id='user-window" + id + "' data-user-id='" + id + "'>";
                    html += "<div class='controlbar'><img src='" + img + "' data-user-id='" + id + "' rel='tooltip' data-animate='animated fadeIn' data-toggle='tooltip' data-original-title='" + name + "' data-placement='top' data-color-class='primary'><span class='status " + status + "'><i class='fa fa-circle'></i></span><span class='name'>" + name + "</span><span class='opts'><i class='fa fa-times closeit' data-user-id='" + id + "'></i><i class='fa fa-minus minimizeit' data-user-id='" + id + "'></i></span></div>";
                    html += "<div class='chatarea'>" + msg + "</div>";
                    html += "<div class='typearea'><input type='text' data-user-id='" + id + "' placeholder='Type & Enter' class='form-control'></div>";
                    html += "</div>";
                    jQuery(".chatapi-windows").append(html);
                }
            }

        });

        jQuery(document).on('click', ".chatapi-windows .user-window .controlbar .closeit", function(e) {
            var id = jQuery(this).attr("data-user-id");
            jQuery(".chatapi-windows #user-window" + id).hide();
            jQuery(".page-chatapi .user-row#chat_user_" + id).removeClass("active");
        });

        jQuery(document).on('click', ".chatapi-windows .user-window .controlbar img, .chatapi-windows .user-window .controlbar .minimizeit", function(e) {
            var id = jQuery(this).attr("data-user-id");

            if (!jQuery(".chatapi-windows #user-window" + id).hasClass("minimizeit")) {
                jQuery(".chatapi-windows #user-window" + id).addClass("minimizeit");
                MediansSettings.tooltipsPopovers();
            } else {
                jQuery(".chatapi-windows #user-window" + id).removeClass("minimizeit");
            }

        });

        jQuery(document).on('keypress', ".chatapi-windows .user-window .typearea input", function(e) {
            if (e.keyCode == 13) {
                var id = jQuery(this).attr("data-user-id");
                var msg = jQuery(this).val();
                msg = chatformat_msg(msg, 'sent', 'You');
                jQuery(".chatapi-windows #user-window" + id + " .chatarea").append(msg);
                jQuery(this).val("");
                jQuery(this).focus();
            }
            jQuery(".chatapi-windows #user-window" + id + " .chatarea").perfectScrollbar({
                suppressScrollX: true
            });
        });

    };

    function chatformat_msg(msg, type, name) {
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        return "<div class='chatmsg msg_" + type + "'><span class='name'>" + name + "</span><span class='text'>" + msg + "</span><span class='ts'>" + h + ":" + m + "</span></div>";
    }

    /*--------------------------------
         Login Page
     --------------------------------*/
    MediansSettings.loginPage = function() {

        var height = window.innerHeight;
        var formheight = jQuery("#login").height();
        var newheight = (height - formheight) / 2;
        //console.log(height+" - "+ formheight + " / "+ newheight);
        jQuery('#login').css('margin-top', +newheight + 'px');

        if (jQuery('#login #user_login').length) {
            var d = document.getElementById('user_login');
            d.focus();
        }

    };


    
    /*--------------------------------
        Viewport Checker
     --------------------------------*/
    MediansSettings.viewportElement = function() {

        if ($.isFunction($.fn.viewportChecker)) {

            jQuery('.inviewport').viewportChecker({
                callbackFunction: function(elem, action) {
                    //setTimeout(function(){
                    //elem.html((action == "add") ? 'Callback with 500ms timeout: added class' : 'Callback with 500ms timeout: removed class');
                    //},500);
                }
            });

            jQuery('.number_counter').viewportChecker({
                classToAdd: 'start_timer',
                offset: 10,
                callbackFunction: function(elem) {
                    jQuery('.start_timer:not(.counted)').each(count);
                    //jQuery(elem).removeClass('number_counter');
                }
            });

        }

        // start count
        function count(options) {
            var $this = jQuery(this);
            options = $.extend({}, options || {}, $this.data('countToOptions') || {});
            $this.countTo(options).addClass("counted");
        }
    };

    /*--------------------------------
        Sortable / Draggable Panels
     --------------------------------*/
    MediansSettings.draggablePanels = function() {

        if ($.isFunction($.fn.sortable)) {
            jQuery(".sort_container").sortable({
                connectWith: ".sort_container",
                handle: "div.sort_item",
                cancel: ".panel_actions",
                placeholder: "portlet-placeholder"
            });
        }
    };

    /*--------------------------------
         Breadcrumb autoHidden
     --------------------------------*/
    MediansSettings.breadcrumbAutoHidden = function() {

        jQuery('.breadcrumb.auto-hidden a').on('mouseover', function() {
            jQuery(this).removeClass("collapsed");
        });
        jQuery('.breadcrumb.auto-hidden a').on('mouseout', function() {
            jQuery(this).addClass("collapsed");
        });

    };

    /*--------------------------------
         Section Box Actions
     --------------------------------*/
    MediansSettings.sectionBoxActions = function() {

        jQuery('section.box .actions .box_toggle').on('click', function() {

            var content = jQuery(this).parent().parent().parent().find(".content-body");
            if (content.hasClass("collapsed")) {
                content.removeClass("collapsed").slideDown(500);
                jQuery(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
            } else {
                content.addClass("collapsed").slideUp(500);
                jQuery(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
            }

        });

        jQuery('section.box .actions .box_close').on('click', function() {
            content = jQuery(this).parent().parent().parent().remove();
        });

    };

    /*--------------------------------
         Main Menu Scroll
     --------------------------------*/
    MediansSettings.mainmenuScroll = function() {

        //console.log("expand scroll menu");

        var topbar = jQuery(".page-topbar").height();
        var projectinfo = jQuery(".project-info").innerHeight();

        var height = window.innerHeight - topbar - projectinfo;

        jQuery('.fixedscroll #main-menu-wrapper').height(height).perfectScrollbar({
            suppressScrollX: true
        });
        jQuery("#main-menu-wrapper .wraplist").height('auto');

        /*show first sub menu of open menu item only - opened after closed*/
        // > in the selector is used to select only immediate elements and not the inner nested elements.
        jQuery("li.open > .sub-menu").attr("style", "display:block;");

    };

    /*--------------------------------
         Collapsed Main Menu
     --------------------------------*/
    MediansSettings.mainmenuCollapsed = function() {

        if (jQuery(".page-sidebar.chat_shift #main-menu-wrapper").length > 0 || jQuery(".page-sidebar.collapseit #main-menu-wrapper").length > 0) {
            //console.log("collapse menu");
            var topbar = jQuery(".page-topbar").height();
            var windowheight = window.innerHeight;
            var minheight = windowheight - topbar;
            var fullheight = jQuery(".page-container #main-content .wrapper").height();

            var height = fullheight;

            if (fullheight < minheight) {
                height = minheight;
            }

            jQuery('.fixedscroll #main-menu-wrapper').perfectScrollbar('destroy');

            jQuery('.page-sidebar.chat_shift #main-menu-wrapper .wraplist, .page-sidebar.collapseit #main-menu-wrapper .wraplist').height(height);

            /*hide sub menu of open menu item*/
            jQuery("li.open .sub-menu").attr("style", "");

        }

    };

    /*--------------------------------
         Main Menu
     --------------------------------*/
    MediansSettings.mainMenu = function() {
        jQuery('#main-menu-wrapper li a').on('click', function(e) {

            if (jQuery(this).next().hasClass('sub-menu') === false) {
                return;
            }

            var parent = jQuery(this).parent().parent();
            var sub = jQuery(this).next();

            parent.children('li.open').children('.sub-menu').slideUp(200);
            parent.children('li.open').children('a').children('.arrow').removeClass('open');
            parent.children('li').removeClass('open');

            if (sub.is(":visible")) {
                jQuery(this).find(".arrow").removeClass("open");
                sub.slideUp(200);
            } else {
                jQuery(this).parent().addClass("open");
                jQuery(this).find(".arrow").addClass("open");
                sub.slideDown(200);
            }

        });

        jQuery('a[href="'+window.location.pathname+'"]').addClass('active')
        jQuery('a[href="'+window.location.pathname+'"]').parent('li').addClass('open')
        jQuery('a[href="'+window.location.pathname+'"]').parent('li').parent('.sub-menu').show()
        jQuery('a[href="'+window.location.pathname+'"]').parent('li').parent('.sub-menu').parent().addClass('open')

        jQuery("body").on('click', function(e) {
            jQuery(".page-sidebar.collapseit .wraplist li.open .sub-menu").attr("style", "");
            jQuery(".page-sidebar.collapseit .wraplist li.open").removeClass("open");
            jQuery(".page-sidebar.chat_shift .wraplist li.open .sub-menu").attr("style", "");
            jQuery(".page-sidebar.chat_shift .wraplist li.open").removeClass("open");
        });

        jQuery(document).on('click', '.accordion-button', function(){
            jQuery(jQuery(this).data('target')).toggleClass('show')
            jQuery(this).toggleClass('collapsed')
        });
    };

    /*--------------------------------
         Mailbox
     --------------------------------*/
    MediansSettings.mailboxInbox = function() {

        jQuery('.mail_list table .star i').on('click', function(e) {
            jQuery(this).toggleClass("fa-star fa-star-o");
        });

        jQuery('.mail_list .open-view').on('click', function(e) {
            window.location = 'mail-view.html';
        });

        jQuery('.mail_view_info .labels .cc').on('click', function(e) {
            var ele = jQuery(".mail_compose_cc");
            if (ele.is(":visible")) {
                ele.hide();
            } else {
                ele.show();
            }
        });

        jQuery('.mail_view_info .labels .bcc').on('click', function(e) {
            var ele = jQuery(".mail_compose_bcc");
            if (ele.is(":visible")) {
                ele.hide();
            } else {
                ele.show();
            }
        });

    };

    /*--------------------------------
         Top Bar
     --------------------------------*/
    MediansSettings.pageTopBar = function() {
        jQuery('.page-topbar li.searchform .input-group-addon').on('click', function(e) {
            jQuery(this).parent().parent().parent().toggleClass("focus");
            jQuery(this).parent().parent().find("input").focus();
        });

        jQuery('.page-topbar li .dropdown-menu .list').perfectScrollbar({
            suppressScrollX: true
        });

    };

    /*--------------------------------
         Extra form settings
     --------------------------------*/
    MediansSettings.extraFormSettings = function() {

        // transparent input group focus/blur
        jQuery('.input-group .form-control').focus(function(e) {
            jQuery(this).parent().find(".input-group-addon").addClass("input-focus");
            jQuery(this).parent().find(".input-group-btn").addClass("input-focus");
        });

        jQuery('.input-group .form-control').blur(function(e) {
            jQuery(this).parent().find(".input-group-addon").removeClass("input-focus");
            jQuery(this).parent().find(".input-group-btn").removeClass("input-focus");
        });

    };

    /*--------------------------------
         js tree
     --------------------------------*/
    MediansSettings.jsTreeINIT = function() {

        if ($.isFunction($.fn.jstree)) {
            jQuery(function() {
                var to = false;
                jQuery('#treedata_q').keyup(function() {
                    if (to) {
                        clearTimeout(to);
                    }
                    to = setTimeout(function() {
                        var v = jQuery('#treedata_q').val();
                        jQuery('#jstree_treedata').jstree(true).search(v);
                    }, 250);
                });

                jQuery('#jstree_treedata')
                    .jstree({
                        "core": {
                            "animation": 0,
                            "check_callback": true,
                            "themes": {
                                "stripes": true
                            },
                            'data': {
                                'url': function(node) {
                                    return node.id === '#' ? 'data/ajax_demo_roots_jstree.json' : 'data/ajax_demo_children_jstree.json';
                                },
                                'data': function(node) {
                                    return {
                                        'id': node.id
                                    };
                                }
                            }
                        },
                        "types": {
                            "#": {
                                "max_children": 1,
                                "max_depth": 4,
                                "valid_children": ["root"]
                            },
                            "root": {
                                "icon": "assets/plugins/jstree/images/tree_icon.png",
                                "valid_children": ["default"]
                            },
                            "default": {
                                "valid_children": ["default", "file"]
                            },
                            "file": {
                                "icon": "fa fa-file",
                                "valid_children": []
                            }
                        },
                        "checkbox": {
                            "keep_selected_style": false
                        },
                        "plugins": ["checkbox", "contextmenu", "dnd", "search", "sort", "state", "types", "unique", "wholerow"]
                    });
            });

        }
    };

    /*--------------------------------
         Vector maps
     --------------------------------*/
    MediansSettings.jvectorMaps = function() {

        if ($.isFunction($.fn.vectorMap)) {

            if (jQuery("#world-map-markers").length) {
                //@code_start
                jQuery(function() {
                    jQuery('#world-map-markers').vectorMap({
                        map: 'world_mill_en',
                        scaleColors: ['#e77512', '#e77512'],
                        normalizeFunction: 'polynomial',
                        hoverOpacity: 0.7,
                        hoverColor: false,
                        regionsSelectable: true,
                        markersSelectable: true,
                        markersSelectableOne: true,

                        onRegionOver: function(event, code) {
                            //console.log('region-over', code);
                        },
                        onRegionOut: function(event, code) {
                            //console.log('region-out', code);
                        },
                        onRegionClick: function(event, code) {
                            //console.log('region-click', code);
                        },
                        onRegionSelected: function(event, code, isSelected, selectedRegions) {
                            //console.log('region-select', code, isSelected, selectedRegions);
                            if (window.localStorage) {
                                window.localStorage.setItem(
                                    'jvectormap-selected-regions',
                                    JSON.stringify(selectedRegions)
                                );
                            }
                        },

                        panOnDrag: true,

                        focusOn: {
                            x: 1.5,
                            y: 1.5,
                            scale: 1,
                            animate: true
                        },

                        regionStyle: {
                            initial: {
                                fill: '#cccccc',
                                'fill-opacity': 1,
                                stroke: 'none',
                                'stroke-width': 0,
                                'stroke-opacity': 1
                            },
                            hover: {
                                fill: '#E91E63',
                                'fill-opacity': 1,
                                cursor: 'pointer'
                            },
                            selected: {
                                fill: '#E91E63'
                            },
                            selectedHover: {}
                        },

                        markerStyle: {
                            initial: {
                                fill: '#673AB7',
                                stroke: '#ffffff',
                                "stroke-width": 2,
                                r: 10
                            },
                            hover: {
                                stroke: '#FFC107',
                                "stroke-width": 2,
                                cursor: 'pointer'
                            },
                            selected: {
                                fill: '#FFC107',
                                "stroke-width": 0,
                            },
                        },
                        backgroundColor: '#ffffff',
                        markers: [{
                            latLng: [41.90, 12.45],
                            name: 'Vatican City'
                        }, {
                            latLng: [43.73, 7.41],
                            name: 'Monaco'
                        }, {
                            latLng: [-0.52, 166.93],
                            name: 'Nauru'
                        }, {
                            latLng: [37.77, -122.41],
                            name: 'San Francisco'
                        }, {
                            latLng: [43.93, 12.46],
                            name: 'San Marino'
                        }, {
                            latLng: [47.14, 9.52],
                            name: 'Liechtenstein'
                        }, {
                            latLng: [7.11, 171.06],
                            name: 'Marshall Islands'
                        }, {
                            latLng: [17.3, -62.73],
                            name: 'Saint Kitts and Nevis'
                        }, {
                            latLng: [3.2, 73.22],
                            name: 'Maldives'
                        }, {
                            latLng: [35.88, 14.5],
                            name: 'Malta'
                        }, {
                            latLng: [12.05, -61.75],
                            name: 'Grenada'
                        }, {
                            latLng: [13.16, -61.23],
                            name: 'Saint Vincent and the Grenadines'
                        }, {
                            latLng: [13.16, -59.55],
                            name: 'Barbados'
                        }, {
                            latLng: [17.11, -61.85],
                            name: 'Antigua and Barbuda'
                        }, {
                            latLng: [-4.61, 55.45],
                            name: 'Seychelles'
                        }, {
                            latLng: [7.35, 134.46],
                            name: 'Palau'
                        }, {
                            latLng: [42.5, 1.51],
                            name: 'Andorra'
                        }, {
                            latLng: [14.01, -60.98],
                            name: 'Saint Lucia'
                        }, {
                            latLng: [6.91, 158.18],
                            name: 'Federated States of Micronesia'
                        }, {
                            latLng: [1.3, 103.8],
                            name: 'Singapore'
                        }, {
                            latLng: [1.46, 173.03],
                            name: 'Kiribati'
                        }, {
                            latLng: [-21.13, -175.2],
                            name: 'Tonga'
                        }, {
                            latLng: [15.3, -61.38],
                            name: 'Dominica'
                        }, {
                            latLng: [-20.2, 57.5],
                            name: 'Mauritius'
                        }, {
                            latLng: [26.02, 50.55],
                            name: 'Bahrain'
                        }, {
                            latLng: [0.33, 6.73],
                            name: 'São Tomé and Príncipe'
                        }]
                    });
                });
                //@code_end
            }

            var mapid = "";
            mapid = jQuery('#europe_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'europe_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 1,
                        animate: true
                    },
                });
            } // Europe 
            mapid = jQuery('#in_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'in_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // India
            mapid = jQuery('#us_aea_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'us_aea_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // USA
            mapid = jQuery('#pt_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'pt_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Portugal
            mapid = jQuery('#cn_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'cn_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // China
            mapid = jQuery('#nz_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'nz_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // New Zealand
            mapid = jQuery('#no_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'no_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Norway
            mapid = jQuery('#es_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'es_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Spain
            mapid = jQuery('#au_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'au_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Australia
            mapid = jQuery('#fr_regions_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'fr_regions_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // France - Regions
            mapid = jQuery('#th_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'th_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Thailand
            mapid = jQuery('#co_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'co_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Colombia
            mapid = jQuery('#be_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'be_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Belgium
            mapid = jQuery('#ar_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'ar_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Argentina
            mapid = jQuery('#ve_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 've_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Venezuela
            mapid = jQuery('#it_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'it_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Italy
            mapid = jQuery('#dk_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'dk_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Denmark
            mapid = jQuery('#at_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'at_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Austria
            mapid = jQuery('#ca_lcc_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'ca_lcc_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Canada
            mapid = jQuery('#nl_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'nl_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Netherlands
            mapid = jQuery('#se_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'se_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Sweden
            mapid = jQuery('#pl_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'pl_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Poland
            mapid = jQuery('#de_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'de_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Germany
            mapid = jQuery('#fr_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'fr_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // France - Departments
            mapid = jQuery('#za_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'za_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // South Africa
            mapid = jQuery('#ch_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'ch_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Switzerland
            mapid = jQuery('#us-ny-newyork_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'us-ny-newyork_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // New York City
            mapid = jQuery('#us-il-chicago_mill_en-map');
            if (mapid.length) {
                mapid.vectorMap({
                    map: 'us-il-chicago_mill_en',
                    regionsSelectable: true,
                    backgroundColor: '#e77512',
                    regionStyle: {
                        initial: {
                            fill: 'white',
                            stroke: 'none',
                        },
                        hover: {
                            fill: '#E91E63',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#E91E63'
                        }
                    },
                    focusOn: {
                        x: 0,
                        y: 0,
                        scale: 5,
                        animate: true
                    },
                });
            } // Chicago

        }

    };


    /*--------------------------------
         DataTables
     --------------------------------*/
    MediansSettings.dataTablesInit = function() {

        if (jQuery('.datatable').length)
        {
            jQuery("table.datatable").dataTable({
                responsive: true,
                aLengthMenu: [
                    [10, 25, 50, 100, -1],
                    [10, 25, 50, 100, "All"]
                ]
            });
        }

    };


    /*--------------------------------
         Pretty Photo
     --------------------------------*/
    MediansSettings.loadPrettyPhoto = function() {

        if ($.isFunction($.fn.prettyPhoto)) {
            //Pretty Photo
            jQuery("a[rel^='prettyPhoto']").prettyPhoto({
                social_tools: false
            });
        }
    };

    /*--------------------------------
         Gallery
     --------------------------------*/
    MediansSettings.isotopeGallery = function() {
        if ($.isFunction($.fn.isotope)) {

            var $portfolio_selectors = jQuery('.portfolio-filter >li>a');
            var $portfolio = jQuery('.portfolio-items');
            $portfolio.isotope({
                itemSelector: '.portfolio-item',
                layoutMode: 'sloppyMasonry'
            });

            $portfolio_selectors.on('click', function() {
                $portfolio_selectors.removeClass('active');
                jQuery(this).addClass('active');
                var selector = jQuery(this).attr('data-filter');
                $portfolio.isotope({
                    filter: selector
                });
                return false;
            });

        }
    };

    /*--------------------------------
         Tocify
     --------------------------------*/
    MediansSettings.tocifyScrollMenu = function() {
        if ($.isFunction($.fn.tocify)) {
            var toc = jQuery("#toc").tocify({
                selectors: "h2,h3,h4,h5",
                context: ".tocify-content",
                extendPage: false
            }).data("toc-tocify");
        }
    };

    /*--------------------------------
         Full Calendar
     --------------------------------*/
    MediansSettings.uiCalendar = function() {
        $(function () {

            if (jQuery('#day-calendar').length) {
                
                    var calendar;
        
                    var date = new Date();
                    var d = date.getDate();
                    var m = date.getMonth();
                    var y = date.getFullYear();
                    
                    addEventListener('load', e => {
                        if (+document.querySelector('option').getBoundingClientRect().width)
                            document.body.style.setProperty('--list', 'none')
                    })
        
                    /* 2. update the --val custom property on dragging slider thumb */
                    addEventListener('input', e => {
                        let _t = e.target;
                        _t.parentNode.style.setProperty('--val', +_t.value)
                    })
        
                    const calendarEl = document.getElementById('day-calendar');
        
                    calendar = new FullCalendar.Calendar(calendarEl, {
                        initialView: 'timeGridDay',
                        slotDuration: '00:30:00', // Time slots every 30 minutes
                        allDaySlot: false, // Disable all-day slot
                        editable: true,
                        selectable: true,
                        droppable: true,
                        nowIndicator: true,
                        color: '#333',
        
                        events: [{
                            title: 'All Day Event',
                            start: new Date(y, m, 1)
                        }, {
                            title: 'Long Event',
                            start: new Date(y, m, d - 5),
                            end: new Date(y, m, d - 2)
                        }, {
                            id: 999,
                            title: 'Repeating Event',
                            start: new Date(y, m, d - 3, 16, 0),
                            allDay: false
                        }, {
                            id: 999,
                            title: 'Repeating Event',
                            start: new Date(y, m, d + 4, 16, 0),
                            allDay: false
                        }, {
                            title: 'Meeting',
                            start: new Date(y, m, d, 10, 30),
                            allDay: false
                        }, {
                            title: 'Lunch',
                            start: new Date(y, m, d, 12, 0),
                            end: new Date(y, m, d, 14, 0),
                            allDay: false
                        }, {
                            title: 'Conference',
                            start: new Date(y, m, d + 1, 19, 0),
                            end: new Date(y, m, d + 1, 22, 30),
                            allDay: false
                        }, {
                            title: 'Staff Meeting',
                            start: new Date(y, m, 28),
                            end: new Date(y, m, 29),
                            url: 'http://google.com/'
                        }],
        
                        select: function (info) {
                            jQuery('#calendar-modal').addClass('show opacity-100')
                        },
        
                    });
        
                    calendar.render();
        
                    function updateSlotDuration(newDuration, calendar) {
                        if (newDuration < 1) {
                            newDuration = 1
                        }
        
                        // Convert the slider value to the appropriate format for slotDuration (HH:mm:ss)
                        var slotDuration = '00:' + (newDuration.length === 1 ? '0' : '') + newDuration + ':00';
        
                        // Reconfigure the calendar with the new slotDuration
                        calendar.setOption('slotDuration', slotDuration);
        
                    }
        
                    addEventListener('load', e => {
                        if (+document.querySelector('option').getBoundingClientRect().width) {
                            document.body.style.setProperty('--list', 'none')
                        }
                    })
        
                    /* 2. update the --val custom property on dragging slider thumb */
                    jQuery(document).on('input', 'input[type=range]', function (e) {
                        let _t = e.target;
                        if (_t.value < 1) {
                            _t.value = 1
                        }
                        _t.parentNode.style.setProperty('--val', +_t.value)
                        updateSlotDuration(_t.value, calendar)
                        calendar.scrollToTime("22:02:00");
        
                    })
                    calendar.scrollToTime("22:02:00");
    
            }


            if (jQuery('#main-calendar').length) {

                /* initialize the calendar
                -----------------------------------------------------------------*/
                var calendar;
    
                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();
    
                addEventListener('load', e => {
                    if (+document.querySelector('option').getBoundingClientRect().width)
                        document.body.style.setProperty('--list', 'none')
                })
    
                /* 2. update the --val custom property on dragging slider thumb */
                addEventListener('input', e => {
                    let _t = e.target;
                    _t.parentNode.style.setProperty('--val', +_t.value)
                })
    
                const calendarEl = document.getElementById('main-calendar');
    
                calendar = new FullCalendar.Calendar(calendarEl, {
                    
                    header: {
                        left: 'title',
                        right: 'month,basicWeek,basicDay prev,next'
                    },
                    allDaySlot: true, // Disable all-day slot
                    editable: true,
                    selectable: true,
                    droppable: true,
                    nowIndicator: true,
                    color: '#333',
    
                    events: [{
                        title: 'All Day Event',
                        start: new Date(y, m, 1)
                    }, {
                        title: 'Long Event',
                        start: new Date(y, m, d - 5),
                        end: new Date(y, m, d - 2)
                    }, {
                        id: 999,
                        title: 'Repeating Event',
                        start: new Date(y, m, d - 3, 16, 0),
                        allDay: false
                    }, {
                        id: 999,
                        title: 'Repeating Event',
                        start: new Date(y, m, d + 4, 16, 0),
                        allDay: false
                    }, {
                        title: 'Meeting',
                        start: new Date(y, m, d, 10, 30),
                        allDay: false
                    }, {
                        title: 'Lunch',
                        start: new Date(y, m, d, 12, 0),
                        end: new Date(y, m, d, 14, 0),
                        allDay: false
                    }, {
                        title: 'Conference',
                        start: new Date(y, m, d + 1, 19, 0),
                        end: new Date(y, m, d + 1, 22, 30),
                        allDay: false
                    }, {
                        title: 'Staff Meeting',
                        start: new Date(y, m, 28),
                        end: new Date(y, m, 29),
                        url: 'http://google.com/'
                    }],
    
                    eventClick: function (info) {
                        jQuery('#calendar-modal').addClass('show opacity-100')
                    },
    
                    select: function (info) {
                        jQuery('#calendar-modal').addClass('show opacity-100')
                    },
    
                });
    
                calendar.render();
            }

        });



    };

    /*--------------------------------
         Sortable (Nestable) List
     --------------------------------*/
    MediansSettings.nestableList = function() {

        jQuery("#nestableList-1").on('stop.uk.nestable', function(ev) {
            var serialized = jQuery(this).data('nestable').serialize(),
                str = '';

            str = nestableIterate(serialized, 0);

            jQuery("#nestableList-1-ev").val(str);
        });

        function nestableIterate(items, depth) {
            var str = '';

            if (!depth)
                depth = 0;

            //console.log(items);

            jQuery.each(items, function(i, obj) {
                str += '[ID: ' + obj.itemId + ']\t' + nestableRepeat('—', depth + 1) + ' ' + obj.item;
                str += '\n';

                if (obj.children) {
                    str += nestableIterate(obj.children, depth + 1);
                }
            });

            return str;
        }

        function nestableRepeat(s, n) {
            var a = [];
            while (a.length < n) {
                a.push(s);
            }
            return a.join('');
        }
    };

    /*--------------------------------
         Tooltips & Popovers
     --------------------------------*/
    MediansSettings.tooltipsPopovers = function() {

        jQuery('[rel="tooltip"]').each(function() {
            var animate = jQuery(this).attr("data-animate");
            var colorclass = jQuery(this).attr("data-color-class");
            jQuery(this).tooltip({  
                template: '<div class="tooltip ' + animate + ' ' + colorclass + '"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
            });
        });

        jQuery('[rel="popover"]').each(function() {
            var animate = jQuery(this).attr("data-animate");
            var colorclass = jQuery(this).attr("data-color-class");
            jQuery(this).popover({
                template: '<div class="popover ' + animate + ' ' + colorclass + '"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
            });
        });

    };

    /*--------------------------------
         iCheck
     --------------------------------*/
    MediansSettings.iCheck = function() {

        if ($.isFunction($.fn.iCheck)) {

            jQuery('input[type="checkbox"].iCheck').iCheck({
                checkboxClass: 'icheckbox_minimal',
                radioClass: 'iradio_minimal',
                increaseArea: '20%'
            });

            var x;
            var colors = ["-green", "-red", "-yellow", "-blue", "-aero", "-orange", "-grey", "-pink", "-purple", "-white"];

            for (x = 0; x < colors.length; x++) {

                if (x == 0) {
                    jQuery('input.icheck-minimal').iCheck({
                        checkboxClass: 'icheckbox_minimal' + colors[x],
                        radioClass: 'iradio_minimal' + colors[x],
                        increaseArea: '20%'
                    });

                    jQuery('input.skin-square').iCheck({
                        checkboxClass: 'icheckbox_square' + colors[x],
                        radioClass: 'iradio_square' + colors[x],
                        increaseArea: '20%'
                    });

                    jQuery('input.skin-flat').iCheck({
                        checkboxClass: 'icheckbox_flat' + colors[x],
                        radioClass: 'iradio_flat' + colors[x],
                    });

                    jQuery('input.skin-line').each(function() {
                        var self = jQuery(this),
                            label = self.next(),
                            label_text = label.text();

                        label.remove();
                        self.iCheck({
                            checkboxClass: 'icheckbox_line' + colors[x],
                            radioClass: 'iradio_line' + colors[x],
                            insert: '<div class="icheck_line-icon"></div>' + label_text
                        });
                    });

                } // end x = 0

                jQuery('input.icheck-minimal' + colors[x]).iCheck({
                    checkboxClass: 'icheckbox_minimal' + colors[x],
                    radioClass: 'iradio_minimal' + colors[x],
                    increaseArea: '20%'
                });

                jQuery('input.skin-square' + colors[x]).iCheck({
                    checkboxClass: 'icheckbox_square' + colors[x],
                    radioClass: 'iradio_square' + colors[x],
                    increaseArea: '20%'
                });

                jQuery('input.skin-flat' + colors[x]).iCheck({
                    checkboxClass: 'icheckbox_flat' + colors[x],
                    radioClass: 'iradio_flat' + colors[x],
                });

                jQuery('input.skin-line' + colors[x]).each(function() {
                    var self = jQuery(this),
                        label = self.next(),
                        label_text = label.text();

                    label.remove();
                    self.iCheck({
                        checkboxClass: 'icheckbox_line' + colors[x],
                        radioClass: 'iradio_line' + colors[x],
                        insert: '<div class="icheck_line-icon"></div>' + label_text
                    });
                });

            } // end for loop

        }
    };

    /*--------------------------------
         Form Editors
     --------------------------------*/
    MediansSettings.formEditors = function() {

        if ($.isFunction($.fn.wysihtml5)) {
            jQuery('.bootstrap-wysihtml5-textarea').wysihtml5({
                toolbar: {
                    "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
                    "emphasis": true, //Italics, bold, etc. Default true
                    "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
                    "html": true, //Button which allows you to edit the generated HTML. Default false
                    "link": true, //Button to insert a link. Default true
                    "image": true, //Button to insert an image. Default true,
                    "color": true, //Button to change color of font  
                    "blockquote": true, //Blockquote  
                    "size": "none" //default: none, other options are xs, sm, lg
                }
            });

            jQuery('.mail-compose-editor').wysihtml5({
                toolbar: {
                    "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
                    "emphasis": true, //Italics, bold, etc. Default true
                    "lists": false, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
                    "html": true, //Button which allows you to edit the generated HTML. Default false
                    "link": true, //Button to insert a link. Default true
                    "image": true, //Button to insert an image. Default true,
                    "color": true, //Button to change color of font  
                    "blockquote": false, //Blockquote  
                    "size": "none" //default: none, other options are xs, sm, lg
                }
            });

        }

    };

    /*--------------------------------
         Custom Dropzone
     --------------------------------*/
    MediansSettings.customDropZone = function() {

        if ($.isFunction($.fn.dropzone)) {

            var i = 1,
                $custom_droplist = jQuery("#custom-droptable"),
                example_dropzone = jQuery("#customDZ").dropzone({
                    url: 'data/upload-file.php',

                    // Events
                    addedfile: function(file) {
                        if (i == 1) {
                            $custom_droplist.find('tbody').html('');
                        }

                        var size = parseInt(file.size / 1024, 10);
                        size = size < 1024 ? (size + " KB") : (parseInt(size / 1024, 10) + " MB");

                        var $el = jQuery('<tr>\
                                                    <td class="text-center">' + (i++) + '</td>\
                                                    <td>' + file.name + '</td>\
                                                    <td><div class="progress"><div class="progress-bar progress-bar-warning"></div></div></td>\
                                                    <td>' + size + '</td>\
                                                </tr>');

                        $custom_droplist.find('tbody').append($el);
                        file.fileEntryTd = $el;
                        file.progressBar = $el.find('.progress-bar');
                    },

                    uploadprogress: function(file, progress, bytesSent) {
                        file.progressBar.width(progress + '%');
                        jQuery('.custom-dropzone .drop-table').perfectScrollbar({
                            suppressScrollX: true
                        });
                    },

                    success: function(file) {
                        file.progressBar.removeClass('progress-bar-warning').addClass('progress-bar-success');
                    },

                    error: function(file) {
                        file.progressBar.removeClass('progress-bar-warning').addClass('progress-bar-red');
                    }
                });

        }

    };

    /*--------------------------------
         Other Form component Scripts
     --------------------------------*/
    MediansSettings.otherScripts = function() {

        /*--------------------------------*/

        if ($.isFunction($.fn.autosize)) {
            jQuery(".autogrow").autosize();
        }

        /*--------------------------------*/

        // Input Mask
        if ($.isFunction($.fn.inputmask)) {
            jQuery("[data-mask]").each(function(i, el) {
                var $this = jQuery(el),
                    mask = $this.data('mask').toString(),
                    opts = {
                        numericInput: getValue($this, 'numeric', false),
                        radixPoint: getValue($this, 'radixPoint', ''),
                        rightAlign: getValue($this, 'numericAlign', 'left') == 'right'
                    },
                    placeholder = getValue($this, 'placeholder', ''),
                    is_regex = getValue($this, 'isRegex', '');

                if (placeholder.length) {
                    opts[placeholder] = placeholder;
                }

                if (mask.toLowerCase() == "phone") {
                    mask = "(999) 999-9999";
                }

                if (mask.toLowerCase() == "email") {
                    mask = 'Regex';
                    opts.regex = "[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,4}";
                }

                if (mask.toLowerCase() == "fdecimal") {
                    mask = 'decimal';
                    $.extend(opts, {
                        autoGroup: true,
                        groupSize: 3,
                        radixPoint: getValue($this, 'rad', '.'),
                        groupSeparator: getValue($this, 'dec', ',')
                    });
                }

                if (mask.toLowerCase() == "currency" || mask.toLowerCase() == "rcurrency") {

                    var sign = getValue($this, 'sign', '$');;

                    mask = "999,999,999.99";
                    if (mask.toLowerCase() == 'rcurrency') {
                        mask += ' ' + sign;
                    } else {
                        mask = sign + ' ' + mask;
                    }

                    opts.numericInput = true;
                    opts.rightAlignNumerics = false;
                    opts.radixPoint = '.';

                }

                if (is_regex) {
                    opts.regex = mask;
                    mask = 'Regex';
                }

                $this.inputmask(mask, opts);
            });
        }

        /*---------------------------------*/

        // autoNumeric
        if ($.isFunction($.fn.autoNumeric)) {
            jQuery('.autoNumeric').autoNumeric('init');
        }

        /*------------- Color Slider widget---------------*/

        function hexFromRGB(r, g, b) {
            var hex = [
                r.toString(16),
                g.toString(16),
                b.toString(16)
            ];
            $.each(hex, function(nr, val) {
                if (val.length === 1) {
                    hex[nr] = "0" + val;
                }
            });
            return hex.join("").toUpperCase();
        }

        function refreshSwatch() {
            var red = jQuery("#slider-red").slider("value"),
                green = jQuery("#slider-green").slider("value"),
                blue = jQuery("#slider-blue").slider("value"),
                hex = hexFromRGB(red, green, blue);
            jQuery("#slider-swatch").css("background-color", "#" + hex);
        }

        if ($.isFunction($.fn.slider)) {

            jQuery(function() {
                jQuery("#slider-red, #slider-green, #slider-blue").slider({
                    orientation: "horizontal",
                    range: "min",
                    max: 255,
                    value: 127,
                    slide: refreshSwatch,
                    change: refreshSwatch
                });
                jQuery("#slider-red").slider("value", 235);
                jQuery("#slider-green").slider("value", 70);
                jQuery("#slider-blue").slider("value", 60);
            });
        }
        /*-------------------------------------*/

        // Just for demo purpose
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }

        /*----------------------------*/

        // datepicker
        if (jQuery(".datepicker").length) {
            $('.datepicker').daterangepicker();
        }

        /*-------------------------------------------*/

    };

    /*--------------------------------
        Widgets
     --------------------------------*/
    MediansSettings.Widgets = function() {

        /*notification widget*/
        var notif_widget = jQuery(".notification-widget").height();
        jQuery('.notification-widget').height(notif_widget).perfectScrollbar({
            suppressScrollX: true
        });

    };

    
    /*--------------------------------
        To Do Task Widget
     --------------------------------*/
    MediansSettings.ToDoWidget = function() {

        /*todo task widget*/
        jQuery(".icheck-minimal-white.todo-task").on('ifChecked', function(event) {
            jQuery(this).parent().parent().addClass("checked");
        });
        jQuery(".icheck-minimal-white.todo-task").on('ifUnchecked', function(event) {
            jQuery(this).parent().parent().removeClass("checked");
        });

        jQuery(".wid-all-tasks ul").perfectScrollbar({
            suppressScrollX: true
        });

    };

    /*--------------------------------
        Select2  Widget
     --------------------------------*/
    MediansSettings.dropdownWidget = function() {
        if (jQuery('.select2').length) {
            jQuery('.select2').select2()
        }
    };

    /*--------------------------------
        Tabs  Widget
     --------------------------------*/
    MediansSettings.handleTabs = function() {
        
        jQuery(document).on('click', '.tab-li', function(){

            let tabul = jQuery(this).parent('li').parent('ul');
            let tabContainer = jQuery(this).data('container');
            let tabElement = jQuery(this).data('tab');

            tabul.find('.active').removeClass('active text-active-primary')
            jQuery(this).addClass('active text-active-primary   ')

            jQuery(tabContainer + ' > .tab-element').addClass('hidden opacity-100')
            jQuery(tabContainer + ' ' + tabElement).removeClass('hidden')
        });
    };


    /*--------------------------------
        CKEditor  Widget
     --------------------------------*/
    MediansSettings.CKEDITOR = function() {

        let editorInstance;
        let editors = document.querySelectorAll('.editor')

        editors.forEach(e => {

            // Initialize CKEditor
            ClassicEditor
            .create(e, {
                toolbar: [
                    'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 'undo', 'redo'
                ],
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' }
                    ]
                }
            })
            .then(editor => {
                editorInstance = editor;
            })
            .catch(error => {
                console.error(error);
            });
        });

    };


    /*--------------------------------
        Append & Clone Item  Widget
     --------------------------------*/
    MediansSettings.appendItem = function() {
        
        jQuery(document).on('click', '.append-item', function(){

            let itemContainer = jQuery(this).data('container');
            let itemElement = jQuery(this).data('element');
            jQuery(itemContainer).append(jQuery(itemElement)[0].outerHTML)
        });
        
        jQuery(document).on('click', '.append-html', function(){

            let itemContainer = jQuery(this).data('container');
            jQuery(itemContainer).append(jQuery(this).data('html'))
        });
        
        jQuery(document).on('click', '.remove-item', function(){
            let itemElement = jQuery(this).data('element');
            jQuery(itemElement).remove()
        });
        jQuery(document).on('click', '.remove-parent', function(){
            let itemElement = jQuery(this).parent();
            jQuery(itemElement).remove()
        });
    };



    /*--------------------------------
        Sweet Alert  Widget
     --------------------------------*/
    MediansSettings.sweetalert = function() {

        jQuery(document).on('click', '.delete-item', function(){
            Swal.fire({
                showDenyButton: true,
                title: "Delete Item",
                text: "Are you sure to remove this item",
                confirmButtonText: "Delete",
                icon: "error"
              }).then(e=> {
                  if (e.isConfirmed) {
                    Swal.fire({
                        title: "Removed successfully",
                        text: "Item removed from database!",
                        icon: "success"
                    })
                }

              });
        });

        jQuery(document).on('click', '.alert-success', function(){
            Swal.fire({
                title: "Finished Successfully",
                text: "Thank you for using our services",
                icon: "success"
              });
        });

        jQuery(document).on('click', '.alert-error', function(){
            Swal.fire({
                title: "Error!",
                text: "Sorry this option is not allowed",
                icon: "error"
              });
        });

    };



    /*--------------------------------
         Vector maps
     --------------------------------*/
    MediansSettings.dbjvectorMap = function() {

        if (jQuery('#db-world-map-markers').length) {
            //@code_start
            jQuery(function() {
                jQuery('#db-world-map-markers').vectorMap({
                    map: 'world_mill_en',
                    scaleColors: ['#002a52', '#002a52'],
                    normalizeFunction: 'polynomial',
                    hoverOpacity: 0.7,
                    hoverColor: false,
                    regionsSelectable: true,
                    markersSelectable: true,
                    markersSelectableOne: true,
                    updateSize: true,
                    onRegionOver: function(event, code) {
                        //console.log('region-over', code);
                    },
                    onRegionOut: function(event, code) {
                        //console.log('region-out', code);
                    },
                    onRegionClick: function(event, code) {
                        //console.log('region-click', code);
                    },
                    onRegionSelected: function(event, code, isSelected, selectedRegions) {
                        //console.log('region-select', code, isSelected, selectedRegions);
                        if (window.localStorage) {
                            window.localStorage.setItem(
                                'jvectormap-selected-regions',
                                JSON.stringify(selectedRegions)
                            );
                        }
                    },

                    panOnDrag: true,

                    focusOn: {
                        x: 0.5,
                        y: 0.5,
                        scale: 1.2,
                        animate: true
                    },

                    regionStyle: {
                        initial: {
                            fill: '#aaaaaa',
                            'fill-opacity': 1,
                            stroke: 'false',
                            'stroke-width': 0,
                            'stroke-opacity': 1
                        },
                        hover: {
                            fill: '#002a52',
                            'fill-opacity': 1,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#002a52'
                        },
                        selectedHover: {}
                    },

                    markerStyle: {
                        initial: {
                            fill: '#f63b23',
                            stroke: '#ffffff',
                            r: 5
                        },
                        hover: {
                            stroke: '#FFC107',
                            "stroke-width": 2,
                            cursor: 'pointer'
                        },
                        selected: {
                            fill: '#FFC107',
                            "stroke-width": 0,
                        },
                    },
                    backgroundColor: '#ffffff',
                    markers: [{
                        latLng: [41.90, 12.45],
                        name: 'Vatican City'
                    }, {
                        latLng: [43.73, 7.41],
                        name: 'Monaco'
                    }, {
                        latLng: [-0.52, 166.93],
                        name: 'Nauru'
                    }, {
                        latLng: [22.28, 114.14],
                        name: 'Hong Kong'
                    }, {
                        latLng: [43.93, 12.46],
                        name: 'San Marino'
                    }, {
                        latLng: [47.14, 9.52],
                        name: 'Liechtenstein'
                    }, {
                        latLng: [7.11, 171.06],
                        name: 'Marshall Islands'
                    }, {
                        latLng: [51.50, -0.11],
                        name: 'London'
                    }, {
                        latLng: [3.2, 73.22],
                        name: 'Maldives'
                    }, {
                        latLng: [35.88, 14.5],
                        name: 'Malta'
                    }, {
                        latLng: [12.05, -61.75],
                        name: 'Grenada'
                    }, {
                        latLng: [19.43, -99.13],
                        name: 'Mexico City'
                    }, {
                        latLng: [41.88, -87.62],
                        name: 'Chicago'
                    }, {
                        latLng: [17.11, -61.85],
                        name: 'Antigua and Barbuda'
                    }, {
                        latLng: [-4.61, 55.45],
                        name: 'Seychelles'
                    }, {
                        latLng: [7.35, 134.46],
                        name: 'Palau'
                    }, {
                        latLng: [42.5, 1.51],
                        name: 'Andorra'
                    }, {
                        latLng: [26.82, 30.80],
                        name: 'Egypt'
                    }, {
                        latLng: [55.75, 37.61],
                        name: 'Moscow'
                    }, {
                        latLng: [1.3, 103.8],
                        name: 'Singapore'
                    }, {
                        latLng: [-33.86, 151.20],
                        name: 'Sydney'
                    }, {
                        latLng: [40.71, -74.00],
                        name: 'New York City'
                    }, {
                        latLng: [56.13, -106.34],
                        name: 'Canada'
                    }, {
                        latLng: [-20.2, 57.5],
                        name: 'Mauritius'
                    }, {
                        latLng: [26.02, 50.55],
                        name: 'Bahrain'
                    }, {
                        latLng: [0.33, 6.73],
                        name: 'São Tomé and Príncipe'
                    }]
                });
            });
            //@code_end
        }

    };
    
    // Element Attribute Helper
    function getValue($el, data_var, default_val) {
        if (typeof $el.data(data_var) != 'undefined') {
            return $el.data(data_var);
        }

        return default_val;
    }
      
   

    /*--------------------------------
        Load  FIles ( Demo Only )
     --------------------------------*/
     MediansSettings.loadAssets = function() {

        var items = document.querySelectorAll('.load_html_file');

        if (items.length) {
            items.forEach(element => {
                fetch(jQuery(element).data('path'))
                .then(e => {
                    e.text().then(b => {
                        
                        element.outerHTML = b;
                    }) 
                })
                .catch(err => {
                    console.log(err) 
                })
            });
        }

    };




    /******************************
     initialize respective scripts 
     *****************************/
    jQuery(document).ready(function() {
        MediansSettings.loadAssets();

        MediansSettings.windowBasedLayout();
        MediansSettings.mainmenuCollapsed();
        MediansSettings.pageTopBar();
        MediansSettings.otherScripts();
        MediansSettings.iCheck();
        MediansSettings.customDropZone();
        MediansSettings.formEditors();
        MediansSettings.extraFormSettings();
        MediansSettings.tooltipsPopovers();
        MediansSettings.nestableList();
        MediansSettings.uiCalendar();
        MediansSettings.tocifyScrollMenu();
        MediansSettings.loadPrettyPhoto();
        MediansSettings.jvectorMaps();
        MediansSettings.dataTablesInit();
        MediansSettings.jsTreeINIT();
        MediansSettings.breadcrumbAutoHidden();
        MediansSettings.chatAPI();
        MediansSettings.chatApiScroll();
        MediansSettings.chatApiWindow();
        MediansSettings.mailboxInbox();
        MediansSettings.Widgets();
        MediansSettings.sectionBoxActions();
        MediansSettings.draggablePanels();
        MediansSettings.viewportElement();
        MediansSettings.ToDoWidget();
        MediansSettings.dbjvectorMap();
        MediansSettings.modals();
        MediansSettings.appendItem();
        MediansSettings.CKEDITOR();
        
        // ------------------------------------------------------- //
        // Coins Slider
        // ------------------------------------------------------ //
        if (jQuery(".coins-slider").length){
            var swiper = new Swiper('.coins-slider', {
                slidesPerView: 3,
                spaceBetween: 10,
                breakpoints: {
                    1200: {
                        slidesPerView: 2
                    },
                    767: {
                        slidesPerView: 2
                    },
                    480: {
                        slidesPerView: 1
                    }
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true
                }
            });
        }
    });
 
    jQuery(window).resize(function() {
        MediansSettings.windowBasedLayout();
        MediansSettings.isotopeGallery();
        MediansSettings.loginPage();
    });

    jQuery(window).load(function() {
        MediansSettings.isotopeGallery();
        MediansSettings.loginPage();
        MediansSettings.onLoadTopBar();
        MediansSettings.dropdownWidget();
        MediansSettings.sweetalert();
        MediansSettings.handleTabs();
        setTimeout(() => {
            
            MediansSettings.mainmenuScroll();
            MediansSettings.mainMenu();
            MediansSettings.windowBasedLayout();
            MediansSettings.otherScripts();
            
        }, 100);

    });
    

});