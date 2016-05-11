var username;
$(document).on('ready', function(){
  eventHandlersInit()
  usernameInit()
})
function eventHandlersInit(){
  $('.js-username-input').on('keydown', function(e){
    if(e.which == 13) {
      username = $(this).val();
      localStorage.username = username;
      showGistPage();
    }
  })
  $('.js-change').on('click', function(){
    hideGistPage();
  })
}

function usernameInit(){
  if(localStorage.username){
    showGistPage();
    return;
  }
  $('.js-username-input').focus();

}

function showGistPage(){
  $('.UserSelect').addClass('s-hidden');
  $('.js-search').focus();
  getUserInfo();
  getGists();
}

function hideGistPage(){
  $('.UserSelect').removeClass('s-hidden');
  $('.js-username-input').focus();
}

function getUserInfo(){
  $.ajax({
    url: `https://api.github.com/users/${localStorage.username}`
  })
  .done(function(data){
    populateHeader(data.avatar_url);
  })
}
function populateHeader(image){
  $('.Header-avatar').css('background-image', `url(${image})`)
  $('.Header-username').html(localStorage.username)
}
function getGists(){
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
