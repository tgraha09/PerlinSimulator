import * as t from './js/threehelp.js.js'
import * as THREE from 'three'
//t.Test()
export function initPerspectiveCam(renderer: any, perspectiveCam: any){
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(innerScreenWidth, innerScreenHeight)
    //render camera 
    perspectiveCam.position.setZ(30)
    //renderer.render(scene, perspectiveCam)
}

export function rotateX(shape, key, val){
    if(shape instanceof THREE.Vector3){
        if(key ==="x"){
            shape.x +=val
            //console.log(plane.rotation.x);
        }
        else if (key ==="X"){
            shape.x -=val
        }
        //console.log(shape.x);
        
    }
    else{
        if(key ==="x"){
            shape.rotation.x +=val
            //console.log(plane.rotation.x);
        }
        else if (key ==="X"){
            shape.rotation.x -=val
        }
    }
    
    
}

export function rotateY(shape, key, val){
    if(shape instanceof THREE.Vector3){
        if(key ==="y"){
            shape.y +=val
            //console.log(plane.rotation.x);
        }
        else if (key ==="Y"){
            shape.y -=val
        }
        
    }
    else{
        if(key ==="y"){
            shape.rotation.y +=val
            //console.log(plane.rotation.x);
        }
        else if (key ==="Y"){
            shape.rotation.y -=val
        }
    }
    
    
}

export function rotateZ(shape, key, val){
    if(shape instanceof THREE.Vector3){
        if(key ==="z"){
            shape.z +=val
            //console.log(plane.rotation.x);
        }
        else if (key ==="Z"){
            shape.z -=val
        }
        
    }
    else{
        if(key ==="z"){
            shape.rotation.z +=val
            //console.log(plane.rotation.x);
        }
        else if (key ==="Z"){
            shape.rotation.z -=val
        }
    }
    
    
}

export function rotateShape(shape, key, val){
    rotateX(shape, key, val)
    rotateY(shape, key, val)
    rotateZ(shape, key, val)
}

const keyboardFunctions = []
export function addKeyboardEvent(callback){

    keyboardFunctions.push(callback)
    document.addEventListener('keydown', function(event) {
        
        keyboardFunctions.forEach(func => {
            
            func(event.key, event.shiftKey, event.altKey)
        });
        //callback(event.key)

        /*if(event.keyCode == 37) {
            alert('Left was pressed');
        }
        else if(event.keyCode == 39) {
            alert('Right was pressed');
        }*/
    });
}

export function KeyboardWatch(callback){
    document.addEventListener('keydown', function(event) {
        
        
        callback(event.key)

        /*if(event.keyCode == 37) {
            alert('Left was pressed');
        }
        else if(event.keyCode == 39) {
            alert('Right was pressed');
        }*/
    });
}

export function changeGeometry(geometry, callback){
    const count = geometry.attributes.position.count;
    let previous: any = {}
    for (let i = 0; i < count; i++) {
      const x = geometry.attributes.position.getX(i);
      const y = geometry.attributes.position.getY(i);
      const z = geometry.attributes.position.getZ(i);
      callback(geometry, {x,y,z, count}, i, previous)
      previous.matrix = {x,y,z, count}
      //previous.u +=1
    }
    //callback(geometry)
    geometry.computeVertexNormals();
    geometry.attributes.position.needsUpdate = true;
  
}


export function resizeWindowToCamera(camera: any, renderer: any){
    window.addEventListener( 'resize', (e)=>{

        let wrap = findElement(".expand-wrap", ()=>{})
        //console.log(wrap.innerWidth);
        
        //let camera = perspectiveCam
        innerScreenWidth = window.innerWidth
        innerScreenHeight = window.innerHeight
        camera.aspect = innerScreenWidth / innerScreenHeight;
        camera.updateProjectionMatrix();
    
        renderer.setSize( innerScreenWidth, innerScreenHeight);
    }, false );
    

}

