import { GameObjects } from "phaser";

GameObjects.GameObjectFactory.register("hook", function (x, y, w, h, group) {
  const hook = this.scene.matter.add.image(x, y, "hook");

  const shank = this.scene.matter.bodies.rectangle(x, y, w, h, {
    collisionFilter: {
      group,
    },
  });

  const weight = this.scene.matter.bodies.circle(x, y + w / 2, w / 4, {
    collisionFilter: {
      group,
    },
  });

  const hookBody = this.scene.matter.body.create({
    parts: [shank, weight],
    collisionFilter: {
      group: group,
    },
  });

  hook.setBody(hookBody);

  return hook;
});
