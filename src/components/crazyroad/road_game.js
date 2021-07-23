import background_img from './background.png';
import man_img from './man.png';
import bus_red_img from './bus_red.png';
import bus_white_img from './bus_white.png';
import car_green_img from './car_green.png';
import car_red_img from './car_red.png';
import truck_box_img from './truck_box.png';
import truck_cirk_img from './truck_cirk.png';
import crush_img from './crush.png';

export default function draw() {

    let background = document.getElementById("background"),
        man = document.getElementById("man"),
        car = document.getElementById("car"),
        messages = document.getElementById("messages");

    let background_layer = background.getContext("2d"),
        man_layer = man.getContext("2d"),
        car_layer = car.getContext("2d"),
        messages_layer = messages.getContext("2d");

    //Mans variables
    const MAN_MOVIEN = 3,
        CAR_MOVIEN = 5;


    //Creates game
    drawBackground();
    let manObj = new Man(man_layer, man_img, MAN_MOVIEN);
    let carFirst = new Car(car_layer, car, setRandomImage(), 60, CAR_MOVIEN, false, 35 - Math.floor(Math.random() * 3) * 10);
    let carSecond = new Car(car_layer, car, setRandomImage(), 120, CAR_MOVIEN, false, 55 - Math.floor(Math.random() * 3) * 10);
    let carThird = new Car(car_layer, car, setRandomImage(), 195, CAR_MOVIEN, true, 55 - Math.floor(Math.random() * 3) * 10);
    let carFourth = new Car(car_layer, car, setRandomImage(), 255, CAR_MOVIEN, true, 35 - Math.floor(Math.random() * 3) * 10);

    //Games events
    document.addEventListener('keydown', onManMove, false);

    function onManMove(e) {
        switch (e.keyCode) {
            case 39: {
                manObj.setManCVF(0);
                if (manObj.getXPos() < man.width - manObj.getManWidth())
                    manObj.setX(manObj.getXPos() + MAN_MOVIEN);
                manObj.setManCHF(manObj.getManCHF() + 1);
                isFrameLost(manObj);
                break;
            }
            case 37: {
                manObj.setManCVF(1);
                if (manObj.getXPos() > 0)
                    manObj.setX(manObj.getXPos() - MAN_MOVIEN);
                manObj.setManCHF(manObj.getManCHF() + 1);
                isFrameLost(manObj);
                break;
            }
            case 38: {
                manObj.setManCVF(2);
                if (manObj.getYPos() > 0)
                    manObj.setY(manObj.getYPos() - MAN_MOVIEN);
                else setOnWin();
                manObj.setManCHF(manObj.getManCHF() + 1);
                isFrameLost(manObj);
                break;
            }
            case 40: {
                manObj.setManCVF(3);
                if (manObj.getYPos() < man.height - manObj.getManHeight())
                    manObj.setY(manObj.getYPos() + MAN_MOVIEN);
                manObj.setManCHF(manObj.getManCHF() + 1);
                isFrameLost(manObj);
                break;
            }
            default:
                break;
        }
    }

    let gameInterval = setInterval(() => {
        if (getCollision(carFirst, manObj) ||
            getCollision(carSecond, manObj) ||
            getCollision(carThird, manObj) ||
            getCollision(carFourth, manObj)) {

            document.removeEventListener('keydown', onManMove, false);
            clearInterval(gameInterval);
            setOnCrash();
        }
    }, 100);

    //Circulate frames
    function isFrameLost(object) {
        if (object.getManCHF() === object.getTotalCHF()) {
            object.setManCHF(0);
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

    //Collisions
    function getCollision(obj1, obj2) {
        if ((obj1.getXPos() >= obj2.getXPos() && obj1.getXPos() <= obj2.getXPosSecond() && obj1.getYPos() >= obj2.getYPos() && obj1.getYPos() <= obj2.getYPosSecond()) ||
            (obj1.getXPos() >= obj2.getXPos() && obj1.getXPos() <= obj2.getXPosSecond() && obj1.getYPosSecond() >= obj2.getYPos() && obj1.getYPosSecond() <= obj2.getYPosSecond()) ||
            (obj1.getXPosSecond() >= obj2.getXPos() && obj1.getXPosSecond() <= obj2.getXPosSecond() && obj1.getYPos() >= obj2.getYPos() && obj1.getYPos() <= obj2.getYPosSecond()) ||
            (obj1.getXPosSecond() >= obj2.getXPos() && obj1.getXPosSecond() <= obj2.getXPosSecond() && obj1.getYPosSecond() >= obj2.getYPos() && obj1.getYPosSecond() <= obj2.getYPosSecond())) {
            return true;
        } else {
            return false;
        }
    }

    function setRandomImage() {
        let value = Math.floor(Math.random() * 6);
        switch (value) {
            case 0:
                return bus_red_img;
            case 1:
                return bus_white_img;
            case 2:
                return car_green_img;
            case 3:
                return car_red_img;
            case 4:
                return truck_box_img;
            default:
                return truck_cirk_img;
        }
    }

    function setOnCrash() {
        manObj.setGameOver();
        let crash_image = new Image();
        crash_image.src = crush_img;
        let onCrush = () => {
            man_layer.drawImage(crash_image, manObj.getXPos(), manObj.getYPos());
            clearInterval(crushInterval);
            endGameMessages('Too BAD!!!');
        }
        let crushInterval = setInterval(onCrush, 100);
    }

    function setOnWin() {
        let imagePos = 0;
        endGameMessages('CONGRATULATION!!!');
        manObj.setGameOver();
        let win_image = new Image();
        win_image.src = man_img;
        let onWin = () => {
            man_layer.clearRect(manObj.getXPos(), manObj.getYPos(), manObj.getManWidth(), manObj.getManHeight());
            man_layer.drawImage(win_image,
                manObj.getManWidth() * imagePos,
                manObj.getManHeight() * 4,
                manObj.getManWidth(),
                manObj.getManHeight(),
                manObj.getXPos(),
                manObj.getYPos(),
                manObj.getManWidth(),
                manObj.getManHeight());
            imagePos++;
            if (imagePos === 3) {
                imagePos = 0;
            }
        }

        setInterval(onWin, 300);
    }

    //Draws games panels
    function endGameMessages(value) {
        messages_layer.beginPath();
        messages_layer.font = '46px Tahoma';
        messages_layer.textAlign = 'center';
        messages_layer.textBaseline = 'middle';
        messages_layer.fillStyle = '#f00';
        messages_layer.shadowBlur = 4;
        messages_layer.shadowColor = "#000";
        messages_layer.fillText(value, messages.width / 2, messages.height / 2);
    }
}

//Objects
class Man {
    gameStatus = true;
    man_X = 50;
    man_Y = 310;
    manCHF = 0;
    manCVF = 0;
    MAN_WIDTH = 45;
    MAN_HEIGHT = 45;
    MAN_HORIZONTAL_FRAME = 3;

    constructor(layer, image, MAN_MOVIEN) {
        let man_image = new Image();
        man_image.src = image;
        let onMan = () => {
            if (this.gameStatus) {
                layer.clearRect(this.man_X - MAN_MOVIEN * 2, this.man_Y - MAN_MOVIEN * 2, this.MAN_WIDTH + MAN_MOVIEN * 4, this.MAN_HEIGHT + MAN_MOVIEN * 4);
                layer.drawImage(man_image, this.MAN_WIDTH * this.manCHF, this.MAN_HEIGHT * this.manCVF, this.MAN_WIDTH, this.MAN_HEIGHT, this.man_X, this.man_Y, this.MAN_WIDTH, this.MAN_HEIGHT);
            } else {
                layer.clearRect(this.man_X - MAN_MOVIEN * 2, this.man_Y - MAN_MOVIEN * 2, this.MAN_WIDTH + MAN_MOVIEN * 4, this.MAN_HEIGHT + MAN_MOVIEN * 4);
                clearInterval(gameInterval);
            }
        }
        let gameInterval = setInterval(onMan, 40);
    }

    setX(value) {
        this.man_X = value;
    }
    setY(value) {
        this.man_Y = value;
    }
    getXPos() {
        return this.man_X;
    }
    getYPos() {
        return this.man_Y;
    }
    getXPosSecond() {
        return this.man_X + this.MAN_WIDTH;
    }
    getYPosSecond() {
        return this.man_Y + this.MAN_HEIGHT;
    }
    getManCHF() {
        return this.manCHF;
    }
    getManCVF() {
        return this.manCVF;
    }
    setManCHF(value) {
        this.manCHF = value;
    }
    setManCVF(value) {
        this.manCVF = value;
    }
    getManWidth() {
        return this.MAN_WIDTH;
    }
    getManHeight() {
        return this.MAN_HEIGHT;
    }
    getTotalCHF() {
        return this.MAN_HORIZONTAL_FRAME;
    }
    setGameOver() {
        this.gameStatus = false;
    }
}

class Car {
    car_X = 0;
    car_Y = 0;
    carCHF = 0;
    carCVF = 0;
    CAR_MOVIEN = 0;
    FPS = 0;
    imageW = 0;
    imageH = 0;

    constructor(layer, scene, image, car_Y, CAR_MOVIEN, carDirect, FPS) {
        this.car_Y = car_Y;
        this.CAR_MOVIEN = CAR_MOVIEN;
        this.FPS = FPS;
        let car_image = new Image();
        this.imageW = car_image.width;
        this.imageH = car_image.height;
        if (carDirect) {
            this.car_X = -Math.floor(Math.random() * 2) * 100;
            this.carCHF = 0;
        } else {
            this.car_X = scene.width + Math.floor(Math.random() * 2) * 100;
            this.carCHF = 1;
        }
        car_image.src = image;
        let onCar = () => {
            layer.clearRect(this.car_X - CAR_MOVIEN * 2, this.car_Y, car_image.width + CAR_MOVIEN * 4, car_image.height);
            layer.drawImage(car_image, car_image.width * this.carCHF / 2, 0, car_image.width / 2, car_image.height, this.car_X, this.car_Y, car_image.width / 2, car_image.height);
            if (carDirect) {
                this.car_X += CAR_MOVIEN;
                if (this.car_X >= scene.width + CAR_MOVIEN) {
                    this.car_X = -Math.floor(Math.random() * 2) * 100;
                }
            } else {
                this.car_X -= CAR_MOVIEN;
                if (this.car_X <= -car_image.width) {
                    this.car_X = scene.width + Math.floor(Math.random() * 2) * 100;
                }
            }
        }
        setInterval(onCar, FPS);
    }
    getXPos() {
        return this.car_X;
    }
    getYPos() {
        return this.car_Y;
    }
    getXPosSecond() {
        return this.car_X + this.imageW;
    }
    getYPosSecond() {
        return this.cay_Y + this.imageH;
    }
}