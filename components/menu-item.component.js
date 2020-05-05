import { binding } from '../scripts/binding.js';

export class MenuItem extends HTMLElement {
	constructor() {
		super();
		this._data = {};
		this._scope = {};
		this._dummyTemplate = null;
		this.attachShadow({ mode: 'open' });
	}

	get data() {
		return this._data;
	}

	set data(value) {
		this._data = value;
	}

	async connectedCallback() {
		const templateFile = await fetch('/components/menu-item.template.html');
		const file = await templateFile.text();

		console.log(this.data);
		this._dummyTemplate = document.createElement('template');
		this._dummyTemplate.innerHTML = file.trim();
		this.bindData();
	}

	bindData() {
		this.shadowRoot.appendChild(this._dummyTemplate.content.firstChild);
		this.shadowRoot.host.id = `custom-element-${this._data.id}`;
		this._scope = binding(this._data, `custom-element-${this._data.id}`);
	}
}

customElements.define('menu-item', MenuItem);
