class Zombie{
    constructor(x,y,w,h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.image = loadImage("./assets/zombie.png")

        this.body = Bodies.rectangle(this.x,this.y,this.w,this.h,{isStatic: true})
        World.add(world,this.body)
    }
    
    display(){
        imageMode(CENTER)
        image(this.image,this.body.position.x,this.body.position.y,this.w,this.h)
        
    }

    removeZombies(index){
        setTimeout(() => {
            World.remove(world,zombies[index].body)
            zombies.splice(index,1)
            
        }, 20);
    }
}