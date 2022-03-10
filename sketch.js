var boy,boyimg
var ground,groundimg
var zombie,zombieimg

//made changes here, first make state variable then assign it to gameState variable..
var PLAY=1
var end=0
var gameState=PLAY

var invground,rock,rockimg
var score=0;

function preload(){
 boyimg=loadImage("boy.png")
 groundimg=loadImage("ground2.png")
 zombieimg=loadImage("zombie.png")
 rockimg=loadImage("rock.png")
}

function setup(){
  createCanvas(700,300)
  
  boy=createSprite(80,220)
  boy.addImage("boy",boyimg)
  boy.scale=0.3

  ground=createSprite(300,250,700,10)
  ground.addImage("ground",groundimg)
  ground.x = ground.width/2;
 
  //creating the groups to check for collision...
  zombieGroup=new Group()
  rockGroup=new Group()

  invground=createSprite(300,295,700,10)
  invground.visible=false
}

function draw(){
  background(200)
  text("SCORE:",+score,600,100)

  if(gameState===PLAY){
   console.log("Play state")
    ground.velocityX=-(3+score/100)
    //ground.velocityX=-3
    score=score+Math.round(getFrameRate()/30)

    if(ground.x<0){
      ground.x=ground.width/2;
    }

    if(keyDown("space") && boy.y>180){
      boy.velocityY=-7
    }
    boy.velocityY=boy.velocityY+0.2

  
    if(score>0 && score%100==0 ){
        spawnrock()
    }

    //changed to group names
    if(boy.isTouching(zombieGroup) || boy.isTouching(rockGroup)){
      gameState=end

    }
    spawnzombie()
    boy.collide(invground)
  }

  else if(gameState===end){
    background("black")
    fill("yellow")
    stroke("silver")
    strokeWeight("10")
    textSize("30")

    text("GAME OVER",350,150)
    
  }
 drawSprites()
}

   function spawnzombie(){
      if(frameCount%250==0){
        zombie=createSprite(600,230)
        zombie.addImage("zombie",zombieimg)
        zombie.velocityX=-(3+score/100)
        zombie.scale=0.2
        zombie.lifetime=250
        zombieGroup.add(zombie)
      }

   }
  
   function spawnrock(){
     if(frameCount%100==0){
       rock=createSprite(650,Math.round(random(10,100)))
       rock.addImage("rock",rockimg)
       rock.velocityX=-(3+score/100)
       rock.scale=0.5
       rock.lifetime=40
       rockGroup.add(rock)
     }
   }



