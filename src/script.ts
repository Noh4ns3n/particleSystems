import { Effect } from "./model/Effect.model";

window.addEventListener("load", function () {
  
  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const effect : Effect = new Effect(canvas);
/*
  //vertical bar
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  //horizontal bar
  ctx.strokeStyle = "green";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  //text props
  const gradient:CanvasGradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
  gradient.addColorStop(0.3, 'magenta');
  gradient.addColorStop(0.5, 'darkorange');
  gradient.addColorStop(0.7, 'blue');
  ctx.fillStyle = gradient;
  ctx.strokeStyle = "white";
  ctx.font = "80px Impact";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const maxTextWidth:number = canvas.width * 0.5;
  const lineHeight:number = 70;

  function wrapText(text: string) {
    let linesArray: string[] = [];
    let lineCounter: number = 0;
    let line: string = "";
    let words:string[] = text.split(' ');

    for(let i:number=0;i<words.length;i++) {
      let testLine:string = line+words[i] + ' ';
      if(ctx.measureText(testLine).width > maxTextWidth) {
        line = words[i] + ' ';
        lineCounter++;
      } else {
        line = testLine;
      }
      linesArray[lineCounter] = line;
    }
    let textHeight:number = lineHeight * lineCounter;
    let textY: number = canvas.height/2 - textHeight/2;
    linesArray.forEach((el, index) => {
      ctx.fillText(el, canvas.width/2, textY+(index*lineHeight));
    })
    console.log('linesArray :>> ', linesArray);
  }

  textInput.addEventListener('keyup', (e) => {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    wrapText((e.target as HTMLInputElement).value);
  })*/
});
