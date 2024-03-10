import { LINK_ANIMATION } from "./animations/animations.js";
import Registry from "./classes/Registry.js";
import { openingScreen, shop } from "./screens/screen.js";

export const canvas = document.getElementById('gameScreen');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const c = canvas.getContext('2d');
const TILE_SIZE = 70;

class Game {
    constructor() {
        this.player = undefined;
        this.registry = new Registry(); 
        this.gameTime = Date.now();
        this.numRows = 13;
        this.numCols = 18;
        this.isDebug = false;
        this.eventBus = [];
    }

    initialize = () => {
        this.registry.addSystem('MovementSystem');
        this.registry.addSystem('RenderSystem');
        this.registry.addSystem('AnimationSystem');
        this.registry.addSystem('CollisionSystem');
        this.registry.addSystem('TransitionSystem');

        this.createPlayer();

        document.addEventListener('keyup', this.handleUserInput)
        document.addEventListener('keydown', this.handleUserInput)

        this.loadScreen(openingScreen)
    }

    update = () => {
        this.gameTime = Date.now();

        const event = this.eventBus[this.eventBus.length - 1];
        // console.log(event, 'event')

        if (event) {
            /*
                {
                    args: {
                        screen,
                        coX,
                        coY,
                        eventTime: number
                    },
                    func: function 
                }
            */

                const { args, func } = event;
                if (args.eventTime <= this.gameTime) {
                    // call func
                    func(args);
                    this.eventBus.pop();
                }
        }

        this.registry.update();

        this.registry.getSystem('CollisionSystem').update(this.player);
        this.registry.getSystem('TransitionSystem').update(this.player, this.eventBus, this.loadNewScreen);

        this.registry.getSystem('MovementSystem').update();

        requestAnimationFrame(this.update);
    }

    render = () => {
        this.registry.getSystem('AnimationSystem').update(this.gameTime);

        this.registry.getSystem('RenderSystem').update(this.isDebug);

        requestAnimationFrame(this.render);
    }

    loadNewScreen = ({ coX, coY, screen }) => {
        this.registry.removeAllEntities();

        let newScreenObject;

        switch(screen) {
            case 'shop' : {
                newScreenObject = shop
                break;
            }
        }

        this.createPlayer(coX, coY);
        this.loadScreen(newScreenObject);
    }

    createPlayer = (coX, coY) => {
        let newComponents = [];
        if (this.player) {
            const { components } = this.player;

            Object.values(components).forEach(component => {
                if (component.componentType === 'Position') {
                    component.x = coX * TILE_SIZE;
                    component.y = coY * TILE_SIZE;
                }

                if (component.componentType === 'Sprite') {
                    component.path = component.sprite.src;
                }

                newComponents.push({ name: component.componentType, value: { ...component } })
            });
            newComponents.push(LINK_ANIMATION);
        } else {
            const dummyPositionComponent = {
                name: 'Position',
                value: {
                    // x: coX * TILE_SIZE,
                    // y: coY * TILE_SIZE,
                    x: 500,
                    y: 500,
                    height: TILE_SIZE - 15,
                    width: TILE_SIZE - 15
                }
            }
    
            const dummyMovementComponent = {
                name: 'Movement',
                value: {
                    vX: 0,
                    vY: 0
                }
            }
    
            const dummySpriteComponent = {
                name: 'Sprite',
                value: {
                    path: './assets/link.png',
                    srcRect: {
                        x: 58,
                        y: -1,
                        width: 19,
                        height: 19
                    }
                }
            }
    
            const dummyCollisionComponent = {
                name: 'Collision'
            }

            newComponents = [
                dummyMovementComponent,
                dummyPositionComponent,
                dummySpriteComponent,
                LINK_ANIMATION,
                dummyCollisionComponent
            ];
        }

        this.player = this.registry.createEntity(newComponents);
    }

    handleUserInput = e => {
        const { key, type } = e;

        if (this.player) {
            const movementComponent = this.player.components['Movement'];
            const animationComponent = this.player.components['Animation'];

            if (type === 'keydown') {
                switch(key) {
                    case 'w': {
                        animationComponent.shouldAnimate = true;
                        movementComponent.vY = -5;
                        break;
                    }
                    case 'a': {
                        animationComponent.shouldAnimate = true;
                        movementComponent.vX = -5;
                        break;
                    }
                    case 's': {
                        animationComponent.shouldAnimate = true;
                        movementComponent.vY = 5;
                        break;
                    }
                    case 'd': {
                        animationComponent.shouldAnimate = true;
                        movementComponent.vX = 5;
                        break;
                    }
                    case 'g': {
                        this.isDebug = !this.isDebug;
                        break;
                    }
                    default:
                        break;
                }
            } else if (type === 'keyup') {
                switch(key) {
                    case 'w': {
                        animationComponent.shouldAnimate = false;
                        movementComponent.vY = 0;
                        break;
                    }
                    case 'a': {
                        animationComponent.shouldAnimate = false;
                        movementComponent.vX = 0;
                        break;
                    }
                    case 's': {
                        animationComponent.shouldAnimate = false;
                        movementComponent.vY = 0;
                        break;
                    }
                    case 'd': {
                        animationComponent.shouldAnimate = false;
                        movementComponent.vX = 0;
                        break;
                    }
                    default:
                        break;
                }
            } 
        }
    }

    loadScreen = (screenObject) => {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {

                let components = [];
                let tile = screenObject.screen[i][j];
                let srcRect = undefined;
                let path = '';

                if (typeof tile === 'number') {
                    path = 'tiles/'
                } 

                else if (typeof tile === 'string') {
                    path = 'collidables/';
                    const dummyCollisionComponent = {
                        name: 'Collision',
                    }
                    components.push(dummyCollisionComponent);
                }

                else if (typeof tile === 'object') {
                    /*
                        {
                            type: string - 'door', 'actionableTile,
                            tile: string - 0,
                            coX: number,
                            coY: number,
                            screen: string 
                        }
                    */

                    const { type } = tile;
                    if (type === 'door') {
                        const { coX, coY, screen } = tile;
                        const dummyTransitionComponent = {
                            name: 'Transition',
                            value: { coX, coY, screen }
                        }

                        components.push(dummyTransitionComponent);
                    }
                    path = 'actionableTiles/';
                    tile = tile.tile;
                }
                
                else if (typeof tile === 'undefined') {
                    continue;
                }

                const spriteName = screenObject.assetPath + path + tile + '.png';

                const dummySpriteComponent = {
                    name: 'Sprite',
                    value: {
                        path: spriteName,
                        srcRect
                    }
                }

                components.push(dummySpriteComponent)

                const dummyPositionComponent = {
                    name: 'Position',
                    value: {
                        x: j * TILE_SIZE,
                        y: i * TILE_SIZE,
                        height: TILE_SIZE,
                        width: TILE_SIZE
                    }
                }

                components.push(dummyPositionComponent)

                const entity = this.registry.createEntity(components);
            }
        }
    }
}

const game = new Game();
game.initialize();
game.update();
game.render();

