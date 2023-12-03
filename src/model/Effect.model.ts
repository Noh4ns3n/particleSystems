import { Particle } from "./Particle.model";

type Mouse = {
  x: number;
  y: number;
  pressed: boolean;
  radius: number;
};

export class Effect {
  canvas: HTMLCanvasElement;
  element: DOMRect;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  particles: Particle[];
  numberOfParticles: number;
  maxDistance: number;
  mouse: Mouse;
  debug: boolean;
  gradient: CanvasGradient;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.element = document
      .getElementById("caption")
      ?.getBoundingClientRect() as DOMRect;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 400;
    this.maxDistance = 0;
    this.debug = false;
    this.gradient = this.context.createLinearGradient(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.gradient.addColorStop(0, "rgba(0,0,255,1)");
    this.gradient.addColorStop(0.5, "rgba(0,255,255,1)");
    this.gradient.addColorStop(1, "rgba(0,125,0,1)");

    this.setupContext();
    this.createParticles();

    this.mouse = {
      x: 0,
      y: 0,
      pressed: false,
      radius: 150,
    };
    window.addEventListener("keydown", (e) => {
      // DEBUG
      if (e.key === "d") {
        this.debug = !this.debug;
        console.log("this.canvas :>> ", this.canvas);
        console.log("this.context :>> ", this.context);
        console.log("this.element :>> ", this.element);
        console.log("this.particles :>> ", this.particles);
      }
    });
    window.addEventListener("resize", (e) => {
      const w = e.target as Window;
      this.resize(w.innerWidth, w.innerHeight);
      this.element = document
        .getElementById("caption")
        ?.getBoundingClientRect() as DOMRect;
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
    this.context.fillStyle = this.gradient;
    this.context.strokeStyle = "crimson";
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

    //DEBUG
    if (this.debug) {
      this.context.strokeRect(
        this.element.x,
        this.element.y,
        this.element.width,
        this.element.height
      );
    }
  }

  connectParticles() {
    // allows comparison of every particle, with every other particle
    for (let a: number = 0; a < this.particles.length; a++) {
      for (let b: number = a; b < this.particles.length; b++) {
        const dx: number = this.particles[a].x - this.particles[b].x;
        const dy: number = this.particles[a].y - this.particles[b].y;
        const distance: number = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.maxDistance) {
          // context save and restore allows to change context only for the specified interval
          this.context.save();
          const opacity: number = 1 - distance / this.maxDistance;
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
      if (
        particle.x < particle.radius ||
        particle.x > this.canvas.width - particle.radius ||
        particle.y < particle.radius ||
        particle.y > this.canvas.height - particle.radius
      )
        particle.reset();
    });
  }
}
