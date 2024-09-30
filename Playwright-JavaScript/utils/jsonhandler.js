const fs = require('fs').promises;
const path = require('path');

// Function to read JSON file and get value by key
export async function getValueFromJson(filePath, keyToRetrieve) {
    let value;
    // Read the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // Parse the JSON data
        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            return;
        }

        // Retrieve the value by key
        value = runtimetestdata[keyToRetrieve];
        return value;
    });
}

/**
 * Function to read and merge all JSON files for a given environment.
 * @returns {Promise<object>} - Returns a promise that resolves to the merged JSON object.
 */
export async function loadTestData() {
    const environment = process.env.ENV || 'qa';
    const envDir = path.join(__dirname, `../test-data/`, environment);

    // Check if the directory exists
    try {
        await fs.access(envDir); // Check for directory existence
    } catch (err) {
        throw new Error(`Directory does not exist for environment: ${environment}`);
    }

    const files = await fs.readdir(envDir);
    const jsonData = {};

    // Read and merge JSON files
    for (const file of files) {
        if (file.endsWith('.json')) {
            const filePath = path.join(envDir, file);
            const data = await fs.readFile(filePath, 'utf-8');
            try {
                const json = JSON.parse(data);
                Object.assign(jsonData, json); // Merge the JSON data
            } catch (parseError) {
                throw new Error(`Error parsing JSON in file ${file}: ${parseError.message}`);
            }
        }
    }
    return jsonData;
}

// Utility function to read a JSON file asynchronously
export async function readJsonFile(filename) {
    const environment = process.env.ENV || 'qa';
    const envDir = path.join(__dirname, `../test-data/`, environment);
    const filePath = path.join(envDir, filename); // Construct the full path

    try {
        const data = await fs.readFile(filePath, 'utf-8'); // Read the file asynchronously
        return JSON.parse(data); // Parse and return the JSON object
    } catch (error) {
        console.error('Error reading or parsing the file:', error);
        return null; // Return null in case of an error
    }
}