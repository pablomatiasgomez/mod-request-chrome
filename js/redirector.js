/*
 * This is used to handle the POST method.
 * If the request get to here is because it is enabled.
 * This script fills the form data and submits it in order to be redirected making a POST.
 * Created by Pablo Matías Gomez on 15/11/2014
 */

(function() {
	var LOCAL_STORAGE_METHOD = "selectedMethod";

	var url = decodeURIComponent(location.search.slice(5)); // Remove the "?url="
	var method = localStorage.getItem(LOCAL_STORAGE_METHOD) || "POST";

	if (method == "POST") {
		var form = document.forms['form'];

		form.action = url;
		form.method = method;

		//var input = document.createElement('input');
		//input.type = 'text'; // Default
		//input.value = 'extra data';
		//form.appendChild(input);

		form.submit();
	}
})();