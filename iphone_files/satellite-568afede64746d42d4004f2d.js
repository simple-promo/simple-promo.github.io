// Twitter
    window.twttr = (function (d, s, id) {
      var t, js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
      return window.twttr || (t = {
        _e: [],
        ready: function (f) {
          t._e.push(f)
        }
      });
    }(document, "script", "twitter-wjs"));

    var twEvtHndlr = setInterval(function(){
      if (twttr.events) {
        twttr.events.bind('click', function(event) {
          data_layer['clickAction'] = 'socialShare';
          data_layer['socialMediaAction'] = 'twitter|share';
          _satellite.track('PDP SocialShare');
        });
        clearInterval(twEvtHndlr);
      }
    }, 3000);

  // Facebook
    window.fbAsyncInit = function () {
      FB.init({ appId: 'your-app-id', cookie: true, xfbml: true, oauth: true });

      FB.Event.subscribe('edge.create', function(response) {
        data_layer['clickAction'] = 'socialShare';
        data_layer['socialMediaAction'] = 'facebook|like';
        _satellite.track('PDP SocialShare');
      });
    };

    (function(d){
      var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
      js = d.createElement('script'); js.id = id; js.async = true;
      js.src = "//connect.facebook.net/en_US/all.js";
      d.getElementsByTagName('head')[0].appendChild(js);
    }(document));

  // Pinterest
	if(typeof jQuery != 'undefined'){
    $(document).on('click', 'span.pinterest a', function() {
      data_layer['clickAction'] = 'socialShare';
      data_layer['socialMediaAction'] = 'pinterest|share';
      _satellite.track('PDP SocialShare');
    });
	}
  // GooglePlus
    var myConfObj = {
      iframeMouseOver : false
    }
    window.addEventListener('blur',function(e){
      if(myConfObj.iframeMouseOver){
        data_layer['clickAction'] = 'socialShare';
        data_layer['socialMediaAction'] = 'googleplus|share';
        _satellite.track('PDP SocialShare');
      }
    });

		if(typeof jQuery != 'undefined'){
      $('#social-media .gplusone').on('mouseover',function(){
        myConfObj.iframeMouseOver = true;
      });
      $('#social-media .gplusone').on('mouseout',function(){
        myConfObj.iframeMouseOver = false;
      });
    }
