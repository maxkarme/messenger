using Messenger.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Contracts.DtoModels;
using Contracts.BindingModels;

namespace Messenger.Controllers
{
	[ApiController]
	[Route("/user")]
    public class UserController : ControllerBase
    {
        private UserService userService;

        public UserController(UserService userService)
        {
            this.userService = userService;
        }
		private int UserId => int.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO loginModel)
        {
            string? token = await userService.CheckAuth(loginModel);

            if (token == null)
            {
                return Unauthorized();
            }

            return Ok(token);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Registration([FromBody] UserInfoDTO userModel)
        {
            string? token = await userService.Registrate(userModel);

            if (token == null)
            {
                return Unauthorized();
            }

            return Ok();
        }
    }
}
