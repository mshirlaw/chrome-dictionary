chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.text == 'getSelectedText') {
		sendResponse({ searchTerm: window.getSelection().toString() });
	}
});