// console.log("client side javascript file loaded");

// const loc = ["Ardabil", "Parsabad moghan", "Tehran", "Tabriz", "Qazvin iran"];

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "From javascript";

weatherForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const location = search.value;
  // console.log(location);
  search.value = "";

  messageOne.textContent = "loading...";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        messageOne.textContent = "";
        messageTwo.textContent = data.error;
      } else {
        messageOne.textContent = "";
        messageTwo.textContent = data.data;
      }
    })
    .catch(err => {
      messageOne.textContent = "";
      messageTwo.textContent = err;
    });
});
