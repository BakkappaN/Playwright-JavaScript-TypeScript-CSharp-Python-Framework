const fs = require('fs').promises;

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
