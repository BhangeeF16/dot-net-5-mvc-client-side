#region Imports

using System;
using System.IO;
using System.Reflection;

#endregion

namespace Worqbox.UI.ExceptionTracer
{
    public static class ExceptionLogging
    {
        private static string ErrorlineNo, Errormsg, extype, InnerException, hostIp, ErrorLocation, HostAdd;

        private static string CurrentAssemblyDirectory()
        {
            var codeBase = Assembly.GetExecutingAssembly().CodeBase;
            var uri = new UriBuilder(codeBase);
            var path = Uri.UnescapeDataString(uri.Path);
            return Path.GetDirectoryName(path);
        }

        public static void SendErrorToText(Exception ex)
        {
            var line = Environment.NewLine + Environment.NewLine;

            ErrorlineNo = ex?.StackTrace?.Substring(ex.StackTrace.Length - 7, 7);
            Errormsg = ex?.GetType()?.Name;
            extype = ex?.GetType()?.ToString();
            InnerException = ex?.InnerException?.Message;
            ErrorLocation = ex?.Message;

            try
            {
                var filepath = CurrentAssemblyDirectory(); //Text File Path

                if (!Directory.Exists(filepath)) Directory.CreateDirectory(filepath);

                filepath = filepath + DateTime.Today.ToString("dd-MM-yy") + ".txt"; //Text File Name
                if (!File.Exists(filepath)) File.Create(filepath).Dispose();

                using (var sw = File.AppendText(filepath))
                {
                    var error = "Log Written Date:" + " " + DateTime.Now + line + "Error Line No :" +
                                " " + ErrorlineNo + line + "Error Message:" + " " + Errormsg + line +
                                "Exception Type:" + " " + extype + line + "Error Location :" + " " + ErrorLocation +
                                line + " Error Page Url:" + " " + InnerException + line + "User Host IP:" + " " +
                                hostIp + line;
                    sw.WriteLine("-----------Exception Details on " + " " + DateTime.Now +
                                 "-----------------");
                    sw.WriteLine(
                        "-------------------------------------------------------------------------------------");
                    sw.WriteLine(line);
                    sw.WriteLine(error);
                    sw.WriteLine("--------------------------------*End*------------------------------------------");
                    sw.WriteLine(line);
                    sw.Flush();
                    sw.Close();
                }
            }
            catch (Exception e)
            {
                e.ToString();
            }
        }
    }
}