using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaLoymark.Models;
using PruebaTecnicaLoymark.Models.Dtos;
using PruebaTecnicaLoymark.Repository.IRepository;

namespace PruebaTecnicaLoymark.Controllers
{
    [Route("api/activity")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly IActivitiesRepository _activitiesRepository;
        private readonly IUserRepository _userRepository;

        public ActivityController(IActivitiesRepository activitiesRepository, IUserRepository userRepository)
        {
            _activitiesRepository = activitiesRepository;
            _userRepository = userRepository;
        }

        [HttpGet("getAllActivities")]
        public IActionResult GetAllActivities()
        {
            var activities = _activitiesRepository.GetAllActivities().OrderByDescending(a => a.CreateDate);

            List<ActivityDto> activitiesFront = new();

            foreach (Activity activity in activities)
            {
                User user = _userRepository.GetById(activity.IdUser);

                if (user == null) return BadRequest(new { message = "No se encontro al usuario de la actividad" });

                ActivityDto activityDto = new();
                activityDto.FullName = user.Name + " " + user.Surname;
                activityDto.Description = activity.Description;
                activityDto.ActivityDate = activity.CreateDate;

                activitiesFront.Add(activityDto);
            }

            return Ok(activitiesFront);
        }
    }
}
