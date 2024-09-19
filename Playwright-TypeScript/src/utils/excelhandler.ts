import { test, expect } from '@playwright/test';
import * as xlsx from 'xlsx';

/**
 * Bakkappa N
 * 
 * @param filePath - The path to the Excel file.
 * @param sheet - The name of the sheet to read from.
 * @returns A promise that resolves to an array of key-value pairs from the specified sheet.
 */
export async function getExcelDataAsKeyValue(filePath: string, sheet: string): Promise<Record<string, any>[] | undefined> {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheet];
    const data: any[] = xlsx.utils.sheet_to_json(worksheet);

    if (data.length === 0) {
        console.error('Excel file is empty.');
        return;
    }

    const keyValuePairs: Record<string, any>[] = [];
    for (const row of data) {
        const keyValuePair: Record<string, any> = {};
        for (const key in row) {
            keyValuePair[key] = row[key];
        }
        keyValuePairs.push(keyValuePair);
    }
    return keyValuePairs;
}

/**
 * Bakkappa N
 * 
 * @param filePath - The path to the Excel file.
 * @param sheet - The name of the sheet to read from.
 */
export async function printAllRowsData(filePath: string, sheet: string): Promise<void> {
    // Read the workbook and the specified worksheet
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheet];
    
    // Convert the sheet to JSON
    const data: Record<string, any>[] = xlsx.utils.sheet_to_json(worksheet);

    // Ensure there are rows in the data
    expect(data.length).toBeGreaterThan(0);

    // Print each row's data
    for (const row of data) {
        for (const key in row) {
            console.log(`${key} : ${row[key]}`);
        }
        console.log("=======");
    }
}

/**
 * Bakkappa N
 * 
 * Reads an Excel file and returns the data as an array of objects.
 * 
 * @param filePath - The path to the Excel file.
 * @param sheetName - The name of the sheet to read.
 * @returns An array of objects representing the rows in the sheet.
 */
export async function readExcelFile(filePath: string, sheetName: string): Promise<Record<string, any>[]> {
    // Read the Excel file
    const workbook = xlsx.readFile(filePath);

    // Get the specified sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON
    const data: any[][] = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    // If you want to access data as objects with column names as keys
    const headers: string[] = data[0]; // Assumes the first row is the header row
    const rows: Record<string, any>[] = data.slice(1).map(row => {
        const rowData: Record<string, any> = {};
        headers.forEach((header, index) => {
            rowData[header] = row[index];
        });
        return rowData;
    });

    return rows;
}

interface TestInfo {
    title: string;
    status: string;
}

/**
 * Bakkappa N
 * 
 * Writes the test status to an Excel file 
 * 
 * @param testInfo - An object containing test information.
 */
export async function writeTestStatusToExcelFile(testInfo: any): Promise<void> {
    // Check environment variables
    if (process.env.UPDATE_TEST_PLAN === 'Yes' && process.env.PIPELINE === 'Yes') {
        const matches = testInfo.title.match(/\[(.*?)\]/);

        if (matches) {
            const numbersPart = matches[1];
            const numbersArray: number[] = numbersPart.split(',').map(num => parseInt(num.trim(), 10));

            numbersArray.forEach(number => {
                // Read the Excel file
                const workbook = xlsx.readFile(process.env.TC_STATUS_PATH as string);
                const worksheet = workbook.Sheets[process.env.TC_STATUS_SHEET as string];
                
                const newRowData: [number, string, string] = [number, testInfo.status, ''];
                const data: (string | number)[][] = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

                // Add the new row data
                data.push(newRowData);
                const updatedWorksheet = xlsx.utils.aoa_to_sheet(data);
                workbook.Sheets[process.env.TC_STATUS_SHEET as string] = updatedWorksheet;

                // Write the updated workbook back to the file
                xlsx.writeFile(workbook, process.env.TC_STATUS_PATH as string);
                console.log(`1 Row of data added successfully to ${process.env.TC_STATUS_PATH}`);
            });
        } else {
            console.log('No test case ID found in title...');
        }
    }
}



