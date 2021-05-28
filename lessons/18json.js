const fs = require('fs');
// const book={
//     title: 'Ego is the enemy',
//     author:'Ryan holiday'
// }

// const bookJSON=JSON.stringify(book);
// console.log(bookJSON);
// const parsedData = JSON.parse(bookJSON);
// console.log(parsedData.author);
// fs.writeFileSync('1-json.json',bookJSON)
const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
data.title=  'The Secret';
data.author= 'robert';
const StringJson = JSON.stringify(data);
fs.writeFileSync('1-json.json',StringJson);
//console.log(data.title);