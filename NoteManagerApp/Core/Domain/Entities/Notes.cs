using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NoteManagerApp.Core.Domain.Entities
{
    public class Notes
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

        // Navigating Data
        [ForeignKey("UserId")]
        public Users User { get; set; }
    }
}
