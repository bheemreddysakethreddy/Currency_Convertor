let base_url = "https://api.frankfurter.app/latest?amount=100&from=USD&to=INR";

let dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
let msg = document.querySelector(".msg_para");


for (let select of dropdowns) {
    for (code in currencyToCountry) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && code === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
        // console.log(code,currencyToCountry[code]);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}

const updateexchangerate = async () =>{
    let amount = document.querySelector("form input");
    let amtval = amount.value;
    if(amtval<1){
        amtval=1;
        amount=1;
    }

    const URL = `https://api.frankfurter.app/latest?amount=${amtval}&from=${fromcurr.value}&to=${tocurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    // let rate = data.rates.value
    let rate = data.rates[tocurr.value];
    // console.log(data.rates);
    console.log(rate);
    
    // let finalamount = amtval*rate;
    msg.innerHTML = `<span style="font-weight:600">${amtval}</span> ${fromcurr.value} = <span style="font-weight:600">${rate}</span> ${tocurr.value}`;
}

const updateflag = (element) =>{
    let code = element.value;
    let countrycode = currencyToCountry[code];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click", (event)=>{
    event.preventDefault();
    updateexchangerate();
})

window.addEventListener("load",()=>{
    updateexchangerate();
})