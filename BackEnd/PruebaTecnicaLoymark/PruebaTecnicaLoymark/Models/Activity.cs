using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PruebaTecnicaLoymark.Models
{
    public class Activity
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public int IdUser { get; set; }
        [ForeignKey("IdUser")]
        public User User { get; set; }
        public string Description { get; set; }
    }
}
