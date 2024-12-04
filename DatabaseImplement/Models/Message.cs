using Models.DatabaseModels;
using System.ComponentModel.DataAnnotations;

namespace DatabaseImplement.Models
{
    public class Message : IMessageModel
    {
        public int Id { get; set; }

        [Required]
        public string Text { get; set; } = string.Empty;
    }
}
