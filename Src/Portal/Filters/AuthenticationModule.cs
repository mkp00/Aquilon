using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace Portal.Filters
{
    public class AuthenticationModule
    {
        private const string Secret = "401b09eab3c013d4ca54922bb802bec8fd5318192b0a75f201d8b3727429090fb337591abd3e44453b954555b7a0812e1081c39b740293f765eae731f5a65ed1";
        private const string localhost = "http://localhost:11900/";
        private readonly SymmetricSecurityKey signingKey = new SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(Secret));

        // The Method is used to generate token for user
        public string GenerateTokenForUser(string username, int expireMinutes = 30)
        {
            //Set issued at date
            DateTime issuedAt = DateTime.UtcNow;
            //set the time when it expires
            DateTime expires = DateTime.UtcNow.AddMinutes(expireMinutes);
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, username)
            });
            var signingCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(signingKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature);

            var tokenHandler = new JwtSecurityTokenHandler();

            //create the jwt
            var token = (JwtSecurityToken)tokenHandler.CreateJwtSecurityToken(issuer: localhost, audience: localhost,
                        subject: claimsIdentity, notBefore: issuedAt, expires: expires, signingCredentials: signingCredentials);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

        /// Using the same key used for signing token, user payload is generated back
        public JwtSecurityToken GenerateUserClaimFromJWT(string authToken)
        {
            var tokenValidationParameters = new TokenValidationParameters()
            {
                ValidAudience = localhost,
                ValidIssuer = localhost,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                LifetimeValidator = this.LifetimeValidator,
                IssuerSigningKey = signingKey
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            tokenHandler.ValidateToken(authToken, tokenValidationParameters, out SecurityToken validatedToken);
            return validatedToken as JwtSecurityToken;            
        }

        public bool LifetimeValidator(DateTime? notBefore, DateTime? expires, SecurityToken securityToken, TokenValidationParameters validationParameters)
        {
            if (expires != null)
            {
                if (DateTime.UtcNow < expires) return true;
            }
            return false;
        }

        public JWTAuthenticationIdentity PopulateUserIdentity(JwtSecurityToken userPayloadToken)
        {
            if (userPayloadToken == null)
                throw new ArgumentNullException(nameof(userPayloadToken));
            string name = ((userPayloadToken)).Claims.FirstOrDefault(m => m.Type == "unique_name")?.Value ?? throw new NullReferenceException($"The IEnumerable {nameof(userPayloadToken)}.Claims property does not contain a Claim.Type of unique_name.");
            string userId = ((userPayloadToken)).Claims.FirstOrDefault(m => m.Type == "nameid")?.Value ?? throw new NullReferenceException($"The IEnumerable {nameof(userPayloadToken)}.Claims property does not contain a Claim.Type of nameid.");;
            return new JWTAuthenticationIdentity(name) { UserId = Convert.ToInt32(userId), UserName = name };
        }
    }
}