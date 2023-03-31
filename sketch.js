const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body

let engine, world;

var bg,bgImg;
var player, shooterImg, shooter_shooting;

var zombies = []
var bullet
var bullets = []
var ground
var score = 0


function preload(){
  
  shooterImg = loadImage("./assets/shooter_2.png")
  shooter_shooting = loadImage("./assets/shooter_3.png")
  

  bgImg = loadImage("./assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;

  ground= Bodies.rectangle(0,height-90,width*2,5,{isStatic:true})
  World.add(world,ground)


  //adicionando a imagem de fundo
  // bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  // bg.addImage(bgImg)
  // bg.scale = 1.1
  

//criando o sprite do jogador
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
 
  player.debug = true
  //player.debug = false
  //player.Debug =false
  //Player.debug = true

  //player.Collider("rectagle",0,0,300,300)
  //player.setcollider("rectangle",0,0)
  player.setCollider("rectangle",0,0,200,430)
  //player.Setcollider("rectangle",0,0,300,300)

  //criando zumbi

  
  
  
}

function draw() {
  background(bgImg); 
  Engine.update(engine)

 showZombies()



  // console.log(zombie)
  fill("#00000");
  textSize(40);
  text(`Pontuação: ${score}`, width - 500, 50);
  textAlign(CENTER, CENTER);
  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando touches (toques)
  if(keyDown("W")||touches.length>0){
    player.y = player.y-20
  }

  if(keyDown("S")||touches.length>0){
  player.y = player.y+20
  }


//libere as balas e mude a imagem do personagem para a posição de tiro quando a tecla espaço for pressionada
  if(keyWentDown("space")){
    
    player.addImage(shooter_shooting)
    var bullet = new Bullet(player.x,player.y - 30,50,50)
    bullets.push(bullet)
    
  }

//player goes back to original standing image once we stop pressing the space bar
  else if(keyDown("space")){
  //player.addImage( shooter_shooting )
  //player.addImage()
  player.addImage(shooterImg)
  //player.addImage(shooter_1.png)
  }

  

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].display()
    bullets[i].shoot()
    
    
  }

  collisionWithZombies()
drawSprites();

}

function showZombies() {
    
  

  if (zombies.length > 0 ) {
    if (zombies.length <8 && zombies[zombies.length-1].body.position.x <width - 150) {
      var positions = [410, 580, 200, 280, 550 ]
      var position = random(positions)
      var zombie = new Zombie(width - 10,position,100,100)
      zombies.push(zombie)
    }
    
    for (let index = 0; index < zombies.length; index++) {
      Body.setStatic(zombies[index].body, false)
      Body.setVelocity(zombies [index].body, {x: -0.9, y:0});
      zombies[index].display()
      
    }
    
  }else { 
    var zombie = new Zombie(width-10,564,100,100)
    zombies.push(zombie)
  }
}

function collisionWithZombies() {
  for (let i = 0; i < bullets.length; i++) {
    for (let index = 0; index < zombies.length; index++) {
      
      if (bullets[i] !== undefined && zombies[index] !== undefined) {
        var collision = Matter.SAT.collides(bullets[i].body, zombies[index].body)
  
        if (collision.collided) {
          Matter.World.remove(world,bullets[i].body)
          bullets.splice(i,1)
          zombies[index].removeZombies(index)
          score += 5
          
          
        }
      }
      
    }
    
    
  }
}
