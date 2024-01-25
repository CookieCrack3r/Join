let todos = [{
    'id': '01',
    'category': 'User Story',
    'title': 'Kochwelt Page & Recipe Recommender',
    'description': 'Build start page with recipe recommendation...',
    'subtasks': '1/2 Subtasks',
    'status': 'in-progress'
},
{
    'id': '02',
    'category': 'Technical Task',
    'title': 'HTML Base Template Creation',
    'description': 'Create reusable HTML bas templates',
    'subtasks': '',
    'status': 'to-do'
},
{
    'id': '03',
    'category': 'Technical Task',
    'title': 'CSS Architecture Planning',
    'description': 'Build start page with recipe recommendation...',
    'subtasks': '2/2 Subtasks',
    'status': 'done'
},
{
    'id': '04',
    'category': 'User Story',
    'title': 'Daily Kochwelt Recipe',
    'description': 'Implement daily recipe and portion calculator',
    'subtasks': '',
    'status': 'await-feedback'
}];

let currentDraggedElement;

function init() {
    updateHTML();
}

function updateHTML() {
    updateAwaitFeedback();
    updateInProgress();
    updateToDo();
    updateDone();
}

function updateToDo() {
    let to_do = todos.filter(t => t['status'] == 'to-do');

    document.getElementById('todo').innerHTML = '';

    for (let i = 0; i < to_do.length; i++) {
        let todo = to_do[i];
        document.getElementById('todo').innerHTML += generateKanbanHTML(todo);
    }
}

function updateInProgress() {
    let progress = todos.filter(t => t['status'] == 'in-progress');

    document.getElementById('in-progress').innerHTML = '';

    for (let i = 0; i < progress.length; i++) {
        let todo = progress[i];
        document.getElementById('in-progress').innerHTML += generateKanbanHTML(todo);
    }
}

function updateAwaitFeedback() {
    let await = todos.filter(t => t['status'] == 'await-feedback');

    document.getElementById('await-feedback').innerHTML = '';

    for (let i = 0; i < await.length; i++) {
        let todo = await[i];
        document.getElementById('await-feedback').innerHTML += generateKanbanHTML(todo);
    }
}

function updateDone() {
    let done = todos.filter(t => t['status'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        let todo = done[i];
        document.getElementById('done').innerHTML += generateKanbanHTML(todo);
    }
}

function generateKanbanHTML(todo) {
    let categoryColor = '';

    if (todo['category'] === 'Technical Task') {
        categoryColor = '#005bf8';
    } else if (todo['category'] === 'User Story') {
        categoryColor = '#FF7A00';
    }

    return `
             <div draggable="true" ondragstart="startDraggin(${todo['id']})" class="card">
             <span class="label" style="background-color: ${categoryColor};">${todo['category']}</span>
                                <span class="description">
                                    <h3>${todo['title']}</h3><br>${todo['description']}
                                </span>
                                <div class="progress-section">
                                    <div class="progress-bar">
                                        <div class="progress"></div>
                                    </div>
                                    <div>${todo['subtasks']}</div>
                                </div>
                                <div class="members-and-priority">
                                    <div class="members">
                                        <img src="img/profile.svg">
                                        <img src="img/profile1.svg">
                                        <img src="img/profile2.svg">
                                    </div>
                                    <div class="priority">
                                        <img src="img/medium.svg">
                                    </div>
                                </div>
                            </div>
    `;
}

function startDraggin(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    todos[currentDraggedElement]['status'] = status;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('dragsection-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('dragsection-highlight');
}

function addTask() {
    window.location.href = '/AddTask/addTask.html';
}

