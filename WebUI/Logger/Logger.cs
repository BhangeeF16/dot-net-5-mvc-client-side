#region Imports

using log4net;
using System;

#endregion

namespace Worqbox.UI
{
    public static class Logger
    {
        private static readonly string LOG_CONFIG_FILE = @"log4net.config";

        private static readonly ILog _log = GetLogger(typeof(Logger));

        public static ILog GetLogger(Type type)
        {
            return LogManager.GetLogger(type);
        }

        public static void Debug(object message)
        {
            SetLog4NetConfiguration();
            _log.Debug(message);
        }

        private static void SetLog4NetConfiguration()
        {
            //var log4netConfig = new XmlDocument();
            //log4netConfig.Load(File.OpenRead(LOG_CONFIG_FILE));

            //var repo = LogManager.CreateRepository(
            //    Assembly.GetEntryAssembly(), typeof(Hierarchy));

            //XmlConfigurator.Configure(repo, log4netConfig["log4net"]);
        }
    }
}