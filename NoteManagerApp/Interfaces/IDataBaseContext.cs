using Microsoft.EntityFrameworkCore;
using NoteManagerApp.Core.Domain.Entities;

namespace NoteManagerApp.Interfaces
{
    public interface IDataBaseContext
    {
        public DbSet<Notes> Notes { get; set; }
        public DbSet<Users> Users { get; set; }
    }
}
