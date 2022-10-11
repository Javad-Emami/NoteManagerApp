using NoteManagerApp.Core.Domain.Entities;
using NoteManagerApp.Data;
using NoteManagerApp.Interfaces;

namespace NoteManagerApp.Repositories
{
    public class UnitOfWorkRepository: IUnitOfWork
    {
        private readonly DataBaseContext _context;
        public UnitOfWorkRepository(DataBaseContext context)
        {
            _context = context;
        }

        public void Dispose()
        {
             _context.Dispose();
        }

        public int Save()
        {
            return _context.SaveChanges();
        }

        public bool UpdateNote(Notes notes)
        {
            _context.Update(notes);
            _context.SaveChanges();
            return true;
        }

        public bool UpdateUser(Users user)
        {
            _context.Update(user);
            _context.SaveChanges(); 
            return true;    
        }
    }
}
