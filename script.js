const formInput = document.querySelectorAll(".form-input");
const btn = document.querySelector(".btn");
const listContainer = document.querySelector(".list-container");
const listContacts = document.querySelector(".list-contacts");

btn.addEventListener("click", () => {
  const firstName = formInput[0].value.trim();
  const lastName = formInput[1].value.trim();
  const phoneNumber = formInput[2].value.trim();
  if (!firstName && !lastName && !phoneNumber) {
    alert("Введите все данные");
    return;
  }
  const obj = {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
  };
  setPersonToLocalStorage(obj);
  render();
  formInput.forEach((item) => (item.value = ""));
  console.log(obj);
});
render();

function setPersonToLocalStorage(person) {
  let data = [];
  if (localStorage.getItem("person")) {
    data = JSON.parse(localStorage.getItem("person"));
  }
  data.push(person);
  localStorage.setItem("person", JSON.stringify(data));
}

function render() {
  const newData = JSON.parse(localStorage.getItem("person"));
  listContacts.innerHTML = ""; // Нужен для того что-бы прошлые записи не дублировались
  newData.forEach((item, index) => {
    // Создаем элементы
    const li = document.createElement("li");
    // Правая часть item
    const liRight = document.createElement("div");
    const liText = document.createElement("div");
    const liName = document.createElement("h3");
    const liDescription = document.createElement("p");
    const liImg = document.createElement("img");
    // Левая часть item
    const liBtns = document.createElement("div");
    const btnDelete = document.createElement("button");
    const btnEdit = document.createElement("button");

    // Устанавливаем стили, атрибуты
    // Классы
    liText.className = "li-text";
    btnDelete.className = "btn-delete";
    btnEdit.className = "btn-edit";
    liBtns.className = "btn-container";
    li.className = "list-item";
    liRight.className = "item-right";
    // Текст внутри элемента
    liName.innerText = `Name: ${item.firstName} ${item.lastName}`;
    liDescription.innerText = `Phone number: ${item.phoneNumber}`;
    btnDelete.innerText = "Delete";
    btnEdit.innerText = "Edit";
    // Установка атрибутов
    liImg.setAttribute("src", "./img/class-warrior.svg");
    liDescription.setAttribute("type", "tel");
    // Стили
    listContainer.style.display = "block";
    liImg.style.width = "50px";
    liImg.style.marginRight = "10px";
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    btnEdit.style.marginLeft = "5px";

    btnDelete.addEventListener("click", () => {
      deletePerson(index);
    });
    btnEdit.addEventListener("click", () => {});

    // Добавляем элементы внутрь другого
    liText.append(liName);
    liText.append(liDescription);
    liBtns.append(btnDelete);
    liBtns.append(btnEdit);
    liRight.append(liImg);
    liRight.append(liText);
    li.appendChild(liRight);
    li.appendChild(liBtns);
    listContacts.appendChild(li);
  });
}

function deletePerson(index) {
  let data = JSON.parse(localStorage.getItem("person"));
  data = data.filter((item, idx) => index !== idx);
  localStorage.setItem("person", JSON.stringify(data));
  if (!data.length) {
    listContainer.style.display = "none";
  }
  render();
}
