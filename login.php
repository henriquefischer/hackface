<?php
	require_once("face_rep/facebook.php");
	
	$cfg = array(
		"appId" => '515181028517183',
		"secret" => 'a59f564caf5743f523169f78540bfe74'
	);
	
	if (isset($_GET["error"])){
		header("HTTP/1.0 401 Unauthorized");
		$pageTitle = "ACCESS DENIED";
	}else{
		$facebook = new Facebook($cfg);
		try{
			$userData = $facebook->api('/me','GET');
			header("HTTP/1.0 200 OK");
			$pageTitle = "ACCESS ALLOWED! ".$facebook->getUser();
		}catch(FacebookApiException $e){
			$redirect = $facebook->getLoginUrl();
			header("Location: ".$redirect);
			die();
		}
	}
?>
<html>
	<head><title><?php echo $pageTitle; ?></title></head>
	<body></body>
</html>