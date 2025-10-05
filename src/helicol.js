import * as Matter from "matter-js";

const { Bodies, Events, Body, Vector } = Matter;

export default (engine) => {
  const speed = 5;
  let velocity = Vector.create(0, 0);
  const body = Bodies.rectangle(100, 45, 16, 16, {
    isStatic: false,
    inertia: Infinity,
    render: {
      sprite: {
        texture: "helico/helico-1.png",
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
    }
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

  return body;
};
