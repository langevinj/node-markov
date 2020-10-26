/** Command-line tool to generate Markov text. */
const fs = require('fs');
const process = require('process');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

if (process.argv[2] === "file"){
   readInFile(process.argv[3]);
} else if (process.argv[2] === "url") {
    readInURL(process.argv[3])
} else {
    console.error('Input type not specified')
}

function readInFile(fileName){
    fs.readFile(`${fileName}`, 'utf8', function(err, data){
        if(err){
            console.error(err);
            process.exit(1);
        } else {
            let content = fs.readFileSync(`${fileName}`, "utf8")
            let resp = new MarkovMachine(`${content}`)
            let createdText = resp.makeText()
            console.log(createdText)
            return createdText
        }
    })
}

async function readInURL(url){
    let content;
    try{;
        content = await axios.get(`${url}`)
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }

    let resp = new MarkovMachine(content.data);
    let text = resp.makeText();
    console.log(text)
    return text;
}