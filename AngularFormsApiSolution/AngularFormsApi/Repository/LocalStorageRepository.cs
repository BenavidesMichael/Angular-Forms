using AngularFormsApi.Contracts;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace AngularFormsApi.Repository
{
    public class LocalStorageRepository : ILocalStorageRepository
    {
        private readonly IWebHostEnvironment _env;
        // c ou est le domain ou notre API est Publish
        private readonly IHttpContextAccessor _httpContextAccessor; 

        public LocalStorageRepository(IWebHostEnvironment env, IHttpContextAccessor httpContextAccessor)
        {
            this._env = env;
            this._httpContextAccessor = httpContextAccessor;
        }


        public async Task<string> SaveFile(byte[] content, string extention, string folder, string contentType)
        {
            var fileName = $"{Guid.NewGuid()}{extention}";
            string folderFile = Path.Combine(_env.WebRootPath, folder);

            if (!Directory.Exists(folderFile))
            {
                Directory.CreateDirectory(folderFile);
            }

            string filePath = Path.Combine(folder, fileName);
            await File.WriteAllBytesAsync(filePath, content);

            var urlNow = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}";
            var urlForBD = Path.Combine(urlNow, folder, fileName).Replace("\\", "/");
            return urlForBD;
        }


        public async Task<string> EditFile(byte[] content, string extention, string folder, string path, string contentType)
        {
            await DeleteFile(path, folder);
            return await SaveFile(content, extention, folder, contentType);
        }

        
        public Task DeleteFile(string path, string folder)
        {
            if(path != null)
            {
                var fileName = Path.GetFileName(path);
                string directoryFile= Path.Combine(_env.WebRootPath, folder, fileName);

                if (File.Exists(directoryFile))
                {
                    File.Delete(directoryFile);
                }
            }
            return Task.FromResult(0);
        }

    }
}
