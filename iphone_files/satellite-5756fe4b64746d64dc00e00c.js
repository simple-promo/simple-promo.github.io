_satellite.pushAsyncScript(function(event, target, $variables){
  $.cookie('dtmIcmpClick', '', { path: '/', domain: env.cookieDomain });
$("a[href*='icmp=']").click(function() {
  $.cookie('dtmIcmpClick', 'true', { path: '/', domain: env.cookieDomain });
});
});
