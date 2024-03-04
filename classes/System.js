import { canvas, c } from "../index.js";

class System {
    constructor(systemType) {
        this.systemType = systemType;
        this.entities = [];
    }
}

class MovementSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ['Movement', 'Position'];
    }

    update = () => {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];

            let { Movement, Position } = entity.components;

            Position.x += Movement.vX;
            Position.y += Movement.vY;
        }
    }
}

class RenderSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Position", "Sprite"];
    }

    update = () => {
        c.clearRect(0,0, canvas.width, canvas.height);

        for (let i = 0; i < this.entities.length; i++) {
            const { Position, Sprite } = this.entities[i].components;
            const { x, y, width, height } = Position;
            const { srcRect, sprite } = Sprite;
            const { x: sx, y: sy, width: sW, height: sH } = srcRect;

            c.drawImage(
                sprite,

                sx, 
                sy, 
                sW, 
                sH,
                
                x, 
                y, 
                width, 
                height
            );
        } 
    }
}

export { MovementSystem, RenderSystem };
