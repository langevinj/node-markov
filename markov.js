/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = {};
      for(let x=0; x < this.words.length; x++){
        if (chains[this.words[x]] !== undefined){
            if(!this.words[x+1]){
              chains[this.words[x]].push(null)
            } else {
              chains[this.words[x]].push(this.words[x + 1])
            }
        } else {
          if (!this.words[x + 1]) {
            chains[this.words[x]] = [null]
          } else {
            chains[this.words[x]] = [this.words[x + 1]]
          }
        }
      }
     this.chains = chains;
  }






  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let sentArray = [];
    let done = false;
    let length = Object.keys(this.chains).length;
    let chains = this.chains;
    
    function randomFirstWord(){
      let randIdx = Math.floor(Math.random() * length)
      let firstWord = Object.keys(chains)[randIdx]
      return firstWord
    }

    function randomSecondWord(firstWord){
      let vals = chains[firstWord]
      let randIdx = Math.floor(Math.random() * vals.length)
      let secondWord = vals[randIdx]
      return secondWord;
    }

    while(sentArray.length <= numWords && done != true){
      let first = randomFirstWord();
      sentArray.push(first)
      let second = randomSecondWord(first);
      if(second === null){
        done = true;
      } else {
        sentArray.push(second)
      }
    }

    return sentArray.join(" ")
  }
}

let mm = new MarkovMachine("the cat in the hat")
mm.makeText();

//LEFT OFF NEEDING TO WRITE TESTS!!!!!!

module.exports = {
  MarkovMachine : MarkovMachine
}