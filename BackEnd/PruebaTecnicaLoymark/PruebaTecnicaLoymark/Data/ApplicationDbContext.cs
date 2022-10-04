using Microsoft.EntityFrameworkCore;
using PruebaTecnicaLoymark.Models;

namespace PruebaTecnicaLoymark.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> User { get; set; }
        public DbSet<Activity> Activity { get; set; }
    }
}
