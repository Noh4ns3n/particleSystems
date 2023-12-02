const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineWidth = 3;
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "rgba(255,255,255,1)");
gradient.addColorStop(0.5, "rgba(125,125,125,1)");
gradient.addColorStop(1, "rgba(0,0,0,1)");
ctx.fillStyle = gradient;
ctx.strokeStyle = "white";
console.log("ctx :>> ", ctx);

class Particle {
  effect: Effect;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;

  constructor(effect: Effect) {
    this.effect = effect;
    this.radius = Math.random() * 30 + 5;
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2);
    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;
  }

  draw(context: CanvasRenderingContext2D) {
    // context.fillStyle = `hsl(${this.x * 0.25}, 100% , 50%)`;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  }

  update() {
    this.x += this.vx;
    if (this.x > this.effect.width - this.radius || this.x < this.radius) {
      this.vx *= -1;
    }
    this.y += this.vy;
    if (this.y > this.effect.height - this.radius || this.y < this.radius) {
      this.vy *= -1;
    }
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
    this.numberOfParticles = 200;
    this.createParticles();
  }

  createParticles() {
    for (let i: number = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  handleParticles(context: CanvasRenderingContext2D) {
    this.connectParticles(context);
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }

  connectParticles(context: CanvasRenderingContext2D) {
    const maxDistance: number = 200;
    // allows comparison of every particle, with every other particle
    for (let a: number = 0; a < this.particles.length; a++) {
      for (let b: number = a; b < this.particles.length; b++) {
        const dx: number = this.particles[a].x - this.particles[b].x;
        const dy: number = this.particles[a].y - this.particles[b].y;
        const distance: number = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          // context save and restore allows to change context only for the specified interval
          context.save();
          const opacity: number = 1 - distance / maxDistance;
          context.globalAlpha = opacity;
          context.beginPath();
          context.moveTo(this.particles[a].x, this.particles[a].y);
          context.lineTo(this.particles[b].x, this.particles[b].y);
          context.stroke();
          context.restore();
        }
      }
    }
  }
}

const effect = new Effect(canvas);
console.log("effect :>> ", effect);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.handleParticles(ctx);
  requestAnimationFrame(animate);
}
animate();
