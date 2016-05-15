var username;
var getGists = require('./partials/get_gists.js');

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
