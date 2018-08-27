const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function (event) {
    var window = remote.getCurrentWindow();
    window.close()
})

const submitBut = document.getElementById('updateBtn')
const submitFBut = document.getElementById('updateFldBtn')
const submitTBut = document.getElementById('updateTplBtn')

submitFBut.addEventListener('click', function () {
    ipc.send('update-folder-value', document.getElementById('notifyFVal').value)

})
submitBut.addEventListener('click', function () {
    ipc.send('update-notify-value', document.getElementById('notifyVal').value)

})
submitTBut.addEventListener('click', function () {
    ipc.send('update-template-value', document.getElementById('notifyFVal').value)

})
