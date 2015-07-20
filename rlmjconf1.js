

	resMonthName = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 	// Store month names in array				

	// For date ragne text to be display
	function getDateRangeText(dStart, dEnd , from){ // from = 1 - from computations , 0 - Stay
		var sDate = new Date( dStart.replace(/-/g,"/") ), 
		eDate = new Date( dEnd.replace(/-/g,"/") ), dateText = "";
		
		var sYear = sDate.getFullYear(), sMonth = sDate.getMonth(), sDay = sDate.getDate(),
			eYear = eDate.getFullYear(), eMonth = eDate.getMonth(), eDay = eDate.getDate()
			
		if ( sYear === eYear ){ //same year
			if ( from ){
				if ( sMonth === eMonth ){ // same month
					if ( sDay === eDay ){ // same day
						dateText = resMonthName[ sMonth ].substring( 0, 3 ) + " " + sDay;
					} else {
						dateText = resMonthName[ sMonth ].substring( 0, 3 ) + " " + sDay + " - " + eDay;
					}
				} else { //not the same month
					dateText = resMonthName[ sMonth ].substring( 0, 3 ) + " " + sDay + " - " + resMonthName[ eMonth ].substring(0,3) + " " + eDay;
				}
			} else {
				if ( sMonth === eMonth ){ // same month
					dateText = resMonthName[ sMonth ] + " " + sDay + " - " + eDay + ", " + eYear;
				} else { //not the same month
					dateText = resMonthName[ sMonth ] + " " + sDay + " - " + resMonthName[ eMonth ] + " " + eDay + ", " + eYear;
				}
			}	
		} else {//not the same year
			if ( from ){
				dateText = resMonthName[ sMonth ].substring( 0, 3 ) + " " + sDay + ", " + sYear + " - " + resMonthName[ eMonth ].substring(0,3) + " " + eDay + ", " + eYear;
			} else {			
				dateText = resMonthName[ sMonth ] + " " + sDay + ", " + sYear + " - " + resMonthName[ eMonth ] + " " + eDay + ", " + eYear;
			}
		}
		return dateText;
	}	

	//Determine if a word needs and  or not like. room or rooms, night or nihts :)
	function AddRemoveSs( strWord, cntValue ){
		if ( cntValue > 1 ){
			return strWord + "s";
		} else {
			return strWord;
		}
	}
	
	//Add comma in thousand number. like 1,000
	function AddComma(Num) {
		var n= Num.toString().split(".");
		n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return n.join(".");
	}
	
	function parseDate(str) {
		//var mdy = str.split('/')
		//return new Date(mdy[2], mdy[0]-1, mdy[1]);
		var ymd = str.split('-')
		return new Date( ymd[0], ymd[1]-1, ymd[2]);
	}

	function daydiff(first, second) {
		return (second-first)/(1000*60*60*24)
	}

	function IpadalaNa(){
		
		var sulod = "<!DOCTYPE HTML><html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8' /><meta name='viewport' content='width=device-width, initial-scale=1'><title>Plantation Bay Resort and Spa: Book Now</title><link rel='stylesheet' href='jqm142min.css' /><link rel='stylesheet' href='rlmj.css'><script src='jq1102min.js'></script><script src='jqm142min.js'></script></head><body>";
		sulod = sulod + $( '#Conf' ).html();
		sulod = sulod + "</body></html>";
		//console.log( sulod );
		//var sulod = "hello leox";
		
		$.ajax({
			url: 'emailNow.asp',
			type: 'POST', // GET is default
			data: {
				message: sulod
				//ConfNo: ConfirmationNum
			},
			success: function(msg) {
				alert('Data returned from PHP: ' + msg);
			},
			error: function(msg) {
				alert('AJAX request failed!' + msg);
			}
		});
	}
	var ConfirmationNum = document.getElementById( "ConfirmationNum" ).value,
		gID = document.getElementById( "guestID" ).value,
		aDate = document.getElementById( "ArrivalDate" ).value,
		dDate = document.getElementById( "DepartureDate" ).value,
		Adults = document.getElementById( "Adults" ).value,
		Children = document.getElementById( "Children" ).value,
		CntRoomTypesSelected = document.getElementById( "CntRoomTypesSelected" ).value,
		roomNights = daydiff( parseDate( aDate ), parseDate( dDate ) ),
		RoomConversion = document.getElementById( "RoomConversion" ).value,
		
		VEP = document.getElementById( "VEP" ).value,
		RRP = document.getElementById( "RRP" ).value,
		CCP = document.getElementById( "CCP" ).value,
		PAP = document.getElementById( "PAP" ).value,
		
		PSBF = document.getElementById( "PSBF" ).value,
		FABF = document.getElementById( "FABF" ).value,
		LVBF = document.getElementById( "LVBF" ).value,
		LSBF = document.getElementById( "LSBF" ).value,
		WEBF = document.getElementById( "WEBF" ).value,
		OBKBF = document.getElementById( "OBKBF" ).value,
		TKKBF = document.getElementById( "TKKBF" ).value,
		RBBF = document.getElementById( "RBBF" ).value,
		PHBF = document.getElementById( "PHBF" ).value,
		QVBF = document.getElementById( "QVBF" ).value,
		SPABF = document.getElementById( "SPABF" ).value;
		

	$( "#gStay" ).html( getDateRangeText( aDate, dDate , 0 ) );
	
	var resDepStat = new Date( dDate.replace(/-/g,"/") );
	var resDepStatless1 = resDepStat.getFullYear() + "-" + ( resDepStat.getMonth() + 1 ) + "-" + ( resDepStat.getDate() -1 ) // -1 for date sql between query

	// Determine if (NP/P/BO) Dates	
	$.getJSON( "tatSetaRmooRteg.php", { resArr: aDate, resDep: resDepStatless1 }, function( roomStat ) {
		
		var lenStat = roomStat.length - 1, rmStat = 0, cntNP = 0, cntP = 0, cntPeak = 0, cntBO = 0, 
			startP = 0, endP = 0, startBO = 0, endBO = 0, foundSpa = 0, found1kind = 0, totalNights = 0,
			prevStat = "", prevDate = "";
		
		$.each( roomStat, function( i, item ){
			rmStat = item.Dstat;
			if ( rmStat === "P" ){
			
				cntP = cntP + 1;
				totalNights = totalNights + 1;
				
				if ( !startP ){ startP = item.cdate; }
				
				if ( i === lenStat ){ endP = item.cdate; }
				
				if ( prevStat === "BO" ){ endBO = prevDate; }
				
				prevStat = "P";	//don't change the line postion, this should be at end of this block;
				
			} else if ( rmStat === "BO" ){
			
				cntBO = cntBO + 1;
				totalNights = totalNights + 1;
				
				if ( !startBO ){ startBO = item.cdate; }
				
				if ( i === lenStat ){ endBO = item.cdate; }
				
				if ( prevStat === "P" ){ endP = prevDate; }
				
				prevStat = "BO";	//don't change the line postion, this should be at end of this block;
				
			} else { //NP
			
				cntNP = cntNP + 1;
				totalNights = totalNights + 1;
				
				if ( prevStat === "P" ){
					endP = prevDate;
				} else if ( prevStat === "BO" ){ 
					endBO = prevDate; 
				}
				
				prevStat = "NP";	//don't change the line postion, this should be at end of this block;
			}
			
			prevDate = item.cdate;	//don't change the line postion, this should be at end of this block;
		});

		//console.log( "NP = " + cntNP + " , P = " + cntP + " , BO = " + cntBO + " , startP = " + startP + " , endP = " + endP + "  , startBO = " + startBO + ", endBO = " + endBO );
	
		$.getJSON( "smooRtseuGteg.php", { guestId: gID }, function( guestRooms ) {
		
			var rmCompute = "", extraAdults = 0,
				amtNP = 0, amtP = 0, amtBO = 0, roomTotal = 0, grandTotal = 0, totalRequiredAmt = 0, OnekindSpa = 0,
				adultTotal = 0, childTotal = 0, maxExtraTotal = 0,amtExtraAdult = 0, resAdultTotal = 0, foundPHRB2KK = 0,
				withbFast = 0, bfastText="", bfastTotal=0,totalRoomCount=0;

			function AddBfast( bName, bPrice, bnumberofrooms ){
					
				var correctRoomWord = AddRemoveSs( "room", bnumberofrooms );
				var correctNightsWord = AddRemoveSs( "night", roomNights );
				bfastPrice = ( bPrice * bnumberofrooms * roomNights );
				bfastTotal = bfastTotal + bfastPrice;
				bfastText = bfastText + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + bName + " $ " + bPrice + " x " + roomNights + " " + correctNightsWord + " x " + bnumberofrooms + " " + correctRoomWord + " </td><td style='text-align:right;padding-right:12px;'> " + AddComma( bfastPrice.toFixed(2) ) + "</td></tr>";
			}
									
			$.each( guestRooms, function( i, item ){

				var	numberofrooms = parseInt( item.numberofrooms ),
					RTID = parseInt( item.RTID ),
					roomtypedesc = item.roomtypedesc,
					roomtype = item.roomtype,
					BreakP = item.BreakP,
					BreakMsg = item.BreakMsg,
					adults = parseInt( item.adults ),
					children = parseInt( item.children ),
					RequiredPay = item.RequiredPay,
					AgeRegarless = item.AgeRegarless,
					WithVat = item.WithVat,
					WithSC = item.WithSC,
					GDRNotApply = item.GDRNotApply,
					PriceNP = item.PriceNP,
					PriceP = item.PriceP,
					PriceNP1 = item.PriceNP1,
					PriceP1 = item.PriceP1,
					maxextra = parseInt( item.maxextra ),
					startdate = item.startdate;
							
				if ( numberofrooms ){ // Check if there is Number of rooms to be reserve
								
					adultTotal = adultTotal + adults * numberofrooms ;
					childTotal = childTotal + children * numberofrooms ;
					maxExtraTotal = maxExtraTotal + maxextra * numberofrooms ;
					totalRoomCount = totalRoomCount + numberofrooms;

					rmCompute = rmCompute + "<tr><td colspan=3 class='iBold Tealcolor'>" + roomtypedesc + "</td></tr>";
								
					var correctRoomWord = AddRemoveSs( "room", numberofrooms );
					if ( totalNights >= 6 ){ // GDR
								
						var rateGDR = priceNP * .75;

						if ( cntNP ){
										
							var correctNightWord = AddRemoveSs( "night", cntNP );
							amtNP = rateGDR * cntNP * numberofrooms;
							
							//Required amount for QV,PH,RB & SPA days that did not belong to Peak, Black-out and GDR days
							if ( roomtype == "QV" || roomtype == "PH" || roomtype == "RB" || roomtype == "SPA" ){
								OnekindSpa = OnekindSpa + amtNP ;
							}
							
							rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Great Discounted Rate (GDR) $ " + rateGDR + " x " + cntNP + " " + correctNightWord + " x " + numberofrooms + " " + correctRoomWord + " </td><td style='text-align:right;padding-right:12px;'> " + AddComma( amtNP.toFixed(2) ) + "</td></tr>";					
						}
									
						if ( cntBO ){
										
							var boDateRange = getDateRangeText( startBO, endBO, 1);
							var correctNightWord = AddRemoveSs( "night", cntBO );
							var correctDateWord = AddRemoveSs( "date", cntBO );
										
							amtBO = rateGDR * cntBO * numberofrooms;
							rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Black out " + correctDateWord + " ( " + boDateRange + " ) $ " + rateGDR + " x " + cntBO + " " + correctNightWord + " x " + numberofrooms + " " + correctRoomWord + " </td><td style='text-align:right;padding-right:12px;'> " + AddComma( amtBO.toFixed(2) ) + "</td></tr>";
						}
					} else { //NP
								
						var rateNP = PriceNP;
						if ( cntNP ){
									
							var correctNightWord = AddRemoveSs( "night", cntNP );
							amtNP = rateNP * cntNP * numberofrooms;
							
							//Required amount for QV,PH,RB & SPA days that did not belong to Peak, Black-out and GDR days
							if ( roomtype == "QV" || roomtype == "PH" || roomtype == "RB" || roomtype == "SPA" ){
								OnekindSpa = OnekindSpa + amtNP;
							}
							
							rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $ " + rateNP + " x " + cntNP + " " + correctNightWord + " x " + numberofrooms + " " + correctRoomWord + " </td><td style='text-align:right;padding-right:12px;'> " + AddComma( amtNP.toFixed(2) ) + "</td></tr>";
						}
						if ( cntBO ){
							amtBO = rateNP * cntBO * numberofrooms;
							var boDateRange = getDateRangeText( startBO, endBO, 1);
							var correctNightWord = AddRemoveSs( "night", cntBO );
							var correctDateWord = AddRemoveSs( "date", cntBO );
							
							rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Black out " + correctDateWord + " ( " + boDateRange + " ) $ " + rateNP + " x " + cntBO + " " + correctNightWord + " x " + numberofrooms + " " + correctRoomWord + " </td><td style='text-align:right;padding-right:12px;'> " + AddComma( amtBO.toFixed(2) ) + "</td></tr>";
						}
					}

					if ( cntP ){ //Peak
								
						amtP = PriceP * cntP * numberofrooms;
						var peakDateRange = getDateRangeText( startP, endP, 1 );
						var correctNightWord = AddRemoveSs( "night", cntP );
									
						rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Peak rate applies for ( " + peakDateRange + " ) $ " + PriceP + " x " + cntP + " " + correctNightWord + " x " + numberofrooms + " " + correctRoomWord + " </td><td style='text-align:right;padding-right:12px;'> " + AddComma( amtP.toFixed(2) ) + "</td></tr>";
					}
								
					roomTotal = roomTotal + amtNP + amtP + amtBO;
					totalRequiredAmt = totalRequiredAmt + OnekindSpa + amtP + amtBO;
					// for Spa and One-of-a-kind guarantee, check.
					if ( roomtype === "QV" || roomtype === "PH" || roomtype === "RB" ){
						found1kind = 1;
					} else if (  roomtype === "SPA" ){
						foundSpa = 1;
					}
								
					// 6 person regardless of age room type, check.
					if ( roomtype === "PH" || roomtype === "RB" || roomtype === "2KK" ){ // 6 persons regardless of age.
						foundPHRB2KK = foundPHRB2KK + 1;
					}
					
					//Check Breakfast Package
					if ( RTID == 1 && PSBF == "Y" ){ AddBfast( "Poolside Room", 30, numberofrooms ); }
					if ( RTID == 15 && FABF == "Y" ){ AddBfast( "Family Room", 60, numberofrooms ); }
					if ( RTID == 5 && LVBF == "Y" ){ AddBfast( "Lagoon View Room", 30, numberofrooms ); }
					if ( RTID == 6 && LSBF == "Y" ){ AddBfast( "Lagoon Side Room", 30, numberofrooms ); }
					if ( RTID == 7 && WEBF == "Y" ){ AddBfast( "Water's Edge Room", 30, numberofrooms ); }
					if ( RTID == 8 && OBKBF == "Y" ){ AddBfast( "One Bedroom Suite", 30, numberofrooms ); }
					if ( RTID == 9 && TKKBF == "Y" ){ AddBfast( "Two Bedroom Suite", 60, numberofrooms ); }
					if ( RTID == 10 && RBBF == "Y" ){ AddBfast( "Riverboat Suite", 60, numberofrooms ); }
					if ( RTID == 11 && PHBF == "Y" ){ AddBfast( "Penthouse Suite", 60, numberofrooms ); }
					if ( RTID == 12 && QVBF == "Y" ){ AddBfast( "Quantum Villa", 120, numberofrooms ); }
					if ( RTID == 13 && SPABF == "Y" ){ AddBfast( "Spa Indulgence Room & Package", 30, numberofrooms ); }
				}	
			});
			
			// CHECK for PH, RB, 2KK : 6 0 2 - 6 person regardless of age, 2 extra person charge.
			if ( foundPHRB2KK ){ 
				if ( ( CntRoomTypesSelected > 1 ) && ( foundPHRB2KK !== CntRoomTypesSelected ) ){ // NOT all room types selected are PH, RB or 2KK.
					var ageRegardless = foundPHRB2KK * 6; // 6 person regardless of age.

					if ( Adults < ageRegardless ){
						
						resAdultTotal = Adults + Children;
					} else {
						resAdultTotal = Adults
					}

				} else { // room types selected are PH or RB or 2KK
					resAdultTotal = Adults + Children;
				}

			} else { // NO PH, RB & 2KK room type selected
				resAdultTotal = Adults;
			}
			//Check for Extra Adult
			if ( resAdultTotal > adultTotal ){
				extraAdults = resAdultTotal - adultTotal; // number of extra adult(s)
				amtExtraAdult = 20 * totalNights * extraAdults; // 20 - for $20 1 extra adult.
					
				var correctPersonWord = AddRemoveSs( "person", extraAdults );
				var correctNightWord = AddRemoveSs( "night", totalNights );
					
				roomTotal = roomTotal + amtExtraAdult; // add amount to room total.
				rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Extra " + correctPersonWord + " charge $20 x " + roomNights + " " + correctNightWord + " x " + extraAdults + " " + correctPersonWord + " </td><td style='text-align:right;padding-right:12px;'> " + AddComma( amtExtraAdult.toFixed(2) ) + "</td></tr>";
			}
				
			rmCompute = rmCompute + "<tr id='resroomTaxSc'><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Room Tax &amp; Service charge</i></td><td style='text-align:right;padding-right:12px;'>" + AddComma( ( roomTotal * .232 ).toFixed(2) ) + "</td></tr>";
			rmCompute = rmCompute + "<tr id='resTotalRm' class='iBold Tealcolor'><td colspan=2>Total room rates</td><td style='text-align:right;padding-right:12px;'> $ " + AddComma( ( roomTotal * 1.232 ).toFixed(2) ) + "</td></tr>";		
			computeTotal = ( roomTotal * 1.232 );
			
			if ( bfastTotal ){
				computeTotal = computeTotal + ( bfastTotal * 1.232 );
				rmCompute = rmCompute + "<tr><td colspan=3 class='iBold Tealcolor'>Special Offer Breakfast Buffet Package </td></tr>";
				rmCompute = rmCompute + bfastText;				
				rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Food Tax &amp; Service charge</i></td><td style='text-align:right;padding-right:12px;'>" + AddComma( ( bfastTotal * .232 ).toFixed(2) ) + "</td></tr>";
				rmCompute = rmCompute + "<tr class='iBold Tealcolor'><td colspan='2'>Breakfast Package Total</td><td style='text-align:right;padding-right:12px;'> $ " + AddComma( ( bfastTotal * 1.232 ).toFixed(2) ) + "</td></tr>";
			}
			
			
			//ADD-ONS
			
			totalRequiredAmt = totalRequiredAmt * 1.232;
			
			var correctRoomWord = AddRemoveSs( "room", totalRoomCount );			
			if ( VEP == "Y" ){ 
				var vepPrice = 50;
				var vepRmTotal = vepPrice * totalRoomCount;
				totalRequiredAmt = totalRequiredAmt + vepRmTotal;
				computeTotal = computeTotal + vepRmTotal;
				rmCompute = rmCompute + "<tr><td colspan=2>VIP Express Package ( $" + vepPrice + "nett x " + totalRoomCount + " " + correctRoomWord + " )</td><td style='text-align:right;padding-right:12px;'> " + vepRmTotal.toFixed(2) + "</td></tr>";
			}
			if ( RRP == "Y" ){ 
				var rrpPrice = 120;
				var rrpRmTotal = rrpPrice * totalRoomCount;
				totalRequiredAmt = totalRequiredAmt + rrpRmTotal;
				computeTotal = computeTotal + rrpRmTotal;
				rmCompute = rmCompute + "<tr><td colspan=2>Romantic Rendezvous Package ( $" + rrpPrice + "nett x " + totalRoomCount + " " + correctRoomWord + " )</td><td style='text-align:right;padding-right:12px;'> " + rrpRmTotal.toFixed(2) + "</td></tr>";
			}
			
			if ( CCP == "Y" ){ 
				var ccpPrice = 50;
				var ccpRmTotal = ccpPrice * totalRoomCount;
				totalRequiredAmt = totalRequiredAmt + ccpRmTotal;
				computeTotal = computeTotal + ccpRmTotal;
				rmCompute = rmCompute + "<tr><td colspan=2>Cook with the Chef Package ( $" + ccpPrice + "nett x " + totalRoomCount + " " + correctRoomWord + " )</td><td style='text-align:right;padding-right:12px;'> " + ccpRmTotal.toFixed(2) + "</td></tr>";
			}
			
			if ( PAP == "Y" ){
				var papPrice = 50;
				var papRmTotal = papPrice * totalRoomCount;
				totalRequiredAmt = totalRequiredAmt + papRmTotal;
				computeTotal = computeTotal + papRmTotal;
				rmCompute = rmCompute + "<tr><td colspan=2>Personal Assistant Package ( $" + papPrice + "nett x " + totalRoomCount + " " + correctRoomWord + " )</td><td style='text-align:right;padding-right:12px;'> " + papRmTotal.toFixed(2) + "</td></tr>";
			}
			
			rmCompute = rmCompute + "<tr class='iBold Tealcolor'><td colspan=2>Grand Total (USD)</td><td id='grandTotal' style='text-align:right;padding-right:12px;'> $ " + AddComma( computeTotal.toFixed(2) ) + "</td>";
			
			if ( totalRequiredAmt ){

				rmCompute = rmCompute + "<tr><td colspan=3></td></tr><tr class='iBold ' style='color:red;'><td colspan=2>Required Advance Payment (USD)</td><td style='text-align:right;padding-right:12px;'> $ " + AddComma( totalRequiredAmt.toFixed(2) ) + "</td>";
				rmCompute = rmCompute + "<tr><td colspan=4 style='text-align:right;font-size:14px;font-style:italic;color:#000;'>Room conversion rate is @" + parseInt( RoomConversion ).toFixed(2) + " Php = 1 USD</td></tr>";
			}
			$( "#confComputations" ).append( rmCompute );
			//console.log( $( "#Conf" ).html() );
			//IpadalaNa();
		});
	});
	

	