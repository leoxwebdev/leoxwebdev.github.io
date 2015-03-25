// Para sa tanan pages
$( document ).on( "pagecreate", function() {
	
	// For collapsible-set to auto-croll sa taas. 
	var that = "";
	
	function fncAnimate() {

		$('html, body').animate({
			scrollTop: that.offset().top - 50 }
		);
	}
	
	function fncClick() {

		that = $( this );

		var timeoutId = setTimeout(function () {
			fncAnimate()
		}, 100);
	}
	
	function CollapsibleHeaderMoveToTop() { 
		$( "a.ui-collapsible-heading-toggle" ).on( "click", fncClick );
	}
	// Function end collapsible-set to auto-croll to top

	//All panel init
	$( "[data-role=panel]" ).panel().enhanceWithin();

	CollapsibleHeaderMoveToTop(); 	//For collapsible-set to auto-croll to top.

});

/* Index */
$( document ).on( "pagecreate", "#home", function () {

	var $slidingImage = $( "#homeBack .homebackground" ),
		$slidingImageCaption = $( ".captionWrap" ).find( ".slideImageCaption" );

	function updateSlidingImagePath() { //Function to detect screen with and change path of sliding image to load.

		var screenWidth = $( window ).width() + 17, // 17 - ???? based on desktop browser.
			currentPath = $slidingImage.attr( "src" ),
			imgSize = currentPath.slice( 13, 17 );

		if (screenWidth <= 353.5) {
			if (imgSize !== "0320") { $slidingImage.attr( 'src', function(index, attr) { return attr.replace( imgSize, "0320" ); }); }
		} else if (screenWidth >= 353.51 && screenWidth <= 433.50) {
			if (imgSize !== "0387") { $slidingImage.attr( 'src', function(index, attr) { return attr.replace( imgSize, "0387" ); }); }
		} else if (screenWidth >= 433.51 && screenWidth <= 540) {
			if (imgSize !== "0480") { $slidingImage.attr( 'src', function(index, attr) { return attr.replace( imgSize, "0480" ); }); }
		} else if (screenWidth >= 540.01 && screenWidth <= 620) {
			if (imgSize !== "0600") { $slidingImage.attr( 'src', function(index, attr) { return attr.replace( imgSize, "0600" ); }); }
		} else if (screenWidth >= 620.01 && screenWidth <= 660) {
			if (imgSize !== "0640") { $slidingImage.attr( 'src', function(index, attr) { return attr.replace( imgSize, "0640" ); }); }
		} else if (screenWidth >= 660.01 && screenWidth <= 724) {
			if (imgSize !== "0680") { $slidingImage.attr( 'src', function(index, attr) { return attr.replace( imgSize, "0680" ); }); }
		} else if (screenWidth >= 724.01 && screenWidth <= 784) {
			if (imgSize !== "0768") { $slidingImage.attr( 'src', function(index, attr) { return attr.replace( imgSize, "0768" ); }); }
		} else if (screenWidth >= 784.01 && screenWidth <= 880) {
			if (imgSize !== "0800") { $slidingImage.attr( 'src', function(index, attr) { return attr.replace( imgSize, "0800" ); }); }
		} else if (screenWidth >= 880.01 && screenWidth <= 979) {
			if (imgSize !== "0960") { $slidingImage.attr( 'src', function(index, attr) { return attr.replace( imgSize, "0960" ); }); }
		} else if (screenWidth >= 979.01 && screenWidth <= 1011) {
			if (imgSize !== "0998") { $slidingImage.attr( 'src', function(index, attr) { return attr.replace( imgSize, "0998" ); }); }
		} else if (screenWidth >= 1011.01 && screenWidth <= 1052) {
			if (imgSize !== "1024") { $slidingImage.attr( 'src', function(index, attr) { return attr.replace( imgSize, "1024" ); }); }
		} else if (screenWidth >= 1052.01 && screenWidth <= 1108.5) {
			if (imgSize !== "1080") { $slidingImage.attr( 'src', function(index, attr) { return attr.replace( imgSize, "1080" ); }); }
		} else if (screenWidth >= 1108.51 && screenWidth <= 1208.5) {
			if (imgSize !== "1137") { $slidingImage.attr( 'src', function(index, attr) { return attr.replace( imgSize, "1137" ); }); }
		} else if (screenWidth > 1208.51) {
			if (imgSize !== "1280") { $slidingImage.attr( 'src', function(index, attr) { return attr.replace( imgSize, "1280" ); }); }
		}
	}

	//Select Sliding Images to load, Initial.
	updateSlidingImagePath();

	function rollDayon() {

		$( "#homeBack" ).find( ".homebackground" ).first().appendTo( '.homeBack' ).fadeOut( 2000 );
		$( ".captionWrap" ).find( ".slideImageCaption" ).first().appendTo( '.captionWrap' ).fadeOut( 2000 );
		$( "#homeBack" ).find( ".homebackground" ).first().fadeIn( 2000 );
		$( ".captionWrap" ).find( ".slideImageCaption" ).first().fadeIn( 2000 );

		setTimeout(rollDayon, 9000);
	}
	
	$( '.homebackground' ).hide();

	rollDayon(); //Animate na. Home background animation: Easy lang :)

	$( window ).resize( function ( event ) {

		event.preventDefault();
		updateSlidingImagePath(); 
	} );

	//Reserve now Click handling from home
	$( "#homeReserveNow" ).on( "click", function ( event ) {

		localStorage.AngNagTawagNiRoomPage = this.id;
	});

	//Show videos Click handling from home
	$( ".homevideo" ).on( "click", function ( event ) {

		localStorage.AngNagTawagNiImages = "homevideo";
	});

	//View more guest comments Click handling from home
	$( "#homeGotoGuestComments" ).on( "click", function ( event ) {

		localStorage.AngNagTawagNiContactPage = this.id;
	});
	// END - View more guest comments Click handling from home

	//View more guest comments Click handling from home
	$( "#homeCulinary" ).on( "click", function ( event ) {

		event.preventDefault();
		localStorage.AngNagTawagNiDiningPage = this.id;
	});
	// END - View more guest comments Click handling from home	

	//sliding home page selected comments
	var selectedComments = $( ".theComment" ),
		commentsCnt = selectedComments.length,
		commentsSlideDelay = 10000,
		sideCommentssugod = 0;

	setInterval( slideSelectedComments, commentsSlideDelay );

	function slideSelectedComments () {

		$( selectedComments[ sideCommentssugod % commentsCnt ] ).hide();
		$( selectedComments[ ++sideCommentssugod % commentsCnt ] ).show();
	}

	getHtmlData( "indexsidebar.html" ).then( function( indexsidebarHtml ) {

		$( ".homesidebar" ).prepend( indexsidebarHtml ).trigger( "create" );
	});
});

