using System.Threading.Tasks;

namespace AngularFormsApi.Contracts
{
    public interface ILocalStorageRepository
    {
        Task<string> EditFile(byte[] content, string extention, string folder, string path, string contentType);
        Task DeleteFile(string path, string folder);
        Task<string> SaveFile(byte[] content, string extention, string folder, string contentType);
    }
}
