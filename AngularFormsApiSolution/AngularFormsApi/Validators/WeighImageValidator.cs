using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace AngularFormsApi.Validators
{
    public class WeighImageValidator : ValidationAttribute
    {
        private readonly int _maxWeighInMegabyte;

        public WeighImageValidator(int maxWeighInMegabyte)
        {
            this._maxWeighInMegabyte = maxWeighInMegabyte;
        }


        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null)
                return ValidationResult.Success;

            IFormFile image = value as IFormFile;
            
            if (image == null)
                return ValidationResult.Success;

            int imageWeighInBytes = _maxWeighInMegabyte * 1024 * 1024;

            if (image.Length > imageWeighInBytes)
                return new ValidationResult($"the image file mustn't be bigger than {_maxWeighInMegabyte}mb");

            return ValidationResult.Success;
        }

    }
}
