let todos = [];
let task = document.getElementById('task-todo');

function includeHTML() {
    greetAsLogedUser();
}

async function loadTodos() {
    try {
        todos = JSON.parse(await getItem('todos'));

    } catch (e) {
        console.error('Loading error:', e);
    }
}

let progress = todos.filter(t => t['status'] == 'in-progress');
task.innerHTML = progress.toString();



