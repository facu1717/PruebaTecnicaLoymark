using PruebaTecnicaLoymark.Data;
using PruebaTecnicaLoymark.Models;
using PruebaTecnicaLoymark.Repository.IRepository;

namespace PruebaTecnicaLoymark.Repository
{
    public class ActivitiesRepository : IActivitiesRepository
    {
        private readonly ApplicationDbContext _bd; 
        public ActivitiesRepository(ApplicationDbContext bd)
        {
            _bd = bd;
        }

        public bool Save()
        {
            return _bd.SaveChanges() >= 0 ? true : false;
        }

        public bool RegisterActivity(User user, string description)
        {
            Activity activity = new Activity();
            activity.Description = description;
            activity.IdUser = user.Id;
            activity.User = user;
            activity.CreateDate = DateTime.Now;

            _bd.Activity.Add(activity);
            return Save();
        }

        public List<Activity> GetAllActivities()
        {
            return _bd.Activity.ToList();
        }
    }
}
