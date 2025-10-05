import { Physics } from "phaser";

const HELICOL_SPEED = 5;

export class HeliCol extends Physics.Matter.Sprite {
  constructor(world, x, y, group) {
    super(world, x, y, "helico", null, {
      isStatic: false,
      inertia: Infinity,
      scale: 10,
      mass: 500,
      collisionFilter: {
        group: group,
      },
    });

    this.play({ key: "fly", repeat: -1, frameRate: 20 });
    this.setFixedRotation();
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    if (this.cursors.left.isDown) {
      this.setVelocityX(-HELICOL_SPEED);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(HELICOL_SPEED);
    } else {
      this.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.setVelocityY(-HELICOL_SPEED);
    } else if (this.cursors.down.isDown) {
      this.setVelocityY(HELICOL_SPEED);
    } else {
      this.setVelocityY(0);
    }
  }
}
