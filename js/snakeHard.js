const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

document.getElementById("scoreArea").style.display = "none";
document.getElementById("gameArea").style.display = "none";
document.getElementById("beatHs").style.display = "none";

// create unit
const box = 32;

// buttons
document.getElementById("hardButton").addEventListener("click", hardGame);

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

Audio.volume = 0.2;

// create snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create score var

var hhscore = localStorage.getItem("hardhighscore");
let score = 0;
document.getElementById("hardhighscoreResult").innerHTML = localStorage.getItem("hardhighscore");
document.getElementById("scoreResult").innerHTML = score;

//control snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to canvas

function draw(){

    document.getElementById("hardButton").disabled = true;

    document.getElementById("menuArea").style.display = "none";
    document.getElementById("scoreArea").style.display = "none";
    document.getElementById("gameArea").style.display = "inline";
    document.getElementById("beatHs").style.display = "none";

    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "#73e600";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "#424343";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if snake eats food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // don't remove tail
    }else{
        // remove tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
        if (score>hhscore){
            hhscore = score;
            localStorage.setItem("hardhighscore", hhscore);
            document.getElementById("beatHs").style.display = "inline";
        }else{
        }
        document.getElementById("hardButton").disabled = false;

        document.getElementById("scoreArea").style.display = "inline";
        document.getElementById("gameArea").style.display = "none";
        document.getElementById("menuArea").style.display = "inline";

        document.getElementById("hardhighscoreResult").innerHTML = localStorage.getItem("hardhighscore");
        document.getElementById("scoreResult").innerHTML = score;

        
    }
    
    snake.unshift(newHead);
    
    // score properties position and colour
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Score: "+ score,1*box,1.2*box);
    ctx.fillText("Highscore: "+ hhscore,12.5*box,1.2*box);

}

// call draw function

function hardGame(){
    window.alert("Use the arrow keys to move the snake.");
    game = setInterval(draw,75);//hard
    snake[0] = {
        x : 9 * box,
        y : 10 * box
    };
    snake.length = 1;
    score = 0;
    d = undefined;
}
















