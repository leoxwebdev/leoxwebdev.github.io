<?php

include_once('bDoTtcennoC.php');

//$resMonthName = array("January","February","March","April","May","June","July","August","September","October","November","December"); 	// Store month names in array			
$roomTypeText = "";
$guestText = "";
$cancelNoticeText = "";
$CntRoomTypesSelected = 0;

//$ConfirmationNum = $_GET['ConfirmationNum'];
$ConfirmationNum = "RS140510M02";

$sqlGuestDetails = "SELECT * from guestrecord where ConfirmationNum='".$ConfirmationNum."'";
/*
$SQLquery = mysql_query($sqlString1);
$result = mysql_num_rows($SQLquery) or die ( 'Cannot Execute:' . mysql_error() );
*/
$qRestult = mysql_query( $sqlGuestDetails );

//if ( $result != 0 ) {

$row = mysql_fetch_assoc( $qRestult );

$guestID = $row[ GuestID ];
$GuestPrefix = $row[ GuestPrefix ];
$OtherPrefix = $row[ OtherPrefix ];
$GuestLast = $row[ GuestLast ];
$GuestFirst = $row[ GuestFirst ];
$DepartureDate = $row[ DepartureDate ];
$ArrivalDate = $row[ ArrivalDate ];
$Adults = $row[ Adults ];
$Children = $row[ Children ];
$ConfirmationNum = $row[ ConfirmationNum ];
$NType = $row[ NType ];
$NNo = $row[ NNo ];
$NExpire = $row[ NExpire ];
$NName = $row[ NName ];
$NBatch = $row[ NBatch ];
$NAdd = $row[ NAdd ];
$ModeOfPayment = $row[ ModeOfPayment ];
$ContactInfo = $row[ ContactInfo ];
$PrimaryEmail = $row[ PrimaryEmail ];
$Telephone = $row[ Telephone ];
$Mobilenum = $row[ Mobilenum ];
$Fax = $row[ Fax ];
$OriginCity = $row[ OriginCity ];
$MeEmail = $row[ MeEmail ];
$OtherEmailNotify = $row[ OtherEmailNotify ];
$ETA = $row[ ETA ];
$FlightNumber = $row[ FlightNumber ];
$Remarks = $row[ Remarks ];
$RandomNum = $row[ RandomNum ];
$VEP = $row[ VEP ];
$RRP = $row[ RRP ];
$CCP = $row[ CCP ];
$PAP = $row[ PAP ];
$PSBF = $row[ PSBF ];
$FABF = $row[ FABF ];
$LVBF = $row[ LVBF ];
$LSBF = $row[ LSBF ];
$WEBF = $row[ WEBF ];
$OBKBF = $row[ OBKBF ];
$TKKBF = $row[ TKKBF ];
$RBBF = $row[ RBBF ];
$PHBF = $row[ PHBF ];
$QVBF = $row[ QVBF ];
$SPABF = $row[ SPABF ];
$RoomConversion = $row[ RoomConversion ];
$ConditionsApplied = $row[ ConditionsApplied ];

$guestName = $GuestPrefix . " " . $GuestFirst . " " . $GuestLast;	
//	echo json_encode($guestRoomsJSON);
//} else {
	//"Walay nakita!";
//}

$dateText = "";
function getDateRangeText($dStart, $dEnd , $from){ // from = 1 - from computations , 0 - Stay

	$s1 = stripos($dStart,"-");
	$s2 = strripos($dStart,"-",0);
	
	$e1 = stripos($dEnd,"-");
	$e2 = strripos($dEnd,"-");
	
	$sYear =  substr( $dStart, 0, $s1 );
	$sMonth = substr( $dStart, ($s1 + 1), ($s2 - ($s1 + 1)) ); //sDate.getMonth();
	$sDay = substr( $dStart, ( $s2 + 1 )  ); //sDate.getDate(),
	
	$eYear =  substr( $dEnd, 0, $e1 );
	$eMonth = substr( $dEnd, ($e1 + 1), ($e2 - ($e1 + 1)) ); //sDate.getMonth();
	$eDay = substr( $dEnd, ( $e2 + 1 )  ); //sDate.getDate(),
		
	$sMonthName = date("F", mktime(null, null, null, (int)$sMonth));
	$eMonthName = date("F", mktime(null, null, null, (int)$eMonth));
	if ( $sYear === $eYear ){ //same year
		if ( $from == 1 ){
			if ( $sMonth == $eMonth ){ // same month
				if ( $sDay == $eDay ){ // same day
					$dateText = substr( $sMonthName, 0, 3 ) . " " . $sDay;
				} else {
					$dateText = substr( $sMonthName, 0, 3 ) . " " . $sDay . " - " . $eDay;
				}
			} else { //not the same month
				$dateText = substr( $sMonthName, 0, 3 ) . " " . $sDay . " - " . substr( $eMonthName, 0, 3) . " " . $eDay;
			}
		} else {
			if ( $sMonth == $eMonth ){ // same month
				$dateText = $sMonthName . " " . $sDay . " - " . $eDay . ", " . $eYear;
			} else { //not the same month
				$dateText = $sMonthName . " " . $sDay . " - " . $eMonthName . " " . $eDay . ", " . $eYear;
			}
		}	
	} else {//not the same year
		if ( $from ){
			$dateText = substr( $sMonthName, 0, 3 ) . " " . $sDay . ", " . $sYear . " - " . substr( $eMonthName, 0, 3 ) . " " . $eDay . ", " . $eYear;
		} else {			
			$dateText = $sMonthName . " " . $sDay . ", " . $sYear . " - " . $eMonthName . " " . $eDay . ", " . $eYear;
		}
	}
	echo $dateText;
}

