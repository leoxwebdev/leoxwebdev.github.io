<?php
include_once('bDoTtcennoC1.php');
$RmTypes = $_GET[RmTypes];

//$KwartoSetup = array();

//$query = mysql_query("select * from roomtypesetup where Inactive<>'Y'");

//$query = mysql_query("select * from roomtypesetup where ".$RmTypes." and Inactive<>'Y'");
$query = mysql_query("select RoomType,BreakP,BreakMsg from roomtypesetup where ".$RmTypes." and Inactive<>'Y'");

	while($row = mysql_fetch_array($query)){
	
	$roomBfastJSON[] = array('RoomType'=>$row['RoomType'],
					'BreakP'=>$row['BreakP'],
					'BreakMsg'=>$row['BreakMsg']);
	/*
	$roomBfastJSON[] = array('Seq'=>$row['Seq'],	
					'rtid'=>$row['rtid'],
					'minimum'=>$row['minimum'],
					'numrec'=>$row['numrec'],
					'RoomType'=>$row['RoomType'],
					'PriceNP'=>$row['PriceNP'],
					'PriceP'=>$row['PriceP'],
					'PriceNP1'=>$row['PriceNP1'],
					'PriceP1'=>$row['PriceP1'],
					'Startdate'=>$row['Startdate'],
					'BreakP'=>$row['BreakP'],
					'BreakMsg'=>$row['BreakMsg'],
					'adults'=>$row['adults'],
					'children'=>$row['children'],
					'maxextra'=>$row['maxextra'],
					'RequiredPay'=>$row['RequiredPay'],
					'AgeRegarless'=>$row['AgeRegarless'],
					'GDRNotApply'=>$row['GDRNotApply'],
					'PriceLO'=>$row['PriceLO'],
					'OptionLO'=>$row['OptionLO']);
	*/
	}
	echo json_encode($roomBfastJSON);	
?>
