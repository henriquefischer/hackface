<?php
	require_once("face_rep/facebook.php");
	
	$cfg = array(
		"appId" => '515181028517183',
		"secret" => 'a59f564caf5743f523169f78540bfe74'
	);

	$facebook = new Facebook($cfg);
	try{
		$userData = $facebook->api('/me','GET');
		header("HTTP/1.0 200 OK");
	}catch(FacebookApiException $e){
		$redirect = $facebook->getLoginUrl();
		header("Location: ".$redirect);
		die();
	}
?>