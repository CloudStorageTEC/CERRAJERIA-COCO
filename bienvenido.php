<?php
include_once("modelo/ErroresAplic.php");
session_start(); 
$Err=-1;
$Tipo="";
$Nombre="";

	if (isset($_SESSION["NomFirmado"])){
        $Nombre = $_SESSION["NomFirmado"];      
		$Tipo = $_SESSION["TipoFirmado"];
	}
	else
		$Err = ErroresAplic::SIN_SESION;
	
	if ($Err != -1){
		header("Location: index.php?Error=".$Err);
		exit();
	}
include_once("cabecera.html");
?>
	<script src="js/menu.js"></script>
	<script type="text/javascript" src="js/ctrlBienvenido.js"></script>
</head>
    <body>
    </body>
</html>
