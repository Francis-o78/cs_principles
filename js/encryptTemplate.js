
// Objective: take a message from a user and encrypt it, use the cypher decrypt it
// adding pop up alert for the user to give some sort of input

/* 
1. Get input from user

*/

// global variables are at the top, defining the arrays of encryption, answer key, type of input wanted, and points assigned.
let POINTS = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];
let Letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "\n"];
let encryption = ["$", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "\n"];
let player1score = 0;
let player2score = 0;

// pushing and pulling things into/out of an array that is at the moment empty
let PushedThings = "WHATS UP I can push things into this array";
let myArray = [];
myArray.push(PushedThings);
console.log("I have successfully pushed something into the array " + myArray);

// creating utility functions for string input and checking if input is uppercase or lowercase
function isupper(str) {
  return str === str.toUpperCase();
}

// check if is lowercase, different than above function, which checked if input is uppercasee
function islower(str) {
  return str === str.toLowerCase();
}

// function that gives back points by connecting index and type of  letter with correct amount of POINTS based on POINTS array above
function getPoints(letter){
  let index = Letters.indexOf(letter);
  return POINTS[index];
}

// function that analyzes the type of input given and associates POINTS based on conditions stated in for loop
function computefinalScore(word){
    let score = 0;
    for (i = 0, n = word.length; i < n; i++){
        // if (islower(word[i])){
        //   console.log(word[i] + "this is lower case");
        // }
        // if (isupper(word[i])){
        //   console.log(word[i] + " is upper case");
        // }
        console.log("letter is " + (word[i]));
        console.log("letter score is " + getPoints(word[i].toLowerCase()));
        score += getPoints(word[i].toLowerCase());
        console.log("final score here " + score);
        // draws out word prompts and setences that come before stating the final score from functions comptefinalScore and getPOINTS
    }
    return score;
}

computefinalScore("hello");


// SCOPE>>>>>>>>>>>

function getInputValue() {
    // this function selects the input element and get its value based on arrays above.
    return document.getElementById("inputId").value;
    // Displaying the value inputted and what results through the string of letters given
  }

function encrypt(word){
  alert(word);
  // basic encryption algorithm is happening here, changes input given into associated symbols specified in above arrays
}

// encryption function is changing given input based on encryption array, send alert on browser exclaiming final encryption based on input. 
function doSomething(){
    let encryptedValue = encrypt(getInputValue())
    alert("Encrypted value is " + encryptedValue);
    output(encryptedValue);
  }

  let eMessage = "secret message";
  // denotes the encryption as secret, can decrypt using above array as well

  //accesses element on page and alter it dynamically...?
  function output(content){
    document.getElementById("display1").innerHTML = content;
    document.getElementById("display2").innerHTML = eMsg;
    document.getElementById("display3").innerHTML = "hello";
  }

