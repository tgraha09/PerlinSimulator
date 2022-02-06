import * as THREE from 'three'
import { Vector3, Vector2 } from "three";
export function Test(){
    console.log("TEST");
}

/*const Torus = (radius, tube, radialsegments, tubesegments, arc, color, wireframe)=>{
    const geometry = new THREE.TorusGeometry(10,3,16,100)
    var basicMat = new THREE.MeshBasicMaterial({color:0xFF6347, wireframe: true})
    return new THREE.Mesh(geometry, basicMat)
}*/
//https://discourse.threejs.org/t/three-geometry-will-be-removed-from-core-with-r125/22401

export class PlaneGeometry{
    constructor(w=30,h=30,ws=200,hs=200, color=0xf2a23a){
        this.color = color
        this.geometry = new THREE.PlaneBufferGeometry(w,h,ws,hs)
        this.material = new THREE.MeshBasicMaterial( { color: this.color } );
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.rot = this.mesh.rotation
        this.pos = this.mesh.position
        //console.log(this);
    }

    get position(){
        return this.pos
    }

    set position(pos){
        this.pos.set(pos.x, pos.y, pos.z)
    }
    get rotation(){
        return this.rot
    }

    set rotation(rot){
        this.rot.set(rot.x, rot.y, rot.z)
    }
}

export class TriangleGeometry{
    constructor(v1={x:-10,y:-10,z:0}, v2={x:10,y:-10,z:0}, v3={x:10,y:10,z:0}, color=0xff0000){
        //console.log(v1 instanceof );
        //Vector3.name
        this.init(v1,v2,v3)
        this.color = color
        
        const vertices = new Float32Array( [
            v1.x, v1.y, v1.z,
            v2.x, v2.y, v2.z,
            v3.x, v3.y, v3.z,
        ] );
        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

        this.material = new THREE.MeshBasicMaterial( { color: this.color } );
        this.mesh = new THREE.Mesh( this.geometry, this.material )
        this.rot = this.mesh.rotation
        //console.log(this.v1);
    }

    get position(){
        return this.pos
    }

    set position(pos){
        this.pos.set(pos.x, pos.y, pos.z)
    }
    get rotation(){
        return this.rot
    }

    set rotation(rot){
        this.rot = rot
    }

    init(v1,v2,v3){
        if(v1 instanceof Vector3){
            this.v1 = v1
        }
        else{
            this.v1 = new Vector3(v1.x, v1.y, v1.z)
        }
        if(v2 instanceof Vector3){
            this.v2 = v2
        }
        else{
            this.v2 = new Vector3(v2.x, v2.y, v2.z)
        }
        if(v3 instanceof Vector3){
            this.v3 = v3
        }
        else{
            this.v3 = new Vector3(v3.x, v3.y, v3.z)
        }
    }
}

export class TorusGeometry{
    constructor(radius, tube, radialsegments, tubesegments, color, wireframe){
        Object.assign(this, radius, tube, radialsegments, tubesegments, color, wireframe)
        this.geometry = new THREE.TorusGeometry(radius, tube, radialsegments, tubesegments)
        this.basicMaterial = new THREE.MeshBasicMaterial({color, wireframe})
        this.standardMaterial = new THREE.MeshStandardMaterial({color})
        this.mesh = new THREE.Mesh(this.geometry, this.basicMaterial)
        this.rot = this.mesh.rotation
        this.pos = this.mesh.position
        //return {mesh: this.mesh}
    }

    get position(){
        return this.pos
    }

    set position(pos){
        this.pos.set(pos.x, pos.y, pos.z)
    }
    get rotation(){
        return this.rot
    }

    set rotation(rot){
        this.rot = rot
    }
}