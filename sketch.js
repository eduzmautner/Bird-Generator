/*
  ____  _         _             _               _  _    ___   ___   ___  
 |  _ \(_)       | |           | |             | || |  / _ \ / _ \ / _ \ 
 | |_) |_ _ __ __| |_ __   __ _| |_ ___  _ __  | || |_| | | | | | | | | |
 |  _ <| | '__/ _` | '_ \ / _` | __/ _ \| '__| |__   _| | | | | | | | | |
 | |_) | | | | (_| | | | | (_| | || (_) | |       | | | |_| | |_| | |_| |
 |____/|_|_|  \__,_|_| |_|\__,_|\__\___/|_|       |_|  \___/ \___/ \___/ 


                                            By Eduardo Zanforlin Mautner
  
  Personal website:
  www.eduardozmautner.com

*/
let widthBody, lengthBody, heightBody;
let legHeight;
let beakLength;
let feetSize;
let eyeBrows;
let colorPicker;
let buttonSave;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  angleMode(DEGREES);

  colorPicker = createColorPicker('#FFDE11');
  colorPicker.position(50, height/2 - 120);
  colorPicker.style('height','40px');
  colorPicker.style('width','40px');
  colorPicker.style('background-color','#f5f5f5');
  colorPicker.style('cursor','pointer');
  
  widthBody = createSlider(20,80,0);
  widthBody.position(50,height/2 + 30);
  widthBody.style('width','120px');
  widthBody.addClass("mySliders");
  
  lengthBody = createSlider(10,80,0);
  lengthBody.position(50,height/2);
  lengthBody.style('width','120px');
  lengthBody.addClass("mySliders")
  
  heightBody = createSlider(10,60,0);
  heightBody.position(50,height/2 + 60);
  heightBody.style('width','120px');
  heightBody.addClass("mySliders")
  
  legHeight = createSlider(10,29,0,0.5);
  legHeight.position(50,height/2 + 90);
  legHeight.style('width','120px');
  legHeight.addClass("mySliders")

  feetSize = createSlider(0,4,0,0.1);
  feetSize.position(50,height/2 + 120);
  feetSize.style('width','120px');
  feetSize.addClass("mySliders")
  
  beakLength = createSlider(9,25,1);
  beakLength.position(50,height/2 - 30)
  beakLength.style('width','120px');
  beakLength.addClass("mySliders")

  eyeBrows = createSlider(-10,30,-10,1);
  eyeBrows.position(50,height/2 + 150)
  eyeBrows.style('width','120px');
  eyeBrows.addClass("mySliders")

  buttonSave = createButton('SAVE');
  buttonSave.mouseOver(hoverIn);
  buttonSave.mouseOut(hoverOut);
  buttonSave.mousePressed(screenShot);
  buttonSave.style('background-color', '#f5f5f5')

  //camera(lengthBody.value()/3 + mouseX/18 + 70,-heightBody.value()/3 + mouseY/16 - 60,-mouseX/18+70,0,0,0);//oficial camera w Mouse control
  camera(100,-40,80,0,0,0);//oficial camera w/o Mouse control
}

