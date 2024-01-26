let todos = [{
    'id': '1',
    'category': 'User Story',
    'title': 'Kochwelt Page & Recipe Recommender',
    'description': 'Build start page with recipe recommendation...',
    'subtasks': '1/2 Subtasks',
    'status': 'in-progress'
},
{
    'id': '2',
    'category': 'Technical Task',
    'title': 'HTML Base Template Creation',
    'description': 'Create reusable HTML bas templates',
    'subtasks': '',
    'status': 'to-do'
},
{
    'id': '3',
    'category': 'Technical Task',
    'title': 'CSS Architecture Planning',
    'description': 'Build start page with recipe recommendation...',
    'subtasks': '2/2 Subtasks',
    'status': 'done'
},
{
    'id': '4',
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

    return /*html*/`
    <div draggable="true" onclick="openCard('${todo['category']}', '${todo['title']}', '${todo['description']}')" ondragstart="startDraggin(${todo['id']})" class="card">
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

function openCard(category, title, description) {

    document.getElementById('big-card-bg').style.display = 'flex';
    document.getElementById('big-card').classList.remove('d-none');
    document.getElementById('big-card').innerHTML = '';
    document.getElementById('big-card').innerHTML += generateBigCard(category, title, description);
    
    `
   
    `;
}

function generateBigCard(category, title, description) {
    let categoryColor = '';

    if (category === 'Technical Task') {
        categoryColor = '#005bf8';
    } else if (category === 'User Story') {
        categoryColor = '#FF7A00';
    }

    return /*html*/`
         <div class="first-section">
            <span class="label-big" style="background-color: ${categoryColor};">${category}</span>
            <img src="img/close.svg" id="close" onclick="closeCard()">
        </div>
        <span class="headline-big">${title}</span>
        <br>
        <div class="description-big">
            <span>${description}</span>
        </div>
        <div class="date-big">
            <span><b>Due date:</b></span><span>10/05/2023</span>
        </div>
        <div class="date-big">
            <span><b>Priority:</b></span><span>Medium<img src="img/prio-medium.svg"></span>
        </div>
        <div class="profiles-big">
            <span><b>Assigned To:</b></span>
            <span><img src="img/profile1.svg">Emmanuel Mauer</span>
            <span><img src="img/profile2.svg">Marcel Bauer</span>
            <span><img src="img/profile.svg">Anton Mayer</span>
        </div>
        <div class="subtasks-big">
            <span><b>Subtasks</b></span>
            <span><input type="checkbox">Implement Recipe Recommendation</span>
            <span><input type="checkbox">Start Page Layout</span>
        </div>
        <div class="end-section">
            <span><img src="img/delete.svg">Delete</span>
            |
            <span><img src="img/edit.svg">Edit</span>
        </div>
    `;
}

function closeCard() {
    document.getElementById('big-card').classList.add('d-none');
    document.getElementById('big-card-bg').style.display = 'none';
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