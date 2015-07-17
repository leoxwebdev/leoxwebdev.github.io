<?php

include_once('bDoTtcennoC.php');

$ArrYear = $_POST['ArrYear'];
$ArrMonth = $_POST['ArrMonth'];
$ArrDay = $_POST['ArrDay'];

$DepYear = $_POST['DepYear'];
$DepMonth = $_POST['DepMonth'];
$DepDay = $_POST['DepDay'];

$Nights = $_POST['resNights'];
$Adults = $_POST['resAdults'];
$Children = $_POST['resChildren'];

$PetsaMaabot = $ArrYear . "-" . $ArrMonth . "-" . $ArrDay;
$PetsaPauli = $DepYear . "-" . $DepMonth . "-" . $DepDay;

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
					'Startdate'=>$row['Startdate'],
					'adults'=>$row['adults'],
					'children'=>$row['children'],
					'maxextra'=>$row['maxextra'],
					'RequiredPay'=>$row['RequiredPay'],
					'AgeRegarless'=>$row['AgeRegarless'],
					'GDRNotApply'=>$row['GDRNotApply'],
					'ArrYear'=>$ArrYear,
					'ArrMonth'=>$ArrMonth,
					'ArrDay'=>$ArrDay,
					'DepYear'=>$DepYear,
					'DepMonth'=>$DepMonth,
					'DepDay'=>$DepDay,
					'Nights'=>$Nights,
					'Adults'=>$Adults,
					'Children'=>$Children);
	} 
	//echo json_encode($KwartoPagkaana);
?>

