using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookService _bookService = new BookService();

        [HttpGet]
        public ActionResult<List<Book>> GetAll() => _bookService.GetAllBooks();

        [HttpGet("{id}")]
        public ActionResult<Book> Get(int id)
        {
            var book = _bookService.GetBookById(id);
            if (book == null) return NotFound();
            return book;
        }

        [HttpPost]
        public ActionResult<Book> Create(Book book)
        {
            var created = _bookService.AddBook(book);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Book book)
        {
            var updated = _bookService.UpdateBook(id, book);
            if (!updated) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var deleted = _bookService.DeleteBook(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
