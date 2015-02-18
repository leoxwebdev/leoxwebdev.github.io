var roomTypes = [ "WER","LSR","LVR","PS","SIR","FR","OneBS","TwoBS","QV","RB" ], //DON'T CHANGE CHANGE THE ORDERING OF ROOM TYPES.
	roomTypesId = [ 7,6,5,1,13,15,8,9,12,10 ], //DON'T CHANGE CHANGE THE ORDERING OF ROOM TYPES.
	roomDetails = [ "WER","LSR","LVR","PS","SIR","FR","OneBS","TwoBS","QV","RB" ], //DON'T CHANGE CHANGE THE ORDERING OF ROOM TYPES.
	roomTypesDb = [ "WE", "LS", "LV", "PS", "SPA", "FA", "1BK", "2KK", "QV", "RB" ], //DON'T CHANGE CHANGE THE ORDERING OF ROOM TYPES. For DAtabase query room type.
	roomTypesDesc = [ "Water's Edge Room", "Lagoon Side Room", "Lagoon View Room", "Poolside Room", "Spa Indulgence Room & Package", "Family Room", "One Bedroom Suite", "Two Bedroom Suite", "Quantum Villa", "Riverboat Suite" ], //DON'T CHANGE CHANGE THE ORDERING OF ROOM TYPES. For DAtabase query room type.
	roomTypesRow = [ "#TRresWER", "#TRresLSR", "#TRresLVR", "#TRresPSR", "#TRresSIR", "#TRresFR", "#TRres1BS", "#TRres2BS", "#TRresQV", "#TRresRS" ], //DONT'T CHANGE THE ORDER
	resMonthName = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ], 	// Store month names in array			
	localStorageSupported, roomTypeSelected = [], hasFoundPreferredRmType = false, theDate = new Date(); //Date Today;
	
	localStorageSupported = localStorage ? 1 : 0;
	
	//This maybe temporary because db records are not the same in room details for Maximum capacity (Adults,Children and Extra Person).
	/*function setRoomCapacity( Adult, Children, Extra, RmType ){
		switch ( RmType ){
			case "WER":
				if ( Adult ){ 
					return 2;
				} else if ( Children ){ 
					return 2;
				} else { //Extra
					return 2;
				}	
			case "LSR":
				if ( Adult ){ 
					return 2;
				} else if ( Children ){
					return 2;
				} else { //Extra
					return 2;
				}	
			case "LVR":
				if ( Adult ){ 
					return 2;
				} else if ( Children ){
					return 2;
				} else { //Extra
					return 2;
				}	
			case "PS":
				if ( Adult ){ 
					return 2;
				} else if ( Children ){
					return 2;
				} else { //Extra
					return 2;
				}	
			case "SIR":
				if ( Adult ){ 
					return 2;
				} else if ( Children ){
					return 0;
				} else { //Extra
					return 0;
				}	
			case "FR":
				if ( Adult ){ 
					return 4;
				} else if ( Children ){
					return 2;
				} else { //Extra
					return 0;
				}	
			case "OneBS":
				if ( Adult ){ 
					return 3;
				} else if ( Children ){
					return 2;
				} else { //Extra
					return 2;
				}
			case "TwoBS":
				if ( Adult ){ 
					return 6; //regardless of age
				} else if ( Children ){
					return 0;
				} else { //Extra
					return 2;
				}	
			case "QV":
				if ( Adult ){ 
					return 8;
				} else if ( Children ){
					return 8;
				} else { //Extra
					return 4;
				}	
			case "RB":
				if ( Adult ){ 
					return 6; // regardless of age
				} else if ( Children ){
					return 0;
				} else { //Extra
					return 2;
				}	
		}
	}
	*/
	var roomDetailsAll = roomDetails.length;

	for ( var L = 0; L < roomDetailsAll; L = L + 1 ){
		roomDetails[ L ] = {
			roomType : roomDetails[ L ],
			isPreferred	: 1, // 1 - default, Yes
			displayId : roomTypesRow[ L ],
			//isAvailable	: 1, // 1 - default, Yes Available on preferred Dates
			isAvailable	: 0, // 0 - default, Room is not Available on preferred Dates. change 12/29/2014
			resRooms : 1, //Number of rooms to be reserve on preferred Dates
			roomNightsAvailable	: 0, // number of available room nights on preferred dates.
			priceNP	: 0,
			priceP : 0,
			newPriceNP : 0,
			newPriceP : 0,
			newRateStartDate : 0,
			priceGDR : 0,
			/*adults : setRoomCapacity(1,0,0,roomDetails[ L ]),
			children : setRoomCapacity(0,1,0,roomDetails[ L ]),
			maxextra : setRoomCapacity(0,0,1,roomDetails[ L ]),*/
			adults : 2,
			children : 2,
			maxextra : 2,
			RequiredPay : 0,
			AgeRegarless : 0,
			GDRNotApply	: 0
		};
	}
	
	resDetails = {
		resArrYear : theDate.getFullYear(),
		resArrMonth : theDate.getMonth() + 1,
		resArrDay : theDate.getDate(),
		resDepYear : theDate.getFullYear,
		resDepMonth : theDate.getMonth() + 1,
		resDepDay : theDate.getDate() + 3,
		resAdults : 2 ,
		resChildren : 2 ,
		resRoomNights : 3,
		cntPeak : 0, //Peak Dates
		cntNPeak : 0, //Non-Peak Dates
		cntBO : 0, //Black-out dates
		cntExtraPerson : 0, //Extra Person(s)
		selectedTreats : 0,
		strDatePeak : 0, //Extra Person(s)
		strDateBO : 0
	};

	function getDateRangeText( dStart, dEnd , from ){// from = 1 - from computations
	
		var sDate = new Date( dStart.replace(/-/g,"/") ),
			eDate = new Date( dEnd.replace(/-/g,"/") ),
			dateText = "";
		
		var sYear = sDate.getFullYear(), sMonth = sDate.getMonth(), sDay = sDate.getDate(),
			eYear = eDate.getFullYear(), eMonth = eDate.getMonth(), eDay = eDate.getDate();
			
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
	
	function AddRemoveSs( strWord, cntValue ){
		if ( cntValue > 1 ){
			return strWord + "s";
		} else {
			return strWord;
		}
	}
	
//$( "#myreservation" ).on( "pagecreate", function( event ) {
$(document).on("pagecreate", "#myreservation", function () {

	var $ShowAvailableRoomTypes = $( "#bookShowAllAvailable" ),
		$ShowAllRoomTypes = $( "#showPreferredBooknow" ),
		
		$ArrYear = $("#ArrYear"),
		$ArrMonth = $("#ArrMonth"),
		$ArrDay = $("#ArrDay"),

		$DepYear = $("#DepYear"),
		$DepMonth = $("#DepMonth"),
		$DepDay = $("#DepDay"),

		$resNights = $("#resNights"),
		$resAdults = $("#resAdults"),
		$resChildren = $("#resChildren");
		
	
	$("#resCheckAvailability").on("click", function () {

		$("#resDatesAndDetails").hide();
		$("#availableRooms").show();

		var ArrYear = $ArrYear.find(":selected").val(),
			ArrMonth = $ArrMonth.find(":selected").val(),
			ArrDay = $ArrDay.find(":selected").val(),

			DepYear = $DepYear.find(":selected").val(),
			DepMonth = $DepMonth.find(":selected").val(),
			DepDay = $DepDay.find(":selected").val(),

			resNights = $resNights.find(":selected").val(),
			resAdults = $resAdults.find(":selected").val(),
			resChildren = $resChildren.find(":selected").val(),

			pData = {
				ArrYear : ArrYear,
				ArrMonth : ArrMonth,
				ArrDay : ArrDay,
				DepYear : DepYear,
				DepMonth : DepMonth,
				DepDay : DepDay,
				resNights : resNights,
				resAdults : resAdults,
				resChildren : resChildren
			}
		
		KuhaaRoomDetails( pData ).then( function ( roomData ){
			
			if ( roomData.length ){

				KuhaaAngPagkaanaaSaKwarto( roomData );
			}
		},

			function(){ alert( "Error Loading Room Availability!" ); }
		);

	});

	// SHOW ALL ROOM TYPES, checkbox
	$ShowAllRoomTypes.on( "click", function(){

		if ( $( this ).is( ":checked" ) ){// All room types

			if ( $ShowAvailableRoomTypes.is( ":checked" ) ){

				BookNowRmTypeToShow( "AllAvailable" );  // Show All Available room types.
			} else {
			
				BookNowRmTypeToShow( "All" ); // Show all room types, including not available.
			}
		} else {//Show preferred only

			if ( $ShowAvailableRoomTypes.is( ":checked" ) ){
				BookNowRmTypeToShow( "PreferredAvailable" );  // Show preferred room type and is available.
			} else {
				BookNowRmTypeToShow( "PreferredAll" ); // Show All preferred room types, including not available.
			}
		}
	});

	//SHOW AVAILABLE ONLY, checkbox
	$ShowAvailableRoomTypes.on("click",function(){

		if ( $( this ).is( ":checked" ) ){

			if ( $ShowAllRoomTypes.is( ":visible" ) ){
			
				if ( $ShowAllRoomTypes.is( ":checked" ) ){
				
					BookNowRmTypeToShow( "AllAvailable" ); //show all available room types (preferred and not preferred).			
				} else {
				
					BookNowRmTypeToShow( "PreferredAvailable" ); //show all preferred available roomtypes only.
				}				
			} else {
			
				BookNowRmTypeToShow( "AllAvailable" ); //show all room types
			}
		} else {
		
			if ( $ShowAllRoomTypes.is( ":visible" ) ){
			
				if ( $ShowAllRoomTypes.is( ":checked" ) ){
				
					BookNowRmTypeToShow( "All" ); //show all room types
				} else {
				
					BookNowRmTypeToShow( "PreferredAll" ); //show all preferred roomtypes only.
				}						
			} else {
				BookNowRmTypeToShow( "All" ); //show all room types
			}
		}
	});

	$( ".resNumReserveThis" ).on( "change", function(){
		//index=roomTypes = "0=WER","1=LSR","2=LVR","3=PS","4=SIR","5=FR","6=OneBS","7=TwoBS","8=QV","9=PhS","10=RB"
		var rmTypeId = this.id,
			rmTypeValue = parseInt( this.value );			
			//console.log( this.value );
		var rmTypeVal = rmTypeValue ? rmTypeValue : 0;
			
		switch ( rmTypeId ){
			case "numresWER":
				roomDetails[ 0 ].resRooms = rmTypeVal;
				break;
			case "numresLSR":
				roomDetails[ 1 ].resRooms = rmTypeVal;
				break;
			case "numresLVR":
				roomDetails[ 2 ].resRooms = rmTypeVal;
				break;
			case "numresPSR":
				roomDetails[ 3 ].resRooms = rmTypeVal;
				break;
			case "numresSIR":
				roomDetails[ 4 ].resRooms = rmTypeVal;
				break;
			case "numresFR":
				roomDetails[ 5 ].resRooms = rmTypeVal;
				break;
			case "numres1BS":
				roomDetails[ 6 ].resRooms = rmTypeVal;
				break;
			case "numres2BS":
				roomDetails[ 7 ].resRooms = rmTypeVal;
				break;
			case "numresQV":
				roomDetails[ 8 ].resRooms = rmTypeVal;
				break;2
			case "numresRS":
				roomDetails[ 9 ].resRooms = rmTypeVal;
				break;		
		}
	});
	
	$( "#ReservedTheseRooms" ).on( "click", function( event ){
		
		var allAdult = resDetails.resAdults, 
			allChild = resDetails.resChildren, 
			roomDetailsAll = roomDetails.length,
			foundNumRmReserve = 0, enoughRooms = 0, withWaterEdgeRm = 0;
		
		var remainingAdult = allAdult,
			remainingChild = allChild;
		
		var maxGuests = 0, maxAdult = 0, maxChildren = 0;
			
		for ( i = 0; i < roomDetailsAll; i = i + 1 ){
					
			var	rmNumSelected = roomDetails[ i ].resRooms;	// Number of rooms to be reserve
			console.log(rmNumSelected);
			if ( rmNumSelected > 0 ){ //Check if number of rooms to be reserve is greater than zero(0).

				foundNumRmReserve = 1;
				
				var rmTypeSelected = roomTypesDb[ i ];	// Room Type
				
				if ( roomTypeSelected.indexOf( rmTypeSelected ) === -1 ){ // Check if roomtype did not exist already in array.
					roomTypeSelected.push( rmTypeSelected );
				}

				if ( rmTypeSelected === "QV" ){
					// 8 adults, 8 Children, 4 extra
					// QV 8 8 4
					// QV 8 8 4
					//( Note: Maximum Children selection up to 10 only)
					if ( ( remainingAdult <= 8 ) && ( ( remainingAdult + remainingChild ) <= 16 ) ){
						remainingAdult = 0;
						remainingChild = 0;
					} else if ( ( remainingAdult === 9 ) && ( remainingChild <= 6 ) ){
						remainingAdult = 0;
						remainingChild = 0;
					} else if ( ( remainingAdult === 10 ) && ( remainingChild <= 4 ) ){
						remainingAdult = 0;
						remainingChild = 0;
					} else if ( ( remainingAdult === 11 ) && ( remainingChild <= 2 ) ){
						remainingAdult = 0;
						remainingChild = 0;	
					} else if ( ( remainingAdult === 12 ) && ( remainingChild === 0 ) ){
						remainingAdult = 0;
						remainingChild = 0;	
					} else if ( ( remainingAdult === 7 ) && ( remainingChild === 10 ) ){
						remainingAdult = 0;
						remainingChild = 0;	
					} else if ( ( remainingAdult <= 12 ) && ( remainingChild > 8 ) ){
						remainingAdult = remainingAdult - 8;
						remainingChild = remainingChild - 8;
					} else if ( ( remainingAdult > 8 ) && ( remainingChild <= 8 ) ){
						var childDiff = 8 - remainingChild;
						var childToAdult = parseInt( childDiff / 2 );
						remainingAdult = remainingAdult - 8 - childToAdult;
						remainingChild = 0;
					} else if ( ( remainingAdult > 8 ) && ( remainingChild > 8 ) ){
						remainingAdult = remainingAdult - 8;
						remainingChild = remainingChild - 8;
					}
				} else if ( rmTypeSelected === "RB" || rmTypeSelected === "PH" ){
					// 6 person regardless of age, 2 extra =  max 8
					// TwoBS 6 0 2, PhS 6 0 2, RB 6 0 2
					// TwoBS 6 0 2, PhS 6 0 2, RB 6 0 2
					// 8 guests maximum regardless of age
					if ( ( remainingAdult + remainingChild ) <= 8 ){
						remainingAdult = 0;
						remainingChild = 0;
					} else { //More than 8 guests (Adult & Children)
						// Deduct 8 guests, at least 1 Adult
						if ( remainingChild >= 7 ){ // >= 7 Children
							remainingChild = remainingChild - 7; // deduct 7 Children
							remainingAdult = remainingAdult - 1; // deduct 1 adult only
						} else { // < 7 Children, deduct all Children
							remainingAdult = remainingAdult - ( 8 - remainingChild ); //deduct all children
							remainingChild = 0;
						}
						//just in case remaining Adult is < 0
						if ( remainingAdult < 0 ){
							remainingAdult = 0;
						}
					}
				} else if ( rmTypeSelected === "2KK" ){
					// 6 person regardless of age, 2 extra =  max 8
					// TwoBS 6 0 2, PhS 6 0 2, RB 6 0 2
					// TwoBS 6 0 2, PhS 6 0 2, RB 6 0 2
					// 8 guests maximum regardless of age
					if ( ( remainingAdult + remainingChild ) <= ( rmNumSelected * 8 ) ){
						remainingAdult = 0;
						remainingChild = 0;
					} else { //More than 8 guests (Adult & Children)
						// Deduct 8 guests, at least 1 Adult
						if ( remainingChild >= ( rmNumSelected * 7 ) ){ // >= 7 Children
							remainingChild = remainingChild - ( rmNumSelected * 7 ); // deduct 7 Children
							remainingAdult = remainingAdult - ( rmNumSelected * 1 ); // deduct 1 adult only
						} else { // < 7 Children, deduct all Children
							remainingAdult = remainingAdult - ( ( rmNumSelected * 8 ) - remainingChild ); //deduct all children
							remainingChild = 0;
						}
						//just in case remaining Adult is < 0
						if ( remainingAdult < 0 ){
							remainingAdult = 0;
						}
					}	
				} else if ( rmTypeSelected === "1BK" ){
					// OneBS 3 2 0 ????????????????????????????????????????????????????
					// OneBS 3 2 2 
					maxGuests = rmNumSelected * 5;
					maxAdult = rmNumSelected * 3;
					maxChildren = rmNumSelected * 2;

					if ( ( remainingAdult <= maxGuests ) && ( ( remainingAdult + remainingChild ) <= maxGuests ) ){
						//console.log("( remainingAdult <= maxGuests ) && ( ( remainingAdult + remainingChild ) <= maxGuests )");
						remainingAdult = 0;
						remainingChild = 0;
					} else if ( remainingAdult > maxAdult && remainingChild <= maxChildren ){
						//console.log(" remainingAdult > maxAdult && remainingChild <= maxChildren ");
						var childToAdult = maxChildren - remainingChild;
						remainingAdult = remainingAdult - maxAdult - childToAdult;
						remainingChild = 0;
					} else if ( remainingAdult > maxAdult && remainingChild > maxChildren ){
						//console.log("remainingAdult > maxAdult && remainingChild > maxChildren");
						remainingAdult = remainingAdult - maxAdult;
						remainingChild = remainingChild - maxChildren;
					} else if ( remainingAdult <= maxAdult && remainingChild > maxChildren ){
						//console.log("remainingAdult <= maxAdult && remainingChild > maxChildren");
						adultToChild = maxAdult - remainingAdult;
						remainingChild = remainingChild - maxChildren - adultToChild;
						remainingAdult = 0;
					}
				} else if (  rmTypeSelected === "FA" ){
					// FA 4 2 0
					// FA 4 2 0
					//maxGuests = rmNumSelected * 4;
					maxAdult = rmNumSelected * 4;
					maxChildren = rmNumSelected * 2;

					if ( remainingAdult <= maxAdult && remainingChild <= maxChildren ){
						remainingAdult = 0;
						remainingChild = 0;
					} else if ( ( remainingAdult <= maxAdult ) && ( ( remainingAdult + remainingChild ) <= ( maxAdult + maxChildren ) ) ){
						remainingAdult = 0;
						remainingChild = 0;	
					} else if ( remainingAdult > maxAdult ){
						remainingAdult = remainingAdult - maxAdult;
						if ( remainingChild > maxChildren ){
							remainingChild = remainingChild - maxChildren;
						} else {
							remainingChild = 0;
						}
					} else if ( remainingChild > maxChildren ){
						remainingChild = remainingChild - maxChildren;
						if ( remainingAdult > maxAdult ){
							remainingAdult = remainingAdult - maxAdult;
						} else {
							remainingAdult = 0;
						}
					}
				} else if ( rmTypeSelected === "SPA" ){
					// 2 adults only, children not allowed.
					// SIR 2 0 0
					// SIR 2 0 0
					maxAdult = rmNumSelected * 2;
					
					if ( ( remainingAdult <= maxAdult ) && ( remainingChild === 0 ) ){
						remainingAdult = 0;
						remainingChild = 0;
					} else {
						if ( remainingAdult > maxAdult ){
							remainingAdult = remainingAdult - maxAdult;
						} else {
							remainingAdult = 0;
						}
					}
				} else if ( rmTypeSelected === "WE" ){
				
					// 2 0 2
					// 4 Adults max., 2 extra.
					
					withWaterEdgeRm = 1;
					maxAdult = rmNumSelected * 4;
					
					if ( ( remainingAdult <= maxAdult ) && ( remainingChild === 0 ) ){
						remainingAdult = 0;
						remainingChild = 0;
					} else {
						if ( remainingAdult > maxAdult ){
							remainingAdult = remainingAdult - maxAdult;
						} else {
							remainingAdult = 0;
						}
					}

				} else {
					// 2 2 1
					// 2 2 2
					maxGuests = rmNumSelected * 4;
					maxAdult = rmNumSelected * 2;
					maxChildren = rmNumSelected * 2;

					if ( ( remainingAdult <= maxGuests ) && ( ( remainingAdult + remainingChild ) <= maxGuests ) ){
						//console.log("( remainingAdult <= maxGuests ) && ( ( remainingAdult + remainingChild ) <= maxGuests )");
						remainingAdult = 0;
						remainingChild = 0;
					} else if ( remainingAdult > maxAdult && remainingChild <= maxChildren ){
						//console.log(" remainingAdult > maxAdult && remainingChild <= maxChildren ");
						var childToAdult = maxChildren - remainingChild;
						remainingAdult = remainingAdult - maxAdult - childToAdult;
						remainingChild = 0;
					} else if ( remainingAdult > maxAdult && remainingChild > maxChildren ){
						//console.log("remainingAdult > maxAdult && remainingChild > maxChildren");
						remainingAdult = remainingAdult - maxAdult;
						remainingChild = remainingChild - maxChildren;
					} else if ( remainingAdult <= maxAdult && remainingChild > maxChildren ){
						//console.log("remainingAdult <= maxAdult && remainingChild > maxChildren");
						adultToChild = maxAdult - remainingAdult;
						remainingChild = remainingChild - maxChildren - adultToChild;
						remainingAdult = 0;
					}
				}
				if ( remainingAdult === 0 && remainingChild === 0 ){ enoughRooms = 1; } else { enoughRooms = 0; }
			}		
		}
		
		if ( foundNumRmReserve ){ //With room(s)
		
			if ( enoughRooms ){
			
				/*
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "#myreservationGDetails", {
					transition: "flip",
					changeHash: false,
					reverse: false,
					showLoadMsg: true
				});
				*/
				
				$("#GResDetails").show();
				$("#availableRooms").hide();
				$("#conditions").hide();
				
				var selectedRmType = "", SelectedRooms = "", totalRoomCount=0;
				
				/*
				function AddComma(Num) {
					var n= Num.toString().split(".");
					n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					return n.join(".");
				}
				*/
				var resArrStat = resDetails.resArrYear + "-" + resDetails.resArrMonth + "-" + resDetails.resArrDay;
				var resDepStat = new Date( resDetails.resDepYear + "/" + resDetails.resDepMonth + "/" + ( resDetails.resDepDay) );
				var resDepStatless1 = resDetails.resDepYear + "-" + resDetails.resDepMonth + "-" + ( resDepStat.getDate() -1 ) // -1 for date sql between query

				// Determine if (NP/P/BO) Dates	
				$.getJSON( "tatSetaRmooRteg.php", { resArr: resArrStat, resDep: resDepStatless1 }, function( roomStat ) {
				
					var lenStat = roomStat.length - 1, rmStat = 0, cntNP = 0, cntP = 0, cntPeak = 0, cntBO = 0, 
						startP = 0, endP = 0, startBO = 0, endBO = 0, foundSpa = 0, found1kind = 0, totalNights = 0,
						prevStat = "", prevDate = "";
						//prevStat = "", prevDate = "", SelectedRooms = "";
					
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

					var roomTypesSelected = roomTypeSelected.length, rmCompute = "", extraAdults = 0,
						amtNP = 0, amtP = 0, amtBO = 0, amtGDR = 0, roomTotal = 0, grandTotal = 0, totalRequiredAmt = 0, OnekindSpa = 0,
						adultTotal = 0, childTotal = 0, maxExtraTotal = 0,amtExtraAdult = 0, resAdultTotal = 0, foundPHRB2KK = 0;
						
					for ( rmSelectCnt = 0; rmSelectCnt < roomTypesSelected; rmSelectCnt = rmSelectCnt + 1 ){
							
						var rmTypeSelected = roomTypeSelected[ rmSelectCnt ],	// Room Type
							rmTypeSelectedIndex = roomTypesDb.indexOf( rmTypeSelected ),
							rmNumSelected = roomDetails[ rmTypeSelectedIndex ].resRooms; //Number of rooms to be reserve

						if ( rmNumSelected ){ // Check if there is Number of rooms to be reserve
									
							adultTotal = adultTotal + ( roomDetails[ rmTypeSelectedIndex ].adults * rmNumSelected );
							childTotal = childTotal + ( roomDetails[ rmTypeSelectedIndex ].children * rmNumSelected );
							maxExtraTotal = maxExtraTotal + ( roomDetails[ rmTypeSelectedIndex ].maxextra * rmNumSelected );
							totalRoomCount = totalRoomCount + rmNumSelected;
							document.getElementById( roomTypes[ rmTypeSelectedIndex ] ).value = rmNumSelected; // Assing Room type number of rooms to be recerved.
							//console.log( roomTypes[ rmTypeSelectedIndex ] + " = " + rmNumSelected );
							$( "#divbfast" + roomTypes[ rmTypeSelectedIndex ] ).show();
							
							selectedRmType = selectedRmType + roomTypesId[ rmTypeSelectedIndex ]  + ":" + rmNumSelected + ","
							rmCompute = rmCompute + "<tr><td colspan=3 class='iBold txtDarkGreen'>" + roomTypesDesc[ rmTypeSelectedIndex ] + "</td></tr>";
									
							var correctRoomWord = AddRemoveSs( "room", rmNumSelected );
							if ( totalNights >= 6 ){ // GDR
									
								var rateGDR = roomDetails[ rmTypeSelectedIndex ].priceGDR;

								if ( cntNP ){
											
									var correctNightWord = AddRemoveSs( "night", cntNP );

									amtGDR = rateGDR * cntNP * rmNumSelected;
											
									rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Great Discounted Rate (Non-Peak) $ " + rateGDR + " x " + cntNP + " " + correctNightWord + " x " + rmNumSelected + " " + correctRoomWord + " </td><td> " + AddComma( amtGDR.toFixed(2) ) + "</td></tr>";					
								}
										
								if ( cntBO ){
											
									var boDateRange = getDateRangeText( startBO, endBO, 1);
									var correctNightWord = AddRemoveSs( "night", cntBO );
									var correctDateWord = AddRemoveSs( "date", cntBO );
											
									amtBO = rateGDR * cntBO * rmNumSelected;
											
									rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Black out " + correctDateWord + " ( " + boDateRange + " ) $ " + rateGDR + " x " + cntBO + " " + correctNightWord + " x " + rmNumSelected + " " + correctRoomWord + " </td><td> " + AddComma( amtBO.toFixed(2) ) + "</td></tr>";
								}
							} else { //NP
									
								var rateNP = roomDetails[ rmTypeSelectedIndex ].priceNP;
								if ( cntNP ){
										
									var correctNightWord = AddRemoveSs( "night", cntNP );
									amtNP = rateNP * cntNP * rmNumSelected;
											
									//Required amount for QV,PH,RB & SPA days that did not belong to Peak, Black-out and GDR days
									if ( rmTypeSelected == "QV" || rmTypeSelected == "PH" || rmTypeSelected == "RB" || rmTypeSelected == "SPA" ){
										OnekindSpa = OnekindSpa + amtNP ;
									}
																			
									rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $ " + rateNP + " x " + cntNP + " " + correctNightWord + " x " + rmNumSelected + " " + correctRoomWord + " </td><td> " + AddComma( amtNP.toFixed(2) ) + "</td></tr>";
								}
								if ( cntBO ){
									amtBO = rateNP * cntBO * rmNumSelected;
									var boDateRange = getDateRangeText( startBO, endBO, 1);
									var correctNightWord = AddRemoveSs( "night", cntBO );
									var correctDateWord = AddRemoveSs( "date", cntBO );
									rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Black out " + correctDateWord + " ( " + boDateRange + " ) $ " + rateNP + " x " + cntBO + " " + correctNightWord + " x " + rmNumSelected + " " + correctRoomWord + " </td><td> " + AddComma( amtBO.toFixed(2) ) + "</td></tr>";
								}
							}

							if ( cntP ){ //Peak
									
								amtP = roomDetails[ rmTypeSelectedIndex ].priceP * cntP * rmNumSelected;
								var peakDateRange = getDateRangeText( startP, endP, 1 );
								var correctNightWord = AddRemoveSs( "night", cntP );
										
								rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Peak rate applies for ( " + peakDateRange + " ) $ " + roomDetails[ rmTypeSelectedIndex ].priceP + " x " + cntP + " " + correctNightWord + " x " + rmNumSelected + " " + correctRoomWord + " </td><td> " + AddComma( amtP.toFixed(2) ) + "</td></tr>";
							}
									
							roomTotal = roomTotal + amtNP + amtP + amtBO + amtGDR;
							totalRequiredAmt = totalRequiredAmt + OnekindSpa + amtP + amtBO + amtGDR;
									
							// for Spa and One-of-a-kind guarantee, check.
							if ( rmTypeSelected === "QV" || rmTypeSelected === "PH" || rmTypeSelected === "RB" ){
								found1kind = 1;
							} else if (  rmTypeSelected === "SPA" ){
								foundSpa = 1;
							}
									
							// 6 person regardless of age room type, check.
							if ( rmTypeSelected === "PH" || rmTypeSelected === "RB" || rmTypeSelected === "2KK" ){ // 6 persons regardless of age.
								foundPHRB2KK = foundPHRB2KK + 1;
							}
						}
					} //end for loop...
					
					// CHECK for PH, RB, 2KK : 6 0 2 - 6 person regardless of age, 2 extra person charge.
					if ( foundPHRB2KK ){
						if ( ( roomTypesSelected > 1 ) && ( foundPHRB2KK !== roomTypesSelected ) ){ // NOT all room types selected are PH, RB or 2KK.
							var ageRegardless = foundPHRB2KK * 6; // 6 person regardless of age.

							if ( resDetails.resAdults < ageRegardless ){
							
								resAdultTotal = resDetails.resAdults + resDetails.resChildren;
							} else {
								resAdultTotal = resDetails.resAdults
							}

						} else { // room types selected are PH or RB or 2KK
							resAdultTotal = resDetails.resAdults + resDetails.resChildren;
						}

					} else { // NO PH, RB & 2KK room type selected
						resAdultTotal = resDetails.resAdults;
					}
					//Check for Extra Adult
					if ( resAdultTotal > adultTotal ){
						extraAdults = resAdultTotal - adultTotal; // number of extra adult(s)
						amtExtraAdult = 20 * totalNights * extraAdults; // 20 - for $20 1 extra adult.
						
						var correctPersonWord = AddRemoveSs( "person", extraAdults );
						var correctNightWord = AddRemoveSs( "night", totalNights );
						
						roomTotal = roomTotal + amtExtraAdult; // add amount to room total.
						rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Extra " + correctPersonWord + " charge $20 x " + resDetails.resRoomNights + " " + correctNightWord + " x " + extraAdults + " " + correctPersonWord + " </td><td> " + AddComma( amtExtraAdult.toFixed(2) ) + "</td></tr>";
					}
					
					rmCompute = rmCompute + "<tr id='resroomTaxSc'><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Room Tax &amp; Service charge</i></td><td>" + AddComma( ( roomTotal * .232 ).toFixed(2) ) + "</td></tr>";
					rmCompute = rmCompute + "<tr id='resTotalRm' class='iBold txtDarkGreen'><td colspan=2>Total room rates</td><td> $ " + AddComma( ( roomTotal * 1.232 ).toFixed(2) ) + "</td></tr>";		
					rmCompute = rmCompute + "<tr id='trgrandTotal' class='iBold txtDarkGreen'><td colspan=2>Grand Total (USD)</td><td id='grandTotal'> $ " + AddComma( ( roomTotal * 1.232 ).toFixed(2) ) + "</td>";
					
					if ( totalRequiredAmt ){

						rmCompute = rmCompute + "<tr id='trRequiredAmnt' class='iBold ' style='color:red;'><td colspan=2>Required Advance Payment (USD)</td><td id='requiredAmtTotal'> $ " + AddComma( ( totalRequiredAmt * 1.232 ).toFixed(2) ) + "</td>";
						//rmCompute = rmCompute + "<tr><td colspan=4 style='text-align:right;font-size:14px;font-style:italic;color:#000;'>Room conversion rate is @" + parseInt( RoomConversion ).toFixed(2) + " Php = 1 USD</td></tr>";
					}
					
					$( "#resComputations" ).append( rmCompute );
					
					//Show Free Treats for 4 & 5 nights only.
					if ( lenStat === 3 || lenStat === 4 ){ //3&4 instead of 4&5 bec. lenStat - 1 above.
						$( "#FreeTreats" ).show();
					}

					//Determine Satisfaction Guarantee to display
					// 1 - Peak, 2 - blackout, 3 - One Of a kind, 4 - Spa, 5 - GDR , 6 - Non peak
					var cancelNotice = "";
					if ( cntP ){
						$( "#resGuaranteeP" ).show();
						cancelNotice = "1";
					} else if ( ( cntNP + cntBO ) >= 6 ){ //GDR
						$( "#resGuaranteeGDR" ).show();
						cancelNotice = "5";
					} else if ( cntBO ){
						$( "#resGuaranteeBlackOut" ).show();	
						cancelNotice = "2";
					} else {
						if ( found1kind ){
							$( "#resGuarantee1Kind" ).show();
							cancelNotice = "3";
						} else if ( foundSpa ){
							$( "#resGuaranteeSpa" ).show();
							cancelNotice = "4";
						} else { //Non-peak
							$( "#resGuaranteeNP" ).show();
							cancelNotice = "6";
						}
					}
					document.getElementById( "cancelNotice" ).value = cancelNotice;
				});
				
				$( ".bfastChecks" ).on( "change", function( event ){
				
					var BfastchkId = this.id, bfastValue = parseFloat( this.value );
					
					var bfRmType = BfastchkId.substring(5); //extract room type from id
					
					var bfRmTypeIndex = roomTypes.indexOf( bfRmType ); // get index of room type from roomTypes array
					
					var bfastAmount = bfastValue * resDetails.resRoomNights * roomDetails[ bfRmTypeIndex ].resRooms,
						curGrandTotal = parseFloat( $( "#grandTotal" ).html().substring(2).replace(/\,/g,'') ), //existing grand total
						$naaBfast = $ ( "#hasBfast" );
						
					if ( $("#" + BfastchkId ).is( ":checked" ) ){ //add bfast.
					
						var correctNightsWord = AddRemoveSs( "night", resDetails.resRoomNights );
						var correctRoomWord = AddRemoveSs( "room", roomDetails[ bfRmTypeIndex ].resRooms );
						
						if ( $naaBfast.length ){ //with existing bfast
						
							var	oldbfastTotal = parseFloat( $( "#bfastTotal" ).html().substring(2).replace(/\,/g,'') ), // existing bfast total
								bfastTaxSCTotal = parseFloat( $( "#resbfastTaxSc" ).html().replace(/\,/g,'') ); //existing bfast tax & sc
							// add bfast row
							$( "#hasBfast" ).after(" <tr id='" + BfastchkId + "1'><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + roomTypesDesc[ bfRmTypeIndex ] + " $ " + bfastValue + " x " + resDetails.resRoomNights + " " + correctNightsWord + " x " + roomDetails[ bfRmTypeIndex ].resRooms + " " + correctRoomWord + " </td><td> " + AddComma( bfastAmount.toFixed(2) ) + "</td></tr>" );
							// add to bfast total
							$( "#bfastTotal" ).html( "$ " + AddComma( ( oldbfastTotal + ( bfastAmount * 1.232 ) ).toFixed(2) ) );
							// add to bfast tax and sc
							$( "#resbfastTaxSc" ).html( AddComma( ( bfastTaxSCTotal + ( bfastAmount * .232 ) ).toFixed(2) ) );
							//add to grand total
							$( "#grandTotal" ).html( "$ " + AddComma( ( curGrandTotal + ( bfastAmount * 1.232 ) ).toFixed(2) ) )
						} else { // first bfast
						
							$( "#resTotalRm" ).after( "<tr id='trBfastTotal' class='iBold txtDarkGreen'><td colspan='2'>Breakfast Package Total</td><td id='bfastTotal'> $ " + AddComma( ( bfastAmount * 1.232 ).toFixed(2) ) + "</td></tr>" );
							$( "#resTotalRm" ).after( "<tr id='trBfastTaxSC'><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Food Tax &amp; Service charge</i></td><td id='resbfastTaxSc'>" + AddComma( ( bfastAmount * .232 ).toFixed(2) ) + "</td></tr>" );
							$( "#resTotalRm" ).after(" <tr id='" + BfastchkId + "1'><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + roomTypesDesc[ bfRmTypeIndex ] + " $ " + bfastValue + " x " + resDetails.resRoomNights + " " + correctNightsWord + " x " + roomDetails[ bfRmTypeIndex ].resRooms + " " + correctRoomWord + " </td><td> " + AddComma( bfastAmount.toFixed(2) ) + "</td></tr>" );
							$( "#resTotalRm" ).after(" <tr id='hasBfast'><td colspan=3 class='iBold txtDarkGreen'>Special Offer Breakfast Buffet Package </td></tr>" );
							//add to grand total
							$( "#grandTotal" ).html( "$ " + AddComma( ( curGrandTotal + ( bfastAmount * 1.232 ) ).toFixed(2) ) )
						}
					
					} else { //remove bfast
						var	oldbfastTotal = parseFloat( $( "#bfastTotal" ).html().substring(2).replace(/\,/g,'') ), // existing bfast total
							bfastTaxSCTotal = parseFloat( $( "#resbfastTaxSc" ).html().replace(/\,/g,'') ); //existing bfast tax & sc
						//deduct total bfast tax and sc
						$( "#resbfastTaxSc" ).html( AddComma( ( bfastTaxSCTotal - ( bfastAmount * .232 ) ).toFixed(2) ) );
						//deduct total bfast
						$( "#bfastTotal" ).html( "$ " + AddComma( ( oldbfastTotal - ( bfastAmount * 1.232 ) ).toFixed(2) ) );
						//deduct grantotal
						$( "#grandTotal" ).html( "$ " + AddComma( ( curGrandTotal - ( bfastAmount * 1.232 ) ).toFixed(2) ) )
						//remove bfast row
						$( "#" + BfastchkId + "1" ).remove();
						
						//check for currentBfast total
						if ( ( parseInt ( $( "#bfastTotal" ).html().substring(2).replace(/\,/g,'') ) ) < 1 ){
							$( "#trBfastTotal" ).remove();
							$( "#trBfastTaxSC" ).remove();
							$( "#hasBfast" ).remove();
						}
					}
				});
				
				$( ".resAddONChoice" ).on( "click", function( event ){
				
					var AddOnchkId = this.id, 
						addOnAmt = parseFloat( this.value ),
						addOnRmTotal = addOnAmt * totalRoomCount;
						curGrandTotal = parseFloat( $( "#grandTotal" ).html().substring(2).replace(/\,/g,'') ),
						withRequiredAmnt = $( "#trRequiredAmnt" ); // check if required amount row exist?
						
					if ( $( "#" + AddOnchkId ).is( ":checked" ) ){ //Add

						var vepId = this.id, pkgName = "",
							correctRoomWord = AddRemoveSs( "room", totalRoomCount );
						
						if ( vepId === "chkresAddVEP" ){
								pkgName = "VIP Express Package";
						} else if ( vepId === "chkresAddRRP" ){
								pkgName = "Romantic Rendezvous Package";
						} else if ( vepId === "chkresAddPAP" ){
								pkgName = "Personal Assistant Package";
						} else if ( vepId === "chkresAddCCP" ){
								pkgName = "Cook with the Chef Package";
						}
						// insert add-on line
						$( "#trgrandTotal" ).before("<tr id='" + this.id + "1'><td colspan=2>" + pkgName + " ( $" + addOnAmt + "nett x " + totalRoomCount + " " + correctRoomWord + ")</td><td> " + addOnRmTotal.toFixed(2) + "</td></tr>");
						// add add-on amount to grand total. Nett
						$( "#grandTotal" ).html( "$ " + AddComma( ( curGrandTotal + addOnRmTotal ).toFixed(2) ) )
						
						if ( withRequiredAmnt.length ){
						
							var CurrequiredAmtTotal = parseFloat( $( "#requiredAmtTotal" ).html().substring(2).replace(/\,/g,'') );
							$( "#requiredAmtTotal" ).html( "$ " + AddComma( ( CurrequiredAmtTotal + addOnRmTotal ).toFixed(2) ) )
						} else {
						
							$( "#trgrandTotal" ).after( "<tr id='trRequiredAmnt' class='iBold ' style='color:red;'><td colspan=2>Required Advance Payment (USD)</td><td id='requiredAmtTotal'> $ " + AddComma( addOnRmTotal.toFixed(2) ) + "</td>" );
						}
						
					} else { //Remove add-on
					
						//deduct from grand total
						$( "#grandTotal" ).html( "$ " + AddComma( ( curGrandTotal - addOnRmTotal ).toFixed(2) ) )
						// remove add-on line
						$( "#" + this.id + "1" ).remove();
						
						if ( withRequiredAmnt.length ){
						
							var CurrequiredAmtTotal = parseFloat( $( "#requiredAmtTotal" ).html().substring(2).replace(/\,/g,'') );
							var NewrequiredAmtTotal = CurrequiredAmtTotal - addOnRmTotal;
							
							if ( NewrequiredAmtTotal ){
								
								$( "#requiredAmtTotal" ).html( "$ " + AddComma( NewrequiredAmtTotal.toFixed(2) ) )
							} else {
							
								$( "#trRequiredAmnt" ).remove();//remove required amount row
							}				
						}
					}
				});				
			} else { //Not enough rooms
			
				var WERmMessage = " (Note: Water’s Edge Room is intended for couples only and not suitable for children below 18 years of age, due to close-by water hazards.)";

				if ( resDetails.resAdults >= 2 ){ 
					
					if ( resDetails.resChildren === 0 ){ //Adults
						if ( withWaterEdgeRm ){
							alert( "You are required to get another room to accommodate " + resDetails.resAdults + " Adults." + WERmMessage );
						} else {
							alert( "You are required to get another room to accommodate " + resDetails.resAdults + " Adults." );
						}	
					} else if ( resDetails.resChildren === 1 ){ //Adults - Child
						if ( withWaterEdgeRm ){
							alert( "You are required to get another room to accommodate " + resDetails.resAdults + " Adults and 1 Child." + WERmMessage );
						} else {
							alert( "You are required to get another room to accommodate " + resDetails.resAdults + " Adults and 1 Child." );
						}	
					} else {//Adults - Children
						if ( withWaterEdgeRm ){
							alert( "You are required to get another room to accommodate " + resDetails.resAdults + " Adults and " + resDetails.resChildren + " Children." + WERmMessage );
						} else {
							alert( "You are required to get another room to accommodate " + resDetails.resAdults + " Adults and " + resDetails.resChildren + " Children." );
						}
					}
				} else {
					if ( resDetails.resChildren === 0 ){ //Adult
						if ( withWaterEdgeRm ){
							alert( "You are required to get another room to accommodate " + resDetails.resAdults + " Adult." + WERmMessage );
						} else {
							alert( "You are required to get another room to accommodate " + resDetails.resAdults + " Adult." );
						}	
					} else if ( resDetails.resChildren === 1 ){ //Adult - Child
						if ( withWaterEdgeRm ){
							alert( "You are required to get another room to accommodate " + resDetails.resAdults + " Adult and 1 Child." + WERmMessage );
						} else {
							alert( "You are required to get another room to accommodate " + resDetails.resAdults + " Adult and 1 Child" );
						}	
					} else { //Adult - Children
						if ( withWaterEdgeRm ){
							alert( "You are required to get another room to accommodate " + resDetails.resAdults + " Adult and " + resDetails.resChildren + " Children." + WERmMessage );
						} else {
							alert( "You are required to get another room to accommodate " + resDetails.resAdults + " Adult and " + resDetails.resChildren + " Children." );
						}
					}
				}	
			}
			
		} else {
		
			alert( "You have zero (0) number of rooms to be reserved." );
		}
	});
   
   	function AddComma(Num) {
		var n= Num.toString().split(".");
		n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return n.join(".");
	}
   
   	function resetNumRmReserve(){

		$( "#numresWER" ).val( "0" ).selectmenu( "refresh" );
		$( "#numresLSR" ).val( "0" ).selectmenu( "refresh" );
		$( "#numresLVR" ).val( "0" ).selectmenu( "refresh" );
		$( "#numresPSR" ).val( "0" ).selectmenu( "refresh" );
		$( "#numresSIR" ).val( "0" ).selectmenu( "refresh" );
		$( "#numresFR" ).val( "0" ).selectmenu( "refresh" );
		$( "#numres1BS" ).val( "0" ).selectmenu( "refresh" );
		$( "#numres2BS" ).val( "0" ).selectmenu( "refresh" );
		$( "#numresQV" ).val( "0" ).selectmenu( "refresh" );
		//$( "#numresPS" ).val( "0" ).selectmenu( "refresh" );
		$( "#numresRS" ).val( "0" ).selectmenu( "refresh" );
		
		roomDetailsAll = roomDetails.length;
		for ( var i = 0; i < roomDetailsAll; i = i + 1 ){

			roomDetails[ i ].resRooms = 0;
		}
	}
	
	function BookNowRmTypeToShow( whatToShow ){
	
		//10 = number of room types.
		roomDetailsAll = roomDetails.length;
		
		if ( whatToShow === "PreferredAll" ){
			for ( var i = 0; i < roomDetailsAll; i = i + 1){
				var rowToMove = roomDetails[ i ].displayId,				
					isAvailable = roomDetails[ i ].isAvailable;
				if ( roomDetails[ i ].isPreferred === 1 ){ //Preferred room type
					ShowRoomType( isAvailable, rowToMove, 0 ); // 3 - Availability (1=available/0=not available)
				} else { //Not preferred room type.
					$( rowToMove ).hide();
				}
			}
			$( "#resDates" ).html( "Preferred room type(s) availability" );
		} else if ( whatToShow === "PreferredAvailable" ){
		
			for ( var i = 0; i < roomDetailsAll; i = i + 1){

				var rowToMove = roomDetails[ i ].displayId,
					isAvailable = roomDetails[ i ].isAvailable;
					
				if ( roomDetails[ i ].isPreferred === 1 ){ //Preferred room type
				
					ShowRoomType( isAvailable, rowToMove, 1 ); // 3 - Availability (1=available/0=not available)
				} else { //Not preferred room type.
					$( rowToMove ).hide();
				}
			}
			$( "#resDates" ).html( "Available preferred room type(s)" );
		} else if ( whatToShow === "AllAvailable" ){
		
			for ( var i = 0; i < roomDetailsAll; i = i + 1){
			
				var rowToMove = roomDetails[ i ].displayId, // 2 = the room type row in the table
					isAvailable = roomDetails[ i ].isAvailable;
				ShowRoomType( isAvailable, rowToMove, 1 ); // (3||0) - Availability (1=available/0=not available and (0||1) 0 all, 1 available room type only
			}
			$( "#resDates" ).html( "All available room type(s)" );
		} else if ( whatToShow === "All" ){
		
			for ( var i = 0; i < roomDetailsAll; i = i + 1){
				var rowToMove = roomDetails[ i ].displayId, // 2 = the room type row in the table
					isAvailable = roomDetails[ i ].isAvailable;
				ShowRoomType( isAvailable, rowToMove, 0 ); // (3||0) - Availability (1=available/0=not available and (0||1) 0 all, 1 available room type only
			}
			
			$( "#resDates" ).html( "All room type(s) availability" );
		}
		
		resetNumRmReserve(); //Reset number of rooms to be reserve to 0
		
		//var position = $( "#resRoomAvailability" ).offset().top;				
		//$.mobile.silentScroll( position );
	}
	
	function ShowRoomType( isAvailable, rowToMove, isShowAvailableOnly ){
	
		$rowToMoveObj = $( rowToMove );
		
		if ( isAvailable === 1 ){ //Available
		
			whereToMove = $( "#resBookNowAvailFirstRow" );
			$rowToMoveObj.insertAfter( whereToMove );
			$rowToMoveObj.show();
			$rowToMoveObj.find( "td:nth-child(3)" ).html( "Number of rooms to be reserved" );
		} else { //Not Available
		
			if ( isShowAvailableOnly ){ //Show Available only
			
				$rowToMoveObj.hide();
			} else { //Show Availalbe and not Available.
			
				whereToMove = $( "#TRBookNowLast" );
				$rowToMoveObj.insertBefore( whereToMove );
				$rowToMoveObj.find( " td:nth-child(3)" ).html( "Not available on preferred date(s)" );
				$rowToMoveObj.find( " td:last-child" ).hide();
				$rowToMoveObj.show();
			}
		}		
	}
	
	function populateAvailableroomsCount( rmtype, numAvailable ){

		function create(name,props){
			var elem = document.createElement( name );
			for ( var prop in props )
				elem[ prop ] = props[ prop ];
			return elem;
		}
		
		var availableRooms = document.createDocumentFragment();
		
		for ( var i = 0; i <= numAvailable; i = i + 1 ){

			availableRooms.appendChild( create( "option", {
				text: i,
				value: i
			}));

			$( rmtype ).selectmenu( "refresh" );
		}
		
		$( rmtype ).append( availableRooms ).selectmenu( "refresh" );

	}

	//Date preferred have new rates, future rate setting.
	function setNewPrices( newPriceRmtype, priceNP, priceP, priceGD ){
		//Defaulting all pricess to ++, with additional tax and service charge
		$( newPriceRmtype + " .roomDetailsTbl .rateNP" ).html( "newPriceNP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateNP" ).html( "newPriceNP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateNP" ).html( "newPriceNP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateNP" ).html( "newPriceNP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateNP" ).html( "newPriceNP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateNP" ).html( "newPriceNP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateNP" ).html( "newPriceNP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateNP" ).html( "newPriceNP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateNP" ).html( "newPriceNP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateNP" ).html( "newPriceNP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateNP" ).html( "newPriceNP" + " ++" );
					
		$( newPriceRmtype + " .roomDetailsTbl .rateP" ).html( "newPriceP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateP" ).html( "newPriceP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateP" ).html( "newPriceP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateP" ).html( "newPriceP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateP" ).html( "newPriceP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateP" ).html( "newPriceP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateP" ).html( "newPriceP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateP" ).html( "newPriceP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateP" ).html( "newPriceP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateP" ).html( "newPriceP" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateP" ).html( "newPriceP" + " ++" );

		$( newPriceRmtype + " .roomDetailsTbl .rateGD" ).html( "newPriceGD" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateGD" ).html( "newPriceGD" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateGD" ).html( "newPriceGD" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateGD" ).html( "newPriceGD" + " ++" );
		//resSIRRoomDetailspop .roomDetailsTbl - No GDR
		$( newPriceRmtype + " .roomDetailsTbl .rateGD" ).html( "newPriceGD" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateGD" ).html( "newPriceGD" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateGD" ).html( "newPriceGD" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateGD" ).html( "newPriceGD" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateGD" ).html( "newPriceGD" + " ++" );
		$( newPriceRmtype + " .roomDetailsTbl .rateGD" ).html( "newPriceGD" + " ++" );			
	}
	

	function KuhaaAngPagkaanaaSaKwarto( L ){

		document.getElementById( "numresWER" ).options.length = 0;
		document.getElementById( "numresLSR" ).options.length = 0;
		document.getElementById( "numresLVR" ).options.length = 0;
		document.getElementById( "numresPSR" ).options.length = 0;
		document.getElementById( "numresSIR" ).options.length = 0;
		document.getElementById( "numresFR" ).options.length = 0;
		document.getElementById( "numres1BS" ).options.length = 0;
		document.getElementById( "numres2BS" ).options.length = 0;
		document.getElementById( "numresQV" ).options.length = 0;
		document.getElementById( "numresRS" ).options.length = 0;

		//Corresponding roomtypes index
		//"0=WER","1=LSR","2=LVR","3=PS","4=SIR","5=FR","6=OneBS","7=TwoBS","8=QV","9=RB"

		var recordLength = L.length;

		resDetails.resArrYear = L[ 0 ].ArrYear;
		resDetails.resArrMonth = L[ 0 ].ArrMonth;
		resDetails.resArrDay = L[ 0 ].ArrDay;
		resDetails.resDepYear = L[ 0 ].DepYear;
		resDetails.resDepMonth = L[ 0 ].DepMonth;
		resDetails.resDepDay = L[ 0 ].DepDay;
		resDetails.resAdults = parseInt( L[ 0 ].Adults );
		resDetails.resChildren = parseInt( L[ 0 ].Children );
		resDetails.resRoomNights = parseInt( L[ 0 ].Nights );

		var resDateArrival = resDetails.resArrYear + "-" + resDetails.resArrMonth + "-" + resDetails.resArrDay,
			resDateDeparture = resDetails.resDepYear + "-" + resDetails.resDepMonth + "-" + resDetails.resDepDay;

		var dateRangeText =	getDateRangeText( resDateArrival, resDateDeparture, 0 ); // 0 - for Stay

			$( "#reservationDates" ).html( "<strong>" + dateRangeText + "</strong>" );
			$( "#resComputationsHead" ).html( "Stay : " + dateRangeText );
			
			document.getElementById( "resparamStay" ).value = dateRangeText;
			document.getElementById( "resArrivalDate" ).value = resDateArrival;
			document.getElementById( "resDepartureDate" ).value = resDateDeparture;
			
			document.getElementById( "resparamAdult" ).value = resDetails.resAdults;
			document.getElementById( "resparamChild" ).value = resDetails.resChildren;

			
			if ( resDetails.resAdults > 1 ){
				
				if ( resDetails.resChildren === 0 ){ //Adults

					//$( "#reservationGuests" ).html("<strong class='Tealcolor'>" + resDetails.resAdults + " : </strong> Adults" );
					$( "#reservationGuests" ).html("<strong>" + resDetails.resAdults + " : </strong> Adults" );
				} else if ( resDetails.resChildren === 1 ){ //Adults - Child

					//$( "#reservationGuests1" ).html("<strong class='Tealcolor'>" + resDetails.resAdults + " : </strong>" + " Adults" );
					//$( "#reservationGuests" ).html("<strong class='Tealcolor'>" + resDetails.resChildren + ":</strong>" + " Child" );
					$( "#reservationGuests1" ).html("<strong>" + resDetails.resAdults + " : </strong>" + " Adults" );
					$( "#reservationGuests" ).html("<strong>" + resDetails.resChildren + ":</strong>" + " Child" );
				} else {//Adults - Children

					//$( "#reservationGuests1" ).html("<strong class='Tealcolor'>" + resDetails.resAdults + " : </strong>" + " Adults" );
					//$( "#reservationGuests" ).html("<strong class='Tealcolor'>" + resDetails.resChildren + ":</strong>" + " Children" );
					$( "#reservationGuests1" ).html("<strong>" + resDetails.resAdults + " : </strong>" + " Adults" );
					$( "#reservationGuests" ).html("<strong>" + resDetails.resChildren + ":</strong>" + " Children" );
				}
			} else if ( resDetails.resAdults === 1 ){

				if ( resDetails.resChildren === 0 ){ //Adult
				
					//$( "#reservationGuests" ).html("<strong class='Tealcolor'>" + resDetails.resAdults + " : </strong> Adult" );
					$( "#reservationGuests" ).html("<strong>" + resDetails.resAdults + " : </strong> Adult" );
				} else if ( resDetails.resChildren === 1 ){ //Adult - Child
				
					//$( "#reservationGuests1" ).html("<strong class='Tealcolor'>" + resDetails.resAdults + " : </strong>" + " Adult" );
					//$( "#reservationGuests" ).html("<strong class='Tealcolor'>" + resDetails.resChildren + ":</strong>" + " Child" );
					$( "#reservationGuests1" ).html("<strong>" + resDetails.resAdults + " : </strong>" + " Adult" );
					$( "#reservationGuests" ).html("<strong>" + resDetails.resChildren + ":</strong>" + " Child" );
				} else { //Adult - Children
				
					//$( "#reservationGuests1" ).html("<strong class='Tealcolor'>" + resDetails.resAdults + " : </strong>" + " Adult" );
					//$( "#reservationGuests" ).html("<strong class='Tealcolor'>" + resDetails.resChildren + ":</strong>" + " Children" );
					$( "#reservationGuests1" ).html("<strong>" + resDetails.resAdults + " : </strong>" + " Adult" );
					$( "#reservationGuests" ).html("<strong>" + resDetails.resChildren + ":</strong>" + " Children" );
				}
			} else {

				window.location.href="myreservation.html";
			}
			
			for ( var i = 0; i < recordLength; i = i + 1 ){

				var theRMType =  L[ i ].RoomType,
					roomsAvailable = L[ i ].minimum, //Number of ROOMS available based on guest resNights(RESERVATION NIGHTS)
					roomNightsAvailable = parseInt( L[ i ].numrec ), //Number ROOM NIGHTS available base on guest PREFERRED DATES
					priceNP = parseFloat( L[ i ].PriceNP ),
					priceP = parseFloat( L[ i ].PriceP ),
					newPriceNP = parseFloat( L[ i ].PriceNP1 ),
					newPriceP = parseFloat( L[ i ].PriceP1 ),
					newRateStartDate = L[ i ].Startdate,
					adults = L[ i ].adults,
					children = L[ i ].children,
					maxextra = L[ i ].maxextra,
					RequiredPay = L[ i ].RequiredPay,
					AgeRegarless = L[ i ].AgeRegarless,
					GDRNotApply = L[ i ].GDRNotApply;

				if ( parseInt( roomNightsAvailable ) === parseInt( resDetails.resRoomNights ) ){
				
					if ( roomsAvailable === "null" ) {					
						isNightsAvailable = 0;
					} else {
						isNightsAvailable = "true";
					}
				} else {

					isNightsAvailable = 0;
				}

				if( theRMType === "PS" ){
					roomDetails[ 3 ].roomNightsAvailable = roomNightsAvailable;
					roomDetails[ 3 ].priceNP = priceNP;
					roomDetails[ 3 ].priceP = priceP;
					roomDetails[ 3 ].newPriceNP = newPriceNP;
					roomDetails[ 3 ].newPriceP = newPriceP;
					roomDetails[ 3 ].newRateStartDate = newRateStartDate;
					roomDetails[ 3 ].priceGDR = priceNP * .75;
					roomDetails[ 3 ].adults = adults;
					roomDetails[ 3 ].children = children;
					roomDetails[ 3 ].maxextra = maxextra;
					roomDetails[ 3 ].RequiredPay = RequiredPay; 
					roomDetails[ 3 ].AgeRegarless = AgeRegarless;
					roomDetails[ 3 ].GDRNotApply = GDRNotApply;				
					if ( isNightsAvailable ){
						populateAvailableroomsCount( "#numresPSR", roomsAvailable );
						roomDetails[ 3 ].isAvailable = 1;
						$( "#numresPSR" ).show( "fast" );
					} else {
						roomDetails[ 3 ].isAvailable = 0;
					}
					if ( newRateStartDate && newPriceNP && newPriceP ){
						setNewPrices( ".resPSRRoomDetailspop", newPriceNP, newPriceP )
					}
				} else if( theRMType === "LV" ){
					roomDetails[ 2 ].roomNightsAvailable = roomNightsAvailable;
					roomDetails[ 2 ].priceNP = priceNP;
					roomDetails[ 2 ].priceP = priceP;
					roomDetails[ 2 ].newPriceNP = newPriceNP;
					roomDetails[ 2 ].newPriceP = newPriceP;
					roomDetails[ 2 ].newRateStartDate = newRateStartDate;
					roomDetails[ 2 ].priceGDR = priceNP * .75;
					roomDetails[ 2 ].adults = adults;
					roomDetails[ 2 ].children = children;
					roomDetails[ 2 ].maxextra = maxextra; 
					roomDetails[ 2 ].RequiredPay = RequiredPay; 
					roomDetails[ 2 ].AgeRegarless = AgeRegarless;
					roomDetails[ 2 ].GDRNotApply = GDRNotApply;				
					if ( isNightsAvailable ){
						populateAvailableroomsCount( "#numresLVR", roomsAvailable );
						roomDetails[ 2 ].isAvailable = 1;
						$( "#numresLVR" ).show( "fast" );
					} else {
						roomDetails[ 2 ].isAvailable = 0;
					}
					if ( newRateStartDate && newPriceNP && newPriceP ){
						setNewPrices( ".resLVRRoomDetailspop", newPriceNP, newPriceP )
					}
				} else if( theRMType === "LS" ){
					roomDetails[ 1 ].roomNightsAvailable = roomNightsAvailable;
					roomDetails[ 1 ].priceNP = priceNP;
					roomDetails[ 1 ].priceP = priceP;
					roomDetails[ 1 ].newPriceNP = newPriceNP;
					roomDetails[ 1 ].newPriceP = newPriceP;
					roomDetails[ 1 ].newRateStartDate = newRateStartDate;
					roomDetails[ 1 ].priceGDR = priceNP * .75;
					roomDetails[ 1 ].adults = adults;
					roomDetails[ 1 ].children = children;
					roomDetails[ 1 ].maxextra = maxextra; 
					roomDetails[ 1 ].RequiredPay = RequiredPay; 
					roomDetails[ 1 ].AgeRegarless = AgeRegarless;
					roomDetails[ 1 ].GDRNotApply = GDRNotApply;				
					if ( isNightsAvailable ){
						populateAvailableroomsCount( "#numresLSR", roomsAvailable );
						roomDetails[ 1 ].isAvailable = 1;
						$( "#numresLSR" ).show( "fast" );
					} else {
						roomDetails[ 1 ].isAvailable = 0;
					}
					if ( newRateStartDate && newPriceNP && newPriceP ){
						setNewPrices( ".resLSRRoomDetailspop", newPriceNP, newPriceP )
					}
				} else if( theRMType === "WE" ){
					roomDetails[ 0 ].roomNightsAvailable = roomNightsAvailable;
					roomDetails[ 0 ].priceNP = priceNP;
					roomDetails[ 0 ].priceP = priceP;
					roomDetails[ 0 ].newPriceNP = newPriceNP;
					roomDetails[ 0 ].newPriceP = newPriceP;
					roomDetails[ 0 ].newRateStartDate = newRateStartDate;
					roomDetails[ 0 ].priceGDR = priceNP * .75;
					roomDetails[ 0 ].adults = adults;
					roomDetails[ 0 ].children = children;
					roomDetails[ 0 ].maxextra = maxextra; 
					roomDetails[ 0 ].RequiredPay = RequiredPay; 
					roomDetails[ 0 ].AgeRegarless = AgeRegarless;
					roomDetails[ 0 ].GDRNotApply = GDRNotApply;
					if ( isNightsAvailable ){
						populateAvailableroomsCount( "#numresWER", roomsAvailable );
						roomDetails[ 0 ].isAvailable = 1;
						$( "#numresWER" ).show( "fast" );
					} else {
						roomDetails[ 0 ].isAvailable = 0;
					}
					if ( newRateStartDate && newPriceNP && newPriceP ){
						setNewPrices( ".resWERRoomDetailspop", newPriceNP, newPriceP )
					}
				} else if( theRMType === "1BK" ){
					roomDetails[ 6 ].roomNightsAvailable = roomNightsAvailable;
					roomDetails[ 6 ].priceNP = priceNP;
					roomDetails[ 6 ].priceP = priceP;
					roomDetails[ 6 ].newPriceNP = newPriceNP;
					roomDetails[ 6 ].newPriceP = newPriceP;
					roomDetails[ 6 ].newRateStartDate = newRateStartDate;
					roomDetails[ 6 ].priceGDR = priceNP * .75;
					roomDetails[ 6 ].adults = adults;
					roomDetails[ 6 ].children = children;
					roomDetails[ 6 ].maxextra = maxextra; 
					roomDetails[ 6 ].RequiredPay = RequiredPay; 
					roomDetails[ 6 ].AgeRegarless = AgeRegarless;
					roomDetails[ 6 ].GDRNotApply = GDRNotApply;				
					if ( isNightsAvailable ){
						populateAvailableroomsCount( "#numres1BS", roomsAvailable );
						roomDetails[ 6 ].isAvailable = 1;
						$( "#numres1BS" ).show( "fast" );
					} else {
						roomDetails[ 6 ].isAvailable = 0;
					}
					if ( newRateStartDate && newPriceNP && newPriceP ){
						setNewPrices( ".res1BSRoomDetailspop", newPriceNP, newPriceP )
					}
				} else if( theRMType === "2KK" ){
					roomDetails[ 7 ].roomNightsAvailable = roomNightsAvailable;
					roomDetails[ 7 ].priceNP = priceNP;
					roomDetails[ 7 ].priceP = priceP;
					roomDetails[ 7 ].newPriceNP = newPriceNP;
					roomDetails[ 7 ].newPriceP = newPriceP;
					roomDetails[ 7 ].newRateStartDate = newRateStartDate;
					roomDetails[ 7 ].priceGDR = priceNP * .75;
					roomDetails[ 7 ].adults = adults;
					roomDetails[ 7 ].children = children;
					roomDetails[ 7 ].maxextra = maxextra; 
					roomDetails[ 7 ].RequiredPay = RequiredPay; 
					roomDetails[ 7 ].AgeRegarless = AgeRegarless;
					roomDetails[ 7 ].GDRNotApply = GDRNotApply;				
					if ( isNightsAvailable ){
						populateAvailableroomsCount( "#numres2BS", roomsAvailable );
						roomDetails[ 7 ].isAvailable = 1;
						$( "#numres2BS" ).show( "fast" );
					} else {
						roomDetails[ 7 ].isAvailable = 0;
					}
					if ( newRateStartDate && newPriceNP && newPriceP ){
						setNewPrices( ".res2BSRoomDetailspop", newPriceNP, newPriceP )
					}
				} else if( theRMType === "RB" ){
					roomDetails[ 9 ].roomNightsAvailable = roomNightsAvailable;
					roomDetails[ 9 ].priceNP = priceNP;
					roomDetails[ 9 ].priceP = priceP;
					roomDetails[ 9 ].newPriceNP = newPriceNP;
					roomDetails[ 9 ].newPriceP = newPriceP;
					roomDetails[ 9 ].newRateStartDate = newRateStartDate;
					roomDetails[ 9 ].priceGDR = priceNP * .75;
					roomDetails[ 9 ].adults = adults;
					roomDetails[ 9 ].children = children;
					roomDetails[ 9 ].maxextra = maxextra; 
					roomDetails[ 9 ].RequiredPay = RequiredPay; 
					roomDetails[ 9 ].AgeRegarless = AgeRegarless;
					roomDetails[ 9 ].GDRNotApply = GDRNotApply;				
					if ( isNightsAvailable ){
						populateAvailableroomsCount( "#numresRS", roomsAvailable );
						roomDetails[ 9 ].isAvailable = 1;
						$( "#numresRS" ).show( "fast" );
					} else {
						roomDetails[ 9 ].isAvailable = 0;
					}
					if ( newRateStartDate && newPriceNP && newPriceP ){
						setNewPrices( ".resRSRoomDetailspop", newPriceNP, newPriceP )
					}
				} else if( theRMType === "QV" ){
					roomDetails[ 8 ].roomNightsAvailable = roomNightsAvailable;
					roomDetails[ 8 ].priceNP = priceNP;
					roomDetails[ 8 ].priceP = priceP;
					roomDetails[ 8 ].newPriceNP = newPriceNP;
					roomDetails[ 8 ].newPriceP = newPriceP;
					roomDetails[ 8 ].newRateStartDate = newRateStartDate;
					roomDetails[ 8 ].priceGDR = priceNP * .75;
					roomDetails[ 8 ].adults = adults;
					roomDetails[ 8 ].children = children;
					roomDetails[ 8 ].maxextra = maxextra; 
					roomDetails[ 8 ].RequiredPay = RequiredPay; 
					roomDetails[ 8 ].AgeRegarless = AgeRegarless;
					roomDetails[ 8 ].GDRNotApply = GDRNotApply;
					if ( isNightsAvailable ){
						populateAvailableroomsCount( "#numresQV", roomsAvailable );
						roomDetails[ 8 ].isAvailable = 1;
						$( "#numresQV" ).show( "fast" );
					} else {
						roomDetails[ 8 ].isAvailable = 0;
					}
					if ( newRateStartDate && newPriceNP && newPriceP ){
						setNewPrices( ".resQVRoomDetailspop", newPriceNP, newPriceP )
					}
				} else if( theRMType === "SPA" ){
					roomDetails[ 4 ].roomNightsAvailable = roomNightsAvailable;
					roomDetails[ 4 ].priceNP = priceNP;
					roomDetails[ 4 ].priceP = priceP;
					roomDetails[ 4 ].newPriceNP = newPriceNP;
					roomDetails[ 4 ].newPriceP = newPriceP;
					roomDetails[ 4 ].newRateStartDate = newRateStartDate;
					roomDetails[ 4 ].priceGDR = priceNP * .75;
					roomDetails[ 4 ].adults = adults;
					roomDetails[ 4 ].children = children;
					roomDetails[ 4 ].maxextra = maxextra; 
					roomDetails[ 4 ].RequiredPay = RequiredPay; 
					roomDetails[ 4 ].AgeRegarless = AgeRegarless;
					roomDetails[ 4 ].GDRNotApply = GDRNotApply;				
					if ( isNightsAvailable ){
						populateAvailableroomsCount( "#numresSIR", roomsAvailable );
						roomDetails[ 4 ].isAvailable = 1;
						$( "#numresSIR" ).show( "fast" );
					} else {
						roomDetails[ 4 ].isAvailable = 0;
					}
					if ( newRateStartDate && newPriceNP && newPriceP ){
						setNewPrices( ".resSIRRoomDetailspop", newPriceNP, newPriceP )
					}
				} else if( theRMType === "FA" ){
					roomDetails[ 5 ].roomNightsAvailable = roomNightsAvailable;
					roomDetails[ 5 ].priceNP = priceNP;
					roomDetails[ 5 ].priceP = priceP;
					roomDetails[ 5 ].newPriceNP = newPriceNP;
					roomDetails[ 5 ].newPriceP = newPriceP;
					roomDetails[ 5 ].newRateStartDate = newRateStartDate;
					roomDetails[ 5 ].priceGDR = priceNP * .75;
					roomDetails[ 5 ].adults = adults;
					roomDetails[ 5 ].children = children;
					roomDetails[ 5 ].maxextra = maxextra; 
					roomDetails[ 5 ].RequiredPay = RequiredPay; 
					roomDetails[ 5 ].AgeRegarless = AgeRegarless;
					roomDetails[ 5 ].GDRNotApply = GDRNotApply;				
					if ( isNightsAvailable ){
						populateAvailableroomsCount( "#numresFR", roomsAvailable );
						//roomTypes[ 5 ][ 3 ] = 1;
						roomDetails[ 5 ].isAvailable = 1;
						$( "#numresFR" ).show( "fast" );
					} else {
						roomDetails[ 5 ].isAvailable = 0;
					}
					if ( newRateStartDate && newPriceNP && newPriceP ){
						setNewPrices( ".resFRRoomDetailspop", newPriceNP, newPriceP )
					}
				}
			}
			//This condition should be here because of room availability assignment after the for loop on top.
			if ( hasFoundPreferredRmType ){
			
				BookNowRmTypeToShow( "PreferredAll" ); //Show All preferred room types(Available and Not available).
			} else { //No prefered room type. Show All available room types.
			
				BookNowRmTypeToShow( "AllAvailable" ); //Display All Available room types.
				$( "#resBookNowAvailFirstRow td" ).hide();
				$( "#bookShowAllAvailable" ).attr( "checked", true ).checkboxradio( "refresh" );
			}
	}

	function KuhaaRoomDetails( leox_param ){

		return $.ajax({
			cache: false,
			dataType: "JSON",
			type: "GET",
			url: "roomsAvailability.php",
			data: leox_param
		});
	}
	
	//Check if there is preferred room type..
	var roomTypesAll = roomTypes.length;

	for ( var i = 0; i < roomTypesAll; i = i + 1 ){

		var rowToMove = roomTypesRow[ i ],
			rmTypeName = roomTypes[ i ];

		if ( localStorageSupported ){

			var isPreferred = localStorage.getItem( roomTypes[ i ] );
			if ( isPreferred ){
			
				hasFoundPreferredRmType = true;
				roomDetails[ i ].isPreferred = 1;
			} else {
				roomDetails[ i ].isPreferred = 0;
			}
		} else {//localStorage not supported. Automatically, no preferred room type.
			roomDetails[ i ].isPreferred = 1;
		}
	}

	//KuhaaAngPagkaanaaSaKwarto();

/*
});
$( "#myreservationGDetails" ).on( "pagecreate", function( event ) {
*/

/*
	var selectedRmType = "", SelectedRooms = "", totalRoomCount=0;
	
	
	function AddComma(Num) {
		var n= Num.toString().split(".");
		n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return n.join(".");
	}
		
	var resArrStat = resDetails.resArrYear + "-" + resDetails.resArrMonth + "-" + resDetails.resArrDay;
	var resDepStat = new Date( resDetails.resDepYear + "/" + resDetails.resDepMonth + "/" + ( resDetails.resDepDay) );
	var resDepStatless1 = resDetails.resDepYear + "-" + resDetails.resDepMonth + "-" + ( resDepStat.getDate() -1 ) // -1 for date sql between query

	// Determine if (NP/P/BO) Dates	
	$.getJSON( "tatSetaRmooRteg.php", { resArr: resArrStat, resDep: resDepStatless1 }, function( roomStat ) {
	
		var lenStat = roomStat.length - 1, rmStat = 0, cntNP = 0, cntP = 0, cntPeak = 0, cntBO = 0, 
			startP = 0, endP = 0, startBO = 0, endBO = 0, foundSpa = 0, found1kind = 0, totalNights = 0,
			prevStat = "", prevDate = "";
			//prevStat = "", prevDate = "", SelectedRooms = "";
		
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

		var roomTypesSelected = roomTypeSelected.length, rmCompute = "", extraAdults = 0,
			amtNP = 0, amtP = 0, amtBO = 0, amtGDR = 0, roomTotal = 0, grandTotal = 0, totalRequiredAmt = 0, OnekindSpa = 0,
			adultTotal = 0, childTotal = 0, maxExtraTotal = 0,amtExtraAdult = 0, resAdultTotal = 0, foundPHRB2KK = 0;
			
		for ( rmSelectCnt = 0; rmSelectCnt < roomTypesSelected; rmSelectCnt = rmSelectCnt + 1 ){
				
			var rmTypeSelected = roomTypeSelected[ rmSelectCnt ],	// Room Type
				rmTypeSelectedIndex = roomTypesDb.indexOf( rmTypeSelected ),
				rmNumSelected = roomDetails[ rmTypeSelectedIndex ].resRooms; //Number of rooms to be reserve

			if ( rmNumSelected ){ // Check if there is Number of rooms to be reserve
						
				adultTotal = adultTotal + ( roomDetails[ rmTypeSelectedIndex ].adults * rmNumSelected );
				childTotal = childTotal + ( roomDetails[ rmTypeSelectedIndex ].children * rmNumSelected );
				maxExtraTotal = maxExtraTotal + ( roomDetails[ rmTypeSelectedIndex ].maxextra * rmNumSelected );
				totalRoomCount = totalRoomCount + rmNumSelected;
				document.getElementById( roomTypes[ rmTypeSelectedIndex ] ).value = rmNumSelected; // Assing Room type number of rooms to be recerved.
						
				$( "#divbfast" + roomTypes[ rmTypeSelectedIndex ] ).show();
				
				selectedRmType = selectedRmType + roomTypesId[ rmTypeSelectedIndex ]  + ":" + rmNumSelected + ","
				rmCompute = rmCompute + "<tr><td colspan=3 class='iBold Tealcolor'>" + roomTypesDesc[ rmTypeSelectedIndex ] + "</td></tr>";
						
				var correctRoomWord = AddRemoveSs( "room", rmNumSelected );
				if ( totalNights >= 6 ){ // GDR
						
					var rateGDR = roomDetails[ rmTypeSelectedIndex ].priceGDR;

					if ( cntNP ){
								
						var correctNightWord = AddRemoveSs( "night", cntNP );

						amtGDR = rateGDR * cntNP * rmNumSelected;
								
						rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Great Discounted Rate (Non-Peak) $ " + rateGDR + " x " + cntNP + " " + correctNightWord + " x " + rmNumSelected + " " + correctRoomWord + " </td><td> " + AddComma( amtGDR.toFixed(2) ) + "</td></tr>";					
					}
							
					if ( cntBO ){
								
						var boDateRange = getDateRangeText( startBO, endBO, 1);
						var correctNightWord = AddRemoveSs( "night", cntBO );
						var correctDateWord = AddRemoveSs( "date", cntBO );
								
						amtBO = rateGDR * cntBO * rmNumSelected;
								
						rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Black out " + correctDateWord + " ( " + boDateRange + " ) $ " + rateGDR + " x " + cntBO + " " + correctNightWord + " x " + rmNumSelected + " " + correctRoomWord + " </td><td> " + AddComma( amtBO.toFixed(2) ) + "</td></tr>";
					}
				} else { //NP
						
					var rateNP = roomDetails[ rmTypeSelectedIndex ].priceNP;
					if ( cntNP ){
							
						var correctNightWord = AddRemoveSs( "night", cntNP );
						amtNP = rateNP * cntNP * rmNumSelected;
								
						//Required amount for QV,PH,RB & SPA days that did not belong to Peak, Black-out and GDR days
						if ( rmTypeSelected == "QV" || rmTypeSelected == "PH" || rmTypeSelected == "RB" || rmTypeSelected == "SPA" ){
							OnekindSpa = OnekindSpa + amtNP ;
						}
																
						rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $ " + rateNP + " x " + cntNP + " " + correctNightWord + " x " + rmNumSelected + " " + correctRoomWord + " </td><td> " + AddComma( amtNP.toFixed(2) ) + "</td></tr>";
					}
					if ( cntBO ){
						amtBO = rateNP * cntBO * rmNumSelected;
						var boDateRange = getDateRangeText( startBO, endBO, 1);
						var correctNightWord = AddRemoveSs( "night", cntBO );
						var correctDateWord = AddRemoveSs( "date", cntBO );
						rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Black out " + correctDateWord + " ( " + boDateRange + " ) $ " + rateNP + " x " + cntBO + " " + correctNightWord + " x " + rmNumSelected + " " + correctRoomWord + " </td><td> " + AddComma( amtBO.toFixed(2) ) + "</td></tr>";
					}
				}

				if ( cntP ){ //Peak
						
					amtP = roomDetails[ rmTypeSelectedIndex ].priceP * cntP * rmNumSelected;
					var peakDateRange = getDateRangeText( startP, endP, 1 );
					var correctNightWord = AddRemoveSs( "night", cntP );
							
					rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Peak rate applies for ( " + peakDateRange + " ) $ " + roomDetails[ rmTypeSelectedIndex ].priceP + " x " + cntP + " " + correctNightWord + " x " + rmNumSelected + " " + correctRoomWord + " </td><td> " + AddComma( amtP.toFixed(2) ) + "</td></tr>";
				}
						
				roomTotal = roomTotal + amtNP + amtP + amtBO + amtGDR;
				totalRequiredAmt = totalRequiredAmt + OnekindSpa + amtP + amtBO + amtGDR;
						
				// for Spa and One-of-a-kind guarantee, check.
				if ( rmTypeSelected === "QV" || rmTypeSelected === "PH" || rmTypeSelected === "RB" ){
					found1kind = 1;
				} else if (  rmTypeSelected === "SPA" ){
					foundSpa = 1;
				}
						
				// 6 person regardless of age room type, check.
				if ( rmTypeSelected === "PH" || rmTypeSelected === "RB" || rmTypeSelected === "2KK" ){ // 6 persons regardless of age.
					foundPHRB2KK = foundPHRB2KK + 1;
				}
			}
		} //end for loop...
		
		// CHECK for PH, RB, 2KK : 6 0 2 - 6 person regardless of age, 2 extra person charge.
		if ( foundPHRB2KK ){ 
			if ( ( roomTypesSelected > 1 ) && ( foundPHRB2KK !== roomTypesSelected ) ){ // NOT all room types selected are PH, RB or 2KK.
				var ageRegardless = foundPHRB2KK * 6; // 6 person regardless of age.

				if ( resDetails.resAdults < ageRegardless ){
				
					resAdultTotal = resDetails.resAdults + resDetails.resChildren;
				} else {
					resAdultTotal = resDetails.resAdults
				}

			} else { // room types selected are PH or RB or 2KK
				resAdultTotal = resDetails.resAdults + resDetails.resChildren;
			}

		} else { // NO PH, RB & 2KK room type selected
			resAdultTotal = resDetails.resAdults;
		}
		//Check for Extra Adult
		if ( resAdultTotal > adultTotal ){
			extraAdults = resAdultTotal - adultTotal; // number of extra adult(s)
			amtExtraAdult = 20 * totalNights * extraAdults; // 20 - for $20 1 extra adult.
			
			var correctPersonWord = AddRemoveSs( "person", extraAdults );
			var correctNightWord = AddRemoveSs( "night", totalNights );
			
			roomTotal = roomTotal + amtExtraAdult; // add amount to room total.
			rmCompute = rmCompute + "<tr><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Extra " + correctPersonWord + " charge $20 x " + resDetails.resRoomNights + " " + correctNightWord + " x " + extraAdults + " " + correctPersonWord + " </td><td> " + AddComma( amtExtraAdult.toFixed(2) ) + "</td></tr>";
		}
		
		rmCompute = rmCompute + "<tr id='resroomTaxSc'><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Room Tax &amp; Service charge</i></td><td>" + AddComma( ( roomTotal * .232 ).toFixed(2) ) + "</td></tr>";
		rmCompute = rmCompute + "<tr id='resTotalRm' class='iBold Tealcolor'><td colspan=2>Total room rates</td><td> $ " + AddComma( ( roomTotal * 1.232 ).toFixed(2) ) + "</td></tr>";		
		rmCompute = rmCompute + "<tr id='trgrandTotal' class='iBold Tealcolor'><td colspan=2>Grand Total (USD)</td><td id='grandTotal'> $ " + AddComma( ( roomTotal * 1.232 ).toFixed(2) ) + "</td>";
		
		if ( totalRequiredAmt ){

			rmCompute = rmCompute + "<tr id='trRequiredAmnt' class='iBold ' style='color:red;'><td colspan=2>Required Advance Payment (USD)</td><td id='requiredAmtTotal'> $ " + AddComma( ( totalRequiredAmt * 1.232 ).toFixed(2) ) + "</td>";
			//rmCompute = rmCompute + "<tr><td colspan=4 style='text-align:right;font-size:14px;font-style:italic;color:#000;'>Room conversion rate is @" + parseInt( RoomConversion ).toFixed(2) + " Php = 1 USD</td></tr>";
		}
		
		$( "#resComputations" ).append( rmCompute );
		
		//Show Free Treats for 4 & 5 nights only.
		if ( lenStat === 3 || lenStat === 4 ){ //3&4 instead of 4&5 bec. lenStat - 1 above.
			$( "#FreeTreats" ).show();
		}

		//Determine Satisfaction Guarantee to display
		// 1 - Peak, 2 - blackout, 3 - One Of a kind, 4 - Spa, 5 - GDR , 6 - Non peak
		var cancelNotice = "";
		if ( cntP ){
			$( "#resGuaranteeP" ).show();
			cancelNotice = "1";
		} else if ( ( cntNP + cntBO ) >= 6 ){ //GDR
			$( "#resGuaranteeGDR" ).show();
			cancelNotice = "5";
		} else if ( cntBO ){
			$( "#resGuaranteeBlackOut" ).show();	
			cancelNotice = "2";
		} else {
			if ( found1kind ){
				$( "#resGuarantee1Kind" ).show();
				cancelNotice = "3";
			} else if ( foundSpa ){
				$( "#resGuaranteeSpa" ).show();
				cancelNotice = "4";
			} else { //Non-peak
				$( "#resGuaranteeNP" ).show();
				cancelNotice = "6";
			}
		}
		document.getElementById( "cancelNotice" ).value = cancelNotice;
	});
	
	$( ".bfastChecks" ).on( "change", function( event ){
	
		var BfastchkId = this.id, bfastValue = parseFloat( this.value );
		
		var bfRmType = BfastchkId.substring(5); //extract room type from id
		
		var bfRmTypeIndex = roomTypes.indexOf( bfRmType ); // get index of room type from roomTypes array
		
		var bfastAmount = bfastValue * resDetails.resRoomNights * roomDetails[ bfRmTypeIndex ].resRooms,
			curGrandTotal = parseFloat( $( "#grandTotal" ).html().substring(2).replace(/\,/g,'') ), //existing grand total
			$naaBfast = $ ( "#hasBfast" );
			
		if ( $("#" + BfastchkId ).is( ":checked" ) ){ //add bfast.
		
			var correctNightsWord = AddRemoveSs( "night", resDetails.resRoomNights );
			var correctRoomWord = AddRemoveSs( "room", roomDetails[ bfRmTypeIndex ].resRooms );
			
			if ( $naaBfast.length ){ //with existing bfast
			
				var	oldbfastTotal = parseFloat( $( "#bfastTotal" ).html().substring(2).replace(/\,/g,'') ), // existing bfast total
					bfastTaxSCTotal = parseFloat( $( "#resbfastTaxSc" ).html().replace(/\,/g,'') ); //existing bfast tax & sc
				// add bfast row
				$( "#hasBfast" ).after(" <tr id='" + BfastchkId + "1'><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + roomTypesDesc[ bfRmTypeIndex ] + " $ " + bfastValue + " x " + resDetails.resRoomNights + " " + correctNightsWord + " x " + roomDetails[ bfRmTypeIndex ].resRooms + " " + correctRoomWord + " </td><td> " + AddComma( bfastAmount.toFixed(2) ) + "</td></tr>" );
				// add to bfast total
				$( "#bfastTotal" ).html( "$ " + AddComma( ( oldbfastTotal + ( bfastAmount * 1.232 ) ).toFixed(2) ) );
				// add to bfast tax and sc
				$( "#resbfastTaxSc" ).html( AddComma( ( bfastTaxSCTotal + ( bfastAmount * .232 ) ).toFixed(2) ) );
				//add to grand total
				$( "#grandTotal" ).html( "$ " + AddComma( ( curGrandTotal + ( bfastAmount * 1.232 ) ).toFixed(2) ) )
			} else { // first bfast
			
				$( "#resTotalRm" ).after( "<tr id='trBfastTotal' class='iBold Tealcolor'><td colspan='2'>Breakfast Package Total</td><td id='bfastTotal'> $ " + AddComma( ( bfastAmount * 1.232 ).toFixed(2) ) + "</td></tr>" );
				$( "#resTotalRm" ).after( "<tr id='trBfastTaxSC'><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Food Tax &amp; Service charge</i></td><td id='resbfastTaxSc'>" + AddComma( ( bfastAmount * .232 ).toFixed(2) ) + "</td></tr>" );
				$( "#resTotalRm" ).after(" <tr id='" + BfastchkId + "1'><td colspan=2 style='text-align:right;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + roomTypesDesc[ bfRmTypeIndex ] + " $ " + bfastValue + " x " + resDetails.resRoomNights + " " + correctNightsWord + " x " + roomDetails[ bfRmTypeIndex ].resRooms + " " + correctRoomWord + " </td><td> " + AddComma( bfastAmount.toFixed(2) ) + "</td></tr>" );
				$( "#resTotalRm" ).after(" <tr id='hasBfast'><td colspan=3 class='iBold Tealcolor'>Special Offer Breakfast Buffet Package </td></tr>" );
				//add to grand total
				$( "#grandTotal" ).html( "$ " + AddComma( ( curGrandTotal + ( bfastAmount * 1.232 ) ).toFixed(2) ) )
			}
		
		} else { //remove bfast
			var	oldbfastTotal = parseFloat( $( "#bfastTotal" ).html().substring(2).replace(/\,/g,'') ), // existing bfast total
				bfastTaxSCTotal = parseFloat( $( "#resbfastTaxSc" ).html().replace(/\,/g,'') ); //existing bfast tax & sc
			//deduct total bfast tax and sc
			$( "#resbfastTaxSc" ).html( AddComma( ( bfastTaxSCTotal - ( bfastAmount * .232 ) ).toFixed(2) ) );
			//deduct total bfast
			$( "#bfastTotal" ).html( "$ " + AddComma( ( oldbfastTotal - ( bfastAmount * 1.232 ) ).toFixed(2) ) );
			//deduct grantotal
			$( "#grandTotal" ).html( "$ " + AddComma( ( curGrandTotal - ( bfastAmount * 1.232 ) ).toFixed(2) ) )
			//remove bfast row
			$( "#" + BfastchkId + "1" ).remove();
			
			//check for currentBfast total
			if ( ( parseInt ( $( "#bfastTotal" ).html().substring(2).replace(/\,/g,'') ) ) < 1 ){
				$( "#trBfastTotal" ).remove();
				$( "#trBfastTaxSC" ).remove();
				$( "#hasBfast" ).remove();
			}
		}
	});
	
	$( ".resAddONChoice" ).on( "click", function( event ){
	
		var AddOnchkId = this.id, 
			addOnAmt = parseFloat( this.value ),
			addOnRmTotal = addOnAmt * totalRoomCount;
			curGrandTotal = parseFloat( $( "#grandTotal" ).html().substring(2).replace(/\,/g,'') ),
			withRequiredAmnt = $( "#trRequiredAmnt" ); // check if required amount row exist?
			
		if ( $( "#" + AddOnchkId ).is( ":checked" ) ){ //Add

			var vepId = this.id, pkgName = "",
				correctRoomWord = AddRemoveSs( "room", totalRoomCount );
			
			if ( vepId === "chkresAddVEP" ){
					pkgName = "VIP Express Package";
			} else if ( vepId === "chkresAddRRP" ){
					pkgName = "Romantic Rendezvous Package";
			} else if ( vepId === "chkresAddPAP" ){
					pkgName = "Personal Assistant Package";
			} else if ( vepId === "chkresAddCCP" ){
					pkgName = "Cook with the Chef Package";
			}
			// insert add-on line
			$( "#trgrandTotal" ).before("<tr id='" + this.id + "1'><td colspan=2>" + pkgName + " ( $" + addOnAmt + "nett x " + totalRoomCount + " " + correctRoomWord + ")</td><td> " + addOnRmTotal.toFixed(2) + "</td></tr>");
			// add add-on amount to grand total. Nett
			$( "#grandTotal" ).html( "$ " + AddComma( ( curGrandTotal + addOnRmTotal ).toFixed(2) ) )
			
			if ( withRequiredAmnt.length ){
			
				var CurrequiredAmtTotal = parseFloat( $( "#requiredAmtTotal" ).html().substring(2).replace(/\,/g,'') );
				$( "#requiredAmtTotal" ).html( "$ " + AddComma( ( CurrequiredAmtTotal + addOnRmTotal ).toFixed(2) ) )
			} else {
			
				$( "#trgrandTotal" ).after( "<tr id='trRequiredAmnt' class='iBold ' style='color:red;'><td colspan=2>Required Advance Payment (USD)</td><td id='requiredAmtTotal'> $ " + AddComma( addOnRmTotal.toFixed(2) ) + "</td>" );
			}
			
		} else { //Remove add-on
		
			//deduct from grand total
			$( "#grandTotal" ).html( "$ " + AddComma( ( curGrandTotal - addOnRmTotal ).toFixed(2) ) )
			// remove add-on line
			$( "#" + this.id + "1" ).remove();
			
			if ( withRequiredAmnt.length ){
			
				var CurrequiredAmtTotal = parseFloat( $( "#requiredAmtTotal" ).html().substring(2).replace(/\,/g,'') );
				var NewrequiredAmtTotal = CurrequiredAmtTotal - addOnRmTotal;
				
				if ( NewrequiredAmtTotal ){
					
					$( "#requiredAmtTotal" ).html( "$ " + AddComma( NewrequiredAmtTotal.toFixed(2) ) )
				} else {
				
					$( "#trRequiredAmnt" ).remove();//remove required amount row
				}				
			}
		}
	});
	*/
	$( "#reservationDetails" ).submit( function( event ){
	
		function validateEmail( email ){
			//simple regular expression to validate an email address. It will accept email address in upper case also.
			var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			
			if (reg.test(email)){
			
				return true;
			} else {
			
				return false;
			}
		}

		function ccCheck( pccNumber ) {
			
			var numSum = 0;
			var value;
			
			for ( var i = 0; i < 16; ++i ) {
			
				if ( i % 2 == 0 ) {
				
					value = 2 * pccNumber[ i ];
					
					if ( value >= 10 ) {

						value = ( Math.floor( value / 10 ) + ( value % 10 ) );
					}
				} else {
				
					value = +pccNumber[ i ];
				}
				
				numSum += value;
			}

			return ( numSum % 10 == 0 );
		}

		// get a collection of all empty fields
		var emptyFields = $( ":input.kinahanglan" ).filter( function () { return !$.trim( this.value ).length; } );
		
		
		// if there are one or more empty fields
		if ( emptyFields.length ) {
		
			alert( "Please fill-up all required Fields" );
			return false; //return false prevents submission
			
		} else {

			var ccNumber = document.getElementById( "ccNumber" ).value,
				contactEmail = document.getElementById( "contactEmail" ).value;
			
			var correctCC = ccCheck( ccNumber ),
				correctEmail = validateEmail( contactEmail );
				
			if ( !correctEmail ){

				alert( "Invalid E-mail Address" );
				return false;
			} else if ( !correctCC ){

				alert( "Invalid Credit Card Number" );
				return false;
			} else {
				document.getElementById( "resparamAdult" ).value = resDetails.resAdults;
				document.getElementById( "resparamChild" ).value = resDetails.resChildren;
				//document.getElementById( "resRoomTypes" ).value = selectedRmType.substring( 0, ( selectedRmType.length - 1 ) ); //Remove last ","
				//console.log( document.getElementById( "PS" ).value );
			}
		}
	});
});