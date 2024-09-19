const fs = require('fs');
const TOTP = require('otplib');

export async function updateJsonFile(filePath, keyToUpdate, newValue) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    let jsonData = JSON.parse(data);

    if (!jsonData.runtimetestdata || !jsonData.runtimetestdata.hasOwnProperty(keyToUpdate)) {
      console.error('Key not found or object not present:', keyToUpdate);
      return;
    }

    jsonData.runtimetestdata[keyToUpdate] = newValue;

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('New value updated successfully.');
      }
    });
  });
}

export async function getMFAToken() {
  const secret = process.env.AUTHENTICATOR_SECRET;
  TOTP.authenticator.options = {
      step: 30, //default is 30 seconds
      window: 1 // acceptable time window
  }
  const otp = TOTP.authenticator.generate(secret);
  return otp;
}
