const binding = function (data, propertyId) {
	let scope = {};

	bindElements();
	scope = { ...data };
	return scope;

	function bindElements() {
		const boundElements = document.querySelector(`#${propertyId}`).shadowRoot.querySelectorAll(`[a-binding]`);
		boundElements.forEach((element) => {
			const propName = element.getAttribute('a-binding');
			addToScope(propName);

			scope[propName] = data[propName];
		});
	}

	function addToScope(propName) {
		if (!scope.hasOwnProperty(propName)) {
			let value;
			Object.defineProperty(scope, propName, {
				get() {
					return value;
				},
				set(newValue) {
					value = newValue;
					document
						.querySelector(`#${propertyId}`)
						.shadowRoot.querySelectorAll(`[a-binding="${propName}"]`)
						.forEach((item) => {
							if (item.tagName === 'SPAN') item.innerText = value;
							else item.value = value;
						});
				},
			});
		}
	}
};

export { binding };
