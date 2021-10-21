// only javascript goes here NO HTML...
alert("hello mr. world");
console.log("this is coming from a separate file...");
let myVar = 5;
// allows user to send input into console
// let statement defining variable as 5
console.log("my first console message yessir");
console.log(myVar);
// console.log basically same as printf in C,

// Boolean...
let playing = true;
let width = 300;
let height = 500;
let y = 36;
let x = 310;
var player1 = "Phrancis";
const player2 = "Bot";
player2 = "phrancis";
// defining height and width, and location on coordinate plane, constant makes player2 unchangeable

// making for loops in JS
for (i=0; i<10; i++){
    console.log(i);
}

function draw() {
    // we are labeling and creating new function to draw squares; variable that 
    // allows the code to look for an element in the html document with an ID 'canvas' that...draws the squares?
    var canvas = document.getElementById('canvas');
    // allowing us to make changes to the element in the html doc
    if (canvas.getContext) {
        // if this works, it passes back any non-zero value, then do this
      var ctx = canvas.getContext('2d');
    //   putting this object into 2-D, so there must be an x and y
      ctx.fillStyle = 'rgb(200, 0, 0)';
      ctx.fillRect(x, y, width, height);
    // putting color and filling shapes up; determining location, width, and height parameters.
      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
      ctx.fillRect(30, 30, 50, 50);
    }
  }
function main() {
  draw();
}
