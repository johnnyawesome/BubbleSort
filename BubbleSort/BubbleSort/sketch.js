/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

//Sort operations per second
let opsPerSec = 10;
//The number of bars
let numOfBars = 310;
//Width of one bar
let xBar = 1;
//Offset between bars
const xOff = 1;
const offset = xBar + xOff;
//Array hat holds all bars
let bars = [];
//UI elements
let button;
let opsPerSecSlider;

function setup() {

  createCanvas(650, 450, P2D);
  stroke(0, 255, 0);
  fill(0, 255, 0);
  generateBars();

  button = createButton('Randomize');
  button.position(10, 10);
  button.mousePressed(resetArray);
  button.style("font-size", "28px", "color", "gray");
  button.style("background", "rgb(50, 50, 50)");
  button.style("color", "rgb(0, 255, 0)");

  opsPerSecSlider = createSlider(1, 100, 10);
  opsPerSecSlider.position(10, 50);
  opsPerSecSlider.style('width', '150px');
}

function draw() {
  frameRate(opsPerSecSlider.value());
  background(0);
  translate(10, height * 0.9);

  //Sort bars
  for (let i = 0; i < numOfBars; i++) {
    sortBars(i);
  }

  //Draw bars
  for (let i = 0; i < bars.length; i++) {
    translate(offset, 0);
    rect(0, 0, xBar, -bars[i]);
  }
}

function generateBars() {
  while (bars.length < numOfBars) {
    let rand = Math.floor(Math.random() * numOfBars) + 1;
    if (bars.indexOf(rand) === -1) bars.push(rand);
  }
}

function sortBars(index) {
  let temp = bars[index - 1];
  if (bars[index] < bars[index - 1]) {
    bars[index - 1] = bars[index];
    bars[index] = temp;
  }
}

function resetArray() {
  for (let i = bars.length; i >= 0; i--) {
    bars.pop();
  }
  generateBars();
  for (let i = 0; i < numOfBars; i++) {
    sortBars(i);
  }
}