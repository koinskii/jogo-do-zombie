class Bullet {
    constructor(x,y,w,h){

        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.speed = 0.05
        this.image = loadImage("./assets/bullet1.png")

        this.body = Bodies.rectangle(this.x,this.y,this.w,this.h)
        World.add(world, this.body)
    }
    
    display(){
        image(this.image,this.body.position.x,this.body.position.y,this.w,this.h)
    }

    shoot(){
        Matter.Body.setVelocity(this.body,{x:8,y:0.00})
    }
    removeBullet(i){
    Matter.Body.setVelocity(this.body,{x:0 , y:0})

    setTimeout(() => {
        World.remove(world,bullet[i].body)
        bullet.splice(index,1)
    }, 1000);
}
}