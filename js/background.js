var STATE_START=1;
var STATE_ACQUIRING_AUTHTOKEN=2;
var STATE_AUTHTOKEN_ACQUIRED=3;
var fstate=STATE_START;
var f1,f2,f3,f4,f5,f6,f7,f8;
var jobAppFields={
	"JobTitle": f1,
	"Company": f2,
	"Agency": f8,
	"Contact": f3,
	"Phone-Email": f4,
	"USP1": f5,
	"USP2": f6,
	"USP3": f7,
	"Url": f8
};
var theTitz=Object.keys(jobAppFields);
var theVals=Object.values(jobAppFields);
var entries=Object.entries(jobAppFields);

var SCRIPT_ID='1OyjlytEo2uEorwa12PyFanPBm549L9Koe2Fl5Mwkg-p-5V4k7k-KgDsc';
var signin,revoke_button,close,upIds,revokeT,goButton,signinT;
// info divs
var exec_info_div,exec_data,exec_result,exec_info;
var oo1=1;
var oo2=2;
var oo3=3;
var eOdata=[oo1,oo2,oo3];
var tpl,sht,fld;

chrome.runtime.onMessage.addListener(
	function (request,sender,sendResponse) {
		if(request.msg=="theVals") {

		}
		else if(request.msg=='log') {
			exec_info_div.innerText+=request.log.value;
		} else if(request.msg=='load') {
			var vall=request.load.value;
			if(vall=="on") {
				loadingOn();
			} else if(vall=="off") {
				loadingOff();
			}
		}
	});

function setContentField(key,val) {
	var box=document.getElementById(key);
	box.setAttribute('data-tooltip',val);
	box.setAttribute('placeholder',val);
}
function loadingOn() {
	var ele=document.querySelector('.loadspin');
	ele.display='block';
}
function loadingOff() {
	var ele=document.querySelector('.loadspin');
	ele.display.value='none';
}

function displayFs() {
	chrome.windows.getCurrent({ populate: true },function (windowInfo) {
		var myWindowId=windowInfo.id;
		chrome.tabs.query({ windowId: myWindowId,active: true },function (tabs) {
			var toget=tabs[0].url;
			chrome.storage.local.get(['jobAppFields'],function (storedInfo) {
				var theV=storedInfo.jobAppFields||[];
				var tit=document.querySelector('#tit');
				tit.setAttribute('placeholder',theV.JobTitle);
				var emp=document.querySelector('#emp');
				emp.setAttribute('placeholder',theV.Company);
				var con=documentquerySelector('#con');
				con.setAttribute('placeholder',theV.Contact);
				var num=documentquerySelector('#num');
				num.setAttribute('placeholder',theV.Number);
				var rec=documentquerySelector('#rec');
				rec.setAttribute('placeholder',theV.Agency);
				var u1=documentquerySelector('#u1');
				u1.setAttribute('placeholder',theV.USP1);
				var u2=documentquerySelector('#u3');
				u2.setAttribute('placeholder',theV.USP2);
				var u3=documentquerySelector('#u2');
				u3.setAttribute('placeholder',theV.USP3);
				document.querySelector('#exec_data').innerText=JSON.stringify(theV);
			});
		});
	});
}
function on(element) {
	document.getElementById(element).style.display="block";

}
function off(element) {
	document.getElementById(element).style.display="none";
}

