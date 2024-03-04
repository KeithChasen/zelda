import Registry from "./classes/Registry.js";

export const canvas = document.getElementById('gameScreen');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const c = canvas.getContext('2d');

class Game {
    constructor() {
        this.player = undefined;
        this.registry = new Registry(); 
    }

    initialize = () => {
        this.registry.addSystem('MovementSystem');
        this.registry.addSystem('RenderSystem');

        const dummyPositionComponent = {
            name: 'Position',
            value: {
                x: 0,
                y: 0,
                height: 50,
                width: 50
            }
        }

        const dummyMovementComponent = {
            name: 'Movement',
            value: {
                vX: 0,
                vY: 0
            }
        }

        this.player = this.registry.createEntity([
            dummyMovementComponent,
            dummyPositionComponent
        ]);

        this.registry.addEntityToSystem(this.player)

        console.log(this.registry, 'registry')

        document.addEventListener('keyup', this.handleUserInput)
        document.addEventListener('keydown', this.handleUserInput)
    }

    update = () => {
        this.registry.getSystem('MovementSystem').update();
        this.registry.getSystem('RenderSystem').update();
        requestAnimationFrame(this.update);
    }

    render = () => {
        requestAnimationFrame(this.render);
    }

    handleUserInput = e => {
        const { key, type } = e;

        if (this.player) {
            const movementComponent = this.player.components['Movement'];

            if (type === 'keydown') {
                switch(key) {
                    case 'w':
                        movementComponent.vY = -1;
                        break;
                    case 'a':
                        movementComponent.vX = -1;
                        break;
                    case 's':
                        movementComponent.vY = 1;
                        break;
                    case 'd':
                        movementComponent.vX = 1;
                        break;
                    default:
                        break;
                }
            } else if (type === 'keyup') {
                switch(key) {
                    case 'w':
                        movementComponent.vY = 0;
                        break;
                    case 'a':
                        movementComponent.vX = 0;
                        break;
                    case 's':
                        movementComponent.vY = 0;
                        break;
                    case 'd':
                        movementComponent.vX = 0;
                        break;
                    default:
                        break;
                }
            } 
        }
    }
}

const game = new Game();
game.initialize();
game.update();
game.render();

