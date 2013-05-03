<?php
	require_once("face_rep/facebook.php");
	require_once("phpclasses/database.class.php");
	
	$db = Database::getInstance();

	$config = array();
	$config['appId'] = '515181028517183';
	$config['secret'] = 'a59f564caf5743f523169f78540bfe74';

	$facebook = new Facebook($config);
  	$user_id = $facebook->getUser();
	
?>