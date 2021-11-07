// global variables are defined at top here
let canvas;
let ctx;
let WIDTH = 600;
let HEIGHT = 400;

// get user input from keyboard; establishing ideally keystrokes 's' and 'w'
let keysDown = {};
let keysUp = {};

// defines area where boxes are traveling, basically the arena of the game
let gamePlan = `
......................
..#................#..
..#................#..
..#................#..
..#........#####...#..
..#####............#..
......#............#..
......##############..
......................`;



function buildLevel(plan, width) {
    // function that makes the grid for which boxes to travel on
    // setup arrays to hold information from gameplan
    let newRow = [];
    let newGrid = [];

    // for loop that defines conditions for moving boxes based on input
    // also specifies that if box is moved to new row on grid and returns new length of the array once moved

    for (i of plan) {

        if (i != "\n") {
            newRow.push(i);
        }

        if (newRow.length % width == 0 && newRow.length != 0) {
            console.log(newRow.length);
            newGrid.push(newRow);
            newRow = [];
            console.log(newGrid);
        }
    }
    console.log(newRow);
    return newGrid;
}
//above if statements print the variables defined - newgrid, newRow, etc. to establish movement of box (== 0)

addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
    console.log("key down is " + keysDown[event.key]);
    console.log(keysDown);
}, false);
//basically specifies the type of event to pay attention to (that being the movement of boxes downward) and defines what happens when the box moves in this direction

//basically specifies the type of event to pay attention to (that being the movement of boxes upward) and defines what happens when the box moves in this direction
addEventListener("keyup", function (event) {
    // keysUp[event.key] = true;
    delete keysDown[event.key];
    console.log(keysDown);
    console.log(keysUp);
}, false);

// initialization function = setup canvas and context
// function function referenced at HTML document in body onload = ""
// append specific content: used to put specific content within specified elements.
function init() {
    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext('2d');
    console.log("game initialized");
    document.body.appendChild(canvas);
    gameLoop();
}
// defines width height variables and loops game to allow for constant movement; also gives context to object at play in init function ()
//get Context defines a returnable-object that specific characteristics of width, color, height, etc.


class Square {
    constructor(id, x, y, speed, w, h, color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
    }
//defines parameters for squares on page; specific variables like movement, color, height and width
    
    create(x, y, speed, w, h, color) {
        return new Square(x, y, speed, w, h, color);
    }
    update() {
        if (this.x >= WIDTH - this.w || this.x < 0) {
            // console.log("I fell off the side!!!!")
            this.speed = -this.speed;
        }
        this.x += this.speed;
        // this.y += Math.random()*5*this.speed;
        // console.log(this.x);
    };
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}
//update takes the input and changes the hash of the object at hand - the update function returns the index of the input that is given

class Player extends Square {
    constructor(id, x, y, speed, w, h, color, hitpoints) {
        super(id, x, y, speed, w, h, color);
        this.id = id;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
        this.hitpoints = hitpoints;
        // console.log(this.hitpoints);
        // defines Player class, allowing different inputs and characteristics of Square class characters.
    }
    update() {
        if ('w' in keysDown) {
            this.y -= this.speed;
        }
        if ('a' in keysDown) {
            this.x -= this.speed;
        }
        if ('s' in keysDown) {
            this.y += this.speed;
        }
        if ('d' in keysDown) {
            this.x += this.speed;
        }
        //defines key characters for controlling square

        // this.y += Math.random()*5*this.speed;
        // console.log(this.x);
    };
}

const levelChars = {
    ".": "empty",
    "#": Square,
};

// let level1 = buildLevel(gamePlan, 22);

function readLevel() {
    /* 
    Create array to hold starting actors or elements on the screen
    */
    let startActors = [];
    /* read game plan - the 'i' below will be the 'y' value */
    for (i of gamePlan) {
        console.log(i + " will be the y value...");
        /* checks to see if we hit a newline;
        if not, set variable 'type' to the current level character
        in the object we created called levelChars
        */
        if (i != "\n") {
            let type = levelChars[i];
            /* if level type is a 'string', not a class
            push it into start actors as is
            
            */
            if (typeof type == "string") {
                startActors.push(type);
                console.log('string found');
            }
            /* if it is not a string, it will be a class as we've written it; if it is a class, push a newly created object into the startActors, 
            with all necessary arguments or values.
            In this case, x,y,w,h,color
            
            */
            else {
                i = new type;
                startActors.push(i.create(10, 20, 1, 30, 40, 'red'))
            }
        }
    }
    console.log(startActors);
    // for loops and if statements  defining specific conditions for current level of game; 
}

readLevel()

// instantiations...
let player1 = new Player("Me", WIDTH / 2, HEIGHT / 2, 1, 40, 40, 'rgb(300, 50, 100)', 100);
let oneSquare = new Square("Harry", 10, 10, 1, 50, 50, 'rgb(400, 60, 200)');
let twoSquare = new Square("yeezus", 60, 60, 5, 100, 100, 'rgb(200, 200, 0)');
let threeSquare = new Square("boppa", 70, 70, 3, 25, 25, 'rgb(100, 100, 300)');

let allSprites = [oneSquare, twoSquare, threeSquare, player1];
//specifies various actors in game, different squares and assigning various values and locations to them


function update() {
    for (i of allSprites) {
        // console.log(i);
        i.update();
    }

    // oneSquare.update();
    // twoSquare.update();
}
// draw function gives context for rectangle dimensions and characteristics
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (i of allSprites) {
        // console.log(i);
        i.draw();
        // i draw...?
    }
}
// here we have a big leap!
// We are using the window.requestAnimationFrame() in our game loop
// .requestAnimationFrame() is a method (likg a function attached to an object)
// It tells the browser that you wish to animate
// It asks the browser to call a specific function, in our case gameLoop
// It uses this function to 'repaint'
// In JS this called a callback, where a function passes an argument to another function

// MDN reference https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory...')
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
    // loops game to allow continued play; asks browser to redraw image after input is given (requestAnimationFramez)
}