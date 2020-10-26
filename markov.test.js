const { MarkovMachine } = require("./markov");

describe("markov test", function () {

    test('makes chains', function () {
        let mm = new MarkovMachine("aa bb cc AA BB")
        expect(mm.chains).toEqual({"aa": ["bb"], "bb": ["cc"], "cc": ["AA"], "AA": ["BB"], "BB": [null]})
    })

    test('return valid text', function(){
        let biGrams = ["the cat", "cat in", "in the", "the hat", "hat "]
        let mm = new MarkovMachine("the cat in the hat");
        let output = mm.makeText();
        expect(output.endsWith('hat')).toBe(true)

        let outputWords = mm.makeText().split(/[ \r\n]+/);
        
        for(let i =0; i < outputWords.length - 1; i++){
            expect(biGrams).toContain(outputWords[i] + " " + outputWords[i + 1])
        }
    })
})