/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window, document, clearTimeout, setTimeout */

//To know more about this extension, use "Show Developer Tools". Understanding the role of .horz-resizer, .content, #sidebar are mandatory.
define(function (require, exports, module) {
    "use strict";
    
    var AppInit                     = brackets.getModule("utils/AppInit"),
        ExtensionUtils              = brackets.getModule("utils/ExtensionUtils"),
        sideBarPlusActive           = false,
        sideBarWidthBeforeCollapse  = 200,
        $sidebar                    = $("#sidebar"),
        $content                    = $(".content"),
        $mainView                   = $(".main-view");
    
    function panelCollapsed() {
        if ($sidebar.width() > 0) {
            sideBarWidthBeforeCollapse = $sidebar.width();

            $(".horz-resizer:first").css("display", "none");
            $content .css("left", "20px");
            $sidebar.find(".sidebar-selection-extension").css("display", "none");
            $sidebar.find(".scroller-shadow").css("display", "none");
            $sidebar.css("position", "fixed").css("width", "0px").addClass("sidebar-plus-collapse");
        }
    }

    function panelExpanded() {
        sideBarWidthBeforeCollapse = sideBarWidthBeforeCollapse < 150 ? 150 : sideBarWidthBeforeCollapse;

        $(".horz-resizer:first").css("display", "block").css("z-index", 150).css("left", sideBarWidthBeforeCollapse + "px");

        $sidebar.css("display", "-webkit-box").css("width", sideBarWidthBeforeCollapse + "px");
        $sidebar.find(".sidebar-selection-extension").css("display", "block");
        $sidebar.find(".scroller-shadow").css("display", "block"); 
    }

    $content.on("click", function(event) {
        if (sideBarPlusActive) {
            panelCollapsed();
        }
    });
    
    $mainView.on("click", function (event) {
        if (event.pageX < 19 && $sidebar.width() === 0) {
            sideBarPlusActive = true;
            panelExpanded();
        }
    });
    
    $sidebar.on("panelExpanded", function () {
        sideBarPlusActive = false;
        $sidebar.css("position", "absolute").removeClass("sidebar-plus-collapse");
        panelExpanded();
    });
    
    $sidebar.on("panelCollapsed", function () {
        panelCollapsed();
    });

    $sidebar.on("panelResizeUpdate", function (event, size) {
        if (sideBarPlusActive) {
            $(".content").css("left", "20px");
            $("#first-pane").prev(".horz-resizer").css("left", $("#first-pane").width() + "px")
        }
    });

    $sidebar.bind("transitionend", function() {
        if ($sidebar.width() === 0) {
            $sidebar.css("display", "none");
        }
    });

    $mainView.css("background-color", "#3F3F3F");
    $content.css("background-color", "#ffffff");

    AppInit.appReady(function () {
        ExtensionUtils.loadStyleSheet(module, "css/main.css");

        if ($sidebar.is(":visible") === false) {
            panelCollapsed();            
        }
    });
});