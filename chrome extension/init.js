var data = loadStoredData();
var facebookAppLoginTab;
var facebookLoginComplete;

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
});

chrome.tabs.onRemoved.addListener(function(tabID, changeInfo, tab){
	if (!facebookLoginComplete && facebookAppLoginTab!==undefined && facebookAppLoginTab==tabID)
		alertAppPermissionDenied();
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
				var str = JSON.stringify(data);
				alert("Worked\n"+str);
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