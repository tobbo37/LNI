let mic, fft;
let patronActual = 1;
let patronAnterior = 1;
let transicion = 1;
let transitionSpeed = 0.05;

let cantidadGraves = 1.0;
let cantidadAgudos = 1.0;

function setup() {
  createCanvas(500, 500);
  noFill();
  userStartAudio(); // Necesario para habilitar el micrófono en navegador

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}


function draw() {
  background(0);
  strokeWeight(1);
  fft.analyze();

  let bassEnergy = fft.getEnergy(20, 250); // Graves
  let trebleEnergy = fft.getEnergy(4000, 10000); // Agudos
  let voiceEnergy = fft.getEnergy(80, 3000); // Voz general

  // Mapear energías para que más energía = menos elementos
  let objetivoGraves = map(bassEnergy, 0, 255, 1, 0);
  let objetivoAgudos = map(trebleEnergy, 0, 255, 1, 0);

  // Transición suave en cantidad de líneas
  cantidadGraves = lerp(cantidadGraves, objetivoGraves, 0.05);
  cantidadAgudos = lerp(cantidadAgudos, objetivoAgudos, 0.05);

  // Selección del patrón según energía vocal
  let patronAMostrar;
  if (voiceEnergy < 60) {
    patronAMostrar = 1;
  } else if (voiceEnergy < 115) {
    patronAMostrar = 2;
  } else if (voiceEnergy < 130) {
    patronAMostrar = 3;
  } else {
    patronAMostrar = 4;
  }

  // Cambiar patrón con transición
  if (patronAMostrar !== patronActual) {
    patronAnterior = patronActual;
    patronActual = patronAMostrar;
    transicion = 0;
  }

  // Dibujar con transición entre patrones
  if (transicion < 1) {
    push();
    stroke(255, 255 * (1 - transicion));
    dibujarPatron(patronAnterior, cantidadGraves, cantidadAgudos);
    pop();

    push();
    stroke(255, 255 * transicion);
    dibujarPatron(patronActual, cantidadGraves, cantidadAgudos);
    pop();

    transicion += transitionSpeed;
  } else {
    stroke(255);
    dibujarPatron(patronActual, cantidadGraves, cantidadAgudos);
  }
}

function dibujarPatron(n, graves, agudos) {
  if (n === 1) patron1(graves);
  else if (n === 2) patron2(agudos);
  else if (n === 3) patron3(graves);
  else if (n === 4) patron4(agudos);
}

// Menos cuadrados si hay más graves
function patron1(factor) {
  let step = map(factor, 0, 1, 40, 10);
  rectMode(CENTER);
  for (let i = step; i < width / 2; i += step) {
    rect(width / 2, height / 2, i * 2, i * 2);
  }
}

// Menos rombos si hay más agudos
function patron2(factor) {
  let centerX = width / 2;
  let centerY = height / 2;
  let spacing = map(factor, 0, 1, 60, 10);
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

// Menos líneas con más graves
function patron3(factor) {
  let steps = map(factor, 0, 1, 50, 10);
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

// Menos líneas con más agudos
function patron4(factor) {
  let steps = map(factor, 0, 1, 50, 10);
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