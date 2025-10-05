import { GameObjects } from "phaser";
import { Hook } from "../objects/Hook";

GameObjects.GameObjectFactory.register(
  "hook",
  function (x, y, w, h, group) {
    const obj = new Hook(this.scene.matter.world, x, y, w, h, group);

    this.scene.add.existing(obj);

    return obj;
  }
);

