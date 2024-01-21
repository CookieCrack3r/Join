//to reset the Z-Index of the Logo-animation in the first

const logoContainer = document.querySelector('.join-logo-container');

logoContainer.addEventListener('animationend', function() {
    logoContainer.style.zIndex = '0';
    logoContainer.style.position = 'static';
});




