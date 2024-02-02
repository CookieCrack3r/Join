let users = [];

async function init() {
    loadUsers();
    checkPasswords();
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error("loading error!", e);
    }

}


async function registerUser() {
    users.push({
        name: sign_up_name.value,
        email: sign_up_email.value.toLowerCase(),
        password: sign_up_password.value,
    });
    await setItem('users', JSON.stringify(users));
    resetUserInput();
    succesfullySignedUp()

}

function resetUserInput() {
    sign_up_name.value = '';
    sign_up_email.value = '';
    sign_up_password.value = '';
    sign_up_confirm_pw.value = '';

}

//this function pop-up a baner after signing up

function succesfullySignedUp() {
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

//this function is to check the password, if he match 
function checkPasswords() {
    let password = document.getElementById('sign_up_password').value;
    let passwordConfirm = document.getElementById('sign_up_confirm_pw').value;
    let resultElement = document.getElementById('result_password_match');

    if (password.length > 0 && passwordConfirm.length > 0) {
        if (password === passwordConfirm) {
            resultElement.innerHTML = 'The Password match!';
            resultElement.style.color = 'Green';
        } else {
            resultElement.innerHTML = 'The Password do not match!';
            resultElement.style.color = 'Red';
        }
    } else {
        resultElement.innerHTML = '';
    }
    document.getElementById('sign_up_password').addEventListener('input', checkPasswords);
    document.getElementById('sign_up_confirm_pw').addEventListener('input', checkPasswords);

}
