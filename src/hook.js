import * as Matter from "matter-js";

const { Bodies, Events, Body, Vector } = Matter;

export default (x, y, group, spritePath = "hook.png") => {
  const shank = Bodies.rectangle(x, y, 16, 16, {
    density: 0.0008,
    collisionFilter: { group },
    render: { sprite: { texture: spritePath } },
  });

  const weight = Bodies.circle(x, y + 8, 6, {
    density: 0.01,
    collisionFilter: { group },
    render: { visible: false },
  });

  return Body.create({
    parts: [shank, weight],
    collisionFilter: { group }
  });
};
