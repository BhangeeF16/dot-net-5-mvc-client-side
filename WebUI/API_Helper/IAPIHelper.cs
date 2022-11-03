#region Imports

using System.Collections.Generic;
using System.Threading.Tasks;
using Worqbox.UI.Models.General;

#endregion

namespace Worqbox.UI.API_Helper
{
    public interface IAPIHelper
    {
        Task<SuccessResponseVM<IEnumerable<T>>> GetAsync<T>(string requestUri);
        Task<T> GetByIDAsync<T>(string requestUri);
        Task<SuccessResponseVM<IEnumerable<T>>> GetListByIDAsync<T>(string requestUri, int ID);
        Task<SuccessResponseVM<T>> PostAsync<T, M>(string requestUri, M model);
        Task<int> DeleteAsync(string requestUri, int ID);
        Task<T> PutAsync<T>(string requestUri, T request);
        Task<SuccessResponseVM<T>> GetSingleAsync<T>(string requestUri);
    }
}