_satellite.pushBlockingScript(function(event, target, $variables){
  /*
 * Best practice from global data events is to listen on the document: 
 * http://jquery.com/upgrade-guide/1.9/#ajax-events-should-be-attached-to-document
 */
if(typeof jQuery != 'undefined'){
  $(document).on('geo_response', function(ev, geo){
    data_layer['dthPostalCode'] = geo.get('shippingLocation').postalCode;
    data_layer['rpuPostalCode'] = geo.get('pickupLocation').postalCode;
    data_layer['mcfPostalCode'] = geo.get('shippingLocation').postalCode;

    _satellite.track('Global PostalCodeResponseData');
  });
}

});
