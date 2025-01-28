document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = storedTasks;
    updateTaskList();
    updateStats();
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = "";
        updateTaskList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1); // Remove the task being edited
    updateTaskList();
    updateStats();
    saveTasks();
};


const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    document.getElementById("progress").style.width = `${progress}%`;
    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`;
};

const updateTaskList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.className = "taskItem";

        listItem.innerHTML = `
            <div class="task">
                <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskComplete(${index})">
                <p>${task.text}</p>
            </div>
           <div class="icons">
                    <i class="fas fa-edit" onclick="editTask(${index})" style="cursor: pointer;"></i>
                    <i class="fas fa-trash" onclick="deleteTask(${index})" style="cursor: pointer;"></i>
                </div>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
        `;

        taskList.appendChild(listItem);
    });
};

document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
});
