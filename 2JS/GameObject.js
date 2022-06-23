class GameObject {
    constructor(config) {
        this.ismounted  = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "C:/Users/gabri/Documents/Doomsday_Sword_of_Blood/imagens/Hero.png",
        });
    }

    mount(map){
        console.log("mounting!");
        this.ismounted=true;
        map.addWall(this.x, this.y);
    }

update(){

}

}