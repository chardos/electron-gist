$(document).on('ready', function(){
  $.ajax({
    url: 'https://api.github.com/users/chardos/gists'
  })
  .done(function(data){
    $.each(data, function(i, gist){
      var gistObj = gist.files[Object.keys(gist.files)[0]]
      console.log( gistObj  );
    })
  })

})