/* rooms */
$( document ).on( "pagecreate", "#rooms", function () {

	var $conventionalPage = $( ".conventionalPage" ),
		$specialtyPage = $( ".specialtyPage" ),
		$amenitiesPage = $( ".amenitiesPage" ),
		$discountPage = $( ".discountPage" ),
		//$roomsidebar = $( ".homesidebar" ),

		$rooms_mobile_menu = $( ".rooms_mobile_menu" ),

		$rmCONVENTIONAL = $( "#rmCONVENTIONAL" ),
		$rmSpecialty = $( "#rmSpecialty" ),
		$rmDiscountRates = $( "#rmDiscountRates" ),
		$rmAmenities = $( "#rmAmenities" ),

		$WERShowDetails = $( "#WERShowDetails" ),

		//$AdtoSaTaas = $("html, body");
		$AdtoSaTaas = $( "html, body" );
		

	/*
	$("#rmpageNameMenuItem").on("click", function () {
		$rmCONVENTIONAL.collapsible("option", "collapsed", true);
		$rmSpecialty.collapsible("option", "collapsed", true);
		$rmDiscountRates.collapsible("option", "collapsed", true);
		$rmAmenities.collapsible("option", "collapsed", true);
	});
	*/
	
	//END - Rooms page menu, not top menu
	
	//Room Details Pop-up height
	/*
	$(".pop260px").on({
		popupbeforeposition: function() {
			var maxHeight = $(window).height() - 150;
			$(".pop260px .ui-content").css("max-height", maxHeight + "px");
		}
	});
	*/
	$( ".leoxYourHereMainMenu" ).on( "change", function () {
		window.location.assign( this.value );
	});
	
	function AdtoTaasBeh() {
		return $AdtoSaTaas.animate({scrollTop: 0 }).promise();
	}
	
	function displayRoomsItem ( pRoomItem ) {

		AdtoTaasBeh().then( function () {
			if ( pRoomItem == "CONVENTIONALROOMS" ) {
				if ( $rmCONVENTIONAL.is(":visible") === false ) {
					$rmSpecialty.hide();
					$rmDiscountRates.hide();
					$rmAmenities.hide();
					$rmCONVENTIONAL.slideToggle(1300);
				}
			} else if ( pRoomItem == "SPECIALTYROOMSandSUITES" ) {
				if ( $rmSpecialty.is(":visible") === false ) {
					$rmCONVENTIONAL.hide();
					$rmDiscountRates.hide();
					$rmAmenities.hide();
					$rmSpecialty.slideToggle( 1300 );
				}	
			} else if ( pRoomItem == "HOTELandROOMAMENITIES" ){
				if ( $rmAmenities.is(":visible") === false ){
					$rmCONVENTIONAL.hide();
					$rmSpecialty.hide();
					$rmDiscountRates.hide();
					$rmAmenities.slideToggle(1300);
				}
			} else if ( pRoomItem == "DISCOUNTRATES" ){
				if ( $rmDiscountRates.is(":visible") === false ){
					$rmCONVENTIONAL.hide();
					$rmSpecialty.hide();
					$rmAmenities.hide();
					$rmDiscountRates.slideToggle(1300);
				}
			}
			$("select.rooms_mobile_menu").val( pRoomItem ).selectmenu( "refresh" );
			$("select.rooms_mobile_menu").val( pRoomItem ).selectmenu( "refresh" );
			$("select.rooms_mobile_menu").val( pRoomItem ).selectmenu( "refresh" );			
		});
	}

	$conventionalPage.on("click", function () { displayRoomsItem( "CONVENTIONALROOMS" ); });
	$specialtyPage.on("click", function () { displayRoomsItem( "SPECIALTYROOMSandSUITES" ); });
	$amenitiesPage.on("click", function () { displayRoomsItem( "HOTELandROOMAMENITIES" ); });
	$discountPage.on("click", function () { displayRoomsItem( "DISCOUNTRATES" ); });
/*
	$roomsidebar.on( "click", $(".conventionalPage"), function () { displayRoomsItem( "CONVENTIONALROOMS" ); });
	$roomsidebar.on( "click", $(".specialtyPage"), function () { displayRoomsItem( "SPECIALTYROOMSandSUITES" ); });
	$roomsidebar.on( "click", $(".amenitiesPage"), function () { displayRoomsItem( "HOTELandROOMAMENITIES" ); });
	$roomsidebar.on( "click", $(".discountPage"), function () { displayRoomsItem( "DISCOUNTRATES" ); });
*/
	if ( localStorage.AngNagTawagNiRoomPage === "homeReserveNow" ){
		localStorage.AngNagTawagNiRoomPage = "LeoGwapo";
		displayRoomsItem( "DISCOUNTRATES" );
	}
	
	$rooms_mobile_menu.on( "change", function () {
		displayRoomsItem( this.value );
	});

	// Show/Hide Room Details
	$( ".rmDetails" ).on( "click", function() {
		
		var selectedRmType = this.name,
			$RoomDetails = $( "#" + selectedRmType ),
			$rmTypId = $( "#" + selectedRmType.slice(0,3) );
		
		$AdtoSaTaas.animate( {scrollTop: $rmTypId.offset().top - 15 } );

		$RoomDetails.slideToggle( 800, function () {
			if ( $RoomDetails.is(":visible") ){
				//console.log(this.name);
				$rmTypId.find( "a.rmDetails" ).html("Hide room details");
			} else {
				$rmTypId.find( "a.rmDetails" ).html("Show room details");
			}
		});
	});

	// sidebar items sliding
	var sidespecialtyRooms = $(".specialtyPage img"),
		sidespecialtyRoomsCnt = sidespecialtyRooms.length,
		sideconventionalRooms = $( ".conventionalPage img" ),
		sideconventionalRoomsCnt = sideconventionalRooms.length,
		delaySpecial = 3000,
		delayCon = 3000,
		sidespecialtyRoomssugod = 0,
		sideconventionalRoomssugod = 0;
		
		//setInterval(sideconventionalRoomsTuyok, delayCon);
		//setInterval(sidespecialtyRoomsTuyok, delaySpecial);

		function sideconventionalRoomsTuyok () {
			$( sideconventionalRooms[ sideconventionalRoomssugod % sideconventionalRoomsCnt ] ).hide();
			$( sideconventionalRooms[ ++sideconventionalRoomssugod % sideconventionalRoomsCnt ] ).show();
		}

		function sidespecialtyRoomsTuyok(){
			$( sidespecialtyRooms[ sidespecialtyRoomssugod % sidespecialtyRoomsCnt ] ).hide();
			$( sidespecialtyRooms[ ++sidespecialtyRoomssugod % sidespecialtyRoomsCnt ] ).show();
		}

	$( ".reserveThisRoom" ).click( function() {
		var prefRoom = this.name,
			roomType = prefRoom.slice( 0, prefRoom.indexOf( "-" ) ),
			roomTypeName = prefRoom.slice( prefRoom.indexOf( "-" ) + 1 );
			
		if ( localStorage.getItem( roomType ) === null ) {
			localStorage.setItem( roomType, roomTypeName );
		}
	});
/*
	getHtmlData( "roomsidebar.html" ).then( function( indexsidebarHtml ) {

		$( ".homesidebar" ).html( indexsidebarHtml ).trigger( "create" );
	});
*/
});

