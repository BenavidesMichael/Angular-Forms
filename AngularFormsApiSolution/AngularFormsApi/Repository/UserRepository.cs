using AngularFormsApi.Contracts;
using AngularFormsApi.DAL;
using AngularFormsApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AngularFormsApi.Repository
{
    public class UserRepository : IUserRepository
    {
        private AngularFormsContext _db;
        private readonly ILocalStorageRepository _localStorageRepository;


        public UserRepository(AngularFormsContext db, ILocalStorageRepository localStorageRepository)
        {
            _db = db;
            _localStorageRepository = localStorageRepository;
        }



        public async Task<List<UserModel>> GetAll()
        {
            return await _db.Users
                            .Select(x => new UserModel()
                            {
                                Id = x.Id,
                                FullName = $"{x.FirstName} {x.LastName}",
                                Age = x.Age,
                                Agree = x.Agree,
                                Category = x.Category,
                                Color = x.Color,
                                Date = x.Date,
                                Email = x.Email,
                                FirstName = x.FirstName,
                                Gender = x.Gender,
                                LastName = x.LastName,
                                logo = x.logo,
                                Password = x.Password,
                                Phone = x.Phone,
                                Tag = x.Tag,
                            })
                            .ToListAsync();
        }


        public async Task<UserModel> GetById(int id)
        {
            return await _db.Users
                            .Select(x => new UserModel()
                            {
                                Id = x.Id,
                                FullName = $"{x.FirstName} {x.LastName}",
                                Age = x.Age,
                                Agree = x.Agree,
                                Category = x.Category,
                                Color = x.Color,
                                Date = x.Date,
                                Email = x.Email,
                                FirstName = x.FirstName,
                                Gender = x.Gender,
                                LastName = x.LastName,
                                logo = x.logo,
                                Password = x.Password,
                                Phone = x.Phone,
                                Tag = x.Tag,
                            })
                            .FirstOrDefaultAsync();
        }


        public async Task Create(UserCreateModel model) 
        {
            try
            {
                await this.saveLogo(model.logo);
                var userDb = new User()
                {
                    FullName = $"{model.FirstName} {model.LastName}",
                    Age = model.Age,
                    Agree = model.Agree,
                    Category = model.Category.Name,
                    Color = model.Color,
                    Date = (DateTime)model.Date,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    Gender = model.Gender,
                    LastName = model.LastName,
                    Password = model.Password,
                    Phone = model.Phone,
                    Tag = model.Tags[0].Name,
                };

                await _db.Users.AddAsync(userDb);
                await _db.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task Update(UserModel model)
        {
            try
            {
                var userFound = await _db.Users.FirstOrDefaultAsync(x => x.Id == model.Id);
                
                userFound.Id = model.Id;
                userFound.FullName = $"{model.FirstName} {model.LastName}";
                userFound.Age = model.Age;
                userFound.Agree = model.Agree;
                userFound.Category = model.Category;
                userFound.Color = model.Color;
                userFound.Date = model.Date;
                userFound.Email = model.Email;
                userFound.FirstName = model.FirstName;
                userFound.Gender = model.Gender;
                userFound.LastName = model.LastName;
                userFound.logo = model.logo;
                userFound.Password = model.Password;
                userFound.Phone = model.Phone;
                userFound.Tag = model.Tag;

                _db.Entry(userFound).State = EntityState.Modified;
                await _db.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task Delete(int id)
        {
            try
            {
                var user = await _db.Users.FirstOrDefaultAsync(x => x.Id == id);
                _db.Users.Remove(user);
                await _db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
        private async Task<string> saveLogo(IFormFile logo)
        {
            string result = string.Empty;

            if (logo != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await logo.CopyToAsync(memoryStream);
                    byte[] content = memoryStream.ToArray();
                    string extention = Path.GetExtension(logo.FileName);
                    string contentType = logo.ContentType;
                    string folder = "Images";

                    result = await _localStorageRepository.SaveFile(content, extention, folder, contentType);
                }
            }

            return result;
        }

    }
}
