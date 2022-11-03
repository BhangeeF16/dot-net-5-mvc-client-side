using Microsoft.AspNetCore.Mvc;
using Worqbox.UI.Models;

namespace Worqbox.UI.ViewComponents
{
    public class NavigationViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            var items = NavigationModel.Full;

            return View(items);
        }
    }
}
