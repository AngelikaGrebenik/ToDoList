const taskList = document.getElementById('task-list');
const completedTasksList = document.getElementById('completed-tasks');
const newTaskInput = document.getElementById("new-task");
const notification2 = document.getElementById("notification2");

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
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function completeTask(index) {
    tasks[index].completed = true;
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';
    completedTasksList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.appendChild(createEmptyListMessage());
        return;
    }

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        const deleteButton = createButton('<img id="bin" src="icons/img_4.png">');
        const completeButton = createButton('<img id="tick" src="icons/img_3.png">');

        deleteButton.onclick = () => deleteTask(index);
        completeButton.onclick = () => completeTask(index);

        if (task.completed) {
            completedTasksList.appendChild(listItem);
            listItem.classList.add('completed');
        } else {
            taskList.appendChild(listItem);
            listItem.appendChild(completeButton);
        }

        const text = `${task.name} (${task.date.toLocaleString()})`;
        listItem.appendChild(document.createTextNode(text));
        listItem.appendChild(deleteButton);
    });
}

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

document.addEventListener('DOMContentLoaded', renderTasks);
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});