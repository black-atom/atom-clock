<?php
session_start();
$titulos

?>
<html>
	<head>
  		<title>Teste PHP</title>
		<meta charset="UTF-8">
	
	</head>
 	<body>
 	
	
	
 	<form action="" method="POST">
 	<input name="IP" id="IP" type="text" placeholder="IP DO RELOGIO" maxlength="150"/> <br>
 	<input name="NRS" id="NSR" type="text" placeholder="NSR inicial" maxlength="150"/> <br>
	<input name="NRSF" id="NSR" type="text" placeholder="NSR final" maxlength="150"/> <br>
 	<input type="submit"  name="ping" value="ping"></input>
 	<input type="submit"  method="POST" name="coleta" value="Coleta"></input>
 	</form>

 	<?php
		
		
if (isset($_POST['ping'])){
			$ip = $_POST['IP'];
			echo "IP: ". $ip. "<br />";
			echo "NRS: ". $_POST['NRS']. "<br />";
			
			exec('ping '.$ip , $saida, $retorno);

  			if (count($saida)) {
  				//$saida3=  implode( ',', $saida);
    			// print 'A Máquina está online e os dados do PING foram gravados em $saida. :)';
    			//var_dump ($saida);
    		print "<pre>";
			print_r($saida);
			print "</pre>";
    		} 	
    		else {
    			print 'A Máquina NÃO está online ou o host não pode ser encontrado. :(';
  			}

		}
		  	if(isset($_POST['coleta'])){
				$ip = $_POST['IP'];
				$nrs = $_POST['NRS'];
				$nrsf = $_POST['NRSF'];
				
				$_SESSION['nrs'] = $nrs;
				$_SESSION['nrsf'] = $nrsf;
				$_SESSION['ip'] = $ip;
				echo "aqui";
  				header("location:pgtwo.php");
  			}
	?>



<a href="teste2.php">tentar coletar</a>
 	</body>

</html>
