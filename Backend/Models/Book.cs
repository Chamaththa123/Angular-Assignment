using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    // book properties

    public class Book
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Author is required.")]
        public string Author { get; set; }

        [Required(ErrorMessage = "ISBN is required.")]
        public string Isbn { get; set; }

        [Required(ErrorMessage = "Publication date is required.")]
        public DateTime PublicationDate { get; set; }
    }
}
