async function getMenuItems() {
	const response = await fetch('http://localhost:3000/menu');
	return response.json();
}

export { getMenuItems };
