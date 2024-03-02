let todo = [];
let currentDraggedElement;

async function initBoard() {
    await includeHTML();
    await loadTodos();
    await getInitials();
    await displayOptions();
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
    if (to_do.length === 0) {
        document.getElementById('todo').innerHTML = '<span class="no-tasks">No tasks added</span>';
    } else {
        for (let i = 0; i < to_do.length; i++) {
            let todo = to_do[i];
            document.getElementById('todo').innerHTML += generateKanbanHTML(todo);
        }
    }
}

function updateInProgress() {
    let progress = todo.filter(t => t['status'] == 'in-progress');
    document.getElementById('in-progress').innerHTML = '';
    if (progress.length === 0) {
        document.getElementById('in-progress').innerHTML = '<span class="no-tasks">No tasks added</span>';
    } else {
        for (let i = 0; i < progress.length; i++) {
            let todo = progress[i];
            document.getElementById('in-progress').innerHTML += generateKanbanHTML(todo);
        }
    }
}

function updateAwaitFeedback() {
    let awaitFeedback = todo.filter(t => t['status'] == 'await-feedback');
    document.getElementById('await-feedback').innerHTML = '';
    if (awaitFeedback.length === 0) {
        document.getElementById('await-feedback').innerHTML = '<span class="no-tasks">No tasks added</span>';
    } else {
        for (let i = 0; i < awaitFeedback.length; i++) {
            let todo = awaitFeedback[i];
            document.getElementById('await-feedback').innerHTML += generateKanbanHTML(todo);
        }
    }
}

function updateDone() {
    let done = todo.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';
    if (done.length === 0) {
        document.getElementById('done').innerHTML = '<span class="no-tasks">No tasks added</span>';
    } else {
        for (let i = 0; i < done.length; i++) {
            let todo = done[i];
            document.getElementById('done').innerHTML += generateKanbanHTML(todo);
        }
    }
}

function generateBackroundColor(category) {
    let categoryColor = { 'Technical': '#005bf8', 'Design': '#FF7A00' };
    return categoryColor[category];
}

function getPriorityImage(priority) {
    const priorityImages = {
        'Low': 'img/low.png',
        'Medium': 'img/medium.svg',
        'Urgent': 'img/urgent.png'
    };
    return priorityImages[priority] || 'img/medium.svg';
}

function generateKanbanHTML(todo) {
<<<<<<< HEAD
    let { category, title, subtasks, description, priority, date, id } = todo;
=======
    let category = todo['category'];
    let title = todo['title'];
    let subtasks = todo['subtasks'];
    let description = todo['description'];
    let priority = todo['priority'];
    let date = todo['date'];
    let id = todo['id'];
    let status = todo['status'];

>>>>>>> parent of 68ee0d3 (added contact preview at board)
    let subtaskCount = getSubtaskCount(todo, id);
    let completedSubtaskCount = getCompletedSubtaskCount(todo, id);

    let priorityImage = getPriorityImage(priority);
    let categoryColor = generateBackroundColor(category);
<<<<<<< HEAD
    let progressPercentage = subtaskCount === 0 ? 0 : (completedSubtaskCount / subtaskCount) * 100;
    let progressBarSection = subtaskCount > 0 ? `
        <div class="progress-section"><div class="progress-bar"><div class="progress" style="width: ${progressPercentage}%"></div></div><div id="subtasks-count">${completedSubtaskCount}/${subtaskCount} Subtasks</div></div>` : '';
    return `
        <div id=${id} draggable="true" onclick="openCard('${category}', '${title}', '${description}', '${id}', '${date}', '${priority}', '${subtasks}')" ondragstart="startDraggin(${todo['id']})" class="card"><span class="label" style="background-color: ${categoryColor};">${category}</span><span class="description"><h3>${title}</h3><br>${description}</span>${progressBarSection}<div class="members-and-priority"><div class="members">${getContactsPic(id)}</div> <div class="priority"><img src="${priorityImage}"></div></div><div class="mobileButtons"><button onclick="categoryUp(${id}, event)"><img src="img/up.png"></button><button onclick="categoryDown(${id}, event)"><img src="img/down.png"></button></div></div>`;
}

