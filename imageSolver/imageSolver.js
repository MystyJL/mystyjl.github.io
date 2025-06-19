function ins(x,y){
    for(let i = 0; i<y.length;i++){
        if(x==y[i]){
            return true
        }
    }
    return false
}
/**********************************************************node solver code**********************************************************/
class Solver{
    constructor(){
    }
    inner(variable,array, comparison){
        for(let i = 0; i<array.length;i++){
            if (comparison(variable,array[i])){
                return true
            }
        }
        return false
    }
    compare(a,b){
        if (a[0]==b[0]&&((a[1] == b[1] && a[2] == b[2]) || (a[1] == b[2] && a[2] == b[1]))){
            return true
        }
        return false
    }
    inside(variable,array){
        for(let i = 0; i<array.length;i++){
            if (variable.trim() == array[i].trim()){
                return true
            }
        }
        return false
    }
    swap(array,a,b){
        let c = array[a]
        array[a] = array[b]
        array[b] = c 
    }
    doubleSort(noDupe, trueLength){
        for(let i = 0; i<trueLength.length-1;i++){
            let highest = i
            let highestValue =trueLength[i]
            for(let j = i+1; j<trueLength.length;j++){
                if(highestValue<trueLength[j]){
                    highestValue = trueLength[j]
                    highest = j
                }
            }
            this.swap(noDupe,i,highest)
            this.swap(trueLength,i,highest)
        }
    }
    // insert an element into a position and shift over the elements to the right of it 
    insert(noDupe,trueLength,position,element){
        for(let i = position; i<element; i++){
            this.swap(noDupe,i,element)
            this.swap(trueLength,i,element)
        }
    }
    binarySearch(array,element){
        let start = 0
        let end = array.length-1
        while(start<=end){
            let curr = Math.floor((start+end)/2)
            if(array[curr] == element){
                return curr
            }
            let messanger = (array[curr]<element)
            start = (messanger*(curr+1))+((!messanger)*start)
            end = ((!messanger)*(curr-1))+((messanger)*end)
        }
        return -1
    }
    // what caused me 2 hours of pain
    // coord is coordinate array of structure [[x,y],...]
    // max is the max that x or y can go to depending on i
    // i tells us whether to look at x or y
    itterate(coord,max,i){
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
        // only do this for i==0
        // make sure that main nodes do not duplicate
        for(let j = stack+(coord.length*(i!=0)); j<coord.length;j++){
            coord[j][i] = coord[j-1][i]+1
        }
        return (pos>=0)
    
    }
}
class NodeSolver extends Solver{
    constructor(trio,node,halfB,priorityNodes = []){
        super();
        this.hardLimit = 100
        this.halves = halfB;
        this.lines = trio;
        this.optimalList = node;
        this.optimalList.sort();
        let sorted = [];
        this.trueLength = [];
        this.remaining = [];
        this.cleanLines = [];
        this.noDupes = [];
        this.sortedInOrder = [];
        this.leng = [];
        this.optimalNodeSlots = Math.ceil((this.optimalList.length/3)*2);
        let real = (this.optimalList.length/3)*2;
        this.allowHalf = halfB.length!=0;
        this.allowHalf = (this.optimalNodeSlots>real) && this.halves.length>0 && this.allowHalf;
        this.halfing = this.optimalList.length%3!=0;
        this.priorityNodes = priorityNodes
        this.clean();
        this.fillBuckets(sorted);
        if(this.halfing){
            this.halfBucket(sorted);
        }
        this.removeDupes(sorted);
        this.doubleSort(this.noDupes, this.trueLength)
        this.prioritize()
        for(let i = 0; i<this.noDupes.length;i++){
            this.sortedInOrder.push(this.noDupes[i][0][0]);
        }
        for(let i = 0; i< this.noDupes.length;i++){
            this.leng.push(this.noDupes[i].length)
        }
    }
    solve(){
        let curr = []
        for(let i = 0; i< this.optimalNodeSlots;i++){
            curr.push([i,0])
        }
        // impossible case
        if(this.noDupes.length < this.optimalNodeSlots){
            return "You do not have enough nodes for this combination"
        }
        let nodeTotal = []
        // start of the brute force
        if (this.outterCheck(curr,nodeTotal)){
            //print out the results  
            for(let i = 0; i<nodeTotal.length;i++){
                nodeTotal[i] = JSON.stringify(nodeTotal[i])
            }
            let uniqueNodeTotal= [...(new Set(nodeTotal))]
            for(let i = 0; i<uniqueNodeTotal.length;i++){
                
                uniqueNodeTotal[i] = JSON.parse(uniqueNodeTotal[i])
                for(let j = 0; j<uniqueNodeTotal[i].length;j++){
                    uniqueNodeTotal[i][j].push(this.trueLength[this.sortedInOrder.indexOf(uniqueNodeTotal[i][j][0])])
                }
                
            }
            return uniqueNodeTotal
        }
        return "impossible"
    }
    // need access to the list of nodes, lengths of the list with duplicates included, and priority nodes 
    prioritize(){
        let prio = []
        if (this.priorityNodes.length == 0){
            return
        }
        for(let i = 0; i<this.priorityNodes.length;i++){
            prio.push(this.priorityNodes[i][0])
        }
        for(let i = 0; i<prio.length;i++){
            let curr = prio[i]
            for(let j = 0; j<this.noDupes.length;j++){
                if (this.noDupes[j][0][0] == curr){
                    this.insert(this.noDupes,this.trueLength,i,j)
                    break
                }
            }
        }
        for(let i = 0; i<prio.length;i++){
            let curr = this.priorityNodes[i]
            for(let j = 0; j<this.noDupes.length;j++){
                for(let k = 0; k<this.noDupes[j].length;k++){
                if (this.compare(curr,this.noDupes[j][k])){
                    this.swap(this.noDupes[j],k,0)
                }
                }
                
            }
        }
    }
    clean(){
        for (let i = 0;i<this.lines.length;i++){
            if(this.lines[i][1]!=this.lines[i][2] && this.lines[i][1]!=this.lines[i][0] && this.lines[i][0]!=this.lines[i][2]){
                this.cleanLines.push(this.lines[i])
            }
            if(!this.inside(this.lines[i][0],this.remaining) && !this.inside(this.lines[i][0],this.optimalList)){
                this.remaining.push(this.lines[i][0])
            }
        }
    }
    halfBucket(sorted){
        for (let i = 0; i<this.remaining.length;i++){
            let empty = []
            let trueEvery = 0
            for (let j = 0; j<this.cleanLines.length;j++){
                // nodes are sorted into buckets based off their starting value
                // similar to how radix sort works but we only focus on the first value
                if (this.cleanLines[j][0] === this.remaining[i]){
                    trueEvery++
                    let counter = 0
                    for(let k = 1; k<3;k++){
                        if(this.inside(this.cleanLines[j][k],this.optimalList) || this.inside(this.cleanLines[j][k],this.halves)){
                            counter+=1
                        }
                    }
                    if(counter >= 2){
                        empty.push(this.cleanLines[j])
    
                    }                 
                }
            }
            if (empty.length >0){
                sorted.push(empty)
                this.trueLength.push(trueEvery)
            }
        }
    }
    fillBuckets(sorted){
        for (let i = 0; i<this.optimalList.length;i++){
            let empty = []
            let trueEvery = 0
            for (let j = 0; j<this.cleanLines.length;j++){
                // nodes are sorted into buckets based off their starting value
                // similar to how radix sort works but we only focus on the first value
                if (this.cleanLines[j][0] === this.optimalList[i]){
                    trueEvery++
                    let counter = 0
                    for(let k = 1; k<3;k++){
                        if(this.inside(this.cleanLines[j][k],this.optimalList) || this.inside(this.cleanLines[j][k],this.halves)){
                            counter+=1
                        }
                    }
                    if(this.optimalList.length<3 || this.halfing){
                        if(counter >= 1){
                            empty.push(this.cleanLines[j])
                        }
                    }
                    else{
                        // remove nodes that do not have 3 optimal parts
                        if(counter == 2){
                            empty.push(this.cleanLines[j])
                        }
                    }
                    
                }
            }
            if (empty.length >0){
                sorted.push(empty)
                this.trueLength.push(trueEvery)
            }
        }
    }
    removeDupes(sorted){
        for(let i = 0; i<sorted.length;i++){
            let row = []
            for(let j = 0; j<sorted[i].length;j++){
                if(!this.inner(sorted[i][j],row,this.compare)){
                    row.push(sorted[i][j])
                }
            }
            this.noDupes.push(row)
        }
    }
    test(coord){
        // how many boosts each node recieves
        // if every node recieves 2 or more boosts then you have optimal boost nodes 
        let counts = []
        let halfCount = []
        for(let i = 0;i<this.optimalList.length;i++){
            counts.push(0)
        }
        // half array
        for(let i = 0;i<this.halves.length;i++){
            halfCount.push(0)
        }
        // tests our list of coordinates
        for (let i = 0; i<coord.length;i++){
            // use the coordinates to find what it is refering to in master aka sorted
            let temp = this.noDupes[coord[i][0]][coord[i][1]]
            for (let k = 0; k<temp.length;k++){
                // compare and count
                counts[this.binarySearch(this.optimalList,temp[k].trim())]++
            }  
            if(this.allowHalf){
                for (let k = 0; k<temp.length;k++){
                    // compare and count
                    halfCount[this.binarySearch(this.halves,temp[k])]++
                }
            } 
        }
        // check the validity 
        for (let i = 0; i<counts.length;i++){
            if (counts[i] < 2)
                return false
        }
        // check half boosts
        if(this.allowHalf){
            for (let i = 0; i<halfCount.length;i++){
                if (halfCount[i] < 1)
                    return false
            }
        }
        // optimal boost node
        return true
    }

