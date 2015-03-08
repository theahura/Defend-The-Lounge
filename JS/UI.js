// $(function() {
//   $( ".esc-menu" ).dialog({
//      autoOpen: false, 
//      buttons: {
//         OK: function() {$(this).dialog("close");}
//      },
//      dialogClass: "no-close",
//   });
//   $( ".button" ).click(function() {
//      $( ".esc-menu" ).dialog( "open" );
//   });
// });

$(function() {
  $('.esc-menu').keyup(function(e) {
      if (e.which == 13) {
           var buttons = $(this).dialog('option', 'buttons');
           buttons['Save']();
           e.stopPropagation();
      }
  });
});

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