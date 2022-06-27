//<script>
/**
 *  Open Source Social Network
 *
 * @package   (openteknik.com).ossn
 * @author    OSSN Core Team <info@openteknik.com>
 * @copyright (C) OpenTeknik LLC
 * @license   Open Source Social Network License (OSSN LICENSE)  http://www.opensource-socialnetwork.org/licence
 * @link      https://www.opensource-socialnetwork.org/
 */
var Ossn = Ossn || {};
Ossn.Startups = new Array();
Ossn.hooks = new Array();
Ossn.events = new Array();
/**
 * Register a startup function
 *
 * @return void
 */
Ossn.RegisterStartupFunction = function($func) {
	Ossn.Startups.push($func);
};
/**
 * Click on element
 *
 * @param $elem = element;
 *
 * @return void
 */
Ossn.Clk = function($elem) {
	$($elem).trigger('click');
};
/**
 * Ossn.str_replace
 * 
 * Replace all occurrences of the search string with the replacement string
 * See https://www.php.net/manual/en/function.str-replace.php
 *
 * @author original by https://locutus.io/php/str_replace/
 * 
 * @param string  search   The value being searched for, otherwise known as the needle. An array may be used to designate multiple needles.
 * @param string  replace  The replacement value that replaces found search values. An array may be used to designate multiple replacements.
 * @param string  subject  The string or array being searched and replaced on, otherwise known as the haystack.
 * @param integer countObj If passed, this will be set to the number of replacements performed.
 *
 * @return boolean
 */
Ossn.str_replace = function(search, replace, subject, countObj){
	var i = 0
	var j = 0
	var temp = ''
	var repl = ''
	var sl = 0
	var fl = 0
	var f = [].concat(search)
	var r = [].concat(replace)
	var s = subject
	var ra = Object.prototype.toString.call(r) === '[object Array]'
	var sa = Object.prototype.toString.call(s) === '[object Array]'
	s = [].concat(s)

	var $global = (typeof window !== 'undefined' ? window : global)
	$global.$locutus = $global.$locutus || {}
	var $locutus = $global.$locutus
	$locutus.php = $locutus.php || {}

	if (typeof(search) === 'object' && typeof(replace) === 'string') {
		temp = replace
		replace = []
		for (i = 0; i < search.length; i += 1) {
			replace[i] = temp
		}
		temp = ''
		r = [].concat(replace)
		ra = Object.prototype.toString.call(r) === '[object Array]'
	}

	if (typeof countObj !== 'undefined') {
		countObj.value = 0
	}

	for (i = 0, sl = s.length; i < sl; i++) {
		if (s[i] === '') {
			continue
		}
		for (j = 0, fl = f.length; j < fl; j++) {
			temp = s[i] + ''
			repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0]
			s[i] = (temp).split(f[j]).join(repl)
			if (typeof countObj !== 'undefined') {
				countObj.value += ((temp.split(f[j])).length - 1)
			}
		}
	}
	return sa ? s : s[0];
};
/**
 * Redirect user to other page
 *
 * @param $url path
 *
 * @return void
 */
Ossn.redirect = function($url) {
	window.location = Ossn.site_url + $url;
};
/**
 * Get url paramter
 *
 * @param name Parameter name;
 * @param url complete url
 *
 * @return string
 */
Ossn.UrlParams = function(name, url) {
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
	if (!results) {
		return 0;
	}
	return results[1] || 0;
};
/**
 * Returns an object with key/values of the parsed query string.
 *
 * @param  {String} string The string to parse
 * @return {Object} The parsed object string
 */
Ossn.ParseStr = function(string) {
	var params = {},
		result,
		key,
		value,
		re = /([^&=]+)=?([^&]*)/g,
		re2 = /\[\]$/;

	while (result = re.exec(string)) {
		key = decodeURIComponent(result[1].replace(/\+/g, ' '));
		value = decodeURIComponent(result[2].replace(/\+/g, ' '));

		if (re2.test(key)) {
			key = key.replace(re2, '');
			if (!params[key]) {
				params[key] = [];
			}
			params[key].push(value);
		} else {
			params[key] = value;
		}
	}

	return params;
};
/**
 * Parse a URL into its parts. Mimicks http://php.net/parse_url
 *
 * @param {String} url       The URL to parse
 * @param {Int}    component A component to return
 * @param {Bool}   expand    Expand the query into an object? Else it's a string.
 *
 * @return {Object} The parsed URL
 */
Ossn.ParseUrl = function(url, component, expand) {
	// Adapted from http://blog.stevenlevithan.com/archives/parseuri
	// which was release under the MIT
	// It was modified to fix mailto: and javascript: support.
	expand = expand || false;
	component = component || false;

	var re_str =
		// scheme (and user@ testing)
		'^(?:(?![^:@]+:[^:@/]*@)([^:/?#.]+):)?(?://)?'

		// possibly a user[:password]@
		+ '((?:(([^:@]*)(?::([^:@]*))?)?@)?'
		// host and port
		+ '([^:/?#]*)(?::(\\d*))?)'
		// path
		+ '(((/(?:[^?#](?![^?#/]*\\.[^?#/.]+(?:[?#]|$)))*/?)?([^?#/]*))'
		// query string
		+ '(?:\\?([^#]*))?'
		// fragment
		+ '(?:#(.*))?)',
		keys = {
			1: "scheme",
			4: "user",
			5: "pass",
			6: "host",
			7: "port",
			9: "path",
			12: "query",
			13: "fragment"
		},
		results = {};

	if (url.indexOf('mailto:') === 0) {
		results['scheme'] = 'mailto';
		results['path'] = url.replace('mailto:', '');
		return results;
	}

	if (url.indexOf('javascript:') === 0) {
		results['scheme'] = 'javascript';
		results['path'] = url.replace('javascript:', '');
		return results;
	}

	var re = new RegExp(re_str);
	var matches = re.exec(url);

	for (var i in keys) {
		if (matches[i]) {
			results[keys[i]] = matches[i];
		}
	}

	if (expand && typeof(results['query']) != 'undefined') {
		results['query'] = Ossn.ParseStr(results['query']);
	}

	if (component) {
		if (typeof(results[component]) != 'undefined') {
			return results[component];
		} else {
			return false;
		}
	}
	return results;
};
/**
 * Ossn.isset
 * 
 * Checks if the variable isset or not
 * 
 * @param int|bool|func|object $variable Any variable
 * 
 * @return boolean
 */
