import { Physics } from "phaser";

export class Hook extends Physics.Matter.Sprite {

    joint;
    
    constructor(world, x, y, w, h, group) {
         super(world, x, y, "hook");

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

        this.setBody(hookBody);
    }

    grab() {
        
    }
}