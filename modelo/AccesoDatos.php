<?php
 error_reporting(E_ALL ^ E_NOTICE);
 class AccesoDatos{
 private $Conexion=null; 
		
     	function conectar(){
		$bRet = false;
			try{
				$this->Conexion = new PDO("pgsql:dbname=cerrajeria; host=localhost; user=postgres; password=Cocotle15"); 
				$bRet = true;
			}catch(Exception $e){
				throw $e;
			}
			return $bRet;
		}
		
     	function desconectar(){
		$bRet = true;
			if ($this->Conexion != null){
				$this->Conexion=null;
			}
			return $bRet;
		}
		
      	function ejecutarConsulta($psConsulta){
		$arrRS = null;
		$rst = null;
		$oLinea = null;
		$sValCol = "";
		$i=0;
		$j=0;
			if ($psConsulta == ""){
		       throw new Exception("AccesoDatos->ejecutarConsulta: falta indicar la consulta");
			}
			if ($this->Conexion == null){
				throw new Exception("AccesoDatos->ejecutarConsulta: falta conectar la base");
			}
			try{
				$rst = $this->Conexion->query($psConsulta); //un objeto PDOStatement o falso en caso de error
			}catch(Exception $e){
				throw $e;
			}
			if ($rst){
				foreach($rst as $oLinea){ 
					foreach($oLinea as $llave=>$sValCol){
						if (is_string($llave)){
							$arrRS[$i][$j] = $sValCol;
							$j++;
						}
					}
					$j=0;
					$i++;
				}
			}
			return $arrRS;
		}


				/*Ejecuta en la base de datos el comando que recibió por parámetro
		Regresa
			el número de registros afectados por el comando*/
			function ejecutarComando($psComando){
				$nAfectados = -1;
				   if ($psComando == ""){
					   throw new Exception("AccesoDatos->ejecutarComando: falta indicar el comando");
					}
					if ($this->Conexion == null){
						throw new Exception("AccesoDatos->ejecutarComando: falta conectar la base");
					}
					try{
						  $nAfectados =$this->Conexion->exec($psComando);
					}catch(Exception $e){
						throw $e;
					}
					return $nAfectados;
				}

	}
 ?>