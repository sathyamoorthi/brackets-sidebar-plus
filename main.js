/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
    "use strict";
    
    var EditorManager = brackets.getModule("project/SidebarView");
    
    $(".horz-resizer").on("mouseenter", function () {
        if ($("#sidebar:visible").length === 0) {
            EditorManager.toggleSidebar();
        }
    });
    
    $("#sidebar").on("mouseleave", function () {
        EditorManager.toggleSidebar();
    });
});