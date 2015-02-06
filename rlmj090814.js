/* --------------  FUNCTIONS ------------------------------- */

// For collapsible-set to auto-croll to top. 
	//for 1.4, the code below was added on pageinit
	/*$(document).on("collapsibleexpand","[data-role=collapsible]", function (){
		var position = $(this).offset().top;
		$.mobile.silentScroll(position);
	});*/
	//This is working but taas gamay, mas ok ang above code.
	//work also on 1.4	 
	var that = "";
	function CollapsibleHeaderMoveToTop(){
		$( "a.ui-collapsible-heading-toggle" ).on("click", fncClick);
	}
	function fncClick(){
		that = $(this);
		var timeoutId = setTimeout(function(){fncAnimate()},100);
	}
	
	function fncAnimate(){
		$('html, body').animate({scrollTop: that.offset().top});
	}
// Function end collapsible-set to auto-croll to top

// Para sa tanan pages
$(document).on("pageinit", function() {
	//All panel init
	$("[data-role=panel]").panel().enhanceWithin();
	
	//For collapsible-set to auto-croll to top. 
	CollapsibleHeaderMoveToTop();
	
});

/*   Jquery mobile init pa */
/* Index */
$(document).on("pageinit","#home", function() {
	//Function to detect screen with and change path of sliding image to load.
	function updateSlidingImagePath(){
		if($(window).width() <= 543){
			if($('#homeBack').html().indexOf("banner680") != -1){
				$(".homeBack .homebackground").css("display","none");
				$(".captionWrap .slideImageCaption").css("display","none");
				$('#homeBack').html($('#homeBack').html().replace(/banner680/g, "banner387"));
			}else if($('#homeBack').html().indexOf("banner1134") != -1){
				$(".homeBack .homebackground").css("display","none");
				$(".captionWrap .slideImageCaption").css("display","none");
				$('#homeBack').html($('#homeBack').html().replace(/banner1134/g, "banner387"));
			}
		}else if($(window).width() <= 907){
			if($('#homeBack').html().indexOf("banner387") != -1){
				$(".homeBack .homebackground").css("display","none");
				$(".captionWrap .slideImageCaption").css("display","none");
				$('#homeBack').html($('#homeBack').html().replace(/banner387/g, "banner680"));
			}else if($('#homeBack').html().indexOf("banner1134") != -1){
				$(".homeBack .homebackground").css("display","none");
				$(".captionWrap .slideImageCaption").css("display","none");
				$('#homeBack').html($('#homeBack').html().replace(/banner1134/g, "banner680"));
			}
		}else if($(window).width() > 907){
			if($('#homeBack').html().indexOf("banner387") != -1){
				$(".homeBack .homebackground").css("display","none");
				$(".captionWrap .slideImageCaption").css("display","none");
				$('#homeBack').html($('#homeBack').html().replace(/banner387/g, "banner1134"));
			}else if($('#homeBack').html().indexOf("banner680") != -1){
				$(".homeBack .homebackground").css("display","none");
				$(".captionWrap .slideImageCaption").css("display","none");
				$('#homeBack').html($('#homeBack').html().replace(/banner680/g, "banner1134"));
			}
		/*$("img").each(function() {
			$(this).attr("src", $(this).attr("src").replace("banner/", "banner387/"));
		});*/
		}
	}
	// END - Function to detect screen with and change path of sliding image to load.
	//Select Sliding Images to load, Initial.
	updateSlidingImagePath();
	// Home background animation: Easy lang :)
	function rollDayon() {
		$(".homeBack .homebackground").first().appendTo('.homeBack').fadeOut(2000);
		$(".captionWrap .slideImageCaption").first().appendTo('.captionWrap').fadeOut(2000);
		$(".homeBack .homebackground").first().fadeIn(2000);
		$(".captionWrap .slideImageCaption").first().fadeIn(2000);
		/*setTimeout(rollDayon, 7000);*/
		setTimeout(rollDayon, 9000);
	}
	$('.homebackground').hide();
	//Animate na.
	rollDayon();
	// END - Home background animation: Easy lang :)
	
	$(window).resize(function(event){
		/*if (rollDayon){
			clearTimeout(rollDayon);
			rollDayon = null;
		}*/
		updateSlidingImagePath();
		//rollDayon();
		//alert($(window).width());
	});
	
	//Reserve now Click handling from home
	$("#homeReserveNow").on("click",function(leo){
		localStorage.AngNagTawagNiRoomPage=this.id;
	});
	//END - Reserve now Click handling home
	//View more guest comments Click handling from home
	$("#homeGotoGuestComments").on("click",function(leo){
		localStorage.AngNagTawagNiContactPage=this.id;
	});
	// END - View more guest comments Click handling from home
	//View more guest comments Click handling from home
	$("#homeCulinary").on("click",function(leo){
		localStorage.AngNagTawagNiDiningPage=this.id;
	});
	// END - View more guest comments Click handling from home	
		
	/*	
	// @HOMEPAGE at least one should be collapsed
	$(".ui-collapsible-heading-toggle").on("click", function () {
		// clicked collaspible	
		var collapsible = $(this).closest(".ui-collapsible");
		// check if its collapsed
		if (collapsible.hasClass("ui-collapsible-collapsed")) {
			// collapse expanded collapsibles
			$(".ui-collapsible").not(collapsible).trigger("collapse");
		} else {
			// keep expanded clicked collapsible as is. Ayaw sugot mo collpase :).
			return false;
		}
	});	
	// END - @HOMEPAGE at least one should be collapsed
*/	
	// Hide and show Main page menu. The listview transparent one. :)
	$("#HomeMenuList").on("click",function(){
		if ($("#homeMenu").is(":visible")){
			//$("#homeMenu").fadeToggle();
			$("#homeMenu").hide(500);
			$(".homeMain").css("margin-top","10px");		//Change top border		
		}else{
			//$("#homeMenu").fadeToggle();			
			$("#homeMenu").show(500);			
			$(".homeMain").css("margin-top","78px");		//Back to original
			
		}
	});
	// END - Hide and show Main page menu
});
/*
// HOME - page orientation change
$(window).on("orientationchange","#home", function( event ) {
	updateSlidingImagePath();
	//alert($(window).width());
});
// END - HOME - page orientation change
*/
/* rooms */
$(document).on("pageinit","#rooms", function() {
/*
	// At least one should be collapsed
	$(".ui-collapsible-heading-toggle").on("click", function () {
		// clicked collaspible	
		var collapsible = $(this).closest(".ui-collapsible");
		// check if its collapsed
		if (collapsible.hasClass("ui-collapsible-collapsed")) {
			// collapse expanded collapsibles
			$(".ui-collapsible").not(collapsible).trigger("collapse");
		} else {
			// keep expanded clicked collapsible as is. Ayaw sugot mo collpase :).
			return false;
		}
	});	
	// END - At least one should be collapsed
	
	*/
	
	//Rooms page menu, not top menu
	/*// working Hinay man
	$(".pageNameMenuItem").on("click",function(){
		$(".pageNameMenu").hide();
		var CollapseId = "#" + this.name;		
		$(CollapseId).collapsible("option", "collapsed", false );		
		var position = $(CollapseId).offset().top;
		$.mobile.silentScroll(position);			
	});
	*/
	$("#rmpageNameMenuItem").on("click",function(){	
		$("#rmCONVENTIONAL").collapsible("option", "collapsed", true );
		$("#rmSpecialty").collapsible("option", "collapsed", true );
		$("#rmDiscountRates").collapsible("option", "collapsed", true );
		$("#rmAmenities").collapsible("option", "collapsed", true );
	});

	//END - Rooms page menu, not top menu
});
/*
$(document).on("pagebeforeshow","#rooms", function(leo,data) {
	if (localStorage.AngNagTawagNiRoomPage == "homeReserveNow"){
		var position = $("#rmDiscountRates").offset().top;
		$.mobile.silentScroll(position);
		localStorage.AngNagTawagNiRoomPage="LeoGwapo";	
	};
	
});
*/
// packages
$(document).on( "pageinit","#packages", function() {	
	//Packages page menu, not top menu
	$("#pkgpageNameMenuItem").on("click",function(){	
		$("#pkgDayTripper").collapsible("option", "collapsed", true );
		$("#pkgConference").collapsible("option", "collapsed", true );
		$("#pkgWedding").collapsible("option", "collapsed", true );
		$("#pkgAddOnServices").collapsible("option", "collapsed", true );
	});
	//END - Packages page menu, not top menu	
});