=======

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
        <div class="mobileButtons">
            <button onclick="categoryUp(${id}, event)"><img src="img/up.png"></button>
            <button onclick="categoryDown(${id}, event)"><img src="img/down.png"></button>
        </div>
    </div>`;
}

>>>>>>> parent of 68ee0d3 (added contact preview at board)
function categoryUp(id, event) {
    event.stopPropagation();
    moveCategoryUp(id);
}

function categoryDown(id, event) {
    event.stopPropagation();
    moveCategoryDown(id);
}

function moveCategoryUp(id) {
    const index = todo.findIndex(item => item.id === id);
    const currentCategory = todo[index].category;
    const filteredTasks = todo.filter(task => task.category === currentCategory);
    const taskIndex = filteredTasks.findIndex(task => task.id === id);
    const newTaskIndex = (taskIndex - 1 + filteredTasks.length) % filteredTasks.length;
    if (taskIndex !== -1) {
        todo[index].status = updateStatusBasedOnPrevious(todo[index].status);
        [filteredTasks[taskIndex], filteredTasks[newTaskIndex]] = [filteredTasks[newTaskIndex], filteredTasks[taskIndex]];
        updateDB();
        updateHTML();
    }
}

function moveCategoryDown(id) {
    const index = todo.findIndex(item => item.id === id);
    const currentCategory = todo[index].category;
    const filteredTasks = todo.filter(task => task.category === currentCategory);
    const taskIndex = filteredTasks.findIndex(task => task.id === id);
    const newTaskIndex = (taskIndex + 1) % filteredTasks.length;
    if (taskIndex !== -1) {
        todo[index].status = updateStatusBasedOnCurrent(todo[index].status);
        [filteredTasks[taskIndex], filteredTasks[newTaskIndex]] = [filteredTasks[newTaskIndex], filteredTasks[taskIndex]];
        updateDB();
        updateHTML();
    }
}

function updateStatusBasedOnCurrent(status) {
    switch (status) {
        case 'to-do':
            return 'in-progress';
        case 'in-progress':
            return 'await-feedback';
        case 'await-feedback':
            return 'done';
        case 'done':
            return status;
    }
}

function updateStatusBasedOnPrevious(status) {
    switch (status) {
        case 'done':
            return 'await-feedback';
        case 'await-feedback':
            return 'in-progress';
        case 'in-progress':
            return 'to-do';
        case 'to-do':
            return status;
    }
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
<<<<<<< HEAD
        <div class="first-section"><span class="label-big" style="background-color: ${categoryColor};">${category}</span><img src="img/close.svg" id="close" onclick="closeCard()"></div><span class="headline-big" id="headline-big">${title}</span><br><div class="description-big" id="description-big"><span>${description}</span></div><div class="date-big"><span><b>Due date:</b></span><span id="date-big">${date}</span></div><div class="date-big"><span><b>Priority:</b></span><span id="priority-big">${priority}<img src="${priorityImage}"></span></div><div class="profiles-big"><span><b>Assigned To:</b></span><div class="assigned-contacts-big">${getContactsBig(id)}</div></div><div class="subtasks-big"><span><b>Subtasks</b></span><span id="checkboxes"></span></div><div class="end-section" id="end-section"><span onclick="deleteTodo(${id})"><img src="img/delete.svg">Delete</span>
            | <span onclick="editTodo({category: '${category}',title: '${title}',description: '${description}',id: '${id}',date: '${date}',priority: '${priority}',subtasks: '${subtasks}'})"><img src="img/edit.svg">Edit</span></div>
=======
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
            <span onclick="deleteTodo(${id})"><img src="img/delete.svg">Delete</span>
            |
            <span onclick="editTodo({
                category: '${category}',
                title: '${title}',
                description: '${description}',
                id: '${id}',
                date: '${date}',
                priority: '${priority}',
                subtasks: '${subtasks}'
            })"><img src="img/edit.svg">Edit</span>
        </div>
>>>>>>> parent of 68ee0d3 (added contact preview at board)
    `;
}

