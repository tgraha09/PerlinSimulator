import './style.css'
import * as THREE from 'three'

import { innerScreenWidth, innerScreenHeight, findElement, und, addKeyboardEvent, changeGeometry,
  resizeWindowToCamera, initPerspectiveCam, update, 
  calcAspectRatio, KeyboardWatch, rotateShape, rotateX, rotateY, rotateZ, getFPS } from './utilities/index.js'
import * as Shapes from './shapes'
import { V3, V2 } from './vertex'
import { Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let screenWidth = innerScreenWidth || window.innerWidth
let screenHeight = innerScreenHeight || window.innerHeight


var aspectRatio = calcAspectRatio(screenWidth, screenHeight)
const scene = new THREE.Scene()
const canvas = findElement(".app")
const ctx = canvas.getContext('2D')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
}); //https://github.com/tamani-coding/threejs-buffergeometry-examples/blob/main/src/terrain_editor.ts
renderer.setSize(innerScreenWidth, innerScreenHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true

var fov = 75

const perspectiveCam = new THREE.PerspectiveCamera(fov, aspectRatio, 0.1, 1000) //human eye
/*perspectiveCam.position.y = 25;
perspectiveCam.position.z = 50;
perspectiveCam.position.x = -50;*/
let info

window.onload = ()=>{
  resizeWindowToCamera(perspectiveCam, renderer)
  initPerspectiveCam(renderer, perspectiveCam)
  addKeyboardEvent((key)=>{
    //console.log(key);
    if(key ==="r"){
      plane.rotation.set(rot.x, rot.y, rot.z)
    }
    //console.log(planeGeometry.attributes.position.array);
    rotateShape(plane, key, 0.02)
  })
  console.log("Load");
  info = findElement('#info')
  console.log(info);
  //document.body.textContent
}



const controls = new OrbitControls(perspectiveCam, renderer.domElement);
controls.target = new THREE.Vector3(0, 0, -25);
controls.update();

//initKeyboardWatch()
//perspectiveCam.position.y = -Math.cos(.05) * 25;
//perspectiveCam.lookAt( new Vector3(20,20,20))

//var standardMat = new THREE.MeshStandardMaterial({color:0xFF6347})
//new Torus(10,3,16,100, 0xFF6347, true)
let torus = new Shapes.TorusGeometry(10,3,16,100, 0xFF6347, true)//new THREE.Mesh(geometry, basicMat)
let pos = new Vector3(0,0,0)
let planeGeometry = new THREE.PlaneBufferGeometry(30, 30, 200, 200);
const geometryCount = planeGeometry.attributes.position.count;
console.log(geometryCount);
let plane = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial({ color: 0xf2a23a }));//new THREE.PlaneBufferGeometry(30, 30, 200, 200);//new Shapes.PlaneGeometry(30,30,200,200)
plane.receiveShadow = true;
plane.castShadow = true;
plane.castShadow = true;
let rot = new Vector3(125, 0, 0)
plane.rotation.set(rot.x, rot.y, rot.z)
/*plane.rotation.x = - Math.PI / 2;
plane.rotation.z = - Math.PI/4.25;
plane.position.z = 0;
plane.position.x = -20;*/
//controls.update()
//let triangle = new Shapes.TriangleGeometry() //pos

scene.background = new THREE.Color(0x808080);

//scene.add(torus.mesh)
//scene.add(triangle.mesh)
scene.add(plane)
//console.log(torus);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

scene.add(ambientLight)
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);

/*dirLight.position.x += 40
dirLight.position.y += 60
dirLight.position.z = -40
dirLight.castShadow = true
dirLight.shadow.mapSize.width = 4096;
dirLight.shadow.mapSize.height = 4096;
const d = 100;
dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;*/
scene.add(dirLight);

/*let dirTarget = new THREE.Object3D()
dirTarget.position.z = -20
dirLight.target = dirTarget
dirLight.target.updateMatrixWorld()
dirLight.shadow.camera.lookAt(0,0-30)*/

//directionalLight.position = new THREE.Vector3(0,0,10);
//directionalLight.shadow.camera.lookAt(0,0,-30);



const cameraHelper = new THREE.CameraHelper(dirLight.shadow.camera)

const directionalHelper = new THREE.DirectionalLightHelper(dirLight, 5)
scene.add(directionalHelper)
//scene.add(cameraHelper)

//directionalLight.shadow.camera.lookAt(0,0,-300)
//directionalLight.position.set(0,100,0)


// CLICK EVENT
const raycaster = new THREE.Raycaster(); // create once
const clickMouse = new THREE.Vector2();  // create once
const vector3 = new THREE.Vector3();   // create once
const MAX_CLICK_DISTANCE = 10



let slowOptions = {
  enabled: true,
  frames: 1
}
function render(){
  controls.update()
  renderer.render(scene, perspectiveCam)
  findElement('#info').textContent = `FPS: ${getFPS()}`
}
update((tick)=>{
  render()
  changeGeometry(planeGeometry, (geometry, matrix, i, prev)=>{
    if(tick < 2){
      let geocolumn = 0
      if(Number.isInteger(i/200)){
        geocolumn = i/200
      }
      //matrix
      if ( i == 0){
        console.log("Start");
        console.log(matrix);
      }
      else if(i == matrix.count-1){
        console.log("End");
        console.log(matrix);
      }
      
    }
    
    //planeGeometry.attributes.position.
    //geometry.attributes.position.setZ(i, Math.random(0, 100));
    if(i < matrix.count/2){ //matrix.count/2
      geometry.attributes.position.setZ(i, Math.random(0, 100));
    }
    if(i % 3 == 0){
      //planeGeometry.attributes.position.
      //console.log(i);
      
      //geometry.attributes.position.setZ(i, 2);
      //geometry.attributes.position.setZ(i, Math.random());
      
    }
    else{
      
    }
    //const xangle = matrix.x + Date.now() / 300;
    //const xsin = Math.sin(xangle)
    //geometry.attributes.position.setZ(i, xsin);
  })
  if(tick > 20){
    //return true
  }
  
    
  

   
    
}, slowOptions)


/*(geometry)=>{
      const now = Date.now() / 300;
        for (let i = 0; i < count; i++) {
            const x = geometry.attributes.position.getX(i);

            // SINE WAVE
            const xangle = x + now
            const xsin = Math.sin(xangle)
            geometry.attributes.position.setZ(i, xsin);
        }
    }*/


//let app = findElement(".app")



//console.log(app);