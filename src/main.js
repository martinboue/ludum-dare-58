import * as Matter from 'matter-js';

let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Body = Matter.Body,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Constraint = Matter.Constraint,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Bodies = Matter.Bodies;
// create engine
let engine = Engine.create();
const world = engine.world;

// create renderer
let render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 960,
    height: 440,
    // Debug :
    wireframes: false,
  }
});

Render.run(render);

// create runner
let runner = Runner.create();
Runner.run(runner, engine);

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

Composites.chain(ropeA, 0, 0.5, 0, -0.5, { stiffness: 0.8, length: 2, render: { visible: false } });
Composite.add(ropeA, Constraint.create({
  bodyB: ropeA.bodies[0],
  pointB: { x: 0, y: -8 },
  pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
  stiffness: 1,
  render: {
    visible: false
  }
}));

Composite.add(world, [
  ropeA,
  // Top wall
  Bodies.rectangle(render.options.width/2, 0, render.options.width, 50, { isStatic: true }),
  // Bottom wall
  Bodies.rectangle(render.options.width/2, render.options.height, render.options.width, 50, { isStatic: true }),
  // Right wall
  Bodies.rectangle(render.options.width, render.options.height/2, 50, render.options.height, { isStatic: true }),
  // Left wall
  Bodies.rectangle(0, render.options.height/2, 50, render.options.height, { isStatic: true })
]);

// add mouse control
let mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: render.options.width, y: render.options.height }
});