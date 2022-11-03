#region Imports

using System.Net;

#endregion

namespace Worqbox.UI.Models.General
{
    public class SuccessResponseVM<T> : GeneralVM
    {
        public T Result { get; set; }
    }

    // Error Response model
    public class ErrorResponseVM : GeneralVM
    {
        public ErrorDetailVM Result { get; set; }
    }

    // Every Response inclueded the response
    public class GeneralVM
    {
        public string Message { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public bool Success { get; set; }
    }

    // Used for Exception Response
    public class ErrorDetailVM
    {
        public string ExceptionMessage { get; set; }
        public string ExceptionMessageDetail { get; set; }
        public string ReferenceErrorCode { get; set; }
        public object ValidationErrors { get; set; }
    }
}