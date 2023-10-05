const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const pagesInput = document.getElementById('pagesInput');
const bookForm = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');

initApp();

function initApp() {
    populateBooksFromStorage();
    bookForm.addEventListener('submit', handleAddBook);
}

function populateBooksFromStorage() {
    getStoredBooks().reverse().forEach(book => addBookToList(book));
}

function handleAddBook(event) {
    event.preventDefault();

    const book = {
        title: titleInput.value.trim(),
        author: authorInput.value.trim(),
        pages: pagesInput.value.trim()
    };

    if (book.title && book.author && book.pages) {
        addBookToList(book);
        prependToStoredBooks(book);

        clearInputs();
    }
}

function clearInputs() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
}

function addBookToList(book) {
    const li = createBookElement(book);
    bookList.insertBefore(li, bookList.children[1]);
}

function createBookElement(book) {
    const li = document.createElement('li');
    li.style.wordBreak = "break-all";
    
    li.appendChild(createDetailsDiv(book));
    li.appendChild(createDeleteButton());

    return li;
}

function createDetailsDiv(book) {
    const detailsDiv = document.createElement('div'); 
    detailsDiv.style.flexGrow = '1';
    detailsDiv.style.width = '80%';

    detailsDiv.appendChild(createDetail("Title:", book.title));
    detailsDiv.appendChild(createDetail("Author:", book.author));
    detailsDiv.appendChild(createDetail("Pages:", book.pages));

    return detailsDiv;
}

function createDetail(labelText, detailText) {
    const div = document.createElement('div');
    const label = document.createElement('strong');
    label.textContent = labelText;
    div.appendChild(label);
    div.appendChild(document.createTextNode(` ${detailText}`));

    return div;
}

function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', handleDeleteBook);
    return deleteButton;
}

function handleDeleteBook(event) {
    bookList.removeChild(event.target.parentElement);
    updateStoredBooks();
}

function getStoredBooks() {
    return JSON.parse(localStorage.getItem('books') || '[]');
}

function prependToStoredBooks(book) {
    const books = getStoredBooks();
    books.unshift(book);
    localStorage.setItem('books', JSON.stringify(books));
}

function updateStoredBooks() {
    const books = Array.from(bookList.children)
                       .slice(1)
                       .map(li => ({
                           title: extractDetailFromDiv(li, 1),
                           author: extractDetailFromDiv(li, 2),
                           pages: extractDetailFromDiv(li, 3)
                       }));
    localStorage.setItem('books', JSON.stringify(books));
}

function extractDetailFromDiv(li, childIndex) {
    return li.querySelector(`div:nth-child(${childIndex})`).textContent.split(': ')[1].trim();
}
