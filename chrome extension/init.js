// Global Data Variable:
// 	* This object holds all extension data.
//	* PROPERTIES:
//		@ 
var data;
data = loadStoredData();

if (!data.userIsLogged)
	facebookLoginUser();

