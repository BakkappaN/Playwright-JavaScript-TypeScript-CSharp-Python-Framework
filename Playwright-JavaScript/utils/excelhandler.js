const { test, expect } = require('@playwright/test');
const xlsx = require('xlsx');

/**
 * Bakkappa N
 */
export async function getExcelDataAsKeyValue(filePath, sheet) {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheet];
    const data = xlsx.utils.sheet_to_json(worksheet);

    if (data.length === 0) {
        console.error('Excel file is empty.');
        return;
    }

    const keyValuePairs = [];
    for (const row of data) {
        const keyValuePair = {};
        for (const key in row) {
            keyValuePair[key] = row[key];
        }
        keyValuePairs.push(keyValuePair);
    }
    return keyValuePairs;
}

/**
 * Bakkappa N
 */
export async function printAllRowsData(filePath, sheet) {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheet];
    const data = xlsx.utils.sheet_to_json(worksheet);

    expect(data.length).toBeGreaterThan(0);
    for (const row of data) {
        for (const key in row) {
            console.log(`${key} : ` + row[key]);
        }
        console.log("=======")
    }
    // data[0].Skill1 - access using row & key 
}

export async function readExcelFile(filePath, sheetName) {
    // Read the Excel file
    const workbook = xlsx.readFile(filePath);

    // Get the first sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    // If you want to access data as objects with column names as keys
    const headers = data[0]; // Assumes the first row is the header row
    const rows = data.slice(1).map(row => {
        const rowData = {};
        headers.forEach((header, index) => {
            rowData[header] = row[index];
        });
        return rowData;
    });
    return rows;
}

export async function writeTestStatusToExcelFile(testInfo) {

    if (process.env.UPDATE_TEST_PLAN == 'Yes' && process.env.PIPELINE == 'Yes') {
        const matches = testInfo.title.match(/\[(.*?)\]/);
    
        if (matches) {
            const numbersPart = matches[1];
            const numbersArray = numbersPart.split(',').map(num => parseInt(num.trim(), 10));
    
            numbersArray.forEach(number => {
                const workbook = xlsx.readFile(process.env.TC_STATUS_PATH);
                const worksheet = workbook.Sheets[process.env.TC_STATUS_SHEET];
                const newRowData = [number, testInfo.status, ''];
                const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
                data.push(newRowData);
                const updatedWorksheet = xlsx.utils.aoa_to_sheet(data);
                workbook.Sheets[process.env.TC_STATUS_SHEET] = updatedWorksheet;
                xlsx.writeFile(workbook, process.env.TC_STATUS_PATH);
                console.log(`1 Row of data added successfully to ${process.env.TC_STATUS_PATH}`);
            });
        } else {
            console.log('No test case id found in title...');
        }
    }
}


