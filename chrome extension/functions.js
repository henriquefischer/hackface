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
	
	return false;
	
}