    outterCheck(coords,nodeTotal){
        // every = this.optimalList
        // max is the list of maxes for the y aka the length of the buckets in position sorted[x]
        // max1 is the list of maxes for the x's should me sorted.length,sorted.length-1,... reversed
        let max = []
        let max1 = []
        let ret = false
        // initializing max and max1
        for(let i = 0; i<coords.length;i++){
            max.push((this.noDupes[coords[i][0]]).length)
            max1.push(this.noDupes.length)
        }
        for (let i = 0; i<max.length;i++){
            max1[max1.length-i-1] -= i
        }
        if (this.innerCheck(max,coords,nodeTotal))
            ret = true
        // you can think of this while as a bunch of nested for loops
        while(this.itterate(coords,max1,0)!=false){
            if(nodeTotal.length>=this.hardLimit){
                return true
            }
            // max needs to change every time because the "buckets" do not have equal lengths
            max = []
            for(let i = 0; i<coords.length;i++){
                max.push(this.noDupes[coords[i][0]].length)
            }
            // iterates the y coordinates instead of the x coordinates
            if (this.innerCheck(max,coords,nodeTotal)){
                ret = true
            }
                
            // resets coords when it is done
            for(let i = 0; i<coords.length;i++){
                coords[i][1] = 0
            }
        }
        return ret
    }
    // given our coord array of structure [[x,y],...]
    // we itterate the y portion by 1 and test to see if that next combination is valid
    // sorted a list of "buckets" of nodes more detail in the main function
    // every a list of all useful nodes parts
    // max is a list of the lengths of the "buckets" in sorted
    innerCheck(max,coord,totalNodes){
        let ret = false
        // it isnt useful for when we change y but it is very helpful when we itterate x
        // for y we always return to 0
        if (this.test(coord)){
            let set = []
            for(let i = 0; i<coord.length; i++){
                set.push(this.noDupes[coord[i][0]][coord[i][1]])
            }
            totalNodes.push(set)
            ret = true
        }        
        // the itterate function was my solution to using 3-9 nested for loops
        while(this.itterate(coord,max,1)){
            if(totalNodes.length>=this.hardLimit){
                return true
            }
            if (this.test(coord)){
                let set = []
                for(let i = 0; i<coord.length; i++){
                    set.push(this.noDupes[coord[i][0]][coord[i][1]])
                }
                totalNodes.push(set)
                ret = true
            }
        }
        return ret
    }
}