browser.runtime.onInstalled.addListener(function () {
	browser.menus.create({
		id: "SEEKrSidebar",
		title: "SEEKrSidebar",
		contexts: ["all"]
	});
	var parent=browser.contextMenus.create({
		title: "sidebar",
		id: "parent",
		contexts: ['all']
	});
	for(var key in Object.keys(jobAppFields)) {
		browser.contextMenus.create({
			id: key,
			parentId: parent,
			title: key,
			contexts: ['selection']
		});
	}
	//		browser.contextMenus.create({id: "Agency", parentId: parent,title: "Agency","contexts": ["all"],"type": "checkbox"});
	browser.contextMenus.create({
		id: 's2',
		parentId: parent,
		type: 'separator',
		contexts: ['all']
	});
	browser.contextMenus.create({
		id: "Send2Sheet",
		parentId: parent,
		title: "Send2Sheet",
		contexts: ["all"],
		visible: false
	});
	browser.contextMenus.create({
		id: "ResetFields",
		parentId: parent,
		title: "ResetFields",
		contexts: ['all'],
		visible: false
	});
	browser.contextMenus.create({
		id: 's1',
		parentId: parent,
		type: 'separator',
		contexts: ['all']
	});
	browser.contextMenus.create({
		id: "SignIn",
		parentId: parent,
		title: "SignIn",
		contexts: ["all"]
	});
	browser.contextMenus.create({
		id: "RevokeToken",
		parentId: parent,
		title: "RevokeToken",
		contexts: ["all"],
		visible: false
	});

	var thisPanel=browser.extension.getURL("https://*.seek.com.au/jobs/*");
	var thatPanel=browser.extension.executeScript("js/panel.js");

	function toggle(panel) {
		if(panel===thisPanel) {
			browser.sidebarAction.setPanel({ panel: thatPanel });
		} else {
			browser.sidebarAction.setPanel({ panel: thisPanel });
		}
	}

	browser.browserAction.onClicked.addListener(() => {
		browser.sidebarAction.getPanel({}).then(toggle);
	});

	browser.contextMenus.onClicked.addListener(function (item,tab) {
		var sel2=item.selectionText;
		var tit=item.menuItemId;
		
		// establish which title field...
for (var e =0;e< theTitz.length();e++){
var trythisone = theTitz[e];
if (trythisone === tit){
	alert('you have cliecked context ' + tit +' or no...?');
theVals[e] = sel2;	
}
}			
		if(tit==='sidebar') {
				browser.sidebarAction.getPanel();
		} 
		else if(tit==='Send2Sheet') {
			sendVals();
		} 
		else if(tit==='SignIn') {
			getAuthTokenInteractive();
		} 
		else if(tit==='GoToSheet') {
			browser.tabs.create({
				url: browser.extension.getURL("tabs_api.html")
			});
		}
		else if(tit==='ResetFields') {
			resetIt();
		} 
		else {
	chrome.storage.local.get([tabs[0].url], function (storedInfo) {
	var theFields=storedInfo.jobAppFields || {};
	var oldVal = theFields[tit].value;
alert(' oldVal aka theFields[tit].value WORKS OUT TO: '+ oldVal );	
for (var t in Object.entries(theFields)){
var entry =  Object.entries(theFields[t]);
entry = theVals[t];
	alert('setting localstored val to the val,being... ' + theVals[t]);
	}
	var newO = {};
	newO[url] = jobAppFields;
			chrome.storage.local.set(newO);
	}
	}
	}
	// on storage change
	browser.storage.onChanged.addListener(function (changes,namespace) {
		for(var key in changes) {
			var storageChange=changes[key];
			if(key=='jobAppFields') {
				var changedKeys=Object.keys(storageChange);
				for(var fkey in changedKeys) {
					var fieldChg=changedKeys.fkey.value;
					var newKey=changedKeys.fkey;
					browser.contextMenus.update(newKey,{
						title: newKey+'= '+fieldChg
					});
				}
			}
			console.log('Storage key "%s" in namespace "%s" changed. '+
				'Old value was "%s", new value is "%s".',
				key,namespace,storageChange.oldValue,storageChange.newValue);

		}
	});
	function closeWindow() {
		window.close();
	}
	function disableField(field) {
		field.setAttribute('opacity','0.6');
		field.setAttribute('font-size','12px');
	}

	function enableField(field) {
		field.setAttribute('opacity','1');
		field.setAttribute('font-size','16px');
	}

	function disableButton(button) {
		button.setAttribute('disabled','disabled');
	}
	function enableButton(button) {
		button.removeAttribute('disabled');
	}

	function changeState(newState) {
		fstate=newState;
		sendStateChg(fstate);
	}
	function sendLoad(msg,which) {
		if(msg=='on') {
			popupJsPort.postMessage({
				load: msg,
				which: which
			});
		} else if(msg=='off') {
			popupJsPort.postMessage({
				load: msg
			});
		}
	}

	function sendLog(msg) {
		popupJsPort.postMessage({
			log: msg
		});
	}

	function sendStateChg(msg) {
		popupJsPort.postMessage({
			state: msg
		});
	}

	function changeState(newState) {
		fstate=newState;
		sendStateChg(fstate);
		switch(fstate) {
			case STATE_START:
				authd=false;
				break;
			case STATE_ACQUIRING_AUTHTOKEN:
				sendLog('Acquiring token...');
				sendLoad('on','auth');
				break;
			case STATE_AUTHTOKEN_ACQUIRED:
				sendLoad('off','');
				authd=true;
				break;
		}
	}

	function sendDataToSheet(token) {
		sendLog('sending fields to Sheet');
		post({
			'url': 'https://script.googleapis.com/v1/scripts/'+SCRIPT_ID+
				':run',
			'callback': executionAPIResponse,
			'token': token,
			'request': {
				'function': 'process1',
				'parameters': {
					'jobAppFields': JSON.parse(entries)
				}
			}
		});
	}

	function sendVals() {
		sendLoad('on','fields');
		browser.storage.local.get(['jobAppFields'],function (object) {
			var thedat=object.jobAppFields;
			jobAppFields=thedat;
			//"[" + viObj[0] + "\,\"" + viObj[1] + "\",\"" + viObj[2] + "\",\"" + viObj[3] + "\",\"" + viObj[4] + "\",\"" + viObj[5] + "\",\"" + viObj[6] + "\"]]";
			getAuthToken({
				'interactive': false,
				'callback': sendValsToSheet
			});
		});
	}

	// AUTH

	function getAuthToken(options) {
		browser.identity.getAuthToken({
			'interactive': options.interactive
		},options.callback);
	}

	function getAuthTokenSilent() {
		getAuthToken({
			'interactive': false,
			'callback': getAuthTokenCallback
		});
	}

	function getAuthTokenInteractive() {
		getAuthToken({
			'interactive': true,
			'callback': getAuthTokenCallback
		});
	}

	function getAuthTokenCallback(token) {
		if(browser.runtime.lastError) {
			sendLog('No token aquired');
			changeState(STATE_START);
		} else {
			sendLog('Logged In');
			changeState(STATE_AUTHTOKEN_ACQUIRED);
		}
	}

	function executionAPIResponse(response) {
		var resp=JSON.stringify(response);
		sendLog(resp);
		var info;
		if(response.response.result.status=='ok') {
			sendLog('Data has been entered into <a href="'+response.response
				.result
				.doc+'" target="_blank"><strong>this sheet</strong></a>');
		} else {
			sendLog('Error...');
		}
		sendLoad('off','');
	}

	function revokeToken() {
		getAuthToken({
			'interactive': false,
			'callback': revokeAuthTokenCallback,
		});
	}

	function revokeAuthTokenCallback(current_token) {
		if(!browser.runtime.lastError) {
			browser.identity.removeCachedAuthToken({
				token: current_token
			},function () { });
			var xhr=new XMLHttpRequest();
			xhr.open('GET','https://accounts.google.com/o/oauth2/revoke?token='+
				current_token);
			xhr.send();
			changeState(STATE_START);
			sendLog(
				'Token revoked and removed from cache. browser://identity-internals to confirm.'
			);
		}
		sendLoad('off','');
	}

	function post(options) {
		sendLog('posting');
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function () {
			if(xhr.readyState===4&&xhr.status===200) {
				// JSON response assumed. Other APIs may have different responses.
				options.callback(JSON.parse(xhr.responseText));
			} else if(xhr.readyState===4&&xhr.status!==200) {
				sendLog('post',xhr.readyState,xhr.status,xhr.responseText);
			}
		}
		xhr.open('POST',options.url,true);
		xhr.setRequestHeader('Authorization','Bearer '+options.token);
		xhr.send(JSON.stringify(options.request));
	}

	function resetIt() {
		browser.storage.local.clear();
	}