//Determine if a word needs and  or not like. room or rooms, night or nihts :)
function AddRemoveSs( $strWord, $cntValue ){
	if ( $cntValue > 1 ){
		echo $strWord . "s";
	} else {
		echo $strWord;
	}
}

// Determine number of days for (NP/P/BO) Dates	
$ArrDate = $ArrivalDate . "  00:00:00";
$DepDate = date('Y-m-d', strtotime('-1 day', strtotime($DepartureDate))) . "  00:00:00"; // Deduct 1 day from departure date for between mysql query.
$queryStat = mysql_query("SELECT Dstat,rtid,cdate From roomsetcalendar where rtid=8 and CDate between '$ArrDate' and '$DepDate' order by cdate");
$num_rows = mysql_num_rows($queryStat);
$lenStat = $num_rows - 1; $rmStat = 0; $cntNP = 0; $cntP = 0; $cntPeak = 0; $cntBO = 0;
$startP = 0; $endP = 0; $startBO = 0; $endBO = 0; $foundSpa = 0; $found1kind = 0; $totalNights = 0;
$prevStat = ""; $prevDate = ""; $recNum = 0;

while ( $row = mysql_fetch_assoc( $queryStat )){

	$rmStat = $row[ 'Dstat' ];	
	if ( $rmStat === "P" ){
	
		$cntP = $cntP + 1;
		$totalNights = $totalNights + 1;
		
		if ( !$startP ){ $startP = $row[ 'cdate' ]; }
		
		if ( $recNum == $lenStat ){ $endP = $row[ 'cdate' ]; }
		
		if ( $prevStat == "BO" ){ $endBO = $prevDate; }
		
		$prevStat = "P";	//don't change the line postion, this should be at end of this block;
		
	} else if ( $rmStat == "BO" ){
	
		$cntBO = $cntBO + 1;
		$totalNights = $totalNights + 1;
		
		if ( !$startBO ){ $startBO = $row[ 'cdate' ]; }
		
		if ( $recNum == $lenStat ){ $endBO = $row[ 'cdate' ]; }
		
		if ( $prevStat == "P" ){ $endP = $prevDate; }
		
		$prevStat = "BO";	//don't change the line postion, this should be at end of this block;
		
	} else { //NP
	
		$cntNP = $cntNP + 1;
		$totalNights = $totalNights + 1;
		
		if ( $prevStat == "P" ){
			$endP = $prevDate;
		} else if ( $prevStat == "BO" ){ 
			$endBO = $prevDate; 
		}
		
		$prevStat = "NP";	//don't change the line postion, this should be at end of this block;
	}
	
	$prevDate = $row[ 'cdate' ];	//don't change the line postion, this should be at end of this block;	
	$recNum = $recNum + 1;
}

$roomNights = $cntP + $cntBO + $cntNP;
//"NP = " . $cntNP . " , P = " . $cntP . " , BO = " . $cntBO . " , startP = " . $startP . " , endP = " . $endP . "  , startBO = " . $startBO . ", endBO = " . $endBO;
//$computations = "NP = " . $cntNP . " , P = " . $cntP . " , BO = " . $cntBO . " , startP = " . $startP . " , endP = " . $endP . "  , startBO = " . $startBO . ", endBO = " . $endBO;
										
//Room Types Description
$sqlGuestRooms = "SELECT RTID from guestreservert where GuestID=".$guestID;
$roomRestult = mysql_query( $sqlGuestRooms );

