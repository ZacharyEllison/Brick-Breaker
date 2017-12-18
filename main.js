/* 
    Breakout Game as first game attempt in js
*/

// get the canvas from the webpage
const canvas = document.getElementById('breakout');
const context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var py = (7 * height) / 8;
var pw = 20;
var ph = 5;
var playerScore = 0;
//context.scale(2,2);
context.fillStyle = "black"
context.fillRect(0, 0, width, height)


// from Mozilla, get random integer given max/min
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
        this.w = w;
        this.h = ph;
        this.xvel = xvel;
        this.color = color;
    }
    // check for if the ball hits this instance
    checkHit(ball) {
        /* check for collision like with walls
        Remember JS rectangles have x,y at top-left
        from top */
        if (ball.x + ball.r >= this.x - this.w/2 &&
            ball.x + ball.r <= this.x + this.w/2 &&
            ball.y + ball.r >= this.y - this.h) {
            ball.yvel = - ball.yvel;
            ball.xvel += this.xvel/3
        }
        // from top, don't need bottom
    }
    // draw function 
    draw() {
        context.fillStyle = this.color;
        context.fillRect(player.x - pw/2, player.y - 5, pw, this.h);
        console.log(this.w)
        if (this.x + pw/2 < width && this.x - pw/2 > 0){
            this.x += this.xvel;
        }
        else if (this.x - pw/2 == 0) {
            this.x += 5  
        }
        else if (this.x + pw/2 == width) {
            this.x -=5
        }

    }
}
// object ball
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
    checkOff() {
        if (this.x <= this.r || this.x >= width - this.r) {
            this.xvel = -this.xvel;
        }
        else if (this.y <= this.r || this.y >= height - this.r) {
            this.yvel = -this.yvel;
        }
    }

    // set the location to the center and randomize direction
    spawn() {
        this.x = width/2;
        this.y = height/2;
        // yvel will always be going towards blocks on spawn
        this.yvel = getRandom(-2, -0.5);
        this.xvel = getRandom(-2, 2);
    }
    // image render
    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI*2);
        context.fill();
        context.closePath();
        this.x += this.xvel;
        this.y += this.yvel;
    }
}

// create player instance
var player = new brick(width/2, py, pw, 0,'blue');

// create ball instance
var TheBall = new ball(width/2, height/2, 1.5, 0, 0, 'yellow');
TheBall.spawn();


function draw(brick, ball) {;
    context.clearRect(0, 0, canvas.width, canvas.height)
    player.draw();
    TheBall.draw();
    TheBall.checkOff();
    player.checkHit(TheBall)
    
}
document.addEventListener("keydown", (event) => {
    const keyName = event.key;
  
    if (keyName == 'd') {
        //if (player.xvel < 25){
        player.xvel = 1;
        //}
        console.log('right')
    }
    else if (keyName == 'a') {
        //if (player.xvel > -25){
        player.xvel = -1;
        //}
        console.log('left')
    }
});
document.addEventListener("keyup", (event) => {
    const keyName = event.key;
  
    if (keyName == 'd') {
        player.xvel = 0;
    }
    else if (keyName == 'a') {
        player.xvel = 0;
    }
});
setInterval(draw, 10);
draw(player, TheBall);

