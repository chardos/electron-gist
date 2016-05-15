// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');
require('./partials/mainmenu.js')

ipcRenderer.on('focus-element', (event, selector) => {
  var input = document.querySelector(selector);
  input.value = '';
  input.focus();
});