while ( $row = mysql_fetch_assoc( $roomRestult )){
	
	$CntRoomTypesSelected = $CntRoomTypesSelected + 1 ;	
	$rmType = $row[ 'RTID' ];

	if ( $rmType == 7 ){
			
		$roomTypeText = $roomTypeText . "<p class='iBold Tealcolor'>Water's Edge Room Description</p>" .
		"<p class='iJustify'>Very close to the saltwater lagoons. From your room you can be in the water within 2 seconds or less from your balcony." .
		"<p class='iBold Tealcolor'>Water's Edge Room Occupancy</p>" .
		"<p class='iJustify'>This room is intended for a maximum occupancy of 2 adults and 2 children 17 years old or below. In case of 3 or 4 adults, there will be a US$20++ surcharge for the 3rd adult, and another US$20++ surcharge for the 4th adult, per night. In no case may there be more than 4 persons, regardless of age, in the room.";
		
	} elseif ( $rmType == 6 ){
		
		$roomTypeText = $roomTypeText . "<p class='iBold Tealcolor'>Lagoon Side Room Description</p>" .
		"<p class='iJustify'>Our most popular rooms, all at ground level.  From a spacious balcony you will enjoy close access to the beach (you can be in the water in one minute or less).  Splendid views of our magnificent private lagoon and beaches.</p>" .
		"<p class='iBold Tealcolor'>Lagoon Side Room Occupancy</p>" .
		"<p class='iJustify'>This room is intended for a maximum occupancy of 2 adults and 2 children 17 years old or below. In case of 3 or 4 adults, there will be a US$20++ surcharge for the 3rd adult, and another US$20++ surcharge for the 4th adult, per night. In no case may there be more than 4 persons, regardless of age, in the room.</p>";
	
	} elseif ( $rmType == 5 ){
		
		$roomTypeText = $roomTypeText . "<p class='iBold Tealcolor'>Lagoon View Room Description</p>" .
		"<p class='iJustify'>These rooms are situated on a second or third floor, or a few yards further from the beach.  The rooms have no direct access to the water, but you will have better views of our magnificent private lagoon.</p>" .
		"<p class='iBold Tealcolor'>Lagoon View Room Occupancy</p>" .
		"<p class='iJustify'>This room is intended for a maximum occupancy of 2 adults and 2 children 17 years old or below. In case of 3 or 4 adults, there will be a US$20++ surcharge for the 3rd adult, and another US$20++ surcharge for the 4th adult, per night. In no case may there be more than 4 persons, regardless of age, in the room.";
		
	} elseif ( $rmType == 1 ){
		
		$roomTypeText = $roomTypeText . "<p class='iBold Tealcolor'>Poolside Room  Description</p>" .
		"<p class='iJustify'>These rooms have ready access to a freshwater swimming pool (maximum 30 seconds' walk) and a friendly village feel suitable for families, singles, and large groups of all kinds. The views are considerably inferior to those elsewhere in the hotel and the balcony is smaller, but the room proper is slightly more spacious.</p>" .
		"<p class='iBold Tealcolor'>Poolside Room  Occupancy</p>" .
		"<p class='iJustify'>This room is intended for a maximum occupancy of 2 adults and 2 children 17 years old or below. In case of 3 or 4 adults, there will be a US$20++ surcharge for the 3rd adult, and another US$20++ surcharge for the 4th adult, per night. In no case may there be more than 4 persons, regardless of age, in the room.</p>";

	} elseif ( $rmType == 13 ){
		
		$roomTypeText = $roomTypeText . "<p class='iBold Tealcolor'>Spa Indulgence Room and Package Description</p>" .
		"<p class='iJustify'>Zen inspired room located inside Mogambo Spring's stunning 18th century Japanese Village setting." .
		"<p class='iJustify'>The room's furniture includes a low Japanese bed and Japanese table with zabuton. It is a bit smaller than our regular rooms, and has no view from the inside (but a stunning view of our spa as soon as you step out). This room is not recommended for persons with disabilities, or who have difficulty rising from a low bed position." .
		"<p class='iJustify'>The daily rate includes the guest room, a herbal or a floral bath for two, an aromatherapy oil massage for two, unlimited use of the spa facilities, and spa products as souvenirs - all a great value for spa enthusiasts." .
		"<p class='iBold Tealcolor'>Spa Indulgence Room and Package Occupancy</p>" .
		"<p class='iJustify'>This room is intended for a maximum occupancy of 2 adults.  Children 17 years old and below are not allowed.  Not suitable for persons with disabilities.  In no case may there be more than 2 adults in the room.";
		
	} elseif ( $rmType == 15 ){
		
		$roomTypeText = $roomTypeText . "<p class='iBold Tealcolor'>Family Room Description</p>" .
		"<p class='iJustify'>These rooms can accommodate a family of 6 in a single room, in 2 bunk beds (4 singles) and a Queen bed.  Equipped with a TV and DVD player, game machine for the children, bean bags, a dining area, and complimentary beverages and snack foods.  Located on the second and third floors, these rooms have no balcony and the views are impaired." .
		"<p class='iBold Tealcolor'>Family Room Occupancy</p>" .
		"<p class='iJustify'>This room is intended for a maximum occupancy of 4 adults and 2 children. In no case may there be more than 4 adults and 2 children in the room, or more than 4 adults regardless of the number of children.";

	} elseif ( $rmType == 8 ){
		
		$roomTypeText = $roomTypeText . "<p class='iBold Tealcolor'>One Bedroom Suite Description</p>" .
		"<p class='iJustify'>With varying configurations, our one-bedroom suites provide twice the space of the regular rooms, and are most suitable for 2 adults with one or two older children and a nanny." .
		"<p class='iBold Tealcolor'>One Bedroom Suite Occupancy</p>" .
		"<p class='iJustify'>This room has a recommended room capacity of 3 adults and 2 children 17 years old and below. Maximum room capacity is 5 persons, with a US$20++ surcharge for the 4th adult, and another US$20++ surcharge for the 5th adult, per night. In no case may there be more than 5 persons, regardless of age, in the room.";

	} elseif ( $rmType == 9 ){
		
		$roomTypeText = $roomTypeText . "<p class='iBold Tealcolor'>Two Bedroom Suite Description</p>" .
		"<p class='iJustify'>Two master's bedrooms both with extra-large bathrooms; living room with powder room. These suites are on the second floor and enjoy excellent views with an open-air lounge and sitting area. The most popular choice for two couples vacationing together, and families with several children/nannies." .
		"<p class='iBold Tealcolor'>Two Bedroom Suite Occupancy</p>" .
		"<p class='iJustify'>This room has a recommended room capacity of 6 persons regardless of age. Maximum room capacity is 8 persons, with a US$20++ surcharge for the 7th person, and another US$20++ surcharge for the 8th person, per night. In no case may there be more than 8 persons, regardless of age, in the room.";
		
	} elseif ( $rmType == 12 ){
		
		$roomTypeText = $roomTypeText . "<p class='iBold Tealcolor'>Quantum Villa Description</p>" .
		"<p class='iJustify'>A cabana-type suite with 4 detached bedrooms, private dipping pool and gazebo. Also with an air-conditioned pavilion ideal for meetings or family gatherings. These rooms do not have any view of the lagoons. The rooms and pavilion are inward-facing to a private garden, with the dipping pool.</p>" .
		"<p>Includes:</p>" .
			"<ul style='padding-left:15px;' class='iJustify'><li><strong>VIP Express Package.</strong> A private chauffeur-driven car to and from the hotel. " .
			"Check-in and check-out in the privacy of your room without passing through the lobby.</li>" .
			"<li>Complimentary mini-bar beverages and light snacks upon arrival.</li>" .
			"<li>Daily afternoon High Tea Service.</li></ul>" .
			"<p class='iBold Tealcolor'>Quantum Villa Occupancy</p>" .
			"<p class='iJustify'>This room has a recommended capacity of 8 adults plus 8 children 17 years old and below. Maximum capacity is 16 persons, regardless of age.  In no case may there be more than 16 persons, with a maximum of 12 adults, in the room.";
		
	} elseif ( $rmType == 11 ){

		$roomTypeText = $roomTypeText . "<p class='iBold Tealcolor'>Penthouse Suite Description</p>" .
		"<p class='iJustify'>A 2-bedroom suite on two floors.  The master's bedroom overlooks Mogambo Falls, and has a private terrace.  The second bedroom has wraparound views of the resort.  With an open-air lounge and sitting area perfect for entertaining.</p>" .
		"<p>Includes:</p>" .
			"<ul style='padding-left:15px;' class='iJustify'><li><strong>VIP Express Package. </strong>A private chauffeur-driven car to and from the hotel. " .
			"Check-in and check-out in the privacy of your room without passing through the lobby.</li>" .
			"<li>Complimentary minibar beverages and light snacks upon arrival.</li></ul>" .
		"<p class='iBold Tealcolor'>Penthouse Suite Occupancy</p>" .
		"<p class='iJustify'>This room has a recommended room capacity of 6 persons regardless of age. Maximum room capacity is 8 persons, with a US$20++ surcharge for the 7th person, and another US$20++ surcharge for the 8th person, per night. In no case may there be more than 8 persons, regardless of age, in the room.";
		
	} elseif ( $rmType ==  10 ){
		
		$roomTypeText = $roomTypeText . "<p class='iBold Tealcolor'>Riverboat Suite  Description</p>" .
		"<p class='iJustify'>A 2-bedroom cottage with an open-air living room, built on stilts over flowing water, beautifully shaded by spreading acacia trees." .
		"<p>Includes:</p>" .
			"<ul style='padding-left:15px;' class='iJustify'><li><strong>VIP Express Package. </strong>A private chauffeur-driven car to and from the hotel. " .
			"Check-in and check-out in the privacy of your room without passing through the lobby.</li>" .
			"<li>Complimentary mini-bar beverages and light snacks upon arrival.</li></ul>" .
		"<p class='iBold Tealcolor'>Riverboat Suite Occupancy</p>" .
		"<p class='iJustify'>This room has a recommended room capacity of 6 persons regardless of age. Maximum room capacity is 8 persons, with a US$20++ surcharge for the 7th person, and another US$20++ surcharge for the 8th person, per night. In no case may there be more than 8 persons, regardless of age, in the room.";	
		
	}	
}	

