// Global Data Variable:
// 	* This object holds all extension data.
//	* PROPERTIES:
//		@ 
var data;
data = loadStoredData();

if (!(data.userID)){
	chrome.tabs.create({
		url: "agile-shore-9388.herokuapp.com/login.php",
		active: true
	});
}

//if (!(data.isConnected = facebookCheckUserConnection()))
if (!false)
	facebookLoginUser();

