using Microsoft.Playwright;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework.Interfaces;

namespace PlaywrightCSharpDotNet.Utils
{
    public static class TestHandler
    {
        public static async Task CaptureScreenshotIfFailed(IPage page, TestContext context)
        {
            string testName = TestContext.CurrentContext.Test.Name;
            string testStatus = TestContext.CurrentContext.Result.Outcome.Status.ToString();
            string screenshotPath = Path.Combine(Directory.GetCurrentDirectory(), $"{testName}.png");

            if (page != null)
            {
                // Capture screenshot if test fails
                if (testStatus.Equals("Failed"))
                {
                    await page.ScreenshotAsync(new PageScreenshotOptions { Path = screenshotPath });
                    ExtentTestManager.AddScreenshot(testName, screenshotPath);
                    ExtentTestManager.LogError(testName, "Test failed. Check screenshot below.");
                    ExtentTestManager.LogTestResult(testName, TestStatus.Failed, "Test Execution Failed");
                }
                else
                {
                    ExtentTestManager.LogTestResult(testName, TestStatus.Passed, "Test Passed");
                }

                // Close the page for the current thread
                await page.CloseAsync();
            }
            else
            {
                ExtentTestManager.LogError(testName, "Page was not initialized.");
            }

            // Close the browser after the test
            //await _browser.CloseAsync();
        }
    }
}
