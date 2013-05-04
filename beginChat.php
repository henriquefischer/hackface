<?php
	require_once("face_rep/facebook.php");
	$cfg = array(
		"appId" => '515181028517183',
		"secret" => 'a59f564caf5743f523169f78540bfe74'
	);
	
	$facebook = new Facebook($cfg);

    $server = "us-cdbr-east-03.cleardb.com";
    $username = "b4daafba6ba450";
    $password = "655d7c91";
    $db = "heroku_153c66224a1b73c";
	
	$dbCon = new PDO("mysql:dbname=".$db.";host=".$server,$username,$password);

	$dbData = $dbCon->query("SELECT * FROM `atividade` WHERE `Usuario`=".$dbCon->quote($_GET["FACEBOOK_ID"]).";");
	if($dbData->rowCount()==1) $info = $dbData->fetch(PDO::FETCH_ASSOC);
	else{
		header("HTTP/1.0 403 Forbidden");
		die();
	}
	
	try{
		$userData = $facebook->api('/'.$_GET["FACEBOOK_ID"]."/",array(
			"fields"=>"inbox.limit(5).fields(unseen)",
			"access_token"=>$info["token"],
		));
		$chatData = $userData["inbox"]["data"];
		$requestData = array();
		foreach ($chatData as $index=>$chat){
			if ($chat["unseen"]==1){
				$singleChatData = $facebook->api('/'.$chat["id"]."/",array(
					"access_token"=>$info["token"],
				));
				$messages = array();
				foreach($singleChatData["comments"]["data"] as $index=>$comment)
					$message[] = array(
						"text"=>$comment["message"],
						"data"=>$comment["created_time"]
					);

				$requestData[] = array(
					"id"=>$singleChatData["id"],
					"from"=>array(
						"id"=>$singleChatData["from"]["id"],
						"nome"=>$singleChatData["from"]["name"],
					),
					"msg"=>$message
				);
			}
		}
		header("HTTP/1.0 200 OK");
		echo json_encode($requestData);
	}catch(FacebookApiException $e){
		echo $e->getMessage();
	}
?>