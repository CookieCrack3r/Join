let users = [];

async function init(){
    loadUsers();
}

async function loadUsers(){
    try{
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error("loading error!", e);
    }
}

async function registerUser(){
    users.push({
        name: sign_up_name.value,
        email: sign_up_email.value,
        password: sign_up_password.value,
    });
    await setItem('users', JSON.stringify(users));
    resetUserInput();
    succesfullySignedUp()
}

function resetUserInput(){
    sign_up_name.value = '';
    sign_up_email.value = '';
    sign_up_password.value = '';
    sign_up_confirm_pw.value = '';
}

//this function pop-up a baner after signing up

function succesfullySignedUp(){
    let success = document.getElementById('popup_after_succesfully_signup');
    success.style.display = 'block';
    success.style.transition = "top 0.5s ease, transform 0.5s ease";
    setTimeout(() => {
      success.style.top = "106%";
    }, 1200);
    setTimeout(() => {
      success.style.bottom = "50%";
    }, 2800);
    setTimeout(() => {
      success.style.display = "none";
    }, 3200);
    setTimeout(() => {
        window.location.pathname = '/Login/login.html';
    }, 3200);
}