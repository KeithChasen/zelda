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

export { PositionComponent, MovementComponent };