/******************************************************end of node solver code*******************************************************/
function createImage(img, imgName, isMain, prio = false){
    let grouping = document.createElement("td")
    grouping.classList.add("requirements")
    
    let image = document.createElement("img")
    image.src = directory+clas+"/"+img
    if(isMain){
        image.classList.add("nodeLib")
    }
    else if(!isMain && !prio){
        image.classList.add("halfLib")
    }


    let skillNames = document.createTextNode(imgName)
    let skill = document.createElement("p")
    skill.appendChild(skillNames)
    skill.classList.add("formatting");

    grouping.appendChild(image)
    grouping.appendChild(skill)


    return grouping
}
function groupClickEvent(self, max, state, reference ){
    let check = 0
    for(let i = 0; i<state.length;i++){
        check += 1*(state[i])
    }
    // if priority state of this priority group is true and 
    if((state[reference.indexOf(self)] && check==max) || check<max){
        state[reference.indexOf(self)] = !state[reference.indexOf(self)]
    }
    if(state[reference.indexOf(self)]){
        self.style.border = "5px solid #0090ff";
    }
    else{
        self.style.border = "1px solid #000000";
    }

}
function filler(clas){
    referenceList = []
    stateList = []
    halfreference = []
    priorityReference = []
    halfState = []
    priorityState = []
    priorityReferenceMain = []
    priorityStateMain = []
    priorityReferenceSub = []
    priorityStateSub = []
    priorityNodesList = []
    halfBoost.innerHTML = ''
    imgs.innerHTML = ''
    prioMain.innerHTML=  ''
    prioSub.innerHTML = ''
    for(let i = 0; i<file[clas].length;i++){
        let grouping = createImage(file[clas][i], skillNames[clas][i],true)
        let halfGroup = createImage(file[clas][i], skillNames[clas][i],false)
        let priorityGroupMain = createImage(file[clas][i], skillNames[clas][i],false,true)
        let priorityGroupSub = createImage(file[clas][i], skillNames[clas][i],false,true)
        grouping.addEventListener("click",(event)=>{
            groupClickEvent(grouping,file[clas].length,stateList,referenceList)
        })
        halfGroup.addEventListener("click",(event)=>{
            groupClickEvent(halfGroup,1,halfState,halfreference)
        })
        priorityGroupMain.addEventListener("click",(event)=>{
            groupClickEvent(priorityGroupMain,1,priorityStateMain,priorityReferenceMain)
        })
        priorityGroupSub.addEventListener("click",(event)=>{
            let check = 0
            max = 2
            for(let i = 0; i<priorityStateSub.length;i++){
                check += 1*(priorityStateSub[i])
            }
            // if priority state of this priority group is true and 
            if(((priorityStateSub[priorityReferenceSub.indexOf(priorityGroupSub)] && check==max) || check<max)&&(!priorityStateMain[priorityReferenceSub.indexOf(priorityGroupSub)])){
                priorityStateSub[priorityReferenceSub.indexOf(priorityGroupSub)] = !priorityStateSub[priorityReferenceSub.indexOf(priorityGroupSub)]
            }
            if(priorityStateSub[priorityReferenceSub.indexOf(priorityGroupSub)]){
                priorityGroupSub.style.border = "5px solid #0090ff";
            }
            else{
                priorityGroupSub.style.border = "1px solid #000000";
            }
        })
        referenceList.push(grouping)
        stateList.push(false)
        imgs.appendChild(grouping)

        halfreference.push(halfGroup)
        halfState.push(false)
        halfBoost.appendChild(halfGroup)

        priorityReferenceMain.push(priorityGroupMain)
        priorityStateMain.push(false)
        prioMain.appendChild(priorityGroupMain)

        priorityReferenceSub.push(priorityGroupSub)
        priorityStateSub.push(false)
        prioSub.appendChild(priorityGroupSub)
    }
}
function buildNode(){
    
    priority = []
    let curr = ""
    let within = false
    for(let i = 0; i<priorityStateMain.length; i++){
        if(priorityStateMain[i]){
            priority.push((i).toString())
            curr = i.toString()
            priorityStateMain[i] = false
            priorityReferenceMain[i].style.border = "1px solid #000000";
        }
    }
    for(let i = 0; i<priorityStateSub.length; i++){

        if(priorityStateSub[i]){
            priority.push(i.toString())
            priorityStateSub[i] = false
            priorityReferenceSub[i].style.border = "1px solid #000000";
        }
    }
    for(let i = 0; i<priorityNodesList.length;i++){
        if (curr == priorityNodesList[i][0]){
            within = true
        }
    }
    if(!within && priority.length == 3){
        priorityNodesList.push(priority) 
    }
    priorityNodeShow()       
}

