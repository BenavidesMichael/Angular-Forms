using System;
using System.Collections.Generic;

namespace AngularFormsApi.Models
{
    public class UserCreateModel : FileUploadModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Color { get; set; }
        public DateTime? Date { get; set; }
        public string Gender { get; set; }
        public bool Agree { get; set; }
        public List<Tag> Tags { get; set; }
        public CategoryModel Category { get; set; }
    }
}
