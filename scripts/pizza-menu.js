import * as fromPizzaService from './pizza-menu.service.js';

const app = async () => {
	const data = await fromPizzaService.getMenuItems();
	bindPizzaMenu(data);
	bindAddPizza();
};

document.addEventListener('DOMContentLoaded', app);

function bindPizzaMenu(data) {
	const template = document.querySelector('script[type="text/template"]');
	const parentElement = document.querySelector('.pizza-menu');
	parentElement.innerHTML = '';
	data.forEach((pizza) => {
		const menuItem = document.createElement('menu-item');
		menuItem.data = pizza;
		parentElement.appendChild(menuItem);
	});
}

function bindAddPizza() {
	const button = document.getElementById('addPizza');
	button.addEventListener('click', () => {
		document.getElementById('addPizzaDialog').classList.remove('hidden');
	});

	document.querySelector('#addPizzaDialog .actions [name="cancel"]').addEventListener('click', () => {
		document.querySelectorAll('#addPizzaDialog input').forEach((elem) => {
			elem.value = '';
		});
		document.getElementById('addPizzaDialog').classList.add('hidden');
	});
	document.querySelector('#addPizzaDialog .actions [name="save"]').addEventListener('click', async () => {
		const name = document.querySelector('#addPizzaDialog input[name="name"]').value;
		const description = document.querySelector('#addPizzaDialog input[name="description"]').value;
		const price = document.querySelector('#addPizzaDialog input[name="price"]').value;
		const result = await fromPizzaService.saveMenuItem({
			id: document.querySelectorAll('.menu-item').length + 1,
			name: name,
			description: description,
			price: price,
			toppings: [],
		});
		if (result.id) {
			const data = await fromPizzaService.getMenuItems();
			bindPizzaMenu(data);

			document.querySelectorAll('#addPizzaDialog input').forEach((elem) => {
				elem.value = '';
			});
			document.getElementById('addPizzaDialog').classList.add('hidden');
		}
	});
}
