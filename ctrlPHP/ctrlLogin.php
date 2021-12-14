<?php
include_once("../modelo/Administrador.php");
include_once("../modelo/Cliente.php");
include_once("../modelo/ErroresAplic.php");
session_start(); //Le avisa al servidor que va a utilizar sesiones
$Error=-1;
$Usu = new Administrador();
$CadJson = "";
$Nombre="";
	/*Verifica que hayan llegado los datos*/
	if (isset($_REQUEST["txtEmailUsu"]) && !empty($_REQUEST["txtEmailUsu"]) &&
		isset($_REQUEST["txtPwdUsu"]) && !empty($_REQUEST["txtPwdUsu"])){
		try{
			//Pasa los datos al objeto
			$Usu->setEmail($_REQUEST["txtEmailUsu"]);
			$Usu->setPassword($_REQUEST["txtPwdUsu"]);
			//Busca en la base de datos
			if ($Usu->buscarCvePwd()){
				$_SESSION["NomFirmado"] = $Usu->getNombre();
				$_SESSION["TipoFirmado"] ="Administrador";
			}else {
				//Si no es empleado, es posible que sea cliente
				$Usu = new Cliente();
				$Usu->setEmail($_REQUEST["txtEmailUsu"]);
				$Usu->setPassword($_REQUEST["txtPwdUsu"]);
				if ($Usu->buscarCvePwd()){
					$_SESSION["NomFirmado"] = $Usu->getNombre();
					$_SESSION["TipoFirmado"] = "Cliente";
				}else //no es cliente ni empleado
					$Error = ErroresAplic::USR_DESCONOCIDO;
			}
		}catch(Exception $e){
			//Enviar el error específico a la bitácora de php (dentro de php\logs\php_error_log
			error_log($e->getFile()." ".$e->getLine()." ".$e->getMessage(),0);
			$Error = ErroresAplic::ERROR_EN_BD;
		}
	}
	else
		$Error = ErroresAplic::FALTAN_DATOS;
	
	if ($Error==-1){
		$CadJson = '{
			"success": true,
			"status": "ok",
			"data":{
				"NombreCompleto":"'.$_SESSION["NomFirmado"].'",
				"Tipo":"'.$_SESSION["TipoFirmado"].'"
			}
		}';
	}
	else{
		$oErr = new ErroresAplic();
		$oErr->setError($Error);
		$CadJson = '{
			"success": false,
			"status": "'.$oErr->getTextoError().'",
			"data":{}
		}';
	}
	header('Content-type: application/json');
	echo $CadJson;
?>