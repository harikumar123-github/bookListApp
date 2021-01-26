class Book {
	constructor(title, author, isbn) {
		this.title = title
		this.author = author
		this.isbn = isbn
	}
}

class UI {

    static displayBooks() {
        let books = Store.getBooks()
        books.forEach( item =>{ UI.addBookToList(item) } )
    }

    static addBookToList(book) {
        const list = document.getElementById('book-list');


        const row = document.createElement('tr');
        row.innerHTML = ` 
            <td> ${book.title} </td>
            <td> ${book.author} </td>
            <td> ${book.isbn} </td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
         `

        list.appendChild(row)
        UI.showAlert('Book Added','success')

    }

    static clearFields() {
        document.getElementById('author').value = ""
	    document.getElementById('title').value = ""
	    document.getElementById('isbn').value = ""
    }

    static deleteBook(e){
        if(e.target.classList.contains('delete')){
            e.target.parentElement.parentElement.remove();
            UI.showAlert('Book Removed','success')
        }
    }

    static showAlert(msg,className) {
        let newDiv = document.createElement('div');
        newDiv.className = "alert";
        newDiv.classList.add(`alert-${className}`)
        newDiv.innerText = msg;
        document.querySelector('#book-form').prepend(newDiv);
        setTimeout( () => {
            newDiv.remove()
        },2000 ); 
    }
 
}

class Store {
	static addBook(book) {
        const books = Store.getBooks()
		books.push(book)
		localStorage.setItem('books', JSON.stringify(books))
    }

	static removeBook(isbn) {
        let i;
        const books = Store.getBooks();
        books.forEach( (book,ind) => {
            if(isbn == book.isbn){
                i=ind;
            }
        } )
        books.splice(i,1)
        localStorage.setItem('books',JSON.stringify(books))
    }

	static getBooks() {
        let books = (localStorage.getItem('books'))?(JSON.parse(localStorage.getItem('books')) ):[];
        return books
    }
}

function addBook(e) {
    e.preventDefault();
    let title = document.getElementById('title').value
    let author = document.getElementById('author').value
    let isbn = document.getElementById('isbn').value
    
    if (!author || !title || !isbn){
        UI.showAlert('Please enter correct details','danger');
        return
    }
    
    let newBook = new Book(title,author,isbn)
    UI.addBookToList(newBook);
    Store.addBook(newBook)
    UI.clearFields();
    
}

function handleRemove(e){
    UI.deleteBook(e);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
}


UI.displayBooks();
document.getElementById('book-form').addEventListener('submit',addBook);
document.querySelector('#book-list').addEventListener('click',handleRemove);