<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1"> 
<title>Plantation Bay Resort and Spa: Book Now</title>
<link rel="Shortcut Icon" href="http://bmxt.com/leox/pbayImages/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" href="http://bmxt.com/leox/jqm145.css" />
<link rel="stylesheet" href="http://bmxt.com/leox/rlmj.css">
<link rel="stylesheet" href="creditcardjsDotCom.css">
<script src="http://bmxt.com/leox/jq211.js"></script>
<script type="text/javascript" src="http://bmxt.com/leox/rlmj.js"></script>
<script src="http://bmxt.com/leox/jqm145.js"></script>
</head>
<body>	
<!--Book Now -->
<div data-role="page" id="booknow">
	<div data-role="header">	
		<div class="headerwhole">
			<h1 class="pbayheadlogo">
				<img src="http://plantationbay.com/english/pbayImages/pbaylogo.png" alt="Logo - Plantation Bay Resort and Spa"/>
			</h1>
			<div class="linguahi">
				<ul class="langOptions action-bar clearfix">
					<li>Translate Page</li>
					<li><a href="http://plantationbay.com/english/pbayImages/english/" class="lang_link" data-ajax="false"><img src="http://plantationbay.com/english/images/flags/english.png" alt="" /><span class="langs"></span><span class="langtooltip">English</span></a></li>
					<li><a href="http://plantationbay.com/english/pbayImages/japanese/" class="lang_link" data-ajax="false"><img src="http://plantationbay.com/english/images/flags/japanese.png" alt="" /><span class="langs"></span><span class="langtooltip">Japanese</span></a></li>
					<li><a href="http://plantationbay.com/english/pbayImages/russian/" class="lang_link" data-ajax="false"><img src="http://plantationbay.com/english/images/flags/russian.png" alt="" /><span class="langs"></span><span class="langtooltip">Russian</span></a></li>
					<li><a href="http://plantationbay.com/english/pbayImages/english/" class="lang_link" data-ajax="false"><img src="http://plantationbay.com/english/images/flags/korean.png" alt="" /><span class="langs"></span><span class="langtooltip">Korean</span></a></li>
					<li><a href="http://plantationbay.com/english/pbayImages/english/" class="lang_link" data-ajax="false"><img src="http://plantationbay.com/english/images/flags/mandarin.png" alt="" /><span class="langs"></span><span class="langtooltip">Mandarin</span></a></li>
				</ul>
			</div>
			<img src="http://plantationbay.com/english/pbayImages/slogan.png" alt="Plantation Bay Slogan" class="pbayslogan" />	
			<a href="#BOOKNOWpanelMenu" class="MenuPanel ui-btn ui-btn-inline ui-btn-icon-right ui-icon-bars" data-rel="panel">MENU</a>   
			<section class="top-menus">
				<nav class="main" role="navigation">
					<a href="http://plantationbay.com/english/index.html" data-ajax="false" data-role="button">HOME</a>
					<a href="http://plantationbay.com/english/rooms.html" data-ajax="false" data-role="button">ROOMS</a>
					<a href="http://plantationbay.com/english/packages.html" data-ajax="false" data-role="button">PACKAGES</a>
					<a href="http://plantationbay.com/english/dining.html" data-ajax="false" data-role="button">DINING</a>
					<a href="http://plantationbay.com/english/spa.html" data-ajax="false" data-role="button">SPA</a>
					<a href="http://plantationbay.com/english/activities.html" data-ajax="false" data-role="button">ACTIVITIES</a>
					<a href="http://plantationbay.com/english/images.html" data-ajax="false" data-role="button">IMAGES</a>
					<a href="http://plantationbay.com/english/contact.html" data-ajax="false" data-role="button">CONTACT US</a>
					<a href="http://plantationbay.com/english/myreservation.html" data-ajax="false" data-role="button" class="btnSelected">MY RESERVATION</a>
				</nav>
			</section>
		</div>		
	</div>	
	<div data-role="content">
		<div class="spacer5px"></div>
		<h3 id="resDates" class="Tealcolor">Room types availability</h3>
		<div id="resRoomAvailability" class="ui-corner-all">
			<!--<div class="ui-bar ui-bar-a">				
				<h3 id="resDates">Room type(s) availability</h3>
			</div>-->
			<div id="resAllRooms" class="ui-body ui-body-a"  style="max-width:650px;padding-left:0;padding-right:0;margin-left:0;margin-right:0;">
						<table class="resBookNowAvail">
								<tr>
									<!--<td style="text-align:right;"><strong class="Tealcolor">Dates: </strong><span id="reservationDates"></span></td>-->
									<td style="text-align:right;"><strong class="Tealcolor">Dates: </strong></td>
									<td style="text-align:left;"><span id="reservationDates"></span></td>
									<td id="reservationGuests1" style="font:bold 14px Arial;"></td>
									<td id="reservationGuests"></td>
									<!--<td colspan="2" id="reservationGuests"></td>-->
								</tr>
								<tr id="resBookNowAvailFirstRow">
									<td colspan="4">
										<label for="showPreferredBooknow">SHOW ALL ROOM TYPES (Uncheck for preferred room type only).
										<input type="checkbox" name="showPreferredBooknow" id="showPreferredBooknow"></input></label>
									</td>
								</tr>
								<tr id="TRresWER" class="bookNowRoomAvail" style="display:none;">
									<td><a href="#resWERRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><img style="width:60px;" src="https://online.plantationbay.com/Picture/TWE.jpg" alt="" /></a></td>
									<td><a href="#resWERRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><strong> Water's Edge Room </strong><img src="images/info.png" alt="more details" /></a></td>
									<td></td>
									<td><select data-mini="true" data-native-menu="true" class="resNumReserveThis" name="numresWER" id="numresWER"><option selected value="0">0</option></select></td>
									</tr>
								<tr id="TRresLSR" class="bookNowRoomAvail" style="display:none;">
									<td><a href="#resLSRRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><img style="width:60px;" src="https://online.plantationbay.com/Picture/TLS.jpg" alt="" /></a></td>
									<td><a href="#resLSRRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><strong>Lagoon Side Room </strong><img src="images/info.png" alt="more details" /></a></td>
									<td></td>
									<td><select data-mini="true" data-native-menu="true" class="resNumReserveThis" name="numresLSR" id="numresLSR"><option selected value="0">0</option></select></td>
									</tr>
								<tr id="TRresLVR" class="bookNowRoomAvail" style="display:none;">
									<td><a href="#resLVRRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><img style="width:60px;" src="https://online.plantationbay.com/Picture/TLV.jpg" alt="" /></a></td>
									<td><a href="#resLVRRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><strong>Lagoon View Room </strong><img src="images/info.png" alt="more details" /></a></td>
									<td></td>
									<td><select data-mini="true" data-native-menu="true" class="resNumReserveThis" name="numresLVR" id="numresLVR"><option selected value="0">0</option></select></td>
									</tr>
								<tr id="TRresPSR" class="bookNowRoomAvail" style="display:none;">
									<td><a href="#resPSRRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><img style="width:60px;" src="https://online.plantationbay.com/Picture/TPS.jpg" alt="" /></a></td>
									<td><a href="#resPSRRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><strong>Poolside Room </strong><img src="images/info.png" alt="more details" /></a></td>
									<td></td>
									<td><select data-mini="true" data-native-menu="true" class="resNumReserveThis" name="numresPSR" id="numresPSR"><option selected value="0">0</option></select></td>
									</tr>
								<tr id="TRresSIR" class="bookNowRoomAvail" style="display:none;">
									<td><a href="#resSIRRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><img style="width:60px;" src="https://online.plantationbay.com/Picture/TSI.jpg" alt="" /></a></td>
									<td><a href="#resSIRRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><strong>Spa Indulgence Room & Package </strong><img src="images/info.png" alt="more details" /></a></td>
									<td></td>
									<td><select data-mini="true" data-native-menu="true" class="resNumReserveThis" name="numresSIR" id="numresSIR"><option selected value="0">0</option></select></td>
									</tr>
								<tr id="TRresFR" class="bookNowRoomAvail" style="display:none;">
									<td><a href="#resFRRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><img style="width:60px;" src="https://online.plantationbay.com/Picture/TFA.jpg" alt="" /></a></td>
									<td><a href="#resFRRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><strong>Family Room </strong><img src="images/info.png" alt="more details" /></a></td>
									<td></td>
									<td><select data-mini="true" data-native-menu="true" class="resNumReserveThis" name="numresFR" id="numresFR"><option selected value="0">0</option></select></td>
									</tr>
								<tr id="TRres1BS" class="bookNowRoomAvail" style="display:none;">
									<td><a href="#res1BSRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><img style="width:60px;" src="https://online.plantationbay.com/Picture/TBK.jpg" alt="" /></a></td>
									<td><a href="#res1BSRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><strong>One Bedroom Suite </strong><img src="images/info.png" alt="more details" /></a></td>
									<td></td>
									<td><select data-mini="true" data-native-menu="true" class="resNumReserveThis" name="numres1BS" id="numres1BS"><option selected value="0">0</option></select></td>
									</tr>
								<tr id="TRres2BS" class="bookNowRoomAvail" style="display:none;">
									<td><a href="#res2BSRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><img style="width:60px;" src="https://online.plantationbay.com/Picture/T2B.jpg" alt="" /></a></td>
									<td><a href="#res2BSRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><strong>Two Bedroom Suite </strong><img src="images/info.png" alt="more details" /></a></td>
									<td></td>
									<td><select data-mini="true" data-native-menu="true" class="resNumReserveThis" name="numres2BS" id="numres2BS"><option selected value="0">0</option></select></td>
									</tr>
								<tr id="TRresQV" class="bookNowRoomAvail" style="display:none;">
									<td><a href="#resQVRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><img style="width:60px;" src="https://online.plantationbay.com/Picture/TQV.jpg" alt="" /></a></td>
									<td><a href="#resQVRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><strong>Quantum Villa </strong><img src="images/info.png" alt="more details" /></a></td>
									<td></td>
									<td><select data-mini="true" data-native-menu="true" class="resNumReserveThis" name="numresQV" id="numresQV"><option selected value="0">0</option></select></td>
									</tr><!--
								<tr id="TRresPS" class="bookNowRoomAvail" style="display:none;">
									<td><a href="#resPSRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><img style="width:60px;" src="https://online.plantationbay.com/Picture/TPH.jpg" alt="" /></a></td>
									<td><a href="#resPSRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><strong>Penthouse Suite </strong><img src="images/info.png" alt="more details" /></a></td>
									<td></td>
									<td><select data-mini="true" data-native-menu="true" class="resNumReserveThis" name="numresPS" id="numresPS"><option selected value="0">0</option></select></td>
									</tr>-->
								<tr id="TRresRS" class="bookNowRoomAvail" style="display:none;">
									<td><a href="#resRSRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><img style="width:60px;" src="https://online.plantationbay.com/Picture/TRS.jpg" alt="" /></a></td>
									<td><a href="#resRSRoomDetailspop" data-rel="popup" data-position-to="window" data-transition="flip"><strong>Riverboat Suite  </strong><img src="images/info.png" alt="more details" /></a></td>
									<td></td>
									<td><select data-mini="true" data-native-menu="true" class="resNumReserveThis" name="numresRS" id="numresRS"><option selected value="0">0</option></select></td>
									</tr>
								<tr id="TRBookNowLast">	
								
									<td colspan="4">
										<span>
											<label for="bookShowAllAvailable">SHOW AVAILABLE ONLY (Uncheck to show not available).
											<input type="checkbox" id="bookShowAllAvailable" name="bookShowAllAvailable" data-inline="true" data-mini="true"></input></label>											
										</span>
										<a id="reservationBack" data-role="button" data-mini="true" data-inline="true" data-rel="back" data-transition="slide" data-direction="reverse">BACK</a>
										<button id="ReservedTheseRooms" data-inline="true">RESERVED THESE ROOM(S)</button>
									</td>
								</tr>
						</table>
						
						<div data-role="popup" id="resWERRoomDetailspop" data-overlay-theme="b" class="ui-content">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<div class="popHead"
								<h3 class="iCenter">Water's Edge Room</h3>
							</div>	
							<div  class="popSudlanan">
								<div class="IpatungaInlineBlock roomAndDetails">
									<img class="IpatungaDblock" title="Water's Edge Room" src="https://online.plantationbay.com/Picture/watersedge.jpg" />
									<p class="iLeft">Our most sought-after room, located right at the edge of our lagoon. It has a luxurious bathroom with separate tub and shower, and a spacious balcony. You can be in the water in 0-2 seconds (not suitable for children and infants).</p>
								</div>
								<div class="IpatungaInlineBlock roomAndDetails">			
									<ul data-role="listview" data-inset="true" data-corners="false">
										<li data-role="list-divider">Bed Configuration</li>
										<li>1 king or 2 queen beds</li>
										<li data-role="list-divider">Recommended Room Capacity</li>
										<li>2 adults</li>
										<li data-role="list-divider">Maximum Capacity</li>
										<li>4 adults. 3rd and 4th adult charged at $20++ per person</li>
										<li data-role="list-divider">Extra Bed</li>
										<li>''Futon'' mattress is available upon request for rooms with 1 king bed and not with 2 queen beds</li>
									</ul>
									<table class="roomDetailsTbl">
										<tr><td>Non-Peak Rate </td>
											<td class="rateNP">220++</td>
										</tr>
										<tr><td>Peak Period Rate</td>
											<td class="rateP">270++</td>
										</tr>
										<tr><td>Great Discounted Rate for stays of 6 nights or more. </td>
											<td class="rateGD">165++</td>
										</tr>
									</table>
									<p class="iCenter">* Current rates are <span style="color:red;">exclusive</span> of tax and service charge. (Breakfast not included.)</p>
								</div>
							</div>
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow" style="background-color:rgb(1,75,66);color:white;text-shadow:none;">Close</a>
						</div>					
						<!-- end Water's Edge Room page --> 

						<!-- Lagoon Side Room -->
						<div data-role="popup" id="resLSRRoomDetailspop" data-overlay-theme="b" class="ui-content">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<h3 class="iCenter">Lagoon Side Room</h3>							
							<div class="iCenter">
								<div class="IpatungaInlineBlock roomAndDetails">
									<img class="IpatungaDblock" title="Lagoon Side Room" src="https://online.plantationbay.com/Picture/lagoonside_nile.jpg" />
									<p class="iLeft">Our most popular room, identical in layout to the Water’s Edge Room.  Splendid views of our magnificent private lagoon and beaches.  These rooms feature balconies with close access to the beach.  You can be in the water in one minute or less.  Preferred by couples and families with up to two youngsters.  Though the rooms are not expressly equipped for the disabled, all are at ground level.  (By the way, complimentary motorized personal mobility devices are provided upon request, subject to availability).</p>
								</div>
								<div class="IpatungaInlineBlock roomAndDetails">			
									<ul data-role="listview" data-inset="true" data-corners="false">
										<li data-role="list-divider">Bed Configuration</li>
										<li>1 king or 2 queen beds</li>			
										<li data-role="list-divider">Recommended Room Capacity</li>
										<li>2 adults and 2 children 17 years old and below</li>		
										<li data-role="list-divider">Maximum Capacity</li>
										<li>4 persons. 3rd and 4th adult charged at $20++ per person</li>
										<li data-role="list-divider">Extra Bed</li>
										<li>''Futon'' mattress is available upon request for rooms with 1 king bed and not with 2 queen beds</li>
									</ul>
									<table class="roomDetailsTbl">
										<tr><td>Non-Peak Rate </td>
											<td class="rateNP">200++</td>
										</tr>
										<tr><td>Peak Period Rate</td>
											<td class="rateP">250++</td>
										</tr>
										<tr><td>Great Discounted Rate for stays of 6 nights or more. </td>
											<td class="rateGD">150++</td>
										</tr>
									</table>
									<p class="iCenter">* Current rates are <span style="color:red;">exclusive</span> of tax and service charge. (Breakfast not included.)</p>
								</div>
							</div>
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow" style="background-color:rgb(1,75,66);color:white;text-shadow:none;">Close</a>
						</div>
						<!-- end Lagoon Side Room page --> 
						<!-- Lagoon View Room -->
						<div data-role="popup" id="resLVRRoomDetailspop" data-overlay-theme="b" class="ui-content">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<h3 class="iCenter">Lagoon View Room</h3>								
							<div class="iCenter">
								<div class="IpatungaInlineBlock roomAndDetails">	
									<img class="IpatungaDblock" title="Lagoon View Room" src="https://online.plantationbay.com/Picture/lagoonview.jpg" />
									<p class="iLeft">Identical to the Water’s Edge Room but situated on a second floor or a few yards further from the beach.</p>
								</div>
								<div class="IpatungaInlineBlock roomAndDetails">		
									<ul data-role="listview" data-inset="true" data-corners="false">
										<li data-role="list-divider">Bed Configuration</li>
										<li>1 king or 2 queen beds</li>			
										<li data-role="list-divider">Recommended Room Capacity</li>
										<li>2 adults and 2 children 17 years old and below</li>		
										<li data-role="list-divider">Maximum Capacity</li>
										<li>4 persons. 3rd and 4th adult charged at $20++ per person</li>
										<li data-role="list-divider">Extra Bed</li>
										<li>''Futon'' mattress is available upon request for rooms with 1 king bed and not with 2 queen beds</li>
									</ul>
									<table class="roomDetailsTbl">
										<tr><td>Non-Peak Rate </td>
											<td class="rateNP">190++</td>
										</tr>
										<tr><td>Peak Period Rate</td>
											<td class="rateP">240++</td>
										</tr>
										<tr><td>Great Discounted Rate for stays of 6 nights or more. </td>
											<td class="rateGD">142.5++</td>
										</tr>
									</table>
									<p class="iCenter">* Current rates are <span style="color:red;">exclusive</span> of tax and service charge. (Breakfast not included.)</p>
								</div>
							</div> 
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow" style="background-color:rgb(1,75,66);color:white;text-shadow:none;">Close</a>
						</div>
						<!-- end Lagoon View Room Room page --> 

						<!-- Poolside Room -->				
						<div data-role="popup" id="resPSRRoomDetailspop" data-overlay-theme="b" class="ui-content">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<h3 class="iCenter">Poolside Room</h3>								
							<div class="iCenter">
								<div class="IpatungaInlineBlock roomAndDetails">	
									<img class="IpatungaDblock" title="Poolside Room" src="https://online.plantationbay.com/Picture/poolsideroom.jpg" />
									<p class="iLeft">Built around a small quasi-private pool, (about 453sqm, 3ft deep, ideal for smaller children) these rooms have a friendly village feel suitable for families, singles, and large groups of all kinds. The views are considerably inferior to those elsewhere in the hotel but the rooms are more spacious.</p>
								</div>
								<div class="IpatungaInlineBlock roomAndDetails">
									<ul data-role="listview" data-inset="true" data-corners="false">
										<li data-role="list-divider">Bed Configuration</li>
										<li>2 queen beds</li>
										<li data-role="list-divider">Recommended Room Capacity</li>
										<li>2 adults and 2 children 17 years old and below</li>
										<li data-role="list-divider">Maximum Capacity</li>
										<li>4 persons. 3rd and 4th adult charged at $20++ per person</li>
										<li data-role="list-divider">Extra Bed</li>
										<li>Not available.</li>
									</ul>
									<table class="roomDetailsTbl">
										<tr><td>Non-Peak Rate </td>
											<td class="rateNP">160++</td>
										</tr>
										<tr><td>Peak Period Rate</td>
											<td class="rateP">210++</td>
										</tr>
										<tr><td>Great Discounted Rate for stays of 6 nights or more. </td>
											<td class="rateGD">120++</td>
										</tr>
									</table>
									<p class="iCenter">* Current rates are <span style="color:red;">exclusive</span> of tax and service charge. (Breakfast not included.)</p>
								</div>
							</div>
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow" style="background-color:rgb(1,75,66);color:white;text-shadow:none;">Close</a>
						</div>
						<!-- end Poolside Room Room page --> 
						<!-- Spa Indulgence Room and Package -->					
						<div data-role="popup" id="resSIRRoomDetailspop" data-overlay-theme="b" class="ui-content">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<h3 class="iCenter">Spa Indulgence Room &amp; Package</h3>							
							<div class="iCenter">
								<div class="IpatungaInlineBlock roomAndDetails">		
									<img class="IpatungaDblock" title="Spa Indulgence Room and Package" src="https://online.plantationbay.com/Picture/spaindulgenceroom.jpg" />
									<p class="iLeft">Zen inspired room located inside Mogambo Spring’s stunning 18th century Japanese Village setting.</p>
									<p class="iLeft">The room’s furniture includes a low Japanese bed and Japanese table with zabuton (not for the arthritic!).  It is a bit smaller than our regular rooms, and has no view from the inside (but a stunning view of our spa as soon as you step out).</p>
									<p class="iLeft">The daily rate includes the guest room, a herbal or a floral bath for two, an aromatherapy oil massage for two, unlimited use of the spa facilities, and spa products as souvenirs - all a great value for spa enthusiasts.</p>
								</div>
								<div class="IpatungaInlineBlock roomAndDetails">			
									<ul data-role="listview" data-inset="true" data-corners="false">
										<li data-role="list-divider">Bed Configuration</li>
										<li>1 queen bed</li>			
										<li data-role="list-divider">Maximum Capacity</li>
										<li>2 adults. Children 17 years and below are not allowed.<br>Not suitable for persons with disabilities.</li>		
										<li data-role="list-divider">Extra Bed</li>
										<li>Not applicable.</li>
										<li data-role="list-divider">Inclusions</li>
										<li>Overnight stay at the Spa Indulgence Room<br />
											Welcome leis and tropical drinks upon arrival<br />
											Seaweed Salt Bath<br />
											Aromatherapy Oil Massage for two persons<br />
											Complimentary use of spa facilities<br />
											Spa products as souvenirs
										</li>
									</ul>
									<table class="roomDetailsTbl">
										<tr><td>Non-Peak Rate </td>
											<td class="rateNP">190++</td>
										</tr>
										<tr><td>Peak Period Rate</td>
											<td class="rateP">240++</td>
										</tr>
									</table>
									<p class="iCenter">(Advance full payment is required for Spa Indulgence Room and Package.)</p>
									<p class="iCenter">* Current rates are <span style="color:red;">exclusive</span> of tax and service charge. (Breakfast not included.)</p>
								</div>
							</div>
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow" style="background-color:rgb(1,75,66);color:white;text-shadow:none;">Close</a>
						</div>
						<!-- end Spa Indulgence Room and Package page --> 
						<!-- Family Room -->				
						<div data-role="popup" id="resFRRoomDetailspop" data-overlay-theme="b" class="ui-content">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<h3 class="iCenter">Family Room</h3>								
							<div class="iCenter">
								<div class="IpatungaInlineBlock roomAndDetails">				
									<img class="IpatungaDblock" title="Family Room" src="https://online.plantationbay.com/Picture/familyroom.jpg" />
									<p class="iLeft">These charming and spacious rooms are ideal for large families.  Equipped with a TV and DVD player, gaming machine for the children, bean bags, a dining area and complimentary minibar beverages and light snacks upon arrival.  Located on the second and third floors, but lacking a balcony and views are impaired.  Please note that guests are requested to bring their own DVD's. </p>
								</div>
								<div class="IpatungaInlineBlock roomAndDetails">		
									<ul data-role="listview" data-inset="true" data-corners="false">
										<li data-role="list-divider">Bed Configuration</li>
										<li>1 queen and 2 bunk beds</li>				
										<li data-role="list-divider">Maximum Room Capacity</li>
										<li>4 adults and 2 children</li>
										<li data-role="list-divider">Extra Bed</li>
										<li>Not available.</li>
									</ul>
									<table class="roomDetailsTbl">
										<tr><td>Non-Peak Rate </td>
											<td class="rateNP">200++</td>
										</tr>
										<tr><td>Peak Period Rate</td>
											<td class="rateP">250++</td>
										</tr>
										<tr><td>Great Discounted Rate for stays of 6 nights or more. </td>
											<td class="rateGD">150++</td>
										</tr>
									</table>
									<p class="iCenter">* Current rates are <span style="color:red;">exclusive</span> of tax and service charge. (Breakfast not included.)</p>
								</div>
							</div>
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow" style="background-color:rgb(1,75,66);color:white;text-shadow:none;">Close</a>
						</div>
						<!-- end Family Room page --> 
						<!-- One Bedroom Suite Room -->	
						<div data-role="popup" id="res1BSRoomDetailspop" data-overlay-theme="b" class="ui-content">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<h3 class="iCenter">One Bedroom Suite</h3>							
							<div class="iCenter">
								<div class="IpatungaInlineBlock roomAndDetails">				
									<img class="IpatungaDblock" title="One Bedroom Suite" src="https://online.plantationbay.com/Picture/1bedroomsuite.jpg" />
									<p class="iLeft">Master's bedroom with extra-large bathroom, living room with sofa-bed, powder room, extra-large balcony. Splendid views of our magnificent private lagoon and beaches. Balcony opens directly onto beach. Preferred by top executives and couples with one or two older children.</p>
								</div>
								<div class="IpatungaInlineBlock roomAndDetails">					
									<ul data-role="listview" data-inset="true" data-corners="false">
										<li data-role="list-divider">Bed Configuration</li>
										<li>1 king or 2 queen beds</li>			
										<li data-role="list-divider">Recommended Room Capacity</li>
										<li>3 adults and 2 children 17 years old and below</li>		
										<li data-role="list-divider">Maximum Capacity</li>
										<li>5 persons. 4th and 5th adult charged at $20++ per person</li>
										<li data-role="list-divider">Extra Bed</li>
										<li>''Futon'' mattress is available upon request for rooms with 1 king bed and not with 2 queen beds</li>
									</ul>
									<table class="roomDetailsTbl">
										<tr><td>Non-Peak Rate </td>
											<td class="rateNP">250++</td>
										</tr>
										<tr><td>Peak Period Rate</td>
											<td class="rateP">300++</td>
										</tr>
										<tr><td>Great Discounted Rate for stays of 6 nights or more. </td>
											<td class="rateGD">187.5++</td>
										</tr>
									</table>
									<p class="iCenter">* Current rates are <span style="color:red;">exclusive</span> of tax and service charge. (Breakfast not included.)</p>
								</div>
							</div>
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow" style="background-color:rgb(1,75,66);color:white;text-shadow:none;">Close</a>
						</div>
						<!-- end One Bedroom Suite Room page --> 

						<!-- Two Bedroom Suite Room -->					
						<div data-role="popup" id="res2BSRoomDetailspop" data-overlay-theme="b" class="ui-content">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<h3 class="iCenter">Two Bedroom Suite</h3>								
							<div class="iCenter">
								<div class="IpatungaInlineBlock roomAndDetails">				
									<img class="IpatungaDblock" title="Two Bedroom Suite" src="https://online.plantationbay.com/Picture/2bedroomsuite.jpg" />
									<p class="iLeft">Two master's bedrooms both with extra-large bathrooms, living room with powder room. These suites are on the second floor and enjoy excellent views with an open-air lounge and sitting area.  The most popular choice for two couples vacationing together, and families with several children/nannies.</p>
								</div>
								<div class="IpatungaInlineBlock roomAndDetails">					
									<ul data-role="listview" data-inset="true" data-corners="false">
										<li data-role="list-divider">Bed Configuration</li>
										<li>Varying</li>			
										<li data-role="list-divider">Recommended Room Capacity</li>
										<li>6 persons regardless of age</li>		
										<li data-role="list-divider">Maximum Capacity</li>
										<li>8 persons. 7th and 8th person charged at $20++ per person</li>
										<li data-role="list-divider">Extra Bed</li>
										<li>''Futon'' mattress is available upon request for rooms with 1 king bed and not with 2 queen beds</li>
									</ul>
									<table class="roomDetailsTbl">
										<tr><td>Non-Peak Rate </td>
											<td class="rateNP">380++</td>
										</tr>
										<tr><td>Peak Period Rate</td>
											<td class="rateP">480++</td>
										</tr>
										<tr><td>Great Discounted Rate for stays of 6 nights or more. </td>
											<td class="rateGD">285++</td>
										</tr>
									</table>
									<p class="iCenter">* Current rates are <span style="color:red;">exclusive</span> of tax and service charge. (Breakfast not included.)</p>
								</div>
							</div>
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow" style="background-color:rgb(1,75,66);color:white;text-shadow:none;">Close</a>
						</div>
						<!-- end Two Bedroom Suite Room page --> 

						<!-- Quantum Villa Room -->			
						<div data-role="popup" id="resQVRoomDetailspop" data-overlay-theme="b" class="ui-content">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<h3 class="iCenter">Quantum Villa</h3>							
							<div class="iCenter">
								<div class="IpatungaInlineBlock roomAndDetails">				
									<img class="IpatungaDblock" title="Quantum Villa" src="https://online.plantationbay.com/Picture/quantumvilla.jpg" />
									<p class="iLeft">A cabana-type suite with 4 detached bedrooms, private dipping pool and gazebo. Also with an air-conditioned pavilion ideal for meetings or family gatherings.</p>
								</div>
								<div class="IpatungaInlineBlock roomAndDetails">					
									<ul data-role="listview" data-inset="true" data-corners="false">
										<li data-role="list-divider">Includes:</li>
										<li>VIP Express Package. A private chauffeur-driven car to and from the hotel.</li>
										<li>Check-in and check-out in the privacy of your room without passing through the lobby.</li>
										<li>Complimentary minibar beverages and light snacks upon arrival.</li>
										<li>Daily afternoon High Tea Service.</li>
									</ul>
									<ul data-role="listview" data-inset="true" data-corners="false">
										<li data-role="list-divider">Bed Configuration</li>
										<li>2 rooms with 1 king bed, and 2 rooms with 2 queen beds</li>			
										<li data-role="list-divider">Recommended Suite Capacity</li>
										<li>8 adults and 8 children 17 years old and below</li>		
										<li data-role="list-divider">Maximum Capacity</li>
										<li>12 adults. 9th to 12th adult charged at $20++ per person</li>
										<li data-role="list-divider">Extra Bed</li>
										<li>''Futon'' mattress is available upon request for rooms with 1 king bed and not with 2 queen beds</li>
									</ul>
									<table class="roomDetailsTbl">
										<tr><td>Non-Peak Rate </td>
											<td class="rateNP">1000++</td>
										</tr>
										<tr><td>Peak Period Rate</td>
											<td class="rateP">1100++</td>
										</tr>
										<tr><td>Great Discounted Rate for stays of 6 nights or more. </td>
											<td class="rateGD">750++</td>
										</tr>
									</table>	
									<p>(Advance full payment is required for this one of a kind suite room.)</p>
									<p class="iCenter">* Current rates are <span style="color:red;">exclusive</span> of tax and service charge. (Breakfast not included.)</p>
								</div>
							</div>
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow" style="background-color:rgb(1,75,66);color:white;text-shadow:none;">Close</a>
						</div>
						<!-- end Quantum Villa Room page --> 

						<!-- Penthouse Suite Room -->
						<div data-role="popup" id="resPSRoomDetailspop" data-overlay-theme="b" class="ui-content">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<h3 class="iCenter">Penthouse Suite</h3>								
							<div class="iCenter">
								<div class="IpatungaInlineBlock roomAndDetails">				
									<img class="IpatungaDblock" title="Penthouse Suite" src="https://online.plantationbay.com/Picture/penthousesuite.jpg" />
									<p class="iLeft">A 2-bedroom suite on two floors. A fitting choice for top executives and dignitaries, or larger family groups.  An open-air lounge and sitting area is perfect for entertaining, with commanding views of the resort.</p>
									<ul data-role="listview" data-inset="true" data-corners="false">
										<li data-role="list-divider">Includes:</li>
										<li>VIP Express Package. A private chauffeur-driven car to and from the hotel.</li>
										<li>Check-in and check-out in the privacy of your room without passing through the lobby.</li>
										<li>Complimentary minibar beverages and light snacks upon arrival.</li>
									</ul>
								</div>
								<div class="IpatungaInlineBlock roomAndDetails">					
									<ul data-role="listview" data-inset="true" data-corners="false">
										<li data-role="list-divider">Master's Bedroom</li>
										<li>1 king bed, overlooks Mogambo Falls and has a private terrace</li>			
										<li data-role="list-divider">Second Bedroom</li>
										<li>2 queen beds, has wraparound views</li>		
										<li data-role="list-divider">Recommended Suite Capacity</li>
										<li>6 persons regardless of age</li>
										<li data-role="list-divider">Maximum Capacity</li>
										<li>8 persons. 7th and 8th person charged at $20++ per person</li>
										<li data-role="list-divider">Extra Bed</li>
										<li>''Futon'' mattress is available upon request.</li>		
									</ul>
									<table class="roomDetailsTbl">
										<tr><td>Non-Peak Rate </td>
											<td class="rateNP">500++</td>
										</tr>
										<tr><td>Peak Period Rate</td>
											<td class="rateP">600++</td>
										</tr>
										<tr><td>Great Discounted Rate for stays of 6 nights or more. </td>
											<td class="rateGD">375++</td>
										</tr>
									</table>	
									<p>(Advance full payment is required for this one of a kind suite room.)</p>
									<p class="iCenter">* Current rates are <span style="color:red;">exclusive</span> of tax and service charge. (Breakfast not included.)</p>
								</div>
							</div>
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow" style="background-color:rgb(1,75,66);color:white;text-shadow:none;">Close</a>
						</div>
						<!-- end Penthouse Suite Room page --> 

						<!-- Riverboat Suite Room -->
					
						<div data-role="popup" id="resRSRoomDetailspop" data-overlay-theme="b" class="ui-content">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<h3 class="iCenter">Riverboat Suite</h3>							
							<div class="iCenter">
								<div class="IpatungaInlineBlock roomAndDetails">				
									<img class="IpatungaDblock" title="Riverboat Suite" src="https://online.plantationbay.com/Picture/riverboatsuite.jpg" />
									<p class="iLeft">A 2-bedroom cottage with an open-air living room, built on stilts over flowing water, beautifully shaded by spreading acacia trees.  Rustic yet elegant, this suite will appeal to all kinds of visitors from honeymooners to family groups to celebrities.</p>
									<ul data-role="listview" data-inset="true" data-corners="false">
										<li data-role="list-divider">Includes:</li>
										<li>VIP Express Package. A private chauffeur-driven car to and from the hotel.</li>
										<li>Check-in and check-out in the privacy of your room without passing through the lobby.</li>
										<li>Complimentary minibar beverages and light snacks upon arrival.</li>
									</ul>
								</div>
								<div class="IpatungaInlineBlock roomAndDetails">					
									<ul data-role="listview" data-inset="true" data-corners="false">
										<li data-role="list-divider">First Bedroom</li>
										<li>1 king bed</li>			
										<li data-role="list-divider">Second Bedroom</li>
										<li>2 queen beds</li>		
										<li data-role="list-divider">Recommended Room Capacity</li>
										<li>6 persons regardless of age</li>
										<li data-role="list-divider">Maximum Capacity</li>
										<li>8 persons. 7th and 8th person charged at $20++ per person</li>
										<li data-role="list-divider">Extra Bed</li>
										<li>''Futon'' mattress is available upon request for room with 1 king bed and not with 2 queen beds</li>		
									</ul>
									<table class="roomDetailsTbl">
										<tr><td>Non-Peak Rate </td>
											<td class="rateNP">450++</td>
										</tr>
										<tr><td>Peak Period Rate</td>
											<td class="rateP">550++</td>
										</tr>
										<tr><td>Great Discounted Rate for stays of 6 nights or more. </td>
											<td class="rateGD">337.5++</td>
										</tr>
									</table>	
									<p>(Advance full payment is required for this one of a kind suite room.)</p>
									<p class="iCenter">* Current rates are <span style="color:red;">exclusive</span> of tax and service charge. (Breakfast not included.)</p>
								</div>
							</div>
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow" style="background-color:rgb(1,75,66);color:white;text-shadow:none;">Close</a>
						</div>
				</div>
		</div>	
		<div class="spacer15px"></div>
		<div class="spacer15px"></div>
		<div class="ui-corner-all custom-corners" style="margin:0 auto;max-width:650px;">
				<div class="ui-bar ui-bar-a" style="background:#6fac68;color:white;text-shadow:none;">
					<h3>The following dates require pre-payment to confirm:</h3>
				</div>
				<div class="ui-body ui-body-a">
					<table class="resPeakBalckOUtTbl">
						<tr><td class="iBold Tealcolor" style="margin-bottom:0;padding-bottom:0;" colspan="2">PEAK DATES:</td></tr>
											
						<tr><td>JAPANESE OBON 2014</td>
							<td>August 13 – August 16, 2014</td>
						</tr>
						<tr><td>CHRISTMAS/NEW YEAR 2015</td>
							<td>December 24, 2014 – January 1, 2015</td>
						</tr>
						<tr><td>CHINESE NEW YEAR 2015</td>
							<td>February 17 – February 20, 2015</td>
						</tr>
						<tr><td>CHRISTMAS/NEW YEAR 2016</td>
							<td>December 24, 2015 – January 1, 2016</td>
						</tr>
						<tr><td>EASTER HOLIDAYS 2015</td>
							<td>April 2 – April 4, 2015</td>
						</tr>
						<tr><td class="iBold Tealcolor" style="margin-bottom:0;padding-bottom:0;" colspan="2">BLACK-OUT DATES: </td></tr>
						<!--<tr><td>JAPANESE GOLDEN WEEK </td>
							<td>April 28 – May 5, 2014</td>
						</tr>-->
						<tr><td>KOREAN CHUSEOK</td>
							<td>September 7 – September 9, 2014</td>
						</tr>
					</table>
				</div>
			</div>		
		<br />
		<div class="ui-corner-all custom-corners" style="margin:0 auto;max-width:650px;">
				<div class="ui-bar ui-bar-a" style="background:#6fac68;color:white;text-shadow:none;">
					<h3>CANCELLATION POLICIES</h3>
				</div>
				<div class="ui-body ui-body-a">
					<p><strong>PEAK and BLACK-OUT PERIODS: </strong>
					<br />
					Any cancellation will be charged in full equivalent to the 
					number of room nights reserved. 
					</p>
				   <p><strong> NON-PEAK PERIODS: </strong>
				   <br />
					Cancellations made 4-7 days prior to arrival will be charged a ONE NIGHT cancellation fee for each room reserved.
					No shows or cancellations made 3 days prior to arrival will be charged in FULL equivalent to the number of room nights reserved.
					</p>
				</div>
			</div>
		<div style="margin:0 auto;max-width:650px;">
			<ul style="font-weight:bold;list-style:square url('http://plantationbay.com/wp-content/themes/plantaccess/images/favicon.ico');">
				<li>Room rates are expressed in US$. Most other prices inside the hotel are in Philippine Pesos.</li>
				<li>Current rates are <span style="color:#FF0000;">exclusive</span> of tax and service charge. <em>(Breakfast not included.)</em></li>
				<li>The photos shown in this website do not represent all rooms in each category. Lay-out and furnishings may vary according to location.</li>
				<li>CHECK-IN TIME, 3 PM.</li>
				<li>CHECK-OUT TIME, 12 NOON.</li>
			</ul>
		</div>												
	</div> <!-- end content -->
	<div data-role="footer">
		<div class="iCenter">
			<a href="index.html" data-ajax="false" data-role="button">HOME</a>	
			<a href="rooms.html" data-ajax="false" data-role="button">ROOMS</a>	
			<a href="packages.html" data-ajax="false" data-role="button">PACKAGES</a>	
			<a href="dining.html" data-ajax="false" data-role="button">DINING</a>	
			<a href="spa.html" data-ajax="false" data-role="button">SPA</a>	
			<a href="activities.html" data-ajax="false" data-role="button">ACTIVITIES</a>	
			<a href="photogallery.html" data-ajax="false" data-role="button">GALLERY</a>	
			<a href="contact.html" data-ajax="false" data-role="button">CONTACT US</a>	
		</div>	
		<div class="CopyRight">
			&copy;2014 <a href="http://www.plantationbay.com">Plantation Bay Resort and Spa</a>. All rights reserved.
			<a href="http://www.plantationbay.com" target="_blank">Design and development by Leox.</a>
		</div>
	</div>	
