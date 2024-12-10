using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace DatabaseImplement.Models
{
    public class UserChat
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int ChatId { get; set; }
        public virtual User User { get; set; } = new();
        public virtual Chat Chat { get; set; } = new();
    }
}
