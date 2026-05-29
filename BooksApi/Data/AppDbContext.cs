using BooksApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BooksApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books_data { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Author> Authors { get; set; }
    }
}