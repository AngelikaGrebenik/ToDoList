const taskList = document.getElementById('task-list');
const completedTasksList = document.getElementById('completed-tasks');
let tasks = [];

document.addEventListener('DOMContentLoaded', renderTasks, false);

function addTask() {
    const newTask = document.getElementById('new-task').value;
    tasks.push({name: newTask, date: new Date(), completed: false});
    renderTasks();
    document.getElementById('new-task').value = '';
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
        const emptyListMessage = document.createElement('div');
        emptyListMessage.innerHTML = '<div id="test-empty">\n' +
            '        <img id="notification" src="img_1.png">\n' +
            '        <div id="text-note">\n' +
            '            <p id="p1">OOpps......You don’t have any tasks</p>\n' +
            '            <p id="p2">This view will show you all of the tasks that have been notated </p>\n' +
            '        </div>\n' +
            '    </div>';
        taskList.appendChild(emptyListMessage);
        return;
    }

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        const deleteButton = document.createElement('button');
        const completeButton = document.createElement('button');
        deleteButton.innerHTML = '<img id="bin" src="img_4.png">';
        completeButton.innerHTML = '<img id="tick" src="img_3.png">';
        deleteButton.onclick = () => deleteTask(index);
        completeButton.onclick = () => completeTask(index);
        if (task.completed) {
            completedTasksList.appendChild(listItem);
        } else {
            taskList.appendChild(listItem);
            listItem.appendChild(completeButton);
        }
        listItem.appendChild(document.createTextNode(task.name + ' (' + task.date.toLocaleString() + ') '));
        listItem.appendChild(deleteButton);
    });
}
