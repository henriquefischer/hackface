<?php	
	if (isset($_GET["error"])){
		header("HTTP/1.0 401 Unauthorized");
		$pageTitle = "ACCESS DENIED";
	}else{
		require_once("face_rep/facebook.php");
		$cfg = array(
			"appId" => '515181028517183',
			"secret" => 'a59f564caf5743f523169f78540bfe74'
		);

		$facebook = new Facebook($cfg);

		try{
			if(isset($_GET["FACEBOOK_ID_CHECK"])){
				$userData = $facebook->api('/'.$_GET["FACEBOOK_ID_CHECK"],'GET');
				header("HTTP/1.0 200 OK");
			}else{
				$userData = $facebook->api('/me','GET');
				header("HTTP/1.0 200 OK");
				$pageTitle = "ACCESS ALLOWED! ".$facebook->getUser();
			}
		}catch(FacebookApiException $e){
			if(isset($_GET["FACEBOOK_ID_CHECK"])){
				header("HTTP/1.0 403 Forbidden");
			}else{
				$redirect = $facebook->getLoginUrl(array(
					"scope" => "read_mailbox"
				));
				header("Location: ".$redirect);
				die();
			}
		}
	}
?>
<html>
	<head><title><?php echo $pageTitle; ?></title></head>
	<body></body>
</html>