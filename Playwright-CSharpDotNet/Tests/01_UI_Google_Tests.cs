using Microsoft.Playwright;
using NUnit.Framework;
using System;
using System.Threading;
using System.Threading.Tasks;
using PlaywrightCSharpDotNet.Utils;
using NUnit.Framework.Interfaces;
using PlaywrightCSharpDotNet.Pages;
using System.Text.RegularExpressions;
using Microsoft.Playwright.NUnit;

namespace PlaywrightCSharpDotNet
{
    [TestFixture]
    [Parallelizable(ParallelScope.All)]
    public class UITests1 : BaseTest //:PageTest
    {

        [Test]
        public async Task GoogleTest1()
        {
            string testName = TestContext.CurrentContext.Test.Name;

            try
            {
                ExtentTestManager.LogInfo(testName, testName);
                ExtentTestManager.LogInfo(testName, "Navigating to the example page. " + testName);

                var _googleSearchPage = new GoogleSearchPage(Page);
                await _googleSearchPage.NavigateToURL();
                await _googleSearchPage.Search("playwright by testers talk");

                var _googleResultPage = new GoogleResultPage(Page);
                await _googleResultPage.ClickOnPlaylistLink();

                var _googlePlaylistPage = new GooglePlaylistPage(Page);
                await _googlePlaylistPage.ClickOnVideo();

                ExtentTestManager.LogInfo(testName, "Validate page title " + testName);
                await Expect(Page).ToHaveTitleAsync(new Regex("Playwright Tutorial Full Course 2024 | Playwright Testing Tutorial - YouTube"));

                ExtentTestManager.LogTestResult(testName, TestStatus.Passed, "Page title is correct." + testName);
            }
            catch (Exception ex)
            {
                // Log the error
                ExtentTestManager.LogError(testName, $"Test failed with exception: {ex.Message}");
                await TestHandler.CaptureScreenshotIfFailed(Page, TestContext.CurrentContext);
                throw; // Re-throw the exception to mark the test as failed
            }
        }

        [Test]
        public async Task GoogleTest2()
        {
            string testName = TestContext.CurrentContext.Test.Name;

            try
            {
                ExtentTestManager.LogInfo(testName, testName);
                ExtentTestManager.LogInfo(testName, "Navigating to the example page. " + testName);
                // _page = await _browser.NewPageAsync();

                var _googleSearchPage = new GoogleSearchPage(Page);
                await _googleSearchPage.NavigateToURL();
                await _googleSearchPage.Search("playwright by testers talk");

                var _googleResultPage = new GoogleResultPage(Page);
                await _googleResultPage.ClickOnPlaylistLink();

                var _googlePlaylistPage = new GooglePlaylistPage(Page);
                await _googlePlaylistPage.ClickOnVideo();

                ExtentTestManager.LogInfo(testName, "Validate page title " + testName);
                await Expect(Page).ToHaveTitleAsync(new Regex("Playwright Tutorial Full Course 2024 | Playwright Testing Tutorial - YouTube"));

                ExtentTestManager.LogTestResult(testName, TestStatus.Passed, "Page title is correct." + testName);
            }
            catch (Exception ex)
            {
                // Log the error
                ExtentTestManager.LogError(testName, $"Test failed with exception: {ex.Message}");
                await TestHandler.CaptureScreenshotIfFailed(Page, TestContext.CurrentContext);
                throw; // Re-throw the exception to mark the test as failed
            }
        }
    }
}

/*[Test]
public async Task GoogleTest1()
{
    string testName = TestContext.CurrentContext.Test.Name;
    try
    {
        ExtentTestManager.LogInfo(testName, testName);
        ExtentTestManager.LogInfo(testName, "Navigating to the example page. "+ testName);
       // _page = await _browser.NewPageAsync();
        await Page.GotoAsync("https://www.google.com/search?q=playwright+by+testers+talk");

        ExtentTestManager.LogInfo(testName, "Retrieving page title. "+ testName);
        var title = await Page.TitleAsync();

        Assert.AreEqual("playwright by testers talk - Google Search", title);
        ExtentTestManager.LogTestResult(testName, TestStatus.Passed, "Page title is correct."+ testName);
    }
    catch (Exception ex)
    {
        // Log the error
        ExtentTestManager.LogError(testName, $"Test failed with exception: {ex.Message}");
        await TestHandler.CaptureScreenshotIfFailed(Page, TestContext.CurrentContext, _browser);
        throw; // Re-throw the exception to mark the test as failed
    }
}*/

