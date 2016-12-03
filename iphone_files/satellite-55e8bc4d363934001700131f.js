_satellite.domReady(function(){
  if(typeof jQuery != 'undefined'){
    if($('.gallery-main').controller()){
      $('.gallery-main').controller().displayScroller.options.onScrollEnd = function(){
        var itemType = $('.pdp-gallery-content-item.selected').data('type');

        if(itemType != 'spin'){
          data_layer['clickAction'] = 'gallery';
        }else{
          data_layer['clickAction'] = 'threeSixty';
        }

        data_layer['itemType'] = itemType;

        _satellite.track('PDP GalleryCarouselItem Mobile');
      }
    }
  }
});
