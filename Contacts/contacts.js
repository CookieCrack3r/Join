let contacts = [];

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
    phone: phone.value
  });

  await setItem('contacts', JSON.stringify(contacts));
  closeCard();
  generateContacts();
}

async function loadContacts() {
  try {
    contacts = JSON.parse(await getItem('contacts')) || [];
    generateContacts();

  } catch (e) {
    console.error('Loading error:', e);
  }
}

function addContact() {
  document.getElementById('addNewContact').classList.remove('displayNone');
  document.getElementById('bg').style.display = 'flex';
}

async function generateContacts() {
  document.getElementById('allContacts').innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const initials = getContactInitials(contact.name);
    
    document.getElementById('allContacts').innerHTML += `
    <div>
      <span class="alphabet">${initials[0]}<div class="borderBottom"></div></span>
      <div id="${contact.id}" class="contact" onclick="openContact(${i})">
          <div class="contactSign">${initials}</div><span>${contact.name}</span>
      </div>
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
  <div class="bigContactSign">${initials}</div>
  <div class="contactName">
      <span>${contact.name}</span>
      <span>
          <button onclick="editContact()"><img src="img/edit.svg">Edit</button>
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
  document.getElementById('editContact').classList.add('displayNone');
  document.getElementById('bg').style.display = 'none';
}

function editContact() {
  document.getElementById('editContact').classList.remove('displayNone');
  document.getElementById('bg').style.display = 'flex';
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
