function backToLogin() {
    window.location.pathname = '/Login/login.html';
}

//Disable & Enable the Button befor Sign Up
function enableTheBtn() {
    
    let checkboxAccepted = document.getElementById('accept_terms');
    let signUpBtn = document.getElementById('sign_up');

    if (checkboxAccepted.checked) {
        signUpBtn.disabled = false;
        signUpBtn.classList.remove('disabled-Button');
    } else {
        signUpBtn.disabled = true;
        signUpBtn.classList.add('disabled-Button');
    }
}
    document.addEventListener('DOMContentLoaded', function() {
    enableTheBtn();
    document.getElementById('accept_terms').addEventListener('change', enableTheBtn());
});