const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_1;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var blow;
var mute_button;
var button_1, button_2;
var rope_1,rope_2;


function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
   if(isMobile){
    canW = displayWidth; 
    canH = displayHeight;
     createCanvas(displayWidth+80, displayHeight); 
    }
     else
      { canW = windowWidth;
       canH = windowHeight;
        createCanvas(windowWidth, windowHeight);
       }
// else part for laptops and if part for mobiles.

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.25);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,40);
  button.size(50,50);
  button.mouseClicked(drop);

  button_1 = createImg('cut_btn.png');
  button_1.position(40,30);
  button_1.size(50,50);
  button_1.mouseClicked(drop_1);

  button_2 = createImg('cut_btn.png');
  button_2.position(350,100);
  button_2.size(50,50);
  button_2.mouseClicked(drop_2);

  blow = createImg('balloon.png');
  blow.position(150,250);
  blow.size(50,50);
  blow.mouseClicked(airblow);

  mute_button = createImg('mute.png');
  mute_button.position(450,10);
  mute_button.size(50,50);
  mute_button.mouseClicked(muteSound);

  
  rope = new Rope(7,{x:245,y:30});

  rope_1 = new Rope(7,{x:60,y:30});

  rope_2 = new Rope(7,{x:370,y:100});

  ground = new Ground(200,690,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(230,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20,{density:0.0005});
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_1 = new Link(rope_1,fruit);
  fruit_con_2 = new Link(rope_2,fruit);



  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,canW,canH);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();

  rope_1.show();

  rope_2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
    eating_sound.setVolume(0.25);
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    fruit=null;
    sad_sound.play();
    sad_sound.setVolume(0.25);
     
   }
   
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
  cut_sound.play();
  cut_sound.setVolume(0.25);

}

function drop_1()
{
  rope_1.break();
  fruit_con_1.detach();
  fruit_con_1 = null; 
  cut_sound.play();
  cut_sound.setVolume(0.25);

}
function drop_2()
{
  rope_2.break();
  fruit_con_2.detach();
  fruit_con_2 = null; 
  cut_sound.play();
  cut_sound.setVolume(0.25);

}




function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airblow(){
  Matter.Body.applyForce(fruit, {x:0,y:0},{X:0.01,y:0});
  air.play();
}

function muteSound(){
  if(bk_song.isPlaying()){
    bk_song.stop();
  }
  else{
     bk_song.play();
  }
}