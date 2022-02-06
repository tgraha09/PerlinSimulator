import * as THREE from 'three'

export function Test(){
    console.log("TEST");
}

export class Torus{
    constructor(radius, tube, radialsegments, tubesegments, arc, color, wireframe){
        Object.assign(this, radius, tube, radialsegments, tubesegments, arc, color, wireframe)
        const geometry = new THREE.TorusGeometry(10,3,16,100)
        var basicMat = new THREE.MeshBasicMaterial({color:0xFF6347, wireframe: true})
        return new THREE.Mesh(geometry, basicMat)
    }


}