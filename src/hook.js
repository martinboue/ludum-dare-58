import * as Matter from "matter-js";

const { Bodies, Events, Body, Detector, Constraint, Composite, World } = Matter;

export default (engine, x, y, group, spritePath = "hook.png", boxes) => {
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

  const detector = Detector.create({ bodies: [shank, ...boxes] });

  const boxesGroup = boxes[0]?.collisionFilter.group;
  let hookedBox = null;
  let hookJoint = null;
  let hookClosed = false;

  const controller = {
    Space: {
      pressed: false,
      handle: () => {
        hookClosed = true;
      },
    },
  };

  window.addEventListener("keydown", (e) => {
    if (Object.hasOwn(controller, e.code)) {
      e.preventDefault();
      controller[e.code].pressed = true;
    }
  });

  window.addEventListener("keyup", (e) => {
    if (Object.hasOwn(controller, e.code)) {
      e.preventDefault();
      controller[e.code].pressed = false;
    }
  });

  Events.on(engine, "afterUpdate", () => {
    for (const [key, handler] of Object.entries(controller)) {
      if (!Object.hasOwn(controller, key)) continue;
      if (!handler.pressed) continue;

      handler.handle();
    }

    if (!hookClosed) return;

    if (hookedBox != null) {
      // Restore collision group and remove physic constraint
      hookedBox.collisionFilter.group = boxesGroup;
      World.remove(engine.world, hookJoint);
      hookedBox = null;
    } else {
      const cols = Detector.collisions(detector);

      for (const c of cols) {
        let box = null;
        if (c.bodyA.id == shank.id) {
          box = c.bodyB;
        } else if (c.bodyB.id == shank.id) {
          box = c.bodyA;
        }

        if (box == null) break;

        // Remove for next collisions
        box.collisionFilter.group = shank.collisionFilter.group;

        // Link them together
        hookJoint = Constraint.create({
          bodyA: shank.parent,
          bodyB: box,
          pointA: { x: 0, y: 0 },
          pointB: { x: 0, y: 0 },
          length: 0,
          stiffness: 0.9,
          damping: 0.08,
        });

        World.add(engine.world, hookJoint);
        hookedBox = box;
      }
    }

    hookClosed = false;
  });

  return Body.create({
    parts: [shank, weight],
    collisionFilter: { group },
  });
};
