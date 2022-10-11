using NoteManagerApp.Core.Domain.Entities;
using NoteManagerApp.Data;
using NoteManagerApp.Interfaces;

namespace NoteManagerApp.Repositories
{
    public class UserRepository : INoteRepository
    {
        private readonly DataBaseContext _context;
        public UserRepository(DataBaseContext context)
        {
            _context = context;
        }

        public Users AddUser(Users users)
        {
            var usr = _context.Add(users);
            _context.SaveChanges();
            return users;
        }

        public void DeleteUser(int id)
        {
            var usr=_context.Users.Where(c=>c.Id == id).FirstOrDefault();
            _context.Users.Remove(usr);
        }

        public ICollection<Users> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public Users GetUserById(int id)
        {
            var usr=_context.Users.Where(p=>p.Id==id).SingleOrDefault();
            return usr;
        }

        public bool IsUserExist(string email)
        {
            return _context.Users.Any(u => u.Email == email);
        }
    }
}
