let todos = [];
let subtasks = [];

async function init() {
    await showContacts();
    await getInitials();
    displayOptions();
}

async function addTodo() {
    let todo = 'to-do';

    create.disabled = true;
    todos_length = JSON.parse(await getItem('todos')) || [];
    let newTodoId = todos_length.length - 1;
    newTodoId++;

    todos = JSON.parse(await getItem('todos')) || [];
    todos.push({
        id: newTodoId,
        title: title.value,
        description: descritpion.value,
        category: category.value,
        subtasks: subtasks,
        status: todo,
        priority: selectedPriority,
        date: selectedDate.value
    });

    await setItem('todos', JSON.stringify(todos));

    createTask();
}


let selectedPriority = 'Medium';

function priorityUrgent() {
    selectedPriority = 'Urgent';

    document.getElementById('urgent').style.backgroundColor = '#FF3D00';
    document.getElementById('urgent').style.color = 'white';
    document.getElementById('urgent-img').src = 'imgAddTask/urgent.svg';
    document.getElementById('medium').style.backgroundColor = 'white';
    document.getElementById('medium').style.color = 'black';
    document.getElementById('medium-img').src = 'imgAddTask/medium.svg';
    document.getElementById('low').style.backgroundColor = 'white';
    document.getElementById('low').style.color = 'black';
    document.getElementById('low-img').src = 'imgAddTask/low.png';
}

function priorityMedium() {
    selectedPriority = 'Medium';

    document.getElementById('urgent').style.backgroundColor = 'white';
    document.getElementById('urgent').style.color = 'black';
    document.getElementById('urgent-img').src = 'imgAddTask/urgent.png';
    document.getElementById('medium').style.backgroundColor = '#FFA800';
    document.getElementById('medium').style.color = 'white';
    document.getElementById('medium-img').src = 'imgAddTask/medium.png';
    document.getElementById('low').style.backgroundColor = 'white';
    document.getElementById('low').style.color = 'black';
    document.getElementById('low-img').src = 'imgAddTask/low.png';
}

function priorityLow() {
    selectedPriority = 'Low';

    document.getElementById('low').style.backgroundColor = '#7BE129';
    document.getElementById('low').style.color = 'white';
    document.getElementById('low-img').src = 'imgAddTask/low.svg';
    document.getElementById('medium').style.backgroundColor = 'white';
    document.getElementById('medium').style.color = 'black';
    document.getElementById('medium-img').src = 'imgAddTask/medium.svg';
    document.getElementById('urgent').style.backgroundColor = 'white';
    document.getElementById('urgent').style.color = 'black';
    document.getElementById('urgent-img').src = 'imgAddTask/urgent.png';
}

async function showContacts() {
    await loadContacts();

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let initials = getContactInitials(contact.name);
        document.getElementById('contacts').innerHTML += `
        <div class="contacts">
            <div class="sign" style="background-color: ${contact.backgroundColor}">${initials}</div>
            <div>${contact.name}</div>
        </div>
        `;
    }
}

function addSubtask() {
    let subtask = document.getElementById('subtasks').value;

    document.getElementById('subtasks-list').innerHTML += `
    <li>${subtask}</li>
`;

    document.getElementById('subtasks').value = '';

    let subtasksObject = {
        text: subtask,
        checked: false // Standardmäßig auf false setzen
    };
    subtasks.push(subtasksObject);
}



function createTask() {
    create.disabled = false;
    window.location.href = '/Board/board.html';
}

//this function is to get the user initials 

async function getInitials() {
    UserInitials = await getItem('userInitial');
    UserName = await getItem('userName');
    const kanban = document.getElementById("kanban");
    kanban.innerHTML += `<div onclick="displayOptions()">
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

function goToLogin() {
    window.location.pathname = '/Login/login.html';
}