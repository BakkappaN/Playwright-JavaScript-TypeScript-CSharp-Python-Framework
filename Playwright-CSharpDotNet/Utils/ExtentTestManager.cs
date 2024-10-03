using AventStack.ExtentReports;
using AventStack.ExtentReports.Reporter;
using AventStack.ExtentReports.Reporter.Configuration;
using NUnit.Framework.Interfaces;
using System;
using System.Collections.Concurrent;
using System.IO;
using System.Threading.Tasks;

namespace PlaywrightCSharpDotNet.Utils
{
    public static class ExtentTestManager
    {
        private static ExtentReports _extent;
        private static ExtentHtmlReporter _htmlReporter;
        private static ConcurrentDictionary<string, ExtentTest> _testDictionary = new ConcurrentDictionary<string, ExtentTest>();
       
        private static string dir = AppDomain.CurrentDomain.BaseDirectory;
        private static string testResultPath = dir.Replace("bin\\Debug\\net6.0", "TestReport");
        //private static string _reportPath = testResultPath;

        public static void InitExtentReport()
        {
           /* DateTime now = DateTime.Now;
            string formattedDateTime = now.ToString("yyyy-MM-dd HH:mm:ss.fff");
            formattedDateTime = formattedDateTime.Replace("-", "_").Replace(":", "_").Replace(" ", "_").Replace(".", "_");*/

            // Initialize Extent Reports
            _htmlReporter = new ExtentHtmlReporter(testResultPath+"index.html");
            _htmlReporter.Config.ReportName = "Test Report";
            _htmlReporter.Config.DocumentTitle = "Automation Status Report";
            _htmlReporter.Config.Theme = Theme.Standard;
            _htmlReporter.Start();

            _extent = new ExtentReports();
            _extent.AttachReporter(_htmlReporter);
            _extent.AddSystemInfo("Application", "Web Application");
            _extent.AddSystemInfo("Browser", "Chrome");
            _extent.AddSystemInfo("OS", "Windows");
        }

        public static ExtentTest CreateTest(string testName)
        {
            var test = _extent.CreateTest(testName);
            _testDictionary.TryAdd(testName, test);
            return test;
        }

        public static void LogTestResult(string testName, TestStatus status, string message = "")
        {
            if (_testDictionary.TryGetValue(testName, out var test))
            {
                if (status == TestStatus.Passed)
                {
                    test.Pass(message);
                }
                else
                {
                    test.Fail(message);
                }
            }
        }

        public static void LogInfo(string testName, string message)
        {
            if (_testDictionary.TryGetValue(testName, out var test))
            {
                test.Info(message);
            }
        }

        public static void LogError(string testName, string message)
        {
            if (_testDictionary.TryGetValue(testName, out var test))
            {
                test.Error(message);
            }
        }

        public static void AddScreenshot(string testName, string screenshotPath)
        {
            if (_testDictionary.TryGetValue(testName, out var test))
            {
                test.AddScreenCaptureFromPath(screenshotPath);
            }
        }

        public static void FlushReports()
        {
            _extent.Flush();
        }
    }
}
