import fs from 'fs';
import path from 'path';
import { TestData } from '../interfaces/testdata.interface';

export async function loadTestData() {
    const environment = process.env.ENV || 'qa';
    const directoryPath = path.join(__dirname.replace('utils',''), `/test-data`, environment);
    const jsonData: TestData = {};

    fs.readdirSync(directoryPath).forEach(file => {
        if (path.extname(file) === '.json') {
            const filePath = path.join(directoryPath, file);
            const fileContent: TestData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            Object.assign(jsonData, fileContent); // Merge the content into a single object
        }
    });

    return jsonData;
}