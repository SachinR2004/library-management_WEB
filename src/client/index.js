import { renderHomePage } from './pages/home.js';
import { renderIndexPage } from './pages/indexPage.js';
import { renderLoginPage } from './pages/login.js';
import { renderLogoutPage } from './pages/logout.js';
import { renderRegisterPage } from './pages/register.js';
import { renderLibraryPage } from './pages/library.js';
import { renderBorrowPage } from './pages/borrow.js';
import { renderReturnPage } from './pages/return.js';
import { renderProfilePage } from './pages/profile.js';
import { renderBorrowReminder } from './pages/borrowReminder.js';
import { renderAdminBooksPage } from './pages/admin/books.js';
import { renderAdminBookForm } from './pages/admin/bookForm.js';

const routes = {
    '/': renderHomePage,
    '/index': renderIndexPage,
    '/login': renderLoginPage,
    '/logout': renderLogoutPage,
    '/register': renderRegisterPage,
    '/library': renderLibraryPage,
    '/borrow': renderBorrowPage,
    '/return': renderReturnPage,
    '/profile': renderProfilePage,
    '/borrow-reminder': renderBorrowReminder,
    '/admin/books': renderAdminBooksPage,
    '/admin/book-form': renderAdminBookForm,
};

function router() {
    const path = window.location.pathname;
    const render = routes[path] || renderHomePage;
    render();
}

window.addEventListener('DOMContentLoaded', router);
window.addEventListener('popstate', router);