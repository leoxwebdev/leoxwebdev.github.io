<?php
include_once('bDoTtcennoC1.php');

$guestId = $_GET[guestId];

$query = mysql_query( "select t1.numberofrooms,t2.* from guestreservert as t1 inner join roomtypesetup as t2 on t1.rtid=t2.rtid where t1.guestid=".$guestId );
//$query = mysql_query("select RoomType,BreakP,BreakMsg from roomtypesetup where ".$RmTypes." and Inactive<>'Y'");

	while( $row = mysql_fetch_array( $query ) ){
	
		$guestRoomJSON[] = array('numberofrooms'=>$row[ 'numberofrooms' ],
					'RTID'=>$row[ 'RTID' ],
					'roomtypedesc'=>$row[ 'RoomTypeDesc' ],
					'roomtype'=>$row[ 'RoomType' ],
					'BreakP'=>$row[ 'BreakP' ],
					'BreakMsg'=>$row[ 'BreakMsg' ],
					'adults'=>$row[ 'adults' ],
					'children'=>$row[ 'children' ],
					'RequiredPay'=>$row[ 'RequiredPay' ],
					'AgeRegarless'=>$row[ 'AgeRegarless' ],
					'WithVat'=>$row[ 'WithVat' ],
					'WithSC'=>$row[ 'WithSC' ],
					'GDRNotApply'=>$row[ 'GDRNotApply' ],
					'PriceNP'=>$row[ 'PriceNP' ],
					'PriceP'=>$row[ 'PriceP' ],
					'PriceNP1'=>$row[ 'PriceNP1' ],
					'PriceP1'=>$row[ 'PriceP1' ],
					'maxextra'=>$row[ 'maxextra' ],
					'startdate'=>$row[ 'startdate' ]);
	}
	echo json_encode($guestRoomJSON);	
?>
