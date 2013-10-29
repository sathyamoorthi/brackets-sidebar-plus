/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window, document, clearTimeout, setTimeout */

//To know more about this extension, use "Show Developer Tools". Understanding the role of .horz-resizer, .content, #sidebar are mandatory.
define(function (require, exports, module) {
    "use strict";
    
    var AppInit = brackets.getModule("utils/AppInit");

    $.extend($.easing, {
        def: 'easeOutCubic',
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }
    });
   
    function showShadowsAndTriangle(show) {
        if (show) {
            //bring scroller shadows to view.
            $("#sidebar").find(".scroller-shadow").css("display", "block");
            
            //We have 2 selection triangles. One for working-set and another one for project-files. We should show triangle which is currently selected by user.
            $(".sidebar-selection").filter(function () {
                return $(this).css("display") === "block";
            }).parent().find(".sidebar-selection-triangle").css("display", "block");
            
        } else {  //We should hide selection triangle and scroller shadows before doing any animation, else they will stand out in animation.            
            $(".sidebar-selection-triangle").css("display", "none");
            $("#sidebar").find(".scroller-shadow").css("display", "none");
        }
    }
    
    function panelCollapsed() {
        $(".horz-resizer").css("display", "none");
        $(".content").css("left", "20px");
        $("#sidebar").css("display", "none");
        
    }

    function panelExpanded() {
        $(".horz-resizer").css("display", "block");
        $("#sidebar").css("display", "-webkit-box");
    }

    function openSidebar() {
        var sidebar = $("#sidebar"),
            content = $(".content");

        if (content.is(':animated') === false) {
            sidebar.css("display", "-webkit-box");
            sidebar.attr("data-hover-show", true);
            panelExpanded();
            
            content.animate({
                left: ((sidebar.width() > 0) ? sidebar.width() : 200)
            }, 350, "easeOutCubic", function () {
                showShadowsAndTriangle(true);
            });
        }
    }

    function collapseSidebar() {
        var sidebar = $("#sidebar"),
            content = $(".content");
        
        if (sidebar.attr("data-hover-show") === "true") {
            showShadowsAndTriangle(false);
            content.stop();
            
            content.animate({
                left: 20
            }, 350, "easeOutCubic", function () {
                panelCollapsed();
                sidebar.removeAttr("data-hover-show", true);
            });
        }
    }

    $(".content").on("click", collapseSidebar);
    
    $(".main-view").on("click", function (event) {
        if (event.pageX < 19 && $("#sidebar").is(":visible") === false) {
            openSidebar();
        }
    });
    
    $("#sidebar").on("panelExpanded", function () {
        panelExpanded();
        showShadowsAndTriangle(true);
    });
    
    $("#sidebar").on("panelCollapsed", function () {
        panelCollapsed();
        showShadowsAndTriangle(false);
    });
    
    $(".main-view").css("background-color", "#3F3F3F");
    $(".content").css("background-color", "#ffffff");
    
    AppInit.appReady(function () {
        if ($("#sidebar").is(":visible") === false) {
            panelCollapsed();
            showShadowsAndTriangle(true);
        }
    });
    
});