var player = {
    w: 16,
    h: 16,
    x: 16,
    y: 32
};


var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight;

var cwidth = 1500;
var cheight = 1000
//map vars
var tileSize = 32.1

//mapIndex = 0;
var falling = true;
var velocityx = 0;
var velocityy = 0;
var gravity = 0.5;
var grounded = false;
var jumped = false;
var upt = 0.1;
var speed = 0.3;
var levelselector = 1;
var currentLevel = tmap1;
var still = false;
var mousePos = {
    x: 0,
    y: 0
};

var state = {

    pressedKeys: {
        left: false,
        right: false,
        up: false,
        down: false,
        reset: false
    }
};

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function checkclick(c, event) {

    iy = 1;
    ic = 0;
    var mousepos;
    mousepos = getMousePos(c, event);

    console.log('test ' + mousepos.x + ' ' + mousepos.y);
    for (i = 1; i < 20; i++) {

        ic++;
        ix = ic * 300;

        //console.log(mousepos.x + ' ' + mousepos);
        //console.log(ix + ' ' + iy);

        if (mousepos.x < ix + (64 + 32) && mousepos.x + (64 + 32) > ix && mousepos.y < iy + 128 && mousepos.y > iy + 32) {
            console.log('level');
            console.log('done ' + ix + ' ' + iy);
            console.log(i);

            if (i == 1) {
                init();
                player.y = 560;
                player.x = 5;
            } else {
                levelselector = i;
                mapx = 'tmap' + levelselector;
                // console.log(mapx)
                //console.log('clear');
                currentLevel.length = 0; // Clear contents
                currentLevel.push.apply(currentLevel, eval(mapx)); // Append new contents
                player.y = 560;
                player.x = 5;

                init();
            }
        }


        //console.log(ix + ' ' + iy);
        if (ic % 4 == 0) {

            iy += 250;
            ic = 0;
        }
    }


}




function menu() {
    console.log('menu');


    document.getElementById('Canvas').width = cwidth;
    document.getElementById('Canvas').height = cheight;

    var c = document.getElementById("Canvas");
    var ctx = c.getContext("2d");

    c.addEventListener('mousedown', function(evt) {
        checkclick(c, evt);


    }, false);
    c.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(c, evt);

    }, false);
    ctx.clearRect(0, 0, c.width, c.height);
    iy = 1;
    ic = 0;




}


function levelselect() {
    console.log('menu');


    document.getElementById('Canvas').width = cwidth;
    document.getElementById('Canvas').height = cheight;

    var c = document.getElementById("Canvas");
    var ctx = c.getContext("2d");

    c.addEventListener('mousedown', function(evt) {
        checkclick(c, evt);


    }, false);
    c.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(c, evt);

    }, false);
    ctx.clearRect(0, 0, c.width, c.height);
    iy = 1;
    ic = 0;
    for (i = 1; i < 20; i++) {

        ic++;
        ix = ic * 300;

        ctx.font = "32px Arial";
        ctx.fillText(i, ix, iy + 100);
        ctx.rect(ix - (16 + 32) / 2, iy + 100 - (48), 64, 64);
        ctx.stroke();
        ctx.closePath();
        if (ic % 4 == 0) {
            console.log(ix);
            iy += 250;
            ic = 0;
        }
    }




}

var keyMap = {
    68: 'right',
    65: 'left',
    87: 'up',
    83: 'down',
    82: 'reset'
};

function keydown(event) {
    var key = keyMap[event.keyCode];
    state.pressedKeys[key] = true;
}

function keyup(event) {
    var key = keyMap[event.keyCode];
    state.pressedKeys[key] = false;
}

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);


function init() {


    document.getElementById('Canvas').width = cwidth;
    document.getElementById('Canvas').height = cheight;

    document.getElementById('Canvas').removeEventListener("mousedown", function(evt) {
        checkclick(c, evt);


    }, false);
    document.getElementById('Canvas').removeEventListener("mousemove", function(evt) {
        mousePos = getMousePos(c, evt);

    }, false);

    loop();



}

function move() {




    if (state.pressedKeys.left) {

        checkMove(player.x, player.y - 0.5, tileSize, tileSize, 'down');
        // console.log(velocityx);
        checkMove(player.x, player.y - 0.5, tileSize, tileSize, 'left');
        if (velocityx > -10) {
            velocityx -= speed;

        }
    }
    if (state.pressedKeys.right) {
        checkMove(player.x, player.y - 0.5, tileSize, tileSize, 'down');
        checkMove(player.x, player.y - 0.5, tileSize, tileSize, 'right');
        if (velocityx < 10) {
            velocityx += speed;

        }
    }
    if (state.pressedKeys.up) {
        falling = false;
        checkMove(player.x, player.y - 0.5, tileSize, tileSize, 'up');
        //velocityy -= 0.5;
        checkMove(player.x, player.y - 0.5, tileSize, tileSize, 'down');

        if (!jumped) {
            gravity = 0;
            upt += 0.2;
            velocityy = -3 * upt;


            if (upt > 3) {

                jumped = true;
                upt = 0.1;
            }
        }

    } else {
        if (upt > 0.1) {
            jumped = true;

        }

    }

    if (state.pressedKeys.reset) {
        player.y = 560;
        player.x = 5;
    }


    if (state.pressedKeys.down) {

        checkMove(player.x, player.y - 0.5, tileSize, tileSize, 'down');
        if (falling) {
            velocityy += speed;
        }
    }
    if (!state.pressedKeys.left && !state.pressedKeys.right) {

        if (-0.5 <= velocityx && velocityx <= 0.5 && velocityx != 0) {
            still = true;
            velocityx = 0;
            //console.log('ping1');
        } else {
            if (velocityx >= 0.5) {
                checkMove(player.x, player.y - 0.5, tileSize, tileSize, 'right');
                velocityx -= 0.5;
                //console.log('ping2');
            } else {
                if (velocityx <= -0.5) {
                    checkMove(player.x, player.y - 0.5, tileSize, tileSize, 'left');
                    velocityx += 0.5;
                    //console.log('ping3');
                }
            }
        }
    }



}


