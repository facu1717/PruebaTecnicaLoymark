using PruebaTecnicaLoymark.Models.Dtos;

namespace PruebaTecnicaLoymark.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public int? PhoneNumber { get; set; }
        public string ResidenceCountry { get; set; }
        public bool ContactInfo { get; set; }
        public DateTime? DischargeDate { get; set; }

        public User() { }
        public User(NewUserDto newUserDto)
        {
            Name = newUserDto.Name;
            Surname = newUserDto.Surname;
            DateOfBirth = newUserDto.DateOfBirth;
            Email = newUserDto.Email;
            PhoneNumber = newUserDto.PhoneNumber;
            ResidenceCountry = newUserDto.ResidenceCountry;
            ContactInfo = newUserDto.ContactInfo;
        }
    }


}
