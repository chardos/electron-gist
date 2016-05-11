var username;
$(document).on('ready', function(){
  usernameInit()
})

function usernameInit(){
  if(localStorage.username){
    showGistPage();
    return;
  }
  var $input = $('.js-username-input')
  $input.focus();
  $input.on('keydown', function(e){
    if(e.which == 13) {
      username = $(this).val();
      localStorage.username = username;
      showGistPage();
    }
  })
}

function showGistPage(){
  $('.UserSelect').addClass('s-hidden');
  $('.js-search').focus();
  getGists();
}

function getGists(){
  $.ajax({
    url: `https://api.github.com/users/${localStorage.username}/gists`
  })
  .done(function(data){
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
  var $li = $('<li />');
  var $a = $('<a>' + name + '</a>')
    .attr('href', url)
    .attr('target', '_blank')
    .addClass('Gist-link');
  $li.append($a);
  $('.list').append($li);
}
