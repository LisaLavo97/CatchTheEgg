var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    basket = document.getElementById("basket"),
    firstTime = true,
    score = 0,
    life = 5,
    primaZig = true,
    primaMov = true,
    egg1_init_x = 125,
    egg2_init_x = 560,
    egg3_init_x = 995;
    eggs_init_y = 130,
    bullsEye_init_y = canvas.height - 50,
    level = 1;

var Hen = function(hen, bool, count, init_x) {
    this.gallina = document.getElementById(hen);
    this.bool = bool;
    this.count = count;
    this.init_x = init_x;
    this.moving_count = init_x;
    this.zig_zag_count = init_x;
}

var bullsEye = function(x,y) {
    this.x = x;
    this.y = y;
    this.img = new Image();
}

var egg = function(x, y, hen) {
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.bullsEye = new bullsEye(x,bullsEye_init_y);
    this.hen = hen;
    this.bool = 1;
}

var hen_1 = new Hen("hen1", 0, 0, 145);
var hen_2 = new Hen("hen2", 1, 0, 580);
var hen_3 = new Hen("hen3", 1, 0, 1015);

var egg1 = new egg(egg1_init_x, eggs_init_y, hen_1);
var egg2 = new egg(egg2_init_x, eggs_init_y, hen_2);
var egg3 = new egg(egg3_init_x, eggs_init_y, hen_3);

egg1.img.src = 'images/ovo.png';
egg1.bullsEye.img.src = 'images/bullseye1.png';
egg2.img.src = 'images/ovo.png';
egg2.bullsEye.img.src = 'images/bullseye1.png';
egg3.img.src = 'images/ovo.png';
egg3.bullsEye.img.src = 'images/bullseye1.png';

document.getElementById("punteggio").innerHTML = score;
document.getElementById("vita").innerHTML = life;
