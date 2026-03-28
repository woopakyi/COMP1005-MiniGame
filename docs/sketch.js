let sounds = {};
let imgs = {};

let xf = [];
let yf = [];
let xfd = [];
let yfd = [];
let xto = [];
let yto = [];
let xb = [];
let yb = [];
let sb = [];

let lv;
let maxHp;
let hp;
let exp;
let maxExp;
let xas;
let yas;
let flower;
let xc;
let yc;
let speed;

let startTime;
let stage;
let stopTime;
let currentTime;
let doggyTime;
let test;

let playedWinSound;
let playedLoseSound;

function preload() {
  soundFormats("wav");

  sounds.dog = loadSound("assets/snd_dog0.wav");
  sounds.hurt = loadSound("assets/snd_hurt.wav");
  sounds.hurt0 = loadSound("assets/snd_hurt0.wav");
  sounds.heal = loadSound("assets/snd_heal.wav");
  sounds.victory = loadSound("assets/snd_victory.wav");
  sounds.save = loadSound("assets/snd_save.wav");
  sounds.lose = loadSound("assets/snd_lose.wav");
  sounds.laz = loadSound("assets/snd_laz.wav");

  imgs.soulRed = loadImage("assets/soul_red.png");
  imgs.soulBlue = loadImage("assets/soul_blue.png");
  imgs.floweyAlive = loadImage("assets/flowey_alive.png");
  imgs.floweyDead = loadImage("assets/flowey_dead.png");
  imgs.floweyIcon = loadImage("assets/flowey_icon.png");
  imgs.asriel = loadImage("assets/asriel.png");
  imgs.toriel = loadImage("assets/toriel.png");
  imgs.chara = loadImage("assets/chara.png");
  imgs.chara2 = loadImage("assets/chara2.png");
  imgs.bg = loadImage("assets/bg.png");
  imgs.dog1 = loadImage("assets/dog1.png");
  imgs.dog2 = loadImage("assets/dog2.png");
  imgs.bone = loadImage("assets/bone.png");
}

function setup() {
  const canvas = createCanvas(720, 720);
  canvas.parent("app");
  textFont("Trebuchet MS");
  resetGameState();
}

function resetGameState() {
  xf = [];
  yf = [];
  xfd = [];
  yfd = [];
  xto = [];
  yto = [];
  xb = [];
  yb = [];
  sb = [];

  for (let i = 0; i < 3; i += 1) {
    xf.push(random(58, 664));
    yf.push(random(61, 390));
    xb.push(random(-270, -90));
    yb.push(random(44, 407));
    sb.push(random(1, 5));
  }

  lv = 1;
  maxHp = lv * 4 + 16;
  hp = maxHp;
  maxExp = lv;
  exp = 0;

  xas = random(54, 667);
  yas = random(81, 371);
  flower = 0;

  xc = random(48, 672);
  yc = random(58, 394);
  speed = 3;

  startTime = millis();
  stage = 0;
  stopTime = 0;
  currentTime = 0;
  doggyTime = 0;
  test = false;

  playedWinSound = false;
  playedLoseSound = false;
}

function draw() {
  if (stage === 0) {
    drawHome();
  } else if (stage === 1) {
    drawGame();
  } else if (stage === 2) {
    drawWin();
  } else if (stage === 3) {
    drawLose();
  }
}

function drawHome() {
  imageMode(CORNER);
  image(imgs.bg, 0, 0, width, height);

  startTime = millis();
  if (startTime < doggyTime + 300) {
    image(imgs.dog1, 40, 40);
  } else {
    image(imgs.dog2, 20, 40);
  }

  fill(255);
  noStroke();
  textSize(24);
  text("press key to test the volume of sound", 85, 65);

  textSize(36);
  text("click anywhere to start the game", 75, 300);
}

function drawWin() {
  stroke(255);
  strokeWeight(3);
  fill(120);
  rect(100, 100, 525, 250);

  fill(255);
  noStroke();
  textSize(48);
  text("YOU WIN!", 250, 210);
  textSize(30);
  text("You spent " + stopTime.toFixed(1) + "s to reach Lv20", 155, 260);
  text("Press R to restart", 250, 300);

  if (!playedWinSound) {
    playSound(sounds.victory);
    playedWinSound = true;
  }
}

function drawLose() {
  stroke(255);
  strokeWeight(3);
  fill(120);
  rect(100, 100, 525, 250);

  fill(255);
  noStroke();
  textSize(48);
  text("YOU LOSE!", 250, 210);
  textSize(30);
  text("You have no HP left", 230, 260);
  text("Press R to restart", 250, 300);

  if (!playedLoseSound) {
    playSound(sounds.lose);
    playedLoseSound = true;
  }
}

