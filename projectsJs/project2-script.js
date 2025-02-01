// 初始變數
const list = document.querySelector("#my-todo");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");
const done = document.querySelector("#my-done");
// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

for (let todo of todos) {
  addItem(todo);
}

// 函式
function addItem(text) {
  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  list.appendChild(newItem);
  input.value = "";
}

// Create
addBtn.addEventListener("click", (e) => {
  const inputValue = input.value;
  if (inputValue.length > 0 && inputValue.match(/^(?!(\s+$))/) !== null) {
    addItem(inputValue);
  }
});

input.addEventListener("keydown", (event) => {
  const inputValue = input.value;
  if (
    inputValue.length > 0 &&
    inputValue.match(/^(?!(\s+$))/) !== null &&
    event.key === "Enter"
  ) {
    addItem(inputValue);
  }
});

// Delete and check
list.addEventListener("click", (event) => {
  const target = event.target;
  let parentElement = target.parentElement;
  if (target.classList.contains("delete")) {
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    target.classList.toggle("checked");
    done.appendChild(parentElement);
  }
});
done.addEventListener("click", (event) => {
  const target = event.target;
  let parentElement = target.parentElement;
  if (target.classList.contains("delete")) {
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    target.classList.toggle("checked");
    list.appendChild(parentElement);
  }
});