Ossn.isset = function($variable){
	if(typeof $variable !== 'undefined'){
		return true;
	}
	return false;
};
/**
 * Ossn.call_user_func_array
 * 
 * Checks if the variable isset or not
 * See https://www.php.net/manual/en/function.call-user-func-array.php
 *
 * @author original by Thiago Mata (https://thiagomata.blog.com)
 * @author original by revised by: Jon Hohle
 * @author original byimproved by: Brett Zamir (https://brett-zamir.me)
 * @author original byimproved by: Diplom@t (https://difane.com/)
 * @author original byimproved by: Brett Zamir (https://brett-zamir.me)
 * 
 * @param string 	cb		A callback function
 * @param array|object  parameters	A option values
 * 
 * @return mixed
 */
Ossn.call_user_func_array = function(cb, parameters){
	var $global = (typeof window !== 'undefined' ? window : global)
	var func
	var scope = null

	var validJSFunctionNamePattern = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;

	if(typeof cb === 'string'){
		if(typeof $global[cb] === 'function'){
			func = $global[cb]
		} else if(cb.match(validJSFunctionNamePattern)){
			func = (new Function(null, 'return ' + cb)()) // eslint-disable-line no-new-func
		}
	} else if(Object.prototype.toString.call(cb) === '[object Array]'){
		if(typeof cb[0] === 'string'){
			if(cb[0].match(validJSFunctionNamePattern)){
				func = eval(cb[0] + "['" + cb[1] + "']") // eslint-disable-line no-eval
			}
		} else {
			func = cb[0][cb[1]]
		}

		if(typeof cb[0] === 'string'){
			if(typeof $global[cb[0]] === 'function'){
				scope = $global[cb[0]]
			} else if(cb[0].match(validJSFunctionNamePattern)){
				scope = eval(cb[0]) // eslint-disable-line no-eval
			}
		} else if(typeof cb[0] === 'object'){
			scope = cb[0]
		}
	} else if(typeof cb === 'function'){
		func = cb
	}

	if(typeof func !== 'function'){
		throw new Error(func + ' is not a valid function')
	}

	return func.apply(scope, parameters)
};
/**
 * Ossn.is_callable
 * 
 * Checks if the variable isset or not
 * See https://www.php.net/manual/en/function.is-callable.php
 *
 * @author original by Thiago Mata (https://thiagomata.blog.com)
 * @author original by revised by: Jon Hohle
 * @author original byimproved by: Brett Zamir (https://brett-zamir.me)
 * @author original byimproved by: Diplom@t (https://difane.com/)
 * @author original byimproved by: Brett Zamir (https://brett-zamir.me)
 * 
 * @param variable|function 	mixedVar 	A function or callback name
 * @param boolean             	syntaxOnly 	If set to TRUE the function only verifies that var might be a function or method. It will only reject simple variables that are not strings, or an array that does not have a valid structure to be used as a callback. The valid ones are supposed to have only 2 entries, the first of which is an object or a string, and the second a string.
 *
 * @return boolean
 */
