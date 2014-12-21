/*
The MIT License (MIT)

Copyright (c) 2013-14 Sathyamoorthi <sathyamoorthi10@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window, document */

define(function (require, exports, module) {
    "use strict";
    
    var AppInit                     = brackets.getModule("utils/AppInit"),
        ExtensionUtils              = brackets.getModule("utils/ExtensionUtils"),
        PreferencesManager          = brackets.getModule("preferences/PreferencesManager"),
        sideBarPlusActive           = false,
        sideBarCollapse             = false,
        $sidebar                    = $("#sidebar"),
        $content                    = $(".content"),
        $mainView                   = $(".main-view"),
        $sidebarResizer             = $(".horz-resizer:first");

    $mainView.css("background-color", "#3F3F3F");
    $content.css("background-color", "#ffffff");

    $sidebar.on("panelExpanded", function () {
        sideBarPlusActive = false;
        $content.removeClass("sidebarplus-content");
        $sidebar.removeClass("sidebarplus-sidebar")
        $sidebarResizer.css("display", "block").css("left", $sidebar.width() + "px");

        panelExpanded();
    });

    $sidebar.on("panelCollapsed", function () {
        panelCollapsed();
    });

    $content.bind("transitionend", function() {
        if (sideBarCollapse) {
            $sidebar.css("display", "none");            
        } else {
            $sidebar.css("display", "-webkit-box");
        }

        $("#first-pane").prev(".horz-resizer").css("left", $("#first-pane").width() + "px")
    });
    
    function panelCollapsed() {    
        sideBarCollapse = true;

        $sidebarResizer.css("display", "none");
        $sidebar.addClass("sidebarplus-sidebar").css("opacity", "0");
        $content.addClass("sidebarplus-content").css("left", "20px");
    }

    function panelExpanded() {
        sideBarCollapse = false;

        $sidebar.css("opacity", "1");
        $content.css("left", $sidebar.width() + "px");
    }

    function collapseSidebar() {
        if (sideBarPlusActive) {
            panelCollapsed();
        }
    }

    function expandSidebar(event) {
        if (event.pageX < 19 && $sidebar.is(":visible") === false) {
            sideBarPlusActive = true;
            panelExpanded();
        }
    }

    function initializeTriggers() {
        var triggerMode = preference.get("triggermode");

        if (triggerMode === "mouseover") {
            $content.off("click", collapseSidebar);        
            $mainView.off("click", expandSidebar);

            $sidebar.on("mouseleave", collapseSidebar);        
            $mainView.on("mouseover", expandSidebar);
        } else {
            //default is click
            $sidebar.off("mouseleave", collapseSidebar);
            $mainView.off("mouseover", expandSidebar);

            $content.on("click", collapseSidebar);        
            $mainView.on("click", expandSidebar);
        }
    }

    //while brakets starts
    AppInit.appReady(function () {
        ExtensionUtils.loadStyleSheet(module, "css/main.css");
    });

    //while brakets starts
    AppInit.htmlReady(function () {
        if ($sidebar.is(":visible") === false) {
            panelCollapsed();            
        }
    });

    //user preference for how to trigger siderbarplus
    var preference = PreferencesManager.getExtensionPrefs("sidebarplus");

    preference.definePreference("triggermode", "string", "click").on("change", initializeTriggers);
    preference.save();
});