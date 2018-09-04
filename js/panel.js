var myWindowId;
"use strict";

var fpstate;
// fields
var jt,emp,con,num,u1,u2,u3,rec,email;
// buttons
var reset,goButton,optsButton,signin,revoke_button,returnTo,close,upIds;
// info divs
var exec_div,exec_info_div,exec_result;
var f1b,f2b,f4b,f3b,f5b,f6b,f7b;
var o1b,o2b,o3b;

function loadingOn() {
  var ele=document.querySelector('#loadspin');
  browser.extension.getBackgroundPage.displayDefault(ele);
}
function loadingOff() {
  var ele=document.querySelectorAll('#loadspin');
  for(var th in ele) {
    var itd=ele.th;
    browser.extension.getBackgroundPage.displayNone(itd);
  }
}
// on storage change
browser.storage.onChanged.addListener(function (changes,namespace) {
  for(var key in changes) {
    var storageChange=changes[key];
    exec_info_div.innerText+=(key+' onChange notification, now: '+storageChange[key].value);
  }
});
// ONLOAD FUNCTION....
var executionAPIpopup=(function () {
  function disableButton(button) {
    button.setAttribute('disabled','disabled');
  }
  function enableButton(button) {
    button.removeAttribute('disabled');
  }
  function createFields() {
    browser.storage.local.get(['url'],function (object) {
      var jobFields=object.jobAppFields;
      for(var key of jobFields) {
        var theOne=jobFields[key];
        var box=document.getElementById([key]);
        box.innerText=jobFields['key']+'= '+Object.keys(jobFields['key']);
      }
    });
  }
  function displayFs() {
    var bk=browser.extension.getBackgroundPage(function (object) {

      jt=document.querySelector('#tit')
      jt.setAttribute('placeholder',bk.JobTitle);
      emp=document.querySelector('#emp')
      emp.setAttribute('placeholder',bk.Company);
      con=document.querySelector('#con')
      con.setAttribute('placeholder',bk.Contact);
      email=document.querySelector('#num')
      email.setAttribute('placeholder',bk.Number);
      rec=document.querySelector('#rec')
      rec.setAttribute('placeholder',bk.Agency);
      u1=document.querySelector('#u1')
      u1.setAttribute('placeholder',bk.USP1);
      u3=document.querySelector('#u3')
      u3.setAttribute('placeholder',bk.USP2);
      u2=document.querySelector('#u2')
      u2.setAttribute('placeholder',bk.USP3);

    });
  }
  const contentBox=document.querySelector("#content");

  document.addEventListener('DOMContentLoaded',function () {
    on('overlay');
    reset=document.querySelector('#reset');
    reset.addEventListener('click',bkresetIt.bind(reset,true));
    goButton=document.querySelector('#go');
    goButton.addEventListener('click',bksendVals.bind(goButton,true));
    // createFields();
    /// displayFs();
    // auth?
    signin=document.querySelector('#signin');
    signin.addEventListener('click',bkSignin);
    signinT=document.querySelector('#signinT');
    signinT.addEventListener('click',bkSignin);
    revokeT=document.querySelector('#revokeT');
    revokeT.addEventListener('click',bkrevokeToken);
    revoke_button=document.querySelector('#revoke');
    revoke_button.addEventListener('click',bkrevokeToken);
    // nav?
    // below records / stores if/when new IDs are saved...
    //	createOptionsForm();
    //	upIds=document.querySelector('#upIds');
    //	upIds.addEventListener('click',inTestInput);
    close=document.querySelector('#close');
    close.addEventListener('click',bkclose);
    // logs?
    exec_result=document.querySelector('#exec_result');
    exec_info_div=document.querySelector('#exec_info');
    //	sht=document.querySelector('#shtin');	sht.setAttribute('placeholder',oo1);
    //tpl=document.querySelector('#tplin');	tpl.setAttribute('placeholder',oo2);
    //fld=document.querySelector('#fldin');	fld.setAttribute('placeholder',oo3);
    //	});
    // in fields....
    goButton=document.querySelector('#go');
    goButton.addEventListener('click',bksendVals.bind(goButton,true));
    reset=document.querySelector('#reset');
    reset.addEventListener('click',bkresetIt.bind(reset,true));
    // in options...
    //	upIds = document.querySelector('#upIds');
    //	upIds.addEventListener('click', inTestInput);
  });


  window.addEventListener("clickBut",() => {
    browser.tabs.query({ windowId: myWindowId,active: true }).then((tabs) => {
      let contentToStore={};
      contentToStore[tabs[0].url]=contentBox.textContent;
      browser.storage.local.set(contentToStore);
    });
  });

  function updateContent() {
    browser.tabs.query({ windowId: myWindowId,active: true })
      .then((tabs) => {
        return browser.storage.local.get(tabs[0].url);
      })
      .then((storedInfo) => {
        var textContent=storedInfo[Object.keys(storedInfo)[0]];
        var fields=textContent.split(' ');
        var emp=document.querySelector('#emp').innerText+fields[1];
        var jt=document.querySelector('#jt').innerText+fields[0];
        var us3=document.querySelector('#usp3').innerText+fields[2];
        var us2=document.querySelector('#usp2').innerText+fields[3];
        var us1=document.querySelector('#usp1').innerText+fields[4];
      });
  }
  browser.tabs.onActivated.addListener(updateContent);
  browser.tabs.onUpdated.addListener(updateContent);
  browser.windows.getCurrent({ populate: true }).then((windowInfo) => {
    myWindowId=windowInfo.id;
    updateContent();
  });

  return {
    onload: function () {
      M.AutoInit();

      var sidenavs=document.querySelectorAll('.sidenav')
      for(var i=0; i<sidenavs.length; i++) {
        M.Sidenav.init(sidenavs[i]);
      }
      var dropdowns=document.querySelectorAll('.dropdown-trigger')
      for(i=0; i<dropdowns.length; i++) {
        M.Dropdown.init(dropdowns[i]);
      }
      var collapsibles=document.querySelectorAll('.collapsible')
      for(i=0; i<collapsibles.length; i++) {
        M.Collapsible.init(collapsibles[i]);
      }
      var featureDiscoveries=document.querySelectorAll('.tap-target')
      for(i=0; i<featureDiscoveries.length; i++) {
        M.FeatureDiscovery.init(featureDiscoveries[i]);
      }
      var materialboxes=document.querySelectorAll('.materialboxed');
      for(i=0; i<materialboxes.length; i++) {
        M.Materialbox.init(materialboxes[i]);
      }
      var modals=document.querySelectorAll('.modal');
      for(i=0; i<modals.length; i++) {
        M.Modal.init(modals[i]);
      }
      var parallax=document.querySelectorAll('.parallax');
      for(i=0; i<parallax.length; i++) {
        M.Parallax.init(parallax[i]);
      }
      var scrollspies=document.querySelectorAll('.scrollspy');
      for(i=0; i<scrollspies.length; i++) {
        M.ScrollSpy.init(scrollspies[i]);
      }
      var tabs=document.querySelectorAll('.tabs');
      for(i=0; i<tabs.length; i++) {
        M.Tabs.init(tabs[i]);
      }
      var tooltips=document.querySelectorAll('.tooltipped');
      for(i=0; i<tooltips.length; i++) {
        M.Tooltip.init(tooltips[i]);
      }
      exec_info_div=document.querySelector('#exec_info');
      goButton=document.querySelector('#go');
      goButton.addEventListener('click',bksendVals.bind(goButton,true));

      signin=document.querySelector('#signin');
      signin.addEventListener('click',bkgetAuthTokenInteractive);
      exec_result=document.querySelector('#exec_result');
      createFields();
      displayFs();

    }
  };

})();

window.onload=executionAPIpopup.onload;