function drawGame() {
  background(0);

  line(721, 0, 721, 720);
  imageMode(CENTER);

  const x = constrain(mouseX, 38, 682);
  const y = constrain(mouseY, 38, 412);

  for (let i = 0; i < xfd.length; i += 1) {
    image(imgs.floweyDead, xfd[i], yfd[i], 60, 66);
  }

  for (let i = 0; i < xto.length; i += 1) {
    image(imgs.toriel, xto[i], yto[i], 50, 104);
  }

  for (let i = 0; i < xf.length; i += 1) {
    image(imgs.floweyAlive, xf[i], yf[i], 60, 66);
  }

  image(imgs.asriel, xas, yas, 40, 67);

  if (lv >= 10) {
    if (xc < x && xc < 672) xc += speed;
    if (xc > x && xc > 48) xc -= speed;
    if (yc < y && yc < 394) yc += speed;
    if (yc > y && yc > 58) yc -= speed;

    if (
      x - 10 < xc + 19 &&
      x + 10 > xc - 19 &&
      y + 10 > yc - 29 &&
      y - 10 < yc + 29
    ) {
      image(imgs.chara2, xc, yc, 38, 58);
      if (millis() - currentTime >= 100) {
        hp -= 1;
        currentTime = millis();
        playSound(sounds.laz);
      }
    } else {
      image(imgs.chara, xc, yc, 38, 58);
    }
  }

  if (lv >= 5) {
    for (let i = 0; i < xf.length; i += 1) {
      xb[i] += sb[i];
      if (xb[i] > width + 90) {
        xb[i] = random(-270, -90);
        yb[i] = random(44, 407);
        sb[i] = random(1, 5);
      }

      image(imgs.bone, xb[i], yb[i], 90, 34);

      if (
        x - 10 < xb[i] + 45 &&
        x + 10 > xb[i] - 45 &&
        y + 10 > yb[i] - 17 &&
        y - 10 < yb[i] + 17
      ) {
        hp = max(hp - 7, 0);
        xb[i] = random(-270, -90);
        yb[i] = random(44, 407);
        sb[i] = random(1, 5);
        playSound(sounds.hurt0);
      }
    }
  }

  imageMode(CENTER);
  if (mouseIsPressed) {
    image(imgs.soulBlue, x, y, 20, 20);
  } else {
    image(imgs.soulRed, x, y, 20, 20);
  }

  fill(255);
  stroke(255);
  strokeWeight(1);
  rect(25, 440, 95, 35, 0, 0, 15, 0);
  textSize(36);
  fill(0);
  noStroke();
  text("Lv" + lv, 30, 470);

  if (lv >= 20 && stage === 1) {
    stopTime = (millis() - startTime) / 1000;
    stage = 2;
    return;
  }

  textSize(24);
  fill(255);
  text(hp + "/" + maxHp, 395, 465);
  text("HP", 145, 465);

  noStroke();
  fill(170, 0, 0);
  rect(180, 445, 210, 25);

  fill(255, 255, 0);
  if (hp > 0) {
    rect(180, 445, (210 * hp) / maxHp, 25);
  } else {
    stage = 3;
    return;
  }

  if (exp >= maxExp) {
    lv += 1;
    exp -= maxExp;
    maxExp = lv;
    maxHp = lv * 4 + 16;
    hp = maxHp;
  }

  fill(255);
  stroke(255);
  rect(492, 440, 205, 33, 0, 0, 0, 10);

  textSize(24);
  fill(0);
  noStroke();
  text("EXP", 500, 465);

  textSize(20);
  text(exp + "/" + maxExp, 630, 463);

  stroke(0);
  fill(255);
  rect(545, 446, 82, 22);
  noStroke();
  fill(0, 255, 255);
  rect(545, 446, (82 * exp) / maxExp, 22);

  stroke(255, 100, 0);
  strokeWeight(2);
  fill(0);
  rect(330, 490, 300, 60);
  rect(100, 490, 210, 60);

  fill(255, 100, 0);
  noStroke();
  textSize(48);
  text("TIME:" + ((millis() - startTime) / 1000).toFixed(1) + "s", 345, 538);

  image(imgs.floweyIcon, 125, 520);

  for (let i = 0; i < 8; i += 1) {
    fill(55);
    stroke(0);
    rect(148 + i * 20, 500, 15, 40);
  }

  for (let i = 0; i < flower; i += 1) {
    fill(255, 100, 0);
    noStroke();
    rect(148 + i * 20, 500, 15, 40);
  }

  stroke(255);
  strokeWeight(6);
  noFill();
  rect(25, 25, 670, 400);

  stroke(255);
  strokeWeight(3);
  fill(55);
  rect(25, 570, 670, 120, 20);

  noStroke();
  textSize(24);
  fill(255);
  text("Collect 2 flowers to feed 1 sheep", 40, 605);
  text("Flower = 2Exp. Sheep = 10Exp", 40, 635);
  text("Aim: reach Lv20, avoid enemy and bones", 40, 665);
}

function mousePressed() {
  if (stage === 0) {
    userStartAudio();
    stage = 1;
    startTime = millis();
    playSound(sounds.save);
    return;
  }

  if (stage !== 1) return;

  if (
    mouseX - 10 < xas + 20 &&
    mouseX + 10 > xas - 20 &&
    mouseY + 10 > yas - 32 &&
    mouseY - 10 < yas + 32 &&
    flower >= 2
  ) {
    xto.push(xas);
    yto.push(yas);
    xas = random(54, 667);
    yas = random(81, 371);
    exp += 10;
    flower -= 2;
    playSound(sounds.heal);
  }

  for (let i = 0; i < xf.length; i += 1) {
    if (
      mouseX - 10 < xf[i] + 30 &&
      mouseX + 10 > xf[i] - 30 &&
      mouseY + 10 > yf[i] - 33 &&
      mouseY - 10 < yf[i] + 33
    ) {
      xfd.push(xf[i]);
      yfd.push(yf[i]);
      exp += 2;
      flower = min(8, flower + 1);
      xf[i] = random(58, 664);
      yf[i] = random(61, 390);
      playSound(sounds.hurt);
    }
  }
}

function keyPressed() {
  if (stage === 0) {
    userStartAudio();
    doggyTime = startTime;
    playSound(sounds.dog);
    return;
  }

  if ((key === "r" || key === "R") && (hp <= 0 || lv >= 20 || test === true)) {
    resetGameState();
    return;
  }

  if (key === "l" && test === true) {
    lv = 20;
  }

  if (key === "h" && test === true) {
    hp = 0;
  }
}

function playSound(snd) {
  if (!snd) return;
  snd.stop();
  snd.play();
}