// dining
$(document).on( "pageinit","#dining", function() {
	//Dining page menu, not top menu
	$("#diningpageNameMenuItem").on("click",function(){	
		$("#diningRestaurants").collapsible("option", "collapsed", true );
		$("#diningCulinarySuper").collapsible("option", "collapsed", true );
		$("#diningGastronomy").collapsible("option", "collapsed", true );
		$("#diningThemedDinner").collapsible("option", "collapsed", true );
		var position = $("#diningRestaurants").offset().top;
		$.mobile.silentScroll(position);		
	});
	//END - Dining page menu, not top menu	
});

// spa
$(document).on( "pageinit","#mogambosprings", function() {
	//Spa page menu, not top menu
	$("#spapageNameMenuItem").on("click",function(){	
		$("#spaTreatMents").collapsible("option", "collapsed", true );
		$("#spaLovingLife").collapsible("option", "collapsed", true );
		$("#spaIndugencePac").collapsible("option", "collapsed", true );
		$("#spaNailSalon").collapsible("option", "collapsed", true );
		var position = $("#spaTreatMents").offset().top;
		$.mobile.silentScroll(position);
	});
	//END - Spa page menu, not top menu	
});
// activities
$(document).on( "pageinit","#Activities", function() {
	//Activites page menu, not top menu
	$("#ActivipageNameMenuItem").on("click",function(){	
		$("#actTourExcurs").collapsible("option", "collapsed", true );
		$("#actDiveShop").collapsible("option", "collapsed", true );
		$("#actFunInSun").collapsible("option", "collapsed", true );
		$("#actIndorActiv").collapsible("option", "collapsed", true );
		$("#actGolfTennis").collapsible("option", "collapsed", true );
	});
	//END - Activities page menu, not top menu	
});
// contact us
$(document).on("pageinit","#contact", function() {
	//Contact us page menu, not top menu
	$("#contactNameMenuItem").on("click",function(){	
		$("#contactInfo").collapsible("option", "collapsed", true );
		$("#contactGuestComments").collapsible("option", "collapsed", true );
		$("#contactManagement").collapsible("option", "collapsed", true );
		$("#contactHistory").collapsible("option", "collapsed", true );
		$("#contactWorkWithUs").collapsible("option", "collapsed", true );
	});
	//END - Contact us page menu, not top menu	
});

/*
$(document).ready(function(){
	if (localStorage.AngNagTawagNiRoomPage == "homeReserveNow"){
		var position = $("#rmDiscountRates").offset().top;
		$.mobile.silentScroll(position);
		localStorage.AngNagTawagNiRoomPage="LeoGwapo";	
		//alert("ayo");
	};
});
*/