const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

type Mouse = {
  x: number;
  y: number;
  pressed: boolean;
  radius: number;
};
class Particle {
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
      const force: number = this.effect.mouse.radius / distance;
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

class Effect {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  particles: Particle[];
  numberOfParticles: number;
  mouse: Mouse;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 400;
    this.setupContext();
    this.createParticles();

    this.mouse = {
      x: 0,
      y: 0,
      pressed: false,
      radius: 150,
    };

    window.addEventListener("resize", (e) => {
      const w = e.target as Window;
      this.resize(w.innerWidth, w.innerHeight);
    });
    window.addEventListener("mousemove", (e) => {
      if (this.mouse.pressed) {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      }
    });
    window.addEventListener("mousedown", (e) => {
      this.mouse.pressed = true;
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
    window.addEventListener("mouseup", (e) => {
      this.mouse.pressed = false;
    });
  }

  setupContext() {
    this.context.lineWidth = 2;
    const gradient = this.context.createLinearGradient(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    gradient.addColorStop(0, "rgba(255,0,255,1)"); // Magenta
    gradient.addColorStop(0.5, "rgba(255,125,0,1)"); // Orange
    gradient.addColorStop(1, "rgba(30,0,255,1)"); // Deep Blue
    this.context.fillStyle = gradient;
    this.context.strokeStyle = "crimson";
    console.log(" this.context :>> ", this.context);
  }

  createParticles() {
    for (let i: number = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  handleParticles() {
    this.connectParticles();
    this.particles.forEach((particle) => {
      particle.draw();
      particle.update();
    });
  }

  connectParticles() {
    const maxDistance: number = 100;
    // allows comparison of every particle, with every other particle
    for (let a: number = 0; a < this.particles.length; a++) {
      for (let b: number = a; b < this.particles.length; b++) {
        const dx: number = this.particles[a].x - this.particles[b].x;
        const dy: number = this.particles[a].y - this.particles[b].y;
        const distance: number = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          // context save and restore allows to change context only for the specified interval
          this.context.save();
          const opacity: number = 1 - distance / maxDistance;
          this.context.globalAlpha = opacity;
          this.context.beginPath();
          this.context.moveTo(this.particles[a].x, this.particles[a].y);
          this.context.lineTo(this.particles[b].x, this.particles[b].y);
          this.context.stroke();
          this.context.restore();
        }
      }
    }
  }

  resize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    this.setupContext();

    this.particles.forEach((particle) => {
      if(particle.x < particle.radius || particle.x > this.canvas.width - particle.radius || particle.y < particle.radius || particle.y > this.canvas.height - particle.radius)
      particle.reset();
    });
  }
}

const effect = new Effect(canvas);
console.log("effect :>> ", effect);

function animate() {
  effect.context.clearRect(0, 0, canvas.width, canvas.height);
  effect.handleParticles();
  requestAnimationFrame(animate);
}
animate();
