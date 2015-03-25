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

// Generic asynchronous cache function
$.createCache = function( requestFunction ){
	var cache = {};
	return function( key, callback ) {
		if ( !cache[ key ] ) {
			cache[ key ] = $.Deferred( function( defer ) {
				requestFunction( defer, key );
			}).promise();
		}
		return cache[ key ].done( callback );
	};
};

//Make sure the same image is not loaded multiple times function, using generic asyncronous caache func. :)
$.loadImage = $.createCache(function( defer, url ){
	var image = new Image();
	function cleanUp() { 
		image.onload = image.onerror = null; 
	}
	defer.then( cleanUp, cleanUp );
	image.onload = function() {
		defer.resolve( url );
	};
	image.onerror = defer.reject;
	image.src = url;
});