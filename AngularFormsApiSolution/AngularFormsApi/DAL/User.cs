using System;

namespace AngularFormsApi.DAL
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public int Age { get; set; }
        public string logo { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Color { get; set; }
        public DateTime Date { get; set; }
        public string Category { get; set; }
        public string Tag { get; set; }
        public string Gender { get; set; }
        public bool Agree { get; set; }
    }
}
