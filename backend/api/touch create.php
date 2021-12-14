<?php
require 'conexion.php';
// Get the posted data.
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
 // Extract the data.
 $request = json_decode($postdata);
 // Validate.
 if(trim($request->cve)==''|| trim($request->snombre) === '' || trim($request->sapepat) == '')
 {
 return http_response_code(400);
 }
 // Sanitize.
 $cve = mysqli_real_escape_string($con, trim($request->cve));
 $snombre = mysqli_real_escape_string($con, trim($request->snombre));
 $sapepat = mysqli_real_escape_string($con, trim($request->sapepat));
 // Create.
 $sql = "INSERT INTO `usuario`(`cve`,`snombre`,`sapepat`) VALUES ('{$cve}','{$snombre}','{$sapepat}')";
 if(mysqli_query($con,$sql))
 {
 http_response_code(201);
 $usuarios = [
 'cve' => $cve,
 'snombre' => $snombre,
 'sapepat' => $sapepat

 //'scveusuario' => mysqli_insert_id($con)
 ];
 echo json_encode($usuarios);
 }
 else
 {
 http_response_code(422);
 }
}
?>