function getContacts(id) {
    try {
        let names = '';

        for (let i = 0; i < todo[id].contacts.length; i++) {

            names += `<span>${todo[id].contacts[i].name}</span>`;
        }
        return names;
    } catch (error) {
        console.error("Error occurred while getting contacts:", error);
    }
}
<<<<<<< HEAD

function getContactInitials(contact) {
    const initials = contact.name.split(' ').map(part => part[0].toUpperCase()).join('');
    return initials;
}
=======
>>>>>>> parent of 68ee0d3 (added contact preview at board)

function getContactsPic(id) {
    try {
        let pics = '';
        if (todo[id]) {

            for (let i = 0; i < todo[id].contacts.length; i++) {

                pics += ``;

            }
        }
        return pics;
    } catch (error) {
        console.error("Error occurred while getting contacts:", error);
    }
}

<<<<<<< HEAD
function getContactsBig(id) {
    try {
        let contactsBig = '';

        if (todo[id]) {
            for (let i = 0; i < todo[id].contacts.length; i++) {
                let contact = todo[id].contacts[i];
                let contactInitials = getContactInitials(contact);
                let contactColor = todo[id].contacts[i].backgroundColor;
                contactsBig += `
                    <div class="contacts-big-both"><span class="big-names">${contact.name}</span><div class="board-sign" style="background-color: ${contactColor}">${contactInitials}</div></div>
                `;
            }
        }
        return contactsBig;
    } catch (error) {
        console.error("Error occurred while getting contacts:", error);
    }
}

=======
>>>>>>> parent of 68ee0d3 (added contact preview at board)
function editTodo(card) {
    let idInput = card.id;
    document.getElementById('headline-big').innerHTML = `<input id="titleinput" value="${card.title}">`;
    document.getElementById('description-big').innerHTML = `<textarea id="textinput">${card.description}</textarea>`;
    document.getElementById('date-big').innerHTML = `<input id="dateinput" type="date" value="${card.date}">`;
    document.getElementById('priority-big').innerHTML = `<div class="priority-big-buttons"><button type="button" onclick="priorityUrgent()" id="urgent">Urgent<img id="urgent-img"src="img/urgent.png"></button><button type="button" onclick="priorityMedium()" id="medium">Medium<img id="medium-img"src="img/medium.png"></button><button type="button" onclick="priorityLow()" id="low">Low<img id="low-img"src="img/low.png"></button></div>`;
    document.getElementById('checkboxes').innerHTML = '';
    for (let i = 0; i < todo[idInput].subtasks.length; i++) {
        let subtaskText = todo[idInput].subtasks[i]['text'];
        let subtaskChecked = todo[idInput].subtasks[i]['checked'];

        let checkboxId = `checkbox${i}`;

        document.getElementById('checkboxes').innerHTML += `
            <div><input type="text" id="${checkboxId}" value="${subtaskText}" ${subtaskChecked ? 'checked' : ''}></div>`;
    }
    document.getElementById('end-section').innerHTML = `<span onclick="saveTodo('${idInput}')"><img src=img/save.svg>Save</span>`;
}