// packages
$( document ).on( "pagecreate", "#packages", function () {

	var $daytripperPage = $( ".daytripperPage" ),
		$conferencesPage = $( ".conferencesPage" ),
		$weddingPage = $( ".weddingPage" ),
		$addonPage = $( ".addonPage" ),
		
		$packages_mobile_menu = $( ".packages_mobile_menu" ),

		$pkgDayTripper = $( "#pkgDayTripper" ),
		$pkgConference = $( "#pkgConference" ),
		$pkgWeddingpackage = $( "#pkgWeddingpackage" ),
		$pkgAddOnServices = $( "#pkgAddOnServices" ),
		
		$AdtoSaTaas = $( "html, body" );

	/*	
	//Packages page menu, not top menu
	$("#pkgpageNameMenuItem").on("click", function () {
		$pkgDayTripper.collapsible("option", "collapsed", true);
		$pkgConference.collapsible("option", "collapsed", true);
		$pkgWeddingpackage.collapsible("option", "collapsed", true);
		$pkgAddOnServices.collapsible("option", "collapsed", true);
	});
	//END - Packages page menu, not top menu	
	*/
	$( ".leoxYourHereMainMenu" ).on( "change", function () {
		window.location.assign( this.value );
	});

	function displayPackagesItem( pPackagesItem ){
	
		$AdtoSaTaas.animate( { scrollTop: 0 } );
		if ( pPackagesItem === "DAYTRIPPERADVENTURE" ) {
			if ( $pkgDayTripper.is(":visible") == false ){
				$pkgConference.hide();
				$pkgWeddingpackage.hide();
				$pkgAddOnServices.hide();
				$pkgDayTripper.slideToggle( 1500 );
			}
		} else if ( pPackagesItem === "CONFERENCES" ) {
			if ( $pkgConference.is(":visible") == false ){
				$pkgDayTripper.hide();
				$pkgWeddingpackage.hide();
				$pkgAddOnServices.hide();
				$pkgConference.slideToggle( 1500 );
			}
		} else if ( pPackagesItem === "WEDDING" ) {
			if ( $pkgWeddingpackage.is( ":visible" ) == false ){
				$pkgDayTripper.hide();
				$pkgConference.hide();
				$pkgAddOnServices.hide();
				$pkgWeddingpackage.slideToggle( 1500 );
			}
		} else if ( pPackagesItem === "ADD-ONSERVICES" ) {
			if ( $pkgAddOnServices.is( ":visible" ) == false ){
				$pkgDayTripper.hide();
				$pkgConference.hide();
				$pkgWeddingpackage.hide();
				$pkgAddOnServices.slideToggle( 1500 );
			}
		}
		$( "select.packages_mobile_menu" ).val( pPackagesItem ).selectmenu( "refresh" );
		$( "select.packages_mobile_menu" ).val( pPackagesItem ).selectmenu( "refresh" );
		$( "select.packages_mobile_menu" ).val( pPackagesItem ).selectmenu( "refresh" );
	}
	
	$daytripperPage.on( "click", function () { displayPackagesItem( "DAYTRIPPERADVENTURE" ); });
	$conferencesPage.on( "click", function () { displayPackagesItem( "CONFERENCES" ); });
	$weddingPage.on( "click", function () { displayPackagesItem( "WEDDING" ); });
	$addonPage.on( "click", function () { displayPackagesItem( "ADD-ONSERVICES" ); });
	
	$packages_mobile_menu.on( "change", function () {
		displayPackagesItem( this.value );
	});
	
	// Pictures of Plantationbay 
	$( ".sendPostcardPkgFunction" ).on( "click", function () {
		$( "#sendDetalyePkgFunction" ).slideToggle( 500 );
		$AdtoSaTaas.animate({scrollTop: $( "#pkgFunctionArea" ).find( "h1" ).offset().top } );
	});
	
	$( "#imgGagmayPkgFunction img" ).on( "click", function () {
		$( "#PkgFunctionDaku" ).attr( "src", this.name );
		$AdtoSaTaas.animate( { scrollTop: $( "#pkgFunctionArea" ).find( "h1" ).offset().top } );
	});
	
	$( "#tananPkgFunctionGamay" ).on( "click", function () {
		if ( $( "#imgGagmayPkgFunction" ).css( "white-space" ) == "normal" ){
			$( "#imgGagmayPkgFunction" ).css( { "overflow-x":"scroll", "white-space":"nowrap" } );
			$( this ).html( "All" );
		} else {
			$( "#imgGagmayPkgFunction" ).css( { "overflow-x":"hidden", "white-space":"normal" } );
			$( this ).html( "Hide" );
		}
		$AdtoSaTaas.animate( { scrollTop: $( "#pkgFunctionArea" ).find( "h1" ).offset().top } );
	});
});

