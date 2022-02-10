var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#task-in-progress");
var tasksCompleteEl = document.querySelector("#tasks-complete");

var completeEditTask = function (taskName, taskType, taskId) {
  console.log(taskName, taskType, taskId);
  // find the matching task list item
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};

var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  var isEdit = formEl.hasAttribute("data-task-id");
  // has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }
  // no data attribute, so create object as normal and pass to createTaskEl function
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
    };

    // check if input values are empty strings
    if (taskNameInput && taskTypeInput) {
      // send it as an argument to createTaskEl
      createTaskEl(taskDataObj);
    } else {
      alert("please fill out the form");
    }

    formEl.reset();
  }
};

var createTaskActions = function (taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  //create select
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(statusSelectEl);

  // create options
  var statusChoices = ["To Do", "In Progress", "Complete"];
  for (var i = 0; i < statusChoices.length; i++) {
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.className = "";
    statusOptionEl.setAttribute("data-task-id", taskId);
    statusSelectEl.appendChild(statusOptionEl);
  }
  return actionContainerEl;
};

var createTaskEl = function (taskDataObj) {
  // create li item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);
  // create div
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

  // li后面加div
  listItemEl.appendChild(taskInfoEl);

  var taskActionEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionEl);
  // ul后面加li
  tasksToDoEl.appendChild(listItemEl);

  // increase task counter for next unique id
  taskIdCounter++;
};

//Global search
var taskButtonHandler = function (event) {
  var taskId = event.target.getAttribute("data-task-id");

  console.log(event.target);
  if (event.target.matches(".edit-btn")) {
    console.log("you clicked a edit button!");
    editTask(taskId);
  } else if (event.target.matches(".delete-btn")) {
    console.log("you clicked a delete button!");
    deleteTask(taskId);
  } else if (event.target.matches(".select-status")) {
    console.log("you clicked change-status button!");
  }
};

// delete function
var deleteTask = function (taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  console.log(taskId);
  console.log(taskSelected);
  taskSelected.remove();
};

// edit function
var editTask = function (taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId);
};

//change-status function
var taskStatusChangeHandler = function (event) {
  var taskId = event.target.getAttribute("data-task-id");
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  var statusValue = event.target.value.toLowerCase();
  // console.log(statusValue);
  if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "complete") {
    tasksCompleteEl.appendChild(taskSelected);
  } else if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  }
};

var pageContentEl = document.querySelector("#page-content");
// other logic...

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);

// buttonEl.addEventListener("click", taskFormHandler);
formEl.addEventListener("submit", taskFormHandler);
