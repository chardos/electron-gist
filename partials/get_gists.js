module.exports = function(){
  $.ajax({
    url: `https://api.github.com/users/${localStorage.username}/gists`
  })
  .done(function(data){
    $('.list').html('');
    generateLinks(data)

    var options = {
      valueNames: [ 'Gist-link']
    };
    var userList = new List('gists', options);
  })
}

function generateLinks(gists){
  $.each(gists, function(i, gist){
    var gistObj = gist.files[Object.keys(gist.files)[0]]
    // console.log(gistObj);
    generateLink(gistObj.filename, gistObj.raw_url)
  })
}

function generateLink(name, url){
  var $li = $('<li />')
    .addClass('Gist-list-item');
  var $a = $('<a>' + name + '</a>')
    .attr('href', url)
    .attr('target', '_blank')
    .addClass('Gist-link');
  $li.append($a);
  $('.list').append($li);
}
