// global variables go at the top...
let POINTS = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];
let Letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// defining letters that correspond to the points listed - specific letters inputted as defined in the two strings above yield specific amt of pts.
let player1score = 0;
let player2score = 0;
// players start with 0 pts before input is given to the processor

// utility functions
function isupper(str) {
  return str === str.toUpperCase();
  // making new function 'isupper' and saying to return string value once input is given.
}

// same thing as above, creating function for islower, that basically defines the output as equaling a value given in the strings at the top
function islower(str) {
  return str === str.toLowerCase();
}

// basically defines function to give points based off of given input; it takes the index of the given letter and connects 
// it with a value in the POINTS array/string listed above to give points as an ouptut for the user
function getPoints(letter){
  let index = Letters.indexOf(letter);
  return POINTS[index];
}

// perform uppercase/lowercase function in JS while also doing a strlen operation?
function computeScore(word){
    let score = 0;
    for (i = 0, n = word.length; i < n; i++){
        // if (islower(word[i])){
        //   console.log(word[i] + "this is lower case");
        // if (isupper(word[i])){
        //   console.log(word[i] + " is upper case");
        // }
        console.log("letter is " + (word[i]));
        // establishes what the computer asks the user for in terms of input
        console.log("letter score is " + getPoints(word[i].toLowerCase()));
        // gives a statement as to how many points user gets based on input he/she gave
        score += getPoints(word[i].toLowerCase());
        // main function to compute the actual score, typing out "score" and then a value from the POINTS array
        console.log("final score here...NOW " + score);
        // final score printed through console
    }
    return score;
}

computeScore("hello");

// SCOPE>>>>>>>>>>>

function getInputValue() {
    // function that chooses an input value and associated it with a point value
    return document.getElementById("inputId").value;
    // returning a value that is either entered or given back out as output.
  }

 function doSomething(){
  //  new function to create pop-up at top of chrome
    alert("You scored reeee " + score );
    output("yessir you scored " + score + " points.");
    // once input is given, part 2 of alert is given in "yessir you scored"
  }

  // failing function due to inability to access element on page and alter it dynamically
  // function output(content){
  //   document.getElementById("display").innerHTML = content;
  // } - (still being worked on)