function draw() {
  let dx = mouseX - width/2;
  let dy = mouseY - height/2;
      
  ambientLight('#ffffff');
  directionalLight(100,100,100,1,1,0)

  //directionalLight(255, 222, 17,dx,dy,0)
  
  //background('#111111');
  background('#f0f0f0');
  
  //DETERMINE CAMERA POSITION:
  //camera(-70,-5,0,0,0,0);//side view
  //camera(0,-5,90,0,0,0);//front view
  //camera(110,40,70);//underneath view
  //camera(1,-120,0);//top view
  //camera(110,-40,70,0,0,0);//oficial camera

  orbitControl(2,2.5,0.01);
  
  buttonSave.position(windowWidth/1.25, windowHeight/2);
  buttonSave.style('font-family','Manrope')
  buttonSave.style('cursor','pointer')

  //body
  noStroke();
  strokeWeight(0.3);
  ambientMaterial(colorPicker.color());
  box(widthBody.value(),heightBody.value(),lengthBody.value());
  //__________________________________________________________
  
  //legs + feet:
  //legs
  push();
  translate(widthBody.value()/2 - 2,heightBody.value()/2+5.1,0)
  stroke('#E36E20')
  cylinder(0.5,legHeight.value());
  pop();
  push();
    translate(-widthBody.value()/2 + 2,heightBody.value()/2+5.1,0)
    stroke('#E36E20')
    cylinder(0.5,legHeight.value());
  pop();
  //feet
  push();
  translate(0,heightBody.value()/2 + legHeight.value()/2,0);//controls both feet's height
    push();
    translate(-widthBody.value()/2 + 10,0,0);
    ambientMaterial('#E36E20');
      beginShape();//right foot
        vertex(-8,5.1,-0.5)//ankle -> left toe
        vertex(-4 + feetSize.value(),5.1,10 + feetSize.value()*1.75)//left toe -> right toe
        vertex(-12 - feetSize.value(),5.1,10 + feetSize.value()*1.75)//right toe -> ankle
      endShape(CLOSE);
    pop();
    push();
      beginShape();//left foot
      translate(widthBody.value()/2 - 10,0,0);
      ambientMaterial('#E36E20');
        vertex(8,5.1,-0.5)//ankle->left toe
        vertex(12 + feetSize.value(),5.1,10 + feetSize.value()*1.75)//left toe -> right toe
        vertex(4 - feetSize.value(),5.1,10 + feetSize.value()*1.75)//right toe->ankle
      endShape(CLOSE);
    pop();
  pop();
  
  //__________________________________________________________
  
  //eyes:
  push();
    translate(8,-heightBody.value() / 2 - 14,lengthBody.value()/2);
    ambientMaterial(255)
    noStroke();
    ellipsoid(4,4,4,2);
    translate(0.01,0,0)
    ambientMaterial(0);
    ellipsoid(3,3,3,2);
  pop();
  push();
    translate(-8,-heightBody.value() / 2 - 14,lengthBody.value()/2);
    ambientMaterial(255)
    noStroke();
    ellipsoid(4,4,4,2);
    translate(-0.01,0,0)
    ambientMaterial(0);
    ellipsoid(3,3,3,2);
  pop();
  //__________________________________________________________
  
  //head:
  ambientMaterial(20,20,20);
  push();
    translate(0,-heightBody.value() / 2 - 13,lengthBody.value()/2);
    rotateX(-8);
    noStroke();
    ambientMaterial(colorPicker.color());
    sphere(8,10,4);
  pop();
  //__________________________________________________________

  //eyebrows:
  push();
  translate(8,-heightBody.value() / 2 - 18,lengthBody.value()/2);
  //rotateZ(40);
  rotateX(-eyeBrows.value() + 90);
  cylinder(0.5,6,7,2);
  pop();
  push();
  translate(-8,-heightBody.value() / 2 - 18,lengthBody.value()/2);
  //rotateZ(-40);
  rotateX(-eyeBrows.value() + 90);
  cylinder(0.5,6,7,2);
  pop();
  //__________________________________________________________

  
  //beak:
  push();
    translate(0,-heightBody.value() / 2 -11,lengthBody.value()/2 + 8);
    rotateX(80);
    //fill('#FFA314')
    noStroke();
    ambientMaterial('#FFA314');
    cone(5.7,beakLength.value(),8,0,0);
  pop();
  //__________________________________________________________
  
  //tail:
  push();
    ambientMaterial(colorPicker.color());
    translate(0,heightBody.value()/2 + 0,-lengthBody.value()/2 - 3);
    rotateX(20);
    box(widthBody.value() - 2,1,8);
  pop();
  //__________________________________________________________
  
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function hoverIn(){
  buttonSave.style('background-color','#000000')
  buttonSave.style('color','#f5f5f5')
}

function hoverOut(){
  buttonSave.style('background-color','#f5f5f5')
  buttonSave.style('color','#000000')
}

function screenShot(){
  save('my-bird.png')
}

