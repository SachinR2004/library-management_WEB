import { getBooks, borrowBook } from '../utils/api';

export default function BorrowPage() {
    const borrowForm = document.createElement('form');
    borrowForm.id = 'borrow-form';

    const bookSelect = document.createElement('select');
    bookSelect.id = 'book-select';
    borrowForm.appendChild(bookSelect);

    const borrowButton = document.createElement('button');
    borrowButton.type = 'submit';
    borrowButton.textContent = 'Borrow Book';
    borrowForm.appendChild(borrowButton);

    borrowForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const selectedBookId = bookSelect.value;
        await borrowBook(selectedBookId);
        alert('Book borrowed successfully!');
    });

    async function loadBooks() {
        const books = await getBooks();
        books.forEach(book => {
            const option = document.createElement('option');
            option.value = book.id;
            option.textContent = book.title;
            bookSelect.appendChild(option);
        });
    }

    loadBooks();

    return borrowForm;
}