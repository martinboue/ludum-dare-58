import * as Matter from "matter-js";
import helicol from "./helicol";
import heavyHook from "./hook";

const {
  Engine,
  Render,
  Runner,
  Body,
  Composite,
  Composites,
  Constraint,
  MouseConstraint,
  Mouse,
  Detector,
  Bodies,
} = Matter;

// create engine
let engine = Engine.create();
const world = engine.world;

// create renderer
let render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 600,
    // Debug :
    wireframes: false,
  },
});

Render.run(render);

// create runner
let runner = Runner.create();
Runner.run(runner, engine);

const heliCol = helicol(engine);

let group = Body.nextGroup(true);

let rope = Composites.stack(100, 50, 1, 5, 10, 10, (x, y) => {
  return Bodies.rectangle(x, y, 16, 16, {
    collisionFilter: { group: group },
    render: {
      sprite: { texture: "/chain-link.png" },
    },
  });
});

Composites.chain(rope, 0, 0.5, 0, -0.5, {
  stiffness: 0.8,
  length: 1,
  render: { visible: false },
});

Composite.add(
  rope,
  Constraint.create({
    bodyA: heliCol,
    bodyB: rope.bodies[0],
    pointB: { x: 0, y: 0 },
    pointA: { x: 0, y: 0 },
    stiffness: 1,
    render: {
      visible: false,
    },
  })
);

let boxesGroup = Body.nextGroup(true);

const box = Bodies.rectangle(200, 100, 16, 16, {
  collisionFilter: { group: boxesGroup },
  render: { sprite: { texture: "box.png" } },
});

const hook = heavyHook(engine, 100, 50 + 16 * 6, group, "hook.png", [box]);

Composite.add(
  rope,
  Constraint.create({
    bodyA: hook,
    bodyB: rope.bodies[rope.bodies.length - 1],
    pointB: { x: 0, y: -4 },
    pointA: { x: 0, y: 4 },
    stiffness: 0.5,
    render: {
      visible: false,
    },
  })
);

Composite.add(rope, hook);

Composite.add(world, [
  heliCol,
  rope,
  box,
  // walls
  Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
  Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
  Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
  Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
]);

// fit the render viewport to the scene
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 800, y: 600 },
});
