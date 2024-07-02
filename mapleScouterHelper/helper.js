var m1 = document.getElementById('m1');
var m2 = document.getElementById('m2');
var m3 = document.getElementById('m3');
var m4 = document.getElementById('m4');

var s1 = document.getElementById('s1');
var s2 = document.getElementById('s2');
var s3 = document.getElementById('s3');
var s4 = document.getElementById('s4');

var t1 = document.getElementById('t1');
var t2 = document.getElementById('t2');
var t3 = document.getElementById('t3');
var t4 = document.getElementById('t4');
// add in half boost functionality
var halfBoost = document.getElementById("half"); 
var trios = document.getElementById('trio');
var out = document.getElementById('output');
var calc = document.getElementById('calc');
function helper(base,percent,flat,total){
    b = parseInt(base)
    p = parseInt(percent)
    f = parseInt(flat)
    t = parseInt(total)
    for (let flatOffset = 0; flatOffset<50;flatOffset++){
        for (let baseOffset = 0; baseOffset<50;baseOffset++){
            for (let percentOffset = 0; percentOffset<50;percentOffset++){
                let calcTotal = (b+baseOffset)*(((p+percentOffset)/100)+1)+(f+flatOffset)
                calcTotal = Math.floor(calcTotal)
                if (t == calcTotal){
                    return [b+baseOffset,p+percentOffset,f+flatOffset]
                }
            }
        }
    }
    return "Bad input"
}
function main(storage){
    var m1o = document.getElementById('m1o');
    var m2o = document.getElementById('m2o');
    var m3o = document.getElementById('m3o');

    var s1o = document.getElementById('s1o');
    var s2o = document.getElementById('s2o');
    var s3o = document.getElementById('s3o');

    var t1o = document.getElementById('t1o');
    var t2o = document.getElementById('t2o');
    var t3o = document.getElementById('t3o');
    var tidy = [[m1o,m2o,m3o],[s1o,s2o,s3o],[t1o,t2o,t3o]]
    mainStat = helper(storage[0],storage[1],storage[2],storage[3])
    second = helper(storage[4],storage[5],storage[6],storage[7])
    third = helper(storage[8],storage[9],storage[10],storage[11])
    ease = [mainStat,second,third]
    // cleaning
    for(let i = 0; i<3;i++){
        for(let j = 0;j<3;j++){
            tidy[i][j].innerHTML = ""
        }
    }
    for(let i = 0; i<3;i++){
        if(ease[i]=="bad input"){
            for(let j = 0;j<3;j++){
                tidy[i][j].appendChild(document.createTextNode("bad input")) 
            }
        }
        else{
            for(let j = 0;j<3;j++){
                tidy[i][j].appendChild(document.createTextNode(ease[i][j])) 
            }
        }
    }
    
}
function loadStorage(){
    storage = [0,0,0,0,0,0,0,0,0,0,0,0]
    if (localStorage.getItem("storage")!=null){
        storage = JSON.parse(localStorage.storage);
    }
    m1.value = storage[0];
    m2.value = storage[1];
    m3.value = storage[2];
    m4.value = storage[3];

    s1.value = storage[4];
    s2.value = storage[5];
    s3.value = storage[6];
    s4.value = storage[7];

    t1.value = storage[8];
    t2.value = storage[9];
    t3.value = storage[10];
    t4.value = storage[11];

}
function store(storage){
    localStorage.storage= JSON.stringify(storage);
}
calc.addEventListener('click', function(evt) {
    storage = [m1.value,m2.value,m3.value,m4.value,s1.value,s2.value,s3.value,s4.value,t1.value,t2.value,t3.value,t4.value]
    store(storage)
    main(storage)
})
document.addEventListener("DOMContentLoaded", function() {
    loadStorage()
  });