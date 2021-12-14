<?php
error_reporting(E_ALL);
include_once("AccesoDatos.php");

abstract class Usuario {
protected $ClaveUsu;
protected $Nombre;
protected $Email;
protected $Password;
   
   function __construct() {
   }
   abstract public function buscarCvePwd();
   
   protected function getInsertar(){
      $sQuery = "";
         if (empty($this->Password) || empty($this->Nombre) || empty($this->Email))
            throw new Exception("Usuario->getInsertar: faltan datos");
         else{
            $sQuery = "INSERT INTO usuario (nombre, email, password) 
                     VALUES ('".$this->Nombre."', '".$this->Email."', '".$this->Password."');";
         }
         return $sQuery;
   }
	
    public function getClaveUsu(){
       return $this->ClaveUsu;
    }
	public function setClaveUsu($valor){
       $this->ClaveUsu = $valor;
    }
    
    public function getPassword(){
       return $this->Password;
    }
	public function setPassword($valor){
       $this->Password = $valor;
    }

    public function getEmail(){
      return $this->Email;
   }
   public function setEmail($valor){
      $this->Email = $valor;
   }

   public function getNombre(){
      return $this->Nombre;
   }
   public function setNombre($valor){
      $this->Nombre = $valor;
   }
}
?>