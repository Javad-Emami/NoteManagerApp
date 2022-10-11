using System.ComponentModel.DataAnnotations;

namespace NoteManagerApp.Core.Domain.Dto
{
    public class NoteDto
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
        [Required]
        public DateTime DateModified { get; set; }
        [Required]
        public int Views { get; set; }
        [Required]
        public bool Published { get; set; }
    }
}
