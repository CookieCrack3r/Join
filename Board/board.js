let todo = [];
let currentDraggedElement;

async function initBoard() {
    await includeHTML();
    await getInitials();
    await displayOptions();
    await loadTodos();
    updateHTML();
}

function updateHTML() {
    updateAwaitFeedback();
    updateInProgress();
    updateToDo();
    updateDone();
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
    let id = todo['id'];

    let subtaskCount = getSubtaskCount(todo, id);
    let completedSubtaskCount = getCompletedSubtaskCount(todo, id);

    let priorityImage = getPriorityImage(priority);
    let categoryColor = generateBackroundColor(category);

    let progressPercentage = subtaskCount === 0 ? 0 : (completedSubtaskCount / subtaskCount) * 100;

    let progressBarSection = '';
    if (subtaskCount > 0) {
        progressBarSection = `
            <div class="progress-section">
                <div class="progress-bar">
                    <div class="progress" style="width: ${progressPercentage}%">
                    </div>
                </div>
                <div id="subtasks-count">${completedSubtaskCount}/${subtaskCount} Subtasks</div>
            </div>`;
    }

    return `
    <div id=${id} draggable="true" onclick="openCard('${category}', '${title}', '${description}', '${id}', '${date}', '${priority}', '${subtasks}')" ondragstart="startDraggin(${todo['id']})" class="card">
        <span class="label" style="background-color: ${categoryColor};">${category}</span>
        <span class="description">
            <h3>${title}</h3><br>${description}
        </span>
        ${progressBarSection}
        <div class="members-and-priority">
            <div class="members">
                ${getContactsPic(id)}
            </div>
            <div class="priority">
                <img src="${priorityImage}">
            </div>
        </div>
    </div>`;
}

function openCard(category, title, description, id, date, priority, subtasks) {
    document.getElementById('big-card-bg').style.display = 'flex';
    document.getElementById('big-card').classList.remove('d-none');
    document.getElementById('big-card').innerHTML = '';
    document.getElementById('big-card').innerHTML += generateBigCard(category, title, description, id, date, priority, subtasks);

    createCheckboxes(id, subtasks);
}

function generateBigCard(category, title, description, id, date, priority, subtasks) {
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

            ${getContacts(id)}
            
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

function getContacts(id) {
    let names = '';

    if(todo[id])
    console.log(todo[id].contacts);

    for (let i = 0; i < todo[id].contacts.length; i++) {
        names += `<span><img src="img/profile.svg">${todo[id].contacts[i].name}</span>`;
    }
    return names;
}

function getContactsPic(id) {
    let pics = '';

    console.log("todo id pics");

    if (todo[id]) {
        
        for (let i = 0; i < todo[id].contacts.length; i++) {

            pics += `<img src="img/profile.svg">`;

        }
    }

    return pics;
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
    //updateHTML();
    closeCard();
}


function createCheckboxes(id, subtasks) {
    let checkboxesContainer = document.getElementById('checkboxes');
    checkboxesContainer.innerHTML = '';


    for (let i = 0; i < todo[id].subtasks.length; i++) {
        let subtaskText = todo[id].subtasks[i]['text'];
        let subtaskChecked = todo[id].subtasks[i]['checked'];


        let checkboxId = `checkbox${i}`;

        checkboxesContainer.innerHTML += `<input type="checkbox" id="${checkboxId}" ${subtaskChecked ? 'checked' : ''} onchange="updateSubtaskStatus(${i}, ${id})"> ${subtaskText}<br>`;
    }
}

function updateSubtaskStatus(i, id) {

    if (todo[id].subtasks[i]['checked'] == false) {
        todo[id].subtasks[i]['checked'] = true;

    } else
        todo[id].subtasks[i]['checked'] = false;


    updateDB();
    updateHTML();
}


function getSubtaskCount(todo, id) {
    let subtasks = todo['subtasks'];

    return subtasks.length;
}

function getCompletedSubtaskCount(todo, id) {
    let Subtasks = todo['subtasks'];
    let subtasksLength = Subtasks.filter(t => t['checked'] == true);

    return subtasksLength.length;
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


//this function is to get the user initials
async function getInitials() {
    UserInitials = await getItem('userInitial');
    UserName = await getItem('userName');
    const kanban = document.getElementById("kanban");
    kanban.innerHTML += `<div onclick="displayOptions()" id="initials">
      ${UserInitials}
      </div>`;
}

//this function is to open the submenu for the logout

async function displayOptions() {
    const options = document.getElementById("options");
    const isDisplayed = options.classList.toggle("dNone");

    if (isDisplayed) {
        document.getElementById('d_none_svg').style.display = 'none';
    }

    if (isDisplayed && !options.innerHTML.trim()) {
        options.innerHTML = /*html*/`
      <div class="option"><a href="/PrivacyPolicy/privacypolicy.html">Privacy Policy</a></div>
      <div class="option"><a href="/LegalNotice/legalnotice.html">Legal Notice</a></div>
      <div class="option" onclick="goToLogin()">Log out</div>

    `;
    }
}