function saveTodo(idInput) {
    let titleinput = document.getElementById('titleinput').value;
    let textinput = document.getElementById('textinput').value;
    let dateinput = document.getElementById('dateinput').value;

    todo[idInput].title = titleinput;
    todo[idInput].description = textinput;
    todo[idInput].date = dateinput;

    for (let i = 0; i < todo[idInput].subtasks.length; i++) {
        let checkboxId = `checkbox${i}`;
        todo[idInput].subtasks[i]['text'] = document.getElementById(checkboxId).value;
        todo[idInput].subtasks[i]['checked'] = document.getElementById(checkboxId).checked;
    }
    updateDB();
    updateHTML();
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

async function filterTodos() {
    let searchInput = document.getElementById('search').value.trim().toLowerCase();
    let filteredTodos = todo.filter(t => 
        t['title'].toLowerCase().includes(searchInput) ||
        t['description'].toLowerCase().includes(searchInput)
    );
    let filteredTodo = filteredTodos.filter(t => t['status'] == 'to-do');
    let filteredInprogress = filteredTodos.filter(t => t['status'] == 'in-progress');
    let filteredAwaitFeedback = filteredTodos.filter(t => t['status'] == 'await-feedback');
    let filteredDone = filteredTodos.filter(t => t['status'] == 'done');
    document.getElementById('todo').innerHTML = '';
    document.getElementById('in-progress').innerHTML = '';
    document.getElementById('await-feedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < filteredTodo.length; i++) {
        let filterTodo = filteredTodo[i];
        document.getElementById('todo').innerHTML += generateKanbanHTML(filterTodo);
    } for (let i = 0; i < filteredInprogress.length; i++) {
        let filterInprogress = filteredInprogress[i];
        document.getElementById('in-progress').innerHTML += generateKanbanHTML(filterInprogress);
    } for (let i = 0; i < filteredAwaitFeedback.length; i++) {
        let filterAwaitFeedback = filteredAwaitFeedback[i];
        document.getElementById('await-feedback').innerHTML += generateKanbanHTML(filterAwaitFeedback);
    } for (let i = 0; i < filteredDone.length; i++) {
        let filterDone = filteredDone[i];
        document.getElementById('done').innerHTML += generateKanbanHTML(filterDone);
    }
}

async function deleteTodo(id) {
    let titleToDelete = '';
    if (todo[id] !== undefined) {
        titleToDelete = todo[id]['title'];
        todo.splice(id, 1);
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

function addTask(urlParam) {
    var url = '/AddTask/addTask.html';
    if (urlParam !== undefined && urlParam !== null) {
        url += '?urlParam=' + urlParam;
    }
    window.location.href = url;
}

<<<<<<< HEAD
=======


<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 3b14cef90a8f5783d3c71594248ac76e994278d6
=======
>>>>>>> 3b14cef90a8f5783d3c71594248ac76e994278d6
=======
>>>>>>> 3b14cef90a8f5783d3c71594248ac76e994278d6
async function getInitials() {
    UserInitials = await getItem('userInitial');
    UserName = await getItem('userName');
    const kanban = document.getElementById("kanban");
    kanban.innerHTML += `<div onclick="displayOptions()">
      ${UserInitials}
      </div>`;
}

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
async function displayOptions() {
=======


function displayOptions() {
>>>>>>> 3b14cef90a8f5783d3c71594248ac76e994278d6
    const options = document.getElementById("options");
    options.style.display = '';
    const isDisplayed = options.classList.toggle("dNone");
<<<<<<< HEAD
=======
  
>>>>>>> 3b14cef90a8f5783d3c71594248ac76e994278d6
    if (isDisplayed) {
      document.getElementById('options').style.display = 'none';
    }
<<<<<<< HEAD
    if (isDisplayed && !options.innerHTML.trim()) {
        options.innerHTML = /*html*/`
      <div class="option"><a href="/PrivacyPolicy/privacypolicy.html">Privacy Policy</a></div>
      <div class="option"><a href="/LegalNotice/legalnotice.html">Legal Notice</a></div>
      <div class="option" onclick="goToLogin()">Log out</div>
    `;
=======
  
    if (isDisplayed && !options.innerHTML.trim()) {
=======


function displayOptions() {
    const options = document.getElementById("options");
    options.style.display = '';
    const isDisplayed = options.classList.toggle("dNone");
  
    if (isDisplayed) {
      document.getElementById('options').style.display = 'none';
    }
  
    if (isDisplayed && !options.innerHTML.trim()) {
>>>>>>> 3b14cef90a8f5783d3c71594248ac76e994278d6
      options.innerHTML = /*html*/`
        <div class="option"><a href="/PrivacyPolicy/privacypolicy.html">Privacy Policy</a></div>
        <div class="option"><a href="/LegalNotice/legalnotice.html">Legal Notice</a></div>
        <div class="option" onclick="goToLogin()">Log out</div>
      `;
<<<<<<< HEAD
>>>>>>> 3b14cef90a8f5783d3c71594248ac76e994278d6
=======
>>>>>>> 3b14cef90a8f5783d3c71594248ac76e994278d6
    }
=======
>>>>>>> 3b14cef90a8f5783d3c71594248ac76e994278d6
   
  }
  