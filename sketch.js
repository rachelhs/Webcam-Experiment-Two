var capture;
var outline;

function setup() {

  createCanvas(360, 360);
  capture = createCapture(VIDEO);
  capture.hide();
  capture.size(640, 360);
  outline = createGraphics(360, 360, RGB);

}

function draw() {

  background(255);

  push();
  translate(capture.width, 0);
  scale(-1, 1);
  image(capture, 0, 0);
  filter('THRESHOLD');
  pop();
  findEdge();

}

function findEdge() {

  loadPixels();

  for (var y = 1; y < height - 1; y++) {
    for (var x = 1; x < width - 1; x++) {
      var loc = (x + y * width) * 4;
      var left = loc - 4;
      var lo = pixels[loc];
      var l = pixels[left];
      if (abs(lo - l) > 100) {
        outline.ellipse(x, y, 20, 20);
      }
    }
  }
  image(outline, 0, 0);
}
