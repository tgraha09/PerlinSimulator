import * as THREE from 'three';
export function initPerspectiveCam(renderer, perspectiveCam) {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(innerScreenWidth, innerScreenHeight);
    perspectiveCam.position.setZ(30);
}
export function rotateX(shape, key, val) {
    if (shape instanceof THREE.Vector3) {
        if (key === "x") {
            shape.x += val;
        }
        else if (key === "X") {
            shape.x -= val;
        }
    }
    else {
        if (key === "x") {
            shape.rotation.x += val;
        }
        else if (key === "X") {
            shape.rotation.x -= val;
        }
    }
}
export function rotateY(shape, key, val) {
    if (shape instanceof THREE.Vector3) {
        if (key === "y") {
            shape.y += val;
        }
        else if (key === "Y") {
            shape.y -= val;
        }
    }
    else {
        if (key === "y") {
            shape.rotation.y += val;
        }
        else if (key === "Y") {
            shape.rotation.y -= val;
        }
    }
}
export function rotateZ(shape, key, val) {
    if (shape instanceof THREE.Vector3) {
        if (key === "z") {
            shape.z += val;
        }
        else if (key === "Z") {
            shape.z -= val;
        }
    }
    else {
        if (key === "z") {
            shape.rotation.z += val;
        }
        else if (key === "Z") {
            shape.rotation.z -= val;
        }
    }
}
export function rotateShape(shape, key, val) {
    rotateX(shape, key, val);
    rotateY(shape, key, val);
    rotateZ(shape, key, val);
}
const keyboardFunctions = [];
export function addKeyboardEvent(callback) {
    keyboardFunctions.push(callback);
    document.addEventListener('keydown', function (event) {
        keyboardFunctions.forEach(func => {
            func(event.key, event.shiftKey, event.altKey);
        });
    });
}
export function KeyboardWatch(callback) {
    document.addEventListener('keydown', function (event) {
        callback(event.key);
    });
}
export function changeGeometry(geometry, callback) {
    const count = geometry.attributes.position.count;
    let previous = {};
    for (let i = 0; i < count; i++) {
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);
        const z = geometry.attributes.position.getZ(i);
        callback(geometry, { x, y, z, count }, i, previous);
        previous.matrix = { x, y, z, count };
    }
    geometry.computeVertexNormals();
    geometry.attributes.position.needsUpdate = true;
}
export function resizeWindowToCamera(camera, renderer) {
    window.addEventListener('resize', (e) => {
        let wrap = findElement(".expand-wrap", () => { });
        innerScreenWidth = window.innerWidth;
        innerScreenHeight = window.innerHeight;
        camera.aspect = innerScreenWidth / innerScreenHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerScreenWidth, innerScreenHeight);
    }, false);
}
export function calcAspectRatio(w, h) {
    let ratio = w / h;
    return ratio;
}
export var innerScreenWidth = window.innerWidth;
export var innerScreenHeight = window.innerHeight;
var loop;
var canvas;
loop = {
    fps_LastFrame: 0,
    delta: function () {
        return this.currentFrame - this.fps_LastFrame;
    },
    currentFrame: 0
};
let frameCount = 0;
const frames = [];
export function getFPS() {
    let fps;
    let currentframe = performance.now();
    while (frames.length > 0 && frames[0] <= currentframe - 1000) {
        frames.shift();
    }
    frames.push(currentframe);
    fps = frames.length;
    return fps;
}
export function update(callback, slowOptions) {
    if (loop.currentFrame == 0) {
        console.log("update");
    }
    if (typeof callback == "function" && und(window)) {
        loop.currentFrame = window.requestAnimationFrame(() => {
            innerScreenWidth = window.innerWidth;
            innerScreenHeight = window.innerHeight;
            loop.fps_LastFrame = loop.currentFrame;
            if (slowOptions == undefined || slowOptions.enabled == undefined || slowOptions.enabled == false) {
                callback(loop.currentFrame);
            }
            else if (slowOptions.enabled) {
                frameCount++;
                if (loop.currentFrame % slowOptions.frames == 0) {
                    callback(loop.currentFrame);
                    frameCount = 0;
                }
            }
            update(callback, slowOptions);
        });
    }
}
export function findElement(name, callback) {
    let element;
    let sendBack;
    let data;
    if (und(document)) {
        element = document.querySelector(name);
    }
    if (und(callback)) {
        data = callback(element);
        sendBack = {
            data,
            element: element
        };
        return sendBack;
    }
    else {
        sendBack = {
            element
        };
    }
    return sendBack.element;
}
export function und(obj) {
    if (obj == undefined ||
        obj == null) {
        return false;
    }
    return true;
}
//# sourceMappingURL=index.js.map