using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NoteManagerApp.Controllers;
using NoteManagerApp.Core.Domain.Dto;
using NoteManagerApp.Core.Domain.Entities;
using NoteManagerApp.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteManagerApp.Tests.Controller
{
    public class UserContreollerTest
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly INoteRepository _userRepository;
        private readonly IDataBaseContext _context;
        public UserContreollerTest()
        {
            _unitOfWork = A.Fake<IUnitOfWork>();
            _userRepository = A.Fake<INoteRepository>();
            _context = A.Fake<IDataBaseContext>();
        }

        [Fact]
        public void UserController_GetUsers_ReturnOk()
        {
            //Arrange
            var users = A.Fake<ICollection<UserDto>>();
            var userList = A.Fake<List<UserDto>>();
            var controller = new UserController(_unitOfWork, _userRepository, _context);

            //Act
            var result = controller.GetUsers();

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));

        }

        [Fact]
        public void UserController_CreateUser_ReturnOk()
        {
            //Arrange

            var users = A.Fake<ICollection<UserDto>>();
            var UserDto = A.Fake<List<UserDto>>();
            var user = new UserDto()
            {
                Id = 1,
                FirstName = "jafar",
                LastName = "Amraei",
                Age = 32,
                Email = "A.J@yahoo.com",
                WebSite = "A.J.com"
            };
            var controller = new UserController(_unitOfWork, _userRepository, _context);

            //Act
            var result = controller.CreateUser(user);

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));

        }
        [Fact]
        public void UserController_GetUserById_ReturnOk()
        {
            //Arrange
            int id = 1;
            var usr = A.Fake<Users>();
            var controller = new UserController(_unitOfWork, _userRepository, _context);

            //Act
            var result = controller.GetUserById(id);

            //Assert
            result.Should().BeOfType(typeof(OkObjectResult));
            
        }

        [Fact]
        public void UserController_UserDelete_ReturnOk()
        {
            //Arrange
            int id = 1;
            var user = A.Fake<Users>();
            var controller = new UserController(_unitOfWork, _userRepository, _context);

            //Act
            var result = controller.UserDelete(id);

            //Assert
            Assert.IsType<OkResult>(result);
        }
       
    }
}
