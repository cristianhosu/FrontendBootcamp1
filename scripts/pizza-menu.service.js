async function getMenuItems() {
	const response = await fetch('http://localhost:3000/menu');
	return response.json();
}

async function saveMenuItem(pizza) {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(pizza),
	};
	const response = await fetch('http://localhost:3000/menu', requestOptions);
	return response.json();
}

export { getMenuItems, saveMenuItem };
