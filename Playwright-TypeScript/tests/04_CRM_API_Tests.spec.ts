import { test, expect } from "@playwright/test";
import { createAccountRecord, checkIfRecordIsPresent, deleteRecord, generateToken } from '../src/utils/crmapihelper';

import { CommonLogicalNames } from '../src/constants/CommonLogicalNames.json';

import dotenv from 'dotenv';
dotenv.config();

/**
 * Author: Testers Talk
 */
test('Playwright with Dynamics CRM API Testing', { tag: ['@CRMAPITest'] }, async ({ page }) => {

    let recordGuid: string;
    let token: string;
    const apiBaseURL = `${process.env.CRM_API_URL}`;

    await test.step('Create a record', async () => {
        token = await generateToken(apiBaseURL);
        recordGuid = await createAccountRecord(token);
    });

    await test.step('Verify the record', async () => {
        await checkIfRecordIsPresent('account', recordGuid, token, apiBaseURL);
    });

    await test.step('Delete a record', async () => {
        await deleteRecord(CommonLogicalNames.Entity.Account, recordGuid);
    });
})