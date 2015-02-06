<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1"> 
<title>Plantation Bay Resort and Spa: My Reservation</title>
<link rel="Shortcut Icon" href="images/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" href="jqm145.css" />
<link rel="stylesheet" href="rlmj.css">
<script src="jq211.js"></script>
<script type="text/javascript" src="rlmj.js"></script>
<script type="text/javascript" src="rlmjPrint.js"></script>
<script src="jqm145.js"></script>
</head>
<body>
<!--My Reservation -->
<div data-role="page" id="confirmation">

	<div data-role="header">	
		<div class="headerwhole">
			<h1 class="pbayheadlogo">
				<img src="pbayImages/pbaylogo.png" alt="Logo - Plantation Bay Resort and Spa"/>
			</h1>
			<div class="linguahi">
				<ul class="langOptions action-bar clearfix">
					<li>Translate Page</li>
					<li><a href="http://plantationbay.com/english/" class="lang_link" data-ajax="false"><img src="images/flags/english.png" alt="" /><span class="langs"></span><span class="langtooltip">English</span></a></li>
					<li><a href="http://plantationbay.com/japanese/" class="lang_link" data-ajax="false"><img src="images/flags/japanese.png" alt="" /><span class="langs"></span><span class="langtooltip">Japanese</span></a></li>
					<li><a href="http://plantationbay.com/russian/" class="lang_link" data-ajax="false"><img src="images/flags/russian.png" alt="" /><span class="langs"></span><span class="langtooltip">Russian</span></a></li>
					<li><a href="http://plantationbay.com/english/" class="lang_link" data-ajax="false"><img src="images/flags/korean.png" alt="" /><span class="langs"></span><span class="langtooltip">Korean</span></a></li>
					<li><a href="http://plantationbay.com/english/" class="lang_link" data-ajax="false"><img src="images/flags/mandarin.png" alt="" /><span class="langs"></span><span class="langtooltip">Mandarin</span></a></li>
				</ul>
			</div>
			<img src="pbayImages/slogan.png" alt="Plantation Bay Slogan" class="pbayslogan" />	
			<a href="#SpanelMenu" class="MenuPanel ui-btn ui-btn-inline ui-btn-icon-right ui-icon-bars" data-rel="panel">MENU</a>   
			<section class="top-menus">
				<nav class="main" role="navigation">
					<a href="http://plantationbay.com/leox/index.html" data-ajax="false" data-role="button">HOME</a>
					<a href="http://plantationbay.com/leox/rooms.html" data-ajax="false" data-role="button">ROOMS</a>
					<a href="http://plantationbay.com/leox/packages.html" data-ajax="false" data-role="button">PACKAGES</a>
					<a href="http://plantationbay.com/leox/dining.html" data-ajax="false" data-role="button">DINING</a>
					<a href="http://plantationbay.com/leox/spa.html" data-ajax="false" data-role="button">SPA</a>
					<a href="http://plantationbay.com/leox/activities.html" data-ajax="false" data-role="button">ACTIVITIES</a>
					<a href="http://plantationbay.com/leox/images.html" data-ajax="false" data-role="button">IMAGES</a>
					<a href="http://plantationbay.com/leox/contact.html" data-ajax="false" data-role="button">CONTACT US</a>
					<a href="myreservation.html" data-ajax="false" data-role="button">MY RESERVATION</a>
				</nav>
			</section>
		</div>
	</div>	
	<div data-role="content">

		<table style="margin:0 auto;">
			<tr>
				<td  style="width:200px;"><input type="text" id="guestConf" name="guestConf" placeholder="Conf. number here!"></input></td>
				<td  style="width:50px;"><input type="button" id="goGetIt" value="Go!"></input></td>
			</tr>
		</table>

		<div id="Conf">
		
		</div>
		<!-- pop-up -->
		<div id="confirm" class="ui-content" data-role="popup" data-theme="none">
				<hr>
				<p id="question">Are you sure you want to re-send email to guest?</p>
				<div class="ui-grid-a">
					<div class="ui-block-a">
						<a id="yes" data-role="button" data-mini="true" data-shadow="false" data-theme="b" data-rel="back">Yes</a>
					</div>
					<div class="ui-block-b">
						<a id="cancel" data-role="button" data-mini="true" data-shadow="false" data-theme="b" data-rel="back">No</a>
					</div>
				</div>
			</div><!-- /popup -->
		<div style="max-width:200px;margin:0 auto; text-align:center;">
			<a id="printConf" href="#" data-role="button" data-inline="true" data-mini="true"> PRINT </a>
			<a id="emailConf" href="#" data-role="button" data-inline="true" data-mini="true"> RE-SEND CONFIMATION TO GUEST </a>
		</div>
	</div> <!-- end content -->
	
	
  <!-- end content --> 
	<div data-role="footer">
		<div class="iCenter">
			<a href="http://plantationbay.com/english/index.html" data-ajax="false" data-role="button">HOME</a>	
			<a href="http://plantationbay.com/english/rooms.html" data-ajax="false" data-role="button">ROOMS</a>	
			<a href="http://plantationbay.com/english/packages.html" data-ajax="false" data-role="button">PACKAGES</a>	
			<a href="http://plantationbay.com/english/dining.html" data-ajax="false" data-role="button">DINING</a>	
			<a href="http://plantationbay.com/english/spa.html" data-ajax="false" data-role="button">SPA</a>	
			<a href="http://plantationbay.com/english/activities.html" data-ajax="false" data-role="button">ACTIVITIES</a>	
			<a href="http://plantationbay.com/english/photogallery.html" data-ajax="false" data-role="button">GALLERY</a>	
			<a href="http://plantationbay.com/english/contact.html" data-ajax="false" data-role="button">CONTACT US</a>
			<a href="myreservation.html" data-ajax="false" data-role="button">MY RESERVATION</a>
		</div>	
		<div class="CopyRight">
			&copy;2014 <a href="http://plantationbay.com/english/index.html">Plantation Bay Resort and Spa</a>. All rights reserved.
			<a href="http://plantationbay.com/english/index.html" target="_blank">Design and development by Leox.</a>
		</div>
	</div>
