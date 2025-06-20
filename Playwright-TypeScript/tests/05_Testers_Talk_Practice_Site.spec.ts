import { test, expect } from '@playwright/test';
import path from 'path';

test('Testers Talk Practice Page Test', async ({ page }) => {

    const empName = 'Employee1';
    const empDept = 'A123';
    const empDOB = '2025-06-02';
    const gender = 'Male';
    const checkboxes = ['Playwright', 'Cypress', 'Selenium'];
    const radioButton = 'United States';

    // URL
    await page.goto('https://bakkappan.github.io/Testers-Talk-Practice-Site/');

    // Login
    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill('TestersTalk');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('TestersTalk');
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert the title of the page
    const title = await page.title();
    expect(title).toBe('Testers Talk Practice Site');

    // Assert the URL of the page
    const url = page.url();
    expect(url).toBe('https://bakkappan.github.io/Testers-Talk-Practice-Site/');

    // Textbox, Dropdown, Datepicker selection
    await page.getByPlaceholder('Employee Name').click();
    await page.getByPlaceholder('Employee Name').fill(empName);
    await page.getByPlaceholder('Department').click();
    await page.getByPlaceholder('Department').fill(empDept);
    await page.getByLabel('Date of Birth:').fill(empDOB);
    await page.getByLabel('Gender:').selectOption(gender);

    // Checkbox, & Radio button selection
    for (const item of checkboxes) {
        await page.getByLabel(item).check();
    }

    await page.getByLabel(radioButton).check();


    // links & new tab/window handling
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: ' Visit Testers Talk YouTube' }).click();
    const page1 = await page1Promise;
    await page1.close();

    // Alerts, Confirmations, Prompts
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

    // Iframe handling
    const page2Promise = page.waitForEvent('popup');
    await page.locator('#courseFrame').contentFrame().getByRole('button', { name: 'Playwright TypeScript Full Course' }).click();
    const page2 = await page2Promise;
    await page2.close();

    const page3Promise = page.waitForEvent('popup');
    await page.locator('#courseFrame').contentFrame().getByRole('button', { name: 'JavaScript Full Course' }).click();
    const page3 = await page3Promise;
    await page3.close();

    // Auto suggestions handling
    await page.getByPlaceholder('Search courses...').click();
    await page.getByPlaceholder('Search courses...').fill('cypress');
    await page.getByRole('listitem').first().click();

    // Upload a file 
    const filePath = path.resolve(__dirname, '../src/constants/CommonLogicalNames.json'); // Path relative to tests directory
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

    // Hover over & click on the link
    const hoverLink = page.locator('.hover-link');
    await hoverLink.hover();
    const dropdown = page.locator('.hover-dropdown');
    await expect(dropdown).toBeVisible();
    const page4Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Cypress by Testers Talk' }).click();
    const page4 = await page4Promise;
    await page4.close();

    // Save the form
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Record saved successfully!')).toBeVisible();
    await page.getByRole('button', { name: 'OK' }).click();

    // Web Table handling
    const row = page.locator('#empTableBody tr').first();
    const cells = row.locator('td');
    const expectedValues = [
        empName,
        empDept,
        empDOB,
        gender,
        checkboxes.join(', '),
        radioButton,
    ];
    for (let i = 0; i < expectedValues.length; i++) {
        await expect(cells.nth(i)).toHaveText(expectedValues[i]);
    }
});