class Overworld {

    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {
            //clear off the canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            //estabelecer a pessoa da camera
            const cameraPerson = this.map.gameObjects.hero;

            //pega e desenha o layer do piso inferior 
            this.map.drawLowerImage(this.ctx, cameraPerson);

            //desenha os objetos do jogo

            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
            arrow: this.directionInput.direction,
            map: this.map, 
            
                })
            })

                Object.values(this.map.gameObjects).forEach(object => {
                object.sprite.draw(this.ctx,cameraPerson);
            })

            //pega e desenha o layer do piso superior
            this.map.drawUpperImage(this.ctx,cameraPerson);


            requestAnimationFrame(() => {
                step();
            })

        }
        step();
    }
    init() {


        this.map = new OverworldMap(window.OverworldMaps.midhome);
        this.map.mountObjects();

        this.directionInput =   new DirectionInput();
        this.directionInput.init();
        

        this.startGameLoop();



    }
}