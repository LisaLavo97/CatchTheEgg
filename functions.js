function openGame() {
    if(firstTime) {
        if(level > 1) {
            resetHensPosition();
            resetEggsPosition();
        }
        firstTime = false;
    }
    else {
        resetHensPosition();
        resetEggsPosition();
        resetGame();
    }

    play(level);
    var gameContainer = document.getElementById('game-container');
    gameContainer.style.display = "block";
}

function closeGame() {
    var gameContainer = document.getElementById('game-container');
    gameContainer.style.display = "none";
}

function openMenu() {
    var menu = document.getElementById('init-menu');
    menu.style.display = "block";
}

function closeMenu() {
    var menu = document.getElementById('init-menu');
    menu.style.display = "none";
}

function setLevel(lev) {
    level = lev;
}

function resetHensPosition() {
    hen_1.gallina.style.left = hen_1.init_x;
    hen_2.gallina.style.left = hen_2.init_x;
    hen_3.gallina.style.left = hen_3.init_x;
}

function resetEggsPosition() {
    egg1.x = egg1_init_x;
    egg2.x = egg2_init_x;
    egg3.x = egg3_init_x;
}

function resetGame() {
    score = 0;
    life = 5;
    document.getElementById("punteggio").innerHTML = score;
    document.getElementById("vita").innerHTML = life;
    document.onmouseup = null;
    document.onmousemove = null;
    egg1.y = eggs_init_y;
    egg2.y = eggs_init_y;
    egg3.y = eggs_init_y;
    hen_1.moving_count = hen_1.init_x;
    hen_2.moving_count = hen_2.init_x;
    hen_3.moving_count = hen_3.init_x;
    hen_1.zig_zag_count = hen_1.init_x;
    hen_2.zig_zag_count = hen_2.init_x;
    hen_3.zig_zag_count = hen_3.init_x;
    basket.style.top = 580 + "px";
    basket.style.left = 630 + "px";
}

function drawFloor() {
    ctx.beginPath();
    ctx.strokeRect(0, canvas.height-50, canvas.width, 50);
    ctx.fillStyle = "#822222";
    ctx.strokeStyle = "#822222";
    ctx.lineWidth = 5;
    ctx.fillRect(0, canvas.height-50, canvas.width, 50);
    ctx.closePath();
}

function egg_down(egg) {
    if(life <= 0)
        return;
    if(check_egg_hits_floor(egg) || check_egg_hits_basket(egg))
        egg.y = eggs_init_y;
    ctx.drawImage(egg.img, egg.x, egg.y, 45, 45);
    egg.y += 2;
}

function egg_down_while_moving(egg) {
    if(life <= 0)
        return;
    if(check_egg_hits_floor(egg) || check_egg_hits_basket(egg) || check_egg_hits_canvas(egg)) {
        egg.x = egg.hen.moving_count + 16;
        egg.y = eggs_init_y;
    }
    ctx.drawImage(egg.img, egg.x, egg.y, 45, 45);
    egg.x -= 0.05;
    egg.y += 2;
}

function egg_down_while_zigzaging(egg) {
    if(life <= 0)
        return;
    if(check_egg_hits_floor(egg) || check_egg_hits_basket(egg) || check_egg_hits_canvas(egg)) {
        egg.x = egg.hen.zig_zag_count + 10;
        egg.y = eggs_init_y;
        egg.bool = egg.hen.bool;
    }
    ctx.drawImage(egg.img, egg.x, egg.y, 45, 45);
    if(egg.bool == 1)
        egg.x += 1;
    else
        egg.x -= 1;
    egg.y += 3;
}

function show_bullsEye(egg) {
    ctx.drawImage(egg.bullsEye.img, egg.bullsEye.x, egg.bullsEye.y,48,48);
}

function check_egg_hits_floor(egg) {
    var tmp = canvas.height - canvas.offsetTop - 50;
    if(egg.y >= tmp) {
        life = life - 1;
        document.getElementById("vita").innerHTML = life;
        show_bullsEye(egg);
        return true
    }
    return false;
}

function check_egg_hits_canvas(egg) {
    var tmp = canvas.width;
    if(egg.x >= tmp)
        return true;
    return false;
}

function check_egg_hits_basket(egg) {
    var basketTop = basket.offsetTop - canvas.offsetTop;
    var basketHalf = basketTop + 10;
    var basketLeft = basket.offsetLeft - canvas.offsetLeft;
    var basketRight = basketLeft + 78;
    if((egg.y >= basketTop) && (egg.y <= basketHalf) && (egg.x <= basketRight) && (egg.x >= basketLeft) && (basketTop > 135)) {
        score = score + 1;
        document.getElementById("punteggio").innerHTML = score;
        return true;
    }
    return false;
}

function check_basket_pos() {
    var basketTop = basket.offsetTop - canvas.offsetTop;
    var basketLeft = basket.offsetLeft - canvas.offsetLeft
    if(basketTop > 770 || basketTop < -60 || basketLeft < -70 || basketLeft > 1240) {
        basket.style.top = 580 + "px";
        basket.style.left = 630 + "px";
    }
}

function check_hen_hits_canvas(hen) {
    var tmp = canvas.width - canvas.offsetLeft;
    return (hen.moving_count >= tmp);
}


function move_hen(hen) {
    if (check_hen_hits_canvas(hen)) {
        hen.gallina.style.left = canvas.offsetLeft;
        hen.moving_count = canvas.offsetLeft;
    }
        
    hen.moving_count += 2;
    hen.gallina.style.left = hen.moving_count;
}

function zig_zag_hen(hen) {
    var rand = Math.random() * 4;
    
     // bool == 0: direzione == sx
    if (hen.bool == 0) {
        if (hen.count <= -60) {
            hen.bool = 1;
        }
        else {
            hen.count = hen.count - rand;
            hen.zig_zag_count -= rand;
            hen.gallina.style.left = hen.zig_zag_count;
        }
    }
    // bool == 1: direzione == dx
    else if (hen.bool == 1) {
        if (hen.count >= 60) {
            hen.bool = 0;
        }
        else {
            hen.count = hen.count + rand;
            hen.zig_zag_count += rand;
            hen.gallina.style.left = hen.zig_zag_count;
        }  
    }
}