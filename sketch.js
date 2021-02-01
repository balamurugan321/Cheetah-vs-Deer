var cheetah,cheetahrun,cheetahjump;
var deer,deerrun,deerjump;
var jumptime = true;
var invisibleground;
var jungle,jungleimg,vsimg,vs;
var arrow;
var rockimg,cageimg;
var deer,deerrun,deerjump;
var selectno;
var cg,rg;
var play=1,end=0,start=3;
var gamestate,playstate;
var play,home,replay,gameover;
var playimg,homeimg,replayimg,gameoverimg;
var start;
var icon,iconimg,icon2,icon2img;
var score,scorefont;
var speed;

function preload(){
 cheetahrun = loadAnimation("Cheetah1.png","cheetah3.png","cheetah4.png","cheetah5.png","cheetah6.png","cheetah7.png","cheetah8.png","cheetah9.png","cheetah10.png","cheetah11.png","cheetah12.png");
  
 cheetahjump = loadAnimation("cheetahjump/1.png","cheetahjump/2.png","cheetahjump/3.png","cheetahjump/3.png","cheetahjump/4.png","cheetahjump/5.png","cheetahjump/5.png","cheetahjump/6.png","cheetahjump/7.png","cheetahjump/7.png","cheetahjump/8.png","cheetahjump/9.png","cheetahjump/9.png");
  
deerrun = loadAnimation("deerrun/1.png","deerrun/2.png","deerrun/3.png","deerrun/4.png","deerrun/5.png","deerrun/6.png","deerrun/7.png","deerrun/8.png","deerrun/9.png");
  
  jungleimg = loadImage("jungle1.png");
  rockimg = loadImage("stone.png");
  cageimg = loadImage("cage.png");
  playimg = loadImage("play.png");
  replayimg = loadImage("button/replay.png");
  gameoverimg = loadImage("button/gameover.png");
  homeimg = loadImage("button/home.png");
  iconimg = loadImage("cheetahicon.png");
  icon2img = loadImage("icon2.png");
  scorefont = loadFont("scorefont.TTF");
  vsimg = loadImage("vs.jpg");
}

function setup() {
  createCanvas(windowWidth,jungleimg.height*2);
  
 jungle = createSprite(width,height/2);
  jungle.addImage(jungleimg);
  jungle.scale = 2;
  jungle.velocityX = 0;
  
  vs = image(vsimg,0,0,width,height);
  
  arrow = createSprite(mouseX,mouseY,10,10);
  arrow.visible = false;
  
  invisibleground = createSprite(width/2,height-100,width,5);
  invisibleground.visible = false;
  
  cheetah = createSprite(150,height-130);
  cheetah.addAnimation("running",cheetahrun);
  cheetah.addAnimation("jumping",cheetahjump);
  cheetah.frameDelay = 2;
  cheetah.scale = 1.8;
  cheetah.setCollider("rectangle",15,0,90,50);
  cheetah.visible = false;
  
  deer = createSprite(width-150,height-130);
  deer.addAnimation("running",deerrun);
  deer.frameDelay = 2;
  deer.scale = 2;
  deer.setCollider("rectangle",25,0,110,60);
  deer.visible = false;
  
  gameover = createSprite(width/2,height/2 - 100);
  gameover.addImage(gameoverimg);
  gameover.scale = 2;
  gameover.visible = false;
  
  home = createSprite(40,30);
  home.addImage(homeimg);
  home.scale = 1.5;
  home.setCollider("circle",2,2,18);
  home.visible = true;
  
  replay = createSprite(width/2,height/2 + 60);
  replay.addImage(replayimg);
  replay.scale = 3;
  replay.setCollider("circle",0,1,18.5)
  replay.visible = false;
  
  start = createSprite(width/2,height/2);
  start.addImage(playimg);
  start.scale = 0.8;
  start.setCollider("circle",0,0,70);
  
  icon = createSprite(width/2 - (width/2)/2,height/2);
  icon.addImage(iconimg);
  icon.scale = 0.7;
  
  icon2 = createSprite(width/2 + (width/2)/2,height/2 - 40);
  icon2.addImage(icon2img);
  icon2.scale = 1;
  
  cg = new Group();
  rg = new Group();
  
  score = 0;
  speed = 0;
  
  gamestate = start;
  playstate = true;
}

