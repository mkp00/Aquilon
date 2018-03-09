using System.Web.Optimization;

namespace Portal
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/scripts").Include("~/App/dist/vendor.bundle.js","~/App/dist/app.bundle.js"));
            bundles.Add(new StyleBundle("~/App/dist").Include("~/App/dist/app.css"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862

            //string value = System.Configuration.ConfigurationManager.AppSettings["Environment"];
            //BundleTable.EnableOptimizations = value == "PROD";

            BundleTable.EnableOptimizations = false;
        }
    }
}