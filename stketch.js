let step = 20;
let offset = 0;
let speed = 0;
let weight = 2;
let angle = 0;
let diagAngle = 0;
let showRombos = false;

let mic, fft;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  noFill();
  stroke(230);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(20, 80);
  translate(width / 2, height / 2);

  fft.analyze();

  // Tomamos energía total (voz humana: 80 a 3000 Hz aprox)
  let voiceEnergy = fft.getEnergy(80, 3000);

  // Activar visual si se habla
  if (voiceEnergy > 50) {
    speed = map(voiceEnergy, 50, 200, 1, 8);
    showRombos = true;
  } else {
    speed = max(speed - 0.3, 0);
    if (speed === 0) {
      showRombos = false;
      angle = 0;
      diagAngle = 0;
    }
  }

  // Control del grosor con el mismo volumen
  weight = map(voiceEnergy, 0, 200, 1, 10);
  weight = constrain(weight, 1, 10);

  offset += speed;
  if (offset > step) offset = 0;

  if (showRombos) {
    rotate(angle);
    angle += speed * 0.5;
    drawRombos();

    push();
    rotate(-diagAngle);
    drawFullDiagonalChaos();
    pop();

    diagAngle += speed * 0.8;
  } else {
    drawRectPattern();
    drawQuadrants();
  }
}

function drawRombos() {
  stroke(255);
  strokeWeight(weight);
  for (let i = 0; i < min(width, height) / 2; i += step) {
    beginShape();
    vertex(0, -i + offset);
    vertex(i - offset, 0);
    vertex(0, i - offset);
    vertex(-i + offset, 0);
    endShape(CLOSE);
  }
}

function drawFullDiagonalChaos() {
  stroke(150);
  strokeWeight(1.2);
  let gridSize = 80;
  for (let x = -width / 2; x < width / 2; x += gridSize) {
    for (let y = -height / 2; y < height / 2; y += gridSize) {
      let osc = sin(frameCount * 5 + (x + y) * 0.05) * 25;
      line(x, y + osc, x + gridSize, y + gridSize - osc);
      line(x + gridSize, y + osc, x, y + gridSize - osc);
    }
  }
}

function drawRectPattern() {
  stroke(230);
  strokeWeight(weight);
  for (let i = 0; i < min(width, height) / 2; i += step) {
    rect(0, 0, width - 2 * i + 2 * offset, height - 2 * i + 2 * offset);
  }
}

function drawQuadrants() {
  stroke(255, 80);
  strokeWeight(1);
  line(-width / 2, 0, width / 2, 0);
  line(0, -height / 2, 0, height / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
