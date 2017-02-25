chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.text == 'getSelectedText') {
		sendResponse({ searchTerm: window.getSelection().toString() });;
	}
});