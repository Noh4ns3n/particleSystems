const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle='darkmagenta';

class Particle {
  effect: Effect;
  x: number;
  y: number;
  radius: number;

  constructor(effect: Effect) {
    this.effect = effect;
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
    this.radius = 20;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}

class Effect {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  particles: Particle[];
  numberOfParticles: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 40;
    this.createParticles();
  }

  createParticles() {
    for (let i: number = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  handleParticles(context: CanvasRenderingContext2D) {
    this.particles.forEach((particle) => {
      particle.draw(context);
    });
  }
}

const effect = new Effect(canvas);
effect.handleParticles(ctx);
console.log('effect :>> ', effect);

function animate() {}