// CANCELLATION NOTICE / Conditions Applied 
$cancelNotice = $_POST['cancelNotice'];

$sqlString = $_POST['sqlString'];
// 1 - Peak, 2 - blackout, 3 - One Of a kind, 4 - Spa, 5 - GDR , 6 - Non peak

if ( $ConditionsApplied === "1" ){
	$cancelNoticeText = "<p class='Tealcolor iBold'>PEAK PERIOD</p>" .
						"<p class='iJustify'>Full payment is required upon reservations. In any event of cancellation, the hotel will charge the total number of room nights reserved.</p>";
} elseif ( $ConditionsApplied === "2" ){
	$cancelNoticeText = "<p class='Tealcolor iBold'>BLACK OUT DATES</p>" .
						"<p class='iJustify'>Full payment is required upon reservations. In any event of cancellation, the hotel will charge the total number of room nights reserved.</p>";
} elseif ( $ConditionsApplied === "3" ){
	$cancelNoticeText = "<p class='Tealcolor iBold'>ONE OF A KIND SUITE ROOM</p>" .
						"<p class='iJustify'>You have reserved a one of a kind suite room. A full advance payment is required to guarantee the reservations.</p>" .
						"<p class='iJustify'>For cancellation made less than 48 hours or No Show, the hotel will impose One Night cancellation charge.</p>";
} elseif ( $ConditionsApplied === "4" ){
	$cancelNoticeText = "<p class='Tealcolor iBold'>SPA INDULGENCE PACKAGE</p>" .
						"<p class='iJustify'>You have reserved our Spa Indulgence Package. A full advance payment is required to guarantee the reservations.</p>" .
						"<p class='iJustify'>For cancellation made less than 48 hours or No Show, the hotel will impose One Night cancellation charge.</p>";
} elseif ( $ConditionsApplied === "5" ){
	$cancelNoticeText = "<p class='Tealcolor iBold'>GREAT DISCOUNTED RATE</p>" .
						"<p class='iJustify'>You are availing of our <strong>Great Discounted Rate Promo (Non-Peak Dates)</strong>, with a minimum of 6 nights stay or more. We require full payment upon reservations. No refund shall be made in any event of cancellation.</p>";
} elseif ( $ConditionsApplied === "6" ){
	$cancelNoticeText = "<p class='Tealcolor iBold'>NON-PEAK PERIOD</p>" .
						"<p class='iJustify'>We only require your credit card details to guarantee your reservation. For cancellation made less than 48 hours or No Show, the hotel will impose One Night cancellation charge.</p>";
}

