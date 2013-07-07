/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window, document */

//To know more about this extension, use "Show Developer Tools". Understanding the role of .horz-resizer, .content, #sidebar are mandatory.
define(function (require, exports, module) {
    "use strict";

    $.extend($.easing, {
        def: 'easeOutCubic',
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }
    });

    //We should hide selection triangle and scroller shadows before doing any animation, else they will stand out in animation.
    function panelCollapsed() {
        $(".sidebar-selection-triangle").css("display", "none");
        $("#sidebar").find(".scroller-shadow").css("display", "none");
    }

    function panelExpanded() {
        
        //bring scroller shadows to view.
        $("#sidebar").find(".scroller-shadow").css("display", "block");
        
        //We have 2 selection triangles. One for working-set and another one for project-files. We should show triangle which is currently selected by user.
        $(".sidebar-selection").filter(function () {
            return $(this).css("display") === "block";
        }).parent().find(".sidebar-selection-triangle").css("display", "block");
    }

    function openSidebar() {
        var sidebar = $("#sidebar"),
            hrz = $(".horz-resizer"),
            content = $(".content");

        if (hrz.parent().hasClass("sidebar") === false && content.is(':animated') === false) {
            sidebar.css("display", "-webkit-box");
            hrz.css("display", "none");

            content.animate({
                left: ((sidebar.width() > 0) ? sidebar.width() : 200)
            }, 350, "easeOutCubic", function () {
                sidebar.attr("data-mover-show", true);
                panelExpanded();
            });
        }
    }

    function collapseSidebar() {
        var sidebar = $("#sidebar"),
            hrz = $(".horz-resizer"),
            content = $(".content");

        if (sidebar.attr("data-mover-show") === "true") {
            hrz.css("display", "block");
            panelCollapsed();
            content.stop();

            content.animate({
                left: 0
            }, 350, "easeOutCubic", function () {
                sidebar.removeAttr("data-mover-show", true);
                sidebar.css("display", "none");
            });
        }
    }
    
    $(document).mousemove(function (e) {
        if (e.pageX <= 60 && window.getSelection().toString().length === 0) {
            openSidebar();
        }
    });

    $(".content").on("mouseenter", collapseSidebar);
    $(document).on("mouseleave", collapseSidebar);
    $("#sidebar").on("panelExpanded", panelExpanded);
    $("#sidebar").on("panelCollapsed", panelCollapsed);
    $(".content").css("background-color", "#ffffff");
});