/**
 * author: Bakkappa N
 */
export async function waitUntilAppIdle(page) {
   try {
       await page.waitForFunction(() => (window).UCWorkBlockTracker?.isAppIdle());
   } catch (e) {
       console.log("waitUntilIdle failed, ignoring.., error: " + e?.message);
   }
}

/**
* author: Bakkappa N
*/
export const stringFormat = (str, ...args) =>
   str.replace(/{(\d+)}/g, (match, index) => args[index].toString() || "");

/**
* author: Bakkappa N
*/
export async function navigateToApps(page, appId, appName) {
   console.log('Navigate to ' + appName.toString() + ' - Start');
   await page.goto('/main.aspx?appid=' + appId.toString());
   await expect(page.getByRole('button', { name: appName })).toBeTruthy();
   console.log('Navigated to ' + appName.toString() + '- Success');
}

/**
* author: Bakkappa N
*/
export let LoadState
   ; (function (LoadState) {
       LoadState["DomContentLoaded"] = "domcontentloaded"
       LoadState["Load"] = "load"
       LoadState["NetworkIdle"] = "networkidle"
   })(LoadState || (LoadState = {}))

/**
* author: Bakkappa N
*/
export let TimeOut; (function (TimeOut) {
   TimeOut[(TimeOut["DefaultLoopWaitTime"] = 5000)] = "DefaultLoopWaitTime"
   TimeOut[(TimeOut["DefaultWaitTime"] = 30000)] = "DefaultWaitTime"
   TimeOut[(TimeOut["DefaultMaxWaitTime"] = 180000)] = "DefaultMaxWaitTime"
   TimeOut[(TimeOut["DefaultWaitTimeForValidation"] = 30000)] =
       "DefaultWaitTimeForValidation"
   TimeOut[(TimeOut["ElementWaitTime"] = 2000)] = "ElementWaitTime"
   TimeOut[(TimeOut["ExpectRetryDefaultWaitTime"] = 30000)] =
       "ExpectRetryDefaultWaitTime"
   TimeOut[(TimeOut["LoadTimeOut"] = 60000)] = "LoadTimeOut"
   TimeOut[(TimeOut["NavigationTimeout"] = 60000)] = "NavigationTimeout"
   TimeOut[(TimeOut["PageLoadTimeOut"] = 30000)] = "PageLoadTimeOut"
   TimeOut[(TimeOut["TestTimeout"] = 360000)] = "TestTimeout"
   TimeOut[(TimeOut["TestTimeoutMax"] = 6000000)] = "TestTimeoutMax"
   TimeOut[(TimeOut["OneMinuteTimeOut"] = 60000)] = "OneMinuteTimeOut"
   TimeOut[(TimeOut["TwoMinutesTimeout"] = 120000)] = "TwoMinutesTimeout"
   TimeOut[(TimeOut["ThreeMinutesTimeout"] = 180000)] = "ThreeMinutesTimeout"
   TimeOut[(TimeOut["FourMinutesTimeout"] = 240000)] = "FourMinutesTimeout"
   TimeOut[(TimeOut["FiveMinutesTimeout"] = 300000)] = "FiveMinutesTimeout"
})(TimeOut || (TimeOut = {}))