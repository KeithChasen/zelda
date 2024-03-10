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

            let { Movement, Position, Animation, Collision } = entity.components;

            if (Collision) {
                const { facing } = Animation;

                if (Movement.collisionX) {
                    Movement.vX = 0;
                
                    if (facing === 'right') Position.x -= 6;
                    if (facing === 'left') Position.x += 6;
                }

                if (Movement.collisionY) {
                    Movement.vY = 0;

                    if (facing === 'up') Position.y += 6;
                    if (facing === 'down') Position.y -= 6;  
                }
            }

            Movement.collisionX = false;
            Movement.collisionY = false;

            Position.x += Movement.vX;
            Position.y += Movement.vY;

            if (Movement.vX > 0) {
                Animation.facing = 'right';
            }
            if (Movement.vX < 0) {
                Animation.facing = 'left';
            }
            if (Movement.vY > 0) {
                Animation.facing = 'down';
            }
            if (Movement.vY < 0) {
                Animation.facing = 'up';
            }
        }
    }
}

class RenderSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Position", "Sprite"];
    }

    update = (isDebug) => {
        c.clearRect(0,0, canvas.width, canvas.height);

        for (let i = 0; i < this.entities.length; i++) {
            const { Position, Sprite, Collision } = this.entities[i].components;
            const { x, y, width, height } = Position;
            const { srcRect, sprite } = Sprite;
            
            c.beginPath();

            if (srcRect) {
                c.globalCompositeOperation = 'source-over';

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
            } else {
                c.globalCompositeOperation = 'destination-over';
                c.drawImage(
                    sprite,

                    x, y, width, height
                );
            }

            // console.log(isDebug, 'isDebug')

            if (isDebug) {
                if (Collision) {
                    c.rect(x, y, width, height);
                    c.lineWidth = 2
                    c.strokeStyle = 'red';
                    
                }
            }
            c.stroke();
        } 
    }
}

class AnimationSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Position", "Sprite", "Animation"];
    }

    update = gameTime => {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];

            const { facing, shouldAnimate } = entity.components['Animation'];

            if (shouldAnimate) {
                const timeDiff = gameTime - entity.components['Animation']['currentTimeOfAnimation'];

                const currentFrame = Math.floor(
                    timeDiff *
                    entity.components['Animation']['frames'][facing]['move']['frameSpeedRate'] / 1000
                ) % entity.components['Animation']['frames'][facing]['move']['numFrames'];
    
                entity.components['Sprite']['srcRect'] = entity.components['Animation']['frames'][facing]['move']['srcRect'][currentFrame];
                entity.components['Animation']['frames'][facing]['move']['currentFrame'] = currentFrame;
            }
        }
    }
}

class CollisionSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ['Position', 'Collision']
    }

    update = (player) => {

        // console.log(this.entities, 'ents')

        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];

            if (player.id === entity.id) {
                continue;
            }

            let { x: px, y: py, width: pwidth, height: pheight } = player.components['Position'];
            let { x: ex, y: ey, width: ewidth, height: eheight } = entity.components['Position'];
            const { Movement } = player.components;

            if (
                px < ex + ewidth &&
                px + pwidth + Movement.vX > ex &&
                py < ey + eheight &&
                py + pheight + Movement.vY > ey
            ) {
                console.log('HIT')

                if (Movement.vX !== 0) {
                    Movement.collisionX = true;
                }

                if (Movement.vY !== 0) {
                    Movement.collisionY = true;
                }
            }

        }
    }
}

class TransitionSystem extends System {
    constructor(systemType) {
        super(systemType)
        this.componentRequirements = ['Position', 'Transition'];
    }

    update = player => {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];

            let { x: px, y: py, width: pwidth, height: pheight } = player.components['Position'];
            let { x: ex, y: ey, width: ewidth, height: eheight } = entity.components['Position'];

            if (
                px < ex + ewidth &&
                px + pwidth > ex &&
                py < ey + eheight &&
                py + pheight > ey
            ) {
                console.log('HIT Transition')
            }

        }
    }
}

export { 
    MovementSystem, 
    RenderSystem, 
    AnimationSystem, 
    CollisionSystem,
    TransitionSystem
};