</div>
<!-- end confirmation page --> 
<!-- PANEL MENU -->
<div data-role="panel" data-position="right" data-display="overlay" id="RESERVATIONpanelMenu" class="panelMenu">
	<div data-role="content">
	<ul data-role="listview" data-inset="true" >
		<li><a href="http://plantationbay.com/english/index.html" data-ajax="false" >HOME</a></li>		
		<li><a href="http://plantationbay.com/english/rooms.html" data-ajax="false" data-transition="slide" data-direction="forward">ROOMS</a></li>
		<li><a href="http://plantationbay.com/english/packages.html" data-ajax="false" data-transition="slide" data-direction="forward">PACKAGES</a></li>
		<li><a href="http://plantationbay.com/english/dining.html" data-ajax="false" data-transition="slide" data-direction="forward">DINING</a></li>
		<li><a href="http://plantationbay.com/english/spa.html" data-ajax="false" data-transition="slide" data-direction="forward">SPA</a></li>
		<li><a href="http://plantationbay.com/english/activities.html" data-ajax="false" data-transition="slide" data-direction="forward">ACTIVITIES</a></li>
		<li><a href="http://plantationbay.com/english/photogallery.html" data-ajax="false" data-transition="slide" data-direction="forward">PHOTO GALLERY</a></li>
		<li><a href="http://plantationbay.com/english/contact.html" data-ajax="false" data-transition="slide" data-direction="forward">CONTACT US</a></li>
		<li><a href="myreservation.html" data-ajax="false" data-transition="slide" data-direction="forward">MY RESERVATION</a></li>
		<li><a href="#" data-rel="close" data-icon="delete">HIDE/CLOSE</a></li>
		<!--<li><a href="directory.html"  data-ajax="false" >DIRECTORY OF SERVICES</a></li>-->
	</ul>
	</div>
</div>

<script type="text/javascript">
	$( "#goGetIt" ).on("click",function(){
		var confnum = document.getElementById( "guestConf" ).value;
			confnum = $.trim( confnum ).toUpperCase();
		if ( confnum.length == 11 ){
			$.ajax({
				url: "confirmCopy.php?ConfirmationNum="+ confnum
			}).done(function(data) { // data what is sent back by the php page
				$('#Conf').html(data); // display data
			});
		} else {
			alert("Invalid confirmation number")
		}
	});	
	
	$( "#printConf" ).on( "click" , function( event ){
			$( '#Conf' ).print();
	});
	
	$( "#emailConf" ).on( "click", function(){
		
		$( "#confirm" ).popup( "open" );
		
		// Unsa ang Tubag?
		$( "#confirm #yes" ).on( "click", function() {
			
			var ConfirmationNum = document.getElementById( "guestConf" ).value;
			ConfirmationNum = $.trim( ConfirmationNum ).toUpperCase();
			$.ajax({
				url: 'resendmail.asp',
				type: 'POST', // GET is default
				data: {
					ConfNo: ConfirmationNum
				}
			});
			
			//alert("Yes");
			$( "#confirm" ).popup( "close" );
			
		});
		
		// Remove active state and unbind when the cancel button is clicked
		$( "#confirm #cancel" ).on( "click", function() {
			//alert("No");
			$( "#confirm #yes" ).off();
		});
		
	});
	
</script>
</body>
</html>