$(document).ready(function() {
  
  var $imageBoxSlide = $("#imageBox .image-slideshow"),
      $images = $("#imgList").find("a"),
      $slidingImage = $( "#imageBox" ).find("img");

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
  
  //$( '.homebackground' ).hide();

  //rollDayon(); //Animate na. Home background animation: Easy lang :)

  $( window ).resize( function ( event ) {

    event.preventDefault();
    updateSlidingImagePath(); 
  } );  
  

  $imageBoxSlide
  .cycle({
    autoHeight: 0,
    autoHeightSpeed: 1000,
    speed: 1000,
    timeout: 4000
    /*pauseOnHover: true*/
  });
  
  $images.first().addClass("active");
  
  $images.on("click", function(e) {
    var image = $(this).data("image"),
        imageIndex = $imageBoxSlide.find("[data-image='" + image + "']").index();

    if (imageIndex !== 0 ){
      imageIndex = imageIndex - 1; /* ????? */
    }
    $imageBoxSlide.cycle("goto", imageIndex);
  });
  
  $imageBoxSlide.on("cycle-before", function(e, options, outgoing, incoming) {
           
    var currentImage = $(incoming).data("image");
    $images.removeClass("active");
    $images.filter("[data-image='" + currentImage + "']").addClass("active");
    $("#imgCaption").find("p").html($(incoming).data("caption"));
  });
  
});
