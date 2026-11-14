class cellList{
    constructor(labels,max){
        this.labels = labels
        this.state = []
        this.labelClickable = []
        this.max = max
        for(let i = 0;i<this.labels.length;i++){
            this.state.push(false)
            let cell = this.createCell(this.labels[i])
            cell.addEventListener("click",(event)=>{
                this.clickEvent(cell)
            })
            this.labelClickable.push(cell)
        }
    }
    createCell(label){
        let cell = document.createElement("td")
        cell.classList.add("requirements")
        let skillNames = document.createTextNode(label)
        let skill = document.createElement("p")
        skill.appendChild(skillNames)
        cell.appendChild(skill)
        return cell
    }
    clickEvent(self){
        let check = 0
        for(let i = 0; i<this.state.length;i++){
            check+=1*(this.state[i])
        }
        if((this.state[this.labelClickable.indexOf(self)] && check==this.max) || check<this.max){
            this.state[this.labelClickable.indexOf(self)] = !this.state[this.labelClickable.indexOf(self)]
        }
        if(this.state[this.labelClickable.indexOf(self)]){
            self.style.border = "5px solid #0090ff";
        }
        else{
            self.style.border = "1px solid #000000";
        }
    }
    reset(){
        for(let i=0; i<this.labelClickable.length;i++){
            this.labelClickable[i].style.border = "1px solid #000000";
            this.state[i] = false
        }
    }
}
class ListManager{
    constructor(){
        this.gear = ["Hat","Top","Bottom","Gloves","Cape","Shoes"]
        this.labels = ["Warrior","Mage","Pirate","Thief","Bowman","Registry","White Hole","Leap","Crit Damage","Attack","Damage","Boss"]
        this.amount = [1,1,1,1,1,3,3,3,1,1,1,1]
        this.gearList = new cellList(this.gear,1)
        this.labelList = new cellList(this.labels,3)
        this.all = []
        this.amountInput = []
        this.quantity = document.getElementById("quantity")
        this.translate = {0:"a",1:"b",2:"c",3:"d",4:"e",5:"f"}
        this.reverseTranslate = {"a":0,"b":1,"c":2,"d":3,"e":4,"f":5}
        this.button = document.createElement("BUTTON")
        let spanner = document.createElement("span")
        spanner.innerHTML = "Create"
        this.button.appendChild(spanner)
        this.button.classList = "cssbuttons-io"
        this.button.addEventListener("click",(event)=>{
            this.Click()
        })
        this.view = document.getElementById("lastCheck")
        this.createQuantity()
        this.error = document.getElementById("error")
    }
    check(){
        this.error.innerHTML = ""
        let total = 0
        for(let i=0; i<this.amountInput.length;i++){
            total+=Number(this.amountInput[i].lastElementChild.value)
        }
        if(total>18){
            this.error.appendChild(document.createTextNode("Exceeds 18 lines"))
        }
        else{
            for(let i=0; i<this.amountInput.length;i++){
                this.amount[i] = this.amountInput[i].lastElementChild.value
            }
        }
    }
    createCell(label){
        let cell = document.createElement("td")
        cell.classList.add("requirements")
        let skillNames = document.createTextNode(label)
        let skill = document.createElement("p")
        skill.appendChild(skillNames)
        cell.appendChild(skill)
        return cell
    }
    createQuantity(){
        for(let i = 0; i<this.labels.length;i++){
            let curr = this.labels[i]
            let cell = this.createCell(curr)
            let numberField = document.createElement("INPUT")
            numberField.type = "number"
            numberField.classList = "num"
            numberField.value = this.amount[i]
            cell.appendChild(numberField)
            this.amountInput.push(cell)
            this.quantity.appendChild(cell)
        }
    }
    createRow(full){
        let row = document.createElement("tr")
        for(let i=0;i<full.length;i++){
            let cell = null
            if(i==0){
                cell = this.createCell(this.gear[this.reverseTranslate[full[i]]])
            }
            else{
                cell = this.createCell(this.labels[full[i]-1])
            }
            row.appendChild(cell)
            
        }
        return row
    }
    delete(elem){
        let rows = Array.prototype.slice.call( document.getElementsByClassName("delly") )
        let index = rows.indexOf(elem)
        this.all.splice(index,1)
        this.render()
    }
    Click(){
        
        let full =[]
        for(let i=0;i<this.gear.length;i++){
            if(this.gearList.state[i]){
                full.push(this.translate[i])
            }
        }
        for(let i=0;i<this.labels.length;i++){
            if(this.labelList.state[i]){
                full.push(i+1)
            }
        }
        if (full.length==4){
            this.gearList.reset()
            this.labelList.reset()
            this.all.push(full)
            let row = this.createRow(full)
            this.view.appendChild(row)
        }

    }
    render(){
        this.view.innerHTML = ""
        for(let i=0;i<this.all.length;i++){
            let row = this.createRow(this.all[i])
            row.classList = "delly"
            row.addEventListener("click",(event)=>{
                this.delete(row)
            })
            this.view.appendChild(row)
        }
    }
    Save(){
        localStorage.setItem("all", JSON.stringify(this.all));
    }
    load(){
        let temp = JSON.parse(localStorage.getItem("all"))
        for(let i = 0; i<temp.length;i++){

            this.all.push(temp[i])
        }
        this.render()
    }
    reset(){
        localStorage.removeItem("all");
    }

}
function deleteAll(){
    let view = document.getElementById("lastCheck")
    view.innerHTML = ""
    page.full = []
}
let page = new ListManager()
let quanah = document.getElementById("quanah")
let lines = document.getElementById("lines");
let item = document.getElementById("equip")

for(let i=0;i<page.gearList.labelClickable.length;i++){
    item.appendChild(page.gearList.labelClickable[i])
}
for(let i=0;i<page.labelList.labelClickable.length;i++){
    lines.appendChild(page.labelList.labelClickable[i])
}

quanah.appendChild(page.button)

function solve(){
    let view = document.getElementById("viewing")
    view.innerHTML = ""
    let lineNames = []
    for(let i=0;i<page.labels.length;i++){
        lineNames.push(i+1)
    }
    // let test = [["e", 6, 9, 10], ["e", 4, 6, 9], ["e", 3, 4, 11], ["e", 5, 6, 11], ["e", 9, 10, 11], ["e", 8, 10, 11],…]

    let solver = new NodeSolver(page.all,lineNames,page.amount)
    
    let answer = solver.solve()
    if(answer == "impossible"){
        view.appendChild(document.createTextNode("No combination fulfils the requirements"))
    }
    else if (answer == "You do not have enough equipment for this combination"){
        view.appendChild(document.createTextNode("No combination fulfils the requirements"))
    }
    else{
        for(let i=0; i<answer[0].length;i++){
            let row = page.createRow(answer[0][i])
            view.appendChild(row)
        }
    }

}

