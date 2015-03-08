var json = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=loser',
  obj = JSON.parse(json);

// $('.gif').html(obj.data.fixed_width_downsampled_url);
$(".gif").attr("src", jsondata[0].fixed_width_downsampled_url);