// dining
$( document ).on( "pagecreate", "#dining", function () {

	var $restaurantPage = $( ".restaurantPage" ),
		$culinaryPage = $( ".culinaryPage" ),
		$gastronomyPage = $( ".gastronomyPage" ),
		$themeddinnerPage = $( ".themeddinnerPage" ),

		$dining_mobile_menu = $( ".dining_mobile_menu" ),

		$diningRestaurants = $( "#diningRestaurants" ),
		$diningCulinarySuper = $( "#diningCulinarySuper" ),
		$diningGastronomy = $( "#diningGastronomy" ),
		$diningThemedDinner = $( "#diningThemedDinner" ),
		
		$AdtoSaTaas = $( "html, body" );
	/*
	//Dining page menu, not top menu
	$("#diningpageNameMenuItem").on("click", function () {
		$diningRestaurants.collapsible("option", "collapsed", true);
		$diningCulinarySuper.collapsible("option", "collapsed", true);
		$diningGastronomy.collapsible("option", "collapsed", true);
		$diningThemedDinner.collapsible("option", "collapsed", true);
		
		var position = $("#diningRestaurants").offset().top;
		
		$.mobile.silentScroll(position);
	});
	//END - Dining page menu, not top menu	
	*/
	$( ".leoxYourHereMainMenu" ).on( "change", function () {
		window.location.assign( this.value );
	});
		
	function displayDiningItem( pDiningItem ){
	
		$AdtoSaTaas.animate( { scrollTop: 0 } );
		if ( pDiningItem === "RESTAURANTS" ) {
			if ( $diningRestaurants.is( ":visible" ) == false ){
				$diningCulinarySuper.hide();
				$diningGastronomy.hide();
				$diningThemedDinner.hide();
				$diningRestaurants.slideToggle( 1500 );
			}
		} else if ( pDiningItem === "CULINARYSUPERLATIVES" ) {
			if ( $diningCulinarySuper.is(":visible") == false ){
				$diningRestaurants.hide();
				$diningGastronomy.hide();
				$diningThemedDinner.hide();
				$diningCulinarySuper.slideToggle( 1500 );
			}
		} else if ( pDiningItem === "GASTRONOMYONABUDGET" ) {
			if ( $diningGastronomy.is( ":visible" ) == false ){
				$diningRestaurants.hide();
				$diningCulinarySuper.hide();
				$diningThemedDinner.hide();
				$diningGastronomy.slideToggle( 1500 );
			}
		} else if ( pDiningItem === "THEMEDDINNERBUFFETS" ) {
			if ( $diningThemedDinner.is( ":visible" ) == false ){
				$diningRestaurants.hide();
				$diningCulinarySuper.hide();
				$diningGastronomy.hide();
				$diningThemedDinner.slideToggle( 1500 );
			}
		}
		$( "select.dining_mobile_menu" ).val( pDiningItem ).selectmenu( "refresh" );
		$( "select.dining_mobile_menu" ).val( pDiningItem ).selectmenu( "refresh" );
		$( "select.dining_mobile_menu" ).val( pDiningItem ).selectmenu( "refresh" );
	}
	
	$restaurantPage.on( "click", function () { displayDiningItem( "RESTAURANTS" ); } );
	$culinaryPage.on( "click", function () { displayDiningItem( "CULINARYSUPERLATIVES" ); } );
	$gastronomyPage.on( "click", function () { displayDiningItem( "GASTRONOMYONABUDGET" ); } );
	$themeddinnerPage.on( "click", function () { displayDiningItem( "THEMEDDINNERBUFFETS" ); } );
	
	$dining_mobile_menu.on( "change", function () {
		displayDiningItem( this.value );
	});

});

// spa
$( document ).on( "pagecreate", "#mogambosprings", function () {

	var $spatreatmentsPage = $( ".spatreatmentsPage" ),
		$lovinglifePage	= $( ".lovinglifePage" ),
		$spaindulgencePage = $( ".spaindulgencePage" ),
		$nailsalonPage	= $( ".nailsalonPage" ),
		$mogambospringsPage	= $( ".mogambospringsPage" ),
		
		$spa_mobile_menu = $( ".spa_mobile_menu" ),
		
		$spaMain = $( "#spaMain" ),
		$spaTreatMents = $( "#spaTreatMents" ),
		$spaLovingLife = $( "#spaLovingLife" ),
		$spaIndugencePac = $( "#spaIndugencePac" ),
		$spaNailSalon = $( "#spaNailSalon" ),
		
		$AdtoSaTaas = $( "html, body" );
	/*	
	//Spa page menu, not top menu
	$("#spapageNameMenuItem").on("click", function () {
		$spaTreatMents.collapsible("option", "collapsed", true);
		$spaLovingLife.collapsible("option", "collapsed", true);
		$spaIndugencePac.collapsible("option", "collapsed", true);
		$spaNailSalon.collapsible("option", "collapsed", true);

		var position = $("#spaTreatMents").offset().top;

		$.mobile.silentScroll(position);
	});
	//END - Spa page menu, not top menu	
	*/
	$( ".leoxYourHereMainMenu" ).on( "change", function () {
		window.location.assign( this.value );
	});
		
	function displaySpaItem( pSpaItem ){
	
		$AdtoSaTaas.animate( { scrollTop: 0 } );
		
		if ( pSpaItem === "SPATREATMENTS" ) {
			if ( $spaTreatMents.is( ":visible" ) == false ){
				$spaMain.hide();
				$spaLovingLife.hide();
				$spaIndugencePac.hide();
				$spaNailSalon.hide();
				$spaTreatMents.slideToggle( 1500 );
			}
		} else if ( pSpaItem === "LOVINGLIFEPROGRAM" ) {
			if ( $spaLovingLife.is( ":visible" ) == false ){
				$spaMain.hide();
				$spaTreatMents.hide();
				$spaIndugencePac.hide();
				$spaNailSalon.hide();
				$spaLovingLife.slideToggle( 1500 );
			}	
		} else if ( pSpaItem === "SPAINDULGENCEPACKAGE" ) {
			if ( $spaIndugencePac.is(":visible") == false ){
				$spaMain.hide();
				$spaTreatMents.hide();
				$spaLovingLife.hide();
				$spaNailSalon.hide();
				$spaIndugencePac.slideToggle( 1500 );
			}
		} else if ( pSpaItem === "NAILSALON" ) {
			if ( $spaNailSalon.is(":visible") == false ){
				$spaMain.hide();
				$spaTreatMents.hide();
				$spaLovingLife.hide();
				$spaIndugencePac.hide();
				$spaNailSalon.slideToggle(1500);
			}
		} else if ( pSpaItem === "MOGAMBOSPRINGS" ) {
			if ( $spaMain.is(":visible") == false ){
				$spaTreatMents.hide();
				$spaLovingLife.hide();
				$spaIndugencePac.hide();
				$spaNailSalon.hide();
				$spaMain.slideToggle(1500);
			}
		}
		$("select.spa_mobile_menu").val(pSpaItem).selectmenu("refresh");
		$("select.spa_mobile_menu").val(pSpaItem).selectmenu("refresh");
		$("select.spa_mobile_menu").val(pSpaItem).selectmenu("refresh");
	}
	
	$spatreatmentsPage.on("click", function () { displaySpaItem( "SPATREATMENTS" ); });
	$lovinglifePage.on("click", function () { displaySpaItem( "LOVINGLIFEPROGRAM" ); });
	$spaindulgencePage.on("click", function () { displaySpaItem( "SPAINDULGENCEPACKAGE" ); });
	$nailsalonPage.on("click", function () { displaySpaItem( "NAILSALON" ); });
	$mogambospringsPage.on("click", function () { displaySpaItem( "MOGAMBOSPRINGS" ); });
	
	$spa_mobile_menu.on( "change", function () {
		displaySpaItem( this.value );
	});
	
});

