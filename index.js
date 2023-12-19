document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const categorySelect = document.getElementById('categorySelect');
    const deadlineInput = document.getElementById('deadlineInput');

    const task = {
        text: taskInput.value,
        category: categorySelect.value,
        deadline: deadlineInput.value
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    loadTasks();
    clearInputs();
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(function (task, index) {
        const li = document.createElement('li');
        li.innerHTML = `<span>${task.text}</span> - <span>${task.category}</span> - <span>${task.deadline}</span>
                        <button onclick="deleteTask(${index})">Delete</button>
                        <button onclick="editTask(${index})">Edit</button>`;
        taskList.appendChild(li);
    });
}

function filterTasks(category) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (category !== 'all') {
        tasks = tasks.filter(task => task.category === category);
    }

    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const editedTask = prompt('Edit task:', tasks[index].text);

    if (editedTask !== null) {
        tasks[index].text = editedTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}

function clearInputs() {
    document.getElementById('taskInput').value = '';
    document.getElementById('categorySelect').value = 'work';
    document.getElementById('deadlineInput').value = '';
}
