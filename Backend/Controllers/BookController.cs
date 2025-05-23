using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    // API controller for managing books

    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookService _bookService = new BookService();

        // get all books API controller
        [HttpGet]
        public ActionResult<List<Book>> GetAll()
        {
            try
            {
                return Ok(_bookService.GetAllBooks());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // get a specific book by ID API controller
        [HttpGet("{id}")]
        public ActionResult<Book> Get(int id)
        {
            try
            {
                var book = _bookService.GetBookById(id);
                if (book == null)
                    return NotFound("Book not found.");
                return Ok(book);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // create a new book API controller
        [HttpPost]
        public ActionResult<Book> Create(Book book)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (book.PublicationDate == default)
                    book.PublicationDate = DateTime.Now;

                var created = _bookService.AddBook(book);
                return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to create book: {ex.Message}");
            }
        }

        // update an existing book by ID API controller
        [HttpPut("{id}")]
        public IActionResult Update(int id, Book book)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var updated = _bookService.UpdateBook(id, book);
                if (!updated)
                    return NotFound("Book not found.");
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to update book: {ex.Message}");
            }
        }

        // delete a book by ID API controller
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var deleted = _bookService.DeleteBook(id);
                if (!deleted)
                    return NotFound("Book not found.");
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to delete book: {ex.Message}");
            }
        }
    }
}