// activities
$( document ).on( "pagecreate", "#Activities", function () {
	
	var $toursandexcursionPage = $( ".toursandexcursionPage" ),
		$diveshopPage = $( ".diveshopPage" ),
		$funinthesunPage = $( ".funinthesunPage" ),
		$indooractivitiesPage = $( ".indooractivitiesPage" ),
		$golfandtennisPage = $( ".golfandtennisPage" ),
		
		$activities_mobile_menu = $( ".activities_mobile_menu" ),
		
		$actTourExcurs = $( "#actTourExcurs" ),
		$actDiveShop = $( "#actDiveShop" ),
		$actFunInSun = $( "#actFunInSun" ),
		$actIndorActiv = $( "#actIndorActiv" ),
		$actGolfTennis = $( "#actGolfTennis" ),
		
		$AdtoSaTaas = $( "html, body" );
	
	
	//Activites page menu, not top menu
	$( "#ActivipageNameMenuItem" ).on( "click", function () {
		$actTourExcurs.collapsible( "option", "collapsed", true );
		$actDiveShop.collapsible( "option", "collapsed", true );
		$actFunInSun.collapsible( "option", "collapsed", true );
		$actIndorActiv.collapsible( "option", "collapsed", true );
		$actGolfTennis.collapsible( "option", "collapsed", true );
	});
	//END - Activities page menu, not top menu	
	$( ".leoxYourHereMainMenu" ).on( "change", function () {
		window.location.assign( this.value );
	});
		
	function displayActivitiesItem( pActivitiesItem ){

		$AdtoSaTaas.animate( { scrollTop: 0 } );
		if ( pActivitiesItem === "TOURSandEXCURSIONS" ) {
			if ( $actTourExcurs.is( ":visible" ) == false ){
				$actDiveShop.hide();
				$actFunInSun.hide();
				$actIndorActiv.hide();
				$actGolfTennis.hide();
				$actTourExcurs.slideToggle( 1500 );
			}
		} else if ( pActivitiesItem === "DIVESHOP" ) {
			if ( $actDiveShop.is( ":visible" ) == false ){
				$actTourExcurs.hide();
				$actFunInSun.hide();
				$actIndorActiv.hide();
				$actGolfTennis.hide();
				$actDiveShop.slideToggle( 1500 );
			}	
		} else if ( pActivitiesItem === "FUNINTHESUN" ) {
			if ( $actFunInSun.is( ":visible" ) == false ){
				$actTourExcurs.hide();
				$actDiveShop.hide();
				$actIndorActiv.hide();
				$actGolfTennis.hide();
				$actFunInSun.slideToggle( 1500 );
			}	
		} else if ( pActivitiesItem === "INDOORACTIVITIES" ) {
			if ( $actIndorActiv.is( ":visible" ) == false ){
				$actTourExcurs.hide();
				$actDiveShop.hide();
				$actFunInSun.hide();
				$actGolfTennis.hide();
				$actIndorActiv.slideToggle( 1500 );
			}	
		} else if ( pActivitiesItem === "GOLFANDTENNIS" ) {
			if ( $actGolfTennis.is( ":visible" ) == false ){
				$actTourExcurs.hide();
				$actDiveShop.hide();
				$actFunInSun.hide();
				$actIndorActiv.hide();
				$actGolfTennis.slideToggle( 1500 );
			}	
		}
		$( "select.activities_mobile_menu" ).val( pActivitiesItem ).selectmenu( "refresh" );
		$( "select.activities_mobile_menu" ).val( pActivitiesItem ).selectmenu( "refresh" );
		$( "select.activities_mobile_menu" ).val( pActivitiesItem ).selectmenu( "refresh" );
	}
	
	$toursandexcursionPage.on( "click", function () { displayActivitiesItem( "TOURSandEXCURSIONS" ); } );
	$diveshopPage.on( "click", function () { displayActivitiesItem( "DIVESHOP" ); } );
	$funinthesunPage.on( "click", function () { displayActivitiesItem( "FUNINTHESUN" ); } );
	$indooractivitiesPage.on( "click", function () { displayActivitiesItem( "INDOORACTIVITIES" ); } );
	$golfandtennisPage.on( "click", function () { displayActivitiesItem( "GOLFANDTENNIS" ); } );
	$activities_mobile_menu.on( "change", function () { displayActivitiesItem( this.value ); } );

	//for Bird watching
	$( ".showBigBird" ).on( "click", function(){
		var imgUrl = $( this ).find( "img" ).attr( "bigPic" ),
			$elemBigImage = $( "#imgPop" ).find( "img" );
			
		$.loadImage( imgUrl ).done(
			$elemBigImage.attr( "src", imgUrl )
		);
	});
});

