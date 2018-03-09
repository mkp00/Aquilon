using System.Web.Http;
using System.Web.Http.Tracing;
using Portal.Models;

namespace Portal
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            SystemDiagnosticsTraceWriter traceWriter = config.EnableSystemDiagnosticsTracing();
            traceWriter.IsVerbose = true;
            traceWriter.MinimumLevel = TraceLevel.Error;

            //config.Filters.Add(new JwtAuthenticationFilter());

            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(name: "DefaultApi", routeTemplate: "api/{controller}/{id}", defaults: new { id = RouteParameter.Optional });
        }
    }
}