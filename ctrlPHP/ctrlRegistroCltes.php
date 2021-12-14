<?php 
include_once("../modelo/Administrador.php");
include_once("../modelo/Cliente.php");
include_once("../modelo/ErroresAplic.php");

$Error=-1;
$cliente1 = new Cliente();


	if(isset($_REQUEST['txtPss']) && !empty($_REQUEST['txtPss']) &&
	   isset($_REQUEST['txtCP']) && !empty($_REQUEST['txtCP']) &&
	   isset($_REQUEST['txtTelC']) && !empty($_REQUEST['txtTelC']) &&
	   isset($_REQUEST['txtEml']) && !empty($_REQUEST['txtEml']) &&
	   isset($_REQUEST['txtDic']) && !empty($_REQUEST['txtDic']) &&
	   isset($_REQUEST['txtNom']) && !empty($_REQUEST['txtNom'])){

		try{

			$cliente1->setPassword($_REQUEST['txtPss']);
			$cliente1->setNombre($_REQUEST['txtNom']);
			$cliente1->setCodigoPostal($_REQUEST['txtCP']);
			$cliente1->setDireccion($_REQUEST['txtDic']);
			$cliente1->setTelCelular(empty($_REQUEST['txtTelC']?0:$_REQUEST['txtTelC']));
			$cliente1->setEmail($_REQUEST['txtEml']);
            $Resultado=$cliente1->insertar();
         
			if($Resultado === false || $Resultado ==-1){
			$Error = ErroresAplic::ERROR_GUARDAR;
			}


		}catch(Exception $e){
			error_log($e->getFile()." ".$e->getLine()." ".$e->getMessage(),0);
			$Error = ErroresAplic::ERROR_EN_BD;
		}

	}else{
		$Error = ErroresAplic::FALTAN_DATOS;
	}
    
    if ($Error == -1)
		$sCadJson = 
		'{
			"success": true,
			"status": "ok",
			"data": {}
		}';
	else{
		$oErr = new ErroresAplic();
		$oErr->setError($Error);
		$sCadJson = 
		'{
			"success": false,
			"status": "'.$oErr->getTextoError().'",
			"data": {}
		}';
    }
    
	header('Content-type: application/json');
	echo $sCadJson;

 ?>