Ossn.is_callable = function(mixedVar, syntaxOnly, callableName){
	var $global = (typeof window !== 'undefined' ? window : global)

	var validJSFunctionNamePattern = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;

	var name = ''
	var obj = {}
	var method = ''
	var validFunctionName = false

	var getFuncName = function(fn){
		var name = (/\W*function\s+([\w$]+)\s*\(/).exec(fn)
		if(!name){
			return '(Anonymous)'
		}
		return name[1]
	}

	// eslint-disable-next-line no-useless-escape
	if(/(^class|\(this\,)/.test(mixedVar.toString())){
		return false
	}

	if(typeof mixedVar === 'string'){
		obj = $global
		method = mixedVar
		name = mixedVar
		validFunctionName = !!name.match(validJSFunctionNamePattern)
	} else if(typeof mixedVar === 'function'){
		return true
	} else if(Object.prototype.toString.call(mixedVar) === '[object Array]' &&
		mixedVar.length === 2 &&
		typeof mixedVar[0] === 'object' &&
		typeof mixedVar[1] === 'string'){
		obj = mixedVar[0]
		method = mixedVar[1]
		name = (obj.constructor && getFuncName(obj.constructor)) + '::' + method
	}

	if(syntaxOnly || typeof obj[method] === 'function'){
		if(callableName){
			$global[callableName] = name
		}
		return true
	}

	if(validFunctionName && typeof eval(method) === 'function'){ // eslint-disable-line no-eval
		if(callableName){
			$global[callableName] = name
		}
		return true
	}

	return false
}
/**
 * Check if hook exists or not
 *
 * @param string $hook 	The name of the hook
 * @param string $type 	The type of the hook
 *
 * @return boolean
 */
Ossn.is_hook = function($hook, $type){
	if(Ossn.hooks[$hook] && Ossn.hooks[$hook][$type]){
		return true;
	}
	return false;
}
/**
 * Unset a hook to system, hooks are usefull for callback returns
 *
 * @param string	$hook		The name of the hook
 * @param string	$type		The type of the hook
 * @param callable	$callback	The name of a valid function or an array with object and method
 *
 * @return boolean
 */
Ossn.unset_hook = function($hook, $type, $callback){
	if($hook == '' || $type == '' || $callback == ''){
		return false;
	}
	if(Ossn.is_hook($hook, $type)){
		for (i = 0; i <= Ossn.hooks[$hook][$type].length; i++){
			if(Ossn.isset(Ossn.hooks[$hook][$type][i])){
				if(Ossn.isset(Ossn.hooks[$hook][$type][i].hook)){
					if(Ossn.hooks[$hook][$type][i].hook == $callback){
						Ossn.hooks[$hook][$type].splice(i, 1);
						break;
					}
				}
			}
		}
	}
};
/**
 * Add a hook to system, hooks are usefull for callback returns
 *
 * @param string	$hook		The name of the hook
 * @param string	$type		The type of the hook
 * @param callable 	$callback	The name of a valid function or an array with object and method
 * @param int		$priority	The priority - 200 is default, lower numbers called first
 *
 * @return boolean
 */
Ossn.add_hook = function($hook, $type, $callback, $priority = 200){
	if($hook == '' || $type == ''){
		return false;
	}
	if(!Ossn.isset(Ossn.hooks)){
		Ossn.hooks = new Array();
	}
	if(!Ossn.isset(Ossn.hooks[$hook])){
		Ossn.hooks[$hook] = new Array();
	}
	if(!Ossn.isset(Ossn.hooks[$hook][$type])){
		Ossn.hooks[$hook][$type] = new Array();
	}
	if(!Ossn.is_callable($callback, true)){
		return false;
	}

	$priority = Math.max(parseInt($priority), 0);
	Ossn.hooks[$hook][$type].push({
		'hook': $callback,
		'priority': $priority,
	});
	return true;
};
/**
 * Call a hook
 *
 * @param string	$hook		The name of the hook
 * @param string	$type		The type of the hook
 * @param array|object  $params		Additional parameters to pass to the handlers
 * @param mixed		$returnvalue 	An initial return value
 *
 * @return mixed
 */
Ossn.call_hook = function($hook, $type, $params = null, $returnvalue = null){
	$hooks = new Array();
	hookspush = Array.prototype.push

	if(Ossn.isset(Ossn.hooks[$hook]) && Ossn.isset(Ossn.hooks[$hook][$type])){
		hookspush.apply($hooks, Ossn.hooks[$hook][$type]);
	}
	$hooks.sort(function(a, b){
		if(a.priority < b.priority){
			return -1;
		}
		if(a.priority > b.priority){
			return 1;
		}
		return (a.index < b.index) ? -1 : 1;
	});
	$.each($hooks, function(index, $item){
		$value = Ossn.call_user_func_array($item.hook, [$hook, $type, $returnvalue, $params]);
		if(Ossn.isset($value)){
			$returnvalue = $value;
		}
	});
	return $returnvalue;
};
/**
 * Check if callback exists or not
 *
 * @param string $callback 	The name of the callback
 * @param string $type 	The type of the callback
 *
 * @return boolean
 */
Ossn.is_callback = function($event, $type){
	if(Ossn.isset(Ossn.events[$event][$type])){
		return true;
	}
	return false;
}
/**
 * Add a callback to system, callbacks are usefull for do something when some event occurs
 *
 * @param string	$event		The name of the callback
 * @param string	$type		The type of the callback
 * @param callable 	$callback	The name of a valid function
 * @param int		$priority	The priority - 200 is default, lower numbers called first
 *
 * @return boolean
 */
Ossn.register_callback = function($event, $type, $callback, $priority = 200){
	if($event == '' || $type == ''){
		return false;
	}
	if(!Ossn.isset(Ossn.events)){
		Ossn.events = new Array();
	}
	if(!Ossn.isset(Ossn.events[$event])){
		Ossn.events[$event] = new Array();
	}
	if(!Ossn.isset(Ossn.events[$event][$type])){
		Ossn.events[$event][$type] = new Array();
	}
	if(!Ossn.is_callable($callback, true)){
		return false;
	}
	$priority = Math.max(parseInt($priority), 0);
	Ossn.events[$event][$type].push({
		'callback': $callback,
		'priority': $priority,
	});
	return true;
};
/**
 * Unset a event callback to system
 *
 * @param string 	$event		The name of the callback
 * @param string	$type		The type of the callback
 * @param callable	$callback	The name of a valid function
 *
 * @return boolean
 */
Ossn.unset_callback = function($event, $type, $callback){
	if($event == '' || $type == '' || $callback == ''){
		return false;
	}
	if(Ossn.is_callback($event, $type)){
		for (i = 0; i <= Ossn.events[$event][$type].length; i++){
			if(Ossn.isset(Ossn.events[$event][$type][i])){
				if(Ossn.isset(Ossn.events[$event][$type][i].callback)){
					if(Ossn.events[$event][$type][i].callback == $callback){
						Ossn.events[$event][$type].splice(i, 1);
						break;
					}
				}
			}
		}
	}
};
/**
 * Trigger a callback
 *
 * @param string	$callback	The name of the callback
 * @param string	$type		The type of the callback
 * @param array|object  $params		Additional parameters to pass to the handlers
 * @param mixed		$returnvalue 	An initial return value
 *
 * @return mixed
 */
Ossn.trigger_callback = function($event, $type, $params = null){
	$events = new Array();
	eventspush = Array.prototype.push

	if(Ossn.isset(Ossn.events[$event]) && Ossn.isset(Ossn.events[$event][$type])){
		eventspush.apply($events, Ossn.events[$event][$type]);
	} else {
		return false;
	}
	$events.sort(function(a, b){
		if(a.priority < b.priority){
			return -1;
		}
		if(a.priority > b.priority){
			return 1;
		}
		return (a.index < b.index) ? -1 : 1;
	});
	$tempvalue = null;
	$.each($events, function(index, $item){
		if(Ossn.is_callable($item.callback) && (Ossn.call_user_func_array($item.callback, [$event, $type, $params]) == false)){
			return false;
		}
	});
	return true;
};
//<script>
/**
 * RawCookie setrawcookie — Send a cookie without urlencoding the cookie value
 * https://www.php.net/manual/en/function.setrawcookie.php
 *
 * @param name Key name
 * @param value cookie value
 * @param epxires Date object
 * @param path The path on the server in which the cookie will be available on. If set to '/', the cookie will be available within the entire domain.
 * @param domain The domain hostname if not specified it will be current hostname 
 * @param secure Indicates that the cookie should only be transmitted over a secure HTTPS connection from the client. When set to true, the cookie will only be set if a secure connection exists.
 * 
 * @return boolean
 */
Ossn.setrawcookie = function(name, value, expires, path, domain, secure) {
	if (typeof expires === 'string' && (/^\d+$/).test(expires)) {
		expires = parseInt(expires, 10)
	}

	if (expires instanceof Date) {
		expires = expires.toUTCString()
	} else if (typeof expires === 'number') {
		expires = (new Date(expires * 1e3))
			.toUTCString()
	}

	var r = [name + '=' + value],
		s = {},
		i = ''
	s = {
		expires: expires,
		path: path,
		domain: domain
	}
	for (i in s) {
		if (s.hasOwnProperty(i)) {
			// Exclude items on Object.prototype
			s[i] && r.push(i + '=' + s[i])
		}
	}

	return secure && r.push('secure'), window.document.cookie = r.join(';'), true
};

/**
 * setcookie — Send a cookie
 * https://www.php.net/manual/en/function.setcookie.php
 *
 * @param name Key name
 * @param value cookie value
 * @param epxires Date object
 * @param path The path on the server in which the cookie will be available on. If set to '/', the cookie will be available within the entire domain.
 * @param domain The domain hostname if not specified it will be current hostname 
 * @param secure Indicates that the cookie should only be transmitted over a secure HTTPS connection from the client. When set to true, the cookie will only be set if a secure connection exists.
 * 
 * @return boolean
 */
Ossn.setCookie = function(name, value, expires, path, domain, secure) {
	//https://github.com/locutusjs/locutus/
	//Ossn.setcookie('Key', 'Value');
	return Ossn.setrawcookie(name, encodeURIComponent(value), expires, path, domain, secure)
};

/**
 * getCookie
 *
 * @param name Key name
 * 
 * @return mixed
 */
Ossn.getCookie = function(name) {
	// original by: http://www.quirksmode.org/js/cookies.html
	// example 1: var $myVar = Ossn.getCookie('test');
	var i = 0,
		c = '',
		nameEQ = name + '=',
		ca = document.cookie.split(';'),
		cal = ca.length;
	for (i = 0; i < cal; i++) {
		c = ca[i].replace(/^ */, '');
		if (c.indexOf(nameEQ) === 0) {
			return decodeURIComponent(c.slice(nameEQ.length).replace(/\+/g, '%20'));
		}
	}
	return null;
};//<script>
/**
 * Register a ajax request
 *
 * @param $datap['form'] = form id
 * @param $datap['callback'] = call back function
 * @param $datap['error'] = on error function
 * @param $datap['beforeSend'] = before send function
 * @param $datap['url'] = form action url
 *
 * @return bool
 */
Ossn.ajaxRequest = function($datap){
    $(function(){
		
        var $form_name = $datap['form'];
        $('body').on("submit", $form_name, function(event){
													
			var $data = Ossn.call_hook('ajax', 'request:settings', null, $datap);	
        	var url = $data['url'];
        	var callback = $data['callback'];
        	var error = $data['error'];
       	 	var befsend = $data['beforeSend'];
        	var action = $data['action'];
        	var containMedia = $data['containMedia'];
        	var $xhr = $data['xhr'];
			
        	if(url == true){
            	url = $($form_name).attr('action');
        	}
            event.preventDefault();
            event.stopImmediatePropagation();

            if(!callback){
                return false;
            }
            if(!befsend){
                befsend = function(){}
            }
            if(!action){
                action = false;
            }
            if(action == true){
                url = Ossn.AddTokenToUrl(url);
            }

            if(!error){
                error = function(xhr, status, error){
                    if(error == 'Internal Server Error' || error !== ''){
                        Ossn.MessageBox('syserror/unknown');
                    }
                };
            }
            if(!$xhr){
                $xhr = function(){
                    var xhr = new window.XMLHttpRequest();
                    return xhr;
                };
            }
            var $form = $(this);
            if(containMedia == true){
                $requestData = new FormData($form[0]);
                $removeNullFile = function(formData){
                    if(formData.keys){
                        for (var key of formData.keys()){
                            var fileName = null || formData.get(key)['name'];
                            var fileSize = null || formData.get(key)['size'];
                            if(fileName != null && fileSize != null && fileName == '' && fileSize == 0){
                                formData.delete(key);
                            }
                        }
                    }
                };
                //Some Iphone devices unable to post #1295
                $removeNullFile($requestData);
                $vars = {
                    xhr: $xhr,
                    async: true,
                    cache: false,
                    contentType: false,
                    type: 'post',
                    beforeSend: befsend,
                    url: url,
                    error: error,
                    data: $requestData,
                    processData: false,
                    success: callback,
                };
            } else {
                $vars = {
                    xhr: $xhr,
                    async: true,
                    type: 'post',
                    beforeSend: befsend,
                    url: url,
                    error: error,
                    data: $form.serialize(),
                    success: callback,
                };
            }
			//[E] Return xhr object on post and ajaxrequest #1909
            return $.ajax($vars);
        });
    });
};
/**
 * Register a post request
 *
 * @param $datap['callback'] = call back function
 * @param $datap['error'] = on error function
 * @param $datap['beforeSend'] = before send function
 * @param $datap['url'] = form action url
 *
 * @return bool
 */
Ossn.PostRequest = function($datap){
	var $data = Ossn.call_hook('ajax:post', 'request:settings', null, $datap);
	var url = $data['url'];
	var callback = $data['callback'];
	var error = $data['error'];

	var befsend = $data['beforeSend'];
	var $fdata = $data['params'];
	var async = $data['async'];
	var action = $data['action'];
	var $xhr = $data['xhr'];
	if(!callback){
		return false;
	}
	if(!befsend){
		befsend = function(){}
	}
	if(typeof async === 'undefined'){
		async = true;
	}
	if(!action){
		action = true;
	}
	if(action == true){
		url = Ossn.AddTokenToUrl(url);
	}
	if(!error){
		error = function(){};
	}
	if(!$xhr){
		$xhr = function(){
			var xhr = new window.XMLHttpRequest();
			return xhr;
		};
	}
	//[E] Return xhr object on post and ajaxrequest #1909
	return $.ajax({
		xhr: $xhr,
		async: async,
		type: 'post',
		beforeSend: befsend,
		url: url,
		error: error,
		data: $fdata,
		success: callback,
	});
};//<script>
/**
 * Add action token to url
 *
 * @param string data Full complete url
 */
Ossn.AddTokenToUrl = function(data) {
	// 'http://example.com?data=sofar'
	if (typeof data === 'string') {
		// is this a full URL, relative URL, or just the query string?
		var parts = Ossn.ParseUrl(data),
			args = {},
			base = '';

		if (parts['host'] === undefined) {
			if (data.indexOf('?') === 0) {
				// query string
				base = '?';
				args = Ossn.ParseStr(parts['query']);
			}
		} else {
			// full or relative URL
			if (parts['query'] !== undefined) {
				// with query string
				args = Ossn.ParseStr(parts['query']);
			}
			var split = data.split('?');
			base = split[0] + '?';
		}
		args["ossn_ts"] = Ossn.Config.token.ossn_ts;
		args["ossn_token"] = Ossn.Config.token.ossn_token;

		return base + jQuery.param(args);
	}
};//<script>
/**
 * sprintf() for JavaScript 0.7-beta1
 * http://www.diveintojavascript.com/projects/javascript-sprintf
 */
var sprintf = (function() {
	function get_type(variable) {
		return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
	}

	function str_repeat(input, multiplier) {
		for (var output = []; multiplier > 0; output[--multiplier] = input) { /* do nothing */ }
		return output.join('');
	}

	var str_format = function() {
		if (!str_format.cache.hasOwnProperty(arguments[0])) {
			str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
		}
		return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
	};

	str_format.format = function(parse_tree, argv) {
		var cursor = 1,
			tree_length = parse_tree.length,
			node_type = '',
			arg, output = [],
			i, k, match, pad, pad_character, pad_length;
		for (i = 0; i < tree_length; i++) {
			node_type = get_type(parse_tree[i]);
			if (node_type === 'string') {
				output.push(parse_tree[i]);
			} else if (node_type === 'array') {
				match = parse_tree[i]; // convenience purposes only
				if (match[2]) { // keyword argument
					arg = argv[cursor];
					for (k = 0; k < match[2].length; k++) {
						if (!arg.hasOwnProperty(match[2][k])) {
							throw (sprintf('[sprintf] property "%s" does not exist', match[2][k]));
						}
						arg = arg[match[2][k]];
					}
				} else if (match[1]) { // positional argument (explicit)
					arg = argv[match[1]];
				} else { // positional argument (implicit)
					arg = argv[cursor++];
				}

				if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
					throw (sprintf('[sprintf] expecting number but found %s', get_type(arg)));
				}
				switch (match[8]) {
					case 'b':
						arg = arg.toString(2);
						break;
					case 'c':
						arg = String.fromCharCode(arg);
						break;
					case 'd':
						arg = parseInt(arg, 10);
						break;
					case 'e':
						arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential();
						break;
					case 'f':
						arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg);
						break;
					case 'o':
						arg = arg.toString(8);
						break;
					case 's':
						arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg);
						break;
					case 'u':
						arg = Math.abs(arg);
						break;
					case 'x':
						arg = arg.toString(16);
						break;
					case 'X':
						arg = arg.toString(16).toUpperCase();
						break;
				}
				arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+' + arg : arg);
				pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
				pad_length = match[6] - String(arg).length;
				pad = match[6] ? str_repeat(pad_character, pad_length) : '';
				output.push(match[5] ? arg + pad : pad + arg);
			}
		}
		return output.join('');
	};

	str_format.cache = {};

	str_format.parse = function(fmt) {
		var _fmt = fmt,
			match = [],
			parse_tree = [],
			arg_names = 0;
		while (_fmt) {
			if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
				parse_tree.push(match[0]);
			} else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
				parse_tree.push('%');
			} else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
				if (match[2]) {
					arg_names |= 1;
					var field_list = [],
						replacement_field = match[2],
						field_match = [];
					if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
						field_list.push(field_match[1]);
						while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
							if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							} else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							} else {
								throw ('[sprintf] huh?');
							}
						}
					} else {
						throw ('[sprintf] huh?');
					}
					match[2] = field_list;
				} else {
					arg_names |= 2;
				}
				if (arg_names === 3) {
					throw ('[sprintf] mixing positional and named placeholders is not (yet) supported');
				}
				parse_tree.push(match);
			} else {
				throw ('[sprintf] huh?');
			}
			_fmt = _fmt.substring(match[0].length);
		}
		return parse_tree;
	};

	return str_format;
})();

