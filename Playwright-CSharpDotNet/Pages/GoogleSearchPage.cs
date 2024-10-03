using Microsoft.Playwright;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaywrightCSharpDotNet.Pages
{
    public class GoogleSearchPage
    {
        private readonly IPage _page;

        public GoogleSearchPage(IPage page)
        {
            _page = page;
        }

        private ILocator SearchTextbox => _page.Locator("#APjFqb");

        public async Task NavigateToURL()
        {
            await this._page.GotoAsync("https://www.google.com");
        }

        public async Task Search(string keyword)
        {
            await SearchTextbox.ClickAsync();
            await SearchTextbox.FillAsync(keyword);
            await SearchTextbox.PressAsync("Enter");
            //await _page.Keyboard.PressAsync("Enter");
        }
    }
}
