namespace BooksApi.DTOs
{
    public class BookResponseDto
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public int AuthorId { get; set; }

        public AuthorResponseDto Author { get; set; }
    }
}