// global variables go up at the top
// defines width and height variables, sets up structures for use throughout
let canvas;
let ctx;

let TILESIZE = 64;
let WIDTH = TILESIZE * 22;
let HEIGHT = TILESIZE * 9;
let allSprites = [];
let walls = [];
// defined various variables (walls, Sprites, etc.) for game grid



// user input from keyboard to control box
let keysDown = {};
let keysUp = {};

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
// defines game grid bars



addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
    // console.log("key down is " + keysDown[event.key]);
}, false);
// establishes function for moving box down and what happens when that's done

addEventListener("keyup", function (event) {
    // keysUp[event.key] = true;
    delete keysDown[event.key];
}, false);
// establishes function for moving box up and what happens when that's done


// here we use init (short for initialize) to setup the canvas and context
// this function will be called in the HTML document in body onload = ""
// we also append the body with a new canvas element
function init() {
    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext('2d');
    console.log("game initialized");
    document.body.appendChild(canvas);
    gameLoop();
}
// function initialization to paint canvas and various widths/heights for the red bars

class Sprite {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        allSprites.push(this);
    }
    get type() {
        return "sprite";
    }
    create(x, y, w, h, color) {
        return new Sprite(x, y, w, h, color);
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}
// defines specifics behind variables and functions contained in Sprite class. defines width, height, and other variables.
// create and draw operations draw actor Sprite with specified characteristics


class Player extends Sprite {
    constructor(x, y, speed, w, h, color, hitpoints) {
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
        this.hitpoints = hitpoints;
        // console.log(this.hitpoints);
    }
    // this class extends the characteristics and variables defined in the Sprite class - refers to the character you are controlling

    collideWith(obj) {
        if (this.x + this.w > obj.x &&
            this.x < obj.x + obj.w &&
            this.y + this.h > obj.y &&
            this.y < obj.y + obj.h
        ) {
            console.log(this.type + ' collides with ' + obj.type);
            return true;
        }
    }
    get type() {
        return "player";
    }
    // collision operation basically pointing out what happens when character Sprite is put in contact with red bars
    input() {
        if ('w' in keysDown) {
            this.dy = -1;
            this.dx = 0;
            // console.log("dy is: " + this.dy)
            this.y -= this.speed;
        }
        if ('a' in keysDown) {
            this.dx = -1;
            this.dy = 0;
            // console.log("dx is: " + this.dx)
            this.x -= this.speed;
        }
        if ('s' in keysDown) {
            this.dy = 1
            this.dx = 0;
            // console.log("dy is: " + this.dy)
            this.y += this.speed;

        }
        if ('d' in keysDown) {
            this.dx = 1;
            this.dy = 0;
            // console.log("dx is: " + this.dx)
            this.x += this.speed;
        }
        // input function defines what happens when inputting into keyboard each letter

    }
    update() {
        this.input();
        // this.y += Math.random()*5*this.speed;
        // console.log(this.x);
        if (this.x + this.w > WIDTH) {
            this.x = WIDTH - this.w;
        }
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.y + this.h > HEIGHT) {
            this.y = HEIGHT - this.h;
        }
        if (this.y <= 0) {
            this.y = 0;
        }
    };
}
// update refers to the if statements stating what conditions execute based on where the Sprite box moves. Depending on the Sprite's movement across the axes, 
// HEIGHT or width gets affected

class Enemy extends Player {
    constructor(x, y, speed, w, h, color, hitpoints) {
        super(x, y, speed, w, h, color, hitpoints);
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.color = color;
        this.hitpoints = hitpoints;
        // console.log(this.hitpoints);
    }
    // Enemy class still in the works but its extending same characteristics and variables in Player class

    get type() {
        return "enemy";
    }

}

let badguy = new Enemy();
console.log("here's the example of a sub-sub class " + badguy.type);
console.log("badguy stats " + badguy.speed);
// connects Enemy class just extended from player class to define badguy - defines speed, type of up and coming enemy.

class Wall extends Sprite {
    constructor(x, y, w, h, color) {
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    create(x, y, w, h, color) {
        return new Wall(x, y, w, h, color);
    }
    get type() {
        return "wall";
    }
}
// extension of Sprite class basically defines characteristics of obstacles (in red) that the sprite needs to move around


const levelChars = {
    ".": "empty",
    "#": Wall,
};

function makeGrid(plan, width) {
    let newGrid = [];
    let newRow = [];
    for (i of plan) {
        if (i != "\n") {
            newRow.push(i);
        }
        if (newRow.length % width == 0 && newRow.length != 0) {
            newGrid.push(newRow);
            newRow = [];
        }
    }
    return newGrid;
}
// function that makes the red obstacles the character needs to move around; if statements to determine conditions on which ox moves to different rows/columns on made 
// grid

console.log("here's the grid...\n" + makeGrid(gamePlan, 22));

function readLevel(grid) {
    let startActors = [];
    // note the change from i to x and y
    for (y in grid) {
        for (x in grid[y]) {
            /*              crate a variable based on the current
            item in the two dimensional array being read
             */
            let ch = grid[y][x];
            /* if the character is not a new line character
            create a variable from the value attached to the 
            key in the object, e.g. 

            const levelChars = {
                ".": "empty",
                "#": Square,
            };

            where "." is the key and the value is "empty"
            In the case of "#", the key is "#" and the value
            is the Square class.
            
            */
            if (ch != "\n") {
                let type = levelChars[ch];
                if (typeof type == "string") {
                    startActors.push(type);
                } else {
                    let t = new type;
                    // let id = Math.floor(100*Math.random());
                    /*  Here we can use the x and y values from reading the grid, 
                        then adjust them based on the tilesize
                         */
                    startActors.push(t.create(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE, 'red'))
                }
            }
        }
    }
    return startActors;
}


let currentLevel = readLevel(makeGrid(gamePlan, 22))
console.log('current level');
console.log(currentLevel);

// instantiations...
let player1 = new Player(WIDTH / 2, HEIGHT / 2, 10, TILESIZE, TILESIZE, 'rgb(100, 100, 100)', 100);
// let oneSquare = new Square("Bob", 10, 10, 1, 50, 50, 'rgb(200, 100, 200)');
// let twoSquare = new Square("Chuck", 60, 60, 5, 100, 100, 'rgb(200, 200, 0)');
// let threeSquare = new Square("Bill", 70, 70, 3, 25, 25, 'rgb(100, 100, 222)');

console.log(allSprites);
console.log(walls);

function update() {
    for (i of allSprites) {
        if (i.type == "wall") {
            // console.log(i)
            if (player1.collideWith(i)) {
                if (player1.dx == 1){
                    player1.x = i.x - player1.w;
                }
                else if (player1.dx == -1){
                    player1.x = i.x + i.w;
                }
                else if (player1.dy == 1){
                    player1.y = i.y - player1.h;
                }
                else if (player1.dy == -1){
                    player1.y = i.y + i.h;
                }
                // console.log("player collided with walls")
                console.log("player1 dx is:" + player1.dx);
            }
        }
    }
    // update function outlining if/else statement-conditions that say that based on where the player moves, the function substracts/adds the height or width

    player1.update();

    // oneSquare.update();
    // twoSquare.update();
}
// we now have just the drawing commands in the function draw
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (i of allSprites) {
        // console.log(i);
        i.draw();
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
    // basically tells html chrome to drawn overall canvas and tells the browser to redraw the canvas based on what happens and the input given
}