using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaLoymark.Models;
using PruebaTecnicaLoymark.Models.Dtos;
using PruebaTecnicaLoymark.Repository.IRepository;

namespace PruebaTecnicaLoymark.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IActivitiesRepository _activitiesRepository;

        public UserController(IUserRepository userRepository, IActivitiesRepository activitiesRepository)
        {
            _userRepository = userRepository;
            _activitiesRepository = activitiesRepository;
        }

        [HttpGet("getAllUsers")]
        public IActionResult GetAllUsers()
        {
            var users = _userRepository.GetAllUsers();

            return Ok(users);
        }


        [HttpPost("newUser")]
        public IActionResult NewUser(NewUserDto userDto)
        {
            if (userDto.ContactInfo == null || userDto.Email == null || userDto.DateOfBirth == null || 
                userDto.Name == null || userDto.Surname == null || userDto.ResidenceCountry == null)
            {
                return BadRequest(new { errorMessage = "No se enviaron todos los parametros requeridos" });
            }
              
            User user = _userRepository.RegisterNewUser(userDto);

            if (user == null)
            {
                return StatusCode(500, "Algo salió mal guardando al usuario");
            }

            _activitiesRepository.RegisterActivity(user, "Creacion de Usuario");

            return Ok();
        }

        [HttpPut("updateUser")]
        public IActionResult UpdateUser(UpdateUserDto userDto)
        {
            if (userDto.ContactInfo == null || userDto.Email == null || userDto.DateOfBirth == null ||
               userDto.Name == null || userDto.Surname == null || userDto.ResidenceCountry == null ||
               userDto.Id == null)
            {
                return BadRequest(new { errorMessage = "No se enviaron todos los parametros requeridos" });
            }

            User user = _userRepository.UpdateUser(userDto);

            if (user == null)
            {
                return StatusCode(500, "Algo salió mal actualizando al usuario");
            }

            _activitiesRepository.RegisterActivity(user, "Actualización de Usuario");

            return Ok();
        }

        [HttpDelete("deleteUser")]
        public IActionResult DeleteUser(int idUser)
        {
            if (idUser == null) { return BadRequest(new { errorMessage = "No se enviaron todos los parametros requeridos" });}
            
            User user = _userRepository.DeleteUser(idUser);

            if (user == null)
            {
                return StatusCode(500, "Algo salió mal eliminando al usuario");
            }

            _activitiesRepository.RegisterActivity(user, "Eliminación de Usuario");

            return Ok();
        }
    }
}
