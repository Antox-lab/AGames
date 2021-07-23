import {
    wals
} from './levels.js';

export default function draw(level = 0) {
    let canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");

        //Start position in game canvas
        let x = wals[level][0].x;
        let y = wals[level][0].y;
        const DELTA_MOVE = 5;
        //End position in game canvas
        let xe = wals[level][0].xe;
        let ye = wals[level][0].ye;
        //Start and end point sizes
        const POINT_RADIUS = 20;
        const OREOL_RADIUS = 20;

        function drawScene() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (x !== xe || y !== ye) {
                drawLabirint();
                drawEndPoint();
                drawShadow();
                drawPosition();
            } else {
                printWins();
            }
        }

        //Gets colors in square pints of position
        function getColor(positionX, positionY) {
            let positionColor = ctx.getImageData(positionX, positionY, 1, 1).data[0];
            return positionColor;
        }

        //Events and moves
        document.addEventListener('keydown', onKeyPress, false);
        // document.addEventListener('keyup', onKeyPass, false);

        function onKeyPress(e) {
            switch (e.keyCode) {
                case 40: {
                    if (getColor(x - POINT_RADIUS, y + POINT_RADIUS) > 100 &&
                        getColor(x + POINT_RADIUS, y + POINT_RADIUS) > 100)
                        y += DELTA_MOVE;
                    break;
                }
                case 37: {
                    if (getColor(x - POINT_RADIUS, y - POINT_RADIUS) > 100 &&
                        getColor(x - POINT_RADIUS, y + POINT_RADIUS) > 100)
                        x -= DELTA_MOVE;
                    break;
                }
                case 38: {
                    if (getColor(x - POINT_RADIUS, y - POINT_RADIUS) > 100 &&
                        getColor(x + POINT_RADIUS, y - POINT_RADIUS) > 100)
                        y -= DELTA_MOVE;
                    break;
                }
                case 39: {
                    if (getColor(x + POINT_RADIUS, y - POINT_RADIUS) > 100 &&
                        getColor(x + POINT_RADIUS, y + POINT_RADIUS) > 100)
                        x += DELTA_MOVE;
                    break;
                }
                default:
                    break;
            }
            drawScene();
        }


        /* Scene elenets
         - drawShadow - drawing black area
         - darwLabirint - drawing wolls of labirint
         - drawPosition - start position in game
         - drawEndPoint - end position in game
         */
        function drawShadow() {
            const gradient = ctx.createRadialGradient(x, y, OREOL_RADIUS, x, y, OREOL_RADIUS * 4);
            gradient.addColorStop(0, '#fff0');
            gradient.addColorStop(1, '#000')
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.closePath();
        }

        function drawLabirint() {
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.rect(2, 2, canvas.width - 4, canvas.height - 4);
            ctx.stroke();
            ctx.closePath();
            for (let i = 1; i < wals[level].length; i++) {
                ctx.beginPath();
                ctx.moveTo(wals[level][i].mx, wals[level][i].my);
                ctx.lineTo(wals[level][i].lx, wals[level][i].ly);
                ctx.stroke();
                ctx.closePath();
            }
        }

        function drawPosition() {
            ctx.beginPath();
            ctx.fillStyle = '#480';
            ctx.arc(x, y, POINT_RADIUS, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.closePath();
        }

        function drawEndPoint() {
            ctx.beginPath();
            ctx.fillStyle = '#fa0';
            ctx.arc(xe, ye, POINT_RADIUS, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.font = '16px Tahoma';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#000';
            ctx.fillText('EXIT', xe, ye);
        }

        //Labels and messages
        function printWins() {
            ctx.beginPath();
            ctx.font = '40px Tahoma';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#000';
            ctx.fillText('You WINS!!!', canvas.width / 2, canvas.height / 2);
        }

        drawScene();
    }
}