function checkMove(px, py, pw, ph, pd) {

    //console.log('collide check' + pd);
    for (var y = 0; y < currentLevel.length; y += 1) {
        for (var x = 0; x < currentLevel[y].length; x += 1) {

            var tileX = x * tileSize;
            var tileY = y * tileSize;



            if (currentLevel[y][x] === 1 || currentLevel[y][x] === 2) {

                if (px < tileX + tileSize && px + (pw / 2) > tileX && py < tileY + tileSize && py + (ph / 2) + 1 > tileY) {
                    if (pd === 'right' && px + pw > tileX) {
                        player.x -= velocityx;
                        velocityx = 0;
                        // player.x = tileX - pw/2 - 1;

                        // console.log('right');
                        if (currentLevel[y][x] === 2) {
                            player.y = 560;
                            console.log('check ded');
                            player.x = 5;
                        }


                    }
                    if (pd === 'left' && px < tileX + tileSize) {

                        player.x -= velocityx;
                        velocityx = 0;
                        // player.x = tileX + pw+ 1;
                        //console.log('left');
                        if (currentLevel[y][x] === 2) {
                            player.y = 560;
                            console.log('check ded');
                            player.x = 5;
                        }


                    }
                    if (pd === 'up' && py + ph > tileY) {

                        if (velocityy < 0) {



                            velocityy = 0;

                            player.y = tileY + tileSize;
                            //console.log('up');
                            if (currentLevel[y][x] === 2) {
                                player.y = 560;
                                console.log('check ded');
                                player.x = 5;
                            }
                        }
                    }



                    if (pd === 'down' && py - 1 < tileY) {
                        gravity = 0;
                        jumped = false;
                        falling = false;
                        velocityy = 0;
                        player.y = tileY - player.h - 1;
                        if (currentLevel[y][x] === 2) {
                            player.y = 560;
                            console.log('check ded');
                            player.x = 5;
                        }
                        /* if(velocityy>0.6){
                         if (falling) {
                             velocityy = 0;
                             player.y = tileY - player.h - 1;
                         }
                         
                         console.log('down');
                         falling = false;
                         }*/
                    }

                }


            } else {
                if (px < tileX + tileSize && px + (pw / 2) > tileX && py < tileY + tileSize && py + (ph / 2) + 1 > tileY) {

                    falling = true;


                }
            }

        }
    }
}



function loop() {
    setTimeout(function() {
        //console.log(velocityx);
        if (falling) {
            //console.log('fall loop');
            gravity = 0.5;
            velocityy = velocityy + gravity;
            if (velocityy > 0.5 || velocityy < -0.5) {
                // console.log(velocityy);

                checkMove(player.x, player.y + 0.5, tileSize, tileSize, 'down');
                checkMove(player.x, player.y - 0.5, tileSize, tileSize, 'up');
            }
        } else {
            velocityy = 0;
            gravity = 0.0;
        }


        move();

        player.x += velocityx;

        player.y += velocityy;

        //console.log('test');
        draw();
        //window.requestAnimationFrame(loop);
        if (player.y < 5) {
            velocityy = 0;
        }
        if (player.x > cwidth) {

            if (levelselector > 9) {
                location.href = "www.google.com";
            } else {
                player.y = 560;
                player.x = 5;
                levelselector += 1;
                mapx = 'tmap' + levelselector;
                // console.log('clear');
                currentLevel.length = 0; // Clear contents
                currentLevel.push.apply(currentLevel, eval(mapx)); // Append new contents
            }
        }
        if (player.x < 0) {

            if (levelselector != 1) {
                player.y = 560;
                player.x = cwidth - 25;
                levelselector -= 1;
                mapx = 'tmap' + levelselector;
                // console.log(mapx)
                //console.log('clear');
                currentLevel.length = 0; // Clear contents
                currentLevel.push.apply(currentLevel, eval(mapx)); // Append new contents
            }



        }

        loop();
    }, 14);
}

function draw() {

    var c = document.getElementById("Canvas");
    var ctx = c.getContext("2d");
    //clear
    ctx.clearRect(0, 0, c.width, c.height);


    ctx.beginPath();

    //player
    ctx.rect(player.x, player.y, player.w, player.h);
    for (var y = 0; y < currentLevel.length; y += 1) {
        for (var x = 0; x < currentLevel[y].length; x += 1) {

            var tileX = x * tileSize;
            var tileY = y * tileSize;
            if (currentLevel[y][x] === 2) {
                //console.log("RED");
                ctx.fillStyle = 'red';
                ctx.fillRect(tileX, tileY, tileSize, tileSize);
            }

            if (currentLevel[y][x] === 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(tileX, tileY, tileSize, tileSize);
            }

        }
    }
    //draw loop
    ctx.stroke();
    ctx.closePath();

}