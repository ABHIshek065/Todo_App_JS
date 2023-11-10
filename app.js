let today = new Date();
const options = { weekday: "long", day: "numeric", month: "long" };
let todos = [];

function checkNoTodo() {
  let noTodo = document.getElementById("no-todo");
  if (todos.length === 0) {
    noTodo.classList.remove("d-none");
  } else {
    noTodo.classList.add("d-none");
  }
}

function makeInputsBlank() {
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("dueDate").value = "";
}

function renderTodos() {
  let todoContainer = document.getElementById("todoContainer");
  todoContainer.innerHTML = "";

  todos.map((todo, index) => {
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-done");

    let contentDiv = document.createElement("div");
    contentDiv.classList.add("content", "flex");

    let blankDiv = document.createElement("div");

    let title = document.createElement("p");
    title.classList.add("todo-title");
    let desc = document.createElement("p");
    desc.classList.add("desc");
    let dueDate = document.createElement("p");
    dueDate.classList.add("due");

    // adding values
    title.innerText = todo.title;
    desc.innerText = todo.desc;
    let date = new Date(todo.dueDate);
    let fDate = date.toLocaleDateString("en", options);
    let fTime = date.toLocaleTimeString("en-US");
    dueDate.innerText = fTime + " " + fDate;

    let buttonDiv = document.createElement("div");

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("DeleteTask");
    deleteButton.addEventListener("click", () => {
      deleteTodo(index);
      checkNoTodo();
    });

    todoContainer.appendChild(todoDiv);
    todoDiv.appendChild(checkbox);
    todoDiv.appendChild(contentDiv);
    contentDiv.appendChild(blankDiv);
    blankDiv.appendChild(title);
    blankDiv.appendChild(desc);
    blankDiv.appendChild(dueDate);
    contentDiv.appendChild(buttonDiv);
    buttonDiv.appendChild(deleteButton);
  });
}

function sortTodos() {
  todos.sort((a, b) => {
    let dateA = new Date(a.dueDate);
    let dateB = new Date(b.dueDate);

    if (dateA < dateB) {
      return -1;
    } else if (dateA > dateB) {
      return 1;
    } else {
      return 0;
    }
  });
}

function addTodo() {
  let title = document.getElementById("title").value;
  let desc = document.getElementById("desc").value;
  let dueDate = document.getElementById("dueDate").value;

  //   input field validation
  if (!title || !desc) {
    alert("Please fill in both the title and description fields.");
    return;
  }


  let tempTodoObject = {
    title: title,
    desc: desc,
    dueDate: dueDate,
  };

  todos.push(tempTodoObject);
  checkNoTodo();
  makeInputsBlank();
  sortTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}
