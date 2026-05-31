const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const remainingTasks = document.getElementById("remainingTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addBtn.addEventListener("click", addTask);

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Enter a task");
    return;
  }

  tasks.push({
    text: text,
    completed: false,
  });

  saveTasks();

  taskInput.value = "";
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task");

    li.innerHTML = `
            <div class="task-left">
                <input type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${index})">

                <span class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>
            </div>

            <button class="delete-btn"
            onclick="deleteTask(${index})">
            Delete
            </button>
        `;

    taskList.appendChild(li);
  });

  updateStats();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;

  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);

  saveTasks();
}

function updateStats() {
  const total = tasks.length;

  const completed = tasks.filter((task) => task.completed).length;

  totalTasks.textContent = total;
  completedTasks.textContent = completed;
  remainingTasks.textContent = total - completed;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
}
