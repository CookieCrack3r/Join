let todos = [];
let subtasks = [];
let contactsObject = [];
let contactsAddTask = [];

async function initTask() {
    todos = JSON.parse(await getItem('todos')) || [];

    contactsAddTask = JSON.parse(await getItem('contacts')) || [];
    await showContacts();
    await getInitials();
    displayOptions();
    await setMinDate();

}

async function addTodo() {
    let todo = 'to-do';

    create.disabled = true;
    todos_length = JSON.parse(await getItem('todos')) || [];
    let newTodoId = todos_length.length - 1;
    newTodoId++;

    todos.push({
        id: newTodoId,
        title: title.value,
        description: descritpion.value,
        category: category.value,
        subtasks: subtasks,
        contacts: contactsObject,
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
    document.getElementById('urgent-img').src = '/AddTask/imgAddTask/urgent.svg';
    document.getElementById('medium').style.backgroundColor = 'white';
    document.getElementById('medium').style.color = 'black';
    document.getElementById('medium-img').src = '/AddTask/imgAddTask/medium.svg';
    document.getElementById('low').style.backgroundColor = 'white';
    document.getElementById('low').style.color = 'black';
    document.getElementById('low-img').src = '/AddTask/imgAddTask/low.png';
}

function priorityMedium() {
    selectedPriority = 'Medium';

    document.getElementById('urgent').style.backgroundColor = 'white';
    document.getElementById('urgent').style.color = 'black';
    document.getElementById('urgent-img').src = '/AddTask/imgAddTask/urgent.png';
    document.getElementById('medium').style.backgroundColor = '#FFA800';
    document.getElementById('medium').style.color = 'white';
    document.getElementById('medium-img').src = '/AddTask/imgAddTask/medium.png';
    document.getElementById('low').style.backgroundColor = 'white';
    document.getElementById('low').style.color = 'black';
    document.getElementById('low-img').src = '/AddTask/imgAddTask/low.png';
}

function priorityLow() {
    selectedPriority = 'Low';

    document.getElementById('low').style.backgroundColor = '#7BE129';
    document.getElementById('low').style.color = 'white';
    document.getElementById('low-img').src = '/AddTask/imgAddTask/low.svg';
    document.getElementById('medium').style.backgroundColor = 'white';
    document.getElementById('medium').style.color = 'black';
    document.getElementById('medium-img').src = '/AddTask/imgAddTask/medium.svg';
    document.getElementById('urgent').style.backgroundColor = 'white';
    document.getElementById('urgent').style.color = 'black';
    document.getElementById('urgent-img').src = '/AddTask/imgAddTask/urgent.png';
}

async function showContacts() {
    console.log(todos);

    for (let i = 0; i < contactsAddTask.length; i++) {
        let contact = contactsAddTask[i];
        let initials = getContactInitials(contact.name);
        document.getElementById('contacts').innerHTML += `
        <div class="contacts" id="contact-${i}">
            <div class="signContainer">
                <div class="sign" style="background-color: ${contact.backgroundColor}">${initials}</div>
                <div id="added-${i}">${contact.name}</div>
            </div>
            <button type="button" onclick="addContactToTodo(${i})"><img src="imgAddTask/add.svg"></button>
        </div>
        `;
    }
}

function addContactToTodo(i) {
    let contactElement = document.getElementById(`added-${i}`);
    let contactToAdd = contactsAddTask[i];

    if (contactsObject.some(existingContact => existingContact.id === contactToAdd.id)) {
        displayFeedback('Contact already added!');
    } else {
        contactsObject.push({
            id: contactToAdd.id,
            name: contactToAdd.name,
            mail: contactToAdd.mail,
            phone: contactToAdd.phone,
            backgroundColor: getRandomColor()
        });

        contactElement.innerHTML += ' <i>(added)</i>';
        displayFeedback('Contact added successfully!');
    }
}

function displayFeedback(message) {
    const feedbackContainer = document.getElementById('feedback');
    feedbackContainer.innerHTML = message;

    setTimeout(() => {
        feedbackContainer.innerHTML = '';
    }, 1500);
}

function addSubtask() {
    let subtaskInput = document.getElementById('subtasks');
    let subtaskText = subtaskInput.value.trim();

    if (subtaskText !== '') {
        document.getElementById('subtasks-list').innerHTML += `<li>${subtaskText}</li>`;

        let subtasksObject = {
            text: subtaskText,
            checked: false // Standardmäßig auf false setzen
        };
        subtasks.push(subtasksObject);

        subtaskInput.value = '';
    } else {
        displayFeedback('Subtask cannot be empty!');
    }
}

async function setMinDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("selectedDate").min = today;
}

function createTask() {
    create.disabled = false;
    window.location.href = '/Board/board.html';
}

async function clearInputs() {
    document.getElementById('title').value = '';
    document.getElementById('descritpion').value = '';
    document.getElementById('selectedDate').value = '';
    
    document.getElementById('category').selectedIndex = 0;

    document.getElementById('subtasks').value = '';
    document.getElementById('subtasks-list').innerHTML = '';

    priorityMedium();
    await showContacts();
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