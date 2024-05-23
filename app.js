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

// funzione asincrona perchè abbiamo bisogno di attendere la risposta dal fetch per poter comparare correttamente il nuovo joke con quelli presenti nel DB
async function getJoke(){
    let flag = true;

    while (flag) {
        try {
            // aspetto risposta dal fetch per poter continuare il ciclo correttamente
            let res = await fetch("https://api.chucknorris.io/jokes/random");
            let data = await res.json();
            let joke = data.value;

            if (!chuckDb.includes(joke)) {
                changeDatas("norrisDb", [...chuckDb, joke]);
                console.log("Nuova battuta: ", joke);
                flag = false;
            } else {
                console.log("Già inserito")
            }
        } catch (error) {
            console.error('Errore:', error);
        }
    }
}

const chuckDb = readDatas("norrisDb")
console.log("Lista battute: ", chuckDb)
getJoke()