let width = 4*window.innerWidth/5;
let height = 2*window.innerHeight/3;

//game stuff
let play = false;
let playBtn;
let result = 0;
let currentTime = 0;
let timer = null;
let countdownTimer;

//sounds
let eng_sheff;
let fkn_words;
let ghost_cookies;
let huevos;
let ladies;
let not_quite;
let rock_n_roll;
let stupid_pc;
let yawned;

//buttons array
let buttons_top = [];
let buttons_middle = [];
let buttons_bottom = [];

class Button {
  constructor(x, y, w, h, colour, accent, sound) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.colour = colour;
    this.accent = accent;
    this.sound = sound;
    this.mole = false;
  }

  show() {
    noStroke();

    fill(this.colour);
    rect(this.x-(this.w/2), this.y, this.w, this.h/2);
    ellipse(this.x-this.w/4+3, this.y+this.h/2, this.w/2+5, 2*this.h/3);
    ellipse(this.x+this.w/4-3, this.y+this.h/2, this.w/2+5, 2*this.h/3);
    triangle(this.x-this.w/2+5, this.y+10+this.h/2, this.x, this.y+3*this.h/4+this.h/2, this.x+this.w/2-5, this.y+10+this.h/2);

    fill(this.accent);
    ellipse(this.x-this.w/4+3, this.y, this.w/2+5, 2*this.h/3);
    ellipse(this.x+this.w/4-3, this.y, this.w/2+5, 2*this.h/3);
    triangle(this.x-this.w/2+5, this.y+10, this.x, this.y+3*this.h/4, this.x+this.w/2-5, this.y+10);
  }

  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.w/3) {
      this.y = this.y + 10;
      this.sound.play();
      if (play && this.mole){
        result++;
        const score = document.querySelector('#score');
        score.textContent = result;
      }
    }
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function setup() {
  canvas = createCanvas(width, height);
  canvas.style('display', 'block');
  canvas.parent('canvas-div');

  //load sounds
  eng_sheff = loadSound('sounds/eng_sheff.mp3');
  fkn_words = loadSound('sounds/fkn_words.mp3');
  ghost_cookies = loadSound('sounds/ghost_cookies.mp3');
  huevos = loadSound('sounds/huevos.mp3');
  ladies = loadSound('sounds/ladies.mp3');
  not_quite = loadSound('sounds/not_quite.mp3');
  rock_n_roll = loadSound('sounds/rock_n_roll.mp3');
  stupid_pc = loadSound('sounds/stupid_pc.mp3');
  yawned = loadSound('sounds/yawned.mp3');

  //create buttons
  let btn1 = new Button(width/4, height/4-30, height/3, height/8, color(200, 65, 75), color(230, 115, 120), eng_sheff);
  let btn2 = new Button(width/2, height/4-30, height/3, height/8, color(200, 65, 75), color(230, 115, 120), fkn_words);
  let btn3 = new Button(3*width/4, height/4-30, height/3, height/8, color(200, 65, 75), color(230, 115, 120), ghost_cookies);

  let btn4 = new Button(width/4, height/2-30, height/3, height/8, color(200, 65, 75), color(230, 115, 120), huevos);
  let btn5 = new Button(width/2, height/2-30, height/3, height/8, color(200, 65, 75), color(230, 115, 120), ladies);
  let btn6 = new Button(3*width/4, height/2-30, height/3, height/8, color(200, 65, 75), color(230, 115, 120), not_quite);

  let btn7 = new Button(width/4, 3*height/4-30, height/3, height/8, color(200, 65, 75), color(230, 115, 120), rock_n_roll);
  let btn8 = new Button(width/2, 3*height/4-30, height/3, height/8,color(200, 65, 75), color(230, 115, 120), stupid_pc);
  let btn9 = new Button(3*width/4, 3*height/4-30, height/3, height/8, color(200, 65, 75), color(230, 115, 120), yawned);

  //button arrays
  buttons_top.push(btn1);
  buttons_top.push(btn2);
  buttons_top.push(btn3);

  buttons_middle.push(btn4);
  buttons_middle.push(btn5);
  buttons_middle.push(btn6);

  buttons_bottom.push(btn7);
  buttons_bottom.push(btn8);
  buttons_bottom.push(btn9);

  // play whac-a-mole
  playBtn = document.querySelector('#play-button');
  playBtn.onclick = function() {
    play = true;
    playBtn.disabled = true;
    startGame();
  };
}

function startGame() {
  result = 0;
  currentTime = 30;
  countdownTimer = setInterval(countDown, 1000);
  timer = setInterval(randomBtn, 1000);
} 

function randomBtn() {
  //start fresh
  refreshButtons();

  //set random button
  let random = Math.floor(Math.random() * 10) % 9;
  if(Math.floor(random / 3) == 0) {
    buttons_top[random % 3].colour = color(0, 0, 155);
    buttons_top[random % 3].accent = color(0, 0, 255);
    buttons_top[random % 3].mole = true;
  }
  if(Math.floor(random / 3) == 1) {
    buttons_middle[random % 3].colour = color(0, 0, 155);
    buttons_middle[random % 3].accent = color(0, 0, 255);
    buttons_middle[random % 3].mole = true;
  }
  if(Math.floor(random / 3) == 2) {
    buttons_bottom[random % 3].colour = color(0, 0, 155);
    buttons_bottom[random % 3].accent = color(0, 0, 255);
    buttons_bottom[random % 3].mole = true;
  }
}

function countDown() {
  currentTime--;
  const timeLeft = document.querySelector('#time');
  timeLeft.textContent = currentTime;
  if (currentTime == 0) {
    play = false;
    clearInterval(countdownTimer);
    clearInterval(timer);
    alert("GAME OVER!");
    refreshButtons();
    playBtn.disabled = false;
  }
}

function refreshButtons() {
  for (let i = 0; i < buttons_top.length; i++) {
    buttons_top[i].colour = color(200, 65, 75);
    buttons_top[i].accent = color(230, 115, 120);
    buttons_top[i].mole = false;
    
    buttons_middle[i].colour = color(200, 65, 75);
    buttons_middle[i].accent = color(230, 115, 120);
    buttons_middle[i].mole = false;

    buttons_bottom[i].colour = color(200, 65, 75);
    buttons_bottom[i].accent = color(230, 115, 120);
    buttons_bottom[i].mole = false;
  }
}

function mousePressed() {
  
  for (let i = 0; i < buttons_top.length; i++) {
    buttons_top[i].clicked(mouseX, mouseY);
    buttons_middle[i].clicked(mouseX, mouseY);
    buttons_bottom[i].clicked(mouseX, mouseY);
  }
}

function mouseReleased() {
  for (let i = 0; i < buttons_top.length; i++) {
    buttons_top[i].y = height/4-30;
    buttons_middle[i].y = height/2-30;
    buttons_bottom[i].y = 3*height/4-30;
  }
}

function draw() {
  background(232, 166, 195); 
  noStroke();

  for (let i = 0; i < buttons_top.length; i++) {
    buttons_top[i].show(); 
    buttons_middle[i].show();
    buttons_bottom[i].show();
  }
}
