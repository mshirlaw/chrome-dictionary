import { API_KEY } from '../api-key.js';
import { ViewBuilder } from './view-builder.class.js';

(function(){
	'use strict';
	
	let app, xhr;
	window.onload = init;
	
	function init() {
		app = document.getElementById('app');
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = handleReadyStateChange;
		fetchDataForView();
	}
	
	function fetchDataForView() {
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, { text: 'getSelectedText' }, (response) => {
				if (response.searchTerm){
					handleValidSearchTerm(response.searchTerm);
				} else {
					handleInvalidSearchTerm();
				}
			});
		});
	}
	
	function handleValidSearchTerm (searchTerm) {
		const apiUrl = `http://api.wordnik.com:80/v4/word.json/${searchTerm}/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=${API_KEY}`;
		xhr.open("GET", apiUrl, true);
		xhr.send();
	}
	
	function handleReadyStateChange() {
		if (xhr.readyState == 4 && xhr.responseText) {
			let viewBuilder = new ViewBuilder(app);
			viewBuilder.buildDefinitionList(JSON.parse(xhr.responseText));
		}
	}
	
	function handleInvalidSearchTerm() {
		let viewBuilder = new ViewBuilder(app);
		const h1 = viewBuilder.createHeading('error');
		const div = viewBuilder.createDiv('No word selected. Please select a word and try again.', 'warning-div');
		viewBuilder.appendChildren([h1, div]);
	}

})();
