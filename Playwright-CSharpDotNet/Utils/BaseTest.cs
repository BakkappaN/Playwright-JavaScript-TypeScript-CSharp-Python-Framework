using NUnit.Framework;
using Microsoft.Playwright;
using System.Threading.Tasks;
using AventStack.ExtentReports;
using PlaywrightCSharpDotNet.Utils;
using System.Threading;
using System.IO;
using NUnit.Framework.Interfaces;
using System;
using Microsoft.Playwright.NUnit;

namespace PlaywrightCSharpDotNet
{
    public class BaseTest : PageTest
    {
     /*   protected static IPlaywright _playwright;
        protected IBrowser _browser;*/

       // private IPage _page; // Instance variable for the page

        // Expose Page property
       // protected IPage Page => _page;

        protected int AssertionTimeout => int.Parse(TestContext.Parameters["AssertionTimeout"] ?? "5000");
        protected int ActionTimeout => int.Parse(TestContext.Parameters["ActionTimeout"] ?? "10000");
        protected int NavigationTimeout => int.Parse(TestContext.Parameters["NavigationTimeout"] ?? "15000");

        [OneTimeSetUp]
        public async Task OneTimeSetup()
        {
            // Initialize Playwright only once for all tests
           // _playwright ??= await Playwright.CreateAsync();

            ExtentTestManager.InitExtentReport();
        }

        [SetUp]
        public async Task SetUp()
        {
           /* // Launch a new browser for each test
            _browser = await _playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions { Headless = false });
            
            // Create a new page for the current thread
            _page = await _browser.NewPageAsync();*/
            
            ExtentTestManager.CreateTest(TestContext.CurrentContext.Test.Name);
           
        }

        [TearDown]
        public async Task TearDown()
        {
          /*  string testName = TestContext.CurrentContext.Test.Name;
            string testStatus = TestContext.CurrentContext.Result.Outcome.Status.ToString();
            string screenshotPath = Path.Combine(Directory.GetCurrentDirectory(), $"{testName}.png");

            if (Page != null)
            {
                // Capture screenshot if test fails
                if (testStatus.Equals("Failed"))
                {
                    await Page.ScreenshotAsync(new PageScreenshotOptions { Path = screenshotPath });
                    ExtentTestManager.AddScreenshot(testName, screenshotPath);
                    ExtentTestManager.LogError(testName, "Test failed. See screenshot below.");
                }
                else
                {
                    ExtentTestManager.LogTestResult(testName, TestStatus.Passed, "Test Passed");
                }

                // Close the page for the current thread
                await Page.CloseAsync();
            }
            else
            {
                ExtentTestManager.LogError(testName, "Page was not initialized.");
            }*/

            // Close the browser if needed; here it's done at the end of tests
            //await _browser.CloseAsync();
        }

        [OneTimeTearDown]
        public async Task OneTimeTearDown()
        {

            // Dispose Playwright only once
          /*  if (_playwright != null)
            {
                _playwright.Dispose(); // Use synchronous Dispose
            }*/
            ExtentTestManager.FlushReports(); // Write the report to file
        }
    }
}
