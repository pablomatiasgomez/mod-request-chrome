/*
chrome.webRequest.onBeforeSendHeaders.addListener(function(data) {
	data.method = "POST";
	console.log(data);
	return {method: "GET"};

	console.log("onBeforeSendHeaders fired");
	var xdata=data.requestHeaders;
	xdata.push({
		"name":"Referer",
		"value": "http://the.new/referrer"
	})
	return {requestHeaders: xdata};
}, { 
	urls: ["<all_urls>"]
}, ["blocking", "requestHeaders"]);
*/


chrome.webRequest.onBeforeRequest.addListener(function(details) {
	var LOCAL_STORAGE_ENABLED = "enabled";
	var LOCAL_STORAGE_METHOD = "selectedMethod";

	var isOwnRedirect = function() {
		if (details.method == "GET") {
			if (details.url.indexOf("?DONTRED=1") != -1 || details.url.indexOf("&DONTRED=1") != -1) {
				return true;
			}
			return false;
		} else {
			if (details.requestBody) {
				return !!(details.requestBody.formData['DONTRED']);
			}
			return false;
		}
	};

	var enabled = localStorage.getItem(LOCAL_STORAGE_ENABLED) || false;
	if (typeof enabled == "string") enabled = (enabled == "true");

	var method = localStorage.getItem(LOCAL_STORAGE_METHOD) || "POST";

	if (details.url.slice(0, 19) == "chrome-extension://") return;
	if (isOwnRedirect()) return;
	if (!enabled) return;
	if (method != "POST") return; // Because is handled by the 'page.js'
	
	var url = chrome.runtime.getURL("html/redirector.html") + "?url=" + encodeURIComponent(details.url);

	return {
		redirectUrl: url
	};
}, {
	types: ['main_frame', 'sub_frame'],
	urls: ["<all_urls>"]
}, ["blocking", "requestBody"]);


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.method == "getLocalStorage")
		sendResponse({data: localStorage[request.key]});
	else
		sendResponse({}); // snub them.
});