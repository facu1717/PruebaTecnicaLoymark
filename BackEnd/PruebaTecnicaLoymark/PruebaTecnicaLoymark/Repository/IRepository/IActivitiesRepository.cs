using PruebaTecnicaLoymark.Models;

namespace PruebaTecnicaLoymark.Repository.IRepository
{
    public interface IActivitiesRepository
    {
        List<Activity> GetAllActivities();
        bool RegisterActivity(User user, string description);
    }
}
