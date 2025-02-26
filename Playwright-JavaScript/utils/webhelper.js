/**
 * author: Bakkappa N
 */
export async function ZoomIn(page, zoomLevel) {
    const totalZoomLevel = parseFloat(zoomLevel);
    await page.evaluate((zoomLevel) => {
        document.body.style.zoom = zoomLevel;
    }, totalZoomLevel);
 }

 /**
 * author: Bakkappa N
 */
 export async function ScrollToHeight() {
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
 }

 /**
 * author: Bakkappa N
 */
 export async function ScrollByLabel() { 
    let isElementPresent = true;
    while (isElementPresent) {
        let isElement = await page.getByLabel('label', { exact : true}).isVisible();
        if (isElement) {
            await page.evaluate(() => {
                window.scrollBy(0, 100);
            });
            break;
        } else {
            await page.keyboard.press('PageDown');
            await page.waitForTimeout(1000);
            isElementPresent = true;
        }
    }
 }

 /**
 * author: Bakkappa N
 */
 export async function ZoomToEightyPercent() {
    await page.evaluate(() => {
        document.body.style.transform = 'scale(0.8)';
        document.body.style.transformOrigin = '0 0';
        document.body.style.width = '125%';
        document.body.style.height = '125%';
    });
 }

