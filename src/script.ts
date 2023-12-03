import { Effect } from "./model/Effect.model";

const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const effect = new Effect(canvas);
console.log("effect :>> ", effect);

function animate() {
  // instead of clearRect, drawing a transparent canvas over the old one leaves trails
  // effect.context.clearRect(0, 0, canvas.width, canvas.height);
  effect.context.save();
  effect.context.fillStyle='rgba(0,0,0,0.05)'
  effect.context.fillRect(0,0,canvas.width, canvas.height);
  effect.context.restore();
  effect.handleParticles();
  requestAnimationFrame(animate);
}
animate();