var vsprintf = function(fmt, argv) {
	argv.unshift(fmt);
	return sprintf.apply(null, argv);
};
/**
 * Ossn Print
 * Print a langauge string
 */
Ossn.Print = function(str, args) {
	if (OssnLocale[str]) {
		if (!args) {
			return OssnLocale[str];
		} else {
			return vsprintf(OssnLocale[str], args);
		}
	}
	return str;
};
/**
 * Check if the language string is avaialble or not
 *
 * @return boolean
 */
Ossn.isLangString = function(str, args) {
	if (OssnLocale[str]) {
		return true;
	}
	return false;
};//<script>
/**
 * Close a Ossn message box
 *
 * @return void
 */
Ossn.MessageBoxClose = function() {
	$('.ossn-message-box').hide();
	$('.ossn-halt').removeClass('ossn-light').hide();
	$('.ossn-halt').attr('style', '');

};
/**
 * Load Message box
 *
 * @return void
 */
Ossn.MessageBox = function($url) {
	Ossn.PostRequest({
		url: Ossn.site_url + $url,
		beforeSend: function() {
			$('.ossn-halt').addClass('ossn-light');
			$('.ossn-halt').attr('style', 'height:' + $(document).height() + 'px;');
			$('.ossn-halt').show();
			$('.ossn-message-box').html('<div class="ossn-loading ossn-box-loading"></div>');
			$('.ossn-message-box').fadeIn('slow');
		},
		callback: function(callback) {
			$('.ossn-message-box').html(callback).fadeIn();
		},
	});

};
/**
 * Load a media viewer
 *
 * @return void
 */
