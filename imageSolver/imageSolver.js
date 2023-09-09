function ins(x,y){
    for(let i = 0; i<y.length;i++){
        if(x==y[i]){
            return true
        }
    }
    return false
}
/*************************************node solver code************************************/


function test(master,every,coord,half,halfbool){
    // how many boosts each node recieves
    // if every node recieves 2 or more boosts then you have optimal boost nodes 
    let counts = []
    let halfCount = []
    for(let i = 0;i<every.length;i++){
        counts.push(0)
    }
    // half array
    for(let i = 0;i<half.length;i++){
        halfCount.push(0)
    }
    // tests our list of coordinates
    for (let i = 0; i<coord.length;i++){
        // use the coordinates to find what it is refering to in master aka sorted
        temp = master[coord[i][0]][coord[i][1]]
        for (let j = 0; j<every.length;j++){
            for (let k = 0; k<temp.length;k++){
                // compare and count
                if (every[j].trim() === temp[k].trim())
                    counts[j]+=1
            }
        }   
        if(halfbool){
            for (let j = 0; j<half.length;j++){
                for (let k = 0; k<temp.length;k++){
                    // compare and count
                    if (half[j].trim() === temp[k].trim())
                        halfCount[j]+=1
                }
            }
        } 
    }
    // check the validity 
    for (let i = 0; i<counts.length;i++){
        if (counts[i] < 2)
            return false
    }
    // check half boosts
    if(halfbool){
        for (let i = 0; i<halfCount.length;i++){
            if (halfCount[i] < 1)
                
                return false
        }
    }
    // optimal boost node
    return true
}
// given our coord array of structure [[x,y],...]
// we itterate the x portion by 1 and test to see if that next combination is valid
// sorted a list of "buckets" of nodes more detail in the main function
// every a list of all useful nodes parts
// outerCheck = test1 in the python code
function outterCheck(coords,sorted,every,half,halfbool,nodeTotal){
    // max is the list of maxes for the y aka the length of the buckets in position sorted[x]
    // max1 is the list of maxes for the x's should me sorted.length,sorted.length-1,... reversed
    let max = []
    let max1 = []
    let ret = false
    // initializing max and max1
    for(let i = 0; i<coords.length;i++){
        max.push((sorted[coords[i][0]]).length)
        max1.push(sorted.length)
    }
    for (let i = 0; i<max.length;i++){
        max1[max1.length-i-1] -= i
    }
    if (innerCheck(sorted,max,coords,every,half,halfbool,nodeTotal))
        ret = true
    // you can think of this while as a bunch of nested for loops
    while(itterate(coords,max1,0)!=false){
        // max needs to change every time because the "buckets" do not have equal lengths
        max = []
        for(let i = 0; i<coords.length;i++){
            max.push(sorted[coords[i][0]].length)
        }
        // iterates the y coordinates instead of the x coordinates
        if (innerCheck(sorted,max,coords,every,half,halfbool,nodeTotal)){
            ret = true
        }
            
        // resets coords when it is done
        for(let i = 0; i<coords.length;i++){
            coords[i][1] = 0
        }
    }
    return ret
}
// what caused me 2 hours of pain
// coord is coordinate array of structure [[x,y],...]
// max is the max that x or y can go to depending on i
// i tells us whether to look at x or y
function itterate(coord,max,i){
    // base case of the recursion
    if(coord.length ===0){
        return false
    }
    // the itteration
    coord[coord.length-1][i]+=1
    // carrying over the 1 like when you add 1 to 9999999999 and you have to recursively carry over
    if (coord[coord.length-1][i]>=max[max.length-1]){
        coord[coord.length-1][i] = 0
        // the recursive (inductive) step
        let boolz = true && itterate(coord.slice(0,coord.length-1),max.slice(0,max.length-1),i)
        if (i == 0 && coord.length >1 && coord[coord.length-1][i]<= coord[coord.length-2][i]){
            coord[coord.length-1][i] = coord[coord.length-2][i]+1
        }
        return boolz
    }
    return true
}
// given our coord array of structure [[x,y],...]
// we itterate the y portion by 1 and test to see if that next combination is valid
// sorted a list of "buckets" of nodes more detail in the main function
// every a list of all useful nodes parts
// max is a list of the lengths of the "buckets" in sorted
function innerCheck(sorted,max,coord,every,half,halfbool,totalNodes){
    let ret = false
    // it isnt useful for when we change y but it is very helpful when we itterate x
    // for y we always return to 0
    if (test(sorted,every,coord,half,halfbool))
        return true
    // the itterate function was my solution to using 3-9 nested for loops
    while(itterate(coord,max,1)){
        if (test(sorted,every,coord,half,halfbool)){
            let set = []
            for(let i = 0; i<coord.length; i++){
                set.push(sorted[coord[i][0]][coord[i][1]])
            }
            totalNodes.push(set)
            ret = true
        }
    }
    return ret
}
// if you ever used python this is just a modified in opperator 
function inside(variable,array){
    for(let i = 0; i<array.length;i++){
        if (variable.trim() == array[i].trim()){
            return true
        }
    }
    return false
}
function main1(trio,node,halfB){
    // parse input into an array of strings
    let lines = trio
    let op = node
    let allowHalf = halfB.length!=0
    let halves = halfB
    // lowest number
    let optimal = Math.ceil((op.length/3)*2)
    
    let real = (op.length/3)*2
    // boolean that triggers searching from half list
    allowHalf = (optimal>real) && halves.length>0 && allowHalf

    // you can think of sorted as an array of buckets
    let sorted = []
    for (let i = 0; i<op.length;i++){
        let empty = []
        for (let j = 0; j<lines.length;j++){
            // nodes are sorted into buckets based off their starting value
            // similar to how radix sort works but we only focus on the first value
            if (lines[j][0] === op[i]){
                if(op.length<3){
                    if((inside(lines[j][1],op) || inside(lines[j][1],halves))||( inside(lines[j][2].trim(),op) || inside(lines[j][2],halves))){
                        if(lines[j][1]!=lines[j][2] && lines[j][1]!=lines[j][0] && lines[j][0]!=lines[j][2]){
                            empty.push(lines[j])
                        }     
                    }
                }
                else{
                    // remove nodes that do not have 3 optimal parts
                    if((inside(lines[j][1],op) || inside(lines[j][1],halves))&&( inside(lines[j][2].trim(),op) || inside(lines[j][2],halves))){
                        if(lines[j][1]!=lines[j][2] && lines[j][1]!=lines[j][0] && lines[j][0]!=lines[j][2]){
                            empty.push(lines[j])
                        }
                    }
                }
                
            }
        }
        if (empty.length >0){
            sorted.push(empty)
        }
    }
    if(allowHalf){
        for (let i = 0; i<halves.length;i++){
            let empty = []
            for (let j = 0; j<lines.length;j++){
                // nodes are sorted into buckets based off their starting value
                // similar to how radix sort works but we only focus on the first value
                
                if (lines[j][0] === halves[i]){
                    // remove nodes that do not have 3 optimal parts
                    if((inside(lines[j][1],op) || inside(lines[j][1],halves))&&( inside(lines[j][2].trim(),op) || inside(lines[j][2],halves))){
                        if(lines[j][1]!=lines[j][2] && lines[j][1]!=lines[j][0] && lines[j][0]!=lines[j][2]){
                            empty.push(lines[j])
                        }
                    }
                }
            }
            if (empty.length >0){
                sorted.push(empty)
            }
        }
    }
    // leng holds the length of each "bucket" in sorted 
    let leng = []
    for(let i = 0; i< sorted.length;i++){
        leng.push(sorted[i].length)
    }
    // curr is a list of coordinates [x,y] of nodes in sorted
    // this is what we test
    let curr = []
    for(let i = 0; i< optimal;i++){
        curr.push([i,0])
    }
    // impossible case
    if(sorted.length < optimal){
        return "bad input (unlock nodes or open more nodes)"
    }
    let nodeTotal = []
    // start of the brute force
    if (outterCheck(curr,sorted,op,halves,allowHalf,nodeTotal)){
        //print out the results   
        return nodeTotal
    }
    return "impossible"
}







