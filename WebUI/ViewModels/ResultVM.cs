#region Imports

using System;

#endregion

namespace Worqbox.UI.ViewModels
{
    public class ResultVM<T>
    {
        public string AccessToken { get; set; }
        public T User { get; set; }
        public DateTime ExpiresAt { get; set; }
        public DateTime RequestedServerUtcNow { get; set; }
    }
}