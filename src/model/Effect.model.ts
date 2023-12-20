import { Particle } from "./Particle.model";

/*type Mouse = {
    x: number;
    y: number;
    pressed: boolean;
    radius: number;
  };
*/
export class Effect {
  // width: number;
  // height: number;
  lineHeight: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  maxTextWidth: number;
  textX: number;
  textY: number;
  textInput: HTMLInputElement;

  constructor(canvas: HTMLCanvasElement) {
    // this.width = this.canvas.width;
    // this.height = this.canvas.height;
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.maxTextWidth = this.canvas.width * 0.5;
    this.lineHeight = 70;
    this.textX = this.canvas.width / 2;
    this.textY = this.canvas.height / 2;
    this.textInput = document.getElementById("textInput1") as HTMLInputElement;
    
    this.textInput.addEventListener("keyup", (e) => {
      console.log('this :>> ', this);
      if (e.key !== " ") {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.wrapText((e.target as HTMLInputElement).value);
      }
    });

  }
  setupContext() {
    //canvas settings
    this.context.lineWidth = 1;
    this.context.strokeStyle = "gold";
    this.context.font = "80px Impact";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    const gradient: CanvasGradient = this.context.createLinearGradient(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    gradient.addColorStop(0.3, "magenta");
    gradient.addColorStop(0.5, "darkorange");
    gradient.addColorStop(0.7, "blue");
    this.context.fillStyle = gradient;
  }
  wrapText(text: string) {
    this.setupContext();

    //multi-line display
    let linesArray: string[] = [];
    let lineCounter: number = 0;
    let line: string = '';
    let words: string[] = text.split(' ');

    for (let i: number = 0; i < words.length; i++) {
      let testLine: string = line + words[i] + ' ';
      if (this.context.measureText(testLine).width > this.maxTextWidth) {
        line = words[i] + ' ';
        lineCounter++;
      } else {
        line = testLine;
      }
      linesArray[lineCounter] = line;
    }
    let textHeight: number = this.lineHeight * lineCounter;
    let textY: number = this.canvas.height / 2 - textHeight / 2;
    linesArray.forEach((el, index) => {
      this.context.fillText(
        el,
        this.canvas.width / 2,
        textY + index * this.lineHeight
      );
      this.context.strokeText(
        el,
        this.canvas.width / 2,
        textY + index * this.lineHeight
      );
    });
  }
  convertToParticles() {}
  render() {}
  /*canvas: HTMLCanvasElement;
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
    }*/
}
