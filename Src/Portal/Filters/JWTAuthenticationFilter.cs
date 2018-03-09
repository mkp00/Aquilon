using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Filters;

namespace Portal.Filters
{
    public class JwtAuthenticationFilter : Attribute, IAuthenticationFilter
    {
        public bool AllowMultiple => false;

        public Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            // 1. Look for credentials in the request.
            HttpRequestMessage request = context.Request;
            AuthenticationHeaderValue authorization = request.Headers.Authorization;

            try
            {
                // 2. If there are no credentials, do nothing.
                if (authorization == null)
                {
                    context.ErrorResult = new AuthenticationFailureResult("Missing authorization header", request);
                    return Task.FromResult(0);
                }

                // 3. If there are credentials but the filter does not recognize the authentication scheme. If multi schemed site do nothing.
                if (authorization.Scheme != "Bearer")
                {
                    context.ErrorResult = new AuthenticationFailureResult("Missing authorization scheme", request);
                    return Task.FromResult(0);
                }

                // 4. If the credentials are bad, set the error result.
                if (string.IsNullOrEmpty(authorization.Parameter))
                {
                    context.ErrorResult = new AuthenticationFailureResult("Missing credentials", request);
                    return Task.FromResult(0);
                }

                // 5. If there are credentials that the filter understands, try to validate them.
                var authModule = new AuthenticationModule();
                JwtSecurityToken userPayloadToken = authModule.GenerateUserClaimFromJWT(authorization.Parameter);

                if (userPayloadToken == null)
                {
                    context.ErrorResult = new AuthenticationFailureResult("Invalid credentials", request);
                    return Task.FromResult(0);
                }

                var identity = authModule.PopulateUserIdentity(userPayloadToken);
                string[] roles = { "All" };
                var genericPrincipal = new GenericPrincipal(identity, roles);
                Thread.CurrentPrincipal = genericPrincipal;
                var authenticationIdentity = Thread.CurrentPrincipal.Identity as JWTAuthenticationIdentity;
                if (authenticationIdentity == null)
                    throw new InvalidCastException("Unable to cast IPrincipal.IIdentity to JWTAuthenticationIdentity");

                authenticationIdentity.UserId = identity.UserId;
                authenticationIdentity.UserName = identity.UserName;
                return Task.FromResult(0);
            }
            catch (Exception e)
            {
                context.ErrorResult = new AuthenticationFailureResult("Exception:\n" + e.Message, request);
                return Task.FromResult(0);
            }
        }

        /// <summary>
        /// Called if the authentication was successful, but a authorization filter failed.
        /// Would send a 401 unauthorized result with headers specifying authentication scheme.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <returns>Task.</returns>
        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            var challenge = new AuthenticationHeaderValue("Bearer");
            context.Result = new AddChallengeOnUnauthorizedResult(challenge, context.Result);
            return Task.FromResult(0);
        }
    }
}