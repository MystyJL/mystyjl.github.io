class Solver{
    constructor(){
    }
    // checks if a node exists inside of a node array and checks for duplicates
    inner(variable,array, comparison){
        for(let i = 0; i<array.length;i++){
            if (comparison(variable,array[i])){
                return true
            }
        }
        return false
    }
    // compare if 2 nodes are the same and will consider duplicates the same
    compare(a,b){
        if (a[0]==b[0]&&((a[1] == b[1] && a[2] == b[2]) || (a[1] == b[2] && a[2] == b[1]))){
            return true
        }
        return false
    }
    // check if variable exists inside array
    inside(variable,array){
        for(let i = 0; i<array.length;i++){
            if (variable.trim() == array[i].trim()){
                return true
            }
        }
        return false
    }
    // swap elements a and b's position in array
    swap(array,a,b){
        let c = array[a]
        array[a] = array[b]
        array[b] = c 
    }
    // sorts nodupe in descending order with respect to truelength
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
    // quickly search for element in sorted array
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
    // hat, top, bot, cape, gloves, shoes = a,b,c,d,e,f
    // warrior, mage, archer, theif, pirate, registry, leap, white hole, damage, boss, crit, attack
    constructor(equips,lineNames,amounts){
        super();
        this.amounts = amounts
        this.lineNames = lineNames
        this.hardLimit = 1
        this.lines = equips;
        this.gearPieces = ["a","b","c","d","e","f"];
        this.gearPieces.sort();
        this.sorted = [];
        this.trueLength = [];
        this.cleanLines = [];
        this.noDupes = [];
        this.sortedInOrder = [];
        this.leng = [];

        this.optimalNodeSlots = 6;


        // this.clean();
        this.fillBuckets();

    }
    // what to call to run the solver and get back the list of outputs
    solve(){
        let curr = []
        for(let i = 0; i< this.optimalNodeSlots;i++){
            curr.push([i,0])
        }
        // impossible case
        if(this.lines.length < this.optimalNodeSlots){
            return "You do not have enough equipment for this combination"
        }
        let nodeTotal = []
        // start of the brute force
        if (this.outterCheck(curr,nodeTotal)){
            //print out the results  
            for(let i = 0; i<nodeTotal.length;i++){
                nodeTotal[i] = JSON.stringify(nodeTotal[i])
            }
            // remove duplicates
            let uniqueNodeTotal= [...(new Set(nodeTotal))]
            for(let i = 0; i<uniqueNodeTotal.length;i++){
                // add how many copies of each main node there are to the end of each solution
                uniqueNodeTotal[i] = JSON.parse(uniqueNodeTotal[i])
                
            }
            return uniqueNodeTotal
        }
        return "impossible"
    }
    // remove duplicates and save a list of unoptimal starting nodes
    clean(){
        for (let i = 0;i<this.lines.length;i++){
            if(this.lines[i][1]!=this.lines[i][2] && this.lines[i][1]!=this.lines[i][0] && this.lines[i][0]!=this.lines[i][2]){
                this.cleanLines.push(this.lines[i])
            }
        }
    }


    // populate sorted with optimal nodes aka perfect trios
    fillBuckets(){
        for (let i = 0; i<this.gearPieces.length;i++){
            let empty = []
            let trueEvery = 0
            for (let j = 0; j<this.lines.length;j++){
                // nodes are sorted into buckets based off their starting value
                // similar to how radix sort works but we only focus on the first value
                if (this.lines[j][0] === this.gearPieces[i]){
                    trueEvery++
                    empty.push(this.lines[j])
                }
            }
            if (empty.length >0){
                this.sorted.push(empty)
                this.trueLength.push(trueEvery)
            }
        }
    }

    // test to see if a solution is found by counting each occurance of each node
    test(coord){
        // how many boosts each node recieves
        // if every node recieves 2 or more boosts then you have optimal boost nodes 
        let counts = []
        for(let i = 0;i<this.lineNames.length;i++){
            counts.push(0)
        }
        
        // tests our list of coordinates
        for (let i = 0; i<coord.length;i++){
            // use the coordinates to find what it is refering to in master aka sorted
            let temp = this.sorted[coord[i][0]][coord[i][1]]
            for (let k = 1; k<temp.length;k++){
                // compare and count

                counts[this.binarySearch(this.lineNames,temp[k])]++
            }  
        }
        // check the validity 

        for (let i = 0; i<counts.length;i++){
            if (counts[i] < this.amounts[i])
                return false
        }
        // optimal boost node
        return true
    }
    // iterate the x coordinate
    outterCheck(coords,nodeTotal){
        // every = this.optimalList
        // max is the list of maxes for the y aka the length of the buckets in position sorted[x]
        // max1 is the list of maxes for the x's should me sorted.length,sorted.length-1,... reversed
        let max = []
        let max1 = []
        let ret = false
        // initializing max and max1
        for(let i = 0; i<coords.length;i++){
            max.push((this.sorted[coords[i][0]]).length)
            max1.push(this.sorted.length)
        }
        for (let i = 0; i<max.length;i++){
            max1[max1.length-i-1] -= i
        }
        if (this.innerCheck(max,coords,nodeTotal))
            ret = true
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
                set.push(this.sorted[coord[i][0]][coord[i][1]])
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
                    set.push(this.sorted[coord[i][0]][coord[i][1]])
                }
                totalNodes.push(set)
                ret = true
            }
        }
        return ret
    }
}