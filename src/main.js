import * as Matter from "matter-js";
import helicol from "./helicol";

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
  Bodies,
} = Matter;

// create engine
let engine = Engine.create(),
  world = engine.world;

// create renderer
let render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 600,
    showAngleIndicator: true,
    showCollisions: true,
    showVelocity: true,
    // Debug :
    wireframes: false
  }
});

Render.run(render);

// create runner
let runner = Runner.create();
Runner.run(runner, engine);

const heliCol = helicol(engine);

// add bodies
let group = Body.nextGroup(true);

let ropeA = Composites.stack(100, 50, 1, 12, 10, 10, function (x, y) {
  return Bodies.rectangle(x, y, 16, 16, {
    collisionFilter: { group: group }, 
    render: {
      sprite: { texture: "/chain-link.png" }
    }
  });
});

Composites.chain(ropeA, 0, 0.5, 0, -0.5, { stiffness: 0.8, length: 2, render: { type: 'line' } });
Composite.add(ropeA, Constraint.create({
  bodyB: ropeA.bodies[0],
  pointB: { x: 0, y: -8 },
  pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
  stiffness: 1
}));

Composite.add(world, [
  ropeA,
  ...heliCol,
  Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true }),
]);

// add mouse control
let mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 700, y: 600 },
});
