// Comment pseudocode up here 
// Objective: take a message from a user and encrypt it
// Then using the cypher decrypt it
/* 
1. get input from user
2. Encrypt the message
3. Take the encrypted message and put it back in the word boz
4. Decrypt the message
*/

// global variables assigned at the top such as symbols and letters
let Symbols = ["!","@","#","<","*",")", ":", ";","&", "%","$","_","-", "{", "}", "|", "^", "`", "]", "[", ".", ",", "+", "=", "'", "~", "?"];
let Letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "];
let player1score = 0;
let player2score = 0;

// functions to determine utility functions of upper/lower case
// establishing function to see if letter is Uppercase.
function isupper(str){
    return str === str.toUpperCase();
}
// lowercase function
function islower(str){
    return str === str.toLowerCase();
}

// associates the input with a value assigned in the POINTS array and gives a number value as a points assignation
function getPoints(letter) {
    let index = Letters.indexOf(letter);
    return Symbols[index]; 
}
// associates the input given with a symbol defined under te SYMBOLS array; returns a word as output based on the symbol associated with input.
function getLetters(symbol) {
    let index = Symbols.indexOf(symbol);
    return Letters[index];
}

function computeScore(word)
{
    let score = 0;
    for (i = 0, n = word.length; i < n; i++){
    // determines score = associates letter of input given with POINTS array and giving score
        // if (islower(word[i])){
        //     console.log(word[i] + "this is lower case");
        // }
        // if (isupper(word[i])){
        //     console.log(word[i] + "this is upper case");
        // }
        console.log("letter is" + (word[i]));
        console.log("letter score is " + getPoints(word[i].toLowerCase()));
        score += getPoints(word[i].toLowerCase());  
        console.log("final score is" + score);
    }
    return score;
}




// leveraging for loop to associate symbol defined in global array at top to word based on input

function computeWord(symbol)
{
    let word = 0;
    for (i=0, n = symbol.length; i < n; i++){
        console.log("letter score is " + getLetters(symbol[i]));
        word += getLetters(symbol[i]);  
        console.log("final score is" + word);
    }
    return word;
}


// // determines score associated with given word as input

computeScore("hello");

// scope; inputVal cannot escape getInputValue
 
// chooses inputID value
function getInputValue(){
    return document.getElementById("inputId").value;
}
// computeScore processes input of letters/words given and gives out value as score, points earned 
function encrypt(){
    let score = computeScore(getInputValue())
    output("The encrypted message is ... drumroll please:  " + score );
}

// decrypt function; computeWord returns number value for word given and reassociates numbers gained through encrypt function and...decrypts
function decrypt(){
    let word = computeWord(getInputValue())
    output("This is the decrypted message, congrats! " + word);
}

// creates the text box, insert input into it, get output below it
function output(content){    
    document.getElementById("display").innerHTML = content;
}