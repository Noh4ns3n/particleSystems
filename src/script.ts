window.addEventListener("load", function () {
  const textInput = document.getElementById("textInput1") as HTMLInputElement;
  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log(ctx);

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

  ctx.fillStyle = "darkorange";
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
  })
});
