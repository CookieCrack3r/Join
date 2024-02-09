async function init(){
    getInitials();
    displayOptions();
}

function addContact() {
    document.getElementById('addNewContact').classList.remove('displayNone');
    document.getElementById('bg').style.display = 'flex';
}

function openContact() {
    document.getElementById('contactContent').classList.remove('displayNone');
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
async function getInitials(){
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
