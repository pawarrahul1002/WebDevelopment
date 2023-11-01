let tasks = [];
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");

console.log("Working");


function fetchToDos(){
  fetch('https://jsonplaceholder.typicode.com/todos')
  .then(function(response)
  {
    console.log(response);
    return response.json();
  }).then(function(data)
  {
    tasks = data.slice(0,10);
    renderList();
  })
  .catch(function(error)
  {
    console.log("error",error);
  })
}

function addTaskToDom(task) {
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${
    task.completed ? "checked" : ""
  } data-id="${task.id}" class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="bin.png" class="delete" data-id="${task.id}" />
    `;

  taskList.append(li);
}

function renderList() {
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    addTaskToDom(tasks[i]);
  }

  tasksCounter.innerHTML = tasks.length;
}

function toggleTaskAsComplete(taskId) {
  const task = tasks.filter(function (task) {
    return task.id == Number(taskId);
  });
  console.log(task);
  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.completed = !currentTask.completed;
    renderList();
    showNotification("Task toggle successfully");
    return;
  }

  showNotification("Could not toggle the task");
}

function deleteTask(taskId) {
  const newTask = tasks.filter(function (task) {
    return task.id !== Number(taskId);
  });
  tasks = newTask;
  renderList();
  showNotification("Task deleted successfully");
}

function addTask(task) {
  // if(task)
  // {
  //   fetch("https://jsonplaceholder.typicode.com/todos",{
  //     method:'POST',
  //     headers:{
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(task),
  //   }).then(function(task)
  //   {
  //     // console.log(data)
  //     tasks.push(task);
  //     renderList();
  //     showNotification('Task added successfully');
  //   })
  //   .catch(function(error)
  //   {
  //     console.log('error',error);
  //   })
  // }
  console.log(task);
  tasks.push(task);
  renderList();
  showNotification("Task added successfully");
  return;
}

function showNotification(text) {
  alert(text);
}

function handleInputKeyPress(e) {
  if (e.key == "Enter") {
    const text = e.target.value;
    if (!text) {
      showNotification("Task text can not be empty");
      return;
    }

    const task = {
      title: text,
      id: Date.now(),
      completed: false,
    };

    e.target.value = "";
    addTask(task);
  }
}

function handleClickListeners(e) {
  const target = e.target;
  if (target.className == "delete") {
    deleteTask(target.dataset.id);
  } else if (target.className == "custom-checkbox") {
    toggleTaskAsComplete(target.id);
  }
}

function inItApp() {
  fetchToDos();
  addTaskInput.addEventListener("keyup", handleInputKeyPress);
  document.addEventListener("click", handleClickListeners);
}

inItApp();