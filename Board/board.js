let todo = [];

let currentDraggedElement;

async function initBoard() {
    await loadTodos(); 
    updateHTML();
    console.log(currentDraggedElement);

}

function updateHTML() {
    updateAwaitFeedback();
    updateInProgress();
    updateToDo();
    updateDone();
}

async function loadTodos(){
    try {
        todo = JSON.parse(await getItem('todos'));
        updateHTML();
    } catch(e){
        console.error('Loading error:', e);
    }
}

function updateToDo() {
    let to_do = todo.filter(t => t['status'] == 'to-do');

    document.getElementById('todo').innerHTML = '';
        if(to_do = !null){

    for (let i = 0; i < to_do.length; i++) {
        let todo = to_do[i];
        document.getElementById('todo').innerHTML += generateKanbanHTML(todo);
    }}
}

function updateInProgress() {
<<<<<<< HEAD
    let progress = todos.filter(t => t['status'] == 'in-progress');
if(progress = !null){
=======
    let progress = todo.filter(t => t['status'] == 'in-progress');

>>>>>>> 7e09be9d9f3b3b3d567293d7a88b11e711bc1e9e
    document.getElementById('in-progress').innerHTML = '';

    for (let i = 0; i < progress.length; i++) {
        
        let todo = progress[i];
        document.getElementById('in-progress').innerHTML += generateKanbanHTML(todo);
    }}
}

function updateAwaitFeedback() {
    let await = todo.filter(t => t['status'] == 'await-feedback');

    document.getElementById('await-feedback').innerHTML = '';

    for (let i = 0; i < await.length; i++) {
        if(dome = !null){
        let await = await[i];
        document.getElementById('await-feedback').innerHTML += generateKanbanHTML(todo)};
    }
}

function updateDone() {
    let done = todo.filter(t => t['status'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        if(dome = !null){
        let todo = done[i];
        document.getElementById('done').innerHTML += generateKanbanHTML(todo);}
    }
}

function generateBackroundColor(category) {
    let categoryColor = '';

    if (category === 'Technical') {
        categoryColor = '#005bf8';
    } else if (category === 'Design') {
        categoryColor = '#FF7A00';
    }

<<<<<<< HEAD
    return `
             <div draggable="true" ondragstart="startDraggin(${todo['id']})" class="card">
             <span class="label" style="background-color: ${categoryColor};">${todo['category']}</span>
                                <span class="description">
                                    <h3>${todo['title']}</h3><br>${todo['id']}
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
=======
    return categoryColor;
}

function getPriorityImage(priority) {
    if (priority === 'Low') {
        return 'img/low.png';
    } else if (priority === 'Medium') {
        return 'img/medium.svg';
    } else if (priority === 'Urgent') {
        return 'img/urgent.png';
    } else {
        return 'img/medium.svg';
    }
}

function generateKanbanHTML(todo) {
    let category = todo['category'];
    let title = todo['title'];
    let subtasks = todo['subtasks'];
    let description = todo['description'];
    let priority = todo['priority'];
    let date = todo['date'];

    let priorityImage = getPriorityImage(priority);
    let categoryColor = generateBackroundColor(category);
    
    return /*html*/`
    <div draggable="true" onclick="openCard('${category}', '${title}', '${description}', '${date}', '${priority}')" ondragstart="startDraggin(${todo['id']})" class="card">
        <span class="label" style="background-color: ${categoryColor};">${category}</span>
        <span class="description">
            <h3>${title}</h3><br>${description}
        </span>
        <div class="progress-section">
            <div class="progress-bar">
                <div class="progress"></div>
            </div>
            <div>${subtasks}</div>
        </div>
        <div class="members-and-priority">
            <div class="members">
                <img src="img/profile.svg">
                <img src="img/profile1.svg">
                <img src="img/profile2.svg">
            </div>
            <div class="priority">
                <img src="${priorityImage}">
            </div>
        </div>
    </div>            
>>>>>>> 7e09be9d9f3b3b3d567293d7a88b11e711bc1e9e
    `;
}

function openCard(category, title, description, date, priority) {
    document.getElementById('big-card-bg').style.display = 'flex';
    document.getElementById('big-card').classList.remove('d-none');
    document.getElementById('big-card').innerHTML = '';
    document.getElementById('big-card').innerHTML += generateBigCard(category, title, description, date, priority);
}

function generateBigCard(category, title, description, date, priority) {
    let priorityImage = getPriorityImage(priority);
    let categoryColor = generateBackroundColor(category);

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
            <span><b>Due date:</b></span><span>${date}</span>
        </div>
        <div class="date-big">
            <span><b>Priority:</b></span><span>${priority}<img src="${priorityImage}"></span>
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
    console.log(todos[currentDraggedElement]['status']);
    console.log(todos[currentDraggedElement]['id']);

}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
<<<<<<< HEAD
        console.log(todos[currentDraggedElement]['status']);
    todos[currentDraggedElement]['status'] = status;
        console.log(todos[currentDraggedElement]['status']);
=======
    todo[currentDraggedElement]['status'] = status;
>>>>>>> 7e09be9d9f3b3b3d567293d7a88b11e711bc1e9e
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