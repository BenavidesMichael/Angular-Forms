using AngularFormsApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AngularFormsApi.Contracts
{
    public interface IUserRepository
    {
        Task<List<UserModel>> GetAll();
        Task<UserModel> GetById(int id);
        Task Create(UserCreateModel model);
        Task Update(UserModel model);
        Task Delete(int id);
    }
}