// GUEST TEXT/DISPLAY, for (Guests : $guestText) line
if ( $Adults > 1 ){ 
	if ( $Children == 0 ){ //Adults
		$guestText = "<strong class='Tealcolor'>" . $Adults . " </strong> Adults";
	} elseif ( $Children == 1 ){ //Adults - Child
		$guestText = "<strong class='Tealcolor'>" . $Adults . " </strong> Adults " . " and <strong class='Tealcolor'>" . $Children . "</strong> Child";
	} else {//Adults - Children
		$guestText = "<strong class='Tealcolor'>" . $Adults . " </strong> Adults " . " and <strong class='Tealcolor'>" . $Children . "</strong> Children";
	}
} elseif ( $Adults == 1 ){
	if ( $Children == 0 ){ //Adult
		$guestText = "<strong class='Tealcolor'>" . $Adults . " </strong> Adult";
	} elseif ( $Children == 1 ){ //Adult - child
		$guestText = "<strong class='Tealcolor'>" . $Adults . " </strong> Adult " . " and <strong class='Tealcolor'>" . $Children . "</strong> Child";
	} else { //Adult - Children
		$guestText = "<strong class='Tealcolor'>" . $Adults . " </strong> Adult " . " and <strong class='Tealcolor'>" . $Children . "</strong> Children";
	}
}

