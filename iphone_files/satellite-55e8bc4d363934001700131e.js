/*
 * Best practice from global data events is to listen on the document: 
 * http://jquery.com/upgrade-guide/1.9/#ajax-events-should-be-attached-to-document
 */
if(typeof jQuery != 'undefined'){
  try {
		new dtm_stopwatch('pdp').start();
  } catch (e) {
     $.cookie('dtm_stopwatch_pdp_start', '', { path: '/', domain: env.cookieDomain });
  }
  $(document).on('pdp_availability', function(ev, availability){
    var stopwatch = new dtm_stopwatch('pdp');
    if (stopwatch.isRunning()) {
      stopwatch.stop();
      data_layer['dtmStopwatchLoadTime'] = stopwatch.getTime();
      _satellite.track('PDPAvailabilityLoadTime');
    }
    data_layer['prodAvailability'] = availability.shipping.status;
    data_layer['dthAvailability'] = availability.shipping.status;
    data_layer['rpuAvailability'] = availability.pickup.status;
    data_layer['dthPostalCode'] = geo.get('shippingLocation').postalCode;
    data_layer['rpuPostalCode'] = geo.get('pickupLocation').postalCode;
    data_layer['mcfPostalCode'] = geo.get('shippingLocation').postalCode;

    if(typeof availability.fastestLOS == 'object'){
      var currentDate = moment(availability.cheapestLOS.currentDate).startOf('day');
      var deliveryDate = moment(availability.cheapestLOS.deliveryDate).startOf('day');

      data_layer['daysToDeliver'].push(String(deliveryDate.diff(currentDate, 'days')));
    }else{
      data_layer['daysToDeliver'] = [];
    }
    
    // Defect 218649: Exclude Pre-orders from Days to deliver ( Should fire null ) 
    // For pre order SKUs - If the release date minus current date is less than 8 days then populate the Days to deliver value in evar20 else populate null
    if ( data_layer.dthAvailability == 'Preorder' && data_layer.dthDaysToDeliver > 8) {
      data_layer['daysToDeliver'] = [];
    }

    if(!availability.shipping.purchasable && !availability.pickup.purchasable){
      _satellite.track('PDP AvailabilityResponseData SoldOut');
    }else if(!availability.shipping.purchasable && availability.shipping.status.toLowerCase() != "instoreonly"){
      _satellite.track('PDP AvailabilityResponseData DTHSoldOut');
    }else if(!availability.pickup.purchasable && availability.pickup.status.toLowerCase() == "outofstock"){
      _satellite.track('PDP AvailabilityResponseData RPUSoldOut');
    }else if(data_layer['daysToDeliver'].length > 0){
      _satellite.track('PDP AvailabilityResponseData DaysToDeliver');
    }else{
      _satellite.track('PDP AvailabilityResponseData');
    }
  });
}
