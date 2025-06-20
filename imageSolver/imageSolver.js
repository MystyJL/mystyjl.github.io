function buildNode(){
        
    priority = []
    let curr = ""
    let within = false
    for(let i = 0; i<priorityListMainSub.stateMain.length; i++){
        if(priorityListMainSub.stateMain[i]){
            priority.push((i).toString())
            curr = i.toString()
            priorityListMainSub.stateMain[i] = false
            priorityListMainSub.referenceMain[i].style.border = "1px solid #000000";
        }
    }
    for(let i = 0; i<priorityListMainSub.stateSub.length; i++){

        if(priorityListMainSub.stateSub[i]){
            priority.push(i.toString())
            priorityListMainSub.stateSub[i] = false
            priorityListMainSub.referenceSub[i].style.border = "1px solid #000000";
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

function ins(x,y){
    for(let i = 0; i<y.length;i++){
        if(x==y[i]){
            return true
        }
    }
    return false
}


function groupClickEvent(self, max, state, reference ){
    let check = 0
    for(let i = 0; i<state.length;i++){
        check += 1*(state[i])
    }
    // if priority state of this priority group is true and 
    if(((state[reference.indexOf(self)] && check==max) || check<max)){
        state[reference.indexOf(self)] = !state[reference.indexOf(self)]
    }
    if(state[reference.indexOf(self)]){
        self.style.border = "5px solid #0090ff";
    }
    else{
        self.style.border = "1px solid #000000";
    }

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
// initial load
let clas = 'Adele'

let mainList = new interactableImages(imgs,file[clas].length,true,false)
let halfList = new interactableImages(halfBoost,1,false,false)
let priorityListMainSub = new mainSubImages(prioMain,prioSub,false,true)
let listOfLists = [mainList, halfList, priorityListMainSub]
let manager = new listManager(listOfLists)

let priorityNodesList = []

for(let i = 0; i<classes.length;i++){
    option = document.createElement("option")
    option.text = classes[i]
    option.value = classes[i]
    selecting.add(option)
}


manager.run(clas)

selecting.addEventListener("change",(event) => {
    clas = event.target.value
    manager.run(clas)
});


selecting.value = "Adele"


