using PruebaTecnicaLoymark.Models;
using PruebaTecnicaLoymark.Models.Dtos;

namespace PruebaTecnicaLoymark.Repository.IRepository
{
    public interface IUserRepository
    {
        List<User> GetAllUsers();
        User? GetById(int id);
        User RegisterNewUser(NewUserDto user);
        User UpdateUser(UpdateUserDto user);
        User DeleteUser(int id);
    }
}
