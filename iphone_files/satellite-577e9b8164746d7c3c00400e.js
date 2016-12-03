_satellite.pushAsyncScript(function(event, target, $variables){
  var firstPDPMilestoneRecording = $.cookie('firstPDPMilestoneRecording')||'';

if (firstPDPMilestoneRecording == '') {
  if (_satellite.getVar('pageIdentifier') == 'Home') {
    $.cookie('firstPDPMilestoneRecording', new Date().getTime(), { path: '/', domain: env.cookieDomain });
  } else {
    $.cookie('firstPDPMilestoneRecording', 'NA', { path: '/', domain: env.cookieDomain });
    $.cookie('firstPDPMilestone', 'NA', { path: '/', domain: env.cookieDomain });
  }
}

});
