var theDate = new Date(), //Date Today;
	dateToday = new Date( theDate.getFullYear() + "/" + (theDate.getMonth() + 1) + "/" + theDate.getDate() );

	function SetDefaultDates(){

		var defaultArrDate = theDate;
		defaultArrDate.setDate( defaultArrDate.getDate() + 2 );

		document.getElementById( "ArrMonth" ).value = theDate.getMonth() + 1; // javascript date ranges from 0 - 11
		document.getElementById( "ArrDay" ).value = theDate.getDate();
		document.getElementById( "ArrYear" ).value = theDate.getFullYear();

		//Default Room Nights
		document.getElementById( "resNights" ).value = 3;
			
		//Save to localStorage
		localStorage.ArrivalDate = theDate;
		localStorage.RoomNights = 3;

		// Default Departure Date
		theDate.setDate(theDate.getDate() + 3);
		document.getElementById( "DepMonth" ).value = theDate.getMonth() + 1;
		document.getElementById( "DepDay" ).value = theDate.getDate();
		document.getElementById( "DepYear" ).value = theDate.getFullYear();
		//disablePastDays();	
	}

	function UpdateDepartureDate() {

		var ArrMonth = document.getElementById( "ArrMonth" ).value,
			ArrDay = document.getElementById( "ArrDay" ).value,
			ArrYear = document.getElementById( "ArrYear" ).value,
			Nights = document.getElementById( "resNights" ).value,
			NewArrDate = new Date( ArrYear + "/" + ArrMonth + "/" + ArrDay );

		//Save to localstorage
		if ( localStorageSupported ) {
			localStorage.ArrivalDate = NewArrDate;
			localStorage.RoomNights = Nights;
		}

		// Get arrival month name
		var resArrMonthName = resMonthName[ NewArrDate.getMonth() ];

		//New Departure Date
		NewArrDate.setDate( NewArrDate.getDate() + parseInt( Nights ));

		var NewDepartureMonth = NewArrDate.getMonth() + 1,
			NewDepartureDay = NewArrDate.getDate(),
			NewDepartureYear = NewArrDate.getFullYear();

		document.getElementById("DepMonth").value = NewDepartureMonth;
		document.getElementById("DepDay").value = NewDepartureDay;
		document.getElementById("DepYear").value = NewDepartureYear;

		$( "#DepMonth" ).selectmenu( "refresh" );
		$( "#DepDay" ).selectmenu( "refresh" );
		$( "#DepYear" ).selectmenu( "refresh" );

		disablePastDays();
	}

	function UpdateArrivalDateAndRoomNights() {
	
		var NewDepartureMonth = document.getElementById( "DepMonth" ).value,
			NewDepartureDay = document.getElementById( "DepDay" ).value,
			NewDepartureYear = document.getElementById( "DepYear" ).value,	
			Nights = document.getElementById( "resNights" ).value,
			NewArrivalDate = new Date(NewDepartureYear + "/" + NewDepartureMonth + "/" + NewDepartureDay);

		NewArrivalDate.setDate(NewArrivalDate.getDate() - parseInt(Nights));

		document.getElementById("ArrMonth").value = NewArrivalDate.getMonth() + 1;
		document.getElementById("ArrDay").value = NewArrivalDate.getDate();
		document.getElementById("ArrYear").value = NewArrivalDate.getFullYear();

		$("#ArrMonth").selectmenu("refresh");
		$("#ArrDay").selectmenu("refresh");
		$("#ArrYear").selectmenu("refresh");

		//Save to localstorage
		if ( localStorageSupported ) {
			localStorage.ArrivalDate = NewArrivalDate;
		}

		disablePastDays();
	}

	function LeapYearNi( pYear ) {
		if ( 0 == pYear % 400 ) return true;
		if ( 0 == pYear % 100 ) return false;
		return ( 0 == pYear % 4 ) ? true : false;
	}

	function disablePastDays() {
		var dateKaron = new Date(),

			DayKaron = dateKaron.getDate(),
			YearKaron = dateKaron.getFullYear(),
			MonthKaron = dateKaron.getMonth() + 1,

			arrivalMonth = document.getElementById("ArrMonth").value ,
			arrivalDay = document.getElementById("ArrDay").value,
			arrivalYear = document.getElementById("ArrYear").value,			
			
			departureMonth = document.getElementById("DepMonth").value,
			departureDay = document.getElementById("DepDay").value,
			departureYear = document.getElementById("DepYear").value;

		var	arrivalDate = new Date(arrivalYear + "/" + arrivalMonth + "/" + arrivalDay),
			departureDate = new Date(departureYear + "/" + departureMonth + "/" + departureDay);

		//Disable ang arrival date past Days
		if ( ( MonthKaron === arrivalMonth ) && ( YearKaron === arrivalYear ) ) {
			for ( var sugod = 1; sugod < DayKaron; sugod++ ) {
				$( "#ArrDay option[value=" + sugod + "]" ).attr( "disabled", true );
			}
			//Currently selected day was disabled na, move to today
			if ( document.getElementById( "ArrDay" ).value < DayKaron ){
				document.getElementById( "ArrDay" ).value = DayKaron;
			}
		} else {

			//Enable Days 1 to 28
			for ( var day = 1; day <= 28; day++ ) {
				if ( $("#ArrDay option[value=" + day + "]" ).attr( "disabled" ) ) {
					$( "#ArrDay option[value=" + day + "]").attr( "disabled", false );
				}
			}
		}

		//Disable ang Departure date past Days
		if ( ( MonthKaron === departureMonth ) && ( YearKaron === departureYear ) ) {
			for ( var sugod=1; sugod < DayKaron; sugod++ ) {
				$( "#DepDay option[value=" + sugod + "]" ).attr( "disabled", true );
			}
			//Currently selected day was disabled na, move to today + room nights
			roomNights = document.getElementById( "resNights" ).value;
			if ( document.getElementById( "DepDay" ).value < DayKaron ){
				document.getElementById( "DepDay" ).value = DayKaron + parseInt( Nights );
			}
		} else { //Enable Days 1 to 28
		
			for ( var day = 1; day <= 28; day++ ) {
				if ( $("#DepDay option[value=" + day + "]" ).attr( "disabled" ) ){
					$( "#DepDay option[value=" + day + "]" ).attr( "disabled", false );
				}
			}
		}

		disableWalayApilSaMonthNgaDays( "ArrDay" );//Disable Days nga dili apil sa arrival date
		disableWalayApilSaMonthNgaDays( "DepDay" );//Disable Days nga dili apil sa Departure date
		
		$( "#ArrDay" ).selectmenu( "refresh" );
		$( "#DepDay" ).selectmenu( "refresh" );

	}

	//IMPORTANT, CHECK IF DAY TODAY IS NOT 29,30 OR 31
	function disableWalayApilSaMonthNgaDays( pReservationDateDay ) {

		//var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], // gidaghanon sa adlaw sa buwan
		if ( pReservationDateDay.slice( 0, 3 ) === "Arr" ) { //Arrival day
			var theMonth = document.getElementById( "ArrMonth" ).value,
				theDay = "ArrDay";
		} else {//Departure Day
			var theMonth = document.getElementById( "DepMonth" ).value,
				theDay = "DepDay";
		}

		if ( theMonth === 4 || theMonth === 6 || theMonth === 9 || theMonth === 11){//30 days
		
			$( "#" + theDay + " option[value=29]" ).attr( "disabled", false );
			$( "#" + theDay + " option[value=30]" ).attr( "disabled", false );
			$( "#" + theDay + " option[value=31]" ).attr( "disabled", true );
		} else if ( theMonth === 2 ){ //2 - Feb
			/*if (LeapYearNi()){ //Feb leap year pa jud.
				$("#" + pElement + " option[value=29]").attr("disabled",false);
				$("#" + pElement + " option[value=30]").attr("disabled",true);
				$("#" + pElement + " option[value=31]").attr("disabled",true);
			} else (theMonth==28){ //Feb dili leap year */
				$( "#" + theDay + " option[value=29]" ).attr( "disabled" , true );
				$( "#" + theDay + " option[value=30]" ).attr( "disabled" , true );
				$( "#" + theDay + " option[value=31]" ).attr( "disabled" , true );
			/*}*/
		} else { // 31 days --- 1,3,5,7,8,10,12
			$( "#" + theDay + " option[value=29]" ).attr( "disabled" , false );
			$( "#" + theDay + " option[value=30]" ).attr( "disabled" , false );
			$( "#" + theDay + " option[value=31]" ).attr( "disabled" , false );
		}	
	}

	function iDeleteNi( listItemId, listName ) {
		
		$( "#question" ).text( "Remove  this room type?" ); // Show the confirmation to remove popup
		$( "#confirm" ).popup( "open" );
		
		// Proceed when the user confirms
		$( "#confirm #yes" ).on( "click", function() {

			$( "#" + listItemId ).remove();

			if ( localStorageSupported ) {
				localStorage.removeItem( listItemId );
			}

			$( "#confirm" ).popup( "close" );

			//Check if list is empty
			var prefRoomslistCount = $( "#prefRooms" ).find( ">li" );

			if ( prefRoomslistCount.length < 1 ){	//Empty
				$( "#prefRooms" ).append( "<li>All Available</li>" );
				localStorage.showAllRooms = 1;
			}
		});
		
		// Remove active state and unbind when the cancel button is clicked
		$( "#confirm #cancel" ).on( "click", function() {
			$( "#confirm #yes" ).off();
			$( "#confirm" ).popup( "close" );
		});
	}

	if ( localStorageSupported ) {
		
		if ( localStorage.ArrivalDate ) { //check for previous Arrival date preference.

			localstorageArrivalDate = localStorage.ArrivalDate;

			var oldArrivalDate = new Date( localstorageArrivalDate );

			if ( oldArrivalDate > theDate ) { //Not past dates

				var localstorageRoomNights = localStorage.RoomNights ? parseInt ( localStorage.RoomNights ) : 3,
					localstorageAdults = localStorage.Adults ? parseInt ( localStorage.Adults ) : 0,
					localstorageChildren = localStorage.Children ? parseInt ( localStorage.Children ) : 0;

				// Set Adults and Children 
				document.getElementById( "resAdults" ).value = localstorageAdults;
				document.getElementById( "resChildren" ).value = localstorageChildren;
				
				// Set Arrival Date and Room Nights
				document.getElementById( "ArrMonth" ).value = oldArrivalDate.getMonth() + 1; // javascript date ranges from 0 - 11
				document.getElementById( "ArrDay" ).value = oldArrivalDate.getDate();
				document.getElementById( "ArrYear" ).value = oldArrivalDate.getFullYear();
				document.getElementById( "resNights" ).value = localstorageRoomNights;

				// Get arrival month name
				var resArrMonthName = resMonthName[ oldArrivalDate.getMonth() ];

				//Set Departure Date
				oldArrivalDate.setDate( oldArrivalDate.getDate() + parseInt( localstorageRoomNights ) );
				document.getElementById( "DepMonth" ).value = oldArrivalDate.getMonth() + 1;
				document.getElementById( "DepDay" ).value = oldArrivalDate.getDate();
				document.getElementById( "DepYear" ).value = oldArrivalDate.getFullYear();
				
				//Preferred Room Type(s), Check if their is peferred room type.
				for ( var i = 0; i < roomTypes.length; i++ ) {

					var prefRmType = roomTypes[i],
						roomTypeExist = localStorage.getItem( prefRmType );	

					if ( roomTypeExist ) {

						hasFoundPreferredRmType = 1;
						$( "#prefRooms" ).append( "<li id=" + prefRmType + "><span>" + roomTypeExist + " </span><img src='images/remove.png' alt='remove' /></li>" );
					}
				}//END - Preferred Room Type(s).

			} else { //Today or Past previous date preference
			
				SetDefaultDates(); // Set Default dates.
			}

		} else { //No previous arrival date preference

			SetDefaultDates(); // Set Default dates.
		}

	} else { //local storage not supported. 
			//IMPORTANT: CREATE SOME FALLBACK LATER.
			SetDefaultDates(); // Set Default dates.
			$( "#PreferedRoomsHead" ).hide(); // Hide options to select preferred room types.
	}

	if ( !hasFoundPreferredRmType ) {
		$( "#prefRooms" ).append( "<li>All Available</li>" );
	}
