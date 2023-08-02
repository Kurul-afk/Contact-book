const formInput = document.querySelectorAll(".form-input");
const btn = document.querySelector(".btn");
const listContacts = document.querySelector(".list-contacts");

btn.addEventListener("click", () => {
  formInput.forEach((item, index) => {
    if (!item.value.trim()) {
      alert();
      return;
    }
    item.value = "";
  });
});

function setItemToStorage() {}
