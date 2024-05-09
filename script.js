const textColor = document.getElementById("color-picker");
const bgColor = document.getElementById("background-picker");
const fontSize = document.getElementById("font-size");
const canvas = document.getElementById("sign-canvas");
const clearButton = document.getElementById("clear-button");
const saveButton = document.getElementById("save-button");
const retrieveButton = document.getElementById("retrieve-button")

const ctx = canvas.getContext('2d')

textColor.addEventListener('change', (e) =>{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})

canvas.addEventListener('mousedown', (e) =>{
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
})

canvas.addEventListener('mousemove', (e) =>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        lastX = e.offsetX;
        lastY = e.offsetY;
    }
})

canvas.addEventListener('mouseup', () =>{
    isDrawing = false;
})

bgColor.addEventListener('change', (e) =>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,800,485);
})

fontSize.addEventListener('change', (e) =>{
    ctx.lineWidth = e.target.value;
})

clearButton.addEventListener('click', (e) =>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
})

saveButton.addEventListener('click', (e) =>{
    localStorage.setItem('canvasContents', canvas.toDataURL());

    let link = document.createElement('a');
    link.download = 'my-sign.jpg';
    link.href = canvas.toDataURL();
    link.click();
})

retrieveButton.addEventListener('click', (e) =>{
    let savedCanvas = localStorage.getItem('canvasContents');

    if(savedCanvas){
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img,0,0);
    }
})

