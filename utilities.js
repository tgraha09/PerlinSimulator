

function checkType(name, callback, newcall){
    //console.log(this.getTypeName(callback));
    if(typeof callback === name && typeof newcall == "function"){
        newcall(callback)
    }
    else{
        console.log("Parameter Type: " + this.getTypeName(callback));
    }
}
let previousframe
const frames = [];
const listofTypes = {
    function: "function",
    bigint: "bigint",
    boolean: "boolean",
    number: "number",
    string: "string",
    object: "object",
    symbol: "symbol",
    undefined: "undefined"

}



    
function lineIntersect(p1, p2, p3, p4){
    let x1=p1.x,y1=p1.y,x2=p2.x,y2=p2.y, x3=p3.x,y3=p3.y,x4=p4.x,y4=p4.y
    var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    if (isNaN(x)||isNaN(y)) {
        return false;
    } else {
        if (x1>=x2) {
            if (!(x2<=x&&x<=x1)) {return false;}
        } else {
            if (!(x1<=x&&x<=x2)) {return false;}
        }
        if (y1>=y2) {
            if (!(y2<=y&&y<=y1)) {return false;}
        } else {
            if (!(y1<=y&&y<=y2)) {return false;}
        }
        if (x3>=x4) {
            if (!(x4<=x&&x<=x3)) {return false;}
        } else {
            if (!(x3<=x&&x<=x4)) {return false;}
        }
        if (y3>=y4) {
            if (!(y4<=y&&y<=y3)) {return false;}
        } else {
            if (!(y3<=y&&y<=y4)) {return false;}
        }
    }
    return true;
}

let ticker = 0;
//let currentLoop = undefined
let loopActive = false

export const utilities = {
    /**
     * 
     * @param {Function} callback
     * 
     */
    load(callback){
        checkType(listofTypes["function"], callback, (call)=>{
            window.onload = call
        })
    },
    lineIntersect: lineIntersect,
    domLoaded(callback){
        checkType("function", callback, (call)=>{
            window.addEventListener('DOMContentLoaded', (event) => {
                //console.log('DOM fully loaded and parsed');
                call(event)
            })
          
           // document.domcon
        })
    },getFPS() { 
        let fps;
        let currentframe = performance.now();
        while (frames.length > 0 && frames[0] <= currentframe - 1000) {
        frames.shift();
        }
        frames.push(currentframe);
        fps = frames.length;
        
        return fps
    },
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomColor(){
        function getByte(){
            return 55 + Math.round(Math.random() * 200);
        }
        return "rgba(" + getByte() + "," + getByte() + "," + getByte() + ",.8)";
    },
    getRandomVertex(minX = 0, maxX, minY = 0, maxY){
        let that = self
        //console.log(that);
        
        return {x:this.getRandomInt(minX, maxX), y:this.getRandomInt(minY, maxY)}
    },
    checkType: checkType,
    getTypeName(type){ 
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((type).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    },
    each(arr, callback){
        let end = false;
        if (typeof callback == "function"){
            for(let i = 0; i < arr.length && end == false; i++){
                if(arr.length - i == 1){
                    end = true
                }
                let next = callback(arr[i], i, end)
                if(next){
                    //console.log("NEXT");
                    continue
                }
               
            }
        }
    },operatoins: [],
    loop(callback){
        if(loopActive == false){
            loopActive = true
        }
        
       // console.log(utilities.exitLoop);
        //utilities
        if(utilities.exitLoop == undefined){
            utilities.exitLoop= false
        }
        //console.log(utilities.exitLoop);
       // utilities.operatoins = utilities.distinct(utilities.operatoins)
        //utilities.operatoins.push(callback)
        //console.log(callback.caller.name)
        if (typeof callback == "function"){
            //console.log(utilities.exitLoop);
            if(utilities.exitLoop == false){
                globalThis.currentLoop = window.requestAnimationFrame(()=>{

                    if(utilities.exitLoop == false){
                    /*  each(utilities.operatoins, (u, i)=>{
                            //log(u)
                            utilities.exitLoop = u(utilities.exitLoop, ticker)
                        })*/
                        utilities.exitLoop = callback(utilities.exitLoop, ticker)
                        ticker++
                        utilities.loop(callback)
                    }
                    
                    //console.log(utilities.currentLoop);
                });
            }
            else{
                //console.log("out");
                ticker = 0
                window.cancelAnimationFrame(globalThis.currentLoop);
                globalThis.currentLoop = undefined
                utilities.exitLoop = undefined
            }
              
            
            
        }
       // utilities.operatoins = utilities.distinct(utilities.operatoins)
    },
    distinct(arr){
        let unique = (value, index, self)=>{
            return self.indexOf(value) === index;
        }
        return arr.filter(unique)
    },
    query(queryName){
        return document.querySelector(queryName)
    },
    findElement(queryName, eventName, callback){
        let element = document.querySelector(queryName)
        
        //console.log(eventName);
        element?.addEventListener(eventName, (event)=>{
            callback(element, event)
        })
        
        return element
    },
    removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        if(parent.children.length == 0){
            return true
        }

        return false
    },
    moveChildren(src, dest){
        let srcChildren = src.children
        each(srcChildren, (s, i)=>{
            let clone = s.cloneNode(true)
            dest.append(clone)
            //log(s)
        })
        utilities.removeAllChildNodes(src)
        console.log(dest.children);
        //log(src.children);
        //log(dest.children)
    },
    withinRange(low, mid, high, equalto=false){
        
        if(equalto){
            if(mid <= high && mid >= low && low < high){
                return true
            }
        }
        else{
            if(mid < high && mid > low && low < high){
                return true
            }
        }
        
        return false
    },
    getCSSRules(el) {
        var sheets = document.styleSheets, ret = [];
        el.matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector 
            || el.msMatchesSelector || el.oMatchesSelector;
        for (var i in sheets) {
            var rules = sheets[i].rules || sheets[i].cssRules;
            for (var r in rules) {
                if (el.matches(rules[r].selectorText)) {
                    ret.push(rules[r].cssText);
                }
            }
        }
        return ret;
    }
}

typeof t == ""


globalThis.query = utilities.query
globalThis.types = listofTypes
globalThis.domLoaded = utilities.domLoaded
globalThis.log = console.log
globalThis.load = utilities.load
globalThis.findElement = utilities.findElement
globalThis.each = utilities.each
globalThis.utils = utilities
globalThis.loop = utilities.loop