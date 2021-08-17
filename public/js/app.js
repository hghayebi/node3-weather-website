
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");



weatherForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const location = search.value;
 
  search.value = "";

  messageOne.textContent = "loading...";
  messageTwo.textContent = "";

  fetch(`/weather?address=${location}`)
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
