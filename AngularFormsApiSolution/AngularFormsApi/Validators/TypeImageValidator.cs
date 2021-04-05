using AngularFormsApi.Models;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace AngularFormsApi.Validators
{
    public class TypeImageValidator : ValidationAttribute
    {
        private readonly string[] _typesImagesValids;

        public TypeImageValidator(string[] typesImagesValids)
        {
            this._typesImagesValids = typesImagesValids;
        }


        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null)
                return ValidationResult.Success;

            IFormFile image = value as IFormFile;

            if (image == null)
                return ValidationResult.Success;

            if (!_typesImagesValids.Contains(image.ContentType))
                return new ValidationResult($"Extention image not valid, must be type of {string.Join(", ", _typesImagesValids)}");

            return ValidationResult.Success;
        }

    }
}
