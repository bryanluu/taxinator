var income_input = document.querySelector(".income-dollar-amount > .input-value");
var tax_value = document.querySelector(".income-tax-calculated > .calculated-value");

const TAX_BRACKET_BOUNDARIES = [47_937, 95_875, 110_076, 133_664, 181_232, 252_752];
const TAX_BRACKET_RATES = [5.06, 7.70, 10.50, 12.29, 14.70, 16.80, 20.50];

/**
 *
 * @param {Number} income Taxable income
 * @returns After-tax income according to https://www2.gov.bc.ca/gov/content/taxes/income-taxes/personal/tax-rates
 */
function computeIncomeTax(income) {
  var tax = 0;
  var lastBoundary = 0;
  // check each boundary, applying tax as suitable
  for (var i = 0; i < TAX_BRACKET_BOUNDARIES.length; i++) {
    var boundary = TAX_BRACKET_BOUNDARIES[i];
    var rate = TAX_BRACKET_RATES[i] / 100;
    if (income > boundary) {
      // compute cumulative tax, move to next boundary
      tax += rate * (boundary - lastBoundary);
      lastBoundary = boundary;
    } else { // if income falls within a boundary
      // compute final cumulate tax and return it
      tax += rate * (income - lastBoundary);
      return tax;
    }
  }
  // if here, income is in the highest bracket
  rate = TAX_BRACKET_RATES[TAX_BRACKET_BOUNDARIES.length] / 100;
  tax += rate * (income - lastBoundary);
  return tax;
}

function updateDisplayedTax(computedTax) {
  tax_value.textContent = computedTax;
}

income_input.addEventListener("change", (event) => {
  var newValue = event.target.value;
  updateDisplayedTax(computeIncomeTax(newValue));
})

updateDisplayedTax(income_input.value);
