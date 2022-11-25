//file arrays
path = 'Assets/';
drawersFile = ["closed.png", "topopen.png", "middleopen.png", "bottomopen.png"];
txtsFile = ["maintext.png", "toptext.png", "middletext.png", "bottomtext.png"];
thingsFile = [
  ["1a.png", "1b.png", "1c.png", "1d.png", "1e.png", "1f.png", "1g.png"],
  ["2a.png", "2b.png", "2c.png", "2d.png"],
  ["3a.png", "3b.png", "3c.png", "3d.png", "3e.png"],
];

drawers = [];
txts = [];
things = [];

function preload() {
  closesound = loadSound(path + "closesound.wav");
  opensound = loadSound(path + "opensound.wav");

  //for each file in the array, based on index number, loadImage
  drawersFile.forEach(function (loc, index) {
    drawers[index] = loadImage(path + loc);
  });

  txtsFile.forEach(function (loc, index) {
    txts[index] = loadImage(path + loc);
  });

  thingsFile.forEach(function (d, i) {
    things[i + 1] = []; //closed state is 0, so things must start at 1
    d.forEach(function (t, j) {
      things[i + 1][j] = loadImage(path + t);
    });
  });
}

state = 0; //starting state closed
picks = 0; //starting empty drawer i.e. no picks

function setup() {
  createCanvas(600, 600);
}

//based on the state, draw certain sets of files
function draw() {
  image(drawers[state], 0, 0, 600, 600);

  image(txts[state], 0, 0, 600, 600);

  if (state != 0) {
    for (i = 0; i < picks; i++) {
      image(things[state][i], 0, 0, 600, 600);
    }
  }
}

//Randomize array in-place using Durstenfeld shuffle algorithm
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function mousePressed() {
  if (state == 0) {
    //choose random number 1-3, opening a drawer
    state = Math.floor(Math.random() * (drawers.length - 1)) + 1;
    
    //shuffle order of things
    shuffleArray(things[state]);
    
    //pick a random # of things to display
    picks = Math.floor(Math.random() * things[state].length) + 1;
    closesound.play();
  } else {
    state = 0;
    opensound.play();
  }
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
