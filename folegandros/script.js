console.log( Modernizr);

(function($) {
  
  $.fn.fontAdjust = function(options) {
    
    var defaults = {
      adjustUp: '#font-adjust-up',
      adjustDown: '#font-adjust-down',
      unit: 'px',
      increment: 1,
      maxSize: 26,
      minSize: 10,
      extras: {
        showSize: false,
        useRange: false
      }
    }
    
    var settings = $.extend(defaults, options);
    
    var $container = $(settings.adjustUp).parent();
    
    /* build font-size indicator */
    if (settings.extras.showSize) {
      var size = $('body').css("font-size");
      var $sizeEl = $('<span id="font-adjust-size"></span>');
      $container.prepend($sizeEl);
      $sizeEl.text(size);
    }
   
    /* increases size by increment */
    function changeSize( inc ) {
      
      size = parseInt( $('body').css("font-size") );
      
      if ( size >= settings.maxSize && inc > 0 || size <= settings.minSize && inc < 0 ) 
      {
         return; 
      }
      
      var newSize = (size + inc) + settings.unit;
      
      $('body').css({ fontSize: newSize });
      
     if ( settings.extras.showSize ) {    
         $sizeEl.text(newSize);
      } 
    }
    
    
    /* bind changeSize() to click */
    function clickChange() { 
       $(settings.adjustUp).click( function(e) {
          e.preventDefault();
          changeSize(settings.increment);
        });

       $(settings.adjustDown).click( function(e) {
          e.preventDefault();
          changeSize( - settings.increment);
        });
    }
    
    
    /* swap buttons for input and bind to change */
    function inputChange() {
      
      var $range = $('<input type="range" min="'+settings.minSize+'" max="'+settings.maxSize+'" value="">');
      
      $container.find('a').remove();
      $container.append($range);
      
      var prevVal = $range.val();
      $range.on( 'change', function() {

        var currentVal = $(this).val();    
        changeSize( currentVal - prevVal );
        prevVal = currentVal;
        
      }); 
    }
    
    
    if ( !settings.extras.useRange || !Modernizr.inputtypes.range ) {
      return clickChange();
    } else {
        return inputChange();
    }
 
  }
   
} (jQuery))


$(document).fontAdjust({
  extras: {
    showSize: true,
    useRange: true
  }
});