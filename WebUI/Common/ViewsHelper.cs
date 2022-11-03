#region Imports

using System;

#endregion

namespace Worqbox.UI.Common
{
    public static class ViewsHelper
    {
        public static string ToSafeString(this string Value, string defaultReplace = "N/A")
        {
            if (string.IsNullOrWhiteSpace(Value)) return defaultReplace;

            return Value;
        }

        public static string ToDateOnly(this DateTime date)
        {
            return date.ToString("MM/dd/yyyy");
        }

        public static string GetFormatedDateString(this DateTime date)
        {
            return date > DateTime.MinValue ? date.ToString("MMM dd yyyy hh:mm tt") : "N/A";
        }
        public static string GetFormatedShortDateString(this DateTime date)
        {
            return date > DateTime.MinValue ? date.ToString("MMM dd yyyy") : "N/A";
        }
        public static string GetFormatedDateStringValue(DateTime date)
        {
            return date > DateTime.MinValue ? date.ToString("MMM dd yyyy hh:mm tt") : "N/A";
        }

        public static int GetSafeInt(this int value)
        {
            return value != 0 ? 0 : value;
        }

        public static double GetSafedouble(this double value)
        {
            return value != 0.0 ? 0.0 : value;
        }
    }
}