// contact us
$( document ).on( "pagecreate", "#contact", function () {

	var	$contactusPage = $( ".contactusPage" ),
		$managementPage = $( ".managementPage" ),
		$guestcommentsPage = $( ".guestcommentsPage" ),
		$historyPage = $( ".historyPage" ),
		$workwithusPage = $( ".workwithusPage" ),
		
		$contact_mobile_menu = $( ".contact_mobile_menu" ),
	
		$contactInfo = $( "#contactInfo" ),
		$contactGuestComments = $( "#contactGuestComments" ),
		$contactManagement = $( "#contactManagement" ),
		$contactHistory = $( "#contactHistory" ),
		$contactWorkWithUs = $( "#contactWorkWithUs" ),
		
		$AdtoSaTaas = $( "html, body" );
		
	//Contact us page menu, not top menu
	$( "#contactNameMenuItem" ).on( "click", function () {
		$contactInfo.collapsible( "option", "collapsed", true );
		$contactGuestComments.collapsible( "option", "collapsed", true );
		$contactManagement.collapsible( "option", "collapsed", true );
		$contactHistory.collapsible( "option", "collapsed", true );
		$contactWorkWithUs.collapsible( "option", "collapsed", true );
	});
	//END - Contact us page menu, not top menu
	$( ".leoxYourHereMainMenu" ).on( "change", function () {
		window.location.assign( this.value );
	});
	
	function displayContactItem( pContactItem ){
	
		$AdtoSaTaas.animate( {scrollTop: 0 } );
		
		if ( pContactItem === "CONTACTUS" ) {
			if ( $contactInfo.is( ":visible" ) == false ){
				$contactGuestComments.hide();
				$contactManagement.hide();
				$contactHistory.hide();
				$contactWorkWithUs.hide();
				$contactInfo.slideToggle( 1500 );
			}
		} else if ( pContactItem === "GUESTCOMMENTS" ) {
			if ( $contactGuestComments.is( ":visible" ) == false ){
				$contactInfo.hide();
				$contactManagement.hide();
				$contactHistory.hide();
				$contactWorkWithUs.hide();
				$contactGuestComments.slideToggle( 1500 );
			}
		} else if ( pContactItem === "HISTORYandCOMMUNITY" ) {
			if ( $contactHistory.is( ":visible" ) == false ){
				$contactInfo.hide();
				$contactGuestComments.hide();
				$contactManagement.hide();
				$contactWorkWithUs.hide();
				$contactHistory.slideToggle( 1500 );
			}	
		} else if ( pContactItem === "WORKWITHUS" ) {
			if ( $contactWorkWithUs.is( ":visible" ) == false ){
				$contactInfo.hide();
				$contactGuestComments.hide();
				$contactManagement.hide();
				$contactHistory.hide();
				$contactWorkWithUs.slideToggle( 1500 );
			}	
		} else if ( pContactItem === "THEMANAGEMENT" ) {
			if ( $contactManagement.is( ":visible" ) == false ){
				$contactInfo.hide();
				$contactGuestComments.hide();
				$contactHistory.hide();
				$contactWorkWithUs.hide();
				$contactManagement.slideToggle( 1500 );
			}	
		}
		$("select.contact_mobile_menu").val(pContactItem).selectmenu("refresh");
		$("select.contact_mobile_menu").val(pContactItem).selectmenu("refresh");
		$("select.contact_mobile_menu").val(pContactItem).selectmenu("refresh");
	}
	
	$contactusPage.on( "click", function () { displayContactItem( "CONTACTUS" ); } );
	$guestcommentsPage.on( "click", function () { displayContactItem( "GUESTCOMMENTS" ); } );
	$historyPage.on( "click", function () { displayContactItem( "HISTORYandCOMMUNITY" ); } );
	$workwithusPage.on( "click", function () { displayContactItem( "WORKWITHUS" ); } );
	$managementPage.on( "click", function () { displayContactItem( "THEMANAGEMENT" ); } );

	if ( localStorage.AngNagTawagNiContactPage === "homeGotoGuestComments" ){
		localStorage.AngNagTawagNiContactPage = "leoGwapo";
		displayContactItem( "GUESTCOMMENTS" );
	}
	
	
	$contact_mobile_menu.on( "change", function () {
		displayContactItem( this.value );
	});
});

