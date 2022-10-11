using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using NoteManagerApp.Core.Domain.Dto;
using NoteManagerApp.Core.Domain.Entities;
using NoteManagerApp.Interfaces;

namespace NoteManagerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUnitOfWork _unitOfWork;
        private INoteRepository _userRepository;
        private IDataBaseContext _dataBaseContext;
  
        public UserController(IUnitOfWork unitOfWork, 
                              INoteRepository userRepository,
                              IDataBaseContext dataBaseContext)
        {
            _unitOfWork = unitOfWork;
            _userRepository = userRepository;
            _dataBaseContext = dataBaseContext;
           
        }
        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _userRepository.GetAllUsers();
            return Ok(users);
        }
        [HttpGet("id")]
        public IActionResult GetUserById(int id)
        {
            var usr = _userRepository.GetUserById(id);
            return Ok(usr);
        }
        [HttpPost]
        public IActionResult CreateUser(UserDto user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            if (_userRepository.IsUserExist(user.Email.ToLower()))
            {
                ModelState.AddModelError("Email", "ایمیل تکراری است ");
                return NoContent();
            }
            Users users = new Users()
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Age = user.Age,
                    Email = user.Email,
                    WebSite = user.WebSite,
                };
                var newUser = _userRepository.AddUser(users);
                _unitOfWork.Save();
            
                return Ok(user);
            
        }
        [HttpPut("id")]
        public IActionResult UserUpdate(UserDto user)
        {
            var usr =_dataBaseContext.Users.Where(c=>c.Id==user.Id).FirstOrDefault();
            usr.FirstName=user.FirstName;
            usr.LastName=user.LastName;
            usr.Age=user.Age;
            usr.Email=user.Email;   
            usr.WebSite=user.WebSite;
            var UPuser = usr;
            _unitOfWork.UpdateUser(UPuser);
         
            return Ok();
        }
         
        [HttpDelete("id")]
        public IActionResult UserDelete(int id)
        {
            var user = _userRepository.GetUserById(id);
            if (user != null)
            {
                _userRepository.DeleteUser(id);
                _unitOfWork.Save();
                return Ok();
            }
            return BadRequest();


        }
    }
}
