// const BASE_URL =
//   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json";
const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const bttn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const mssg = document.querySelector(".msg");

// for (code in countryList) {
//   console.log(code);
// }

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  //   console.log(currCode);
  let countryCOde = countryList[currCode];
  let newsrc = `https://flagsapi.com/${countryCOde}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

bttn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  //   console.log(amount);
  amtVal = amount.value;
  //   console.log(amtVal);
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  //   console.log(fromCurr.value, toCurr.value);
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  //   console.log(data, rate);

  let finalmount = amtVal * rate;
  //   console.log(finalmount);
  //   console.log(mssg);
  mssg.innerText = `${amtVal} ${fromCurr.value} = ${finalmount} ${toCurr.value}`;
});
