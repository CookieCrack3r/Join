let todo = [];
let currentDraggedElement;

async function initBoard() {
    await loadTodos();
    updateHTML();
    await displayOptions();
    await getInitials();

}

function updateHTML() {
    updateAwaitFeedback();
    updateInProgress();
    updateToDo();
    updateDone();
    updateProgressBar();
}

function updateDB() {
    setItem('todos', JSON.stringify(todo));
}

async function loadTodos() {
    try {
        todo = JSON.parse(await getItem('todos'));
        updateHTML();
    } catch (e) {
        console.error('Loading error:', e);
    }
}

function updateToDo() {
    let to_do = todo.filter(t => t['status'] == 'to-do');

    document.getElementById('todo').innerHTML = '';

    for (let i = 0; i < to_do.length; i++) {
        let todo = to_do[i];
        document.getElementById('todo').innerHTML += generateKanbanHTML(todo);

    }
}


function updateInProgress() {
    let progress = todo.filter(t => t['status'] == 'in-progress');

    document.getElementById('in-progress').innerHTML = '';

    for (let i = 0; i < progress.length; i++) {

        let todo = progress[i];
        document.getElementById('in-progress').innerHTML += generateKanbanHTML(todo);
    }
}

function updateAwaitFeedback() {
    let await = todo.filter(t => t['status'] == 'await-feedback');

    document.getElementById('await-feedback').innerHTML = '';

    for (let i = 0; i < await.length; i++) {

        let todo = await[i];
        document.getElementById('await-feedback').innerHTML += generateKanbanHTML(todo);
    }
}

