class interactableImages{
    constructor(listOfClassesHTML, max, isMain, prio){
        this.state = []
        this.reference = []
        this.isMain = isMain
        console.log(this.isMain)
        this.listOfClassesHTML = listOfClassesHTML
        this.prio = prio
        this.max = max
    }
    createImage(img, imgName){
        let grouping = document.createElement("td")
        grouping.classList.add("requirements")
        
        let image = document.createElement("img")
        image.src = directory+clas+"/"+img
        if(this.isMain){
            console.log()
            image.classList.add("nodeLib")
        }
        else if(!this.isMain && !this.prio){
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
    fill(clas){
        this.clear()
        for(let i = 0; i<file[clas].length;i++){
            let grouping = this.createImage(file[clas][i], skillNames[clas][i])
            grouping.addEventListener("click",(event)=>{
                this.ClickEvent(grouping)
            })
            this.reference.push(grouping)
            this.state.push(false)
            this.listOfClassesHTML.appendChild(grouping)
        }
    }
    clear(){
        this.listOfClassesHTML.innerHTML = ''
        this.state = []
        this.reference = []
    }
    
    // makes sure only max amount of objects can be active at a time
    ClickEvent(self){
        let check = 0
        for(let i = 0; i<this.state.length;i++){
            check += 1*(this.state[i])
        }
        // if priority state of this priority group is true and 
        if((this.state[this.reference.indexOf(self)] && check==this.max) || check<this.max){
            this.state[this.reference.indexOf(self)] = !this.state[this.reference.indexOf(self)]
        }
        if(this.state[this.reference.indexOf(self)]){
            self.style.border = "5px solid #0090ff";
        }
        else{
            self.style.border = "1px solid #000000";
        }

    }
    
}
class mainSubImages{
    constructor(listOfClassesHTMLMain, listOfClassesHTMLSub, isMain, prio){
        this.stateSub = []
        this.referenceSub = []
        this.stateMain = []
        this.referenceMain = []
        this.isMain = isMain
        this.listOfClassesHTMLMain = listOfClassesHTMLMain
        this.listOfClassesHTMLSub = listOfClassesHTMLSub
        this.prio = prio
    }
    createImage(img, imgName){
        let grouping = document.createElement("td")
        grouping.classList.add("requirements")
        
        let image = document.createElement("img")
        image.src = directory+clas+"/"+img
        if(this.isMain){
            image.classList.add("nodeLib")
        }
        else if(!this.isMain && !this.prio){
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
    ClickEvent(self){
        
        let check = 0
        for(let i = 0; i<this.stateMain.length;i++){
            check += 1*(this.stateMain[i])
        }
        // if priority state of this priority group is true and 
        console.log(this.stateMain)
        if(((this.stateMain[this.referenceMain.indexOf(self)] && check==1) || check<1)){
            console.log("fuck fuck fuck")
            this.stateMain[this.referenceMain.indexOf(self)] = !this.stateMain[this.referenceMain.indexOf(self)]
        }
        if(this.stateMain[this.referenceMain.indexOf(self)]){
            self.style.border = "5px solid #0090ff";
        }
        else{
            self.style.border = "1px solid #000000";
        }

    }
    clear(){
        this.listOfClassesHTMLSub.innerHTML = ''
        this.stateSub = []
        this.referenceSub = []

        this.listOfClassesHTMLMain.innerHTML = ''
        this.stateMain = []
        this.referenceMain = []

    }
    fill(clas){
        this.clear()
        for(let i = 0; i<file[clas].length;i++){
            let groupingMain = this.createImage(file[clas][i], skillNames[clas][i])
            let groupingSub = this.createImage(file[clas][i], skillNames[clas][i])
            groupingMain.addEventListener("click",(event)=>{
                this.ClickEvent(groupingMain)
            })
            groupingSub.addEventListener("click",(event)=>{
                this.advancedClickEvent(groupingSub)
            })
            this.referenceMain.push(groupingMain)
            this.stateMain.push(false)
            this.listOfClassesHTMLMain.appendChild(groupingMain)

            this.referenceSub.push(groupingSub)
            this.stateSub.push(false)
            this.listOfClassesHTMLSub.appendChild(groupingSub)
        }
    }
    advancedClickEvent(self){
        let check = 0
        for(let i = 0; i<this.stateSub.length;i++){
            check += 1*(this.stateSub[i])
        }
        // if priority state of this priority group is true and 
        if(((this.stateSub[this.referenceSub.indexOf(self)] && check==2) || check<2)&&(!this.stateMain[this.referenceSub.indexOf(self)])){
            this.stateSub[this.referenceSub.indexOf(self)] = !this.stateSub[this.referenceSub.indexOf(self)]
        }
        if(this.stateSub[this.referenceSub.indexOf(self)]){
            self.style.border = "5px solid #0090ff";
        }
        else{
            self.style.border = "1px solid #000000";
        }

    }
}
class listManager{
    constructor(listOfObjects){
        this.lists = listOfObjects

    }
    run(clas){
        for(let i = 0; i<this.lists.length;i++){
            this.lists[i].fill(clas)
        }
    }
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

