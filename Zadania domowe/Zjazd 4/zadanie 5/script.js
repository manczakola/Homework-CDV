     this.controlsDiv = document.querySelector('.controls');
   
     class Paint {
         constructor() {
             this.canvas = document.getElementById('canvas');
             this.avaibleMode = ['draw', 'line', 'rectangle'];

             window.addEventListener('DOMContentLoaded', (e) => {
                 this.canDraw = false;
                 this.mode = 'draw';
                 this.setupContext();
                 this.bindControls();
             });

             this.createCanvas();
             this.setControls();

         }

         createCanvas() {

             this.canvas.width = window.innerWidth;
             this.canvas.height = window.innerHeight - (controlsDiv.offsetHeight + 50);
             this.context = this.canvas.getContext('2d');

             this.canvas2 = document.createElement("canvas");
             this.canvas2.width = window.innerWidth;
             this.canvas2.height = window.innerHeight - (controlsDiv.offsetHeight + 50);
             this.canvas.appendChild(this.canvas2);
             this.context2 = this.canvas2.getContext("2d");
         }

         setControls() {
             this.sizeElement = document.querySelector('.paint-size');

             this.sizeElementValue = document.querySelector('.paint-size-val');

             this.sizeElementValue.innerText = this.sizeElement.value;

             this.colorElement = [...document.querySelectorAll('.colorsBtn')];

             this.modeBtn = [...document.querySelectorAll('.button-mode')];

             this.modeBtn.filter(el => {
                 return el.dataset.mode === "draw";
             })[0].classList.add('active');
         }

         setupContext() {
             this.context.lineWidth = this.sizeElement.value;
             this.context.lineJoin = 'round';
             this.context.lineCap = 'round';
             this.context.strokeStyle = this.colorElement.value;


             this.context2.lineWidth = this.sizeElement.value;
             this.context2.strokeStyle = this.colorElement.value;
         }

         bindControls() {
             this.sizeElement.addEventListener('change', this.changeSize.bind(this));
             this.colorElement.forEach(el => el.addEventListener('click', this.changeColor.bind(this)));

             this.canvas.addEventListener('mousemove', this.mouseMove.bind(this));
             this.canvas.addEventListener('touchmove', this.mouseMove.bind(this));

             this.canvas.addEventListener('mouseup', this.mouseUp.bind(this));
             this.canvas.addEventListener('touchend', this.mouseUp.bind(this));
             this.canvas.addEventListener('touchcancel', this.mouseUp.bind(this));

             this.canvas.addEventListener('mousedown', this.mouseDown.bind(this));
             this.canvas.addEventListener('touchstart', this.mouseDown.bind(this));


             for (let i = 0; i <= this.modeBtn.length; i++) {
                 this.modeBtn.forEach(el => {
                     el.addEventListener('click', (e) => {
               
                         e.target.classList.add('active');
                         this.mode = e.target.dataset.mode;
                         if (el !== e.target) {
                             el.classList.remove('active');
                         }
                     })
                 })
             }


         }


         changeSize(e) {
             this.sizeElementValue.innerText = e.target.value;
             this.context.lineWidth = e.target.value;
             this.context2.lineWidth = e.target.value;

         }


         changeColor(e) {

             this.colorElement = e.target.value;
             this.context.strokeStyle = this.colorElement;
             this.context.fillStyle = this.colorElement;
             this.context2.strokeStyle = this.colorElement;

         }


         enableMode(mode) {
             if (this.avaibleMode.indexOf(mode) !== -1) {
                 this.mode.mode;
             }
         }


         mouseDown(e) {
             this.canDraw = true;

             const mousePos = this.getMousePosition(e);
             this.startX = mousePos.x;
             this.startY = mousePos.y;


             this.context.beginPath();
             this.context.moveTo(this.startX, this.startY);
         }

         mouseUp(e) {
             this.canDraw = false;

             if (this.mode === 'line' || this.mode === 'rectangle') {
                 this.context.drawImage(this.canvas2, 0, 0);
                 this.context2.clearRect(0, 0, this.canvas2.width, this.canvas2.height)
             }
         }

         mouseMove(e) {
             if (this.canDraw) {
                 const mousePos = this.getMousePosition(e);

                 if (this.mode === 'draw') {
                     this.context.lineTo(mousePos.x, mousePos.y);
                     this.context.stroke();
                 }

                 if (this.mode === 'line') {

                     this.context2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
                     this.context2.beginPath();
                     this.context2.moveTo(this.startX, this.startY);
                     this.context2.lineTo(mousePos.x, mousePos.y);
                     this.context2.closePath();
                     this.context2.stroke();
                 }


                 if (this.mode === 'rectangle') {
   
                     this.context2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
                     this.context2.beginPath();
                     this.context2.moveTo(this.startX, this.startY);
                     this.context2.rect(this.startX, this.startY, mousePos.x - this.startX, mousePos.y - this.startY);
                     this.context2.closePath();
                     this.context2.stroke();
                 }
             }
         }


         getMousePosition(e) {


             let canvasx = this.canvas.offsetLeft;
             let canvasy = this.canvas.offsetTop;

             let mousex = e.clientX - canvasx;
             let mousey = e.clientY - canvasy;

             return {
                 x: mousex,
                 y: mousey
             }
         }

     }


     new Paint();