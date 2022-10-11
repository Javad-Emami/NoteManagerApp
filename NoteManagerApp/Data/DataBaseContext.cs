using Microsoft.EntityFrameworkCore;
using NoteManagerApp.Core.Domain.Entities;
using NoteManagerApp.Interfaces;

namespace NoteManagerApp.Data
{
    public class DataBaseContext: DbContext,IDataBaseContext
    {
        public DataBaseContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Notes> Notes { get; set; }
        public DbSet<Users> Users { get; set; }

        #region Seed Data
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>().HasData(new Users
            {
                Id = 1,
                FirstName = "Javad",
                LastName = "Emami",
                Email = "javademami90@gmail.com",
                Age = 32,
                WebSite = "null"

            });
            modelBuilder.Entity<Notes>().HasData(new Notes
            {
                Id = 1,
                UserId = 1,
                Content = " I do not Know What to say",
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                Views = 20,
                Published = false
            });
        }

        #endregion
    }
}
