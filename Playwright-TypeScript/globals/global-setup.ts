import * as XLSX from 'xlsx';
import { promises as fs } from 'fs';

import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function globalSetup(): Promise<void> {
    console.log('Global setup is running...');
    const filePath = process.env.TC_STATUS_PATH as string; // Type assertion for the environment variable

    if (process.env.UPDATE_TEST_PLAN === 'Yes' && process.env.PIPELINE === 'Yes') {
        try {
            // Check if the file exists
            try {
                await fs.access(filePath);
                // File exists, delete it
                await deleteFile(filePath);
            } catch (err) {
                if (err.code === 'ENOENT') {
                    // File does not exist, no need to delete
                    console.log(`File does not exist at ${filePath}`);
                } else {
                    // Unexpected error
                    throw err;
                }
            }

            // Create the Excel file
            await createTCStatusFile(filePath);
        } catch (err) {
            console.error('An error occurred:', err);
        }
    } else {
        console.log('Update test plan or pipeline conditions not met.');
    }
}

async function createTCStatusFile(filePath: string): Promise<void> {
    const workbook = XLSX.utils.book_new();
    const headers = ['Test_Case_Id', 'Test_Case_Status', 'TC_Outcome_Updated'];
    const worksheet = XLSX.utils.aoa_to_sheet([headers]);
    XLSX.utils.book_append_sheet(workbook, worksheet, process.env.TC_STATUS_SHEET as string);
    XLSX.writeFile(workbook, filePath);
    console.log(`Generated new test case status file: ${filePath}`);
}

async function deleteFile(filePath: string): Promise<void> {
    try {
        await fs.unlink(filePath);
        console.log(`File successfully deleted at ${filePath}`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            // File does not exist
            console.log(`File does not exist at ${filePath}`);
        } else {
            // Unexpected error
            console.error(`Error deleting file at ${filePath}:`, err);
        }
    }
}

export default globalSetup;
