let pixelShader;
let cam;
let pixelpg;
let radius, colour;

function shaderMousePressed() {

if  (mouseY > 100 && mouseY < height && !instruction_toggle ) {

  colour = 0;//cam.get(width - mouseX, mouseY);

let velx = random(-5, 5);
let vely = random(-5, 5);
let col_rand = random(0, 100);

  var data = {
    mouseX_loc: mouseX,
    mouseY_loc: mouseY,
    colour_loc: col_rand,
    deviceWidth: windowWidth,
    deviceHeight: windowHeight,
    velocity_x: velx,
    velocity_y:vely
  }

  var test = database.ref('test');

  test.push(data);
  console.log(data);
}
}

function shaderWindowResized() {
  //resizeCanvas(windowWidth, windowHeight);
  pixelpg.resizeCanvas(windowWidth, windowHeight);
}
