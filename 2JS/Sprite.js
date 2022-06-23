class Sprite {
    constructor(config) {

        //set up the images//

        this.image = new Image();

        this.image.src = config.src;

        this.image.onload = () => {

            this.isLoaded = true;
        }

        //shadow

        this.shadow = new Image();
        this.useShadow = true; // config.useShadow || false
        if (this.useShadow) {

            //this.shadow.src = "C:/Users/gabri/Documents/Doomsday_Sword_of_Blood/imagens/sombrinha.png"
        }
        this.shadow.onload = () => {

            this.isShadowLoaded = true;
        }




        //configurando animação e estado inicial//

        this.animations = config.animations || {
            "idle-down": [ [0, 0]],
            "idle-right":[ [0,1]],
            "idle-up":[ [0,2]],
            "idle-left":[ [0,3]],
            "walk-down": [ [1,0], [0,0], [3,0], [0,0]],
            "walk-right": [ [1,1], [0,1], [3,1], [0,1]],
            "walk-up": [ [1,2], [0,2], [3,2], [0,2]],
            "walk-left": [ [1,3], [0,3], [3,3], [0,3]],
        }
        this.currentAnimation = "walk-down";   // config.currentAnimation || "idle-down";

        this.currentAnimationFrame = 0;

        this.AnimationFrameLimit = config.animationFrameLimit || 8;

        this.animationFrameProgress =  this.AnimationFrameLimit;

        //reference the game object

        this.gameObject = config.gameObject;
}

    get frame(){
        return this.animations[this.currentAnimation][this.currentAnimationFrame]; 
    }

    setAnimation(key){
        if(this.currentAnimation != key){
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.AnimationFrameLimit;

        }
    }

    updateAnimationProgress(){
// downtick frame progress
if(this.animationFrameProgress > 0) {

    this.animationFrameProgress -= 1;
    return;
}
//resete o contador
this.animationFrameProgress = this.AnimationFrameLimit;
this.currentAnimationFrame += 1;

if(this.frame === undefined){
    this.currentAnimationFrame = 0;
}

}

    draw(ctx, cameraPerson) {

        const x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;

        const y = this.gameObject.y  - 18 + utils.withGrid(6) - cameraPerson.y;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)


        const [frameX, frameY] =  this.frame;


        this.isLoaded && ctx.drawImage(this.image,

            frameX * 32, frameY * 32,
            32, 32,
            x, y,
            32, 32

        )
        this.updateAnimationProgress();
     }


}