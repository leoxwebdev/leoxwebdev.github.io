function getHtmlData( pUrl ) {

	return $.ajax({
		cache: false,
		dataType: "HTML",
		type: "GET",
		url: pUrl
	//data: pData
	});
}

$( ".popupLink" ).on( "click", function( event ){

	event.preventDefault();

	var $thisElem = $( this ),
		popContainer = $thisElem.attr( "href" );

	if ( $( popContainer ).data( "loaded") ){

		showPopup( popContainer );

	} else {

		loadPopupData( $thisElem.data( "srcfile" ), popContainer );
	}
});

function loadPopupData( pUrl, pElemToPop ){

	getHtmlData( pUrl ).then( function ( htmlData ) {

		if ( htmlData.length ) {

			$( pElemToPop ).find(".popSudlanan").prepend( htmlData );

			$( pElemToPop ).data( "loaded", true );
			showPopup( pElemToPop );
		}
	},

		function (){ 
			alert( "Error Loading Data!" );
	}/*,
		function (){
			$( pElemToPop ).find("a.ui-btn").button().button("refresh");
		}*/
	);
}

function showPopup( pElemToPop ){

	$( pElemToPop ).popup( "open" );	
}