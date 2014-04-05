var wt = (function($, doc, socket) {
	
	var vistorId = getCookie('wt_vi') || createVisitorCookie();
	
	var browserInfo = {
		name : navigator.userAgent,
		version : navigator.appVersion,
		isMobile : isMobileBrowser(),
		language : navigator.language,
		cookieEnabled : navigator.cookieEnabled,
		javaEnabled : navigator.javaEnabled(),
		javascriptEnabled : true,
		height : window.innerHeight || doc.body.clientHeight || doc.body.offsetHeight,
		width : window.innerWidth || doc.body.clientWidth || doc.body.offsetWidth
	};

	function isMobileBrowser() {
		if (navigator.userAgent.match(/Android/i) || 
		navigator.userAgent.match(/webOS/i) || 
		navigator.userAgent.match(/iPhone/i) || 
		navigator.userAgent.match(/iPad/i) || 
		navigator.userAgent.match(/iPod/i) || 
		navigator.userAgent.match(/BlackBerry/i) || 
		navigator.userAgent.match(/Windows Phone/i)) {
			return true;
		} else {
			return false;
		}
	}
	
	var systemInfo = {
		// resolution
		// operating system	
		// language version
		// currency 
	};
	
	var URLInfo = {
		url: doc.location.href,
		pagename: doc.title || doc.location.href,
		referer: doc.referrer,
		hostname: doc.location.hostname
	};
	
	function createVisitorCookie() {
			var text = "";
    		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    		for( var i=0; i < 8; i++ )
        		text += possible.charAt(Math.floor(Math.random() * possible.length));
			var date = new Date;
			var visCookie = text+date;
			setCookie(wt_vid, visCookie, 1461);
			return visCookie;
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = doc.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
  			var c = ca[i].trim();
  			if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  		}
		return "";
	}
	
	function setCookie(cname,cvalue,exdays) {
		var d = new Date();
		d.setTime(d.getTime()+(exdays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}
	
	function getSessionIdentifier(visitExpirationTime) {
		// random generator for sessionID + jquery event listener for every kind of activity
		// Each activity resets the visitExpirationTime to it's default value
		// after visitExpirationTime elapses with no activity a new visit is counted
	}
	
	function track() {
		// build JSON object that will be transered to node
		
		var pageData = {
			b: browserInfo.name,
			bv: browserInfo.version,
			bm: browserInfo.isMobile,
			bl: browserInfo.language,
			bc: browserInfo.cookieEnabled,
			bj: browserInfo.javaEnabled,
			bjs: browserInfo.javascriptEnabled,
			bh: browserInfo.height,
			bw: browserInfo.width,
			url: URLInfo.url,
			pn: URLInfo.pagename,
			rf: URLInfo.referer,
			hn: URLInfo.hostname,
			vid: vistorId
		};
		
		return pageData;
	}
	
	
	function trackLinks() {
		// functionality to track links - use parameters (doTrack - true or false, options) to decide whether links should be tracked
		// on particular page. Pass options object to set additional settings - which of the links should be exit / download etc.
		
		trackLink = track();
		//trackLink.extend - enhance the data with link values + use socket to emit events
	}
	
	return {
		browserInfo : browserInfo,
		systemInfo : systemInfo,
		URLInfo : URLInfo,
		visitorId : visitorId,
		track : track,
		trackLinks: trackLinks
	};
	
})(jQuery, document, socket);