export function calcAspectRatio(w: number, h: number){
    let ratio = w/h
    
    return ratio
}
export var innerScreenWidth = window.innerWidth
export var innerScreenHeight = window.innerHeight
var loop: any;
var canvas: any;
loop = {
    fps_LastFrame: 0,
    delta: function(){
        
        return this.currentFrame - this.fps_LastFrame
    },
    currentFrame: 0 as number
}

let frameCount = 0
const frames = [];
export function getFPS(){ 
    let fps;
    let currentframe = performance.now();
    while (frames.length > 0 && frames[0] <= currentframe - 1000) {
    frames.shift();
    }
    frames.push(currentframe);
    fps = frames.length;
    
    return fps
}

export function update(callback: any, slowOptions: any){
   
    // console.log(this.loop.fps_LastFrame);
    
     if(loop.currentFrame==0){
         console.log("update");
     }
     //console.log("update");
     if (typeof callback == "function" &&  und(window)){

        loop.currentFrame = window.requestAnimationFrame(()=>{
            innerScreenWidth = window.innerWidth
            innerScreenHeight = window.innerHeight
            
            //console.log(loop.delta());
            loop.fps_LastFrame = loop.currentFrame
            if( slowOptions == undefined || slowOptions.enabled == undefined || slowOptions.enabled == false ){
                //console.log("normal")
                callback(loop.currentFrame)
            }
            else if(slowOptions.enabled){ //&& loop.currentFrame % slowOptions.frames == 0
                frameCount++;
                
                if(loop.currentFrame % slowOptions.frames == 0){
                    //console.log("Slow", frameCount)
                    
                    callback(loop.currentFrame)
                    frameCount = 0
                }
               
                
            }
            update(callback, slowOptions)
        });
         
    }

}

export function findElement(name: string, callback: any){
   // console.log("findElement");
    
    let element: object;
    let sendBack: any;
    let data: any;
    if(und(document)){
        element = document.querySelector(name)
    }
    if(und(callback)){
        data = callback(element)
        sendBack = {
            data,
            element: element as HTMLElement
        }
        return sendBack
    }
    else{
        sendBack = {
            element
        }
    }
    return sendBack.element as HTMLElement
}

export function und(obj){
    if(obj == undefined ||
        obj==null){
            return false;
        }
    return true;
}


/*class Helpers{
    loop: any;
    canvas: any;
    constructor(){
        console.log("Helpers Class");
        
        this.loop = {
            fps_LastFrame: 0,
            delta: function(){
                
                return this.currentFrame - this.fps_LastFrame
            },
            currentFrame: 0 as number
        }

        //Object.assign(this.loop)

        //this.loop.fps_LastFrame = 0;
       
    }
    update(callback){
       // console.log(this.loop.fps_LastFrame);
        if(this.loop.currentFrame==0){
            console.log("update");
        }
        //console.log("update");
        if (typeof callback == "function" &&  this.und(window)){

            this.loop.currentFrame = window.requestAnimationFrame(()=>{
                callback(this.loop.currentFrame)
                //console.log(this.loop.delta());
                this.loop.fps_LastFrame = this.loop.currentFrame
                this.update(callback)
            });
            
        }

    }
    
    findElement(name: string, callback: any){
        console.log("findElement");
        
        let element: object;
        let sendBack: any;
        let data: any;
        if(this.und(document)){
            element = document.querySelector(name)
        }
        if(this.und(callback)){
            data = callback(element)
            sendBack = {
                data,
                element
            }
        }
        else{
            sendBack = {
                element
            }
        }
        return sendBack.element
    }

    und(obj){
        if(obj == undefined ||
            obj==null){
                return false;
            }
        return true;
    }

    
}*/
/*module HelpersMod.help {
    
}*/

//export = Helpers;


//type Exercise = Tutorial;

//let PE01: Exercise;

//const url = new URL("...");