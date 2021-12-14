<?php
include_once("modelo/ErroresAplic.php");
session_start();

if (isset($_SESSION["NomFirmado"])){
	header("Location: bienvenido.php");
	exit();
}

include_once("cabecera.html");
?>
<script type="text/javascript" src="js/ctrlIndex.js"></script>
<script src="js/menu.js"></script>
<script src=js/SLIDER.js></script>
</head>
<body>
</body>
</html>