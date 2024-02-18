let contacts = [];
let colors = ["#9327FF", "#FF7900", "#6E52FF", "#FC71FF", "#FFBB2C", "#1CD7C1", "#462F8A", "#FF4647"];

// async function init() {
//   console.log("dsfg");
//   await getInitials();
//   displayOptions();
// }

async function createContact() {
  contacts_length = JSON.parse(await getItem('contacts')) || [];
  let newcontactsId = contacts_length.length - 1;
  newcontactsId++;


  contacts = JSON.parse(await getItem('contacts')) || [];
  contacts.push({
    id: newcontactsId,
    name: nameInput.value,
    mail: mail.value,
    phone: phone.value,
    backgroundColor: getRandomColor()
  });

  await setItem('contacts', JSON.stringify(contacts));
  closeCard();
  generateContacts();
}

async function loadContacts() {
  try {
    contacts = JSON.parse(await getItem('contacts')) || [];
    generateContacts();
    console.log(contacts);
  } catch (e) {
    console.error('Loading error:', e);
  }
}

function addContact() {
  document.getElementById('addNewContact').classList.remove('displayNone');
  document.getElementById('bg').style.display = 'flex';
}

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function generateContacts() {
  document.getElementById('allContacts').innerHTML = '';

  contacts.sort((a, b) => a.name.localeCompare(b.name));

  let processedInitials = [];

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const initials = getContactInitials(contact.name);

    if (!processedInitials.includes(initials[0])) {
      document.getElementById('allContacts').innerHTML += `
        <div>
          <span class="alphabet">${initials[0]}<div class="borderBottom"></div></span>
        </div>
      `;
      processedInitials.push(initials[0]);
    }
    document.getElementById('allContacts').innerHTML += `
      <div id="${contact.id}" class="contact" onclick="openContact(${i}, '${contact.backgroundColor}')">
        <div class="contactSign" style="background-color: ${contact.backgroundColor}; color: white;">${initials}</div><span>${contact.name}</span>
      </div>
    `;
  }
}

function openContact(i) {
  const contact = contacts[i];
  const initials = getContactInitials(contact.name);

  document.getElementById('contactContent').classList.remove('displayNone');
  document.getElementById('contactContent').innerHTML = `
  <div class="contactId">
  <div class="bigContactSign" style="background-color: ${contact.backgroundColor}; color: white;">${initials}</div>
  <div class="contactName">
      <span>${contact.name}</span>
      <span>
          <button onclick="editContact(${i})"><img src="img/edit.svg">Edit</button>
          <button onclick="deleteContact(${i})"><img src="img/delete.svg">Delete</button>
      </span>
  </div>
</div>
<div class="contactInfo">
  <h3>Contact Information</h3>
  <span><b>Email</b><br><br><a href="mailto:${contact.mail}">${contact.mail}</a></span>
  <br>
  <br>
  <span><b>Phone</b><br><br>${contact.phone}</span>
</div>
  `;
}

function getContactInitials(name) {
  const nameParts = name.split(' ');
  const firstNameInitial = nameParts[0][0];
  const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '';
  return firstNameInitial + lastNameInitial;
}

function closeCard() {
  document.getElementById('addNewContact').classList.add('displayNone');
  document.getElementById('editContainer').classList.add('displayNone');
  document.getElementById('bg').style.display = 'none';
}

function editContact(i) {
  const contact = contacts[i];
  document.getElementById('bg').style.display = 'flex';
  document.getElementById('editContainer').classList.remove('displayNone');
  document.getElementById('editContainer').innerHTML = '';

  document.getElementById('editContainer').innerHTML += `
    <div id="editContact">
      <div class="editContactHeader">
        <button class="closeButton" onclick="closeCard()"><img src="img/close.svg"></button>
        <img src="img/logo.svg">
        <h1>Edit Contact</h1>
      </div>
      <div class="addContactInfo">
        <img src="img/icon.svg">
        <div class="inputDiv">
          <input id="editName" type="text" value="${contact.name}">
          <img src="img/person.svg">
        </div>
        <div class="inputDiv">
          <input id="editMail" type="email" value="${contact.mail}">
          <img src="img/mail.svg">
        </div>
        <div class="inputDiv">
          <input id="editPhone" type="text" value="${contact.phone}">
          <img src="img/call.svg">
        </div>
      </div>
      <div class="addContactButtons">
        <button id="deleteButton" onclick="deleteContact(${i})">Delete</button>
        <button id="saveButton" onclick="updateContact(${i})">Save<img src="img/check.svg"></button>
      </div>
    </div>
  `;
}

async function updateContact(i) {
  try {
    let editedName = document.getElementById('editName').value;
    let editedMail = document.getElementById('editMail').value;
    let editedPhone = document.getElementById('editPhone').value;

    contacts = JSON.parse(await getItem('contacts')) || [];
    contacts[i].name = editedName;
    contacts[i].mail = editedMail;
    contacts[i].phone = editedPhone;

    await setItem('contacts', JSON.stringify(contacts));
    closeCard();
    generateContacts();
    openContact(i);
  } catch (e) {
    console.error('Error updating contact:', e);
  }
}


async function deleteContact(i) {
  try {
    contacts = JSON.parse(await getItem('contacts')) || [];
    contacts.splice(i, 1);
    await setItem('contacts', JSON.stringify(contacts));
    closeCard();
    generateContacts();
  } catch (e) {
    console.error('Error deleting contact:', e);
  }

  document.getElementById('contactContent').classList.add('displayNone');
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