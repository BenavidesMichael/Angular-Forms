using AngularFormsApi.Contracts;
using AngularFormsApi.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AngularFormsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> Get()
        {
            var users = await _userRepository.GetAll();
            return Ok(users);
        }


        [HttpGet("{id}", Name = "GetUser")]
        public async Task<ActionResult<UserModel>> Get(int id)
        {
            var userFound = await _userRepository.GetById(id);

            if (userFound == null)
            {
                return NotFound();
            }

            return Ok(userFound);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] UserModel model)
        {
            try
            {
                await _userRepository.Update(model);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UserCreateModel model)
        {
            try
            {
                await _userRepository.Create(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message);
            }
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await _userRepository.Delete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message);
            }
        }

    }
}
