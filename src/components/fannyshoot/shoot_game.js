import background_img from './background.png';
import shoot_img from './shoot.png';
import hole_img from './hole.png';

export default function draw(level = 1) {

    let background = document.getElementById("background"),
        shoot = document.getElementById("shoot"),
        ball = document.getElementById("ball"),
        messages = document.getElementById("messages"),
        hole = document.getElementById("hole");

    let background_layer = background.getContext("2d"),
        shoot_layer = shoot.getContext("2d"),
        ball_layer = ball.getContext("2d"),
        messages_layer = messages.getContext("2d"),
        hole_layer = hole.getContext("2d");

    //Games variables
    const BALL_RADIUS = 10,
        BG_HORIZONTAL_PADDING = 50,
        BG_VERTICAL_PADDING = 46;
    let ballH_speed = 5,
        ballV_speed = 5,
        ball_FPS = 30 / level,
        shoots = 0;
    let COLORS = ['red', 'green', 'blue', 'yellow', 'black', 'white'],
        set_color = onRandom(COLORS.length);


    //Creates game
    drawBackground();
    setScores(shoots);
    let ballObj = new Ball(onRandom(7) * 50 + BG_HORIZONTAL_PADDING * 2, 100, BALL_RADIUS);
    ballObj.drawBall(ball_layer, COLORS[set_color]);
    let ball_Interval = setInterval(() => {
        if (ballObj.getXPos() <= BG_HORIZONTAL_PADDING || ballObj.getXPos() >= ball.width - BG_HORIZONTAL_PADDING) {
            ballH_speed *= -1;
        }
        if (ballObj.getYPos() <= BG_VERTICAL_PADDING || ballObj.getYPos() >= ball.height - BG_VERTICAL_PADDING) {
            ballV_speed *= -1;
        }
        ballObj.setXPos(ballObj.getXPos() + ballH_speed);
        ballObj.setYPos(ballObj.getYPos() + ballV_speed);
        ballObj.drawBall(ball_layer, COLORS[set_color]);
    }, ball_FPS);

    let shootObj = new Shoot(200, 200);
    shootObj.drawShoot(shoot, shoot_layer, shoot_img);

    //Events
    document.addEventListener('mousemove', onShootMoved, false);
    document.addEventListener('mousedown', onShooted, false);

    function onShootMoved(e) {
        shootObj.setXPos(e.offsetX);
        shootObj.setYPos(e.offsetY);
    }

    function onShooted(e) {
        drawHole();
        shoots++;
        setScores(shoots);
        if (e.offsetX >= ballObj.getLTX() && e.offsetX <= ballObj.getRBX() &&
            e.offsetY >= ballObj.getLTY() && e.offsetY <= ballObj.getRBY()) {
            ballObj.setGameStatus();
            shootObj.setGameStatus();
            ballObj.drawBall(ball_layer, COLORS[set_color]);
            shootObj.drawShoot(shoot, shoot_layer, shoot_img);
            clearInterval(ball_Interval);
            endGameMessages();
            messages.className = 'canvas_4';
            document.removeEventListener('mousedown', onShooted, false);
        }

    }

    //Games objects
    function drawBackground() {
        let background_image = new Image();
        background_image.src = background_img;
        background_image.onload = () => {
            background_layer.drawImage(background_image, 0, 0);
        }
    }

    function drawHole() {
        let hole_image = new Image();
        hole_image.src = hole_img;
        let onHole = () => {
            hole_layer.drawImage(hole_image, shootObj.getXPos() - hole_image.width / 2, shootObj.getYPos() - hole_image.height / 2);
            clearInterval(hole_interval);
        }
        let hole_interval = setInterval(onHole, 10);
    }

    function setScores(value) {
        messages_layer.beginPath();
        messages_layer.clearRect(0, 0, messages.width, BG_VERTICAL_PADDING);
        messages_layer.font = '16px Tahoma';
        messages_layer.textAlign = 'center';
        messages_layer.fillStyle = '#f00';
        messages_layer.fillText('Shoots: ' + value, messages.width / 2, 20);
    }

    //Randomize Objects
    function onRandom(count) {
        return Math.floor(Math.random() * count);
    }

    //Draws games panels
    function endGameMessages() {
        messages_layer.beginPath();
        messages_layer.font = '36px Tahoma';
        messages_layer.textAlign = 'center';
        messages_layer.textBaseline = 'middle';
        messages_layer.fillStyle = '#f00';
        messages_layer.shadowBlur = 4;
        messages_layer.shadowColor = "#000";
        messages_layer.fillText('CONGRATULATION!', messages.width / 2, messages.height / 2);
        messages_layer.fillText('You WIN!', messages.width / 2, (messages.height / 2) + 40);
    }
}

//Objects
class Shoot {
    posX = 0;
    posY = 0;
    gameStatus = true;
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }

    drawShoot(context, layer, image) {
        let shoot_image = new Image();
        shoot_image.src = image;
        let onShoot = () => {
            layer.clearRect(0, 0, context.width, context.height);
            if (this.gameStatus)
                layer.drawImage(shoot_image, 0, 0, shoot_image.width, shoot_image.height,
                    this.posX - shoot_image.width / 2, this.posY - shoot_image.height / 2, shoot_image.width, shoot_image.height);
            else clearInterval(shoot_Interval);
        }
        let shoot_Interval = setInterval(onShoot, 40);
    }

    setXPos(value) {
        this.posX = value;
    }
    setYPos(value) {
        this.posY = value;
    }
    setGameStatus() {
        this.gameStatus = false;
    }
    getXPos() {
        return this.posX;
    }
    getYPos() {
        return this.posY;
    }
}

class Ball {
    posX = 0;
    posY = 0;
    radius = 0;
    gameStatus = true;
    constructor(posX, posY, radius) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
    }

    drawBall(layer, COLOR) {
        layer.beginPath();
        if (this.gameStatus) {
            layer.fillStyle = COLOR;
            layer.shadowBlur = 4;
            layer.shadowColor = COLOR;
            layer.clearRect(this.posX - this.radius * 2, this.posY - this.radius * 2, this.radius * 4, this.radius * 4);
            layer.arc(this.posX, this.posY, this.radius, 0, Math.PI / 180, true);
            layer.fill();

        } else {
            layer.beginPath();
            layer.clearRect(this.posX - this.radius * 2, this.posY - this.radius * 2, this.radius * 4, this.radius * 4);
            layer.closePath();
        }
        layer.closePath();
    }

    setXPos(value) {
        this.posX = value;
    }
    setYPos(value) {
        this.posY = value;
    }
    getXPos() {
        return this.posX;
    }
    getYPos() {
        return this.posY;
    }
    setGameStatus() {
        this.gameStatus = false;
    }
    getLTX() {
        return this.posX - this.radius;
    }
    getLTY() {
        return this.posY - this.radius;
    }
    getRBX() {
        return this.posX + this.radius;

    }
    getRBY() {
        return this.posY + this.radius;

    }

}