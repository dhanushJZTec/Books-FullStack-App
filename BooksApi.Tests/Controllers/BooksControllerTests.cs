using Xunit;

using BooksApi.Controllers;
using BooksApi.Data;
using BooksApi.Models;

using Microsoft.EntityFrameworkCore;

namespace BooksApi.Tests.Controllers
{
    public class BooksControllerTests
    {
        private AppDbContext GetDbContext()
        {
            var options =
                new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(
                    databaseName: Guid.NewGuid().ToString()
                )
                .Options;

            var context =
                new AppDbContext(options);

            return context;
        }

        [Fact]
        public void AddBook_AddsBookSuccessfully()
        {
            // Arrange
            var context = GetDbContext();

            var controller =
                new BooksController(context);

            var book = new Book
            {
                Title = "Atomic Habits"
            };

            // Act
            context.Books_data.Add(book);

            context.SaveChanges();

            // Assert
            Assert.Equal(
                1,
                context.Books_data.Count()
            );
        }

        // Test2

        [Fact]
        public void GetBooks_ReturnsBooks()
        {
            // Arrange
            var context = GetDbContext();

            context.Books_data.Add(
                new Book
                {
                    Title = "Book 1"
                });

            context.SaveChanges();

            // Assert
            Assert.Equal(
                1,
                context.Books_data.Count()
            );
        }


        // Test3


        [Fact]
        public void DeleteBook_RemovesBook()
        {
            // Arrange
            var context = GetDbContext();

            var book =
                new Book
                {
                    Title = "Delete Me"
                };

            context.Books_data.Add(book);

            context.SaveChanges();

            // Act
            context.Books_data.Remove(book);

            context.SaveChanges();

            // Assert
            Assert.Empty(context.Books_data);
        }

        // Test4

        [Fact]
        public void UpdateBook_UpdatesTitle()
        {
            // Arrange
            var context = GetDbContext();

            var book =
                new Book
                {
                    Title = "Old"
                };

            context.Books_data.Add(book);

            context.SaveChanges();

            // Act
            book.Title = "New";

            context.SaveChanges();

            // Assert
            Assert.Equal(
                "New",
                context.Books_data.First().Title
            );
        }


        //Test5

        [Fact]
        public void Book_Title_IsNotNull()
        {
            // Arrange
            var book = new Book
            {
                Title = "Clean Code"
            };

            // Assert
            Assert.NotNull(book.Title);
        }
    }

}