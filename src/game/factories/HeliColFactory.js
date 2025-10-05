import { GameObjects } from "phaser";
import { HeliCol } from "../objects/HeliCol";

GameObjects.GameObjectFactory.register(
  "helicol",
  function (x, y, group) {
    const obj = new HeliCol(this.scene.matter.world, x, y, group);

    this.scene.add.existing(obj);

    return obj;
  }
);
