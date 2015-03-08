$(function() {
  $( ".intro-menu" ).dialog({
     autoOpen: true, 
     hide: "puff",
     show : "slide",
     height: "auto",
     modal: true,
     buttons: {
        OK: function() {$(this).dialog("close");}
     },
     dialogClass: "no-close",   
  });
});