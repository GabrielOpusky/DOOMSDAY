class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.walls = config.walls || {};


        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y)
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y
        )
    }

    isSpaceTaken(currentX, currentY, direction) {
        const { x, y } = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

mountObjects(){
    Object.values(this.gameObjects).forEach(o =>{
        o.mount(this);
    })
}

    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x, y) {
        delete this.walls[`${x},${y}`]

    }

    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y);
    }

}



window.OverworldMaps = {
    midhome: {
        lowerSrc: "C:/Users/gabri/Documents/Doomsday_Sword_of_Blood/imagens/midhome.png",
        upperSrc: "C:/Users/gabri/Documents/Doomsday_Sword_of_Blood/imagens/espadaparedeinit.png",

        gameObjects: {

            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(15),
                y: utils.withGrid(22),
            }),
            npcA: new Person({
                x: utils.withGrid(4),
                y: utils.withGrid(8),
                src: "C:/Users/gabri/Documents/Doomsday_Sword_of_Blood/imagens/heroi.png"

            }),
            npcA: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(6),
                src: "C:/Users/gabri/Documents/Doomsday_Sword_of_Blood/imagens/mãe.png"

            }),

        }
    },

    walls: {

        //"16,16": true

        [utils.asGridCoord(7, 6)]: true,
        [utils.asGridCoord(8, 6)]: true,
        [utils.asGridCoord(7, 7)]: true,
        [utils.asGridCoord(8, 7)]: true,
    }

}

