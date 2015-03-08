// $(function() {
//   $( "#esc-menu" ).dialog({
//      autoOpen: false, 
//      buttons: {
//         OK: function() {$(this).dialog("close");}
//      },
//      close: function() {
//             $('#esc-menu').toggle()
//         },
//   });
// });

$(function() {
  $( ".intro-menu" ).dialog({
     autoOpen: true, 
     hide: "puff",
     show : "slide",
     height: "auto",
     modal: true,    
  });
});