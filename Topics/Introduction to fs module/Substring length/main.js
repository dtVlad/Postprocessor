const fs = require('fs'); //do not change this line

const dataAsync = fs.readFile('main.js', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const index = data.indexOf('(');
    const substring = data.substring(0, index);
    console.log(substring.length);
});
