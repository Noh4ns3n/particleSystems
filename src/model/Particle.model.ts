import { Effect } from "./Effect.model";

export class Particle {
    effect: Effect;
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    pushX: number;
    pushY: number;
    friction: number;
  
    constructor(effect: Effect) {
      this.effect = effect;
      this.radius = Math.floor(Math.random() * 4 + 2);
      this.x =
        this.radius + Math.random() * (this.effect.width - this.radius * 2);
      this.y =
        this.radius + Math.random() * (this.effect.height - this.radius * 2);
      this.vx = Math.random() * 1 - 0.5;
      this.vy = Math.random() * 1 - 0.5;
      this.pushX = 0;
      this.pushY = 0;
      this.friction = 0.98;
      // friction = minFriction + (1 - radius / maxRadius) x (maxFriction - minFriction)
      // this.friction = 0.95 + (1 - this.radius / 12) * (0.99-0.95);
    }
    reset() {
      this.x =
        this.radius + Math.random() * (this.effect.width - this.radius * 2);
      this.y =
        this.radius + Math.random() * (this.effect.height - this.radius * 2);
    }
  
    draw() {
      // context.fillStyle = `hsl(${this.x * 0.25}, 100% , 50%)`;
      this.effect.context.beginPath();
      this.effect.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.effect.context.fill();
      // this.effect.context.stroke();
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
      this.x += this.pushX + this.vx;
      this.y += this.pushY + this.vy;
  
      if (this.x < this.radius) {
        this.x = this.radius;
        this.vx *= -1;
      } else if (this.x > this.effect.width - this.radius) {
        this.x = this.effect.width - this.radius;
        this.vx *= -1;
      }
      if (this.y < this.radius) {
        this.y = this.radius;
        this.vy *= -1;
      } else if (this.y > this.effect.height - this.radius) {
        this.y = this.effect.height - this.radius;
        this.vy *= -1;
      }
    }
  }