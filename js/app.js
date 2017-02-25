(function(){
	'use strict';
	
	var app; 
	const xhr;

	window.onload = init;

	function init() {
		app = document.getElementById('app');
		xhr = new XMLHttpRequest()
		xhr.onreadystatechange = handleReadyStateChange;
		sendMessage();
	}

	function sendMessage() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { text: 'getSelectedText' }, function(response) {
				if (response.searchTerm){
					handleValidSearchTerm(response.searchTerm);
				} else {
					handleInvalidSearchTerm();
				}
			});
		});
	}

	function handleValidSearchTerm (searchTerm) {
		const apiKey = 'YOUR_API_KEY';
		const apiUrl = `http://api.wordnik.com:80/v4/word.json/${searchTerm}/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=${apiKey}`;
		xhr.open("GET", apiUrl, true);
		xhr.send();
	}

	function handleReadyStateChange() {
		if (xhr.readyState == 4 && xhr.responseText) {
			buildDefinitionList(JSON.parse(xhr.responseText));
		}
	}

	function handleInvalidSearchTerm() {
		const h1 = createHeading('error');
		const div = createDiv('No word selected. Please select a word and try again.', 'warning-div');
		app.appendChild(h1);
		app.appendChild(div);
	}

	function buildDefinitionList(rows) {
		const h1 = createHeading(rows[0].word);
		app.appendChild(h1);
		const ol = createOrderedList('');
		rows.forEach(function(row){
			const li = createListItem(row.text);
			ol.appendChild(li);
		});
		app.appendChild(ol);
	}

	function createDiv(divText, className) {
		const div = document.createElement('div');
		div.className = className;
		const text = document.createTextNode(divText);
		div.appendChild(text);
		return div;
	}

	function createHeading(heading) {
		const h1 = document.createElement('h1');
		const h1Text = document.createTextNode(heading);
		h1.appendChild(h1Text);
		return h1;
	}

	function createOrderedList(className) {
		const ol = document.createElement('ol');
		ol.className = className;
		return ol;
	}

	function createListItem(listText) {
		const li = document.createElement('li');
		const text = document.createTextNode(listText);
		li.appendChild(text);
		return li;
	}

})();
