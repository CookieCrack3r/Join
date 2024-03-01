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

    var urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('urlParam')) {
        var paramValue = urlParams.get('urlParam');
        todo = paramValue;
    }




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
    document.getElementById('contacts').innerHTML = '';

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

    let existingContactIndex = contactsObject.findIndex(existingContact => existingContact.id === contactToAdd.id);

    if (existingContactIndex !== -1) {
        contactsObject.splice(existingContactIndex, 1);
        contactElement.innerHTML = contactToAdd.name;
        displayFeedback('Contact removed successfully!');
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
        let subtaskIndex = subtasks.length;
        document.getElementById('subtasks-list').innerHTML += `<li><span>${subtaskText}</span><input type="text" id="editSubtaskInput${subtaskIndex}" style="display: none;"><div><button onclick="editSubtask(${subtaskIndex})"><img src="imgAddTask/edit.svg"></button><button onclick="deleteSubtask(${subtaskIndex})"><img src="imgAddTask/delete.svg"></button></div></li>`;

        let subtasksObject = {
            text: subtaskText,
            checked: false
        };
        subtasks.push(subtasksObject);

        subtaskInput.value = '';
    } else {
        displayFeedback('Subtask cannot be empty!');
    }
}

function editSubtask(index) {
    let subtaskElement = document.getElementById(`editSubtaskInput${index}`);
    let subtaskSpan = document.querySelector(`#subtasks-list li:nth-child(${index + 1}) span`);

    if (subtaskElement.style.display === 'none') {
        subtaskElement.style.display = 'inline';
        subtaskElement.value = subtasks[index].text;
        subtaskSpan.style.display = 'none';
        subtaskElement.focus();
    } else {
        subtasks[index].text = subtaskElement.value;
        subtaskSpan.textContent = subtasks[index].text;
        subtaskElement.style.display = 'none';
        subtaskSpan.style.display = 'inline';
    }
}

function deleteSubtask(index) {
    subtasks.splice(index, 1);
    displaySubtasks();
}

function displaySubtasks() {
    let subtasksList = document.getElementById('subtasks-list');
    subtasksList.innerHTML = '';

    subtasks.forEach((subtask, index) => {
        subtasksList.innerHTML += `<li>${subtask.text}<div><button><img src="imgAddTask/edit.svg"></button><button onclick="deleteSubtask(${index})"><img src="imgAddTask/delete.svg"></button></div></li>`;
    });
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

    contactsAddTask = JSON.parse(await getItem('contacts')) || [];
    contactsObject = [];

    await showContacts();
}



async function getInitials() {
    UserInitials = await getItem('userInitial');
    UserName = await getItem('userName');
    const kanban = document.getElementById("kanban");
    kanban.innerHTML += `<div onclick="displayOptions()">
      ${UserInitials}
      </div>`;
}



function displayOptions() {
    const options = document.getElementById("options");
    options.style.display = '';
    const isDisplayed = options.classList.toggle("dNone");
  
    if (isDisplayed) {
      document.getElementById('options').style.display = 'none';
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