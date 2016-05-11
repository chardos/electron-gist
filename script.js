var $ = require('./vendor/jquery.js');
$(document).on('ready', function(){
  getGists();
})

function getGists(){
  $.ajax({
    url: 'https://api.github.com/users/chardos/gists'
  })
  .done(function(data){
    $.each(data, function(i, gist){
      var gistObj = gist.files[Object.keys(gist.files)[0]]
      // console.log(gistObj);
      generateLink(gistObj.filename, gistObj.raw_url)
    })
  })
}

function generateLink(name, url){
  var $a = $('<a>' + name + '</a>')
    .attr('href', url)
    .attr('target', '_blank')
    .addClass('GistLink');
  $('body').append($a);
}
