<?php
session_start();

if (isset($_SESSION["NomFirmado"])){
	header("Location: bienvenido.php");
	exit();
}

include_once("cabecera.html");
?>
<script type="text/javascript" src="js/ctrlLogin.js"></script>
</head>
<body>
</body>
</html>