function draw() {
  arrow.x = mouseX;
  arrow.y = mouseY;
  if(gamestate === start){
    image(vsimg,0,0,width,height);
    home.visible = false;
  }else{
    jungle.visible = true;
    home.visible = true;
  }
  console.log("x = "+mouseX+" , y = "+mouseY);
  if(gamestate === start){
    start.visible = true;
    jungle.visible = false;
    gameover.visible = false;
    cheetah.visible = false;
    deer.visible = false;
    icon.visible = true;
    icon2.visible = true;
    replay.visible = false;
    jungle.velocityX = 0;
    speed = 0;
    
    if(arrow.isTouching(start) && mouseIsPressed){
     gamestate = play;
      score = 0;
      speed = -10;
      jungle.velocityX = -10;
    }
  }
  if(arrow.isTouching(home) && mouseIsPressed){
    gamestate = start;
    cheetah.y = height - 130;
    deer.y = height - 130;
    cg.destroyEach();
    rg.destroyEach();
  }
  
  //add gravity
  cheetah.velocityY = cheetah.velocityY + 0.8;
  deer.velocityY = deer.velocityY + 0.8;
  console.log("gamestate = "+gamestate)
  deer.collide(invisibleground)
  cheetah.collide(invisibleground);

  if (jungle.x < -width/8){
    jungle.x = width;
  }
  
  if(gamestate === play){
    gameover.visible = false;
    deer.visible = true;
    cheetah.visible = true;
    icon.visible = false;
    icon2.visible = false;
    start.visible = false;
    replay.visible = false;
      
  if(frameCount % 100 == 0){
  selectno = Math.round(random(1,2));
  if(selectno == 1){
    rock();
  }
  if(selectno == 2){
   cage();
  }
  }
    if(frameCount % 10 == 0){
      jungle.velocityX -= 0.2;
      speed -= 0.2;
      rg.setVelocityXEach(speed);
      cg.setVelocityXEach(speed);
      score = score + 1;
    }
    
  if(keyDown("space") && cheetah.y > height-150 && jumptime === true){
    jumptime = false;
    cheetah.changeAnimation("jumping",cheetahjump);
    cheetah.frameDelay = 4;
    cheetah.velocityY = -20;
    setTimeout(run,1300);
  }
  if(deer.isTouching(cg) || deer.isTouching(rg)){
    deer.velocityY = -12
  }
    if(cheetah.isTouching(cg)){
      gamestate = end;
      jungle.velocityX = 0;
      cheetah.visible = false
      cg.destroyEach();
      rg.destroyEach();
    }
    if(cheetah.isTouching(rg)){
      gamestate = end;
      jungle.velocityX = 0;
      cheetah.visible = false
      rg.destroyEach();
      cg.destroyEach();
    }
  console.log("selectno = "+selectno);
  
    
}
  if(gamestate === end){
    replay.visible = true;
    gameover.visible = true;
    deer.visible = false;
    if(arrow.isTouching(replay) && mouseIsPressed){
      gamestate = play;
      cheetah.y = height - 130;
      deer.y = height - 130;
      score = 0;
      jungle.velocityX = -10;
      speed = -10;
    }
  }
  drawSprites();
  if(gamestate == play || gamestate == end){
  textSize(40);
  fill("black");
  textFont(scorefont)
  text(score+" m",width-300,30);
  }
}
function run(){
  cheetah.changeAnimation("running",cheetahrun);
  cheetah.frameDelay = 2;
  jumptime = true;
}
function cage(){
  var cage = createSprite(width+20,310);
  cage.addImage(cageimg);
  cage.scale = 0.43;
  cage.setCollider("rectangle",0,0,250,380);
  cage.velocityX = jungle.velocityX;
  cage.lifetime = 500;
  cg.add(cage)
}
function rock(){
  var rock = createSprite(width+20,345);
  rock.addImage(rockimg);
  rock.scale = 0.4;
  rock.setCollider("rectangle",0,0,450,200);
  rock.velocityX = jungle.velocityX;
  rock.lifetime = 500;
  rg.add(rock);
}