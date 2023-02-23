var tower, towerImg
var platform
var gameState = "play"
var worm
var coin
var score = 0






function preload(){
  towerImg = loadImage("tower.png")
  characterImg = loadImage("worm.png")
  coinImg = loadImage("coin.png")
}

function setup() {
    createCanvas(600, 600)

    tower = createSprite(300,300)
    tower.addImage("tower",towerImg)
    tower.velocityY = 1

    worm = createSprite(300,300)
        worm.addImage(characterImg)
        worm.scale = 0.2
        worm.depth +1

       

        platformGroup = new Group()
        coinGroup = new Group()

        gameState = "play"
}

function draw() {
    background(200)

    if(gameState === "play"){

      score = 0
    
      
     
      
        if(keyDown("left_arrow")){
            worm.x = worm.x -3
         }
  
      if(keyDown("right_arrow")){
         worm.x = worm.x +3
      }
  
      if(keyDown("space")){
         worm.velocityY = -10
      }
  
      worm.velocityY = worm.velocityY + 0.8
        
      if(tower.y > 400){
        tower.y = 300
      }
    
      spawnPlatforms()

      if(worm.isTouching(platformGroup)){
          worm.velocityY = 0     
          
      } 

      if(coinGroup.isTouching(worm)){
        coin.destroy()
        
        score = score +1

      }
      
      if(platformGroup.isTouching(worm)){
        worm.y = platform.y -40

      }
       
      
      
    }

    if(gameState === "end"){
      text("Game Over",400,400)
      textSize(100)
    }
    
 drawSprites()
 
}


function spawnPlatforms(){
    if(frameCount % 240 === 0){

     platform = createSprite(10,50,100,30)
     platform.x = Math.round(random(120,400))

     coin = createSprite(10,40,10,10)
     coin.addImage(coinImg)
     coin .scale = 0.01
     coin.depth = worm.depth

     coin.x = Math.round(platform.x)
     coin.x = platform.x 
     coin.y = platform.y -22

     platform.depth = worm.depth
     worm.depth = worm.depth + 1
     


      platform.velocityY = 1
      coin.velocityY = platform.velocityY
      coin.lifetime = 800
      platform.lifetime = 800
      platformGroup.add(platform)
      coinGroup.add(coin)
     }
}