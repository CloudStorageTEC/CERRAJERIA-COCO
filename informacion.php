<?php
session_start();
if (isset($_SESSION["NomFirmado"])){
	header("Location: bienvenido.php");
	exit();
}

include_once("cabecera.html");

?>
    <script src="js/menu.js"></script>
	<script type="text/javascript" src="js/ctrlInformacion.js"></script>
</head>
    <body>
    </body>
</html>