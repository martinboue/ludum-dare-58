import { Scene } from "phaser";
import "../factories/HeliColFactory.js";
import "../factories/CableFactory.js";
import "../factories/HookFactory.js";

export class Game extends Scene {
  helicol;

  constructor() {
    super({
      key: "Game",
      physics: {
        default: "matter",
        matter: {
          enabled: true,
          positionIterations: 12,
          velocityIterations: 8,
          constraintIterations: 4,
          enableSleeping: true,
          debug: false,
        },
      },
    });
  }

  create() {
    this.add.image(512, 384, "background");

    // Show level map
    const map = this.add.tilemap("level1");
    const tileset = map.addTilesetImage("tiles");
    const layer = map.createLayer(0, tileset, 0, 0);

    // Enable collisions for tiles in level
    layer.setCollisionFromCollisionGroup();
    this.matter.world.convertTilemapLayer(layer);

    this.cameras.main.setBackgroundColor(0x00ff00);

    const group = this.matter.world.nextGroup(true);

    const playerX = 100;
    const playerY = 50;

    const linkCount = 5;
    const linkW = 16;
    const linkH = 16;
    const rowGap = 8;
    const pairStiffness = 1;
    const pairLength = 1;

    // GameObjects and bodies

    this.helicol = this.add.helicol(playerX, playerY, group);
    const [cableHead, cableTail] = this.add.cable(
      playerX,
      playerY,
      linkCount,
      linkH,
      linkW,
      rowGap,
      pairStiffness,
      pairLength,
      group
    );

    const hookX = playerX;
    const hookY = playerY + linkH * (linkCount + 1);
    const hookW = linkW;
    const hookH = linkH;

    const hook = this.add.hook(hookX, hookY, hookW, hookW);

    // Physic Constraints

    this.matter.add.constraint(this.helicol, cableHead, 1, 1, {
      pointA: { x: 0, y: linkH/2 },
      pointB: { x: 0, y: -linkH/2 },
    });

    this.matter.add.constraint(cableTail, hook, 1, 1, {
      pointA: { x: 0, y: linkH / 2 },
      pointB: { x: 0, y: -linkH / 2 },
    });

    this.matter.add.mouseSpring();
  }

  update(time, delta) {
    super.update(time, delta);
    this.helicol.update(time, delta);
  }
}
