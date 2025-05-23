using Backend.Models;

namespace Backend.Services
{

    // service class for book operations

    public class BookService
    {
        private static List<Book> books = new List<Book>();
        private static int nextId = 1;

        // Retrieves all books.
        public List<Book> GetAllBooks() => books;

        // get a specific book by ID
        public Book GetBookById(int id)
        {
            return books.FirstOrDefault(b => b.Id == id);
        }

        // Adds a new book 
        public Book AddBook(Book book)
        {
            book.Id = nextId++;
            books.Add(book);
            return book;
        }

        // Updates an existing book by ID
        public bool UpdateBook(int id, Book updatedBook)
        {
            var existingBook = books.FirstOrDefault(b => b.Id == id);
            if (existingBook == null) return false;

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Isbn = updatedBook.Isbn;
            existingBook.PublicationDate = updatedBook.PublicationDate;
            return true;
        }

        // Deletes a book by ID
        public bool DeleteBook(int id)
        {
            var book = books.FirstOrDefault(b => b.Id == id);
            if (book == null) return false;

            books.Remove(book);
            return true;
        }
    }
}
