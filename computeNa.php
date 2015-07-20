<?php
//include_once('bDoTtcennoC.php');
//*************START OF COMPUTATIONS****************//

// Get guest number of rooms
$queryGuestRooms = mysql_query( "select t1.numberofrooms,t2.* from guestreservert as t1 inner join roomtypesetup as t2 on t1.rtid=t2.rtid where t1.guestid=".$guestID );
$rows_GuestRooms = mysql_num_rows($queryGuestRooms);
$rmCompute = ""; $extraAdults = 0; $amtNP = 0; $amtP = 0; $amtBO = 0; $amtGDR = 0; $roomTotal = 0; $grandTotal = 0; $totalRequiredAmt = 0; $OnekindSpa = 0;
$adultTotal = 0; $childTotal = 0; $maxExtraTotal = 0; $amtExtraAdult = 0; $resAdultTotal = 0; $foundPHRB2KK = 0;
$withbFast = 0; $bfastText=""; $bfastTotal=0; $totalRoomCount=0;
// for discount
$less50PercentAmount = 0; $lessDollarDiscAmount = 0;

while ( $row = mysql_fetch_assoc( $queryGuestRooms )){

	$numberofrooms = (int)$row[ 'numberofrooms' ];
	$RTID = (int) $row[ 'RTID' ];
	$roomtypedesc = $row[ 'RoomTypeDesc' ];
	$roomtype = $row[ 'RoomType' ];
	$BreakP = $row[ 'BreakP' ];
	$BreakMsg = $row[ 'BreakMsg' ];
	$roomadults = (int) $row[ 'Adults' ];
	$roomchildren = (int) $row[ 'Children' ];
	$RequiredPay = $row[ 'RequiredPay' ];
	$AgeRegarless = $row[ 'AgeRegarless' ];
	$WithVat = $row[ 'WithVat' ];
	$WithSC = $row[ 'WithSC' ];
	$GDRNotApply = $row[ 'GDRNotApply' ];
	$PriceNP = (float)$row[ 'PriceNP' ];
	$PriceP = (float)$row[ 'PriceP' ];
	$PriceNP1 = (float)$row[ 'PriceNP1' ];
	$PriceP1 = (float)$row[ 'PriceP1' ];
	$maxextra = (int) $row[ 'MaxExtra' ];
	$startdate = $row[ 'Startdate' ];

	if ( $numberofrooms > 0 ){ // Check if there is Number of rooms to be reserve
			
		$adultTotal = $adultTotal + $roomadults * $numberofrooms; 
		$childTotal = $childTotal + $roomchildren * $numberofrooms;
		$maxExtraTotal = $maxExtraTotal + $maxextra * $numberofrooms;
		$totalRoomCount = $totalRoomCount + $numberofrooms;
		echo "<tr><td colspan=3 class='iBold Tealcolor'> $roomtypedesc </td></tr>";
		
		if ( $totalNights >= 6 && $roomtype != "SPA" ){ // GDR	- SPA not included.
			$rateGDR = $PriceNP * .75;
			
			if ( $cntNP > 0 ){

				$amtGDR = $rateGDR * $cntNP * $numberofrooms;

				echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Great Discounted Rate (Non-Peak) $$rateGDR  x  $cntNP ", AddRemoveSs( "night", $cntNP ), " x $numberofrooms ", AddRemoveSs( "room", $numberofrooms ), " </td>",
					"<td style='text-align:right;padding-right:12px;'>", number_format( $amtGDR, 2 ), "</td></tr>";
			}
						
			if ( $cntBO > 0 ){
							
				$amtBO = $rateGDR * $cntBO * $numberofrooms;
				echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Black out ", AddRemoveSs( "date", $cntBO ), " ( ", getDateRangeText( $startBO, $endBO, 1 ), " ) $ $rateGDR x $cntBO ", AddRemoveSs( "night", $cntBO ), " x $numberofrooms ", AddRemoveSs( "room", $numberofrooms ), "</td>";
				echo "<td style='text-align:right;padding-right:12px;'> ", number_format( $amtBO, 2 ), "</td></tr>";
			}
		} else { //NP
					
			$rateNP = $PriceNP;
			if ( $cntNP > 0 ){
			
				$amtNP = $rateNP * $cntNP * $numberofrooms;
				
				//Required amount for QV,PH,RB & SPA days that did not belong to Peak, Black-out and GDR days
				if ( $roomtype == "QV" || $roomtype == "PH" || $roomtype == "RB" || $roomtype == "SPA" ){
				
					$OnekindSpa = $OnekindSpa + $amtNP;
				}
				// Non-Peak
				echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $$rateNP x $cntNP ", AddRemoveSs( "night", $cntNP ),
						" x $numberofrooms ", AddRemoveSs( "room", $numberofrooms ), "</td><td style='text-align:right;padding-right:12px;'>", number_format( $amtNP, 2 ), "</td></tr>";
			}
			if ( $cntBO > 0 ){
				$amtBO = $rateNP * $cntBO * $numberofrooms;
				//Black-out 
				echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Black out ", AddRemoveSs( "date", $cntBO ), " ( ",
						getDateRangeText( $startBO, $endBO, 1), " ) $$rateNP x $cntBO ", AddRemoveSs( "night", $cntBO ), " x $numberofrooms ",
						AddRemoveSs( "room", $numberofrooms), "</td><td style='text-align:right;padding-right:12px;'>", number_format( $amtBO, 2 ), "</td></tr>";
			}
		}
		if ( $cntP ){ //Peak
			
			$amtP = $PriceP * $cntP * $numberofrooms;					
			echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Peak rate applies for ( ", getDateRangeText( $startP, $endP, 1 ), 
					" ) $ $PriceP x $cntP ", AddRemoveSs( "night", $cntP ), " x  $numberofrooms  ", AddRemoveSs( "room", $numberofrooms),
					"</td><td style='text-align:right;padding-right:12px;'>", number_format( $amtP, 2 ), "</td></tr>";
		}

		// START Less50PercentDays, lessDollarAmountDays	
		
		$discountTotal = 0;
		
		if ( $totalNights >= 6 && ( $lessDollarAmountDays || $less50PercentDays ) ) { // GDR from Nov. 3 to Nov. 25, 2014 Only

			$Amount50 = 0; $AmountDollar = 0; $AmountGDR = 0; $DiscDays = 0; $DaysRemaining;
			
			if ( $less50PercentDays ){
				$Amount50 = ( $PriceNP * 0.5 ) * $less50PercentDays * $numberofrooms; }

			if ( $lessDollarAmountDays ){
				
				$DollarAmount = 40;
				
				if ( $roomtype == "QV" ){ $DollarAmount = 160; } 
				else if ( $roomtype == "1BK" ){ $DollarAmount = 60; } 
				else if ( $roomtype == "2KK"  || $roomtype == "RB" ){ $DollarAmount = 80; }
				
				$AmountDollar = $rateGDR - (( $PriceNP - $DollarAmount ) * 0.75 ) * $lessDollarAmountDays * $numberofrooms;
				$AmountDollar = $rateGDR - $AmountDollar;
			}
			
			$DiscDays = $lessDollarAmountDays + $less50PercentDays;
			
			if ( $DiscDays != $totalNights){
				$DaysRemaining = $totalNights - $DiscDays;
				$AmountGDR = $rateGDR * $DaysRemaining * $numberofrooms; }
			
			$discountTotal = ($rateGDR * $totalNights) - $Amount50 - $AmountGDR - $AmountDollar;			
			echo "<tr  class='iBold iRedtext'><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Renovation Discount </td><td style='text-align:right;padding-right:12px;'> - ", number_format( $discountTotal, 2 ), "</td></tr>";
			
		} else { // NOn - GDR from Nov. 3 to Nov. 25, 2014 Only
			if ( $less50PercentDays ){
				
				echo "<tr><td colspan=3 class='iBold iRedtext'>&nbsp;&nbsp;&nbsp; Renovation discount </td></tr>";

				$less50PercentAmount = ( $PriceNP * 0.5 ) * $less50PercentDays * $numberofrooms;
				$discountTotal = $discountTotal + $less50PercentAmount;
				
				echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nights w/ 50% off (", getDateRangeText( $start50Percent, $end50Percent, 1 ),
					") </td><td class='iBold iRedtext' style='text-align:right;padding-right:12px;'> - ", number_format( $less50PercentAmount, 2 ), "</td></tr>";
			}
			
			if ( $lessDollarAmountDays ){
			
				if ( !$less50PercentDays ){ echo "<tr><td colspan=3 class='iBold iRedtext'>&nbsp;&nbsp;&nbsp; Renovation discount </td></tr>"; }
				
				$DollarAmount = 40;				
				if ( $roomtype == "QV" ){ $DollarAmount = 160; } 
				else if ( $roomtype == "1BK" ){ $DollarAmount = 60; } 
				else if ( $roomtype == "2KK"  || $roomtype == "RB" ){ $DollarAmount = 80; }

					$lessDollarDiscAmount = $DollarAmount * $lessDollarAmountDays * $numberofrooms;
					$discountTotal = $discountTotal + $lessDollarDiscAmount;
					echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nights w/ $$DollarAmount off (", getDateRangeText( $startDollarAmount, $endDollarAmount, 1 ),
						") </td><td class='iBold iRedtext' style='text-align:right;padding-right:12px;'> - ", number_format( $lessDollarDiscAmount, 2 ), "</td></tr>";
			}
		}
		// END less50PercentDays, lessDollarAmountDays	
	
		//$roomTotal = $roomTotal + $amtNP + $amtP + $amtBO + $amtGDR;
		$roomTotal = $roomTotal + $amtNP + $amtP + $amtBO + $amtGDR - $discountTotal;
		//$totalRequiredAmt = $totalRequiredAmt + $OnekindSpa + $amtP + $amtBO + $amtGDR;
		if ( $totalNights >= 6 && ( $lessDollarAmountDays || $less50PercentDays ) ) { // GDR from Nov. 3 to Nov. 25, 2014 Only
			$totalRequiredAmt = $totalRequiredAmt + $OnekindSpa + $amtP + $amtBO + $amtGDR - $discountTotal;
		} else {
			$totalRequiredAmt = $totalRequiredAmt + $OnekindSpa + $amtP + $amtBO + $amtGDR;
		}

		// for Spa and One-of-a-kind guarantee, check.
		if ( $roomtype == "QV" || $roomtype == "PH" || $roomtype == "RB" ){
		
			$found1kind = 1;
		} elseif (  $roomtype == "SPA" ){
		
			$foundSpa = 1;
		}
		// 6 person regardless of age room type, check.
		if ( $roomtype == "PH" || $roomtype == "RB" || $roomtype == "2KK" ){ // 6 persons regardless of age.
		
			$foundPHRB2KK = $foundPHRB2KK + 1;
		}

//Check Breakfast Package				
		$foundBfast = 0; //$isPSBF = 0; $isFABF = 0; $isLVBF = 0; $isLSBF = 0; $isWEBF = 0; $isOBKBF = 0; $isTKKBF = 0; $isRBBF = 0; $isPHBF = 0; $isQVBF = 0; $isSPABF = 0;
		if ( $RTID == 1 && $PSBF == "Y" ){ $foundBfast = 1; $isPSBF = 1; $PSBF_rooms = $numberofrooms;}
		if ( $RTID == 15 && $FABF == "Y" ){ $foundBfast = 1; $isFABF = 1; $FABF_rooms = $numberofrooms; }
		if ( $RTID == 5 && $LVBF == "Y" ){ $foundBfast = 1; $isLVBF = 1; $LVBF_rooms = $numberofrooms; }
		if ( $RTID == 6 && $LSBF == "Y" ){ $foundBfast = 1; $isLSBF = 1; $LSBF_rooms = $numberofrooms; }
		if ( $RTID == 7 && $WEBF == "Y" ){ $foundBfast = 1; $isWEBF = 1; $WEBF_rooms = $numberofrooms; }
		if ( $RTID == 8 && $OBKBF == "Y" ){ $foundBfast = 1; $isOBKBF = 1; $OBKBF_rooms = $numberofrooms; }
		if ( $RTID == 9 && $TKKBF == "Y" ){ $foundBfast = 1; $isTKKBF = 1; $TKKBF_rooms = $numberofrooms; }
		if ( $RTID == 10 && $RBBF == "Y" ){ $foundBfast = 1; $isRBBF = 1; $RBBF_rooms = $numberofrooms; }
		if ( $RTID == 11 && $PHBF == "Y" ){ $foundBfast = 1; $isPHBF = 1; $PHBF_rooms = $numberofrooms; }
		if ( $RTID == 12 && $QVBF == "Y" ){ $foundBfast = 1; $isQVBF = 1; $QVBF_rooms = $numberofrooms; }
		if ( $RTID == 13 && $SPABF == "Y" ){  $foundBfast = 1; $isSPABF = 1; $SPABF_rooms = $numberofrooms; }		
	}	
}
// CHECK for PH, RB, 2KK : 6 0 2 - 6 person regardless of age, 2 extra person charge.
if ( $foundPHRB2KK ){ 
	if ( ( $CntRoomTypesSelected > 1 ) && ( $foundPHRB2KK != $CntRoomTypesSelected ) ){ // NOT all room types selected are PH, RB or 2KK.
		$ageRegardless = $foundPHRB2KK * 6; // 6 person regardless of age.

		if ( $Adults < $ageRegardless ){
			
			$resAdultTotal = $Adults + $Children;
		} else {
			$resAdultTotal = $Adults;
		}

	} else { // room types selected are PH or RB or 2KK
		$resAdultTotal = $Adults + $Children;
	}

} else { // NO PH, RB & 2KK room type selected
	$resAdultTotal = $Adults;
}
//Check for Extra Adult, //<!-- Extra person charge line -->
if ( $resAdultTotal > $adultTotal ){
	$extraAdults = $resAdultTotal - $adultTotal; // number of extra adult(s)
	$amtExtraAdult = 20 * $totalNights * $extraAdults; // 20 - for $20 1 extra adult.
	$roomTotal = $roomTotal + $amtExtraAdult; // add amount to room total.	
	if ( $cntP > 0 || $cntBO > 0 || $totalNights >= 6 ){
		$totalRequiredAmt = $totalRequiredAmt + $amtExtraAdult;
	}
	// Extra person charge
	echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Extra ", AddRemoveSs( "person", $extraAdults ),
			" charge $20 x $roomNights ", AddRemoveSs( "night", $totalNights ), " x  $extraAdults ", AddRemoveSs( "person", $extraAdults ),
			"</td><td style='text-align:right;padding-right:12px;'>", number_format( $amtExtraAdult, 2 ), " </td></tr>";				
}

//Room Tax &amp; Service charge
echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Room Tax &amp; Service charge</i></td>",
		"<td style='text-align:right;padding-right:12px;'> ", number_format( $roomTotal * .232, 2 ), "</td></tr>",
	"<tr class='iBold Tealcolor'><td colspan=2>Total room rates</td>",
		"<td style='text-align:right;padding-right:12px;'> $ ", number_format( $roomTotal * 1.232, 2 ), "</td></tr>";

$computeTotal = ( $roomTotal * 1.232 );

//REQUIRED AMOUNT || ADVANCE PAYMENT
if ( $cntP > 0 || $cntBO > 0 || $totalNights >= 6 ){

	$totalRequiredAmt = $roomTotal * 1.232;	
} else {

	$totalRequiredAmt = $totalRequiredAmt * 1.232;
}

//BREAKFAST PACKAGE		
if ( $foundBfast == 1 ){ // Breakfast code 	

	echo "<tr><td colspan=3 class='iBold Tealcolor'>Special Offer Breakfast Buffet Package </td></tr><p>";

	if ( $isPSBF == 1 ){

		$bName = "Poolside Room";
		$bPrice = 30;
		$bfastPrice = ( $bPrice * $PSBF_rooms * $roomNights );
		$bfastTotal = $bfastTotal + $bfastPrice;
		echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "$bName $ $bPrice x $roomNights ",
			 AddRemoveSs( "night", $roomNights ), " x  $PSBF_rooms ", AddRemoveSs( "room", $PSBF_rooms),
			"</td><td style='text-align:right;padding-right:12px;'>", number_format( $bfastPrice, 2 ), "</td></tr>";
	}
	if ( $isFABF == 1 ){

		$bName = "Family Room";
		$bPrice = 60;
		$bfastPrice = ( $bPrice * $FABF_rooms * $roomNights );
		$bfastTotal = $bfastTotal + $bfastPrice;
		echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "$bName $ $bPrice x $roomNights ",
			 AddRemoveSs( "night", $roomNights ), " x  $FABF_rooms ", AddRemoveSs( "room", $FABF_rooms),
			"</td><td style='text-align:right;padding-right:12px;'>", number_format( $bfastPrice, 2 ), "</td></tr>";	//$AddBfast( "Family Room", 60, $numberofrooms ); 
	}
	if ( $isLVBF == 1 ){ 

		$bName = "Lagoon View Room";
		$bPrice = 30;
		$bfastPrice = ( $bPrice * $LVBF_rooms * $roomNights );
		$bfastTotal = $bfastTotal + $bfastPrice;
		echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "$bName $ $bPrice x $roomNights ",
			 AddRemoveSs( "night", $roomNights ), " x  $LVBF_rooms ", AddRemoveSs( "room", $LVBF_rooms),
			"</td><td style='text-align:right;padding-right:12px;'>", number_format( $bfastPrice, 2 ), "</td></tr>";
	}
	if ( $isLSBF == 1 ){ 

		$bName = "Lagoon Side Room";
		$bPrice = 30;
		$bfastPrice = ( $bPrice * $LSBF_rooms * $roomNights );
		$bfastTotal = $bfastTotal + $bfastPrice;
		echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "$bName $ $bPrice x $roomNights ",
			 AddRemoveSs( "night", $roomNights ), " x  $LSBF_rooms ", AddRemoveSs( "room", $LSBF_rooms),
			"</td><td style='text-align:right;padding-right:12px;'>", number_format( $bfastPrice, 2 ), "</td></tr>";
	}
	if ( $isWEBF == 1 ){ 

		$bName = "Water's Edge Room";
		$bPrice = 30;
		$bfastPrice = ( $bPrice * $WEBF_rooms * $roomNights );
		$bfastTotal = $bfastTotal + $bfastPrice;
		echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "$bName $ $bPrice x $roomNights ",
			 AddRemoveSs( "night", $roomNights ), " x  $WEBF_rooms ", AddRemoveSs( "room", $WEBF_rooms),
			"</td><td style='text-align:right;padding-right:12px;'>", number_format( $bfastPrice, 2 ), "</td></tr>";
	}
	if ( $isOBKBF == 1 ){ 

		$bName = "One Bedroom Suite";
		$bPrice = 30;
		$bfastPrice = ( $bPrice * $OBKBF_rooms * $roomNights );
		$bfastTotal = $bfastTotal + $bfastPrice;
		echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "$bName $ $bPrice x $roomNights ",
			 AddRemoveSs( "night", $roomNights ), " x  $OBKBF_rooms ", AddRemoveSs( "room", $OBKBF_rooms),
			"</td><td style='text-align:right;padding-right:12px;'>", number_format( $bfastPrice, 2 ), "</td></tr>";
	}
	if ( $isTKKBF == 1 ){ 

		$bName = "Two Bedroom Suite";
		$bPrice = 60;
		$bfastPrice = ( $bPrice * $TKKBF_rooms * $roomNights );
		$bfastTotal = $bfastTotal + $bfastPrice;
		echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "$bName $ $bPrice x $roomNights ",
			 AddRemoveSs( "night", $roomNights ), " x  $TKKBF_rooms ", AddRemoveSs( "room", $TKKBF_rooms),
			"</td><td style='text-align:right;padding-right:12px;'>", number_format( $bfastPrice, 2 ), "</td></tr>";
	}
	if ( $isRBBF == 1 ){ 

		$bName = "Riverboat Suite";
		$bPrice = 60;
		$bfastPrice = ( $bPrice * $RBBF_rooms * $roomNights );
		$bfastTotal = $bfastTotal + $bfastPrice;
		echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "$bName $ $bPrice x $roomNights ",
			 AddRemoveSs( "night", $roomNights ), " x  $RBBF_rooms ", AddRemoveSs( "room", $RBBF_rooms),
			"</td><td style='text-align:right;padding-right:12px;'>", number_format( $bfastPrice, 2 ), "</td></tr>";
	}
	if ( $isPHBF == 1 ){ 

		$bName = "Penthouse Suite";
		$bPrice = 60;
		$bfastPrice = ( $bPrice * $PHBF_rooms * $roomNights );
		$bfastTotal = $bfastTotal + $bfastPrice;
		echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "$bName $ $bPrice x $roomNights ",
			 AddRemoveSs( "night", $roomNights ), " x  $PHBF_rooms ", AddRemoveSs( "room", $PHBF_rooms),
			"</td><td style='text-align:right;padding-right:12px;'>", number_format( $bfastPrice, 2 ), "</td></tr>";
	}
	if ( $isQVBF == 1 ){

		$bName = "Quantum Villa";
		$bPrice = 120;
		$bfastPrice = ( $bPrice * $QVBF_rooms * $roomNights );
		$bfastTotal = $bfastTotal + $bfastPrice;
		echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "$bName $ $bPrice x $roomNights ",
			 AddRemoveSs( "night", $roomNights ), " x  $QVBF_rooms ", AddRemoveSs( "room", $QVBF_rooms),
			"</td><td style='text-align:right;padding-right:12px;'>", number_format( $bfastPrice, 2 ), "</td></tr>";	
	}
	if ( $isSPABF == 1 ){

		$bName = "Spa Indulgence Room & Package";
		$bPrice = 30;
		$bfastPrice = ( $bPrice * $SPABF_rooms * $roomNights );
		$bfastTotal = $bfastTotal + $bfastPrice;
		echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "$bName $ $bPrice x $roomNights ",
			 AddRemoveSs( "night", $roomNights ), " x  $SPABF_rooms ", AddRemoveSs( "room", $SPABF_rooms),
			"</td><td style='text-align:right;padding-right:12px;'>", number_format( $bfastPrice, 2 ), "</td></tr>";
	}
	//Food Tax & Service charge
	 echo "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Food Tax &amp; Service charge</i></td>",
			"<td style='text-align:right;padding-right:12px;'>", number_format( $bfastTotal * .232, 2 ), "</td></tr>",
			"<tr class='iBold Tealcolor'><td colspan='2'>Breakfast Package Total</td>",
			"<td style='text-align:right;padding-right:12px;'> $ ", number_format( $bfastTotal * 1.232, 2 ), "</td></tr>";
			
	$computeTotal = $computeTotal + ( $bfastTotal * 1.232 );
	$rmCompute = $rmCompute + $bfastText;
}

//ADD BFAST TOTAL TO REQUIRED AMOUNT
if ( $totalRequiredAmt > 0 ){
	$totalRequiredAmt = $totalRequiredAmt + ( $bfastTotal * 1.232 );
}

//ADD-ONS
//$totalRequiredAmt = $totalRequiredAmt * 1.232;
if ( $VEP == "Y" ){
	$AddOnName = "VIP Express Package";
	$AddOnPrice = 50;
	$vepRmTotal = $AddOnPrice * $totalRoomCount;
	$totalRequiredAmt = $totalRequiredAmt + $vepRmTotal;
	$computeTotal = $computeTotal + $vepRmTotal;
	echo "<tr><td colspan=2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $AddOnName ( $$AddOnPrice nett x  $totalRoomCount ", AddRemoveSs( "room", $totalRoomCount ), " )</td>",
			"<td style='text-align:right;padding-right:12px;'> ", number_format( $vepRmTotal, 2 ), " </td></tr>";
}

if ( $RRP == "Y" ){ 
	$AddOnName = "Romantic Rendezvous Package";
	$AddOnPrice = 120;
	$rrpRmTotal = $AddOnPrice * $totalRoomCount;
	$totalRequiredAmt = $totalRequiredAmt + $rrpRmTotal;
	$computeTotal = $computeTotal + $rrpRmTotal;
	echo "<tr><td colspan=2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $AddOnName ( $$AddOnPrice nett x  $totalRoomCount ", AddRemoveSs( "room", $totalRoomCount ), " )</td>",
			"<td style='text-align:right;padding-right:12px;'> ", number_format( $rrpRmTotal, 2 ), " </td></tr>";
}
if ( $CCP == "Y" ){ 
	$AddOnName = "Cook with the Chef Package";
	$AddOnPrice = 50;
	$ccpRmTotal = $AddOnPrice * $totalRoomCount;
	$totalRequiredAmt = $totalRequiredAmt + $ccpRmTotal;
	$computeTotal = $computeTotal + $ccpRmTotal;
	echo "<tr><td colspan=2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $AddOnName ( $$AddOnPrice nett x  $totalRoomCount ", AddRemoveSs( "room", $totalRoomCount ), " )</td>",
			"<td style='text-align:right;padding-right:12px;'> ", number_format( $ccpRmTotal, 2 ), " </td></tr>";
}
if ( $PAP == "Y" ){
	$AddOnName = "Personal Assistant Package";
	$AddOnPrice = 50;
	$papRmTotal = $AddOnPrice * $totalRoomCount;
	$totalRequiredAmt = $totalRequiredAmt + $papRmTotal;
	$computeTotal = $computeTotal + $papRmTotal;
	echo "<tr><td colspan=2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $AddOnName ( $$AddOnPrice nett x  $totalRoomCount ", AddRemoveSs( "room", $totalRoomCount ), " )</td>",
			"<td style='text-align:right;padding-right:12px;'> ", number_format( $papRmTotal, 2 ), " </td></tr>";
}

	echo "<tr class='iBold Tealcolor'><td colspan=2>Grand Total (USD)</td>",
			"<td style='text-align:right;padding-right:12px;'> $ ", number_format( $computeTotal, 2 ), " </td>";
			
if ( $totalRequiredAmt > 0 ){

	echo "<tr><td colspan=3></td></tr><tr class='iBold' style='color:red;'><td colspan=2>Required Advance Payment (USD)</td>",
			"<td style='text-align:right;padding-right:12px;'> $ ", number_format( $totalRequiredAmt, 2 ), " </td>",
		"<tr><td colspan=4 style='text-align:right;font-size:14px;font-style:italic;color:#000;'>Room conversion rate is @ ", number_format( $RoomConversion, 2 ), " Php = 1 USD</td></tr>";
}

if ( $RandomNum == "31" ){
	echo "<tr><td colspan=3 style='text-align:right;'><span style='font:bold 14px Arial;color:red'>FREE : </span>Dinner for 2 at a Themed Buffet with our world-famous dance presentations, worth about P3,000!!! ( For each room booked for 4 or 5 nights )</td>";
} elseif ( $RandomNum == "32" ){
	echo "<tr><td colspan=3 style='text-align:right;'><span style='font:bold 14px Arial;color:red'>FREE : </span>Romantic dinner at Palermo Restaurant for 2 persons, worth about P3,000!!! ( For each room booked for 4 or 5 nights )</td>";
} elseif ( $RandomNum == "33" ){
	echo "<tr><td colspan=3 style='text-align:right;'><span style='font:bold 14px Arial;color:red'>FREE : </span>Unlimited Plantation Bay homemade ice cream for the duration of your stay, worth Thousands of Pesos!!! <br />( For each room booked for 4 or 5 nights )</td>";
} elseif ( $RandomNum == "34" ){	
	echo "<tr><td colspan=3 style='text-align:right;'><span style='font:bold 14px Arial;color:red'>FREE : </span>Gift certificate worth P3,000 at Fiji Restaurant!!! ( For each room booked for 4 or 5 nights )</td>";
} elseif ( $RandomNum == "40" ){
	echo "<tr><td colspan=3 style='text-align:right;'><span style='font:bold 14px Arial;color:red'>FREE : </span>Gift certificate worth P3,000 at Alien Abduction!!! ( For each room booked for 4 or 5 nights )</td>";
} elseif ( $RandomNum == "35" ){
	echo "<tr><td colspan=3 style='text-align:right;'><span style='font:bold 14px Arial;color:red'>FREE : </span>Gift certificate worth P3,000 at Palermo Restaurant!!! ( For each room booked for 4 or 5 nights )</td>";
} elseif ( $RandomNum == "36" ){
	echo "<tr><td colspan=3 style='text-align:right;'><span style='font:bold 14px Arial;color:red'>FREE : </span>Free Margaritas and Plantation Bay Coladas all throughout your stay, for 2 persons worth Thousands of Pesos!!! ( For each room booked for 4 or 5 nights )</td>";
} elseif ( $RandomNum == "37" ){
	echo "<tr><td colspan=3 style='text-align:right;'><span style='font:bold 14px Arial;color:red'>FREE : </span>1 hour and 30 minutes Hilot (Traditional Filipino Massage) for one person, worth P3,000!!! ( For each room booked for 4 or 5 nights )</td>";
} elseif ( $RandomNum == "38" ){
	echo "<tr><td colspan=3 style='text-align:right;'><span style='font:bold 14px Arial;color:red'>FREE : </span>30-minute Galvanic Spa and 1-hour Body Scrub, worth about P4,000!!! ( For each room booked for 4 or 5 nights )</td>";
} elseif ( $RandomNum == "39" ){
	echo "<tr><td colspan=3 style='text-align:right;'><span style='font:bold 14px Arial;color:red'>FREE : </span>Coral Reef Encounter worth P3,000!!! ( For each room booked for 4 or 5 nights )</td>";
}
?>
