// var jsondata = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=loser';

// // $('.gif').html(obj.data.fixed_width_downsampled_url);
// $("div.gif").attr("src", jsondata[0].fixed_width_downsampled_url);

// var obj = $.parseJSON( 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=loser' );
// alert( obj.name === "fixed_width_downsampled_url" );


// var xhr = $.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=loser");
// xhr.done(function(data) {
//   console.log("success got data", data);
//   (".gif").attr("src", xhr[data].url);
// });

// $.getJSON('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=loser', function(data) {
//   var template = "<img src='{{data.fixed_width_downsampled_url}}'>"
// })

// function() {
//     $.getJSON('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=loser', function(data) {
//         var template = $('#gif-template').html();
//         var info = Mustache.to_html(template, data);
//     });
//   };

// $(document).ready(function () {
  var jsonURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=loser";

  $.getJSON(jsonURL, function(json) {
    var imgList = "";

    $.each(json.data, function() {
      imgList += '<img src="' + this.fixed_width_downsampled_url + '">';
    });
    
    $('.gif').append(imgList);
  });
// });