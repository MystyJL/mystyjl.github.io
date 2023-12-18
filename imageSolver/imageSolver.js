function ins(x,y){
    for(let i = 0; i<y.length;i++){
        if(x==y[i]){
            return true
        }
    }
    return false
}
/**********************************************************node solver code**********************************************************/
function binarySearch(array,element){
    start = 0
    end = array.length-1
    while(start<=end){
        curr = (start+end)//2
        if(array[curr] == element){
            return curr
        }
        messanger = (array[curr]<element)
        start = (messanger*(curr+1))+((!messanger)*start)
        end = ((!messanger)*(curr-1))+((messanger)*end)
    }
    return -1
}

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
        for (let k = 0; k<temp.length;k++){
            // compare and count
            counts[binarySearch(every,temp[k].trim())]++
        }  
        if(halfbool){
            for (let k = 0; k<temp.length;k++){
                // compare and count
                halfCount[binarySearch(half,temp[k])]++
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
    let pos = coord.length-1
    let carry = true
    let stack = coord.length
    while(pos>=0 && carry){
        coord[pos][i] = (coord[pos][i]+carry)%(max[pos])
        carry = (coord[pos][i]==0)
        if(carry){
            stack = pos
            pos--;
        }
        
    }
    if(stack<=0){
        return false
    }
    for(let j = stack+(coord.length*(i!=0)); j<coord.length;j++){
        coord[j][i] = coord[j-1][i]+1
    }
    return (pos>=0)

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
    if (test(sorted,every,coord,half,halfbool)){
        let set = []
        for(let i = 0; i<coord.length; i++){
            set.push(sorted[coord[i][0]][coord[i][1]])
        }
        totalNodes.push(set)
        ret = true
    }        
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
    let cleanLines = []
    op.sort()
    let allowHalf = halfB.length!=0
    let halves = halfB
    // lowest number
    let optimal = Math.ceil((op.length/3)*2)
    
    let real = (op.length/3)*2
    // boolean that triggers searching from half list
    allowHalf = (optimal>real) && halves.length>0 && allowHalf
    let halfing = op.length%3==1
    // you can think of sorted as an array of buckets
    let sorted = []
    let trueLength = []
    let remaining = []
    for (let i = 0;i<lines.length;i++){
        if(lines[i][1]!=lines[i][2] && lines[i][1]!=lines[i][0] && lines[i][0]!=lines[i][2]){
            cleanLines.push(lines[i])
        }
        if(inside(lines[i][0],remaining) && !inside(lines[i][0],op)){
            remaining.push(lines[i][0])
        }
    }
    for (let i = 0; i<op.length;i++){
        let empty = []
        let trueEvery = []
        for (let j = 0; j<cleanLines.length;j++){
            // nodes are sorted into buckets based off their starting value
            // similar to how radix sort works but we only focus on the first value
            if (cleanLines[j][0] === op[i]){
                trueEvery.push(cleanLines[j])
                let counter = 0
                for(let k = 1; k<3;k++){
                    if(inside(cleanLines[j][k],op) || inside(cleanLines[j][k],halves)){
                        counter+=1
                    }
                }
                if(op.length<3 || halfing){
                    if(counter >= 1){
                        empty.push(cleanLines[j])
                    }
                }
                else{
                    // remove nodes that do not have 3 optimal parts
                    if(counter == 2){
                        empty.push(cleanLines[j])
                    }
                }
                
            }
        }
        if (empty.length >0){
            sorted.push(empty)
            trueLength.push(trueEvery)
        }
    }
    
    if(allowHalf){
        for (let i = 0; i<halves.length;i++){
            let empty = []
            let trueEvery = []
            for (let j = 0; j<cleanLines.length;j++){
                // nodes are sorted into buckets based off their starting value
                // similar to how radix sort works but we only focus on the first value
                
                if (cleanLines[j][0] === halves[i]){
                    let counter = 0
                    for(let k = 1; k<3;k++){
                        if(inside(cleanLines[j][k],op) || inside(cleanLines[j][k],halves)){
                            counter+=1
                        }
                    }
                    trueEvery.push(cleanLines[j])
                    // remove nodes that do not have 3 optimal parts
                    if(counter==2){
                        empty.push(cleanLines[j])

                    }
                }
            }
            if (empty.length >0){
                sorted.push(empty)
                trueLength.push(trueEvery)
            }
        }
    }
    if(halfing){
        for (let i = 0; i<remaining.length;i++){
            let empty = []
            let trueEvery = []
            for (let j = 0; j<cleanLines.length;j++){
                // nodes are sorted into buckets based off their starting value
                // similar to how radix sort works but we only focus on the first value
                if (cleanLines[j][0] === remaining[i]){
                    trueEvery.push(cleanLines[j])
                    let counter = 0
                    for(let k = 1; k<3;k++){
                        if(inside(cleanLines[j][k],op) || inside(cleanLines[j][k],halves)){
                            counter+=1
                        }
                    }
                    if(counter >= 2){
                        empty.push(cleanLines[j])
    
                    }                 
                }
            }
            if (empty.length >0){
                sorted.push(empty)
                trueLength.push(trueEvery)
            }
        }
    }
    console.log(sorted)
    sortedInOrder = []
    for(let i = 0; i<sorted.length;i++){
        sortedInOrder.push(sorted[i][0][0])
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
        for(let i = 0; i<nodeTotal.length;i++){
            nodeTotal[i] = JSON.stringify(nodeTotal[i])
        }
        let uniqueNodeTotal= [...(new Set(nodeTotal))]
        for(let i = 0; i<uniqueNodeTotal.length;i++){
            
            uniqueNodeTotal[i] = JSON.parse(uniqueNodeTotal[i])
            for(let j = 0; j<uniqueNodeTotal[i].length;j++){
                uniqueNodeTotal[i][j].push(trueLength[sortedInOrder.indexOf(uniqueNodeTotal[i][j][0])].length)
            }
            
        }
        return uniqueNodeTotal
    }
    return "impossible"
}
/******************************************************end of node solver code*******************************************************/








function filler(clas){
    referenceList = []
    stateList = []
    halfreference = []
    halfState = []
    halfBoost.innerHTML = ''
    imgs.innerHTML = ''
    for(let i = 0; i<file[clas].length;i++){
        let grouping = document.createElement("td")
        let halfGroup = document.createElement("td")
        let image = document.createElement("img")
        let para = document.createElement("p")
        let paraHalf = document.createElement("p")
        let texty = document.createTextNode(skillNames[clas][i])
        let textyhalf = document.createTextNode(skillNames[clas][i])
        let halfimage = document.createElement("img")
        image.src = directory+clas+"/"+file[clas][i]
        halfimage.src = directory+clas+"/"+file[clas][i]
        para.appendChild(texty)
        paraHalf.appendChild(textyhalf)
        halfGroup.appendChild(halfimage)
        halfGroup.appendChild(paraHalf)
        grouping.appendChild(image)
        grouping.appendChild(para)
        halfGroup.classList.add("requirements");
        grouping.classList.add("requirements");
        image.classList.add("nodeLib"); 
        para.classList.add("formatting");
        paraHalf.classList.add("formatting");
        halfimage.classList.add("halfLib"); 
        grouping.addEventListener("click",(event)=>{
            stateList[referenceList.indexOf(grouping)] = !stateList[referenceList.indexOf(grouping)]
            if(stateList[referenceList.indexOf(grouping)]){
                grouping.style.border = "5px solid #0090ff";
            }
            else{
                grouping.style.border = "1px solid #000000";
            }
        })
        halfGroup.addEventListener("click",(event)=>{
            let check = false
            for(let i = 0; i<halfState.length;i++){
                check = check || halfState[i]
            }
            if((halfState[halfreference.indexOf(halfGroup)] && check) || !check){
                halfState[halfreference.indexOf(halfGroup)] = !halfState[halfreference.indexOf(halfGroup)]
            }
            if(halfState[halfreference.indexOf(halfGroup)]){
                halfGroup.style.border = "5px solid #0090ff";
            }
            else{
                halfGroup.style.border = "1px solid #000000";
            }
        })
        referenceList.push(grouping)
        halfreference.push(halfGroup)
        stateList.push(false)
        halfState.push(false)
        imgs.appendChild(grouping)
        halfBoost.append(halfGroup)
    }
}
let halfBoost = document.getElementById("halfB")
let selecting = document.getElementById("classes")
let imgs = document.getElementById("imgL")
let checking = document.getElementById("lastCheck")

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
// initial load
let clas = 'Adele'
filler(clas)

selecting.addEventListener("change",(event) => {
    clas = event.target.value
    filler(clas)

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


