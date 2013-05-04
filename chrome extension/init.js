var data = loadStoredData();
var facebookAppLoginTab;
var facebookLoginComplete;
var chatData;
var listenTabs = new Array();

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab){
	if (facebookAppLoginTab!==undefined && facebookAppLoginTab==tabID && tab.status=="complete"){
		var url = tab.url;
		var ErrorPattern = /(login\.php\?error)/;
		var SuccessPattern = /(ACCESS ALLOWED)/;
		if (ErrorPattern.test(url))
			alertAppPermissionDenied();
		else if (SuccessPattern.test(tab.title)){
			var userID = tab.title;
			userID = userID.replace(/(ACCESS ALLOWED! )/,"");
			facebookLoginComplete = true;
			storeData(data,"facebookUserID",userID);
			chrome.tabs.remove(facebookAppLoginTab);
		}
	}
/*	if (listenTabs.indexOf(tab.id)!=-1 && tab.status=="complete"){
		if (tab.url!="chrome://newtab/" && tab.url!=""){
			alert("HI");
			chrome.tabs.sendMessage(tab.id,chatData);
			listenTabs.splice(listenTabs.indexOf(tab.id),1);
		}
	}*/
});

/*chrome.tabs.onCreated.addListener(function(tab){
	if (tab.url=="chrome://newtab/")
		listenTabs.push(tab.id);
});*/

chrome.tabs.onRemoved.addListener(function(tabID, changeInfo, tab){
	if (!facebookLoginComplete && facebookAppLoginTab!==undefined && facebookAppLoginTab==tabID)
		alertAppPermissionDenied();
//	if (listenTabs.indexOf(tab.id)!=-1) listenTabs.splice(listenTabs.indexOf(tab.id),1);
});

chrome.tabs.onActivated.addListener(function(info){
	chrome.tabs.sendMessage(info.tabId,chatData);
});

chrome.runtime.onMessage.addListener(function(request){
	if (request=="FacebookCheckIDAccess"){
		$.ajax({
			url: "http://agile-shore-9388.herokuapp.com/login.php",
			async: true,
			data:{
				"FACEBOOK_ID_CHECK": data.facebookUserID
			},
			success: function(){
				chrome.runtime.sendMessage("FacebookStartHome");
			},
			error: function(xhr, status, error){
				alert("Sua extensão:\n\"Facebook cHrOME\" falhou.");
			}
		});
	}else if (request=="FacebookStartHome"){
		$.ajax({
			url: "http://agile-shore-9388.herokuapp.com/beginChat.php",
			async: true,
			data:{
				"FACEBOOK_ID": data.facebookUserID
			},
			success: function(data){
				chatData = JSON.parse(data);
				console.log("Worked!");
			},
			error: function(xhr, status, error){
				alert("Sua extensão:\n\"Facebook cHrOME\" falhou.");
			}
		});
	}
});

if (!(data.facebookUserID)){
	chrome.tabs.create({
		"url": "http://agile-shore-9388.herokuapp.com/login.php",
		"active": true
	},function(tab){
		facebookAppLoginTab = tab.id;
		facebookLoginComplete = false;
	});
}else chrome.runtime.sendMessage("FacebookCheckIDAccess");