Ossn.Viewer = function($url) {
	Ossn.PostRequest({
		url: Ossn.site_url + $url,

		beforeSend: function() {
			$('.ossn-halt').removeClass('ossn-light');
			$('.ossn-halt').show();
			$('.ossn-viewer').html('<table class="ossn-container"><tr><td class="image-block" style="text-align: center;width:100%;"><div class="ossn-viewer-loding">Loading...</div></td></tr></table>');
			$('.ossn-viewer').show();
		},
		callback: function(callback) {
			$('.ossn-viewer').html(callback).show();
		},
	});
};
/**
 * Close a media viewer
 *
 * @return void
 */
Ossn.ViewerClose = function($url) {
	$('.ossn-halt').addClass('ossn-light');
	$('.ossn-halt').hide();
	$('.ossn-viewer').html('');
	$('.ossn-viewer').hide();
};
/**
 * Add a system messages for users
 *
 * @param string $messages Message for user
 * @param string $type Message type success (default) or error
 *
 * @return void
 */
Ossn.trigger_message = function($message, $type) {
	$type = $type || 'success';
	if ($type == 'error') {
		//compitable to bootstrap framework
		$type = 'danger';
	}
	if ($message == '') {
		return false;
	}
	$html = "<div class='alert alert-dismissible alert-" + $type + "'><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button>" + $message + "</div>";
	$('.ossn-system-messages').find('.ossn-system-messages-inner').append($html);
	if ($('.ossn-system-messages').find('.ossn-system-messages-inner').is(":not(:visible)")) {
		$('.ossn-system-messages').find('.ossn-system-messages-inner').slideDown('slow');
	}
	setTimeout(function(){ 
		$('.ossn-system-messages').find('.ossn-system-messages-inner').empty().hide()
	}, 10000);
};
/**
 * Dragging support of images
 * currently used by OssnProfile and OssnGroups
 *
 * @return void
 */
