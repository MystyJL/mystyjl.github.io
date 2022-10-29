// coord is a list of lists with inner lists of structure[x,y]
// checks to see if a given coord satisfies the given constraints
function test(master,every,coord){
    let counts = []
    for(let i = 0;i<every.length;i++){
        counts.push(0)
    }

    for (let i = 0; i<coord.length;i++){
        temp = master[coord[i][0]][coord[i][1]]
        for (let j = 0; j<every.length;j++){

            for (let k = 0; k<temp.length;k++){
                if (every[j].trim() === temp[k].trim())
                    counts[j]+=1
            }
        }    
    }
    for (let i = 0; i<counts.length;i++){
        if (counts[i] < 2)
            return false
    }
    return true
}
// coords = list of elements in [x,y] notation
// outerCheck = test1 in the python code
function outterCheck(coords,sorted,every){
    let max = []
    let max1 = []
    let min = []
    for(let i = 0; i<coords.length;i++){
        max.push((sorted[coords[i][0]]).length)
        max1.push(sorted.length)
        min.push(sorted.length)
    }
    for (let i = 0; i<max.length;i++){
        max1[max1.length-i-1] -= i
        min[min.length-i-1] -= i
    }
    if (innerCheck(sorted,max,coords,every))
            return true
    while(itterate(coords,max1,0,min)!=false){
        max = []
        for(let i = 0; i<coords.length;i++){
            max.push(sorted[coords[i][0]].length)
        }
        if (innerCheck(sorted,max,coords,every))
            return true
        for(let i = 0; i<coords.length;i++){
            coords[i][1] = 0
        }
    }
    return false
}
function itterate(coord,max,i,min){
    if (coord.length === 1 && (coord[0][i]+1)>=max[0])
        return false
    else if (coord.length === 1){
        coord[0][i]+=1
        return true
    }
    coord[coord.length-1][i]+=1
    if (coord[coord.length-1][i]>=max[max.length-1]){
        coord[coord.length-1][i] = min[min.length-1]-1
        return true && itterate(coord.slice(0,coord.length-1),max.slice(0,max.length-1),i,min.slice(0,min.length-1))
    }
    return true
}
function innerCheck(sorted,max,coord,every){
    let min = []
    for(let i = 0; i<max.length;i++){
        if (coord[i][1]>max[i]){
            return false
        }
        min.push(1)
    }
    while(itterate(coord,max,1,min)){
        if (test(sorted,every,coord))
            return true
    }
    return false
}
var nodes = document.getElementById('optimal');
var trios = document.getElementById('trio');
var out = document.getElementById('output');
var calc = document.getElementById('calc');
function main(trio,node){
    let lines = trio.value.split('\n')
    let op = node.value.split(",")
    for(let i = 0; i<lines.length;i++){
        lines[i] = lines[i].toLowerCase()
        lines[i] = lines[i].trim()
        lines[i] = lines[i].split(",")
    }
    let sorted = []
    for (let i = 0; i<op.length;i++){
        let empty = []
        for (let j = 0; j<lines.length;j++){
            if (lines[j][0] === op[i])
                empty.push(lines[j])
        }
        sorted.push(empty)
    }
    let leng = []
    let ln = sorted.length
    let optimal = Math.round((ln/3)*2)
    for(let i = 0; i<sorted.length;i++){
        if(sorted[i].length === 0){
            sorted.splice(i,1)
        }
    }
    for(let i = 0; i< sorted.length;i++){
        leng.push(sorted[i].length)
    }
    let curr = []
    for(let i = 0; i< optimal;i++){
        curr.push([i,0])
    }
    out.innerHTML = ""
    // not possible
    if(ln < optimal){
        out.appendChild(document.createTextNode("impossible"))
        return 
    }
    if (outterCheck(curr,sorted,op)){
        for(let i = 0; i< curr.length;i++){        
            out.appendChild(document.createTextNode(sorted[curr[i][0]][curr[i][1]]))
            out.appendChild(document.createElement("br"))
        }
        return
    }
    out.appendChild(document.createTextNode("impossible"))
    return 
}
calc.addEventListener('click', function(evt) {
    main(trios,nodes)
})