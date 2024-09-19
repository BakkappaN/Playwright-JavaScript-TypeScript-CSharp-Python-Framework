import * as XLSX from 'xlsx';
import AzureDevOps from '../src/utils/azuredevops';

import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function globalTeardown(): Promise<void> {
    console.log('Global teardown is running...');
    const azureDevOps = new AzureDevOps();
    const filePath = process.env.TC_STATUS_PATH as string; // Type assertion
    const sheetName = process.env.TC_STATUS_SHEET as string; // Type assertion

    if (process.env.UPDATE_TEST_PLAN === 'Yes' && process.env.PIPELINE === 'Yes') {
        await azureDevOps.updateTestCaseStatus(filePath, sheetName);
    } else {
        console.log('Update test plan or pipeline conditions not met.');
    }
}

export default globalTeardown;
