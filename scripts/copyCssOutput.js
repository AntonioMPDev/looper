const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, '../src/output.css');
const destinationPath = path.join(__dirname, '../dist/output.css');

fs.copyFile(sourcePath, destinationPath, (err) => {
    if (err) {
        console.error('Error copying the file:', err);
    } else {
        console.log('File copied successfully.');
    }
});
