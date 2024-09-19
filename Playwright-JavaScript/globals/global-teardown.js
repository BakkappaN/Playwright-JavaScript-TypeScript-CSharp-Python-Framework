const XLSX = require('xlsx');
const path = require('path');

import AzureDevOps from '../utils/azuredevops';

async function globalTeardown() {
    console.log('Global teardown is running...');
    const azureDevOps = new AzureDevOps();
    const filePath = process.env.TC_STATUS_PATH;
    const sheetName = process.env.TC_STATUS_SHEET;
    
   if (process.env.UPDATE_TEST_PLAN == 'Yes' && process.env.PIPELINE == 'Yes') {
     await azureDevOps.updateTestCaseStatus(filePath,sheetName);
   } else {
    
   }
}
module.exports = globalTeardown;