// Images
$( document ).on( "pagecreate", "#photogallery", function () {

	var	$photogalleryPage = $( ".photogalleryPage" ),
		$videoPage = $( ".videoPage" ),
		$scenicbeautiesPage = $( ".scenicbeautiesPage" ),
		$hotelmapPage = $( ".hotelmapPage" ),
		
		$images_mobile_menu = $( ".images_mobile_menu" ),
	
		$pbayimages = $( "#pbayimages" ),
		$hotelmap = $( "#hotelmap" ),
		$hotelvideos = $( "#hotelvideos" ),
		$hotelbeauties = $( "#hotelbeauties" ),
		
		$AdtoSaTaas = $( "html, body" );

	$( ".leoxYourHereMainMenu" ).on( "change", function () {
		window.location.assign( this.value );
	});
	
	function displayImagesItem( pImagesItem ){
	
		$AdtoSaTaas.animate( { scrollTop: 0 } );
		
		if ( pImagesItem === "PHOTOGALLERY" ) {
			if ( $pbayimages.is( ":visible" ) == false ){
				$hotelbeauties.hide();
				$hotelmap.hide();
				$hotelvideos.hide();
				$pbayimages.slideToggle( 1500 );
			}	
		} else if ( pImagesItem === "SCENICBEAUTIES" ) {
			if ( $hotelbeauties.is(":visible") == false ){
				$pbayimages.hide();
				$hotelmap.hide();
				$hotelvideos.hide();
				$hotelbeauties.slideToggle( 1500 );
			}	
		} else if ( pImagesItem === "VIDEOOFPLANTATIONBAY" ) {
			if ( $hotelvideos.is( ":visible" ) == false ){
				$hotelbeauties.hide();
				$hotelmap.hide();
				$pbayimages.hide();
				$hotelvideos.slideToggle( 1500 );
			}	
		} else if ( pImagesItem === "HOTELMAP" ) {
			if ( $hotelmap.is( ":visible" ) == false ){
				$hotelbeauties.hide();
				$pbayimages.hide();
				$hotelvideos.hide();
				$hotelmap.slideToggle( 1500 );
			}	
		}
		$( "select.images_mobile_menu" ).val( pImagesItem ).selectmenu( "refresh" );
		$( "select.images_mobile_menu" ).val( pImagesItem ).selectmenu( "refresh" );
		$( "select.images_mobile_menu" ).val( pImagesItem ).selectmenu( "refresh" );
	}
	
	$photogalleryPage.on( "click", function () { displayImagesItem( "PHOTOGALLERY" ); } );
	$scenicbeautiesPage.on( "click", function () { displayImagesItem( "SCENICBEAUTIES" ); } );
	$videoPage.on( "click", function () { displayImagesItem( "VIDEOOFPLANTATIONBAY" ); } );
	$hotelmapPage.on( "click", function () { displayImagesItem( "HOTELMAP" ); } );

	if ( localStorage.AngNagTawagNiImages === "homevideo" ){
		localStorage.AngNagTawagNiImages = "leoGwapo";
		displayImagesItem( "VIDEOOFPLANTATIONBAY" );
	}
	
	$images_mobile_menu.on( "change", function () {
		displayImagesItem( this.value );
	});

	/*
	//Images Big and Small
	$(".pop700px").on({
		popupbeforeposition: function () {
			var maxHeight = $(window).height() - 150;
			$(".pop700px .ui-content").css("max-height", maxHeight + "px");
		}
	});
	*/

	// Pictures of Plantationbay 
	$( ".sendPostcardpbayPic" ).on( "click", function () {
		$( "#sendDetalyebayPic" ).slideToggle( 500 );
		$AdtoSaTaas.animate( {scrollTop: $( "#pbayimages" ).find( "h1" ).offset().top } );
	});

	$( "#imgGagmaypbayPic img" ).on( "click", function () {
		$( "#pbayPicDaku" ).attr( "src", this.name );
		$( "#imgPop" ).find( "img" ).attr( "src", this.name );
		$AdtoSaTaas.animate( { scrollTop: $("#pbayimages").find( "h1" ).offset().top } );
	});
	
	$( "#tananpbayPicGamay" ).on( "click", function () {
		if ( $( "#imgGagmaypbayPic" ).css( "white-space" ) == "normal" ){
			$( "#imgGagmaypbayPic" ).css( { "overflow-x":"scroll", "white-space":"nowrap" } );
			$( this ).html( "All" );
		} else {
			$( "#imgGagmaypbayPic" ).css( { "overflow-x":"hidden", "white-space":"normal" } );
			$( this ).html( "Hide" );
		}
		$AdtoSaTaas.animate( { scrollTop: $( "#pbayimages" ).find( "h1" ).offset().top } );
	});

	// Calendar Girls 2015 
	
	$( ".sendPostcardCalPic2015" ).on( "click", function () {
		$( "#sendDetalyeCalPic2015" ).slideToggle( 500 );
		$AdtoSaTaas.animate( { scrollTop: $( "#h3Cal2015" ).offset().top } );
	});
	
	$( "#imgGagmayCalPic2015 img" ).on( "click", function () {
		$( "#CalPic2015Daku" ).attr( "src", this.name );
		$AdtoSaTaas.animate( { scrollTop: $( "#h3Cal2015" ).offset().top + 37 } );
	});
	
	$("#tananCalPic2015Gamay").on("click", function () {
		if ( $("#imgGagmayCalPic2015").css("white-space") == "normal" ){
			$("#imgGagmayCalPic2015").css({"overflow-x":"scroll","white-space":"nowrap"});
			$( this ).html( "All" );
		} else {
			$("#imgGagmayCalPic2015").css({"overflow-x":"hidden","white-space":"normal"});
			$( this ).html( "Hide" );
		}
		$AdtoSaTaas.animate({scrollTop: $( "#h3Cal2015" ).offset().top } );
	});
	
	// Calendar Girls 2014
	
	$( ".sendPostcardCalPic2014" ).on( "click", function () {
		$( "#sendDetalyeCalPic2014" ).slideToggle( 500 );
		$AdtoSaTaas.animate( { scrollTop: $( "#h3Cal2014" ).offset().top } );
	});

	$( "#imgGagmayCalPic2014 img" ).on( "click", function () {
		$( "#CalPic2014Daku" ).attr( "src", this.name );
		$AdtoSaTaas.animate( { scrollTop: $( "#h3Cal2014" ).offset().top + 37 } );
	});

	$( "#tananCalPic2014Gamay" ).on( "click", function () {
		if ( $( "#imgGagmayCalPic2014" ).css( "white-space" ) == "normal" ){
			$( "#imgGagmayCalPic2014" ).css( { "overflow-x":"scroll", "white-space":"nowrap" } );
			$( this ).html( "All" );
		} else {
			$( "#imgGagmayCalPic2014" ).css( { "overflow-x":"hidden", "white-space":"normal" } );
			$( this ).html( "Hide" );
		}
		$AdtoSaTaas.animate( { scrollTop: $( "#h3Cal2014" ).offset().top } );
	});

	$( ".popClickToDaku" ).on( "click", function(){
		//console.log( $(this).closest("img").attr("src") );
		//console.log(this);
		$( "#imgPop" ).find( "img" ).attr( "src", $( this ).prev().attr( "src" ) );
	});
	/*
	$("#sunodpbayPicGamay").on("click", function () {
		console.log( "img height : " + $(".imgGagmay img").height() );
		console.log( "div width : " + $(".imgGagmay").width() );
		console.log( "# of img : " + $(".imgGagmay img").length );
		console.log( "makita img : " + $(".imgGagmay img").length );
		$(".imgGagmay").animate({scrollLeft : 200}, "fast");
	});
	$("#balikpbayPicGamay").on("click", function () {
		$(".imgGagmay").animate({scrollLeft : -200}, "fast");
	});
	*/
	
	$( "#ipaslidepbayPic" ).on( "click", function () {
		var thisLabel = $( this ).html();
		
		if ( thisLabel == "Play" ){
			slidePbayPicsKaronNa( "#imgGagmaypbayPic img", "#pbayPicDakuSliding", "#imageDakupbayPic", "slideTimepbayPics", "#imgGagmaypbayPic" );
			changePlayStopLabel( "Stop", this );
		} else {
			clearInterval( slideTimepbayPics );
			changePlayStopLabel( "Play", this );
		}
	});

	$( "#ipaslideCalPic2015" ).on( "click", function () {
		var thisLabel = $( this ).html();
		
		if ( thisLabel == "Play" ){
		
			slidePbayPicsKaronNa( "#imgGagmayCalPic2015 img", "#CalPic2015DakuSliding", "#imageDakuCalPic2015", "slideTimeCal2015", "#imgGagmayCalPic2015" );
			changePlayStopLabel( "Stop", this );
			
		} else {
			clearInterval( slideTimeCal2015 );
			changePlayStopLabel( "Play", this );
		}
	});
	
	$( "#ipaslideCalPic2014" ).on( "click", function () {
		var thisLabel = $( this ).html();
		
		if ( thisLabel == "Play" ){
		
			slidePbayPicsKaronNa( "#imgGagmayCalPic2014 img", "#CalPic2014DakuSliding", "#imageDakuCalPic2014", "slideTimeCal2014", "#imgGagmayCalPic2014");
			changePlayStopLabel( "Stop", this );
		} else {
			clearInterval( slideTimeCal2014 );
			changePlayStopLabel( "Play", this );
		}
	});

	//Popup display size
	$( ".photopopup" ).on( {
		popupbeforeposition: function() {
			var maxHeight = $( window ).height() - 30 + "px",
				maxWidth = $( window ).width() - 40 + "px";

			$( ".photopopup img" ).css( {
				"maxHeight": maxHeight,
				"maxWidth": maxWidth
			});
		}
    });

	// Change Play/Stop buttom label
	function changePlayStopLabel( PlayStop, elementPlayStop ){
		$( elementPlayStop ).html( PlayStop );
	}
	
	var slideTimepbayPics, slideTimeCal2015, slideTimeCal2014;
	// preload images
	function preloadImages( urlPbayPics, callback ) {
		var img, imgs = [],
			remaining = urlPbayPics.length;

		for ( var i = 0; i < urlPbayPics.length; i++ ) {
			img = new Image();
			img.onload = function() {
				--remaining;
				if (remaining <= 0) {
					callback(imgs);
				}
			};
			img.src = urlPbayPics[i];
			imgs.push(img);
		}
	}
	
	// Pbay pictures sliding
	function slidePbayPicsKaronNa( imgURLs, imgSudlanan, imgMgaDagko, slideName, unsaNi ){

		var $PbayPics = $( imgURLs ),
			PbayPicsCnt = $PbayPics.length,
			delayPbayPics = 4000,
			PbayPicssugod = 0,
			PbayPicssugodSlide = 0,
			urlPbayPics = [];
			
		for ( PbayPicssugod; PbayPicssugod < PbayPicsCnt; PbayPicssugod++ ){
			urlPbayPics.push( $PbayPics.eq( PbayPicssugod ).attr( "name" ) );
		}
		
		// preload the images and start the slideshow when they are all preloaded
		preloadImages( urlPbayPics, function ( PbayPicsArray ) {

			$( imgSudlanan ).append( PbayPicsArray ).find( "img" ).hide();

			var PbayPicsDaku, PbayPicsDakuCnt;
			
			PbayPicsDaku = $( imgMgaDagko ).find( "img" ),
			PbayPicsDakuCnt = PbayPicsDaku.length;

			$( imgSudlanan ).find( "img" ).eq( 0 ).show();
			$( imgSudlanan ).show();
			$( imgMgaDagko ).find( "img" ).eq( 0 ).hide();

			if ( slideName === "slideTimepbayPics" ){
				clearInterval( slideTimepbayPics );
				slideTimepbayPics = setInterval( PbayPicsTuyok, delayPbayPics );
			} else if ( slideName === "slideTimeCal2015" ){
				clearInterval( slideTimeCal2015 );
				slideTimeCal2015 = setInterval( PbayPicsTuyok, delayPbayPics );
			} else if ( slideName === "slideTimeCal2014" ){
				clearInterval( slideTimeCal2014 );
				slideTimeCal2014 = setInterval( PbayPicsTuyok, delayPbayPics );
			}

			//para scroll ni
			function iScrollIsaLang( ikapilaNgaImg ){

				var	gilapdon = $( unsaNi ).find( "img" ).width(),
					angGitas_on = ikapilaNgaImg * gilapdon;
					
				$( unsaNi ).animate( { scrollLeft : angGitas_on }, "slow" );
			}
			
			//var sugudPaNi = false;
			function PbayPicsTuyok () {
				
				var	ikaPilaNa = PbayPicssugodSlide % PbayPicsDakuCnt;
					
				if ( ikaPilaNa === ( PbayPicsDakuCnt - 1 ) ){
					if ( slideName === "slideTimepbayPics" ){
						clearInterval( slideTimepbayPics );
						changePlayStopLabel( "Play", "#ipaslidepbayPic" )
					} else if ( slideName === "slideTimeCal2015" ){
						clearInterval( slideTimeCal2015 );
						changePlayStopLabel( "Play", "#ipaslideCalPic2015" )
					} else if ( slideName === "slideTimeCal2014" ){
						clearInterval( slideTimeCal2014 );
						changePlayStopLabel( "Play", "#ipaslideCalPic2014" )
					}
				} else {
					$( PbayPicsDaku[ ikaPilaNa ] ).hide( 0 );
					$( PbayPicsDaku[ ++PbayPicssugodSlide % PbayPicsDakuCnt ] ).fadeIn( 300 );
					iScrollIsaLang( ikaPilaNa );
				}
			}
			/*
			function wait( delayPbayPics ) {
				var deferred = $.Deferred();

					setTimeout(deferred.resolve, delayPbayPics);
					return deferred.promise();
			}
			*/
		});
	}
});
