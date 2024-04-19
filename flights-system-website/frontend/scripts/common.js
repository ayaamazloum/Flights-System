const openNavBtn = document.getElementById('open-nav-btn');
const closeNavBtn = document.getElementById('close-nav-btn');
const navLinks = document.getElementById('nav-links');
const logoutBtn = document.getElementById('logout-btn');


openNavBtn.addEventListener('click', () => {
    openNavBtn.style.display = 'none';
    closeNavBtn.style.display = 'block';
    navLinks.style.display = 'flex';
});

closeNavBtn.addEventListener('click', () => {
    openNavBtn.style.display = 'block';
    closeNavBtn.style.display = 'none';
    navLinks.style.display = 'none';
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedUser');
    window.location.href = './login.html';
});

if (!localStorage.getItem('loggedUser'))
    window.location.href = './login.html';