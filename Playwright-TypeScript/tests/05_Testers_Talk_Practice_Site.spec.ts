import { test, expect } from '@playwright/test';
import path from 'path';

// Constants for selectors and test data
const TEST_URL = 'https://bakkappan.github.io/Testers-Talk-Practice-Site/';
const USERNAME = 'TestersTalk';
const PASSWORD = 'TestersTalk';
const EMP_NAME = 'Employee1';
const EMP_DEPT = 'A123';
const EMP_DOB = '2025-06-02';
const GENDER = 'Male';
const CHECKBOXES = ['Playwright', 'Cypress', 'Selenium'];
const RADIO_BUTTON = 'United States';
const FILE_TO_UPLOAD = '../src/constants/CommonLogicalNames.json';
const EXPECTED_TITLE = 'Testers Talk Practice Site';
const EXPECTED_SUCCESS_MSG = 'Record saved successfully!';

// Main test
test.describe('Testers Talk Practice Page', () => {
    test('should perform all UI actions and assertions correctly', async ({ page }) => {
        // Navigate to the site
        await page.goto(TEST_URL);

        // Login
        await page.getByPlaceholder('Username').fill(USERNAME);
        await page.getByPlaceholder('Password').fill(PASSWORD);
        await page.getByRole('button', { name: 'Login' }).click();

        // Assert the title and URL
        await expect(page).toHaveTitle(EXPECTED_TITLE);
        await expect(page).toHaveURL(TEST_URL);

        // Fill form fields
        await page.getByPlaceholder('Employee Name').fill(EMP_NAME);
        await page.getByPlaceholder('Department').fill(EMP_DEPT);
        await page.getByLabel('Date of Birth:').fill(EMP_DOB);
        await page.getByLabel('Gender:').selectOption(GENDER);

        // Check checkboxes
        for (const item of CHECKBOXES) {
            await page.getByLabel(item).check();
        }
        // Select radio button
        await page.getByLabel(RADIO_BUTTON).check();

        // Handle external link (YouTube)
        const page1Promise = page.waitForEvent('popup');
        await page.getByRole('link', { name: ' Visit Testers Talk YouTube' }).click();
        const page1 = await page1Promise;
        await page1.close();

        // Handle alerts, confirmations, prompts
        await page.getByRole('button', { name: 'Simple' }).click();
        await page.getByRole('button', { name: 'OK' }).click();

        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => { });
        });
        await page.getByRole('button', { name: 'Confirm' }).click();

        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => { });
        });
        await page.getByRole('button', { name: 'Prompt' }).click();

        // Iframe handling (Playwright TypeScript Full Course)
        const page2Promise = page.waitForEvent('popup');
        await (await page.frameLocator('#courseFrame').locator('button:has-text("Playwright TypeScript Full Course")')).click();
        const page2 = await page2Promise;
        await page2.close();

        // Iframe handling (JavaScript Full Course)
        const page3Promise = page.waitForEvent('popup');
        await (await page.frameLocator('#courseFrame').locator('button:has-text("JavaScript Full Course")')).click();
        const page3 = await page3Promise;
        await page3.close();

        // Upload a file
        const filePath = path.resolve(__dirname, FILE_TO_UPLOAD);
        const fileInput = await page.locator('#fileInput');
        await fileInput.setInputFiles(filePath);
        const fileNameText = await page.locator('#fileName').innerText();
        expect(fileNameText).toContain('CommonLogicalNames.json');

        // Download a file
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('link', { name: 'Download File' }).click();
        const download = await downloadPromise;
        console.log(`Downloaded file: ${download.suggestedFilename()}`);
        await download.saveAs('test_downloaded_file.json');

        // Drag and drop
        const dragElement = page.locator('#draggable');
        const dropElement = page.locator('#droppable');
        await dragElement.dragTo(dropElement);
        await expect(dropElement).toHaveText('Dropped!');

        // Hover and click on the link
        const hoverLink = page.locator('.hover-link');
        await hoverLink.hover();
        const dropdown = page.locator('.hover-dropdown');
        await expect(dropdown).toBeVisible();
        const page4Promise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'Cypress by Testers Talk' }).click();
        const page4 = await page4Promise;
        await page4.close();

        // Auto suggestions handling
        await page.getByPlaceholder('Search courses...').fill('cypress');
        await page.getByRole('listitem').first().click();

        // Save the form
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.getByText(EXPECTED_SUCCESS_MSG)).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

        // Web Table handling
        const row = page.locator('#empTableBody tr').first();
        const cells = row.locator('td');
        const expectedValues = [
            EMP_NAME,
            EMP_DEPT,
            EMP_DOB,
            GENDER,
            CHECKBOXES.join(', '),
            RADIO_BUTTON,
        ];
        for (let i = 0; i < expectedValues.length; i++) {
            await expect(cells.nth(i)).toHaveText(expectedValues[i]);
        }
    });
});