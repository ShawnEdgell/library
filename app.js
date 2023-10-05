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
  if (bookList.children.length > 1) {
      bookList.insertBefore(li, bookList.children[1]);
  } else {
      bookList.appendChild(li);
  }
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
  deleteButton.className = 'delete';

  // Embed SVG into the button
  deleteButton.innerHTML = `
  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#292D32"/>
    <path d="M13.0594 12.0001L15.3594 9.70011C15.6494 9.41011 15.6494 8.93011 15.3594 8.64011C15.0694 8.35011 14.5894 8.35011 14.2994 8.64011L11.9994 10.9401L9.69937 8.64011C9.40937 8.35011 8.92937 8.35011 8.63938 8.64011C8.34938 8.93011 8.34938 9.41011 8.63938 9.70011L10.9394 12.0001L8.63938 14.3001C8.34938 14.5901 8.34938 15.0701 8.63938 15.3601C8.78938 15.5101 8.97937 15.5801 9.16937 15.5801C9.35937 15.5801 9.54937 15.5101 9.69937 15.3601L11.9994 13.0601L14.2994 15.3601C14.4494 15.5101 14.6394 15.5801 14.8294 15.5801C15.0194 15.5801 15.2094 15.5101 15.3594 15.3601C15.6494 15.0701 15.6494 14.5901 15.3594 14.3001L13.0594 12.0001Z" fill="#292D32"/>
  </svg>
`;


  deleteButton.addEventListener('click', handleDeleteBook);
  return deleteButton;
}

function handleDeleteBook(event) {
  let targetElement = event.target;

  // If the clicked element is the SVG or its path, we'll go up to the button element
  while (targetElement !== null && targetElement.className !== 'delete') {
      targetElement = targetElement.parentElement;
  }

  if (targetElement) {
      bookList.removeChild(targetElement.parentElement);
      updateStoredBooks();
  }
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
