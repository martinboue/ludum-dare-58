import * as Matter from "matter-js";

const { Bodies, Events, Body, Vector } = Matter;

export default (engine) => {
  const speed = 10;
  let velocity = Vector.create(0, 0);
  const body = Bodies.rectangle(400, 500, 200, 60, {
    isStatic: false,
    // chamfer: 10,
    render: {
      sprite: {
        texture: "fish.png",
      },
    },
  });

  const controller = {
    KeyW: {
      pressed: false,
      handle: () => {
        velocity.y -= speed;
      },
    },
    KeyD: {
      pressed: false,
      handle: () => {
        velocity.x += speed;
      },
    },
    KeyS: {
      pressed: false,
      handle: () => {
        velocity.y += speed;
      },
    },
    KeyA: {
      pressed: false,
      handle: () => {
        velocity.x -= speed;
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

  Events.on(engine, "beforeUpdate", () => {
    for (const [key, handler] of Object.entries(controller)) {
      if (!Object.hasOwn(controller, key)) continue;
      if (!handler.pressed) continue;

      handler.handle();
    }

    velocity = Vector.normalise(velocity);

    Body.setVelocity(body, { x: velocity.x * speed, y: velocity.y * speed });

    velocity = Vector.create(0, 0);
  });

  return [body];
};
