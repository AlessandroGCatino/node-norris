const fs = require('fs');
const path = require('path');

function readDatas(fileName){
    const filePath = path.join(__dirname, fileName + ".json")
    const fileData = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(fileData)
}

function changeDatas(fileName, newData) {
    const filePath = path.join(__dirname, fileName + ".json")
    const toAdd = JSON.stringify(newData)
    fs.writeFileSync(filePath, toAdd);
}

const chuckDb = readDatas("norrisDb")

fetch("https://api.chucknorris.io/jokes/random")
.then(res => res.json())
.then(data => {
    let joke = data.value
    changeDatas("norrisDb", [...chuckDb, joke])
    console.log(joke)
}) 
