<?php

    $url=parse_url(getenv("CLEARDB_DATABASE_URL"));

    $server = $url["host"];
    $username = $url["user"];
    $password = $url["pass"];
    $db = substr($url["path"],1);
	
	echo $server;

    mysql_connect($server, $username, $password);    
    mysql_select_db($db);
	
/*    $query="CREATE TABLE IF NOT EXISTS `accesstoken` (
			`UserID` bigint(20) unsigned NOT NULL,
			`Token` varchar(256) NOT NULL,
			UNIQUE KEY `UserID` (`UserID`)
			) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
		
	$response = mysql_query($query) or die(mysql_error());*/

?>