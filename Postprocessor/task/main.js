const fs = require('node:fs');
const crypto = require('crypto');

let data = fs.readFileSync(`./database.csv`, 'utf8');
let lines = data.split("\n");

const newLines = [];

// Process each line
for (let i = 0; i < lines.length; i++) {
    // Split the line into fields
    const fields = lines[i].split(',');

    // If it's not the first line, hash the password field
    if (i !== 0) {
        const hash = crypto.createHash('sha256');
        hash.update(fields[2].trim());
        const hashedPassword = hash.digest('hex');

        // Replace the password field with the hashed password
        fields[2] = ' ' + hashedPassword;
    }

    // Join the fields back into a line and add it to the new lines
    newLines.push(fields.join(','));
}

// Join the new lines back into a CSV string
const newData = newLines.join('\n');

// Write the new data to a new CSV file
fs.writeFileSync('hash_database.csv', newData);

//filtered data
let filteredLines = [];

// Filter out the lines with incomplete data
for (let i = 0; i < newLines.length; i++) {
    const fields = newLines[i].split(',');
    if (!fields.map(field => field.trim()).includes('-')) {
        filteredLines.push(newLines[i]);
    }
}

// Renumber the 'id' field
for (let i = 1; i < filteredLines.length; i++) {
    const fields = filteredLines[i].split(',');
    fields[0] = i.toString();
    filteredLines[i] = fields.join(',');
}

// Join the new lines back into a CSV string
const filteredData = filteredLines.join('\n');

// Write the new data to a new CSV file
fs.writeFileSync('filtered_database.csv', filteredData);
