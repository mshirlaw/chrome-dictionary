export class ViewBuilder {
	
	constructor(app) {
		this.app = app;
	}
	
	buildDefinitionList(rows) {
		const h1 = this.createHeading(rows[0].word);
		this.app.appendChild(h1);
		const ol = this.createOrderedList('');
		rows.forEach((row) => {
			const li = this.createListItem(row.text);
			ol.appendChild(li);
		});
		this.app.appendChild(ol);
	}
	
	createDiv(divText, className) {
		const div = document.createElement('div');
		div.className = className;
		const text = document.createTextNode(divText);
		div.appendChild(text);
		return div;
	}
	
	createHeading(heading) {
		const h1 = document.createElement('h1');
		const h1Text = document.createTextNode(heading);
		h1.appendChild(h1Text);
		return h1;
	}
	
	createOrderedList(className) {
		const ol = document.createElement('ol');
		ol.className = className;
		return ol;
	}
	
	createListItem(listText) {
		const li = document.createElement('li');
		const text = document.createTextNode(listText);
		li.appendChild(text);
		return li;
	}
	
	appendChildren(children) {
		children.forEach((child) => {
			this.app.appendChild(child);
		});
	}
}