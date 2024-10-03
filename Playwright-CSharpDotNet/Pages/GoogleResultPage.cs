using Microsoft.Playwright;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaywrightCSharpDotNet.Pages
{
    public class GoogleResultPage
    {
        private readonly IPage _page;

        public GoogleResultPage(IPage page)
        {
            _page = page;
        }

        private ILocator PlaylistLink => _page.GetByRole(AriaRole.Link, new() { Name = "Playwright by Testers Talk" });

        public async Task ClickOnPlaylistLink()
        {
            await PlaylistLink.Nth(0).ClickAsync();
        }

        public async Task ClickOnPlaylistLink(string playlist)
        {
            var playlistLink = _page.GetByRole(AriaRole.Link, new() { Name = playlist });
            await playlistLink.Nth(0).ClickAsync();
        }
    }
}
