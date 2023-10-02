const myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead ? 'already read' : 'not read yet'}`;
    };
    }

function addBookToLibrary() {
    // do stuff here
    // do stuff here
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(theHobbit.info()); // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"