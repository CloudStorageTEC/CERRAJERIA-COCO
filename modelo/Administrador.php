<?php
error_reporting(E_ALL);
include_once("Usuario.php");

class Administrador extends Usuario {
private $Rfc;

	function __construct() {
	}

	public function buscarCvePwd() {
	$AccesoDat=new AccesoDatos();
	$Query="";
	$arrRS=null;
	$bRet = false;
		if (empty($this->Email) || empty($this->Password))
			throw new Exception("Administrador->buscarCvePwd: faltan datos");
		else{
			if ($AccesoDat->conectar()){
				$Query = " SELECT t1.ClaveUsu, t1.Nombre, t1.Email, t2.Rfc
							FROM usuario t1
							JOIN administrador t2 ON t2.ClaveUsu = t1.ClaveUsu
							WHERE t1.Email = '".$this->Email."'
							AND t1.Password = '".$this->Password."'";
				$arrRS = $AccesoDat->ejecutarConsulta($Query);
				$AccesoDat->desconectar();
				if ($arrRS){

					$this->ClaveUsu = $arrRS[0][0];
					$this->Nombre = $arrRS[0][1];
					$this->Email = $arrRS[0][2];
					$this->Rfc = $arrRS[0][3];
					$bRet = true;
				}
			}
		}
		return $bRet;
	}


	public function getRfc(){
       return $this->Rfc;
    }
	public function setRfc($valor){
       $this->Rfc = $valor;
    }
    
}
?>