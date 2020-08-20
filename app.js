// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constuctor
function UI() {}

// Add Book To List
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  // Create tr element
  const row = document.createElement("tr");
  // Insert columns
  row.innerHTML = `<td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href='#' class='delete'>X<a></td>`;

  list.appendChild(row);
};

// Show Alert
UI.prototype.showAlert = function (message, className) {
  // Create Div
  const div = document.createElement("div");
  // Add Classes
  div.className = `alert ${className}`;
  // Add Text
  div.appendChild(document.createTextNode(message));
  // Get Form
  const form = document.querySelector("#book-form");
  // Get Parent
  const container = document.querySelector(".container");
  // Insert Alert
  container.insertBefore(div, form);

  // Timeout after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event Listeners for Add Book
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  // Instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error Alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show Success
    ui.showAlert("Book Added", "success");
    // Clear Fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener For Delete Book
document.getElementById("book-list").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();

  // Delete Book
  ui.deleteBook(e.target);

  // Show message
  ui.showAlert("Book Removed", "success");
  e.preventDefault();
});
