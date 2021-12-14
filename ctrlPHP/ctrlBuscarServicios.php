<?php
include_once("../modelo/Servicio.php");
include_once("../modelo/ErroresAplic.php");
$Err=-1;
$ObjArt= new Servicio();
$arrEncontrado = array();
$CadJson = "";
	
	/*Verificar hayan indicado el tipo de servicio a buscar*/
    if (isset($_REQUEST["TipoServ"])){
		try{

  
            if((($_REQUEST["TipoServ"])=="Todos") ){
                $arrEncontrado = $ObjArt->buscarFiltroTodos();
            }
            else
                {
                $ObjArt->setTipo($_REQUEST["TipoServ"]);
                $arrEncontrado = $ObjArt->buscarFiltroTipo();
                }   
            

		}catch(Exception $e){
			//Enviar el error específico a la bitácora de php (dentro de php\logs\php_error_log
			error_log($e->getFile()." ".$e->getLine()." ".$e->getMessage(),0);
			$Err = ErroresAplic::ERROR_EN_BD;
		}
	}else
		$Err = ErroresAplic::FALTAN_DATOS;
	
	if ($Err==-1){
		$CadJson = '{
			"success": true,
			"status": "ok",
            "data":[';
            
        //Recorrer arreglo para llenar objetos
		foreach($arrEncontrado as $ObjArt){
			$CadJson = $CadJson.'{
							"ClaveServ": '.$ObjArt->getClaveServ().',
                            "Tipo": "'.$ObjArt->getTipo().'",
							"Descripcion": "'.$ObjArt->getDescripcion().'",
                            "Precio": '.$ObjArt->getPrecio().'                                      
						},';
		}
        //Sobra una coma, eliminarla
        if(count($arrEncontrado)>0)
        $CadJson = substr($CadJson,0, strlen($CadJson)-1);
		//Colocar cierre de arreglo y de objeto
		$CadJson =$CadJson.'
			]
        }';
        
	}
	else{
		$oErr = new ErroresAplic();
		$oErr->setError($Err);
		$CadJson = '{
			"success": false,
			"status": "'.$oErr->getTextoError().'",
			"data":[]
		}';
	}
	header('Content-type: application/json');
	echo $CadJson;
?>