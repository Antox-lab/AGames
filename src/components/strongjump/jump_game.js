import paddle_img from './paddle.png';
import plan_img from './plan.png';
import man_img from './man.png';
import fire_img from './fire.png'
import man_win_img from './man_win.png';
import background_img from './background.png';
// Levels status:
// 3 - easy
// 2 - normal
// 1 - hard
export default function draw(level = 2) {

    let field = document.getElementById("background"),
        plan = document.getElementById("plan"),
        fire = document.getElementById("fire"),
        man = document.getElementById("man"),
        paddle = document.getElementById("paddle"),
        messages = document.getElementById("messages"),
        wind = document.getElementById("wind");

    let field_layer = field.getContext("2d"),
        plan_layer = plan.getContext("2d"),
        fire_layer = fire.getContext("2d"),
        man_layer = man.getContext("2d"),
        paddle_layer = paddle.getContext("2d"),
        messages_layer = messages.getContext("2d"),
        wind_layer = wind.getContext("2d");

    //Games status
    let game_status = true,
        win_status = false;

    // Windes descriptions
    // 1 - left 
    // 2 - right
    // 0 - none
    let wind_direction = setRandom(3),
        wind_value = setRandom(2) + 1;
    const WIND_X = -10,
        WIND_Y = 70;

    //Fires descriptions
    let x_fire = 0,
        y_fire = 0;
    const FIRE_SIZE = 80;
    let fire_frame = 0;
    const TOTAL_FIRE_FRAME = 10;

    //Planes discriptions
    let x_plane = plan.width;
    const Y_PLANE = 15,
        PLANE_WIDTH = 100,
        PLANE_HEIGHT = 60,
        PLANE_SPEED = 40,
        PLANE_VELOCITY = 2;
    let plan_frame = 0;
    const TOTAL_PLAN_FRAME = 3;

    //Mans discriptions
    let x_man = 0,
        y_man = 0;
    const MAN_WIDTH = 40,
        MAN_HEIGHT = 60,
        MAN_SPEED = 40,
        MAN_VELOCITY = 2,
        MAN_HORIZONTAL_VELOCITY = 2;
    let man_velocity_wind = 0;
    let draw_man = true;

    //Winmans descriptions
    const WIN_MAN_WIDTH = 40,
        WIN_MAN_HEIGHT = 60;
    let win_man_frame = 0;
    const WIN_FRAME = 3;

    //Paddle discriptions
    let x_paddle = 0;
    const Y_PADDLE = 300,
        PADDLE_WIDTH = 100,
        PADDLE_HEIGHT = 40,
        PADDLE_SPEED = 20 * level;
    let paddle_velocity = 5;

    //Events
    document.addEventListener('keydown', onStartDownd, false);

    function onStartDownd(e) {
        if (draw_man && e.keyCode === 40) {
            x_man = x_plane + PLANE_WIDTH / 2;
            y_man = Y_PLANE + PLANE_HEIGHT;
            drawMan();
            draw_man = false;
        }
        if (!draw_man) {
            if (e.keyCode === 37) {
                x_man -= MAN_HORIZONTAL_VELOCITY;
            }
            if (e.keyCode === 39) {
                x_man += MAN_HORIZONTAL_VELOCITY;
            }
        }
    }
    //Draws scene
    drawBackground();
    drawPlan();
    drawPaddle();
    drawWindDirections();
    console.log(man_velocity_wind);

    //Draws fire if pilot hat crash
    function drawFire() {
        let fire = new Image();
        fire.src = fire_img;
        var onFire = function () {
            fire_layer.clearRect(x_fire, y_fire, FIRE_SIZE, FIRE_SIZE);
            fire_layer.drawImage(fire, FIRE_SIZE * fire_frame, 0, FIRE_SIZE, FIRE_SIZE, x_fire, y_fire, FIRE_SIZE, FIRE_SIZE);
            if (fire_frame === TOTAL_FIRE_FRAME) {
                fire_frame = 0;
                clearInterval(fire_interval);
                onFailedGame();
            } else {
                fire_frame++;
            }
        }
        let fire_interval = setInterval(onFire, 300);
    }

    //Draws plan in scene
    function drawPlan() {
        let plan = new Image();
        plan.src = plan_img;
        let onPlane = () => {
            plan_layer.clearRect(x_plane, Y_PLANE, PLANE_WIDTH, PLANE_HEIGHT);
            plan_layer.drawImage(plan, PLANE_WIDTH * plan_frame, 0, PLANE_WIDTH, PLANE_HEIGHT, x_plane, Y_PLANE, PLANE_WIDTH, PLANE_HEIGHT);
            if (x_plane > -PLANE_WIDTH) {
                if (plan_frame === TOTAL_PLAN_FRAME) {
                    plan_frame = 0;
                } else {
                    plan_frame++;
                }
                x_plane -= PLANE_VELOCITY;
            } else {
                clearInterval(plane_interval);
                plan_layer.clearRect(x_plane, Y_PLANE, PLANE_WIDTH, PLANE_HEIGHT);
                if (draw_man)
                    game_status = false;
            }
        }
        let plane_interval = setInterval(onPlane, PLANE_SPEED);
    }

    //Draws man out plane
    function drawMan() {
        let man_image = new Image();
        man_image.src = man_img;
        let onMan = () => {
            man_layer.clearRect(x_man - MAN_HORIZONTAL_VELOCITY * 5, y_man, MAN_WIDTH + MAN_HORIZONTAL_VELOCITY * 10, MAN_HEIGHT);
            man_layer.drawImage(man_image, x_man, y_man);
            y_man += MAN_VELOCITY;
            x_man += man_velocity_wind;
            if (y_man >= man.height - MAN_HEIGHT) {
                clearInterval(man_interval);
                game_status = false;
                man_layer.clearRect(x_man - MAN_HORIZONTAL_VELOCITY * 5, y_man, MAN_WIDTH + MAN_HORIZONTAL_VELOCITY * 10, MAN_HEIGHT);
            }
            if ((y_man >= (Y_PADDLE - PADDLE_HEIGHT)) && (x_man >= x_paddle && x_man <= (x_paddle + PADDLE_WIDTH - MAN_WIDTH))) {
                onWinGame();
                win_status = true;
                clearInterval(man_interval);
                man_layer.clearRect(x_man - MAN_HORIZONTAL_VELOCITY * 5, y_man, MAN_WIDTH + MAN_HORIZONTAL_VELOCITY * 10, MAN_HEIGHT);
            }
        }
        let man_interval = setInterval(onMan, MAN_SPEED);
    }

    //Draws paddle in scene
    function drawPaddle() {
        let paddle_image = new Image();
        paddle_image.src = paddle_img;
        let onPaddle = () => {
            if (game_status) {
                paddle_layer.clearRect(x_paddle - paddle_velocity, Y_PADDLE, PADDLE_WIDTH, PADDLE_HEIGHT);
                paddle_layer.drawImage(paddle_image, x_paddle, Y_PADDLE);
                x_paddle += paddle_velocity;
                if (x_paddle >= paddle.width - PADDLE_WIDTH || x_paddle <= 0) {
                    paddle_velocity *= -1;
                }
            } else {
                clearInterval(paddle_interval);
                paddle_layer.clearRect(x_paddle - paddle_velocity, Y_PADDLE, PADDLE_WIDTH, PADDLE_HEIGHT);
                x_fire = x_man;
                y_fire = y_man - FIRE_SIZE / 2;
                if (!draw_man) {
                    drawFire();
                } else {
                    onFailedGame();
                }
            }
            if (win_status) {
                clearInterval(paddle_interval);
                paddle_layer.clearRect(x_paddle - paddle_velocity, Y_PADDLE, PADDLE_WIDTH, PADDLE_HEIGHT);
            }
        }
        let paddle_interval = setInterval(onPaddle, PADDLE_SPEED);
    }

    //Draws background of scene
    function drawBackground() {
        let background = new Image();
        background.onload = () => {
            field_layer.drawImage(background, 0, 0);
        }
        background.src = background_img;
    }

    //Draws win man
    function onWinMan() {
        let message_image = new Image();
        message_image.src = man_win_img;
        let onJamp = () => {
            messages_layer.clearRect(x_man - MAN_HORIZONTAL_VELOCITY, y_man - WIN_MAN_WIDTH / 2, WIN_MAN_WIDTH + MAN_HORIZONTAL_VELOCITY * 3, WIN_MAN_HEIGHT);
            messages_layer.drawImage(message_image, WIN_MAN_WIDTH * win_man_frame, 0, WIN_MAN_WIDTH, WIN_MAN_HEIGHT, x_man, y_man - WIN_MAN_WIDTH / 2, WIN_MAN_WIDTH, WIN_MAN_HEIGHT);
            if (win_man_frame === WIN_FRAME) {
                win_man_frame = 0;
            } else {
                win_man_frame++;
            }
        }
        setInterval(onJamp, 100);
    }

    //Draws games panels
    function endGameMessages(value) {
        field_layer.beginPath();
        field_layer.font = '56px Tahoma';
        field_layer.textAlign = 'center';
        field_layer.textBaseline = 'middle';
        field_layer.fillStyle = '#f00';
        field_layer.shadowBlur = 4;
        field_layer.shadowColor = "#000";
        field_layer.fillText(value, field.width / 2, field.height / 2);
    }

    function onFailedGame() {
        endGameMessages('YOU LOSE!!!');
    }

    function onWinGame() {
        game_status = true;
        endGameMessages('YOU WIN!!!');
        onWinMan();
    }

    //Systems variables
    function setRandom(value) {
        return Math.floor(Math.random() * value);
    }

    function drawWindDirections() {
        wind_layer.beginPath();
        wind_layer.moveTo(30 + WIND_X, (wind.height / 2) + WIND_Y);
        wind_layer.lineTo(90 + WIND_X, (wind.height / 2) + WIND_Y);
        wind_layer.stroke();
        wind_layer.closePath();
        switch (wind_direction) {
            case 1: {
                wind_layer.beginPath();
                wind_layer.moveTo(35 + WIND_X, (wind.height / 2) - 5 + WIND_Y);
                wind_layer.lineTo(30 + WIND_X, (wind.height / 2) + WIND_Y);
                wind_layer.lineTo(35 + WIND_X, (wind.height / 2) + 5 + WIND_Y);
                wind_layer.stroke();
                wind_layer.closePath();
                drawWindText(wind_value + ' m/s');
                man_velocity_wind = -wind_value;
                break;
            }
            case 2: {
                wind_layer.beginPath();
                wind_layer.moveTo(85 + WIND_X, (wind.height / 2) - 5 + WIND_Y);
                wind_layer.lineTo(90 + WIND_X, (wind.height / 2) + WIND_Y);
                wind_layer.lineTo(85 + WIND_X, (wind.height / 2) + 5 + WIND_Y);
                wind_layer.stroke();
                wind_layer.closePath();
                drawWindText(wind_value + ' m/s');
                man_velocity_wind = wind_value;
                break;
            }
            default: {
                wind_value = 0;
                drawWindText(wind_value + ' m/s');
            }
        }
    }

    function drawWindText(value) {
        wind_layer.beginPath();
        wind_layer.font = '16px Tahoma';
        wind_layer.textAlign = 'center';
        wind_layer.textBaseline = 'middle';
        wind_layer.fillStyle = '#000';
        wind_layer.fillText(value, 60 + WIND_X, (wind.height / 2) - 10 + WIND_Y);
    }
}