/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
    "use strict";    
    
$(".horz-resizer").on("mouseover", function () {
    
    var sidebar = $("#sidebar"),
        hrz = $(".horz-resizer"),
        content = $(".content");

    if (hrz.parent().hasClass("sidebar") == false && content.is(':animated') == false) 
    {
        sidebar.css("display", "-webkit-box");
        sidebar.attr("data-mover-show", true); 
        hrz.css("display", "none");
        content.animate({left: ((sidebar.width() > 0) ? sidebar.width() : 200)}, 300, function()
                        {
                                $(".sidebar-selection-triangle").css("display", "block");
                        });
    }
});

$("#sidebar").on("mouseleave", function () {
    
    var sidebar = $("#sidebar"),
        hrz = $(".horz-resizer"),
        content = $(".content");

    if (sidebar.attr("data-mover-show") == "true") 
    {        
        hrz.css("display", "block");          
        $(".sidebar-selection-triangle").css("display", "none");
        content.stop();
        
        content.animate({left: 0}, 300, function() {            
            sidebar.removeAttr("data-mover-show", true);
            sidebar.css("display", "none");
        });
    }
});
});