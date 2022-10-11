using NoteManagerApp.Core.Domain.Entities;

namespace NoteManagerApp.Interfaces
{
    public interface IUnitOfWork: IDisposable
    {
        int Save();
        bool UpdateUser(Users user);
        bool UpdateNote(Notes notes);
    }
}
