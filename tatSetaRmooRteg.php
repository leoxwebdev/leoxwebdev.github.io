<?php
include_once('bDoTtcennoC.php');
$ArrDate = $_GET[resArr] . "  00:00:00";
$DepDate = $_GET[resDep] . "  00:00:00";

$KwartoSetup = array();



//$query = mysql_query("select * from roomtypesetup where ".$RmTypes." and Inactive<>'Y'");
//$query = mysql_query("select * from roomtypesetup where Inactive<>'Y'");

//$query = mysql_query("SELECT cdate,rtid,caid,Dstat,SetRooms,RsvnRooms From roomsetcalendar where CDate < '$DepDate' and CDate >= '$ArrDate'");
//$query = mysql_query("SELECT count(*) as StatCnt,Dstat,rtid,cdate From roomsetcalendar where rtid=8 and CDate between '$ArrDate' and '$DepDate' group by Dstat,rtid,CDate between '$ArrDate' and '$DepDate'");
$query = mysql_query("SELECT Dstat,rtid,cdate From roomsetcalendar where rtid=8 and CDate between '$ArrDate' and '$DepDate' order by cdate");

	while($row = mysql_fetch_array($query)){
	
	$KwartoSetup[] = array('rtid'=>$row['rtid'],
					'cdate'=>$row['cdate'],
					'Dstat'=>$row['Dstat']);
	/*
	$KwartoSetup[] = array('rtid'=>$row['rtid'],
					'caid'=>$row['caid'],
					'Dstat'=>$row['Dstat'],
					'SetRooms'=>$row['SetRooms'],
					'cdate'=>$row['cdate'],
					'RsvnRooms'=>$row['RsvnRooms']);
	*/				
	/*
	$KwartoSetup[] = array('Seq'=>$row['Seq'],	
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
	echo json_encode($KwartoSetup);	
?>
