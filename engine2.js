var player = {
    w: 15,
    h: 15,
    x: 15,
    y: 25
};
var p = [];
p[0] = new enemy(250, 500, 250, 15, 0);
p[1] = new enemy(450, 450, 50, 15, 0);
p[2] = new enemy(5, 200, 100, 15, 0);
p[3] = new enemy(600, 600, 100, 15, 0);
p[4] = new enemy(500, 400, 15, 100, 1);
var velocityx = 0;
var velocityy = 0;
var gravity = 0.5;
var grounded = false;
var jumped = false;
var c_onscreen = 2;
var upt = 0.1;
var state = {

    pressedKeys: {
        left: false,
        right: false,
        up: false,
        down: false
    }
}
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight;


function enemy(x, y, w, h, s) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.s = s;
}


var keyMap = {
    68: 'right',
    65: 'left',
    87: 'up',
    83: 'down'
}

function keydown(event) {
    var key = keyMap[event.keyCode]
    state.pressedKeys[key] = true
}

function keyup(event) {
    var key = keyMap[event.keyCode]
    state.pressedKeys[key] = false
}

window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)


function init() {


    document.getElementById('Canvas').width = x - 25;
    document.getElementById('Canvas').height = y - 25;




    loop();




}

function move() {

    if (collisionc()) {
        grounded = true;
        //player.y = p[0].y - player.h;
    } else {
        grounded = false;
    }
    if (!grounded) {
        if (velocityy < 40) {
            velocityy += gravity;
        }
    } else {
        jumped = false;
        velocityy = 0;
    }


    if (state.pressedKeys.left) {
        velocityx -= 0.5;
    }
    if (state.pressedKeys.right) {
        velocityx += 0.5;
    }
    if (state.pressedKeys.up) {

        if (!jumped) {
            upt += 0.5;
            velocityy = -4 * upt;


            if (upt > 2) {

                jumped = true;
                upt = 0.1;
            }
        }

    } else {
        if (upt > 0.1) {
            jumped = true;
        }


    }



    if (state.pressedKeys.down) {
        velocityy += 0.5;
    }
    if (!state.pressedKeys.left && !state.pressedKeys.right) {
        if (-0.5 <= velocityx && velocityx <= 0.5 && velocityx != 0) {
            velocityx = 0;
            //console.log('ping1');
        } else {
            if (velocityx >= 0.5) {
                velocityx -= 0.5;
                //console.log('ping2');
            } else {
                if (velocityx <= -0.5) {
                    velocityx += 0.5;
                    //console.log('ping3');
                }
            }
        }
    }

}

function collisionc() {

    for (i = 0; i < p.length; i++) {
        //console.log(p[i].x);

        if (player.x + player.w + 2 > p[i].x - 2 && player.x < p[i].x + p[i].w + 2 && player.y + player.h + 2 > p[i].y && player.y < p[i].y + p[i].h + 2) {

            if (player.y < (p[i].y + p[i].h) + 2) {
                if (p[i].s == 0) {

                    player.y = p[i].y - p[i].h;
                    return true;
                }


            } else {
                return true;
            }
        } else if (i <= p[i].length) {


            return false;

        }

    }
}




function loop() {

    if (player.y > w.innerHeight) {
        player.x = 50;
        player.y = 50;
    }
    move();
    if (player.x < w.innerWidth - 100) {
        player.x += velocityx;
    } else if (velocityx < 0) {
        player.x += velocityx;
    }
    player.y += velocityy;

    //console.log('test');
    draw();
    window.requestAnimationFrame(loop)

}

function draw() {

    var c = document.getElementById("Canvas");
    var ctx = c.getContext("2d");
    //clear
    ctx.clearRect(0, 0, c.width, c.height);


    ctx.beginPath();

    //player
    ctx.rect(player.x, player.y, player.w, player.h);
    for (i = 0; i < p.length; i++) {
        //console.log('test');
        ctx.rect(p[i].x, p[i].y, p[i].w, p[i].h);

    }
    //draw loop
    ctx.stroke();
    ctx.closePath();

}
