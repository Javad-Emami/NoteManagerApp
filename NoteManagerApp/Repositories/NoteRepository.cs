using Microsoft.EntityFrameworkCore;
using NoteManagerApp.Core.Domain.Entities;
using NoteManagerApp.Data;
using NoteManagerApp.Interfaces;

namespace NoteManagerApp.Repositories
{
    public class NoteRepository: INote
    {
        private readonly DataBaseContext _context;
        public NoteRepository(DataBaseContext context)
        {
            _context = context;
        }
    
        public Notes GetNoteById(int id)
        {
            var note=_context.Notes.Where(x => x.Id == id).SingleOrDefault();
            return note;
        }

        public Notes InsertNote(Notes notes)
        {
            var note=_context.Add(notes);
            _context.SaveChanges();
            return notes;
        }

        public void DeleteNote(int id)
        {
            var note=_context.Notes.Where(x => x.Id == id).SingleOrDefault();
            _context.Notes.Remove(note);
        }

       public ICollection<Notes> GetAllUserNotes(int userId)
        {
            return _context.Notes.Where(p=>p.UserId == userId).ToList();
        }

       
    }
}
