import * as fromPizzaService from './pizza-menu.service.js';

let scope = {};

const app = async () => {
	const data = await fromPizzaService.getMenuItems();
	console.log(data);
};

document.addEventListener('DOMContentLoaded', app);
