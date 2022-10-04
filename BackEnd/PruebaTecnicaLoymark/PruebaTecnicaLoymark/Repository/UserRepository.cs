using PruebaTecnicaLoymark.Data;
using PruebaTecnicaLoymark.Models;
using PruebaTecnicaLoymark.Models.Dtos;
using PruebaTecnicaLoymark.Repository.IRepository;

namespace PruebaTecnicaLoymark.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _bd;

        public UserRepository (ApplicationDbContext bd)
        {
            _bd = bd;
        }
        public bool Save()
        {
            return _bd.SaveChanges() >= 0 ? true : false;
        }

        public List<User> GetAllUsers()
        {
            return _bd.User.Where(u => u.DischargeDate == null).ToList();
        }

        public User RegisterNewUser(NewUserDto userDto)
        {
            User user = new User(userDto);

            _bd.User.Add(user);
            
            if(!Save()) return null;

            return user;
        }

        public User? GetById(int id)
        {
            return _bd.User.FirstOrDefault(u => u.Id == id);
        }

        public User UpdateUser(UpdateUserDto userDto)
        {
            User user = new User(userDto);
            
            _bd.User.Update(user);

            if (!Save()) return null;

            return user;
        }

        public User DeleteUser(int id)
        {
            User user = GetById(id);

            if (user == null) return null;

            user.DischargeDate = DateTime.Now;
            _bd.User.Update(user);

            if (!Save()) return null;

            return user;

        }
    }
}
