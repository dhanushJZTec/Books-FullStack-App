using System.ComponentModel.DataAnnotations;

namespace BooksApi.DTOs
{
    public class CreateBookDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public int AuthorId { get; set; }
    }
}