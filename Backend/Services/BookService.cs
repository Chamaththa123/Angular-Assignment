using Backend.Models;

namespace Backend.Services
{
    public class BookService
    {
        private static List<Book> books = new List<Book>();
        private static int nextId = 1;

        public List<Book> GetAllBooks() => books;

        public Book GetBookById(int id)
        {
            return books.FirstOrDefault(b => b.Id == id);
        }

        public Book AddBook(Book book)
        {
            book.Id = nextId++;
            books.Add(book);
            return book;
        }

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

        public bool DeleteBook(int id)
        {
            var book = books.FirstOrDefault(b => b.Id == id);
            if (book == null) return false;

            books.Remove(book);
            return true;
        }
    }
}
