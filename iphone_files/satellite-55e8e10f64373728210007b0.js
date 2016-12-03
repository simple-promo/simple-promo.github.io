var isProductPage = /\/\w{2}-\w{2}\/product\//.test(location.pathname);
var isCategoryPage = /\/\w{2}-\w{2}\/category\//.test(location.pathname);

if(isProductPage){
  	if (_satellite.readCookie('findingMethod') != '' && _satellite.readCookie('findingMethod') != null) { 
      data_layer['findingMethod'] = $.cookie('findingMethod');
      _satellite.notify('Global: clear findingMethod cookie',1);
      $.cookie('findingMethod', '', { path: '/', domain: env.cookieDomain });
    }
  
	if(data_layer.findingMethod == null){
		var findingMethod = null;

		// Get a proper breakdown of the components of the referrer...
		var referrer = document.createElement('a'); referrer.href = document.referrer;

		// Organize some of this RegEx madness...
		var isHomeReferrer = (referrer.hostname == location.hostname && (referrer.pathname == '' || referrer.pathname == '/')) || /\/\w{2}-\w{2}\/home\.aspx/.test(referrer.pathname);
		var isSearchReferrer = /\/Search\/SearchResults\.aspx/.test(referrer.pathname);
		var isBrandReferrer = /Featured[^a-zA-Z]*Brands/.test(referrer.search);
		var isClearanceReferrer = /Clearance[^a-zA-Z]*Outlet/.test(referrer.search);
		var isRefurbishedReferrer = /Shops[^a-zA-Z]*Outlet/.test(referrer.search);
		var isEmailReferrer = referrer.hostname != location.hostname && typeof _satellite.QueryParams.caseInsensitive.eml == 'string';
    
		if(isHomeReferrer){
			findingMethod = 'home page promotion';
    }else if(isSearchReferrer){
			findingMethod = 'internal search';
    }else if(isBrandReferrer){
			findingMethod = 'brand page';
		}else if(isClearanceReferrer){
			findingMethod = 'clearance outlet page';
		}else if(isRefurbishedReferrer){
			findingMethod = 'refurbished outlet page';
		}else if(isEmailReferrer){
			findingMethod = 'email';
		}

		data_layer['findingMethod'] = findingMethod;
	}
}

if(typeof jQuery != 'undefined'){
  if(isCategoryPage){
    $(document).on('click', 'a[href*="/product/"]', function(){
      if(data_layer.breadcrumb3 == null){
        $.cookie('findingMethod', 'category page', { path: '/', domain: env.cookieDomain });
      }else{
        $.cookie('findingMethod', 'sub-category page', { path: '/', domain: env.cookieDomain });
      }
    });
  }

  $('.global-nav .sub-nav a[href*="/product/"]').on('click', function(){
    $.cookie('findingMethod', 'main navigation link', { path: '/', domain: env.cookieDomain });
  });

  $('#accessoriesWidget .product a[href*="/product/"]').on('click', function(){
    $.cookie('findingMethod', 'pdp also recommended', { path: '/', domain: env.cookieDomain });
  });

  $('#cart-accessories-popover .prod-info  a[href*="/product/"]').on('click', function(){
    $.cookie('findingMethod', 'cart recommended accessories', { path: '/', domain: env.cookieDomain });
  });
}
