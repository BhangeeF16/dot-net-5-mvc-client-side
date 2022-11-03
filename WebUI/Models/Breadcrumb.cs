namespace Worqbox.UI.Models
{
    public class Breadcrumb
    {
        public Breadcrumb()
        {
        }

        public Breadcrumb(string text, string action, string controller, bool active)
        {
            Text = text;
            Action = action;
            Controller = controller;
            Active = active;
        }

        public string Text { get; set; }
        public string Action { get; set; }
        public string Controller { get; set; }
        public bool Active { get; set; }
    }
}