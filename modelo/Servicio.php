<?php
error_reporting(E_ALL);
include_once("AccesoDatos.php");

class Servicio{

 private $ClaveServ;
 private $Tipo;
 private $Precio;
 private $Descripcion;
 private $arrServicios;	

   function __construct() {
   }

	public function buscarFiltroTipo() {
	$oAccesoDatos=new AccesoDatos();
	$Query="";
	$arrRS=null;
	$arrRet=array();
  
   
		if ($oAccesoDatos->conectar()){

			$Query = "SELECT t1.ClaveServ, t1.Tipo, t1.Descripcion,  t1.Precio
					   FROM servicio t1
                  WHERE t1.Tipo = '".$this->Tipo."' 
					   ORDER BY t1.ClaveServ;
               ";
               
			$arrRS = $oAccesoDatos->ejecutarConsulta($Query);
			$oAccesoDatos->desconectar();
			if ($arrRS){
				$arrRet = array();
				foreach($arrRS as $arrLinea){
					$Serv = new Servicio();
					$Serv->setClaveServ($arrLinea[0]);
               $Serv->setTipo($arrLinea[1]);
					$Serv->setDescripcion($arrLinea[2]);
               $Serv->setPrecio($arrLinea[3]);
					$arrRet[] = $Serv; //más rápido que array_push($arrRet, $Serv)
				}
			}
		} 
		return $arrRet;
	}
   
      public function buscarFiltroTodos() {
         $oAccesoDatos=new AccesoDatos();
         $Query="";
         $arrRS=null;
         $arrRet=array();


            if ($oAccesoDatos->conectar()){
               $Query = 'SELECT t1.ClaveServ, t1.Tipo, t1.Descripcion, t1.Precio
                         FROM Servicio t1
                         ORDER BY t1.ClaveServ;
                     ';
               $arrRS = $oAccesoDatos->ejecutarConsulta($Query);
               $oAccesoDatos->desconectar();
               if ($arrRS){
                  $arrRet = array();
                  foreach($arrRS as $arrLinea){
                     $Serv = new Servicio();
                     $Serv->setClaveServ($arrLinea[0]);                 
                     $Serv->setTipo($arrLinea[1]);
                     $Serv->setDescripcion($arrLinea[2]);
                     $Serv->setPrecio($arrLinea[3]);
                     $arrRet[] = $Serv; //más rápido que array_push($arrRet, $Serv)
                  }
               }
            } 
            return $arrRet;
         }



            public function buscarTipos() {
               $oAccesoDatos=new AccesoDatos();
               $Query="";
               $arrRS=null;
               $arrRet=array();

      
                  if ($oAccesoDatos->conectar()){
                     $Query = 'SELECT distinct t1.Tipo
                               FROM Servicio t1;
                           ';
                     $arrRS = $oAccesoDatos->ejecutarConsulta($Query);
                     $oAccesoDatos->desconectar();
                     if ($arrRS){
                        $arrRet = array();
                        foreach($arrRS as $arrLinea){
                           $Serv = new Servicio();
                           $Serv->setTipo($arrLinea[0]);
                           $arrRet[] = $Serv; //más rápido que array_push($arrRet, $Serv)
                        }
                     }
                  } 
                  return $arrRet;
               }




    public function getClaveServ(){
       return $this->ClaveServ;
    }
	public function setClaveServ($valor){
       $this->ClaveServ = $valor;
    }

	public function getTipo(){
       return $this->Tipo;
    }
	public function setTipo($valor){
       $this->Tipo = $valor;
    }
    public function getPrecio(){
        return $this->Precio;
     }
     public function setPrecio($valor){
        $this->Precio = $valor;
     }
     
     public function getDescripcion(){
        return $this->Descripcion;
     }
     public function setDescripcion($valor){
        $this->Descripcion = $valor;
     }
	
    public function getServicios(){
       return $this->arrServicios;
    }
	public function setServicios($valor){
       $this->arrServicios = $valor;
    }
    
}