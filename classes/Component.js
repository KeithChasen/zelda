class Component {
    constructor(
        componentType
    ) {
        this.componentType = componentType;
    }
}

class PositionComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);

        this.x = componentObj.x;
        this.y = componentObj.y;
        this.width = componentObj.width;
        this.height = componentObj.height;
    }
}

class MovementComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);

        this.vX = componentObj.vX;
        this.vY = componentObj.vY;

        this.collisionX = false;
        this.collisionY = false;
    }
}

class SpriteComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        this.sprite = new Image();
        this.sprite.src = componentObj.path;
        this.srcRect = componentObj.srcRect; // {x,y,width,height}
    }
}

class AnimationComponent extends Component {
    constructor(componentType, componentObj) {
        super(componentType);
        /*
            {
                down: {
                    move: {
                        srcRect: [
                            {x,y,width,height},
                            {x,y,width,height},
                        ],
                        currentFrame: 0,
                        numFrames: 2,
                        frameSpeedRate: 3,
                        startTime: Date.now()
                    },
                    attack: {
                        ...
                    }
                },
                up: {},
                left: {},
                right: {}
            }
        */
        this.frames = componentObj.frames;
        this.currentTimeOfAnimation = componentObj.currentTimeOfAnimation;
        this.facing = componentObj.facing;
        this.shouldAnimate = componentObj.shouldAnimate;
    }
}

class CollisionComponent extends Component {
    constructor(componentType) {
        super(componentType);
    }
}

export { 
    PositionComponent, 
    MovementComponent, 
    SpriteComponent, 
    AnimationComponent,
    CollisionComponent
};