/**************************************end of node solver code*******************************************************/
let halfBoost = document.getElementById("halfB")
let selecting = document.getElementById("classes")
let imgs = document.getElementById("imgL")
let checking = document.getElementById("lastCheck")

var file = {Adele:['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
AngelicBuster:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Aran:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Ark:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
BattleMage:['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
BeastTamer:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S15.png', 'S16.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Bishop:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
Blaster:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
BlazeWizard:['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Bowmaster:['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Buccaneer:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
Cadena:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
CannonMaster:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S15.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Corsair:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
DarkKnight:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
DawnWarrior:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
DemonAvenger:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
DemonSlayer:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S15.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
DualBlade:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S15.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Evan:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
FirePoison:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Hayato:['S14.png', 'S17.png', 'S19.png', 'S2.png', 'S20.png', 'S21.png', 'S22.png', 'S23.png', 'S5.png', 'S8.png'],
Hero:['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Hoyoung:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
IceLightning:['S1.png', 'S10.png', 'S11.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Illium:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
Jett:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Kain:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
Kaiser:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Kanna:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S15.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Khali:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Kinesis:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Lara:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
Luminous:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Marksman:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png'],
Mechanic:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Mercedes:['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Mihile:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
NightLord:['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
NightWalker:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Paladin:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
PathFinder:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Phantom:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Shade:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S15.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Shadower:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
ThunderBreaker:['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
WildHunter:['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
WindArcher:['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Xenon:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Zero:['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png']};
var classes = ["Adele","AngelicBuster","Aran","Ark","BattleMage","BeastTamer","Bishop","Blaster","BlazeWizard","Bowmaster","Buccaneer","Cadena","CannonMaster","Corsair","DarkKnight","DawnWarrior","DemonAvenger","DemonSlayer","DualBlade","Evan","FirePoison","Hayato","Hero","Hoyoung","IceLightning","Illium","Jett","Kain","Kaiser","Kanna","Khali","Kinesis","Lara","Luminous","Marksman","Mechanic","Mercedes","Mihile","NightLord","NightWalker","Paladin","PathFinder","Phantom","Shade","Shadower","ThunderBreaker","WildHunter","WindArcher","Xenon","Zero"]
directory = "../resources/"
let referenceList = []
let halfreference = []
let stateList = []
let halfState = []
for(let i = 0; i<classes.length;i++){
    option = document.createElement("option")
    option.text = classes[i]
    option.value = classes[i]
    selecting.add(option)
}
imgs.innerHTML = ''
let clas = 'Adele'
for(let i = 0; i<file[clas].length;i++){
    let image = document.createElement("img")
    let halfimage = document.createElement("img")
    image.src = directory+clas+"/"+file[clas][i]
    halfimage.src = directory+clas+"/"+file[clas][i]
    image.classList.add("nodeLib"); 
    halfimage.classList.add("halfLib"); 
    image.addEventListener("click",(event)=>{
        stateList[referenceList.indexOf(event.target)] = !stateList[referenceList.indexOf(event.target)]
        if(stateList[referenceList.indexOf(event.target)]){
            event.target.style.border = "5px solid #0090ff";
        }
        else{
            event.target.style.border = "";
        }
    })
    halfimage.addEventListener("click",(event)=>{
        let check = false
        for(let i = 0; i<halfState.length;i++){
            check = check || halfState[i]
        }
        if((halfState[halfreference.indexOf(event.target)] && check) || !check){
            halfState[halfreference.indexOf(event.target)] = !halfState[halfreference.indexOf(event.target)]
        }
        if(halfState[halfreference.indexOf(event.target)]){
            event.target.style.border = "5px solid #0090ff";
        }
        else{
            event.target.style.border = "";
        }
    })
    referenceList.push(image)
    halfreference.push(halfimage)
    stateList.push(false)
    halfState.push(false)
    imgs.appendChild(image)
    halfBoost.append(halfimage)
}
selecting.addEventListener("change",(event) => {
    referenceList = []
    stateList = []
    halfreference = []
    halfState = []
    halfBoost.innerHTML = ''
    imgs.innerHTML = ''
    clas = event.target.value
    for(let i = 0; i<file[clas].length;i++){
        let image = document.createElement("img")
        let halfimage = document.createElement("img")
        image.src = directory+clas+"/"+file[clas][i]
        halfimage.src = directory+clas+"/"+file[clas][i]
        image.classList.add("nodeLib"); 
        halfimage.classList.add("halfLib"); 
        image.addEventListener("click",(event)=>{
            stateList[referenceList.indexOf(event.target)] = !stateList[referenceList.indexOf(event.target)]
            if(stateList[referenceList.indexOf(event.target)]){
                event.target.style.border = "5px solid #0090ff";
            }
            else{
                event.target.style.border = "";
            }
        })
        halfimage.addEventListener("click",(event)=>{
            let check = false
            for(let i = 0; i<halfState.length;i++){
                check = check || halfState[i]
            }
            if((halfState[halfreference.indexOf(event.target)] && check) || !check){
                halfState[halfreference.indexOf(event.target)] = !halfState[halfreference.indexOf(event.target)]
            }
            if(halfState[halfreference.indexOf(event.target)]){
                event.target.style.border = "5px solid #0090ff";
            }
            else{
                event.target.style.border = "";
            }
        })
        referenceList.push(image)
        halfreference.push(halfimage)
        stateList.push(false)
        halfState.push(false)
        imgs.appendChild(image)
        halfBoost.append(halfimage)
    }

  });
const droparea = document.querySelector('html');
const droppable = () => droparea.style.border = 'solid red 5px';
['dragenter', 'dragover'].forEach(e => droparea.addEventListener(e, droppable));
const prevent = (e) => e.preventDefault();
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(e => droparea.addEventListener(e, prevent));
const nodrop = () => droparea.style.border = '';
['dragleave', 'drop'].forEach(e => droparea.addEventListener(e, nodrop));
const dropimages = async (e) => {
    let data = e.dataTransfer;
    let files = [...data.files];

    for (let file of files) {
        if (file.type !== 'image/png'){
            continue;
        } 
        let tempim = document.createElement("img")
        let showim = document.createElement("img")
        showim.width = 400
        let source = URL.createObjectURL(file);
        tempim.src = source
        showim.classList.add("theShown");
        showim.src = source
        showim.addEventListener('click',(event)=>{
            let curr = event.target
            let shown = document.getElementsByClassName('theShown')
            let index = 0
            for(let i = 0;i<shown.length;i++){
                if(shown[0]==curr){
                    index = i
                }
            }
            let rev = readimgs.splice(index,1)
            curr.remove()
            rev[0].remove()
            
        })
        readimgs.push(tempim)
        checking.appendChild(showim)
    }
};
droparea.addEventListener('drop', dropimages);

document.onpaste = async (event) => {
  
    let items = (event.clipboardData ?? event.originalEvent.clipboardData).items;
    for (const item of items) {
      if (item.kind === "file") {
        let tempim = document.createElement("img")
        let showim = document.createElement("img")
        showim.width = 400
        let blob = item.getAsFile();
        let source = URL.createObjectURL(blob);
        tempim.src = source
        showim.src = source
        showim.classList.add("theShown");
        showim.addEventListener('click',(event)=>{
            let curr = event.target
            let shown = document.getElementsByClassName('theShown')
            let index = 0
            for(let i = 0;i<shown.length;i++){
                if(shown[0]==curr){
                    index = i
                }
            }
            let rev = readimgs.splice(index,1)
            curr.remove()
            rev[0].remove()
        })
        readimgs.push(tempim)
        checking.appendChild(showim)
      }
    }
}

selecting.value = "Adele"


