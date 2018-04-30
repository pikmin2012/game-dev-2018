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
var speed = 0.5;
var levelselector = 1;
var currentLevel = tmap1;
var still = false;
var state = {

    pressedKeys: {
        left: false,
        right: false,
        up: false,
        down: false
    }
};




var keyMap = {
    68: 'right',
    65: 'left',
    87: 'up',
    83: 'down'
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




    loop();
  


}

function move() {




    if (state.pressedKeys.left) {

                checkMove(player.x, player.y - 0.5, tileSize, tileSize, 'down');
        console.log(velocityx);
        checkMove(player.x, player.y - 0.5, tileSize, tileSize, 'left');
        if (velocityx > -15) {
            velocityx -= speed;
        }
    }
    if (state.pressedKeys.right) {
                checkMove(player.x, player.y - 0.5, tileSize, tileSize, 'down');
        checkMove(player.x, player.y - 0.5, tileSize, tileSize, 'right');
        if (velocityx < 15) {
            velocityx += speed;
        }
    }
    if (state.pressedKeys.up) {
        checkMove(player.x, player.y - 0.5, tileSize, tileSize, 'up');
        //velocityy -= 0.5;
        checkMove(player.x, player.y - 0.5, tileSize, tileSize, 'down');

        if (!jumped) {
            gravity = 0;
            upt += 0.2;
            velocityy = -4 * upt;


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
    
     console.log('collide check' + pd);
    for (var y = 0; y < currentLevel.length; y += 1) {
        for (var x = 0; x < currentLevel[y].length; x += 1) {

            var tileX = x * tileSize;
            var tileY = y * tileSize;

            if (currentLevel[y][x] === 1) {
                if (px < tileX + tileSize && px + (pw / 2) + 5 > tileX && py < tileY + tileSize && py + (ph / 2) + 1> tileY) {
                    if (pd === 'right' && px + (pw / 2) > tileX) {
                        velocityx = 0;
                        player.x = tileX - (pw / 2) - 1;
                        console.log('right');
                        return true;
                    }
                    if (pd === 'left' && px < tileX + tileSize) {
                        velocityx = 0;
                        player.x = tileX + tileSize + 0.5;
                        console.log('left');
                    }
                    /* if (pd === 'up' && py+ph > tileY - tileSize) {
                          falling = false;
                         velocityy = 0;
                       player.y = tileY;
                       console.log('up');
                      
                     }else{
                         falling = true;
                     }
                     
                    */
                    
                    if (pd === 'down' && py - 1 < tileY) {
                        jumped = false;
                        if(velocityy>0.6){
                        if (falling) {
                            velocityy = 0;
                            player.y = tileY - player.h - 1;
                        }
                        
                        console.log('down');
                        falling = false;
                        }
                    }
                     
                } else{
                    
                    falling = true;
                    
                }

            }
        }
    }
}

function loop() {
    if(player.x > cwidth){
        player.y = 560;
        player.x = 5;
        levelselector += 1;
        mapx = 'tmap' + levelselector;
        console.log('clear');
        currentLevel.length = 0;                  // Clear contents
        currentLevel.push.apply(currentLevel, eval(mapx));  // Append new contents
        
    }
    if (falling) {
        gravity = 0.5;
        velocityy = velocityy + gravity;
        if(velocityy > 0.5 || velocityy < -0.5){
            console.log(velocityy);
            
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
    window.requestAnimationFrame(loop);

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
