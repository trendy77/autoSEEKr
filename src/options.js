'use strict';

var optsPanel = (function ()
{
	var oo1, oo2, oo3, upIds;
	var eOdata = [oo1, oo2, oo3];
	var opts_data, opts_result, opts_info, tpl, sht, fld;

	function inTestInput()
	{
		//	var sht = document.querySelector('#shtin');
		var checkboxes = document.querySelectorAll('input');
		for (i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].value !== "") {
				if (checkboxes[i].value !== eOdata[i]) {
					eOdata[i] = checkboxes[i].value;
				}
			}
		}
		chrome.storage.sync.set({ theIds: eOdata }, function ()
		{
			chrome.extension.getBackgroundPage.sendOpts();
		});
	}

	function createOpts()
	{
		chrome.storage.sync.get(['theIds'], function (object)
		{
			var theIds = object.theIds || [];
			var box = document.querySelector('#idButtons');
			for (var key in theIds) {
				var input = document.createElement('input');
				input.innerText = jobFields[key].value;
				var span = box.getElementsByTagName('span');
				span.textContent = theIds[key].value;
				box.appendChild(input);
			}
		});
	}
	function getNewIds()
	{
		var s = document.getElementById('shtin').value.trim();
		var t = document.getElementById('fldin').value.trim();
		var f = document.getElementById('tplin').value.trim();
		var theNewIds = [s, t, f];
		return theNewIds;
	}

	function createOptionsForm()
	{
		var contentBox = document.querySelector("#ids");
		var bk = chrome.extension.getBackgroundPage();
		chrome.storage.sync.get(['theIds'], function (list)
		{
			var savedIds = list.theIds || [];
			oo1 = savedIds[0];
			oo2 = savedIds[1];
			oo3 = savedIds[2];
			var ns = ['shtin', 'tplin', 'fldin'];
			//var ns = ['SheetId', 'TemplateId', 'FolderId'];
			for (var i = 0; i < savedIds.length; i++) {
				var deItem = document.createElement('input');
				bk.domSetAttribute(deItem, 'placeholder', savedIds[i]);
				bk.domSetAttribute(deItem, 'value', '');
				bk.domAppendChild(contentBox, deItem);
			}
			var toolt = bk.createElement(document, 'but');
			bk.domAddClass(toolt, 'tooltipped');
			bk.domSetAttribute(toolt, 'data-position', 'bottom');
			bk.domSetAttribute(toolt, 'data-tooltip', 'Set / Sync IDs');
			bk.domSetAttribute(toolt, 'data-delay', '40');
			var idbutton = bk.createElement(document, 'upIds');
			bk.domAddClass(idbutton, 'waves-effect waves-light btn pulse');
			bk.domSetAttribute(idbutton, 'placeholder', savedIds[i]);
			bk.domSetAttribute(idbutton, 'value', '');
			bk.domAppendChild(contentBox, idbutton);
			bk.createTextNode('SendIds', idButton);
			bk.appendChild(toolt, idbutton);
			bk.appendChild(contentBox, toolt);
		});
	}

	return {
		onload: function ()
		{
			var oo1 = chrome.runtime.getBackgroundPage.o1;
			var oo2 = chrome.extension.getBackgroundPage.o2;
			var oo3 = chrome.extension.getBackgroundPage.o3;
			sht = document.querySelector('#shtin');
			sht.setAttribute('placeholder', oo1);
			tpl = document.querySelector('#tplin');
			tpl.setAttribute('placeholder', oo2);
			fld = document.querySelector('#fldin');
			fld.setAttribute('placeholder', oo3);

			opts_data = document.querySelector('#opts_data');
			opts_data.innerText = eOdata;
			opts_info = document.querySelector('#opts_info');

			upIds = document.querySelector('#upIds');
			upIds.addEventListener('click', inTestInput);

			opts_result = document.querySelector('#opts_result');
		}
	};
})();

window.onload = optsPanel.onload;
