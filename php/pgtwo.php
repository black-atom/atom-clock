<?php
session_start();
// function ConectaBancoDados(){
// 	$servidor = 'suporte12-PC';
// 	$banco = 'pontosec';
// 	$usuario = 'sa';
// 	$senha = 'real_43690';
// 	$link = mysql_connect($servidor, $usuario, $senha);
//     $db = mysql_select_db($banco,$link);
    
// if(!$link){
//     echo "erro ao conectar ao banco de dados!";exit();
// 	}
// 	$sql = "SELECT *
//     FROM dbo.funcionarios 
//     WHERE n_pis = '13169204644'";
//     $exibe = mysql_fetch_assoc($sql);
//     echo "ID MLK". $exibe['id'];
    
// }


function BuscarAFD ($lnrs, $lnrsf,$IpEnvio){
	$lnrs = (int) $lnrs;
	$lnrsf = (int) $lnrsf;

	while($lnrs <= $lnrsf){
		echo "nrs atual:". (string) $lnrs . "<br />";
		EnviaMensagemPrisma($IpEnvio,$lnrs);

		
		$lnrs = (int) $lnrs + 1;
	}	
}


function gerar($sString) {
    if(!empty($sString)) {
        $sByteInicial = "02 ";
        $sTamanhoMensagem = gerarTamanhoString($sString);
        $sMensagem = stringParaHex($sString);
        $sCheckSun = gerarCheckSum($sString);
        $sByteFinal = " 03";
    
        return $sByteInicial . $sTamanhoMensagem . $sMensagem . $sCheckSun . $sByteFinal;
    } else
        return false;
}

function gerarTamanhoString($sString) {
    $nTamanhoString = strlen($sString); 
    $nHex1 = $nTamanhoString % 256;
    $nHex16 = (int) ($nTamanhoString / 256);
    
    $nHex1 = dechex($nHex1);
    if(strlen($nHex1) === 1) 
        $nHex1 = "0".$nHex1;
    
    $nHex16 = dechex($nHex16);
    if(strlen($nHex16) === 1) 
        $nHex16 = "0".$nHex16;

    $sResultado = $nHex1." ".$nHex16;   

    return strtoupper($sResultado); 
}

function stringParaHex($sString) {
    $sHex = "";
    $vString = str_split($sString); // Transforma a string em um Array
    foreach($vString as $sCharactere)  // Percorre cada charactere da string que agora é um Array
        $sHex .= " ".dechex(ord($sCharactere)); // Transforma esse charactere em ASCII e depois o converte para hexadecimal
    
    return strtoupper($sHex);  // Converte tudo para letras maiúsculas
}

function gerarCheckSum($sString) {
    $nTamanhoString = strlen($sString); 
    
    $sXor = "";
    $vString = str_split($sString);
    foreach($vString as $sCharactere) 

    $sXor ^= ord($sCharactere);
    $sXor ^= $nTamanhoString % 256;
   	$sXor ^= $nTamanhoString / 256;

    $nHex1 = $sXor % 16;
    $nHex16 = (int) ($sXor / 16);
    
    $sResultado = " ".dechex($nHex16) . dechex($nHex1);
    
    return strtoupper($sResultado);
        
       
    	

}

function hex2str($hex){
    $str='';
    for ($i=0; $i < strlen($hex)-1; $i+=2){
        $str .= chr(hexdec(substr($hex,$i,2)));
    }
    return $str;
}

function String2Hex($string){
    $hex='';
    for ($i=0; $i < strlen($string); $i++){
        $hex .= dechex(ord($string[$i]));
    }
    return $hex;
}
function EnviaMensagemPrisma ($IpEnvio, $NrsEnvio){
	
	$cod_msg = "00+RR+00+N]1]".$NrsEnvio;
	$cod_asc = gerar($cod_msg);
	$gera_asc = str_replace(" ","",$cod_asc);


	$host    = $IpEnvio;
	$port    = 3000;

	$msg = hex2str($gera_asc);
	//$msg = $gera_asc;
	//echo "Message To server :".$gera_asc."-------------".$gera_asc;
	// create socket
	$socket = socket_create(AF_INET, SOCK_STREAM, 0) or die("Could not create socket\n");
	socket_set_option($socket, SOL_SOCKET, SO_RCVTIMEO, array('sec' => 1, 'usec' => 0));
	socket_set_option($socket, SOL_SOCKET, SO_SNDTIMEO, array('sec' => 1, 'usec' => 0));
	// connect to server
	$result = socket_connect($socket, $host, $port) or die("Could not connect to server\n");  
	// send string to server
	socket_write($socket, $msg, strlen($msg)) or die("Could not send data to server\n");
	// get server response
    $msg1 = socket_read($socket,8192);
    //echo "<br>sent to server:$msg<br> response from server was:" . $msg1 . "<br>"; 
    
    $f=fopen("AFD.txt","a+");
    //echo (string) $msg1;
    $linha=(string) substr($msg1, 19, 34)."\n";
    fwrite($f,$linha);
    fclose($f);
    
    $f=fopen("Parsing.txt","a+");
    //echo (string) $msg1;
    $nsrLidoAfd = substr($msg1, 19, 9);
    $dv1 = substr($msg1, 28, 1);
    $nsrLidoAfd = substr($msg1, 19, 9);
    $data   = substr($msg1, 29, 8);
    $hora   = substr($msg1, 37, 2);
    $minuto = substr($msg1, 39, 2);
    $pis    = substr($msg1, 42, 11);
    $linha  = "NSR:".$nsrLidoAfd." "."Data: ".$data." Hora:".$hora.":".$minuto." pis".$pis." \n\n";
    fwrite($f,$linha);
    fclose($f);
	socket_close($socket);
}

?>
<html>
 <head>
  <title>Teste PHP</title>
 </head>
 <body>

 <?php 
 
	echo "<p>Olá Mundo</p>";
	$ip = $_SESSION['ip'];
	$nrs = $_SESSION['nrs'];
	$nrsf = $_SESSION['nrsf'];
	
	
	

	echo "IP: ". $ip. "<br />";
	$ip = "192.168.0.194";
	//$nrs = "79300";	
	//$nrsf = "79400";
	BuscarAFD($nrs, $nrsf,$ip);

	?>
 </body>
</html>