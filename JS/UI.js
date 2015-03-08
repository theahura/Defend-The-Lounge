$(function() {
  $( ".esc-menu" ).dialog({
     autoOpen: false, 
     buttons: {
        OK: function() {$(this).dialog("close");}
     },
     dialogClass: "no-close",
  });
  $( ".button" ).click(function() {
     $( ".esc-menu" ).dialog( "open" );
  });
});

$(function() {
  $( ".intro-menu" ).dialog({
     autoOpen: true, 
     hide: "puff",
     show : "slide",
     height: "auto",
     modal: true,    
  });
});