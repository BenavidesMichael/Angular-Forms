using System.ComponentModel.DataAnnotations;

namespace AngularFormsApi.Models
{
    public enum ExtensionImage
    {
        [Display(Name = "image/jpeg")]
        JPEG,

        [Display(Name = "image/jpg")]
        JPG,
        
        [Display(Name = "image/gif")]
        GIF,
        
        [Display(Name = "image/png")]
        PNG,
        
        [Display(Name = "image/svg")]
        SVG,
    }
}
