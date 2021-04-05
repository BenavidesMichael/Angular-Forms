using AngularFormsApi.Validators;
using Microsoft.AspNetCore.Http;

namespace AngularFormsApi.Models
{
    public class FileUploadModel
    {
        [WeighImageValidator(maxWeighInMegabyte: 4)]
        [TypeImageValidator(typesImagesValids: new string[] { "image/png", "image/jpg", "image/jpeg" })]
        public IFormFile logo { get; set; }
    }
}
