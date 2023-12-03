import { Effect } from "./Effect.model";

export class Particle {
  effect: Effect;
  x: number;
  y: number;
  radius: number;
  width:number;
  height:number;
  vx: number;
  vy: number;
  gravity: number;
  pushX: number;
  pushY: number;
  friction: number;
  color: string;
  bounced: number;

  constructor(effect: Effect) {
    this.effect = effect;
    this.radius = Math.floor(Math.random() * 7 + 3);
    this.x =
      this.radius+300 + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      -this.radius -
      Math.random() * (this.effect.height * 0.3 - this.radius * 2);
    this.vx = Math.random() * -1.5;
    this.vy = Math.random() * 1 - 0.5;
    this.gravity = this.radius * 0.001;
    this.pushX = 0;
    this.pushY = 0;
    this.friction = 0.98;
    this.width = this.radius * 2;
    this.height = this.radius * 2;
    this.color = 'white';
    this.bounced = 0;
    // friction = minFriction + (1 - radius / maxRadius) x (maxFriction - minFriction)
    // this.friction = 0.95 + (1 - this.radius / 12) * (0.99-0.95);
  }
  reset() {
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.pushX = 0;
    this.y =
    -this.radius -
    Math.random() * (this.effect.height * 0.3 - this.radius * 2);
    this.vy = 0;
    this.pushY = 0;
    this.bounced = 0;
  }

  draw() {
    this.effect.context.beginPath();
    this.effect.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.effect.context.fill();
    
    if(this.effect.debug) {
      this.effect.context.save();
      this.effect.context.strokeStyle = this.color;
      this.effect.context.strokeRect(this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2);
      this.effect.context.restore();
    }

  }

  update() {
    if (this.effect.mouse.pressed) {
      const dx: number = this.x - this.effect.mouse.x;
      const dy: number = this.y - this.effect.mouse.y;
      const distance: number = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.effect.mouse.radius) {
        const angle: number = Math.atan2(dy, dx);
        this.pushX += Math.cos(angle);
        this.pushY += Math.sin(angle);
      }
    }

    this.pushX *= this.friction;
    this.pushY *= this.friction;
    this.vy += this.gravity;
    this.x += this.pushX + this.vx;
    this.y += this.pushY + this.vy;

    // collision with element :
    // https://developer.mozilla.org/fr/docs/Games/Techniques/2D_collision_detection
    if (
      this.x - this.radius < this.effect.element.x + this.effect.element.width && 
      this.x - this.radius + this.width > this.effect.element.x && 
      this.y - this.radius < this.effect.element.y + 10 &&
      this.height + this.y - this.radius > this.effect.element.y &&
      this.bounced < 2
    ) {
      // collision detected
      this.vy *= -0.7;
      this.y = this.effect.element.y - this.radius;
      this.bounced++;
    }

    // boundaries : bounce on every edge, reset position if bottom
    if (this.x < this.radius) {
      this.x = this.radius;
      this.vx *= -1;
      this.pushX *= -1;
    } else if (this.x > this.effect.width - this.radius) {
      this.x = this.effect.width - this.radius;
      this.vx *= -1;
      this.pushX *= -1;
    }
    if(this.y < -this.radius - this.effect.height * 0.3) {
        this.y = -this.radius - this.effect.height * 0.3;
        this.vy *= -1;
        this.pushY *= -1;
    } else if (this.y > this.effect.height + this.radius + this.effect.maxDistance) {
      this.reset();
    }
  }
}
