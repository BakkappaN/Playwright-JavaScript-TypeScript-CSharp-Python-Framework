const { expect } = require('@playwright/test');

import exp from 'constants';
import { subAreaMenuSelectors, CommandBarFormButtonsSelectors, viewSelectors, cswSelectors, gridSelectors } from '../selectors/commonselector.json';
import { stringFormat, waitUntilAppIdle } from '../utils/Common';

/**
* author: Testers Talk
*/
exports.CRMHelper = class CRMHelper {
    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
    }

    /**
    * author: Testers Talk
    */
    async goToEntity(header, entity) {
        await expect(this.page.locator(stringFormat(subAreaMenuSelectors.ServiceCaseMenuSelector, header, entity))).toBeEnabled();
        await this.page.locator(stringFormat(subAreaMenuSelectors.ServiceCaseMenuSelector, header, entity)).click({ timeout: 20000 });
        await waitUntilAppIdle(this.page);
    }

    /**
    * author: Testers Talk
    */
    async clickOnCommandBarBtn(button) {
        await expect(this.page.locator(stringFormat(CommandBarFormButtonsSelectors.DynamicCommandBarButtonSelector, button))).toBeEnabled();
        await this.page.locator(stringFormat(CommandBarFormButtonsSelectors.DynamicCommandBarButtonSelector, button)).click();
        await waitUntilAppIdle(this.page);
    }

    /**
    * author: Testers Talk
    */
    async selectView(view) {
        await expect(this.page.locator(stringFormat(viewSelectors.DefaultViewSelector, view))).toBeEnabled();
        await this.page.locator(stringFormat(viewSelectors.DefaultViewSelector, view)).click();
        await waitUntilAppIdle(this.page);
        const viewMenu = this.page.locator(stringFormat(viewSelectors.DynamicViewSelector, view)).first();
        await viewMenu.waitFor({ state: 'attached' });
        await viewMenu.click();
        await waitUntilAppIdle(this.page);
        console.log('Selected view is : ' + view);
    }

    /**
    * author: Testers Talk
    */
    async searchRecord(search) {
        const locator = 'Filter by keyword';
        await this.page.getByPlaceholder(locator).clear();
        await this.page.getByPlaceholder(locator).fill(search);
        await this.page.getByPlaceholder(locator).press('Enter');
        await waitUntilAppIdle(this.page);
    }

    /**
    * author: Testers Talk
    */
    async openRecordBySingleClick(row, col) {
        const locator = "[data-id='cell-{0}-{1}']";
        await expect(this.page.locator(stringFormat(locator, row, col))).toBeEnabled();
        await this.page.locator(stringFormat(locator, row, col)).click();
        await waitUntilAppIdle(this.page);
    }

    /**
    * author: Testers Talk
    */
    async openRecordByDoubleClick(row, col) {
        const locator = "[data-id='cell-{0}-{1}']";
        await expect(this.page.locator(stringFormat(locator, row, col))).toBeEnabled();
        await this.page.locator(stringFormat(locator, row, col)).dblclick();
        await waitUntilAppIdle(this.page);
    }

    /**
    * author: Testers Talk
    */
    async clickOnTab(name) {
        await expect(this.page.locator(stringFormat(cswSelectors.TabSelector, name))).toBeEnabled();
        await this.page.locator(stringFormat(cswSelectors.TabSelector, name)).click();
        await waitUntilAppIdle(this.page);
    }

    /**
    * author: Testers Talk
    */
    async clickOnCommandBarSaveBtn() {
        await expect(this.page.locator(CommandBarFormButtonsSelectors.SaveButton)).toBeEnabled();
        await this.page.locator(CommandBarFormButtonsSelectors.SaveButton).click();
        await waitUntilAppIdle(this.page);
    }

    /**
    * author: Testers Talk
    */
    async openGridFirstRecord(count) {
        await expect(this.page.locator(gridSelectors.gridFirstRowSelector)).toBeVisible();
        await this.page.locator(gridSelectors.gridFirstRowSelector).click({ clickCount: count });
        await waitUntilAppIdle(this.page);
    }

    /**
    * author: Testers Talk
    */
    async clickBackButton() {
        const locator = 'Press Enter to go back.';
        await expect(this.page.getByLabel(locator)).toBeEnabled();
        await expect(this.page.getByLabel(locator)).click();
        await waitUntilAppIdle(this.page);
    }

    /**
    * author: Testers Talk
    */
    async selectGridRecordRadioBtn() {
        const locator = '.ms-Stack > .ms-Checkbox';
        await expect(this.page.getByLabel(locator).first()).toBeEnabled();
        await expect(this.page.getByLabel(locator).first()).click();
        await waitUntilAppIdle(this.page);
    }

    /**
    * author: Testers Talk
    */
    async selectDropdownValue(label, value) {
        await expect(this.page.getByLabel(label, { exact: true }).first()).toBeVisible();
        await this.page.getByLabel(label, { exact: true }).first().click();
        await expect(this.page.getByRole('option', { name: value }).first()).toBeVisible();
        await this.page.getByRole('option', { name: value }).first().click();
        await waitUntilAppIdle(this.page);
    }
}