function updateDone() {
    let done = todo.filter(t => t['status'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        let todo = done[i];
        document.getElementById('done').innerHTML += generateKanbanHTML(todo);

    }
}

function generateBackroundColor(category) {
    let categoryColor = '';

    if (category === 'Technical') {
        categoryColor = '#005bf8';
    } else if (category === 'Design') {
        categoryColor = '#FF7A00';
    }

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

    let subtaskCount = getSubtaskCount(todo['subtasks']);
    let completedSubtaskCount = getCompletedSubtaskCount(todo['subtasks']);

    let priorityImage = getPriorityImage(priority);
    let categoryColor = generateBackroundColor(category);

    return `
    <div draggable="true" onclick="openCard('${category}', '${title}', '${description}', '${date}', '${priority}', '${subtasks}')" ondragstart="startDraggin(${todo['id']})" class="card">
        <span class="label" style="background-color: ${categoryColor};">${category}</span>
                                <span class="description">
                                    <h3>${title}</h3><br>${description}
                                </span>
                                <div class="progress-section">
                                    <div class="progress-bar">
                                        <div class="progress"></div>
                                    </div>
                                    <div id="subtasks-count">${completedSubtaskCount}/${subtaskCount} Subtasks</div>
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
            `;
}

function updateProgressBar() {
    let progressBar = document.querySelector('.progress');

    if (currentDraggedElement !== undefined) {
        let todoItem = todo[currentDraggedElement];
        let subtaskCount = getSubtaskCount(todoItem['subtasks']);
        let completedSubtaskCount = getCompletedSubtaskCount(todoItem['subtasks']);
        let progressPercentage = (completedSubtaskCount / subtaskCount) * 100;

        progressBar.style.width = `${progressPercentage}%`;
    }
}

function openCard(category, title, description, date, priority, subtasks) {
    document.getElementById('big-card-bg').style.display = 'flex';
    document.getElementById('big-card').classList.remove('d-none');
    document.getElementById('big-card').innerHTML = '';
    document.getElementById('big-card').innerHTML += generateBigCard(category, title, description, date, priority, subtasks);
    createCheckboxes(subtasks);
}

function generateBigCard(category, title, description, date, priority, subtasks) {
    let priorityImage = getPriorityImage(priority);
    let categoryColor = generateBackroundColor(category);

    return `
        <div class="first-section">
            <span class="label-big" style="background-color: ${categoryColor};">${category}</span>
            <img src="img/close.svg" id="close" onclick="closeCard()">
        </div>
        <span class="headline-big" id="headline-big">${title}</span>
        <br>
        <div class="description-big" id="description-big">
            <span>${description}</span>
        </div>
        <div class="date-big">
            <span><b>Due date:</b></span><span id="date-big">${date}</span>
        </div>
        <div class="date-big">
            <span><b>Priority:</b></span><span id="priority-big">${priority}<img src="${priorityImage}"></span>
        </div>
        <div class="profiles-big">
            <span><b>Assigned To:</b></span>
            <span><img src="img/profile1.svg">Emmanuel Mauer</span>
            <span><img src="img/profile2.svg">Marcel Bauer</span>
            <span><img src="img/profile.svg">Anton Mayer</span>
        </div>
        <div class="subtasks-big">
            <span><b>Subtasks</b></span>
            <span id="checkboxes"></span>
        </div>
        <div class="end-section" id="end-section">
            <span onclick="deleteTodo()"><img src="img/delete.svg">Delete</span>
            |
            <span onclick="editTodo({
                category: '${category}',
                title: '${title}',
                description: '${description}',
                date: '${date}',
                priority: '${priority}',
                subtasks: '${subtasks}'
            })"><img src="img/edit.svg">Edit</span>
        </div>
    `;
}

function editTodo(card) {
    document.getElementById('headline-big').innerHTML = `<input value="${card.title}">`;
    document.getElementById('description-big').innerHTML = `<textarea>${card.description}</textarea>`;
    document.getElementById('date-big').innerHTML = `<input type="date" value="${card.date}">`;
    document.getElementById('priority-big').innerHTML = `<div class="priority-big-buttons">
       <button type="button" onclick="priorityUrgent()" id="urgent">Urgent<img id="urgent-img"
               src="img/urgent.png"></button>
       <button type="button" onclick="priorityMedium()" id="medium">Medium<img id="medium-img"
               src="img/medium.png"></button>
       <button type="button" onclick="priorityLow()" id="low">Low<img id="low-img"
               src="img/low.png"></button>
    </div>`;
    document.getElementById('end-section').innerHTML = `<span onclick=saveTodo('${card.title}', '${card.description}', '${card.date}')><img src=img/save.svg>Save</span>`;
}

async function saveTodo() {
    updateDB();
    updateHTML();
    closeCard();
}


function createCheckboxes(subtasks) {
    let checkboxesContainer = document.getElementById('checkboxes');
    checkboxesContainer.innerHTML = '';

    for (let i = 0; i < subtasks.length; i++) {
        let subtask = subtasks[i];
        let checkboxId = `checkbox${i}`;

        checkboxesContainer.innerHTML += `<input type="checkbox" id="${checkboxId}" ${subtask.checked ? 'checked' : ''} onchange="updateSubtaskStatus(${i})"> ${subtask.text}<br>`;
    }
}

function updateSubtaskStatus(index) {
    let checkbox = document.getElementById(`checkbox${index}`);

    if (checkbox && index !== undefined) {
        let todoItem = todo[index];

        let subtasks = todoItem['subtasks'];
        console.log(subtasks);

        // Ändern Sie den Status des Subtasks in Abhängigkeit vom Checkbox-Status
        subtasks[index].checked = checkbox.checked;

        // Aktualisieren Sie die Datenbank und das HTML
        updateDB();
        updateHTML();
    }
}


function getSubtaskCount(subtasks) {
    let nonEmptySubtasks = 3 //subtasks.filter(element => element.trim() !== '');

    return nonEmptySubtasks.length;
}

function getCompletedSubtaskCount(subtasks) {
    let completedSubtasks = 3 //subtasks.filter(element => element.trim().startsWith('✔'));

    return completedSubtasks.length;
}

function filterTodos() {
    let searchInput = document.getElementById('search').value.toLowerCase();

    let filteredTodos = todo.filter(t => t['title'].toLowerCase().includes(searchInput));

    document.getElementById('todo').innerHTML = '';
    for (let i = 0; i < filteredTodos.length; i++) {
        let filteredTodo = filteredTodos[i];
        document.getElementById('todo').innerHTML += generateKanbanHTML(filteredTodo);
    }
}

async function deleteTodo() {
    let titleToDelete = '';

    if (currentDraggedElement !== undefined) {
        titleToDelete = todo[currentDraggedElement]['title'];
        todo.splice(currentDraggedElement, 1);
    } else {
        let bigCardTitleElement = document.querySelector('.headline-big');
        if (bigCardTitleElement) {
            titleToDelete = bigCardTitleElement.textContent;
            let indexToDelete = todo.findIndex(t => t['title'] === titleToDelete);
            todo.splice(indexToDelete, 1);

            //if (indexToDelete !== -2) {
            //   todo.splice(indexToDelete, 1);
            //}
        }
    }

    await setItem('todos', JSON.stringify(todo));
    closeCard();
    updateHTML();
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
    todo[currentDraggedElement]['status'] = status;
    updateDB();
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