?>

<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1"> 
<title>Plantation Bay Resort and Spa: Book Now</title>
<link rel="stylesheet" href="jqm142min.css" />
<link rel="stylesheet" href="rlmj.css">
<script src="jq1102min.js"></script>
<script src="jqm142min.js"></script>
</head>
<body>
<!--Plantation Bay Resort and Spa Guest Confirmation -->
<div data-role="page" id="confirmation">	
	<div data-role="content">
		<div id="Conf" style="margin:0 auto;max-width:100%;margin-top:8px;">
			<div style="margin: 0 auto;max-width:780px;border:10px solid teal;">
				<div id="Confheader" style="margin:0 auto;max-width:780px;background:white;">	
					<img src="confHead1.jpg" style="display: block;margin: 0 auto; max-width:100%;" alt="Plantation Bay Resort and Spa" />
					<p style="text-align:right;margin-right:8px;font:bold 24px Arial;margin-top:-35px;">RESERVATION CONFIRMATION</p>
				</div>	
					<div style="padding-left:10px;">
						<p>Dear <?php echo $GuestPrefix . " " . $GuestLast; ?>,</p>
						<p>Thank you for choosing Plantation Bay Resort and Spa for your holiday.</p>
						<p>We are glad to confirm your reservations, with the following details:</p>

						<table  style="padding-left:5px;">
							<tr><td>Confirmation Number </td><td>:</td><td><?php echo $ConfirmationNum; ?></td></tr>				
							<tr><td>Registered Name </td><td>:</td><td><?php echo $guestName; ?></td></tr>
							<tr><td>Guests </td><td>:</td><td><?php echo $guestText; ?></td></tr>
							<tr><td>Stay </td><td>:</td><td><?php echo getDateRangeText($ArrivalDate, $DepartureDate , 0); ?></td></tr>
							<?php if ( strlen( $Remarks ) > 0 ){ echo "<tr><td>Remarks </td><td>:</td><td>$Remarks</td></tr>"; } ?>
							
						</table>
					</div>	
					
					<div class="spacer5px"></div>
					<div class="spacer15px"></div>
					<div class="custom-corners" style="margin:0 auto;">
						<div class="ui-bar ui-bar-a bgLightGreen">
							<h4>Computation</h4>
						</div>
						<div class="ui-body ui-body-a" style="background-color:#FFFFDD">				
							<table id="confComputations" class="confComputations" style="margin:0 auto;">
								<?php include_once('computeNaLeox.php'); ?>
							</table>
						</div>
					</div>						
					<div class="spacer15px"></div>
					
					<div class="custom-corners" style="margin:0 auto;">
						<div class="ui-bar ui-bar-a bgLightGreen">
							<h4>Conditions Applied</h4>
						</div>
						<div class="ui-body ui-body-a" style="background-color:#FFFFDD">
							<?php echo $cancelNoticeText; ?>
							<p><i><strong>Note:</strong> All credit card payments will be charged in Philippine Pesos at the hotel's prevailing selling rate of exchange upon check-in.</i></p>
						</div>
					</div>
					<div class="spacer15px"></div>
					<div class="custom-corners" style="margin:0 auto;">
						<div class="ui-bar ui-bar-a bgLightGreen">
							<h4>Room Details</h4>
						</div>
						<div class="ui-body ui-body-a" style="background-color:#FFFFDD">
							<?php echo $roomTypeText; ?>
						</div>
					</div>
					
					<!--
					<div class="spacer5px"></div>
					<div class="ui-corner-all custom-corners" style="margin:0 auto;">
						<div class="ui-bar ui-bar-a" style="background: rgba(111,172,104,.2);">
							<h4 class="Tealcolor">Inclusions</h4>
						</div>
						<div class="ui-body ui-body-a">
							<ul>
								<li>Roundtrip scheduled airport transfers</li>
								<li>Welcome drink and cold towel upon arrival</li>
								<li>One liter of mineral water( replenished daily)</li>
								<li>A basket of Philippine delicacies (more interesting than a fruit basket you won&#8217;t eat)</li>
								<li>Coffee and tea-making facilities</li>
								<li>Broadband internet access in the rooms</li>
								<li>WIFI in selected public areas</li>
								<li>Butler Service</li>
								<li>The country&#8217;s largest variety of leisure activities and facilities (most complimentary, some with a charge)</li>
								<li>Roundtrip scheduled shuttle service to Cebu City malls (SM or Ayala)</li>
							</ul>
						</div>
					</div>-->
					<div class="spacer15px"></div>
					
					<div class="custom-corners">
						<div class="ui-bar ui-bar-a bgLightGreen">
							<h4>Reminders</h4>
						</div>
						<div class="ui-body ui-body-a" style="background-color:#FFFFDD">
							<ol style="padding-left:3px;">
								<li class="iJustify">If arriving by air, please proceed to our booth at the arrival area and our Airport Rep will assist you. In the event that our Airport Representative is not available at the booth, please contact the Duty Manager at (+63) 917-631-3675. Our shuttle bus is complimentary and runs about every 1 1/2 hours, but if you would have to wait more than about 20 minutes we will, at no expense to you, arrange a transfer by hired car. (This hired-car alternative is solely at the hotel's option and will only be offered for arrivals, not departures.) Our hotel-to-airport shuttle schedule is also every 1 1/2 hours; please select the most convenient one.</li>
								<li class="iJustify"><strong>Check-in time is 3 PM.</strong> Should you arrive earlier, we will make every effort to get you into your room sooner; this is usually but not always possible. On peak days, due to late departure of outgoing guests, we may sometimes not be able to check you in by 3 PM but if so we will provide you with changing facilities and complimentary refreshments.</li>
								<li class="iJustify">Please take careful note of the maximum occupancy for your type of room. Our occupancy norms are generous compared with most other hotels, but we do enforce them.</li>
								<li class="iJustify">While of course you are welcome to invite local friends and relatives to see you or dine with you at the resort, for non-registered guests who wish to use the swimming and other leisure facilities there will be a charge of P 2000 for the day (inclusive of a set lunch). Please advise us in advance.</li>
								<li class="iJustify"><strong>Check-out time is 12 Noon.</strong> A half-day surcharge will be applied to late check-outs. </li>
							</ol>
						</div>
					</div>	
					<div class="spacer15px"></div>
					
					<p class="iJustify" style="margin-left:10px; margin-right:10px;">Should there be any changes in your arrangements, please feel free to contact us at (6332) 236-9040 (Direct) and (6332) 505-9800 (Trunkline), or send an email to rsvns@plantationbay.com, citing this confirmation number: <?php echo $ConfirmationNum; ?>.</p>
					<p class="iJustify" style="margin-left:10px; margin-right:10px;">Thank you for choosing Plantation Bay Resort and Spa. We look forward to welcoming you</p>
					
					<div class="spacer5px"></div>
					
					<p style="margin-left:10px; margin-right:10px;">Sincerely,<br>Plantation Bay Resort and Spa
						<br>Marigondon, Mactan Island
						<br>Cebu, Philippines 6015
						<br><a href="http://www.plantationbay.com" target="_blank">plantationbay.com</a>
					</p><div class="spacer15px"></div><div class="spacer15px"></div>
					<hr />
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
					<!--
				<div style="margin:0 auto;max-width:780px;background-color:teal;">
					<table style="margin:0 auto;;max-width:780px;">
						<tbody>
							<tr>
								<td valign="top" align="center" style="padding-top:25px;">
									<div style="font-family:MuseoSansFive,'Lucida Grande','Lucida Sans Unicode',Verdana,sans-serif; font-style:500; text-align:center; display:block;">
										<span style="font-size:13px;line-height:19px;color:#FFFFFF;margin:0;padding:0;">
											<a target="_blank" href="http://online.plantationbay.com/mobile/index.html" style="color:#FFFFFF; text-decoration:none;" name="FooterScience">HOME</a>
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											<a target="_blank" href="http://online.plantationbay.com/mobile/rooms.html" style="color:#FFFFFF; text-decoration:none;" name="FooterAbout">ROOMS</a>
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											<a target="_blank" href="http://online.plantationbay.com/mobile/packages.html" style="color:#FFFFFF; text-decoration:none;" name="FooterJobs">PACKAGES</a>
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											<a target="_blank" href="http://online.plantationbay.com/mobile/dining.html" style="color:#FFFFFF; text-decoration:none;" name="FooterPress">DINING</a>
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											<a target="_blank" href="http://online.plantationbay.com/mobile/spa.html" style="color:#FFFFFF; text-decoration:none;" name="FooterPress">SPA</a>
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											<a target="_blank" href="http://online.plantationbay.com/mobile/activities.html" style="color:#FFFFFF; text-decoration:none;" name="FooterPress">ACTIVITIES</a>
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											<a target="_blank" href="http://online.plantationbay.com/mobile/photogallery.html" style="color:#FFFFFF; text-decoration:none;" name="FooterPress">GALLERY</a>
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											<a target="_blank" href="http://online.plantationbay.com/mobile/myreservation.html" style="color:#FFFFFF; text-decoration:none;" name="FooterPress">MY RESERVATION</a>
										</span>
									</div>
								</td>
							</tr>
							<tr>
								<td valign="top" align="center" style="padding-top:18px;">
									<table width="135" cellspacing="0" cellpadding="0" border="0" align="center">
										<tbody>
											<tr>
												<td width="37" valign="top" align="left">
													<a name="facebook" target="_blank" href="http://www.facebook.com/plantationbayresort.cebu">
														<img height="24" width="24" border="0" title="Plantation Bay Resort and Spa on Facebook" style="display:block;" alt="Plantation Bay Resort and Spa on Facebook" src="http://plantationbay.com/wp-content/themes/plantaccess/images/facebook.png">
													</a>
												</td>
												<td width="37" valign="top" align="left">
													<a name="tripadvisor" target="_blank" href="http://www.tripadvisor.co.uk/Hotel_Review-g298461-d477886-Reviews-Plantation_Bay_Resort_And_Spa-Lapu_Lapu_Mactan_Island_Cebu_Visayas.html">
														<img height="24" width="24" border="0" title="Plantation Bay Resort and Spa on TripAdvisor" style="display:block;" alt="Plantation Bay Resort and Spa on TripAdvisor" src="http://plantationbay.com/wp-content/themes/plantaccess/images/tripadvisor.png">
													</a>
												</td>
												<td width="37" valign="top" align="left">
													<a name="twitter" target="_blank" href="https://twitter.com/PBayCebu">
														<img height="24" width="24" border="0" title="Plantation Bay Resort and Spa on Twitter" style="display:block;" alt="Plantation Bay Resort and Spa on Twitter" src="http://plantationbay.com/wp-content/themes/plantaccess/images/twitter.png">
													</a>
												</td>
												<td width="37" valign="top" align="left">
													<a name="gplus" target="_blank" href="https://plus.google.com/104994160527092577203">
														<img height="24" width="24" border="0" title="Plantation Bay Resort and Spa on Google+" style="display:block;" alt="Plantation Bay Resort and Spa on Google+" src="http://plantationbay.com/wp-content/themes/plantaccess/images/gplus.png">
													</a>
												</td>
												<td width="24" valign="top" align="left">
													<a name="youtube" target="_blank" href="http://www.youtube.com/user/plantationbayresort">
														<img height="24" width="24" border="0" title="Plantation Bay Resort and Spa on Youtube" alt="Plantation Bay Resort and Spa on Youtube" src="http://plantationbay.com/wp-content/themes/plantaccess/images/youtube.png">
													</a>
												</td>
												<td width="24" valign="top" align="left">
													<a name="pinterest" target="_blank" href="http://pinterest.com/plantationbay/">
														<img height="24" width="24" border="0" title="Plantation Bay Resort and Spa on Pinterest" style="display:block;" alt="Plantation Bay Resort and Spa on Pinterest" src="http://plantationbay.com/wp-content/themes/plantaccess/images/Pinterest.png">
													</a>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr>
								<td valign="top" align="center" style="padding-top:16px;padding-bottom:70px;">
									<table width="600" cellspacing="0" cellpadding="0" border="0"  align="center" style="margin:0 auto;">
										<tbody>
											<tr>
												<td style="padding-top:6px;">
													<center>
														<div style="font-family:MuseoSans,'Lucida Grande','Lucida Sans Unicode',Verdana,sans-serif; font-style:normal; text-align:center; display:block;">
															<span style="font-size:11px;line-height:18px;color:#FFFFFF;margin:0;padding:0;"> 
																<a target="_blank" href="#" style="color:#FFFFFF; text-decoration:none;">&copy;2014 Plantation Bay Resort and Spa. All rights reserved. Design and development by Leox.
															</span>
														</div>
													</center>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>				
				</div>-->
			</div>
		</div>
	</div>
	
  <!-- end content --> 

</div>
<!-- end confirmation page --> 
</body>
</html>