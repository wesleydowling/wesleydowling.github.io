let ps;


let x = 0;
let y = 0;
let skip = 10; //48 iphone
let factor = 1.0;
let aspect = 9 / 16;

var img;
var first_frame = true;
var go = true;
var counter = 0;

var reset = false;

var cnv;

var LFO = false;

var isMobile = false; //initiate as false

var isAndroid = false;

var intersect_toggle = false;

var eraser_size = 20;

var main_animation = false;

var loading_cap;

var pg;

var alpha_load = 0;

var loading_alpha = 100;

var trigger = false;

var counter = 0;

var ellipse_mouseX, ellipse_mouseY;

var fullscreen_button;

var pixelShaderToggle = false;
var instruction_toggle = false;

var instructionpg;

var text_dict, link, text1, text2, text3;
var cambuttonX, cambuttonY;

let maskpg;

let mask_backgroundcol = 0;

let mouseIsMoving = false;

let loadmask = false;
let loadvptmask = false;
let hideicon = false;

let maskimg;
let maskimg2;
let maskvptimg;

let strokew;
let inc;

function centerCanvas() {
  var cnv_x = (windowWidth - width) / 2;
  var cnv_y = (windowHeight - height) / 2;
  cnv.position(cnv_x, cnv_y);
}

p5.disableFriendlyErrors = true; // disables FES

function preload() {
  maskvptimg = loadImage("mask.png");


  // device detection
  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
  }

  if (/android/i.test(navigator.userAgent)) {
    isAndroid = true;
  }
}

function setup() {

  if (isMobile == false) {
    skip = 200; //50; //30 if not running facedetection
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.id('mycanvas');
    cnv.style('display', 'block');
    FScreen.style.display = "block";
    inc = 1.5;

  } else {

inc = 0;
    skip = 200;
    if (windowWidth < windowHeight) {
      inner = iosInnerHeight();
      cnv = createCanvas(windowWidth, inner);
      cnv.id('mycanvas');
      cnv.style('display', 'block');
      console.log("portrait")
    } else {
      cnv = createCanvas(windowWidth, windowHeight);
      cnv.id('mycanvas');
      cnv.style('display', 'block');
      console.log("landscape")
    }
  }

  pixelDensity(1);

  buttonSetup();

  img = createImage(width, height);
  instructionpg = createGraphics(width, height);

  let mouse = createVector();

  maskpg = createGraphics(windowWidth, windowHeight);
  masker();

  captureEvent();
  firebasesetup();
  buttonText();
}

function ready() {
  go = true;
}

function pgMask(_mask) {
  //Create the mask as image
  var img = createImage(_mask.width, _mask.height);
  img.copy(_mask, 0, 0, _mask.width, _mask.height, 0, 0, _mask.width, _mask.height);
  //load pixels
  img.loadPixels();
  for (var i = 0; i < img.pixels.length; i += 4) {
    // 0 red, 1 green, 2 blue, 3 alpha
    // Assuming that the mask image is in grayscale,
    // the red channel is used for the alpha mask.
    // the color is set to black (rgb => 0) and the
    // alpha is set according to the pixel brightness.
    var v = img.pixels[i];
    img.pixels[i] = mask_backgroundcol;
    img.pixels[i + 1] = mask_backgroundcol;
    img.pixels[i + 2] = mask_backgroundcol;
    img.pixels[i + 3] = 255 - v;
  }
  img.updatePixels();
  return img;
}

function captureEvent() {
  ps = new ParticleSystem(createVector(width / 2, height / 2), img);
}

function masker() {
  maskpg.background(0);
  maskpg.noStroke();
  maskpg.fill(255);
  maskpg.rectMode(CENTER);
  maskpg.rect(width / 2, height / 2, width, height / 2);
}

function draw() {

  particle_draw();

  if (mouseIsMoving == true) {
    cursor();
  } else {
    noCursor();
  }
}

function particle_draw() {

  blendMode(BLEND);
  background(1, 89, 189); //23, 73, 219//consider black bg

  strokew = (width*(0.33))/100 + inc;

  ps.run();


  if (pixelShaderToggle || instruction_toggle) {
    ps.return_home();
  }

  if (pixelShaderToggle) {
    ps.return_home();
  }

  if (loadmask) {
    image(maskimg, 0, 0);
  }

  if (loadvptmask) {
    image(maskimg2, 0, 0,width,height);
  }
}

function keyPressed(){

  if (key == 'H' || key == 'h' ){

    hideicon = !hideicon;

    if (hideicon) {
    icons.style.display = "none";

  }else{
    icons.style.display = "block";
  }

  }


if (key == 'u'){
inc = inc + 1;
console.log(strokew);
}

if (key == 'd'){
inc = inc - 1;
}



if (key == 'M' || key == 'm' ){
    loadmask = !loadmask;
}
  if (loadmask) {
    maskimg = pgMask(maskpg);
}

if (key == 'V' || key == 'v' ){
    loadvptmask = !loadvptmask;
  //  console.log(loadvptmask);
}
  if (loadvptmask) {
    maskimg2 = pgMask(maskvptimg);
}


}

function mousePressed() {
  shaderMousePressed();
}

function mouseMoved() {
  mouseIsMoving = true;

  setTimeout(function() { // this is to delay the execution of the code within, this is pure javaScript
    mouseIsMoving = false;
  }, 3000) //it takes a time in MS

}

function windowResized() {

  if (!isMobile) {
    resizeCanvas(windowWidth, windowHeight);
    maskpg.resizeCanvas(windowWidth, windowHeight);
    masker();
  } else {
    let innerh = iosInnerHeight();
    resizeCanvas(windowWidth, innerh);
    maskpg.resizeCanvas(windowWidth, innerh);
    masker();
  }

}

function infoInstructions() {

  instruction_toggle = !instruction_toggle;
  var x = document.getElementById("myLinks");
  icons.classList.toggle("fa-window-close");
  myLinks.style.display = "block";
  myInfo.style.display = "block";
  //  myInfo.style.overflowY = "scroll";
  myInfo.style.background = "rgba(255, 255, 255, 0.9)";


  if (instruction_toggle) {
    myInfo.style.display = "block";
    myInfo.style.background = "rgba(255, 255, 255, 0.9)";
    //  myInfo.style.overflowY = "scroll";
  } else {
    myInfo.style.display = "none";
    myInfo.style.background = "none";
    myLinks.style.display = "none";
    //  myInfo.style.overflowY = "hidden";
    ps.get_moving();
  }


}

function fullScreenMenu() {
  let fs = fullscreen();
  fullscreen(!fs);
  document.body.scrollTop = 0; // <-- pull the page back up to the top
  document.body.style.overflow = 'hidden';
}