function createCell(img, imgName){
    let grouping = document.createElement("td")
    grouping.classList.add("requirements")
    
    let image = document.createElement("img")
    image.src = directory+clas+"/"+img

    let skillNames = document.createTextNode(imgName)
    let skill = document.createElement("p")
    skill.appendChild(skillNames)


    grouping.appendChild(image)
    grouping.appendChild(skill)

    
    return grouping
}

function priorityNodeShow(){
    prioNodes.innerHTML = ''
    
    for(let i = 0; i<priorityNodesList.length;i++){
        let row = document.createElement("tr")
        for(let j = 0; j<3;j++){
            cell = createCell(file[clas][priorityNodesList[i][j]], skillNames[clas][priorityNodesList[i][j]])
            row.appendChild(cell)
        }
        prioNodes.appendChild(row)
    }

}
function priorityClearAll(){
    priorityNodesList = []
    priorityNodeShow()
}



let halfBoost = document.getElementById("halfB")
let selecting = document.getElementById("classes")
let imgs = document.getElementById("imgL")
let prioMain = document.getElementById("prioMain")
let prioSub = document.getElementById("prioSub")
let prioNodes = document.getElementById("prioNodes")
let checking = document.getElementById("lastCheck")

var classes = Object.keys(file)
directory = "../resources/"
let referenceList = []
let halfreference = []
let stateList = []
let halfState = []
let priorityReferenceMain = []
let priorityStateMain = []
let priorityReferenceSub = []
let priorityStateSub = []
let priorityNodesList = []

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


selecting.value = "Adele"


