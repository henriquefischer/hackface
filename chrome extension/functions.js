// #########################
// !! EXTENSION FUNCTIONS !!

//	Function: loadStoredData
//		load all locally stored data into object
//	Input:
//		# EMPTY
//	Output:
//		@dataObj (obj): Object containing all the locally stored data
function loadStoredData(){
	dataObj = localStorage.extensionData;
	if (dataObj === undefined) dataObj = new Object();
	else dataObj = JSON.parse(dataObj);

	return dataObj;
}

//	Function: facebookLoginUser
//		require user to login into facebook
//	Input:
//		# EMPTY
//	Output:
//		# true (bool): if user successfully logged in
//		# false (bool): whatever else happens
function facebookLoginUser(){
//	return false;
}

function alertAppPermissionDenied(){
	alert("Precisamos que você aceite nosso aplicativo.\nSua extensão não funcionará até que o login seja feito.");
	facebookLoginComplete = true;
	chrome.tabs.remove(facebookAppLoginTab);
}

function storeData(obj,label,data){
	localData = localStorage.extensionData;
	if (localData!==undefined) localData = JSON.parse(localData);
	else localData = new Object();
	
	localData[label] = data;
	localStorage.extensionData = JSON.stringify(localData);
	obj[label] = data;
}
