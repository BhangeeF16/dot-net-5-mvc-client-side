#region Imports

using Newtonsoft.Json;
using System;
using Worqbox.UI.ExceptionTracer;

#endregion

namespace Worqbox.UI.AuthorizationHelper
{
    public static class LUSecretManager
    {

        public static AWSResponseModal GetSecret(string secretName)
        {
            try
            {

                try
                {

                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }

                return JsonConvert.DeserializeObject<AWSResponseModal>("");
            }
            catch (Exception ex)
            {
                ExceptionLogging.SendErrorToText(ex);
                return null;
            }
        }
    }
}