#region Imports

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Nancy.Json;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Worqbox.UI.AuthorizationHelper;
using Worqbox.UI.Models.General;
using Worqbox.UI.ViewModels;

#endregion

namespace Worqbox.UI.API_Helper
{
    public class APIHelper : IAPIHelper
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public APIHelper(IRestClient restClient, IConfiguration config, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Task<int> DeleteAsync(string requestUri, int ID)
        {
            throw new NotImplementedException();
        }

        public async Task<SuccessResponseVM<IEnumerable<T>>> GetAsync<T>(string requestUri)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(SiteKeys.BaseAPIUrl);
                    client.DefaultRequestHeaders.Add("Authorization",
                        "Bearer " + _httpContextAccessor.HttpContext.Session.GetString("JWToken"));
                    client.DefaultRequestHeaders.Add("UserTimeZone",
                        _httpContextAccessor?.HttpContext?.Request?.Headers["UserTimeZone"].ToString());
                    client.Timeout = TimeSpan.FromMinutes(60);
                    var result = await client.GetAsync(requestUri);
                    result.EnsureSuccessStatusCode();
                    var resultContentString = await result.Content.ReadAsStringAsync();
                    var resultContent =
                        JsonConvert.DeserializeObject<SuccessResponseVM<IEnumerable<T>>>(resultContentString);
                    return resultContent;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<SuccessResponseVM<T>> GetSingleAsync<T>(string requestUri)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(SiteKeys.BaseAPIUrl);
                    client.DefaultRequestHeaders.Add("Authorization",
                        "Bearer " + _httpContextAccessor.HttpContext.Session.GetString("JWToken"));
                    client.DefaultRequestHeaders.Add("UserTimeZone",
                        _httpContextAccessor?.HttpContext?.Request?.Headers["UserTimeZone"].ToString());
                    client.Timeout = TimeSpan.FromMinutes(60);
                    var result = await client.GetAsync(requestUri);
                    result.EnsureSuccessStatusCode();
                    var resultContentString = await result.Content.ReadAsStringAsync();
                    var resultContent = JsonConvert.DeserializeObject<SuccessResponseVM<T>>(resultContentString);
                    return resultContent;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<T> GetByIDAsync<T>(string requestUri)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(SiteKeys.BaseAPIUrl);
                client.DefaultRequestHeaders.Add("Authorization",
                    "Bearer " + _httpContextAccessor.HttpContext.Session.GetString("JWToken"));
                client.DefaultRequestHeaders.Add("UserTimeZone",
                    _httpContextAccessor?.HttpContext?.Request?.Headers["UserTimeZone"].ToString());
                client.Timeout = TimeSpan.FromMinutes(60);
                var result = await client.GetAsync(requestUri);
                result.EnsureSuccessStatusCode();
                var resultContentString = await result.Content.ReadAsStringAsync();
                var resultContent = JsonConvert.DeserializeObject<SuccessResponseVM<T>>(resultContentString);
                return resultContent.Result;
            }
        }

        public async Task<SuccessResponseVM<IEnumerable<T>>> GetListByIDAsync<T>(string requestUri, int Id)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(SiteKeys.BaseAPIUrl);
                    client.DefaultRequestHeaders.Add("Authorization",
                        "Bearer " + _httpContextAccessor.HttpContext.Session.GetString("JWToken"));
                    client.DefaultRequestHeaders.Add("UserTimeZone",
                        _httpContextAccessor?.HttpContext?.Request?.Headers["UserTimeZone"].ToString());
                    client.Timeout = TimeSpan.FromMinutes(60);
                    var result = await client.GetAsync(requestUri + "/" + Id);
                    result.EnsureSuccessStatusCode();
                    var resultContentString = await result.Content.ReadAsStringAsync();
                    var resultContent =
                        JsonConvert.DeserializeObject<SuccessResponseVM<IEnumerable<T>>>(resultContentString);
                    return resultContent;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<SuccessResponseVM<T>> PostAsync<T, M>(string requestUri, M model)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(SiteKeys.BaseAPIUrl);
                    client.DefaultRequestHeaders.Add("Authorization",
                        "Bearer " + _httpContextAccessor.HttpContext.Session.GetString("JWToken"));
                    client.Timeout = TimeSpan.FromMinutes(60);

                    // Serialize request object
                    var serialized = JsonConvert.SerializeObject(model);
                    var buffer = Encoding.UTF8.GetBytes(serialized);
                    var byteContent = new ByteArrayContent(buffer);
                    byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                    // Execute Post Request
                    var result = await client.PostAsync(requestUri, byteContent);

                    result.EnsureSuccessStatusCode();
                    var resultContentString = await result.Content.ReadAsStringAsync();
                    var resultContent = JsonConvert.DeserializeObject<SuccessResponseVM<T>>(resultContentString);
                    return resultContent;
                }
            }
            catch (Exception ex)
            {
                //throw ex;
                return null;
            }
        }

        public async Task<T> PutAsync<T>(string requestUri, T model)
        {
            var client = new RestClient(SiteKeys.BaseAPIUrl);
            var request = new RestRequest(requestUri, Method.PUT);
            request.RequestFormat = DataFormat.Json;
            var jsonObj = new JavaScriptSerializer().Serialize(model);
            request.AddJsonBody(jsonObj);
            var response = await client.ExecuteAsync<SuccessResponseVM<T>>(request);
            if (response != null && response.Data != null) return response.Data.Result;

            return response.Data.Result;
        }

        public async Task<SuccessResponseVM<PaginationSet<T>>> GetPaginationAsync<T>(string requestUri)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(SiteKeys.BaseAPIUrl);
                    client.DefaultRequestHeaders.Add("Authorization",
                        "Bearer " + _httpContextAccessor.HttpContext.Session.GetString("JWToken"));
                    client.DefaultRequestHeaders.Add("UserTimeZone",
                        _httpContextAccessor?.HttpContext?.Request?.Headers["UserTimeZone"].ToString());
                    client.Timeout = TimeSpan.FromMinutes(60);
                    var result = await client.GetAsync(requestUri);
                    result.EnsureSuccessStatusCode();
                    var resultContentString = await result.Content.ReadAsStringAsync();
                    var resultContent =
                        JsonConvert.DeserializeObject<SuccessResponseVM<PaginationSet<T>>>(resultContentString);
                    return resultContent;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}