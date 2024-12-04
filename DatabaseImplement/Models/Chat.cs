using Models.DatabaseModels;
using System.ComponentModel.DataAnnotations;

namespace DatabaseImplement.Models
{
    public class Chat : IChatModel
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;
    }
}
