async function init() {
    await getInitials();
    displayOptions();
}



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



async function getInitials() {
    UserInitials = await getItem('userInitial');
    UserName = await getItem('userName');
    const kanban = document.getElementById("kanban");
    kanban.innerHTML += `<div onclick="displayOptions()" id="initials">
      ${UserInitials}
      </div>`;
}