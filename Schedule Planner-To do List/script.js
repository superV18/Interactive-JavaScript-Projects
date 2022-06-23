const taskInput = document.querySelector(".task-input input");
let todos = JSON.parse(localStorage.getItem("todo-list"));
taskBox = document.querySelector(".task-box");
const completed = document.querySelector("#completed");
const all = document.querySelector("#all");
const pending = document.querySelector("#pending");
const bcc = document.querySelectorAll(".bc1");

let editId;
let isEditedTask = false;
let clickedStatus = "";

function bc(id) {
  for (let i = 0; i < bcc.length; i++) {
    if (bcc[i].id == id) {
      bcc[i].style.background = "rgb(222, 168, 255)";
      bcc[i].style.borderRadius = "4px";
    }
  }
}
function Nobc(id) {
  for (let i = 0; i < bcc.length; i++) {
    if (bcc[i].id == id) {
      bcc[i].style.background = "none";
    }
  }
}
function showAllTask() {
  clickedStatus = "";
  all.style.color = "blue";
  pending.style.color = "black";
  completed.style.color = "black";
  showTodo();
}

function showPendingTask() {
  clickedStatus = "pending";
  pending.style.color = "red";
  all.style.color = "black";
  completed.style.color = "black";
  showTodo();
}

function showCompletedTask() {
  clickedStatus = "completed";
  completed.style.color = "gold";
  all.style.color = "black";
  pending.style.color = "black";
  showTodo();
}

function showTodo() {
  let li = "";
  todos = JSON.parse(localStorage.getItem("todo-list"));
  let updatedTodos = [];
  if (clickedStatus == "pending") {
    updatedTodos = todos.filter((x) => {
      return x.status == "pending";
    });
  } else if (clickedStatus == "completed") {
    updatedTodos = todos.filter((x) => {
      return x.status == "completed";
    });
  } else {
    updatedTodos = todos;
  }

  if (updatedTodos.length) {
    updatedTodos.forEach((todo) => {
      let isCompleted = todo.status == "completed" ? "checked" : "";
      li += `        <li class="task">
            <label for="${todo.id}">
                <input onclick = "updateStatus(this)" type="checkbox" id="${todo.id}" ${isCompleted}>
                <p class="${isCompleted}" > ${todo.name} </p>
            </label>
            <div class="settings">
                <i onclick = "showMenu(this)" class="uil uil-ellipsis-h"></i>
                <ul class="task-menu">
                    <li onclick = "editTask(${todo.id}, '${todo.name}')"><i class="uil uil-pen"></i>Edit</li>
                    <li onclick = "deleteTask(${todo.id})" ><i class="uil uil-trash"></i>Delete</li>
                </ul>
            </div>
        </li>`;
    });
    taskBox.innerHTML = li;
  } else {
    taskBox.innerHTML = "NO TASK AVAILABLE \u{1F608}";
    taskBox.style.textAlign = "center";
  }
}
showTodo();
function showMenu(selectedTask) {
  let taskMenu = selectedTask.parentElement.lastElementChild;
  taskMenu.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      taskMenu.classList.remove("show");
    }
  });
}
function clearData() {
  todos.length = 0;
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
}
function editTask(taskId, taskName) {
  editId = taskId;

  if (
    todos.filter((x) => {
      return x.id == editId;
    })[0].status == "completed"
  ) {
    alert("This task is already completed!");
  } else {
    isEditedTask = true;
    taskInput.value = taskName;
  }
}

function deleteTask(deleteId) {
  let nonDeletedtodos = todos.filter((x) => {
    return x.id !== deleteId;
  });
  localStorage.setItem("todo-list", JSON.stringify(nonDeletedtodos));
  showTodo();
}
function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  console.log("selectedtask", selectedTask.id);
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    // todos[selectedTask.id].status = "completed";
    todos.filter((x) => {
      return x.id == selectedTask.id;
    })[0].status = "completed";
  } else {
    taskName.classList.remove("checked");
    // todos[selectedTask.id].status = "pending";
    todos.filter((x) => {
      return x.id == selectedTask.id;
    })[0].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!isEditedTask) {
      if (!todos) {
        todos = [];
      }
      let taskInfo = {
        name: userTask,
        status: "pending",
        id: !todos.length ? todos.length + 1 : todos[todos.length - 1].id + 1,
      };
      todos.push(taskInfo);
    } else {
      isEditedTask = false;
      // todos[editId].name = userTask;
      todos.filter((x) => {
        return x.id == editId;
      })[0].name = userTask;
    }
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
  }
});
