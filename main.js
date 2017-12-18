/* 
    Breakout Game as first game attempt in js
*/

// get the canvas from the webpage
const canvas = document.getElementById('breakout');
const context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var py = (7 * height) / 8;
var pw = 40;
//context.scale(2,2);
context.fillStyle = "black"
context.fillRect(0, 0, width, height)


// from Mozilla
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

// all objects in one place
class brick{
    constructor(x, y, w, xvel, color) {
        this.x = x;
        this.y = y;
        this.w = w * 200;
        this.h = 100;
        this.xvel = xvel;
        this.color = color;
    }
    // check for if the ball his this instance
    checkHit(ball) {
        // essentially boundingbox.lua
        if (this.x < (ball.x + ball.r) && 
            ball.x < (this.x + this.w) && 
            this.y < (ball.y + ball.r) &&
            ball.y < (this.y + this.h)) {
                ball.yvel = -ball.yvel
                ball.xvel += this.xvel
            }
    }
    // draw function 
    draw() {
        context.fillStyle = this.color;
        context.fillRect(player.x - pw/2, player.y - 5, pw, 10);
        player.x += player.xvel   
        player.y += player.yvel
    }
}
class ball{
    // list the things necessary for ball
    constructor(x, y, r, xvel, yvel, color){
        this.x = x;
        this.y = y;
        this.r = r;
        this.xvel = xvel;
        this.yvel = yvel;
        this.color = color;
    }

    // check if off screen
    ifOff() {
        if (this.x > width || this.x < 0 || this.y > height) {
            this.spawn();
        }
    }
    // set the location to the center and randomize direction
    spawn() {
        this.x = width/2;
        this.y = height/2;
        // yvel will always be going towards blocks on spawn
        this.yvel = getRandom(-5, -2);
        this.xvel = getRandom(-3, 3);
    }
    // image render
    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI*2);
        context.fill();
        context.closePath();
    }
}

// create player instance
var player = new brick(width/2, py, pw, 0,'blue');

// create ball instance
var TheBall = new ball(width/2, height/2, 5, 0, 0, 'yellow');


function draw(brick, ball) {
    player.draw();
    TheBall.draw();
}
setInterval(draw, 10);
draw(player, TheBall);

