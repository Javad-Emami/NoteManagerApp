using System.ComponentModel.DataAnnotations;

namespace NoteManagerApp.Core.Domain.Entities
{
    public class Users
    {

        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public int Age { get; set; }
        public string WebSite { get; set; }

        // Navigating Data
        public ICollection<Notes> Notes { get; set; }

    }
}
