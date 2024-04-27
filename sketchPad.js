class SketchPad{
    constructor(container, size = 400){
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
        background-color: white;
        box-shadow: 0px 0px 12px 8px black;
        `;
        container.appendChild(this.canvas);    

        
        const lineBreak = document.createElement("br");
        container.appendChild(lineBreak);

        this.undoBtn = document.createElement("button");
        this.undoBtn.innerHTML="UNDO";
        container.appendChild(this.undoBtn);

        this.ctx=this.canvas.getContext("2d");
        

       
        this.#addEventListener();    
        this.reset();
    }
    
    reset(){
        this.paths=[];
        this.isDrawing=false;
        this.#redraw();
    }

    #addEventListener(){
        this.canvas.onmousedown=(evt)=>{
            const rect=this.canvas.getBoundingClientRect(); 
        const mouse=[
            Math.round(evt.clientX-rect.left),
            Math.round(evt.clientY-rect.top)
        ];
            this.paths.push([mouse]);
            this.isDrawing=true;
        }

        this.canvas.onmousemove=(evt)=>{
            if(this.isDrawing){
            const rect=this.canvas.getBoundingClientRect(); 
            const mouse=[
                Math.round(evt.clientX-rect.left),
                Math.round(evt.clientY-rect.top)
            ];
            const lastPath=this.paths[this.paths.length-1];
            lastPath.push(mouse);
            this.#redraw();
        }
        }

        this.canvas.onmouseup=()=>{
            this.isDrawing=false;
        }
        
        this.canvas.ontouchstart=(evt)=>{
            const loc=evt.touches[0];
            this.canvas.onmousedown(loc);
        }

        this.canvas.ontouchmove=(evt)=>{
            const loc=evt.touches[0];
            this.canvas.onmousemove(loc);
        }

        this.canvas.ontouchend=()=>{
            this.canvas.onmouseup();
        }

        this.undoBtn.onclick=()=>{
            this.paths.pop();
            this.#redraw();
        }
    }

    #redraw(){
        this.ctx.clearRect(0,0,
            this.canvas.width, this.canvas.height);
        draw.paths(this.ctx,this.paths); 
        if(this.paths.length>0){
            this.undoBtn.disabled=false;
        }else{
            this.undoBtn.disabled=true;
        }
    }


}