Ossn.Drag = function() {
	// some sanitizing to work with fluid themes and covers eventually resized according to screen width
	const default_cover_width  = 1040;
	const default_cover_height = 200;
	var image_width  = document.querySelector("#draggable").naturalWidth;
	var image_height = document.querySelector("#draggable").naturalHeight;
	var cover_width  = $("#container").width();
	var cover_height = $("#container").height();
	var drag_width   = 0;
	var drag_height  = 0;
	// TODO: get rid of hardcoded dimensions
	// the calculation below relies on current cover images HAVE a minimum width of 1040px
	// which shouldn't be a must-have for every other theme
	if(image_width > cover_width && image_width + cover_width > default_cover_width * 2) {
		drag_width = image_width - default_cover_width;
	}
	if(image_height > cover_height && image_height + cover_height > default_cover_height * 2) {
		drag_height = image_height - default_cover_height;
	}
	$.globalVars = {
		originalTop: 0,
		originalLeft: 0,
		maxHeight: drag_height,
		maxWidth: drag_width
	};
	$("#draggable").draggable({
		start: function(event, ui) {
			if (ui.position != undefined) {
				$.globalVars.originalTop = ui.position.top;
				$.globalVars.originalLeft = ui.position.left;
			}
		},
		drag: function(event, ui) {
			var newTop = ui.position.top;
			var newLeft = ui.position.left;
			if (ui.position.top < 0 && ui.position.top * -1 > $.globalVars.maxHeight) {
				newTop = $.globalVars.maxHeight * -1;
			}
			if (ui.position.top > 0) {
				newTop = 0;
			}
			if (ui.position.left < 0 && ui.position.left * -1 > $.globalVars.maxWidth) {
				newLeft = $.globalVars.maxWidth * -1;
			}
			if (ui.position.left > 0) {
				newLeft = 0;
			}
			ui.position.top = newTop;
			ui.position.left = newLeft;
		}
	});
};	
/**
 * Message done
 *
 * @param $message = message
 *
 * @return mix data
 */
