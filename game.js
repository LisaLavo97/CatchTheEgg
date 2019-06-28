function play_1() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawFloor();
    dragBasket(basket);

    egg_down(egg1);
    egg_down(egg2);
    egg_down(egg3);

    check_basket_pos();

    if (life <= 0) {
        closeGame();
        openMenu();
        return;
    }

    requestAnimationFrame(play_1);
}

function play_2() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFloor();
    dragBasket(basket);

    move_hen(hen_1);
    move_hen(hen_2);
    move_hen(hen_3);

    egg_down_while_moving(egg1);
    egg_down_while_moving(egg2);
    egg_down_while_moving(egg3);

    check_basket_pos();

    if (life <= 0) {
        closeGame();
        openMenu();
        return;
    }

    requestAnimationFrame(play_2);
}

function play_3() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFloor();
    dragBasket(basket);

    zig_zag_hen(hen_1);
    zig_zag_hen(hen_2);
    zig_zag_hen(hen_3);

    egg_down_while_zigzaging(egg1);
    egg_down_while_zigzaging(egg2);
    egg_down_while_zigzaging(egg3);

    check_basket_pos();

    if (life <= 0) {
        closeGame();
        openMenu();
        return;
    }

    requestAnimationFrame(play_3);
}


function play(level) {
    if (level == 1) {
        play_1();
    }
    else if (level == 2) {
        play_2();
    }
    else {
        play_3();
    }
}
