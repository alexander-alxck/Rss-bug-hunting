const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";
let nextId = 1;

function addTask() {
  const text = input.value;

  if (text.trim() === "") {
    errorEl.hidden = false;
    errorEl.textContent = "Введите текст задачи";
    return;
  }

  errorEl.hidden = true;
  const currentTask = { id: nextId++, text: text, done: false };
  tasks.push(currentTask);
  input.value = "";
  createTask(currentTask);
  updateCounter();
}

function toggleTask(id, target) {
  console.log(tasks);
  const task = tasks.find((t) => t.id === id);
  task.done = !task.done;
  target.parentNode.classList.toggle("done", task.done);

  updateCounter();
}

function deleteTask(id, target) {
  tasks.filter((t) => t.id !== id);
  target.parentNode.remove();
}

function clearCompleted() {
  tasks = tasks.filter((t) => !t.done);

  render();
}

function updateCounter() {
  counter.textContent =
    "Активных задач: " + tasks.filter((t) => !t.done).length;
}

function createTask(task) {
  const li = document.createElement("li");
  li.className = "task";
  if (task.done) {
    li.classList.add("done");
  }
  li.dataset.id = task.id;

  const span = document.createElement("span");
  span.className = "task__text";
  span.textContent = task.text;
  span.addEventListener("click", (e) => toggleTask(task.id, e.target));

  const del = document.createElement("button");
  del.className = "task__del";
  del.textContent = "✕";
  del.addEventListener("click", (e) => deleteTask(task.id, e.target));

  li.appendChild(span);
  li.appendChild(del);
  list.appendChild(li);
}

function render(visible = tasks) {
  list.replaceChildren();

  for (let i = 0; i < visible.length; i++) {
    const task = visible[i];
    createTask(task);
  }

  updateCounter();
}

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;

    if (currentFilter === "all") {
      render();
    }

    if (currentFilter === "active") {
      render(tasks.filter((t) => !t.done));
    }
    if (currentFilter === "done") {
      render(tasks.filter((t) => t.done));
    }
  });
});

render();