Ossn.MessageDone = function($message) {
	return "<div class='ossn-message-done'>" + $message + "</div>";
};
//<script>
/**
 * Register some init functionality
 * Example user signup,  update check, message boxes etc
 */
Ossn.register_callback('ossn', 'init', 'ossn_startup_functions_compatibility');
Ossn.register_callback('ossn', 'init', 'ossn_image_url_cache');
Ossn.register_callback('ossn', 'init', 'ossn_makesure_confirmation');
Ossn.register_callback('ossn', 'init', 'ossn_system_messages');
Ossn.register_callback('ossn', 'init', 'ossn_user_signup_form');
Ossn.register_callback('ossn', 'init', 'ossn_topbar_dropdown');	
/**
 * Setup ajax request for user register
 *
 * @return void
 */
function ossn_user_signup_form(){
	Ossn.ajaxRequest({
		url: Ossn.site_url + "action/user/register",
		form: '#ossn-home-signup',

		beforeSend: function(request){
			var failedValidate = false;
			$('#ossn-submit-button').show();
			$('#ossn-home-signup .ossn-loading').addClass("ossn-hidden");

			$('#ossn-home-signup').find('#ossn-signup-errors').hide();
			$('#ossn-home-signup input').filter(function(){
				$(this).closest('span').removeClass('ossn-required');
				if(this.type == 'radio' && !$(this).hasClass('ossn-field-not-required')){
					if(!$("input[name='gender']:checked").val()){
						$(this).closest('span').addClass('ossn-required');
						failedValidate = true;
					}
				}
				if(this.value == "" && !$(this).hasClass('ossn-field-not-required')){
					$(this).addClass('ossn-red-borders');
					failedValidate = true;
					request.abort();
					return false;
				}
			});
			if(failedValidate == false){
				$('#ossn-submit-button').hide();
				$('#ossn-home-signup .ossn-loading').removeClass("ossn-hidden");
			}
		},
		callback: function(callback){
			if(callback['dataerr']){
				$('#ossn-home-signup').find('#ossn-signup-errors').html(callback['dataerr']).fadeIn();
				$('#ossn-submit-button').show();
				$('#ossn-home-signup .ossn-loading').addClass("ossn-hidden");
			} else if(callback['success'] == 1){
				$('#ossn-home-signup').html(Ossn.MessageDone(callback['datasuccess']));
			} else {
				$('#ossn-home-signup .ossn-loading').addClass("ossn-hidden");
				$('#ossn-submit-button').attr('type', 'submit')
				$('#ossn-submit-button').attr('style', 'opacity:1;');
			}
		}
	});
}
/**
 * Setup system messages
 *
 * @return void
 */
function ossn_system_messages(){
	$(document).ready(function(){
		if($('.ossn-system-messages').find('button').length){
			$('.ossn-system-messages').find('.ossn-system-messages-inner').show();

			setTimeout(function(){
				$('.ossn-system-messages').find('.ossn-system-messages-inner').hide().empty();
			}, 10000);
		}
		//Clicking close in system messages should close it complete #1137
		$('body').on('click', '.ossn-system-messages .close', function(){
			$('.ossn-system-messages').find('.ossn-system-messages-inner').hide().empty();
		});
	});
}
/**
 * Topbar dropdown button
 *
 * @return void
 */
function ossn_topbar_dropdown(){
	$(document).ready(function(){
		$('.ossn-topbar-dropdown-menu-button').on('click', function(){
			if($('.ossn-topbar-dropdown-menu-content').is(":not(:visible)")){
				$('.ossn-topbar-dropdown-menu-content').show();
			} else {
				$('.ossn-topbar-dropdown-menu-content').hide();
			}
		});

	});
}
/**
 * Show exception , are you sure?
 *
 * @return void
 */
function ossn_makesure_confirmation(){
	$(document).ready(function(){
		$('body').on('click', '.ossn-make-sure', function(e){
			e.preventDefault();
			var msg = 'ossn:exception:make:sure';
			if(typeof $(this).data('ossn-msg') !== "undefined"){
				msg = $(this).data('ossn-msg');
			}
			var del = confirm(Ossn.Print(msg));
			if(del == true){
				var actionurl = $(this).attr('href');
				window.location = actionurl;
			}
		});
	});
}
/**
 * Add cache tag to the local images
 * 
 * @param string		$callback	ossn
 * @param string		$type		init
 * @param array|object 	$params		null
 *
 * @added in v5.0 
 * @return void
 */
function ossn_image_url_cache($callback, $type, $params){
	$(document).ready(function(){
		if(Ossn.Config.cache.ossn_cache == 1){
			$('img').each(function(){
				var data = $(this).attr('src');
				$site_url = Ossn.ParseUrl(Ossn.site_url);
				var parts = Ossn.ParseUrl(data),
					args = {},
					base = '';
				if(parts['host'] == $site_url['host']){
					if(parts['host'] === undefined){
						if(data.indexOf('?') === 0){
							// query string
							base = '?';
							args = Ossn.ParseStr(parts['query']);
						}
					} else {
						// full or relative URL
						if(parts['query'] !== undefined){
							// with query string
							args = Ossn.ParseStr(parts['query']);
						}
						var split = data.split('?');
						base = split[0] + '?';
					}
					if(!args['ossn_cache']){
						args["ossn_cache"] = Ossn.Config.cache.last_cache;
						$(this).attr('src', base + jQuery.param(args));
					}
				}
			});
		}
	});
}
/**
 * Startup functions support
 * 
 * @param string		$callback	ossn
 * @param string		$type		init
 * @param array|object 	$params		null
 * 
 * @return void
 */
function ossn_startup_functions_compatibility($callback, $type, $params){
	for (var i = 0; i <= Ossn.Startups.length; i++){
		if(typeof Ossn.Startups[i] !== "undefined"){
			Ossn.Startups[i]();
		}
	}
}
/**
 * Initialize ossn startup functions
 *
 * @return void
 */
