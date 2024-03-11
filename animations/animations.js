const LINK_ANIMATION = {
    name: "Animation",
    value: {
        shouldAnimate: false,
        currentTimeOfAnimation: 0,
        facing: "up",
        frames: {
            down: {
                move: {
                    srcRect: [
                        {
                            x: -2,
                            y: -1,
                            width: 20,
                            height: 19
                        },
                        {
                            x: -1,
                            y: 28,
                            width: 19,
                            height: 19
                        },
                    ],
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                },
                attack: {
                    srcRect: [
                        {
                            x: -1,
                            y: 58,
                            width: 19,
                            height: 19
                        },
                        {
                            x: -1,
                            y: 28,
                            width: 19,
                            height: 19
                        },
                    ],
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                }
            },
            left: {
                move: {
                    srcRect: [
                        {
                            x: 28,
                            y: -1,
                            width: 19,
                            height: 19
                        },
                        {
                            x: 28,
                            y: 29,
                            width: 19,
                            height: 19
                        },
                    ],
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                },
                attack: {
                    srcRect: [
                        {
                            x: 28,
                            y: 58,
                            width: 20,
                            height: 20
                        },
                        {
                            x: 28,
                            y: 28,
                            width: 20,
                            height: 20
                        },
                    ],
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                }

            },
            up: {
                move: {
                    srcRect: [
                        {
                            x: 58,
                            y: -1,
                            width: 19,
                            height: 19
                        },
                        {
                            x: 58,
                            y: 28,
                            width: 19,
                            height: 19
                        },
                    ],
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                },
                attack: {
                    srcRect: [
                        {
                            x: 58,
                            y: 58,
                            // y: 57,
                            width: 19,
                            height: 20
                        },
                        {
                            x: 58,
                            y: 28,
                            // y: 57,
                            width: 19,
                            height: 20
                        }

                    ],
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 4,
                    startTime: Date.now()
                }

            },
            right: {
                move: {
                    srcRect: [
                        {
                            x: 88,
                            y: -1,
                            width: 19,
                            height: 19
                        },
                        {
                            x: 88,
                            y: 28,
                            width: 19,
                            height: 19
                        },
                    ],
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                },
                attack: {
                    srcRect: [
                        {
                            x: 88,
                            y: 58,
                            width: 19,
                            height: 19
                        },
                        {
                            x: 88,
                            y: 28,
                            width: 19,
                            height: 19
                        },
                    ],
                    currentFrame: 0,
                    numFrames: 2,
                    frameSpeedRate: 3,
                    startTime: Date.now()
                }

            },

        }
    }
}

// player, registry, handleUserInput, id, newTilePositionComponent
const LINK_PICK_SWORD_1 = ({ player, handleUserInput, id, newTilePositionComponent }) => {
    const dummyPositionComponent = {
        name: 'Position',
        value: {
            x: player.x - 8,
            y: player.y - 40,
            height: 30,
            width: 20
        }
    }
    
    const dummySpriteComponent = {
        name: 'Sprite',
        value: {
            srcRect: {
                x: 60,
                y: 175,
                height: 30,
                width: 20
            },
            path: "./assets/link.png"
        }
    }

    const swordEntity = player.registry.createEntity([ dummyPositionComponent, dummySpriteComponent]);

    console.log(swordEntity, 'swordEntity')
}

export { LINK_ANIMATION, LINK_PICK_SWORD_1 };