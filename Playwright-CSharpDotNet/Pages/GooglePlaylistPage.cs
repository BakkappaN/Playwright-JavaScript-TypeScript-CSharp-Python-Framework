using Microsoft.Playwright;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaywrightCSharpDotNet.Pages
{
    public class GooglePlaylistPage
    {
        private readonly IPage _page;

        public GooglePlaylistPage(IPage page)
        {
            _page = page;
        }

        private ILocator VideoLink => _page.Locator("#container > #thumbnail");

        public async Task ClickOnVideo()
        {
            await VideoLink.Nth(0).ClickAsync();
        }
    }
}
