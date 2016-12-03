_satellite.pushAsyncScript(function(event, target, $variables){
  if (_satellite.getVar('pageIdentifier') != 'Search Results') {
  $('a.button.navigation-search-button,.hdr-search button.btn-search').click(function() {
    $.cookie('dtmInternalSearch', true, { path: '/', domain: env.cookieDomain });
    if (_satellite.getVar('pageIdentifier') != 'Search Results') {
      $.cookie('recordingNonUsefulSearch', true, { path: '/', domain: env.cookieDomain });
    }
  });
}

});
