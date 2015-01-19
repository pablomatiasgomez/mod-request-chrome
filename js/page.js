/*
 * This is used for every method but POST. 
 * POST method is handled by redirector.js.
 * This script gets the selected method and makes an ajax call to replace the entire body.
 * Created by Pablo Matías Gomez on 19/01/2014
 */

(function() {
	var LOCAL_STORAGE_ENABLED = "enabled";
	var LOCAL_STORAGE_METHOD = "selectedMethod";

	chrome.runtime.sendMessage({method: "getLocalStorage", key: LOCAL_STORAGE_ENABLED}, function(response) {
		var enabled = response.data;
		if (typeof enabled == "string") enabled = (enabled == "true");

		if (enabled) {
			chrome.runtime.sendMessage({method: "getLocalStorage", key: LOCAL_STORAGE_METHOD}, function(response) {
				var method = response.data;
				if (method && method != "POST" && method != "GET") {
					//document.clear();
					document.body.innerText = "Making request (" + method + ") to: " + location.href;
					//document.close();
					$.ajax({
						url: location.href,
						type: method,
						complete: function(data) {
							//document.clear();
							document.write(data.responseText);
							//document.close();
							//console.log(data.responseText);
						}
					});
				}
			});
		}
	});
})();