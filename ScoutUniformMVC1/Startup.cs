using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ScoutUniformMVC1.Startup))]
namespace ScoutUniformMVC1
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
