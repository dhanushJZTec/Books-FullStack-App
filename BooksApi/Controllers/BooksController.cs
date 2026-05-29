using BooksApi.Data;
using BooksApi.DTOs;
using BooksApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BooksApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BooksController(
            AppDbContext context
        )
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>>
            GetBooks()
        {

            var books =
                await _context.Books_data

                .Include(b => b.Author)

                .ToListAsync();

            return Ok(books);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookResponseDto>>
            GetBook(int id)
        {

            var book =
                await _context.Books_data

                .Include(b => b.Author)

                .FirstOrDefaultAsync(
                    b => b.Id == id
                );

            if (book == null)
            {
                return NotFound();
            }

            var response =
                new BookResponseDto
                {
                    Id = book.Id,

                    Title = book.Title,

                    AuthorId = book.AuthorId,

                    Author =
                        new AuthorResponseDto
                        {
                            Id = book.Author.Id,

                            Name = book.Author.Name
                        }
                };

            return Ok(response);

        }

        [HttpPost]
        public async Task<ActionResult<Book>>
            CreateBook(
                CreateBookDto dto
            )
        {

            var book =
                new Book
                {
                    Title = dto.Title,

                    AuthorId = dto.AuthorId
                };

            _context.Books_data.Add(book);

            await _context.SaveChangesAsync();

            var createdBook =
                await _context.Books_data

                .Include(b => b.Author)

                .FirstOrDefaultAsync(
                    b => b.Id == book.Id
                );

            return Ok(createdBook);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult>
            UpdateBook(
                int id,
                UpdateBookDto dto
            )
        {

            var book =
                await _context.Books_data
                .FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            book.Title = dto.Title;

            book.AuthorId = dto.AuthorId;

            await _context.SaveChangesAsync();

            return NoContent();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult>
            DeleteBook(int id)
        {

            var book =
                await _context.Books_data
                .FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            _context.Books_data.Remove(book);

            await _context.SaveChangesAsync();

            return NoContent();

        }
    }
}