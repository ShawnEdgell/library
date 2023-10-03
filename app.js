const myLibrary = [
  new Book('Book 1', 'Author 1', 200, true),
  new Book('Book 2', 'Author 2', 300, false),
  new Book('Book 3', 'Author 3', 300, false),
];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;

  this.info = function() {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead ? 'already read' : 'not read yet'}`;
  };

  this.toggleReadStatus = function() {
      this.hasRead = !this.hasRead;
  };
}

function addBookToLibrary(title, author, pages, hasRead) {
  const hasReadValue = hasRead === 'yes' ? true : false;
  const newBook = new Book(title, author, pages, hasReadValue);
  myLibrary.push(newBook);
  displayBooks();
  document.getElementById('new-book-button').style.display = 'block';
}

function displayBooks() {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = ''; // Clear the previous book list

  myLibrary.forEach((book, index) => {
      const bookCard = createBookCard(book, index);
      bookList.appendChild(bookCard);
  });
}

function createBookCard(book, index) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  const bookDetails = document.createElement('ul');
  const detailsArray = [
     `Title: ${book.title}`,
      `Author: ${book.author}`,
      `Pages: ${book.pages}`,
      `Read Yet: ${book.hasRead ? 'Yes' : 'No'}`
  ];

  detailsArray.forEach((detail) => {
      const listItem = document.createElement('li');
      listItem.textContent = detail;
      bookDetails.appendChild(listItem);
  });

  const toggleButton = createButton('Toggle Read Status', index, () => toggleReadStatus(index));
  const removeButton = createButton('Remove', index, () => removeBook(index));

  bookCard.appendChild(bookDetails);
  bookCard.appendChild(toggleButton);
  bookCard.appendChild(removeButton);

  return bookCard;
}

function createButton(text, index, clickHandler) {
  const button = document.createElement('button');
  button.textContent = text;
  button.setAttribute('data-index', index);
  button.addEventListener('click', clickHandler);
  return button;
}

function toggleReadStatus(index) {
  myLibrary[index].toggleReadStatus();
  displayBooks();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

document.getElementById('new-book-button').addEventListener('click', () => openBookForm());

document.querySelector('.close-form-button').addEventListener('click', () => closeBookForm());

document.getElementById('add-book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const hasReadDropdown = document.getElementById('has-read');
  const hasRead = hasReadDropdown.options[hasReadDropdown.selectedIndex].value;

  addBookToLibrary(title, author, pages, hasRead);
  document.getElementById('add-book-form').reset();
  closeBookForm();
});

function openBookForm() {
  const bookForm = document.getElementById('book-form');
  bookForm.style.display = 'block';
  document.querySelector('.close-form-button').style.display = 'block';
  document.getElementById('new-book-button').style.display = 'none';
}

function closeBookForm() {
  const bookForm = document.getElementById('book-form');
  bookForm.style.display = 'none';
  document.querySelector('.close-form-button').addEventListener('click', () => closeBookForm());
  document.getElementById('new-book-button').style.display = 'block';
  
}

displayBooks();

document.getElementById('dark-mode-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});