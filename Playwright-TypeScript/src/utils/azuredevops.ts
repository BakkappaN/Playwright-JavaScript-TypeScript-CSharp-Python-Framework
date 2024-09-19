import { request, expect } from '@playwright/test';
import { readExcelFile } from './excelhandler';

let apiRequest: any;

// Initialize the API request object
(async () => {
    apiRequest = await request.newContext();
})();

const credentials = Buffer.from(`${process.env.AZURE_DEVOPS_USER}:${process.env.AZURE_DEVOPS_PASS}`).toString('base64');

/**
 * Bakkappa N
 */
class AzureDevOps {
    constructor() {}

    async updateTestCaseStatus(filePath: string, sheetName: string): Promise<void> {
        try {
            const data = await readExcelFile(filePath, sheetName);

            // Log the keys of the first row to check column names
            if (data.length > 0) {
                console.log('First row column headers:', Object.keys(data[0]));
            } else {
                console.error('No data found.');
                return;
            }

            console.log(`Total number of test cases: ${data.length}`);
            console.log('Excel data converted into JSON: ' + JSON.stringify(data));

            const testPlanId = process.env.TEST_PLAN_ID as string;
            const testSuiteId = process.env.TEST_SUITE_ID as string;

            for (let i = 0; i < data.length; i++) {
                const row = data[i];
                const testCaseId = row['Test_Case_Id'] as string;
                const testCaseStatus = row['Test_Case_Status'] as string;
                const testPointId = await this.getTestPoint(testPlanId, testSuiteId, testCaseId);
                await this.updateTestPointStatus(testPlanId, testSuiteId, testPointId, testCaseStatus.charAt(0).toUpperCase() + testCaseStatus.slice(1));
                console.log('Row is:', row);
                console.log(`Updated Test Case ID - ${testCaseId}: ${testCaseStatus} in test plan`);
            }
            console.log(`Completed updating test case status for: ${data.length}`);
        } catch (error) {
            console.error('Error in updating test case status:', error);
            throw error; // Rethrow to indicate failure
        }
    }

    async getTestPoint(testPlanId: string, testSuiteId: string, testCaseId: string): Promise<string> {
        const values = [testPlanId, testSuiteId, testCaseId];
        const URL = process.env.TEST_PLAN_GET_API!.replace(/{(\d+)}/g, (match, number) => values[number] || match);

        const getTestPointResponse = await apiRequest.get(URL, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Basic ${credentials}`
            },
        });

        const jsonResponse = await getTestPointResponse.json();
        expect(getTestPointResponse.ok()).toBeTruthy();
        expect(getTestPointResponse.status()).toBe(200);
        return jsonResponse.value[0].id;
    }

    async updateTestPointStatus(testPlanId: string, testSuiteId: string, testPointId: string, testCaseStatus: string): Promise<void> {
        const values = [testPlanId, testSuiteId, testPointId];
        const URL = process.env.TEST_PLAN_PATCH_API!.replace(/{(\d+)}/g, (match, number) => values[number] || match);
        const patchAPIResponse = await apiRequest.patch(URL, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Basic ${credentials}`
            },
            data: {
                "outcome": testCaseStatus // Passed, Failed, Blocked, etc.
            },
        });
        expect(patchAPIResponse.ok()).toBeTruthy();
        expect(patchAPIResponse.status()).toBe(200);
    }
}

export default AzureDevOps;
