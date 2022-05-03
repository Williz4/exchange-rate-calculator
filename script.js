'use strict';
const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const ratesEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//Fetch Exchange Rates and Update the Dom
function calculate() {
	const currency_one = currencyEl_one.value;
	const currency_two = currencyEl_two.value;

	fetch(`https://v6.exchangerate-api.com/v6/96472be099784195c03a5c9b/latest/${currency_one}`).then(res => res.json())
		.then(data => {
			const rate = data.conversion_rates[currency_two];

			ratesEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

			amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
		});
}

calculate();

//Event Listeners
currencyEl_one.addEventListener('change', calculate);
//the input event runs if we type something inside the input field
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', ()=> {
	const temp = currencyEl_one.value;

	currencyEl_one.value = currencyEl_two.value;
	currencyEl_two.value = temp;
	calculate();
})