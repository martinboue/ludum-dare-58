import { Scene } from 'phaser';

export class Game extends Scene {

    helicol;
    cursors;

    constructor() {
        super({
            key: 'Game',
            physics: {
                default: "matter",
                matter: {
                    //    enabled: true,
                    //    positionIterations: 6,
                    //    velocityIterations: 4,
                    //    constraintIterations: 2,
                    //    enableSleeping: false,
                    //    plugins: {
                    //        attractors: false,
                    //        wrap: false,
                    //    },
                    //    gravity: {
                    //        x: 0,
                    //        y: 0,
                    //    }
                    //    setBounds: {
                    //        x: 0,
                    //        y: 0,
                    //        width: scene.sys.scale.width,
                    //        height: scene.sys.scale.height,
                    //        thickness: 64,
                    //        left: true,
                    //        right: true,
                    //        top: true,
                    //        bottom: true,
                    //    },
                    //    timing: {
                    //        timestamp: 0,
                    //        timeScale: 1,
                    //    },
                    //    correction: 1,
                    //    getDelta: (function() { return 1000 / 60; }),
                    //    autoUpdate: true,
                    //    debug: false,
                    //    debug: {
                    //        showAxes: false,
                    //        showAngleIndicator: false,
                    //        angleColor: 0xe81153,
                    //        showBroadphase: false,
                    //        broadphaseColor: 0xffb400,
                    //        showBounds: false,
                    //        boundsColor: 0xffffff,
                    //        showVelocity: false,
                    //        velocityColor: 0x00aeef,
                    //        showCollisions: false,
                    //        collisionColor: 0xf5950c,
                    //        showSeparations: false,
                    //        separationColor: 0xffa500,
                    //        showBody: true,
                    //        showStaticBody: true,
                    //        showInternalEdges: false,
                    //        renderFill: false,
                    //        renderLine: true,
                    //        fillColor: 0x106909,
                    //        fillOpacity: 1,
                    //        lineColor: 0x28de19,
                    //        lineOpacity: 1,
                    //        lineThickness: 1,
                    //        staticFillColor: 0x0d177b,
                    //        staticLineColor: 0x1327e4,
                    //        showSleeping: false,
                    //        staticBodySleepOpacity: 0.7,
                    //        sleepFillColor: 0x464646,
                    //        sleepLineColor: 0x999a99,
                    //        showSensors: true,
                    //        sensorFillColor: 0x0d177b,
                    //        sensorLineColor: 0x1327e4,
                    //        showPositions: true,
                    //        positionSize: 4,
                    //        positionColor: 0xe042da,
                    //        showJoint: true,
                    //        jointColor: 0xe0e042,
                    //        jointLineOpacity: 1,
                    //        jointLineThickness: 2,
                    //        pinSize: 4,
                    //        pinColor: 0x42e0e0,
                    //        springColor: 0xe042e0,
                    //        anchorColor: 0xefefef,
                    //        anchorSize: 4,
                    //        showConvexHulls: false,
                    //        hullColor: 0xd703d0
                    //    }
                }
            }
        });
    }
    
    create() {
        this.anims.createFromAseprite('helico');
        
        this.cameras.main.setBackgroundColor(0x00ff00);
        this.add.image(512, 384, 'background');

        this.helicol = this.matter.add.sprite(100, 50, 'helico', null, {
            ignoreGravity: true,
            scale: 10
        }).play({ key: 'fly', repeat: -1, frameRate: 20 })

        this.helicol.setFixedRotation();
        this.helicol.setMass(500);

        // let y = 100;
        // let prev = this.helicol;

        // const chain = this.matter.add.imageStack('chain-node', '__DEFAULT', x, y, columns, rows);

        // for (let i = 0; i < 9; i++) {
        //     const node = this.matter.add.image(300, y, 'chain-node', null, { shape: 'circle', mass: 0., scale: 4 });

        //     this.matter.add.joint(prev, node, i == 0 ? 90 : 25, 0.4);

        //     prev = node;

        //     y += 8;
        // }

        // const hook = this.matter.add.image(300, y, 'hook', null, { shape: 'circle', mass: 0., scale: 4 });

        // this.matter.add.joint(prev, hook,)

        this.matter.add.mouseSpring();

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.helicol.setVelocityX(-20);
        }
        else if (this.cursors.right.isDown) {
            this.helicol.setVelocityX(20);
        }
        else {
            this.helicol.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.helicol.setVelocityY(-20);
        }
        else if (this.cursors.down.isDown) {
            this.helicol.setVelocityY(20);
        }
        else {
            this.helicol.setVelocityY(0);
        }
    }
}
