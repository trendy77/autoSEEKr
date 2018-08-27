var bk = chrome.extension.getBackgroundPage;
var clikr, clikr2;
var myWindowId;


var body = document.querySelector("body");

function renderButton2() {
  var dom_item = document.querySelector('body');
  var div = document.createElement('div');
  div.setAttribute('id', 'seekr2');
  var backpage = chrome.extension.getBackgroundPage();
  div.setAttribute('class', 'fixed-action-btn');
  var div3 = document.createElement('a');
  div3.setAttribute('class', 'btn-floating btn-large blue pulse');
  div3.addEventListener('click', click.bind(processOne, true));
  var div2 = document.createElement('i');
  div2.setAttribute('class', 'large material-icons');
  div2.innerText = "target";
  backpage.domAppendChild(div, div3);
  backpage.domAppendChild(div3, div2);
  backpage.domAppendChild(dom_item, div);
}
function renderButton() {
  var dom_item = document.innerHTML;
  var newele = document.createElement('a');
  var backpage = chrome.extension.getBackgroundPage();
  dom_item.setAttribute('class',
    'floating btn-large hoverable blue-grey darken-4 pulse');
  dom_item.setAttribute('id', 'seekr');
  var goButt = document.createElement('i');
  domSetAttribute('goButt', 'class', 'material-icons right');
  goButt.addEventListener('click', click.bind(goButt, true));
  var t = document.createTextNode();
  t.innerText = "test";
  backpage.domAppendChild(newele, goButt);
  backpage.domAppendChild(dom_item, newele);
  document.body.append(newEle);
}

function process() {
  var selectedText = window.getSelection().toString().trim();
  var electedText = document.getSelection().toString().trim();
  alert('electedText' + electedText);
  alert('selectedText' + selectedText);
  if (selectedText) {
    chrome.runtime.postMessage({ msg: "process", text: selectedText }, "*");
  } else {
    alert('hightlight some text first....')
  }
}

function sendLoad(msg, which) {
  if (msg == 'on') {
    chrome.runtime.sendMessage({
      msg: 'load',
      load: 'on',
      which: which
    });
  } else if (msg == 'off') {
    chrome.runtime.sendMessage({
      msg: 'load',
      load: 'off'
    });
  }
}
function sendLog(msg) {
  chrome.runtime.sendMessage({
    msg: 'log',
    log: msg
  });
}
function sendStateChg(msg) {
  chrome.runtime.sendMessage({
    msg: 'state',
    state: msg
  });
}


// ONLOAD
document.addEventListener('DOMContentLoaded', function () {

  var tooltips = document.querySelectorAll('.tooltipped');
  for (i = 0; i < tooltips.length; i++) {
    M.Tooltip.init(tooltips[i]);
  }


  renderButton2();
  renderButton1();


  clikr = document.querySelector("#seekr");
  clikr.addEventListener("click", process);
  clikr2 = document.querySelector("#seekr2");
  clikr2.addEventListener("click", function () {
    process();
  }, false);


});
