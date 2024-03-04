import Registry from "./classes/Registry.js";

const canvas = document.getElementById('gameScreen');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

class Game {
    constructor() {
        this.player = undefined;
        this.registry = new Registry(); 
    }

    initialize = () => {
        this.player = {
            x: 0,
            y: 0,
            height: 50,
            width: 60
        }

        this.registry.addSystem('MovementSystem');

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
                vX:0,
                vY:0
            }
        }

        const entity = this.registry.createEntity([
            dummyMovementComponent,
            dummyPositionComponent
        ]);

        this.registry.addEntityToSystem(entity)

        console.log(this.registry, 'registry')

        document.addEventListener('keyup', this.handleUserInput)
        document.addEventListener('keydown', this.handleUserInput)
    }

    update = () => {
        requestAnimationFrame(this.update);
    }

    render = () => {
        const { x, y, width, height } = this.player;

        c.clearRect(0,0, canvas.width, canvas.height);

        c.beginPath();
        c.fillStyle= 'red';
        c.fillRect(x, y, width, height);
        c.stroke();
        

        requestAnimationFrame(this.render);
    }

    handleUserInput = e => {
        const { key, type } = e;

        if (this.player) {
            if (type === 'keydown') {
                switch(key) {
                    case 'w':
                        this.player.y -= 1;
                        break;
                    case 'a':
                        this.player.x -= 1;
                        break;
                    case 's':
                        this.player.y += 1;
                        break;
                    case 'd':
                        this.player.x += 1;
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

