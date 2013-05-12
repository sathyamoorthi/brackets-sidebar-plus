/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

//To know more about this extension, use "Show Developer Tools". Understanding the role of .horz-resizer, .content, #sidebar are mandatory.
define(function (require, exports, module) {
    "use strict";   

$(".horz-resizer").on("mouseenter", OpenSidebar);
$(".content").on("mouseenter", CollapseSidebar);
$(document).on("mouseleave", CollapseSidebar);
$("#sidebar").on("panelExpanded", ShowSlectionTriangle);    
$("#sidebar").on("panelCollapsed", PanelCollapsed);    
$(".content").css("background-color", "#ffffff");
    
function PanelCollapsed()
{
    $(".sidebar-selection-triangle").css("display", "none");
    $("#project-files-container").find(".scroller-shadow").css("display", "none");
}

function OpenSidebar() 
{    
    var sidebar = $("#sidebar"), hrz = $(".horz-resizer"), content = $(".content");

    if (hrz.parent().hasClass("sidebar") == false && content.is(':animated') == false) 
    {        
        sidebar.css("display", "-webkit-box");         
        hrz.css("display", "none");
        
        content.animate({left: ((sidebar.width() > 0) ? sidebar.width() : 200)}, 250, function()
                        {
                                sidebar.attr("data-mover-show", true);
                                ShowSlectionTriangle();
                        });
    }
}
    
function CollapseSidebar()
{
    var sidebar = $("#sidebar"), hrz = $(".horz-resizer"), content = $(".content");

    if (sidebar.attr("data-mover-show") == "true") 
    {        
        hrz.css("display", "block");          
        PanelCollapsed();
        content.stop();
        
        content.animate({left: 0}, 250, function() {            
            sidebar.removeAttr("data-mover-show", true);
            sidebar.css("display", "none");
        });
    }
}
    
    
function ShowSlectionTriangle()
{
    $("#project-files-container").find(".scroller-shadow").css("display", "block");
    $(".sidebar-selection").filter(function()
                                    {
                                        return $(this).css("display") == "block";
                                    }).parent().find(".sidebar-selection-triangle").css("display", "block");
}
    
});