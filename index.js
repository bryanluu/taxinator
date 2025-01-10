var income_input = document.querySelector(".income-dollar-amount > .input-value");
var tax_value = document.querySelector(".income-tax-calculated > .calculated-value");

function computeIncomeTax(income) {
  return income; // dummy for now
}

function updateDisplayedTax(computedTax) {
  tax_value.textContent = computedTax;
}

income_input.addEventListener("change", (event) => {
  var newValue = event.target.value;
  updateDisplayedTax(computeIncomeTax(newValue));
})
