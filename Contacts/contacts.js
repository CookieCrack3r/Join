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