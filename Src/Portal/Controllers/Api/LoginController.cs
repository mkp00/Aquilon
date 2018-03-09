using System;
using System.Threading.Tasks;
using System.Web.Http;
using Portal.Filters;
using Portal.Models;

namespace Portal.Controllers.Api
{
    [RoutePrefix("services/v1")]
    public class LoginController : ApiController
    {
        [AllowAnonymous]
        [Route("login")]
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody] Credentials credentials)
        {
            if (!string.Equals(credentials?.UserName, "candidateTest", StringComparison.OrdinalIgnoreCase))
                return BadRequest("Invalid user name");
            if (!string.Equals(credentials?.Password, "Password123!", StringComparison.Ordinal))
                return BadRequest("Invalid password");

            AuthenticationModule authentication = new AuthenticationModule();
            string token = authentication.GenerateTokenForUser(credentials.UserName);
            return Json(token);
        }
    }    
}
