﻿namespace PruebaTecnicaLoymark.Models.Dtos
{
    public class UpdateUserDto
    {
        public int Id { get; set; } 
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public int? PhoneNumber { get; set; }
        public string ResidenceCountry { get; set; }
        public bool ContactInfo { get; set; }
    }
}