Ossn.Init = function(){
	Ossn.trigger_callback('ossn', 'init');
};
//<script>
$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip({
		placement:'left',										  
	}); 
	$(document).on('click', '#sidebar-toggle', function() {
		var $toggle = $(this).attr('data-toggle');
		if ($toggle == 0) {
			$(this).attr('data-toggle', 1);
			if($(document).innerWidth() >= 1300 && $('.ossn-page-loading-annimation').is(':visible')){
				$('.sidebar').addClass('sidebar-open-no-annimation');	
				$('.ossn-page-container').addClass('sidebar-open-page-container-no-annimation');
			} else {
				$('.sidebar').addClass('sidebar-open');
				$('.ossn-page-container').addClass('sidebar-open-page-container');
			}			
			$('.topbar .right-side').addClass('right-side-space');
			$('.topbar .right-side').addClass('sidebar-hide-contents-xs');
			$('.ossn-inner-page').addClass('sidebar-hide-contents-xs');
		}
		if ($toggle == 1) {
			$(this).attr('data-toggle', 0);
			
			$('.sidebar').removeClass('sidebar-open');
			$('.sidebar').removeClass('sidebar-open-no-annimation');
			
			$('.ossn-page-container').removeClass('sidebar-open-page-container');
			$('.ossn-page-container').removeClass('sidebar-open-page-container-no-annimation');
			$('.topbar .right-side').removeClass('right-side-space');
			$('.topbar .right-side').removeClass('sidebar-hide-contents-xs');
			$('.ossn-inner-page').removeClass('sidebar-hide-contents-xs');

			$('.topbar .right-side').addClass('right-side-nospace');
			$('.sidebar').addClass('sidebar-close');
			$('.ossn-page-container').addClass('sidebar-close-page-container');

		}
		var document_height = $(document).height();
		$(".sidebar").height(document_height);
	});
	var $chatsidebar = $('.ossn-chat-windows-long .inner');
	if($chatsidebar.length){
		$chatsidebar.css('height', $(window).height() - 45);
	}
	$(document).on("scroll", function() {
		$document_height = $(document).height();						
		$(".sidebar").height($document_height);
		
		if($chatsidebar.length){
			if ($(document).scrollTop() >= 50) {
				$chatsidebar.addClass('ossnchat-scroll-top');
				$chatsidebar.css('height', $(window).height());
			} else if ($(document).scrollTop() == 0) {
				$chatsidebar.removeClass('ossnchat-scroll-top');
				$chatsidebar.css('height', $(window).height() - 45);
			}
		}
	});
	if($(document).innerWidth() >= 1300){
		$('#sidebar-toggle').trigger('click');
	}
});
//https://www.opensource-socialnetwork.org/component/view/3657/optimize-pre-loader
$(document).ready(function() {
	   $(".ossn-page-loading-annimation").fadeOut("slow");
});
$(window).on('load resize', function () {
	if (document.querySelector("#draggable")) {
		var current_cover_height = 0;
		var current_cover_width = 0;
		if($('.profile-cover').length) {
			current_cover_height = ~~($('.profile-cover').height() + 0.5);
			current_cover_width = ~~($('.profile-cover').width() + 0.5);
		} else if($('.ossn-group-cover').length) {
			current_cover_height = ~~($('.ossn-group-cover').height() + 0.5);
			current_cover_width = ~~($('.ossn-group-cover').width() + 0.5);
		}
		if (current_cover_width < 481) {
			// we're on mobile
			const desktop_cover_width  = 1040;
			const desktop_cover_height = 200;
			var real_image_width  = document.querySelector("#draggable").naturalWidth;
			var real_image_height = document.querySelector("#draggable").naturalHeight;
			// 1. how many mobile heights would we need to hold the image?
			var mobile_height_factor = real_image_height / current_cover_height;
			// 2. how many pixels wide would be the scaled mobile image in comparison to fix desktop_cover_width?
			var mobile_pixel_width = desktop_cover_width / mobile_height_factor;
			// 3. how often would these pixels fit into the current coverwidth?
			var mobile_width_factor = current_cover_width / mobile_pixel_width;
			// 4. how many pixels do we get with the current mobile cover height?
			var mobile_pixel_height = mobile_width_factor * current_cover_height;
			// setting the new height already here allows us to retrieve the new scaled image width calculated by the browser
			$('#draggable').css('height', mobile_pixel_height);
			mobile_pixel_width = parseInt($('#draggable').css('width'));
			
			// 5. calculate the height-scaling factor for dragging - get maximum possible scroll top position
			var desktop_scroll_top_max = real_image_height - desktop_cover_height;
			var mobile_scroll_top_max  = mobile_pixel_height - current_cover_height;
			var height_scaling_factor  = desktop_scroll_top_max / mobile_scroll_top_max;
			// 6. calculate the width-scaling factor for dragging - get maximum possible scroll left position
			var desktop_scroll_left_max = real_image_width - desktop_cover_width;
			var mobile_scroll_left_max  = mobile_pixel_width - current_cover_width;
			var width_scaling_factor  = desktop_scroll_left_max / mobile_scroll_left_max;
			// 7. retrieve the saved dragging positions and scale accordingly
			var cover_top    = parseInt($('#draggable').data('top'));
			var cover_left   = parseInt($('#draggable').data('left'));
			var mobile_pixel_top  = cover_top / height_scaling_factor;
			var mobile_pixel_left = cover_left / width_scaling_factor;
			$('#draggable').css('top', mobile_pixel_top);
			$('#draggable').css('left', mobile_pixel_left);
		}
	// don't display cover images before final scale and position is known
	$('#draggable').fadeIn();
	}
});
