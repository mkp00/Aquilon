using System.Security.Principal;

namespace Portal.Filters
{
    public class JWTAuthenticationIdentity : GenericIdentity
    {
        public string UserName { get; set; }
        public int UserId { get; set; }

        public JWTAuthenticationIdentity(string userName) : base(userName)
        {
            UserName = userName;
        }

    }
}