$( "#confirmation" ).on( "pagecreate", function( event ) {

	function IpadalaNa(){
		
		//var sulod = $( "#Conf" ).html();
		var ConfirmationNum = document.getElementById( "ConfirmationNum" ).value;
		$.ajax({
			url: 'emailDayon.asp',
			type: 'POST', // GET is default
			data: {
				ConfNo: ConfirmationNum
				//ConfNo: ConfirmationNum
			}/*,
			success: function(msg) {
				alert('Data returned from PHP: ' + msg);
			},
			error: function(msg) {
				alert('AJAX request failed!' + msg);
			}*/
		});
	}
	IpadalaNa();
	// bind to the button with clickme ID
	$("#emailConf").click(function() {
		//console.log( $( "#Conf ").html() );	
		function SendEmail() {
			//document.form1.bodytext.value=document.all.confText.innerHTML;
			document.form1.bodytext.value="Test email";
			document.form1.submit();
		}
	});
	
	$( "#printConf" ).on( "click" , function( event ){
			$( '#Conf' ).print();
	});
});
