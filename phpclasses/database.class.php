<?php

/* # database.class.php
 * Implementação da classe de objeto Database.
 * A classe é responsável pelo controle de acesso à Database.
 */

class Database{
	/* ## Database Properties */
	const HOST = "mysql.itagaki.me";
	const USER = "fbhack_babilonia";
	const PASSWORD = "mansãobabilônia";
	const DATABASE = "proj_fbhackathon";
	private static $singletonLocked = false;
	private static $instance = NULL;
	/* 	# DEBUG */
	const DEBUG = true;
	
	/* ## View Function
		# __construct: Verifica se o objeto é singleton e instancia, caso positivo. */
	private function __construct(){
		try{
			self::$instance = new PDO("mysql:dbname=".self::DATABASE.";host=".self::HOST,self::USER,self::PASSWORD);
			self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			self::$instance->query("SET NAMES utf8;");
		}catch(PDOException $e){
			$message = "O Objeto de Banco de Dados não pode ser criado. ";
			if (Database::DEBUG) $message .= $e->getMessage()." (".$e->getCode().")";
			throw new Exception($message,1020001);
		}
	}
	/*	# __getInstance: Retorna a intancia atualmente sendo utilizada */
	public static function getInstance(){
		if (!self::$singletonLocked){
			new Database();
			self::$singletonLocked = true;
		} return self::$instance;
	}
}

/* # ERROR DOCUMENTATION
 * GENÉRICOS
 *		102-00-00: Não foi possível gerar um objeto de Banco de Dados.
 */
?>