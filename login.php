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
				$userToken = $facebook->getAccessToken();

				$url=parse_url(getenv("CLEARDB_DATABASE_URL"));
			
				$server = $url["host"];
				$username = $url["user"];
				$password = $url["pass"];
				$db = substr($url["path"],1);

				mysql_connect($server, $username, $password);
				mysql_select_db($db);
				$response = mysql_query("INSERT INTO `atividade` VALUES('".mysql_real_escape_string($facebook->getUser())."','1','".mysql_real_escape_string($userToken)."')
										ON DUPLICATE KEY UPDATE `atividade`.`token`='".mysql_real_escape_string($userToken)."';");
				if ($response){
					header("HTTP/1.0 200 OK");
					$pageTitle = "ACCESS ALLOWED! ".$facebook->getUser();
				}else{
					header("HTTP/1.0 403 Forbidden");
					$pageTitle = "ACCESS DENIED";
				}	
			}
		}catch(FacebookApiException $e){
			if(isset($_GET["FACEBOOK_ID_CHECK"])){
				header("HTTP/1.0 403 Forbidden");
			}else{
				$redirect = $facebook->getLoginUrl(array(
					"scope" => "read_mailbox, offline_access"
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