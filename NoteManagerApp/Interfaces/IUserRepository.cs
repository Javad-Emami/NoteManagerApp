using NoteManagerApp.Core.Domain.Entities;

namespace NoteManagerApp.Interfaces
{
    public interface INoteRepository
    {
        ICollection<Users> GetAllUsers();
        Users GetUserById(int id);
        Users AddUser(Users users);
        void DeleteUser(int id);
        bool IsUserExist(string email);
    }
}
