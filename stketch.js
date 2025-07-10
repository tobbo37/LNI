let mic, fft;
let patronActual = 1;
let patronAnterior = 1;
let transicion = 1;
let transitionSpeed = 0.05;

function setup() {
  createCanvas(500, 500);
  noFill();
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0);
  strokeWeight(1);
  fft.analyze();
  let voiceEnergy = fft.getEnergy(80, 3000);

  let patronAMostrar;
  if (voiceEnergy < 40) {
    patronAMostrar = 1;
  } else if (voiceEnergy < 60) {
    patronAMostrar = 2;
  } else if (voiceEnergy < 90) {
    patronAMostrar = 3;
  } else {
    patronAMostrar = 4;
  }

  if (patronAMostrar !== patronActual) {
    patronAnterior = patronActual;
    patronActual = patronAMostrar;
    transicion = 0;
  }

  if (transicion < 1) {
    push();
    stroke(255, 255 * (1 - transicion));
    dibujarPatron(patronAnterior);
    pop();

    push();
    stroke(255, 255 * transicion);
    dibujarPatron(patronActual);
    pop();

    transicion += transitionSpeed;
  } else {
    stroke(255);
    dibujarPatron(patronActual);
  }
}

function dibujarPatron(n) {
  if (n === 1) patron1();
  else if (n === 2) patron2();
  else if (n === 3) patron3();
  else if (n === 4) patron4();
}

function patron1() {
  let step = 20;
  rectMode(CENTER);
  for (let i = step; i < width / 2; i += step) {
    rect(width / 2, height / 2, i * 2, i * 2);
  }
}

function patron2() {
  let centerX = width / 2;
  let centerY = height / 2;
  let spacing = 30;
  let maxSize = 750;

  for (let i = 0; i < maxSize / spacing; i++) {
    let d = i * spacing;
    beginShape();
    vertex(centerX, centerY - d);
    vertex(centerX + d, centerY);
    vertex(centerX, centerY + d);
    vertex(centerX - d, centerY);
    endShape(CLOSE);
  }
}

function patron3() {
  let steps = 20;
  for (let i = 0; i <= 250; i += steps) {
    line(i, 0, 250, 250 - i);
    line(0, i, 250 - i, 250);
    line(250, 250 - i, 500 - i, 0);
    line(250 + i, 250, 500, i);
    line(250 - i, 250, 0, 500 - i);
    line(i, 500, 250, 250 + i);
    line(500, 500 - i, 250 + i, 250);
    line(500 - i, 500, 250, 250 + i);
  }
}

function patron4() {
  let steps = 20;
  for (let i = 0; i <= 250; i += steps) {
    line(0, i, i, i);
    line(i, i, i, 0);
    line(width, i, width - i, i);
    line(260 + i, 0, 260 + i, 240 - i);
    line(i, height - i, i, height);
    line(0, 260 + i, 240 - i, 260 + i);
    line(width, height - i, width - i, height - i);
    line(260 + i, 260 + i, 260 + i, 500);
  }
}