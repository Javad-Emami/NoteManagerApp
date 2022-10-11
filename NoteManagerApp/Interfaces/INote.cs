using NoteManagerApp.Core.Domain.Entities;

namespace NoteManagerApp.Interfaces
{
    public interface INote
    {
        ICollection<Notes> GetAllUserNotes(int userId);
        Notes GetNoteById(int id);
        Notes InsertNote(Notes notes);
        void DeleteNote(int id);
        
    }
}
