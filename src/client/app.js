const homePage = () => import('./pages/home.js');
const indexPage = () => import('./pages/indexPage.js');
const loginPage = () => import('./pages/login.js');
const logoutPage = () => import('./pages/logout.js');
const registerPage = () => import('./pages/register.js');
const libraryPage = () => import('./pages/library.js');
const borrowPage = () => import('./pages/borrow.js');
const returnPage = () => import('./pages/return.js');
const profilePage = () => import('./pages/profile.js');
const borrowReminderPage = () => import('./pages/borrowReminder.js');
const adminBooksPage = () => import('./pages/admin/books.js');
const adminBookFormPage = () => import('./pages/admin/bookForm.js');

const routes = {
    '/': homePage,
    '/index': indexPage,
    '/login': loginPage,
    '/logout': logoutPage,
    '/register': registerPage,
    '/library': libraryPage,
    '/borrow': borrowPage,
    '/return': returnPage,
    '/profile': profilePage,
    '/borrow-reminder': borrowReminderPage,
    '/admin/books': adminBooksPage,
    '/admin/book-form': adminBookFormPage,
};

const navigateTo = (url) => {
    window.history.pushState(null, null, url);
    renderPage(url);
};

const renderPage = async (url) => {
    const page = routes[url] ? await routes[url]() : await homePage();
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = '';
    appContainer.appendChild(page);
};

window.onpopstate = () => {
    renderPage(window.location.pathname);
};

document.addEventListener('DOMContentLoaded', () => {
    const initialPath = window.location.pathname;
    renderPage(initialPath);
});

export { navigateTo };