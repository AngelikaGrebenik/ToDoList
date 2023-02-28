const taskList = document.getElementById('task-list');
const completedTasksList = document.getElementById('completed-tasks');
const newTaskInput = document.getElementById("new-task");
const notification2 = document.getElementById("notification2");
const sortMethodSelect = document.getElementById('sort-method');
const searchInput = document.getElementById('search-tasks');

let tasks = [];

function addTask() {
    const inputValue = newTaskInput.value.trim();

    if (inputValue === "") {
        showNotification("You have not entered a task!", notification2);
        return;
    }

    tasks.push({name: inputValue, date: new Date(), completed: false});
    renderTasks();
    newTaskInput.value = '';
    updateLocalStorage();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    updateLocalStorage();
}

function completeTask(index) {
    tasks[index].completed = true;
    renderTasks();
    updateLocalStorage();
}

function renderTasks() {
    taskList.innerHTML = '';
    completedTasksList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.appendChild(createEmptyListMessage());
        return;
    }

    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(searchTerm));

    if (filteredTasks.length === 0) {
        taskList.appendChild(createEmptyListMessage());
        return;
    }

    filteredTasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        const textElement = document.createElement('span');
        textElement.style.width = "90%";
        const deleteButton = createButton('<img id="bin" src="icons/img_4.png">');
        const completeButton = createButton('<img id="tick" src="icons/img_3.png">');

        deleteButton.onclick = () => deleteTask(index);
        completeButton.onclick = () => completeTask(index);

        if (task.completed) {
            listItem.appendChild(completeButton);
            completedTasksList.appendChild(listItem);
            listItem.classList.add('completed');
        } else {
            taskList.appendChild(listItem);
            listItem.appendChild(completeButton);
        }

        const text = `${task.name} (${new Date(task.date).toLocaleString()})`;
        textElement.appendChild(document.createTextNode(text));
        listItem.appendChild(textElement);
        listItem.appendChild(deleteButton);
    });
}

searchInput.addEventListener('input', () => renderTasks());

function createButton(html) {
    const button = document.createElement('button');
    button.innerHTML = html;
    return button;
}

function createEmptyListMessage() {
    const div = document.createElement('div');
    div.id = 'test-empty';
    div.innerHTML = `
        <img id="notification" src="icons/img_1.png">
        <div id="text-note">
            <p id="p1">OOpps......You don’t have any tasks</p>
            <p id="p2">This view will show you all of the tasks that have been notated</p>
        </div>
    `;
    return div;
}

function showNotification(message, element) {
    element.innerText = message;
    element.style.display = "block";
    setTimeout(() => {
        element.style.display = "none";
    }, 2000);
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('sortMethod', sortMethodSelect.value);
}

function sortTasks(sortMethod) {
    switch (sortMethod) {
        case 'date-desc':
            tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'date-asc':
            tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'name-asc':
            tasks.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            tasks.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            break;
    }
}

function submitForm(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addTask();
    }
}

newTaskInput.addEventListener('keydown', submitForm);

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        const storedSortMethod = localStorage.getItem('sortMethod');
        if (storedSortMethod) {
            sortMethodSelect.value = storedSortMethod;
            sortTasks(storedSortMethod);
        }
        renderTasks();
    }
}

sortMethodSelect.addEventListener('change', () => {
    sortTasks(sortMethodSelect.value);
    renderTasks();
    updateLocalStorage();
});

document.addEventListener('DOMContentLoaded', renderTasks);
document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromLocalStorage();
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});
