import { Effect } from "./model/Effect.model";

const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const effect = new Effect(canvas);
console.log("effect :>> ", effect);

function animate() {
  effect.context.clearRect(0, 0, canvas.width, canvas.height);
  effect.handleParticles();
  requestAnimationFrame(animate);
}
animate();
