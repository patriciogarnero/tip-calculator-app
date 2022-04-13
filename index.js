// Inputs
const billInput = document.querySelector(".input-bill");
const tipButtons = document.querySelectorAll(".tip-button");
const customTip = document.querySelector(".custom-tip");
const personInput = document.getElementById("person-count");
const form = document.getElementById("form");
const resetButton = document.querySelector(".reset-button");

// Outputs
const resultPerPerson = document.querySelector(".result1");
const totalPerPerson = document.querySelector(".result2");

//Event listeners
personInput.addEventListener("keyup", updateResult);

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    customTip.value = "";
    customTip.classList.remove("selected");
    customTip.classList.remove("success");
    updateResult();
  });
});

customTip.addEventListener("keyup", updateResult);

resetButton.addEventListener("click", () => {
  billInput.value = "";
  billInput.classList.remove("success");
  tipButtons.forEach((button) => {
    button.checked = false;
    button.classList.remove("selected");
  });
  customTip.value = "";
  customTip.classList.remove("selected");
  customTip.classList.remove("success");
  personInput.value = "";
  personInput.classList.remove("success");
  resetButton.disabled = true;
});

//Calculating & updating function
function updateResult() {
  handleTipPercentage();

  const billValue = billInput.value;
  const people = personInput.value;
  const tipPercentage = document.querySelector(".selected").value;
  let tipPerPerson = 0;
  let resultTotal = 0;

  //Checking if number of people is != 0 and serving the result
  if (people === 0 || people === "") {
    form.classList.add("error");
  } else if (people > 0) {
    form.classList.remove("error");
    personInput.classList.add("success");

    //Calculating and delivering the result
    tipPerPerson = (billValue * tipPercentage) / 100 / people;
    const tipPerPersonRounded = Math.round(tipPerPerson * 100) / 100;
    resultPerPerson.innerHTML = "$ " + tipPerPersonRounded;
    resultTotal = billValue / people + tipPerPersonRounded;
    totalPerPerson.innerHTML = "$ " + resultTotal;
  }

  //Updating bill input if value is correct
  if (billValue > 0) {
    billInput.classList.add("success");
    resetButton.disabled = false;
  }
}

function handleTipPercentage() {
  tipButtons.forEach((button) => {
    if (button.checked) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    }
  });

  if (customTip.value > 0) {
    customTip.classList.add("selected");
    customTip.classList.add("success");
    tipButtons.forEach((button) => {
      button.checked = false;
    });
  }
}
