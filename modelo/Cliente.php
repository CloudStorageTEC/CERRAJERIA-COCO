<?php
error_reporting(E_ALL);
include_once("Usuario.php");

class Cliente extends Usuario {

private $CodigoPostal;
private $Direccion;
private $TelCelular;

  
	function __construct() {
	}

	public function buscarCvePwd() {
	$AccesoDat=new AccesoDatos();
	$Query="";
	$arrRS=null;
	$bRet = false;
		if (empty($this->Email) || empty($this->Password))
			throw new Exception("Cliente->buscarCvePwd: faltan datos");
		else{
			if ($AccesoDat->conectar()){
				$Query = " SELECT t1.ClaveUsu, t1.Nombre, t1.Email, 
								  t2.Cp, t2.Direccion, t2.TelCelular
							FROM usuario t1
							JOIN cliente t2 ON t2.ClaveUsu = t1.ClaveUsu
							WHERE t1.Email = '".$this->Email."'
							AND t1.Password = '".$this->Password."'";
				$arrRS = $AccesoDat->ejecutarConsulta($Query);
				$AccesoDat->desconectar();
				if ($arrRS){
					$this->ClaveUsu = $arrRS[0][0];
					$this->Nombre = $arrRS[0][1];
					$this->Email = $arrRS[0][2];
					$this->CodigoPostal = $arrRS[0][3];
					$this->Direccion = $arrRS[0][4];
					$this->TelCelular = $arrRS[0][5];
					
					$bRet = true;
				}
			}
		}
		return $bRet;
	}

	public function insertar() {
		$AccesoDatos=new AccesoDatos();
		$Query="";
		$nRet= -1;
			//No pregunta por la clave porque se genera automáticamente
			if (empty($this->Password) ||
				empty($this->CodigoPostal)||
				empty($this->Direccion)||
				empty($this->TelCelular)||
				empty($this->Nombre)||
				empty($this->Email))
				throw new Exception("Cliente->insertar: faltan datos");
			else{
				if ($AccesoDatos->conectar()){
					/*En las bases de datos, por integridad referencial, primero se 
					  registra en la tabla independiente (usuario) y luego en la que tiene
					  la dependencia (cliente) y se hace uso de una transacción para que 
					  la clave del usuario no se vea afectada por el registro de otros 
					  usuarios de manera paralela.
					*/

					 $Query ="BEGIN;";
					 $Query = $Query.parent::getInsertar();
	
					 $Query = $Query." 
					 INSERT INTO cliente (claveusu, cp, direccion, telcelular)
					 values ((SELECT claveusu FROM usuario where claveusu = (SELECT MAX(claveusu) FROM usuario)),
					 ".$this->CodigoPostal.",'".$this->Direccion."',".$this->TelCelular.");";
					 $nRet= $AccesoDatos->ejecutarComando($Query);

					 $Query= "SELECT MAX(claveusu) FROM usuario;";
					 $this->ClaveUsu=($AccesoDatos->ejecutarConsulta($Query))[0][0];
                      
					 $nRet=$AccesoDatos->ejecutarComando("COMMIT;");
					 $AccesoDatos->desconectar();
				}
			}
			return $nRet;
		}

	public function getCodigoPostal(){
       return $this->CodigoPostal;
    }
	public function setCodigoPostal($valor){
       $this->CodigoPostal = $valor;
    }
	
	public function getDireccion(){
       return $this->Direccion;
    }
	public function setDireccion($valor){
       $this->Direccion = $valor;
    }
	
	public function getTelCelular(){
       return $this->TelCelular;
    }
	public function setTelCelular($valor){
       $this->TelCelular = $valor;
    }
	
}
?>