</div> <!-- end page -->

<!-- Reservation Details -->
<div data-role="page" id="myreservationGDetails">

	<div data-role="header">
		<!--
		<div class="headerwhole">
			<h1 class="pbayheadlogo">
				<img src="http://plantationbay.com/pbaylogo.png" alt="Plantation Bay Resort and Spa" />
			</h1>
			<a href="#RESERVATIONpanelMenu" class="MenuPanel ui-btn ui-btn-inline ui-btn-icon-right ui-icon-plus" data-rel="panel">MENU</a>   
			<section class="top-menus">
				<nav class="main" role="navigation">
					<a href="index.html" data-ajax="false" data-role="button">HOME</a>
					<a href="rooms.html" data-ajax="false" data-role="button">ROOMS</a>
					<a href="packages.html" data-ajax="false" data-role="button">PACKAGES</a>
					<a href="dining.html" data-ajax="false" data-role="button">DINING</a>
					<a href="spa.html" data-ajax="false" data-role="button">SPA</a>
					<a href="activities.html" data-ajax="false" data-role="button">ACTIVITIES</a>
					<a href="photogallery.html" data-ajax="false" data-role="button">GALLERY</a>
					<a href="contact.html" data-ajax="false" data-role="button">CONTACT US</a>
					<a class="myReservatonTopInMenu" href="myreservation.html" data-ajax="false" data-role="button">MY RESERVATION</a>
				</nav>
			</section>
			<img src="slogan.png" alt="Plantation Bay Slogan" class="pbayslogan" />	
			<a href="myreservation.html" class="myReservationTop" style="color:rgb(1,75,66);" data-ajax="false">My RESERVATION</a>	
		</div>	-->
		<div class="headerwhole">
			<h1 class="pbayheadlogo">
				<img src="http://plantationbay.com/english/pbayImages/pbaylogo.png" alt="Logo - Plantation Bay Resort and Spa"/>
			</h1>
			<div class="linguahi">
				<ul class="langOptions action-bar clearfix">
					<li>Translate Page</li>
					<li><a href="http://plantationbay.com/english/pbayImages/english/" class="lang_link" data-ajax="false"><img src="http://plantationbay.com/english/images/flags/english.png" alt="" /><span class="langs"></span><span class="langtooltip">English</span></a></li>
					<li><a href="http://plantationbay.com/english/pbayImages/japanese/" class="lang_link" data-ajax="false"><img src="http://plantationbay.com/english/images/flags/japanese.png" alt="" /><span class="langs"></span><span class="langtooltip">Japanese</span></a></li>
					<li><a href="http://plantationbay.com/english/pbayImages/russian/" class="lang_link" data-ajax="false"><img src="http://plantationbay.com/english/images/flags/russian.png" alt="" /><span class="langs"></span><span class="langtooltip">Russian</span></a></li>
					<li><a href="http://plantationbay.com/english/pbayImages/english/" class="lang_link" data-ajax="false"><img src="http://plantationbay.com/english/images/flags/korean.png" alt="" /><span class="langs"></span><span class="langtooltip">Korean</span></a></li>
					<li><a href="http://plantationbay.com/english/pbayImages/english/" class="lang_link" data-ajax="false"><img src="http://plantationbay.com/english/images/flags/mandarin.png" alt="" /><span class="langs"></span><span class="langtooltip">Mandarin</span></a></li>
				</ul>
			</div>
			<img src="http://plantationbay.com/english/pbayImages/slogan.png" alt="Plantation Bay Slogan" class="pbayslogan" />	
			<a href="#BOOKNOWpanelMenu" class="MenuPanel ui-btn ui-btn-inline ui-btn-icon-right ui-icon-bars" data-rel="panel">MENU</a>   
			<section class="top-menus">
				<nav class="main" role="navigation">
					<a href="http://plantationbay.com/english/index.html" data-ajax="false" data-role="button">HOME</a>
					<a href="http://plantationbay.com/english/rooms.html" data-ajax="false" data-role="button">ROOMS</a>
					<a href="http://plantationbay.com/english/packages.html" data-ajax="false" data-role="button">PACKAGES</a>
					<a href="http://plantationbay.com/english/dining.html" data-ajax="false" data-role="button">DINING</a>
					<a href="http://plantationbay.com/english/spa.html" data-ajax="false" data-role="button">SPA</a>
					<a href="http://plantationbay.com/english/activities.html" data-ajax="false" data-role="button">ACTIVITIES</a>
					<a href="http://plantationbay.com/english/images.html" data-ajax="false" data-role="button">IMAGES</a>
					<a href="http://plantationbay.com/english/contact.html" data-ajax="false" data-role="button">CONTACT US</a>
					<a href="http://plantationbay.com/english/myreservation.html" data-ajax="false" data-role="button" class="btnSelected">MY RESERVATION</a>
				</nav>
			</section>
		</div>
	</div>
	<div data-role="content">
		<!--<form id="reservationDetails" style="margin:0 auto;max-width:800px;">-->
		<form id="reservationDetails" data-ajax="false" method="POST" action="saveFirst.asp">
			<h3 class="iCenter Tealcolor">Reservation Details</h3>
			<div class="ui-corner-all custom-corners">
				<div class="ui-bar ui-bar-a">
					<h3>Add-on Services to turn a special holiday into an extra special holiday. </h3>
				</div>
				<div class="ui-body ui-body-a">
					<p class="iCenter">Advance full payment is required with the preferred package/packages.</p>
						<table class="resBookNowAddOn">
							<tr>
								<td colspan=2" style="text-align:left;font:bold 12px arial;"><em>Check to avail</em></td>
								<td style="text-align:right;font:bold 12px arial;">Nett Price</td>
							</tr>
							<tr>
								<td><input type="checkbox" class="resAddONChoice" name="chkresAddVEP" id="chkresAddVEP" value="50" /></td>
								<td class="Tealcolor"><a href="#resAddVEP" data-rel="popup" data-position-to="window"><strong>VIP Express Package </strong> <img src="images/info.png" alt="more details" /></a> </td>
								<td class="Tealcolor iBold">US$ 50</td>
							</tr>
							<tr>
								<td><input type="checkbox" class="resAddONChoice" name="chkresAddRRP" id="chkresAddRRP" value="120"/></td>
								<td class="Tealcolor"><a href="#resAddRRP" data-rel="popup" data-position-to="window"><strong>Romantic Rendezvous Package </strong> <img src="images/info.png" alt="more details" /> </td>
								<td class="Tealcolor iBold">US$ 120</td>
							</tr>
							<tr>
								<td><input type="checkbox" class="resAddONChoice" name="chkresAddPAP" id="chkresAddPAP" value="50" /></td>
								<td class="Tealcolor"><a href="#resAddPAP" data-rel="popup" data-position-to="window"><strong>Personal Assistant Package </strong> <img src="images/info.png" alt="more details" /> </td>
								<td class="Tealcolor iBold">US$ 50</td>
							</tr>
							<tr>
								<td><input type="checkbox" class="resAddONChoice" name="chkresAddCCP" id="chkresAddCCP" value="50" /></td>
								<td class="Tealcolor"><a href="#resAddCCP" data-rel="popup" data-position-to="window"><strong>Cook with the Chef Package </strong> <img src="images/info.png" alt="more details" /> </td>
								<td class="Tealcolor iBold">US$ 50</td>
							</tr>
						</table>	

						<div data-role="popup" id="resAddVEP" data-overlay-theme="b" class="ui-content" data-history="false">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<h3 class="iCenter">VIP Express Package</h3>
							<h2 class="iCenter Tealcolor">US$ 50 nett one-time charge per room</h2>
							<p class="iCenter"><i>Comfort. Convenience. Discretion</i>.</p>
							<div class="iCenter">
								<div class="IpatungaInlineBlock iTop" style="width:500px;">
									<ul class="iLeft" style="margin-top:0;padding-top:0;">
										<p class="Tealcolor" style="margin-top:0;padding-top:0;"><strong>Inclusions :</strong></p>
										<li>A private chauffeur-driven car to and from the hotel (directly to your room without passing the lobby)</li>
										<li>Check-in and check-out in the privacy of your room</li>
										<li>Upgraded room amenities</li>
										<li><strong>Feel even more glamorous in a luxury Jaguar XJL.Add US$ 50.</strong></li>		
									</ul>
								</div>
								<div class="IpatungaInlineBlock iTop">
									<img class="IpatungaDblock overlay round" src="http://plantationbay.com/wp-content/uploads/2012/08/Vip.jpg" alt="VIP Express Package" title="VIP Express Package" />
								</div>
								<p class="iLeft"><strong class="txtDarkGreen">Note:</strong> To ensure airport pick-up, please provide your flight details above. If you do not have the information yet, please send your flight details with your confirmation number as the Subject of your email to rsvns@plantationbay.com at least 48 hours prior to arrival.</p>
							</div>
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow">Close</a>
						</div>
						<div data-role="popup" id="resAddRRP" data-overlay-theme="b" class="ui-content" data-history="false">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<h3 class="iCenter">Romantic Rendezvous Package</h3>
							<h2 class="iCenter Tealcolor">US$ 120 nett one-time charge per room</h2>
							<p class="iCenter"><i>If you want to impress that special someone, this is the package for you!</i>.</p>
							<div class="iCenter">
								<div class="IpatungaInlineBlock iTop" style="width:500px;">
									<ul class="iLeft" style="margin-top:0;padding-top:0;">
										<p class="Tealcolor" style="margin-top:0;padding-top:0;"><strong>Inclusions :</strong></p>
										<li>Soft lights, sweet music, and a rose petal bath with scented candles <br />for a sensual evening (please arrange two days in advance)</li>
										<li>A dozen long-stemmed roses (please arrange a day in advance)</li>
										<li>Premium sparkling wine and home-made chocolates upon arrival. (Add $60 for champagne)</li>
										<li>Candlelight dinner for two in any location, with serenaders, served by a private butler, <br />including a romantic set-up (Does not include the cost of food. Please arrange two days in advance.)</li>
									</ul>
								</div>
								<div class="IpatungaInlineBlock iTop">
									<img class="IpatungaDblock overlay round" src="http://plantationbay.com/wp-content/uploads/2012/08/RRP2.jpg" alt="Romantic Rendezvous Package" title="Romantic Rendezvous Package" />
								</div>
							</div>
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow">Close</a>
						</div>
						<div data-role="popup" id="resAddPAP" data-overlay-theme="b" class="ui-content" data-history="false">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<h3 class="iCenter">Personal Assistant Package</h3>							
							<h2 class="iCenter Tealcolor">US$ 50 nett per assistant (12hours)</h2>
							
							<div class="iCenter">
								<div class="IpatungaInlineBlock iTop overlay round" style="max-width:200px;">
									<img class="IpatungaInlineBlock" src="http://plantationbay.com/wp-content/uploads/2012/08/PersonalAssitant2.jpg" alt="Personal Assistant Package" title="Personal Assistant Package" />											
									<p class="iLeft">Make your stay even more comfortable and worry-free.</p>							
								</div>
								<div class="IpatungaInlineBlock iTop overlay round" style="max-width:200px;">
									<img class="IpatungaInlineBlock" src="http://plantationbay.com/wp-content/uploads/2012/08/PersonalAssitant1.jpg" alt="Personal Assistant Package" title="Personal Assistant Package" />
									<p class="iLeft">For baby-sitting, running errands, sightseeing, shopping, or assisting the elderly, a full-time personal assistant can make all the difference.</p>							
								</div>	
							</div>
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow">Close</a>
						</div>
						<div data-role="popup" id="resAddCCP" data-overlay-theme="b" class="ui-content" data-history="false">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<h3 class="iCenter">Cook with the Chef Package </h3>
							<h2 class="iCenter Tealcolor">US$ 50 nett up to 5 persons</h2>
							<p class="iCenter">Learn how to cook a Plantation Bay specialty dish. <i>(Please arrange a day in advance. Between 10AM-5PM only.)</i></p>
							<div class="iCenter">
								<div class="InlineBlock iTop">
									<ul class="iLeft">						
										<p class="Tealcolor"><strong>Inclusions :</strong></p>
										<li>Cook your favorite dish from the Chef&#8217;s menu</li>
										<li>Toque and apron as a keepsake</li>
									</ul>
								</div>
								<div class="InlineBlock">
									<img class="IpatungaDblock overlay round" src="http://plantationbay.com/wp-content/uploads/2012/08/CookwiththeChef.jpg" alt="Cook with the Chef Package" title="Cook with the Chef Package" />
								</div>
							</div>
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow">Close</a>
						</div>
					
				</div>
			</div>		
			<div class="spacer15px"></div>		
			<div class="ui-corner-all custom-corners">
				<div class="ui-bar ui-bar-a">
					<h3>Breakfast Package</h3>
				</div>
				<div class="ui-body ui-body-a">
					<div id="BfastPkage" class="iCenter">
						<img class="IpatungaInlineBlock" src="https://online.plantationbay.com/en/allbfthemes.png" alt="Breakfast Choices" />								
						<img class="IpatungaInlineBlock" src="https://online.plantationbay.com/en/SpecialOffer.gif" alt="Special Offer" />
						<div id="divbfastWER" style="display:none;">
							<p class="iBold Tealcolor">Water's Edge Room :</p>
							<p class="iJustify">For only $30++ per day per room, every occupant of the room you just booked will enjoy a full breakfast buffet, up to 3 adults, or 2 adults + 2 children.</p>
							<p class="iLeft iBold">Typical buffet breakfast rate is $20++ per person. Book now!</p>
							<label for="bfastWER"><input type="checkbox" id="bfastWER" name="bfastWER" class="bfastChecks" value="30" />Please check the box to confirm Breakfast Package upgrade for your entire stay.</label>
						</div>
						<div id="divbfastLSR" style="display:none;">
							<p class="iBold Tealcolor">Lagoon Side Room :</p>
							<p class="iJustify">For only $30++ per day per room, every occupant of the room you just booked will enjoy a full breakfast buffet, up to 3 adults, or 2 adults + 2 children.</p>
							<p class="iLeft iBold">Typical buffet breakfast rate is $20++ per person. Book now!</p>
							<label for="bfastLSR"><input type="checkbox" id="bfastLSR" name="bfastLSR" class="bfastChecks" value="30" />Please check the box to confirm Breakfast Package upgrade for your entire stay.</label>
						</div>
						<div id="divbfastLVR" style="display:none;">
							<p class="iBold Tealcolor">Lagoon View Room :</p>
							<p class="iJustify">For only $30++ per day per room, every occupant of the room you just booked will enjoy a full breakfast buffet, up to 3 adults, or 2 adults + 2 children.</p>
							<p class="iLeft iBold">Typical buffet breakfast rate is $20++ per person. Book now!</p>
							<label for="bfastLVR"><input type="checkbox" id="bfastLVR" name="bfastLVR" class="bfastChecks" value="30" />Please check the box to confirm Breakfast Package upgrade for your entire stay.</label>
						</div>
						<div id="divbfastPS" style="display:none;">
							<p class="iBold Tealcolor">Poolside Room :</p>
							<p class="iJustify">For only $30++ per day per room, every occupant of the room you just booked will enjoy a full breakfast buffet, up to 3 adults, or 2 adults + 2 children.</p>
							<p class="iLeft iBold">Typical buffet breakfast rate is $20++ per person. Book now!</p>
							<label for="bfastPS"><input type="checkbox" id="bfastPS" name="bfastPS" class="bfastChecks" value="30" />Please check the box to confirm Breakfast Package upgrade for your entire stay.</label>
						</div>
						<div id="divbfastSIR" style="display:none;">
							<p class="iBold Tealcolor">Spa Indulgence Room & Package :</p>
							<p class="iJustify">For only $30++ per day per room, every occupant of the room you just booked will enjoy a full breakfast buffet, up to 3 adults, or 2 adults + 2 children.</p>
							<p class="iLeft iBold">Typical buffet breakfast rate is $20++ per person. Book now!</p>
							<label for="bfastSIR"><input type="checkbox" id="bfastSIR" name="bfastSIR" class="bfastChecks" value="30" />Please check the box to confirm Breakfast Package upgrade for your entire stay.</label>
						</div>
						<div id="divbfastFR" style="display:none;">
							<p class="iBold Tealcolor">Family Room :</p>
							<p class="iJustify">For only $60++ per day per room, every occupant of the room you just booked will enjoy a full breakfast buffet, up to 6 persons.</p>
							<p class="iLeft iBold">Typical buffet breakfast rate is $20++ per person. Book now!</p>
							<label for="bfastFR"><input type="checkbox" id="bfastFR" name="bfastFR" class="bfastChecks" value="60" />Please check the box to confirm Breakfast Package upgrade for your entire stay.</label>
						</div>
						<div id="divbfastOneBS" style="display:none;">
							<p class="iBold Tealcolor">One Bedroom Suite :</p>
							<p class="iJustify">For only $30++ per day per room, every occupant of the room you just booked will enjoy a full breakfast buffet, up to 3 adults, or 2 adults + 2 children.</p>
							<p class="iLeft iBold">Typical buffet breakfast rate is $20++ per person. Book now!</p>
							<label for="bfastOneBS"><input type="checkbox" id="bfastOneBS" name="bfastOneBS" class="bfastChecks" value="30" />Please check the box to confirm Breakfast Package upgrade for your entire stay.</label>
						</div>
						<div id="divbfastTwoBS" style="display:none;">
							<p class="iBold Tealcolor">Two Bedroom Suite :</p>
							<p class="iJustify">For only $60++ per day per room, every occupant of the room you just booked will enjoy a full breakfast buffet, up to 6 persons.</p>
							<p class="iLeft iBold">Typical buffet breakfast rate is $20++ per person. Book now!</p>
							<label for="bfastTwoBS"><input type="checkbox" id="bfastTwoBS" name="bfastTwoBS" class="bfastChecks" value="60" />Please check the box to confirm Breakfast Package upgrade for your entire stay.</label>
						</div>
						<div id="divbfastQV" style="display:none;">
							<p class="iBold Tealcolor">Quantum Villa :</p>
							<p class="iJustify">For only $120++ per day per room, every occupant of the room you just booked will enjoy a full breakfast buffet, up to 12 adults, or 8 adults + 8 children.</p>
							<p class="iLeft iBold">Typical buffet breakfast rate is $20++ per person. Book now!</p>
							<label for="bfastQV"><input type="checkbox" id="bfastQV" name="bfastQV" class="bfastChecks" value="120" />Please check the box to confirm Breakfast Package upgrade for your entire stay.</label>
						</div>
						<div id="divbfastPhS" style="display:none;">
							<p class="iBold Tealcolor">Penthouse Suite :</p>
							<p class="iJustify">For only $60++ per day per room, every occupant of the room you just booked will enjoy a full breakfast buffet, up to 6 persons.</p>
							<p class="iLeft iBold">Typical buffet breakfast rate is $20++ per person. Book now!</p>
							<label for="bfastPhS"><input type="checkbox" id="bfastPhS" name="bfastPhS" class="bfastChecks" value="60" />Please check the box to confirm Breakfast Package upgrade for your entire stay.</label>
						</div>
						<div id="divbfastRB" style="display:none;">
							<p class="iBold Tealcolor">Riverboat Suite :</p>
							<p class="iJustify">For only $60++ per day per room, every occupant of the room you just booked will enjoy a full breakfast buffet, up to 6 persons.</p>
							<p class="iLeft iBold">Typical buffet breakfast rate is $20++ per person. Book now!</p>
							<label for="bfastRB"><input type="checkbox" id="bfastRB" name="bfastRB" class="bfastChecks" value="60" />Please check the box to confirm Breakfast Package upgrade for your entire stay.</label>
						</div>						
					</div>
				</div>
			</div>
			<div id="FreeTreats" style="display:none;">
				<div class="spacer15px"></div>		
				<div class="ui-corner-all custom-corners">
					<div class="ui-bar ui-bar-a">
						<h3>Choose and enjoy one of the following treats: (Free for each room booked for 4 or 5 nights.)</h3>
					</div>
					<div class="ui-body ui-body-a">
						<fieldset data-role="controlgroup">
							<table class="resFreeTreats">
								<tr><td><input type="radio" name="optTreats" id="optDinnerBuffet" value="31"></td>
									<td><a href="#DinnerBuffet" data-rel="popup" data-position-to="window">Dinner for 2 at a Themed Buffet with our world-famous dance presentations, worth about P3,000!!! (Please reserve in advance.)</a></td></tr>
								<tr><td><input type="radio" name="optTreats" id="optRomanticDinner" value="32"></td>
									<td><a href="#RomanticDinner" data-rel="popup" data-position-to="window">Romantic dinner at Palermo Restaurant for 2 persons, worth about P3,000!!! (Please reserve in advance.)</td></tr>
								<tr><td><input type="radio" name="optTreats" id="optPBayIceCream" value="33"></td>
									<td><a href="#PBayIceCream" data-rel="popup" data-position-to="window">Unlimited Plantation Bay homemade ice cream for the duration of your stay, worth Thousands of Pesos!!!</td></tr>
								<tr><td><input type="radio" name="optTreats" id="optAlienGC" value="40"></td>
									<td><a href="#AlienGC" data-rel="popup" data-position-to="window">Gift certificate worth P3,000 at Alien Abduction!!! (Please reserve in advance.)</td></tr>
								<tr><td><input type="radio" name="optTreats" id="optPalermoGC" value="35"></td>
									<td><a href="#PalermoGC" data-rel="popup" data-position-to="window">Gift certificate worth P3,000 at Palermo Restaurant!!! (Please reserve in advance.)</a></td></tr>
								<tr><td><input type="radio" name="optTreats" id="optMargaritas" value="36"></td>
									<td><a href="#Margaritas" data-rel="popup" data-position-to="window">Free Margaritas and Plantation Bay Coladas all throughout your stay, for 2 persons worth Thousands of Pesos!!!</td></tr>
								<tr><td><input type="radio" name="optTreats" id="optHilot1hr" value="37"></td>
									<td><a href="#Hilot1hr" data-rel="popup" data-position-to="window">1 hour and 30 minutes Hilot (Traditional Filipino Massage) for one person, worth P3,000!!!</td></tr>
								<tr><td><input type="radio" name="optTreats" id="optGalvanicSpa" value="38"></td>
									<td><a href="#GalvanicSpa" data-rel="popup" data-position-to="window">30-minute Galvanic Spa and 1-hour Body Scrub, worth about P4,000!!!</td></tr>
								<tr><td><input type="radio" name="optTreats" id="optCoralReef" value="39"></td>
									<td><a href="#CoralReef" data-rel="popup" data-position-to="window">Coral Reef Encounter worth P3,000!!! (May be combined with other groups. Please reserve in advance.)</td></tr>
							</table>
						</fieldset>
						
						<div data-role="popup" id="DinnerBuffet" data-overlay-theme="b" class="ui-content" data-history="false">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<img class="IpatungaDblock" title="Dinner for 2 at a Themed Buffet" src="http://plantationbay.com/wp-content/uploads/2012/08/SPromo1.jpg" />
						</div> 
						<div data-role="popup" id="RomanticDinner" data-overlay-theme="b" class="ui-content" data-history="false">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<img class="IpatungaDblock" title="Romantic dinner at Palermo Restaurant" src="http://plantationbay.com/wp-content/uploads/2012/08/SPromo2.jpg" />
						</div> 
						<div data-role="popup" id="PBayIceCream" data-overlay-theme="b" class="ui-content" data-history="false">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<img class="IpatungaDblock" title="Unlimited Plantation Bay homemade ice cream" src="http://plantationbay.com/wp-content/uploads/2012/08/SPromo3.jpg" />
						</div>
						<div data-role="popup" id="AlienGC" data-overlay-theme="b" class="ui-content" data-history="false">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<img class="IpatungaDblock" title="Gift certificate worth P3,000 at Alien Abduction" src="./images/SPromo10.jpg" />
						</div>
						<div data-role="popup" id="PalermoGC" data-overlay-theme="b" class="ui-content" data-history="false">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<img class="IpatungaDblock" title="Gift certificate worth P3,000 at Palermo Restaurant" src="http://plantationbay.com/wp-content/uploads/2012/08/SPromo5.jpg" />
						</div>
						<div data-role="popup" id="Margaritas" data-overlay-theme="b" class="ui-content" data-history="false">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<img class="IpatungaDblock" title="Free Margaritas and Plantation Bay Coladas" src="http://plantationbay.com/wp-content/uploads/2012/08/SPromo6.jpg" />
						</div>
						<div data-role="popup" id="Hilot1hr" data-overlay-theme="b" class="ui-content" data-history="false">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<img class="IpatungaDblock" title="1 hour and 30 minutes Hilot" src="http://plantationbay.com/wp-content/uploads/2012/08/SPromo7.jpg" />
						</div>
						<div data-role="popup" id="GalvanicSpa" data-overlay-theme="b" class="ui-content" data-history="false">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<img class="IpatungaDblock" title="30-minute Galvanic Spa" src="http://plantationbay.com/wp-content/uploads/2012/08/SPromo8.jpg" />
						</div>
						<div data-role="popup" id="CoralReef" data-overlay-theme="b" class="ui-content" data-history="false">
							<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>
							<img class="IpatungaDblock" title="Coral Reef Encounter" src="http://plantationbay.com/wp-content/uploads/2012/08/SPromo9.jpg" />
						</div>
					</div>
				</div>
			</div>
			<div class="spacer15px"></div>			
			<div class="ui-corner-all custom-corners">
				<div class="ui-bar ui-bar-a">
					<h3 id="resComputationsHead">Stay: Date and Computations here</h3>
				</div>
				<div class="ui-body ui-body-a">
					<table id="resComputations" class="resComputations">
						<!-- Computations Here :) -->
					</table>
				</div>
				
			</div>
			<div class="spacer15px"></div>
			<div class="ui-corner-all custom-corners">
				<div class="ui-bar ui-bar-a">
					<h3>Guarantee, deposit and cancellation policies</h3>
				</div>
				<div class="ui-body ui-body-a">					
					<div  id="resGuaranteeP" style="display:none;">
						<p class="Tealcolor iBold">PEAK PERIOD</p>
						<p class="iJustify">Full payment is required upon reservations. In any event of cancellation, the hotel will charge the total number of room nights reserved.</p>
					</div>
					<div  id="resGuaranteeBlackOut" style="display:none;">
						<p class="Tealcolor iBold">BLACK OUT DATES</p>
						<p class="iJustify">Full payment is required upon reservations. In any event of cancellation, the hotel will charge the total number of room nights reserved.</p>
					</div>
					<div  id="resGuarantee1Kind" style="display:none;">
						<p class="Tealcolor iBold">ONE OF A KIND SUITE ROOM</p>
						<p class="iJustify">You have reserved a one of a kind suite room. A full advance payment is required to guarantee the reservations.</p>
						<p class="iJustify">Cancellations made less than 14 days prior to arrival will be charged 50% of the total number of room nights reserved. FULL cancellation charges apply on No Shows or cancellations made less than 7 days prior to arrival.</p>
					</div>	
					<div  id="resGuaranteeSpa" style="display:none;">
						<p class="Tealcolor iBold">SPA INDULGENCE PACKAGE</p>
						<p class="iJustify">You have reserved our Spa Indulgence Package. A full advance payment is required to guarantee the reservations.</p>
						<p class="iJustify">Cancellations made less than 14 days prior to arrival will be charged 50% of the total number of room nights reserved. FULL cancellation charges apply on No Shows or cancellations made less than 7 days prior to arrival.</p>
					</div>	
					<div  id="resGuaranteeNP" style="display:none;">
						<p class="Tealcolor iBold">NON-PEAK PERIOD</p>
						<p class="iJustify">We only require your credit card details to guarantee your reservation.</p>
						<p class="iJustify">Cancellations made 4-7 days prior to arrival will be charged a ONE NIGHT cancellation fee for each room reserved. No shows or cancellations made 3 days prior to arrival will be charged in FULL equivalent to the number of room nights reserved.</p>
					</div>
					<div  id="resGuaranteeGDR" style="display:none;">
						<p class="Tealcolor iBold">GREAT DISCOUNTED RATE</p>
						<p class="iJustify">You are availing of our <strong>Great Discounted Rate Promo (Non-Peak Dates)</strong>, with a minimum of 6 nights stay or more. We require full payment upon reservations. No refund shall be made in any event of cancellation.</p>
					</div>
					
					<p class="Tealcolor"><strong>REMINDERS:</strong>
						<ol style="padding-left:3px;">
							<li class="iJustify">To ensure airport pick-up, please provide us with your flight details at least 48 hours prior to arrival. At the arrival area, please look for our Airport Representative. In the event that he is not available, please contact the Duty Manager at (+63) 917-631-3675. Our shuttle bus is complimentary and runs about every 1 1/2 hours, but if you would have to wait more than about 20 minutes we will, at no expense to you, arrange a transfer by hired car. (This hired-car alternative is solely at the hotel's option and will only be offered for arrivals, not departures.) Our hotel-to-airport shuttle schedule is also every 1 1/2 hours; please select the most convenient one.</li>
							<li class="iJustify">Check-in time is 3 PM. Should you arrive earlier, we will make every effort to get you into your room sooner; this is usually but not always possible. On peak days, due to late departure of outgoing guests, we may sometimes not be able to check you in by 3 PM but if so we will provide you with changing facilities and complimentary refreshments.</li>
							<li class="iJustify">Please take careful note of the maximum occupancy for your type of room. Our occupancy norms are generous compared with most other hotels, but we do enforce them.</li>
							<li class="iJustify">While of course you are welcome to invite local friends and relatives to see you or dine with you at the resort, for non-registered guests who wish to use the swimming and other leisure facilities there will be a charge of P 2000 for the day (inclusive of a set lunch). Please advise us in advance.</li>
							<li class="iJustify">Check-out time is 12 Noon. A half-day surcharge will be applied to late check-outs. </li>
						</ol>
					</p>
					<label><input type="checkbox" id="reschkGuarantee" name="reschkGuarantee" class="kinahanglan" required><span class="iBold iRedtext"> * </span> I agree to the terms and conditions above.</label>
				</div>
			</div>	
			<div class="spacer15px"></div>			
			<div class="ui-corner-all custom-corners">
				<div class="ui-bar ui-bar-a">
					<h3>Name ( <span class="iBold iRedtext"> * </span>  indicates a required field )</h3>
				</div>
				<div class="ui-body ui-body-a">
					<div class="ui-field-contain">
						<label for="Gprefix" class="select"><span class="iBold iRedtext"> * </span>Prefix</label>
						<select name="Gprefix" id="Gprefix"  class="kinahanglan" required>
							<option selected="selected" value="">Please Select</option>
							<option value="Mr.">Mr.</option>
							<option value="Mrs.">Mrs.</option>
							<option value="Ms.">Ms.</option>
							<!--<option value="other">Other...</option>-->
						</select>
					</div>
					<div class="ui-field-contain">
						<label for="Gfname"><span class="iBold iRedtext"> * </span>  First Name</label>
						<input type="text" name="Gfname" id="Gfname" class="kinahanglan" value="" required />
					</div>
					<div class="ui-field-contain">
						<label for="Glname"><span class="iBold iRedtext"> * </span>  Last Name</label>
						<input type="text" name="Glname" id="Glname" class="kinahanglan" value="" required />
					</div><!--
					<input type="button" data-corners="true" data-inline="true" value="Add Adult(s)"></input>
				--></div>
			</div>
			<div class="spacer15px"></div>
			<div class="ui-corner-all custom-corners">
				<div class="ui-bar ui-bar-a">
					<h3>Contact Information (<span class="iBold iRedtext"> * </span>  indicates a required field )</h3>
				</div>
				<div class="ui-body ui-body-a">
					<div class="ui-field-contain">
						<label for="contactHomeAdd"><span class="iBold iRedtext"> * </span>  Please provide your Home address</label>
						<textarea name="contactHomeAdd" id="contactHomeAdd" class="kinahanglan" required ></textarea>
					</div>
					<div class="ui-field-contain">
						<label for="contactEmail"><span class="iBold iRedtext"> * </span>  Primary e-mail</label>
						<input type="email" name="contactEmail" id="contactEmail" class="kinahanglan" value="" required  />
					</div>
					<div class="ui-field-contain">
						<label for="contactTel"><span class="iBold iRedtext"> * </span>  Telephone number</label>
						<input type="tel" name="contactTel" id="contactTel" class="kinahanglan" value="" required />
					</div>
					<div class="ui-field-contain">
						<label for="contactMobilenum">Mobile number</label>
						<input type="tel" name="contactMobilenum" id="contactMobilenum"  value="" />
					</div>
					<div class="ui-field-contain">
						<label for="contactFax">Fax number</label>
						<input type="tel" name="contactFax" id="contactFax" value="" />
					</div>
					
				</div>
			</div>
			<div class="spacer15px"></div>
			<div class="ui-corner-all custom-corners">
				<div class="ui-bar ui-bar-a">
					<h3>Credit Card Information ( <span class="iBold iRedtext"> * </span>  indicates a required field )</h3>
				</div>
				<div class="ui-body ui-body-a">
					<div class="ui-field-contain">
						<label for="ccType"><span class="iBold iRedtext"> * </span>  Card Type</label>
						<select name="ccType" id="ccType" class="kinahanglan" required >
							<option selected="selected" value="">Please Select</option>
							<option value="AX">American Express</option>
							<option value="VA">Visa</option>
							<option value="MC">MasterCard</option>
							<option value="DC">Diners Club</option>
							<option value="JC">JCB Card</option>
						</select>
					</div>
					<div class="ui-field-contain">
						<label for="ccNumber"><span class="iBold iRedtext"> * </span>  Card Number</label>
						<input type="number" name="ccNumber" id="ccNumber" class="kinahanglan" value="" required />
					</div>
					<div class="ui-field-contain">
						<label for="ccHolderName"><span class="iBold iRedtext"> * </span>  Cardholder Name</label>
						<input type="text" name="ccHolderName" id="ccHolderName" class="kinahanglan" value="" required />
					</div>
					<div class="ui-field-contain">
						<label for="ccExpiry"><span class="iBold iRedtext"> * </span>  Card Expiry Date</label>
						<input type="text" name="ccExpiry" id="ccExpiry" class="kinahanglan" value="" required />
					</div>
					<div class="ui-field-contain">
						<label for="ccBatchCode"><span class="iBold iRedtext"> * </span>  Batch Code</label>
						<input type="text" name="ccBatchCode" id="ccBatchCode" class="kinahanglan" value="" required />
					</div>
					<div class="ui-field-contain">
						<label for="ccBillingAdd"><span class="iBold iRedtext"> * </span>  Billing address for this card</label>
						<textarea name="ccBillingAdd" id="ccBillingAdd" class="kinahanglan" required ></textarea>
					</div>
					<a href="http://www.instantssl.com" target="_blank"><img src="https://online.plantationbay.com/en/comodo_secure-113x59.gif" alt="COMODO SECURE" /></a>
				</div>
			</div>
			<div class="spacer15px"></div>
			<div class="ui-corner-all custom-corners">
				<div class="ui-bar ui-bar-a">
					<h3>Pre-arrival requests, preferences and details (subject to availability)</h3>
				</div>
				<div class="ui-body ui-body-a">
					<div class="ui-field-contain">
						<label for="resAddDetails">Additional details, requests or preferences to help us prepare for your arrival</label>
						<textarea name="resAddDetails" id="resAddDetails"></textarea>
					</div>
					<div class="ui-field-contain">
						<label for="resArrivalTime">Estimated time of arrival</label>
						<input type="text" name="resArrivalTime" id="resArrivalTime" value="" />
					</div>
					<div class="ui-field-contain">
						<label for="resFlightNum">Airline and flight number</label>
						<input type="text" name="resFlightNum" id="resFlightNum" value="" />
					</div>
					<div class="ui-field-contain">
						<label for="resCityOrigin">City of Origin/Departure</label>
						<input type="text" name="resCityOrigin" id="resCityOrigin" value="" />
					</div>
				</div>
			</div>								
			<div class="spacer15px"></div>
			<div class="ui-corner-all custom-corners">
				<div class="ui-bar ui-bar-a">
					<h3>E-mail confirmation</h3>
				</div>
				<div class="ui-body ui-body-a">
					<label><input type="checkbox" name="chkSendEmail" id="chkSendEmail" checked>Send an e-mail to (E-mail address: )</label>
					<div class="ui-field-contain">
						<label for="resAddEmail">Send additional e-mail confirmation(s) to:</label>
						<input type="email" name="resAddEmail" id="resAddEmail" value="" />
					</div>
				</div>
			</div>
			<input type="hidden" id="resComputes" name="resComputes"></input>
			<input type="hidden" id="cancelNotice" name="cancelNotice"></input>
			<input type="hidden" id="resparamAdult" name="resparamAdult"></input>
			<input type="hidden" id="resparamChild" name="resparamChild"></input>
			<input type="hidden" id="resparamStay" name="resparamStay"></input>
			<input type="hidden" id="resRoomTypes" name="resRoomTypes"></input>
			<input type="hidden" id="resArrivalDate" name="resArrivalDate"></input>
			<input type="hidden" id="resDepartureDate" name="resDepartureDate"></input>
			
			<input type="hidden" id="WER" name="WER" value=""></input>
			<input type="hidden" id="LSR" name="LSR" value=""></input>
			<input type="hidden" id="LVR" name="LVR" value=""></input>
			<input type="hidden" id="PS" name="PS" value=""></input>
			<input type="hidden" id="SIR" name="SIR" value=""></input>
			<input type="hidden" id="FR" name="FR" value=""></input>
			<input type="hidden" id="OneBS" name="OneBS" value=""></input>
			<input type="hidden" id="TwoBS" name="TwoBS" value=""></input>
			<input type="hidden" id="QV" name="QV" value=""></input>
			<input type="hidden" id="PhS" name="PhS" value=""></input>
			<input type="hidden" id="RB" name="RB" value=""></input>

			
			<!--<a href="#" id="bookNowContinue" data-role="button">Continue</a>-->			
			<button type="submit" data-inline="true" name="bookNowContinue" id="bookNowContinue" value="CONTINUE">CONTINUE</button>
		</form>
	</div> <!-- end content -->
	<div data-role="footer">
		<div class="iCenter">
			<a href="index.html" data-ajax="false" data-role="button">HOME</a>	
			<a href="rooms.html" data-ajax="false" data-role="button">ROOMS</a>	
			<a href="packages.html" data-ajax="false" data-role="button">PACKAGES</a>	
			<a href="dining.html" data-ajax="false" data-role="button">DINING</a>	
			<a href="spa.html" data-ajax="false" data-role="button">SPA</a>	
			<a href="activities.html" data-ajax="false" data-role="button">ACTIVITIES</a>	
			<a href="photogallery.html" data-ajax="false" data-role="button">GALLERY</a>	
			<a href="contact.html" data-ajax="false" data-role="button">CONTACT US</a>	
		</div>	
		<div class="CopyRight">
			&copy;2014 <a href="http://www.plantationbay.com">Plantation Bay Resort and Spa</a>. All rights reserved.
			<a href="http://www.plantationbay.com" target="_blank">Design and development by Leox.</a>
		</div>
	</div>	
</div> <!-- end page -->		
<!-- PANEL MENU -->
	<div data-role="panel" data-position="right" data-display="overlay" id="BOOKNOWpanelMenu" class="panelMenu">
		<div data-role="content">
			<ul data-role="listview" data-inset="true" >
				<li><a href="index.html" data-ajax="false" >HOME</a></li>		
				<li><a href="rooms.html" data-ajax="false" data-transition="slide" data-direction="forward">ROOMS</a></li>
				<li><a href="packages.html" data-ajax="false" data-transition="slide" data-direction="forward">PACKAGES</a></li>
				<li><a href="dining.html" data-ajax="false" data-transition="slide" data-direction="forward">DINING</a></li>
				<li><a href="spa.html" data-ajax="false" data-transition="slide" data-direction="forward">SPA</a></li>
				<li><a href="activities.html" data-ajax="false" data-transition="slide" data-direction="forward">ACTIVITIES</a></li>
				<li><a href="photogallery.html" data-ajax="false" data-transition="slide" data-direction="forward">PHOTO GALLERY</a></li>
				<li><a href="contact.html" data-ajax="false" data-transition="slide" data-direction="forward">CONTACT US</a></li>
				<li><a href="myreservation.html" data-ajax="false" data-transition="slide" data-direction="forward">MY RESERVATION</a></li>
				<li><a href="#" data-rel="close" data-icon="delete">HIDE/CLOSE</a></li>
				<!--<li><a href="directory.html"  data-ajax="false" >DIRECTORY OF SERVICES</a></li>-->
			</ul>
		</div>
	</div>
<script type="text/javascript">var KwartoNaaUgWala = <?php echo json_encode($KwartoPagkaana); ?>;</script>
<script type="text/javascript" src="rlmjbooknow.js"></script>
</body>
</html>