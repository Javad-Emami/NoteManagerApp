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
    public class NoteControllerTest
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly INote _noteRepository;
        private readonly IDataBaseContext _context;
        public NoteControllerTest()
        {
            _unitOfWork = A.Fake<IUnitOfWork>();
            _noteRepository = A.Fake<INote>();
            _context = A.Fake<IDataBaseContext>();
        }

        [Fact]
        public void NoteController_GetAllUserNote_ReturnOk()
        {
            //Arrange
            int id = 1;
            var note = A.Fake<NoteDto>();
            var controller = new NoteController(_unitOfWork, _noteRepository, _context);

            //Act
            var result = controller.GetAllUserNote(id);

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));

        }

        [Fact]
        public void NoteController_InsertNote_ReturnOk()
        {
            //Arrange

            var notes = A.Fake<ICollection<NoteDto>>();
            var NoteDto = A.Fake<List<NoteDto>>();
            var note = new NoteDto()
            {
                Id = 1,
                Content = "Here is the place you can tell your Critics",
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                Published = true,
                Views = 10

            };
            var controller = new NoteController(_unitOfWork, _noteRepository, _context);

            //Act
            var result = controller.InsertNote(note);

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));

        }
        [Fact]
        public void NoteController_GetNotebyId_ReturnOk()
        {
            //Arrange
            int id = 1;
            var note = A.Fake<Notes>();
            var controller = new NoteController(_unitOfWork, _noteRepository, _context);

            //Act
            var result = controller.GetNotebyId(id);

            //Assert
            result.Should().BeOfType(typeof(OkObjectResult));

        }

        [Fact]
        public void NoteController_DeleteNote_ReturnOk()
        {
            //Arrange
            int id = 1;
            var user = A.Fake<Notes>();
            var controller = new NoteController(_unitOfWork, _noteRepository, _context);

            //Act
            var result = controller.DeleteNote(id);

            //Assert
            Assert.IsType<OkResult>(result);
        }
    }
}
