#region Imports

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;

#endregion

// ReSharper disable AutoPropertyCanBeMadeGetOnly.Global
// ReSharper disable MemberCanBePrivate.Global
// ReSharper disable UnusedAutoPropertyAccessor.Global
// ReSharper disable InconsistentNaming

namespace Worqbox.UI.Models.General
{
    /// <summary>Provides easy-access to building the LearningUpgrade Navigation using JSON text data.</summary>
    /// <remarks>These classes are solely created for Demo purposes, please do not use them in Production.</remarks>
    internal static class NavigationBuilder
    {
        private static JsonSerializerSettings DefaultSettings => SerializerSettings();

        private static JsonSerializerSettings SerializerSettings(bool indented = true)
        {
            return new()
            {
                DateFormatHandling = DateFormatHandling.IsoDateFormat,
                Formatting = indented ? Formatting.Indented : Formatting.None,
                NullValueHandling = NullValueHandling.Ignore,
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                Converters = new List<JsonConverter> { new StringEnumConverter() }
            };
        }

        public static SmartNavigation FromJson(string json)
        {
            return JsonConvert.DeserializeObject<SmartNavigation>(json, DefaultSettings);
        }
    }

    public sealed class SmartNavigation
    {
        public SmartNavigation()
        {
        }

        public SmartNavigation(IEnumerable<ListItem> items)
        {
            Lists = new List<ListItem>(items);
        }

        public string Version { get; set; }
        public List<ListItem> Lists { get; set; } = new();
    }

    public class ListItem
    {
        public string Icon { get; set; }
        public bool ShowOnSeed { get; set; } = true;
        public string Title { get; set; }
        public string Text { get; set; }
        public string Href { get; set; }
        public string Route { get; set; }
        public string Tags { get; set; }
        public string I18n { get; set; }
        public bool Disabled { get; set; }
        public List<ListItem> Items { set; get; } = new();
        public Span Span { get; set; } = new();
    }

    public sealed class Span
    {
        public string Position { get; set; }
        public string Class { get; set; }
        public string Text { get; set; }

        public bool HasValue()
        {
            return (Position?.Length ?? 0) + (Class?.Length ?? 0) + (Text?.Length ?? 0) > 0;
        }
    }
}