import { GameObjects } from "phaser";
import { HeliCol } from "../objects/HeliCol";

GameObjects.GameObjectFactory.register(
  "cable",
  function (
    startX = 100,
    startY = 50,
    linkCount = 5,
    linkW = 16,
    linkH = 16,
    rowGap = 8,
    pairStiffness = 1,
    pairLength = 1,
    group
  ) {
    const links = [];
    for (let i = 0; i < linkCount; i++) {
      const y = startY + i * (linkH + rowGap);

      const link = this.scene.matter.add.image(
        startX + linkW / 2,
        y,
        "chain-node"
      );
      link.setBody({
        type: "rectangle",
        width: linkW,
        height: linkH,
      });

      link.body.collisionFilter.group = group;

      links.push(link);

      if (i > 0) {
        this.scene.matter.add.constraint(
          links[i - 1],
          link,
          pairLength,
          pairStiffness,
          {
            pointA: { x: 0, y: +linkH / 2 },
            pointB: { x: 0, y: -linkH / 2 },
          }
        );
      }
    }

    return [links[0], links[links.length - 1]];
  }
);
