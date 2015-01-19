/*
 * This is used to save the configuration to the localstorage
 * 
 * 
 * Created by Pablo Matías Gomez on 15/11/2014
 */

 $(function() {
	var LOCAL_STORAGE_METHOD = "selectedMethod";
	var LOCAL_STORAGE_ENABLED = "enabled";

	var enabled = localStorage.getItem(LOCAL_STORAGE_ENABLED) || false;
	if (typeof enabled == "string") enabled = (enabled == "true");
	$("input[name='enabled']").prop("checked", enabled);

	$("input[name='enabled']").on("change", function() {
		localStorage.setItem(LOCAL_STORAGE_ENABLED, $(this).is(":checked"));
	});


	var methodSelected = localStorage.getItem(LOCAL_STORAGE_METHOD) || "POST";
	$("input[name='method']#" + methodSelected).prop("checked", true);

	$("input[name='method']").on("change", function() {
		localStorage.setItem(LOCAL_STORAGE_METHOD, $(this).val());
	});
});