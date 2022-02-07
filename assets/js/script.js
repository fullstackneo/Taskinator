// var buttonEl = document.querySelector("#save-task");

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) {
  // console.log(event);
  event.preventDefault();

  var taskNameInput = document.querySelector("input[name='task-name']");
  console.log(taskNameInput);
  console.dir(taskNameInput);

  var listItemEl = document.createElement("li");
  listItemEl.textContent = document.querySelector("input[name='task-name']").value;
  listItemEl.className = "task-item";
  tasksToDoEl.appendChild(listItemEl);
};

// buttonEl.addEventListener("click", createTaskHandler);
formEl.addEventListener("submit", createTaskHandler);
