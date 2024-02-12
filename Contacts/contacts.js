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
    document.getElementById('allContacts').innerHTML += `
    <div>
      <span class="alphabet">A<div class="borderBottom"></div></span>
      <div id="${contact.id}" class="contact" onclick="openContact(${i})">
          <div class="contactSign">${contact.name.substring(0, 2)}</div><span>${contact.name}</span>
      </div>
    </div>
    `;
  }
 }

function openContact(i) {
  document.getElementById('contactContent').classList.remove('displayNone');
  document.getElementById('contactContent').innerHTML = `
  <div class="contactId">
  <div class="bigContactSign">AM</div>
  <div class="contactName">
      <span>${contacts[i].name}</span>
      <span>
          <button onclick="editContact()"><img src="img/edit.svg">Edit</button>
          <button><img src="img/delete.svg">Delete</button>
      </span>
  </div>
</div>
<div class="contactInfo">
  <h3>Contact Information</h3>
  <span><b>Email</b><br><br><a href="mailto:${contacts[i].mail}">${contacts[i].mail}</a></span>
  <br>
  <br>
  <span><b>Phone</b><br><br>${contacts[i].phone}</span>
</div>
  `;
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
