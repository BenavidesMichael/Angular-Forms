using AngularFormsApi.Contracts;
using AngularFormsApi.DAL;
using AngularFormsApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularFormsApi.Repository
{
    public class UserRepository : IUserRepository
    {
        private AngularFormsContext _db;
        
        public UserRepository(AngularFormsContext db)
        {
            _db = db;
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


        public async Task Create(UserModel model) 
        {
            try
            {
                var userDb = new User()
                {
                    Id = model.Id,
                    FullName = $"{model.FirstName} {model.LastName}",
                    Age = model.Age,
                    Agree = model.Agree,
                    Category = model.Category,
                    Color = model.Color,
                    Date = model.Date,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    Gender = model.Gender,
                    LastName = model.LastName,
                    logo = model.logo,
                    Password = model.Password,
                    Phone = model.Phone,
                    Tag = model.Tag,
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

    }
}
