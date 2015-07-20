<?php
include_once('bDoTtcennoC.php');
$PetsaMaabot = $_GET['Maabot'];
$PetsaPauli = $_GET['Pauli'];


$KwartoPagkaana = array();

$query = mysql_query("select t2.Seq,t2.rtid,min(t1.setrooms) as minimum, count(*) as numrec,t2.RoomType,t2.PriceNP,t2.PriceP,t2.PriceNP1,t2.PriceP1,t2.Startdate,adults,children,maxextra,RequiredPay,AgeRegarless,GDRNotApply 
from roomsetcalendar as t1 right join roomtypesetup as t2 on t1.rtid=t2.rtid  and t1.CDate <'$PetsaPauli' and t1.CDate>='$PetsaMaabot' and t1.setrooms<>0 and t1.rsvnrooms<t1.setrooms where t2.Inactive<>'Y' group by t1.rtid");


	while($row = mysql_fetch_array($query)){
	$KwartoPagkaana[] = array('Seq'=>$row['Seq'],	
					'rtid'=>$row['rtid'],
					'minimum'=>$row['minimum'],
					'numrec'=>$row['numrec'],
					'RoomType'=>$row['RoomType'],
					'PriceNP'=>$row['PriceNP'],
					'PriceP'=>$row['PriceP'],
					'PriceNP1'=>$row['PriceNP1'],
					'PriceP1'=>$row['PriceP1'],
					'Startdate'=>$row['Startdate']
					'adults'=>$row['adults'],
					'children'=>$row['children'],
					'maxextra'=>$row['maxextra'],
					'RequiredPay'=>$row['RequiredPay'],
					'AgeRegarless'=>$row['AgeRegarless'],
					'GDRNotApply'=>$row['GDRNotApply']);
					
	} 
	echo json_encode($KwartoPagkaana);	
?>
