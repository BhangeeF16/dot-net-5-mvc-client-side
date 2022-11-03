using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.UI;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RestSharp;
using System;
using System.Text;
using Worqbox.UI.API_Helper;
using Worqbox.UI.AuthorizationHelper;
using Worqbox.UI.ExceptionTracer;
using Worqbox.UI.Models;
using Worqbox.UI.Models.General;
using Worqbox.UI.Services;
using WebUI.GraphAPI;

namespace Worqbox.UI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.Configure<SmartSettings>(Configuration.GetSection(SmartSettings.SectionName));

            // Note: This line is for demonstration purposes only, I would not recommend using this as a shorthand approach for accessing settings
            // While having to type '.Value' everywhere is driving me nuts (>_<), using this method means reloaded appSettings.json from disk will not work
            services.AddSingleton(s => s.GetRequiredService<IOptions<SmartSettings>>().Value);


            services.AddMvc();
            //services.AddControllersWithViews().AddRazorRuntimeCompilation();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            //services.AddAuthentication(auth =>
            //{
            //    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //})
            //    .AddJwtBearer(token =>
            //    {
            //        token.RequireHttpsMetadata = false;
            //        token.SaveToken = true;
            //        token.TokenValidationParameters = new TokenValidationParameters
            //        {
            //            ValidateIssuerSigningKey = true,
            //            IssuerSigningKey =
            //                new SymmetricSecurityKey(
            //                    Encoding.UTF8.GetBytes("z$C&F)J@NcQfTjWnZr4u7x!A%D*G-KaPdSgUkXp2s5v8y/B?E(H+MbQeThWmYq3t")),
            //            ValidateIssuer = false,
            //            ValidateAudience = false,
            //            ValidateLifetime = true,
            //            ClockSkew = TimeSpan.FromHours(1)
            //        };
            //    });

            string[] initialScopes = Configuration.GetValue<string>("DownstreamApi:Scopes")?.Split(' ');

            services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApp(Configuration.GetSection("AzureAd"))
                .EnableTokenAcquisitionToCallDownstreamApi(initialScopes)
                .AddMicrosoftGraph(Configuration.GetSection("DownstreamApi"))
                .AddDistributedTokenCaches();

            // services.AddControllersWithViews().AddRazorRuntimeCompilation();
            services.AddControllersWithViews(options =>
            {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
                options.Filters.Add(new Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter(policy));
            })
            .AddRazorRuntimeCompilation()
            .AddMicrosoftIdentityUI();

            services.AddTransient<IRestClient, RestClient>();
            services.AddSingleton<APIHelper>();
            SiteKeys.Configure(Configuration.GetSection("AppSettings"));
            services.AddSignalR();

            services.AddSession(options => { options.IdleTimeout = TimeSpan.FromMinutes(1440); });

            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<IGraphUser, GraphUser>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Account/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCookiePolicy();
            app.UseSession();
            app.Use(async (context, next) =>
            {
                try
                {
                    var JWToken = context.Session.GetString("JWToken");
                    if (!string.IsNullOrEmpty(JWToken))
                        context.Request.Headers.Add("Authorization", "Bearer " + JWToken);


                    await next();
                }
                catch (Exception ex)
                {
                    ExceptionLogging.SendErrorToText(ex);
                }
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    "default",
                    "{controller=Home}/{action=Index}");
            });
        }
    }
}
