using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NoteManagerApp.Core.Domain.Dto;
using NoteManagerApp.Core.Domain.Entities;
using NoteManagerApp.Interfaces;

namespace NoteManagerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private IUnitOfWork _unitOfWork;
        private INote _noteRepository;
        private IDataBaseContext _dataBaseContext;
        public NoteController(IUnitOfWork unitOfWork, INote noteRepository, IDataBaseContext dataBaseContext)
        {
            _unitOfWork = unitOfWork;
            _noteRepository = noteRepository;
            _dataBaseContext = dataBaseContext;
        }
        [HttpGet]
        public IActionResult GetAllUserNote(int userid)
        {
            var usr = _noteRepository.GetAllUserNotes(userid);
            return Ok(usr);
        }
        [HttpPost]
        public IActionResult InsertNote(NoteDto note)
        {
            Notes NOTE = new Notes()
            {
                UserId = note.UserId,
                Content = note.Content,
                DateCreated = note.DateCreated,
                DateModified = note.DateModified,
                Views = note.Views,
                Published = note.Published,

            };
            _noteRepository.InsertNote(NOTE);
            _unitOfWork.Save();
            return Ok(note);
        }
        [HttpGet("{noteId}")]
        public IActionResult GetNotebyId(int noteId)
        {
            var note = _noteRepository.GetNoteById(noteId);
            return Ok(note);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteNote(int id)
        {
            var NOTE = _noteRepository.GetNoteById(id);
            if (NOTE != null)
            {
                _noteRepository.DeleteNote(id);
                _unitOfWork.Save();
                return Ok();
            }
            return BadRequest();

        }
        [HttpPut("noteId")]
        public IActionResult NoteUpdate(NoteDto note)
        {
            var Note = _dataBaseContext.Notes.Where(c => c.Id == note.Id).FirstOrDefault();
            Note.Content = note.Content;
            Note.DateCreated = note.DateCreated;
            Note.DateModified = note.DateModified;
            Note.Views = note.Views;
            Note.Published = note.Published;
            var Nt = Note;
            _unitOfWork.UpdateNote(Nt);
            return Ok();
        }
    }
}
