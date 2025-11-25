task = {
    id: 1,
    text: " ", 
    done: false
}

var taskForm = document.getElementById("task-form");
var tasksContainer = document.getElementById("tasks-container");
var taskInput = document.getElementById("task-input");
var navHome = document.getElementById("nav-home");
var navTasks = document.getElementById("nav-tasks");
var navSettings = document.getElementById("nav-settings");
var homeSection = document.getElementById("home");
var tasksSection = document.getElementById("tasks");
var getStartedBtn = document.querySelector("#home #get-started-btn");
var settingsNameInput = document.getElementById("name");
var settingsEmailInput = document.getElementById("email");
var settingsTasksDoneInput = document.getElementById("completed-tasks");
var updateProfileBtn = document.querySelector(".settings-footer .ctb");
var tasks = JSON.parse(localStorage.tasks || "[]");

function loadProfileSettings() {
    var savedName = localStorage.getItem("user_name") || "Example Name";
    var savedEmail = localStorage.getItem("user_email") || "example.email@domain.com";
    settingsNameInput.value = savedName;
    settingsEmailInput.value = savedEmail;
    var tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    var count = 0;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].done === true) count++;
    }
    settingsTasksDoneInput.value = count;
}

updateProfileBtn.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.setItem("user_name", settingsNameInput.value);
    localStorage.setItem("user_email", settingsEmailInput.value);
    loadProfileSettings();

    alert("NexList: Profile updated successfully!");

});

function loadTasks() {
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        tasksContainer.innerHTML += 
            `<div class="single-task" data-id="${task.id}">
                <label class="checkbox-wrapper">
                    <input type="checkbox" class="task-checkbox" ${task.done ? "checked" : ""}>
                    <span class="custom-checkbox"></span>
                </label>
                <p class="single-task-text" style="text-decoration:${task.done ? "line-through" : "none"};">
                    ${task.description}
                </p>
                <button class="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                        <path fill-rule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>
            <hr>`;
    }
}

function addTask() {
    var newTask = {
        id: tasks.length + 1,
        description: taskInput.value,
        done: false
    };

    tasks.push(newTask);
    localStorage.tasks = JSON.stringify(tasks);

    tasksContainer.innerHTML += 
        `<div class="single-task" data-id="${newTask.id}">
            <label class="checkbox-wrapper">
                <input type="checkbox" class="task-checkbox">
                <span class="custom-checkbox"></span>
            </label>
            <p class="single-task-text">${newTask.description}</p>
            <button class="delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                    <path fill-rule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clip-rule="evenodd"/>
                </svg>
            </button>
        </div>
        <hr>`;

    taskInput.value = "";
}

tasksContainer.addEventListener("click", function(e) {
    if (e.target.closest(".delete-button")) {
        var taskDiv = e.target.closest(".single-task");
        var id = parseInt(taskDiv.getAttribute("data-id"));

        tasks = tasks.filter(t => t.id !== id);
        localStorage.tasks = JSON.stringify(tasks);

        taskDiv.nextElementSibling.remove();
        taskDiv.remove();
    }
});

function toggleLineThrough(checkbox) {
    var taskDiv = checkbox.closest(".single-task");
    var textP = taskDiv.querySelector(".single-task-text");
    var taskId = parseInt(taskDiv.getAttribute("data-id"));

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
            tasks[i].done = checkbox.checked;
            break;
        }
    }

    textP.style.textDecoration = checkbox.checked ? "line-through" : "none";
    localStorage.setItem("tasks", JSON.stringify(tasks));

    var count = tasks.filter(t => t.done).length;
    settingsTasksDoneInput.value = count;
}

tasksContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("task-checkbox")) {
        toggleLineThrough(e.target);
    }
});

function showHomePage(e) {
    if (e) e.preventDefault();
    homeSection.style.display = "flex";
    tasksSection.style.display = "none";
    document.querySelector(".settings").style.display = "none";
}

function showTasksPage(e) {
    if (e) e.preventDefault();
    homeSection.style.display = "none";
    tasksSection.style.display = "flex";
    document.querySelector(".settings").style.display = "none";
}

function showSettingsPage(e) {
    if (e) e.preventDefault();

    homeSection.style.display = "none";
    tasksSection.style.display = "none";
    document.querySelector(".settings").style.display = "flex";

    loadProfileSettings();
}

taskForm.addEventListener("submit", function(e) {
    e.preventDefault(); 
    addTask();          
});

taskInput.addEventListener("change", function() {
    console.log(taskInput.value);
});

navHome.addEventListener("click", showHomePage);
navTasks.addEventListener("click", showTasksPage);
navSettings.addEventListener("click", showSettingsPage);
getStartedBtn.addEventListener("click", showTasksPage);
loadTasks();
loadProfileSettings();
