let TotalTag = document.getElementById("totalNodes")
let viewing = document.getElementById('viewing')
let readimgs = []
let inputElement = document.getElementById('fileInput');
let last = document.getElementById("lastCheck")
let indexOfSet = 0
let totalNodes = 0
let HugeSet = []


function sumRegion(im1,im2,start,region){
    let R = 0
    let G = 0
    let B = 0
    let total = 0
    if(region == 1){
        // 16-29, 2-15
        // square
        for (let j = 0; j<14;j++){
            for (let i = j; i<27;i++){
                let pixel1 = im1.ucharPtr(start[0]+i+3,start[1]+j+2)
                let pixel2 = im2.ucharPtr(i+3,j+2)
                R+=Math.pow(pixel1[0]/255-pixel2[0]/255,2)
                G+=Math.pow(pixel1[1]/255-pixel2[1]/255,2)
                B+=Math.pow(pixel1[2]/255-pixel2[2]/255,2)
                total+=1
                // im2[i+3,j+2] = np.array([255,0,0])
            }  
        }
    }
    else if(region == 2){
        // i = 0-14
        // j = i-32-i-3
        for (let i = 0; i<14; i++){
            for (let j = i+3;j<32-i-2;j++){
                let pixel1 = im1.ucharPtr(start[0]+i+2,start[1]+j)
                let pixel2 = im2.ucharPtr(i+2,j)
                R+=Math.pow(pixel1[0]/255-pixel2[0]/255,2)
                G+=Math.pow(pixel1[1]/255-pixel2[1]/255,2)
                B+=Math.pow(pixel1[2]/255-pixel2[2]/255,2)
                total+=1
                // im2[i+2,j] = np.array([0,255,0])
            } 
        } 
    }
    else if(region == 3){
        for (let j = 0; j<13;j++){
            for(let i = 16-j; i<30;i++){
                let pixel1 = im1.ucharPtr(start[0]+i,start[1]+j+17)
                let pixel2 = im2.ucharPtr(i,j+17)
                R+=Math.pow(pixel1[0]/255-pixel2[0]/255,2)
                G+=Math.pow(pixel1[1]/255-pixel2[1]/255,2)
                B+=Math.pow(pixel1[2]/255-pixel2[2]/255,2)
                total+=1
                // im2[i,j+17] = np.array([0,0,255])
            } 
        }
    }
    else{
        offset = [0,0,0,0,5,7,9,10,11,11,11,11,10]
        for (let j = 0; j<13;j++){
            for(let i = 16-j; i<30-offset[j];i++){
                let pixel1 = im1.ucharPtr(start[0]+i,start[1]+j+17)
                let pixel2 = im2.ucharPtr(i,j+17)
                R+=Math.pow(pixel1[0]/255-pixel2[0]/255,2)
                G+=Math.pow(pixel1[1]/255-pixel2[1]/255,2)
                B+=Math.pow(pixel1[2]/255-pixel2[2]/255,2)
                total+=1
                // im2[i,j+17] = np.array([0,0,255])
            } 
        }
    }
    return (R+G+B)/(total*3)
}
function identify(img,loc,img_lib,region){
    let threshold = 0.155
    let choices = []
    for (let i = 0; i<img_lib.length;i++){
        choices.push(0) 
        choices[i] = sumRegion(img,img_lib[i],loc,region)
    }
    if (Math.min(...choices) < threshold){
        return choices.indexOf(Math.min(...choices))
    }
    return -1
}
function deleteImgs(){
    for (let i = 0; i<readimgs;i++){
        readimgs[i].remove()
    }
    document.querySelectorAll("#lastCheck img").forEach(img => img.remove());
    last.innerHTML=""
    readimgs = []
}
function trioFinder(img_rgb, template,templateLock, reqSkills){
    // setup
    let threshold = 0.26;
    let src = cv.imread(img_rgb);
    let templ = cv.imread(template);
    let templLock = cv.imread(templateLock);
    // containers
    let source = new cv.Mat();
    let dst = new cv.Mat();
    let dstLock = new cv.Mat();
    let template1 = new cv.Mat();
    let template2 = new cv.Mat();
    let mask = new cv.Mat();
    cv.cvtColor(src, source, cv.COLOR_RGBA2GRAY, 1);
    cv.cvtColor(templ, template1, cv.COLOR_RGBA2GRAY, 1);
    cv.cvtColor(templLock, template2, cv.COLOR_RGBA2GRAY, 1);
    cv.matchTemplate(source, template1, dst, cv.TM_CCOEFF_NORMED, mask);
    cv.matchTemplate(source, template2, dstLock, cv.TM_CCOEFF_NORMED, mask);
    templ.delete();
    templLock.delete();
    template1.delete();
    template2.delete();
    mask.delete();
    // dst, source and src are the last ones left
    let coords = []
    for(let i = 0; i<dst.rows;i++){
        for(let j = 0; j<dst.cols;j++){
            let pixel = dst.floatPtr(i, j);
            if(pixel[0] >=threshold){
                coords.push([i,j])
            }  
        }
    }
    for(let i = 0; i<dstLock.rows;i++){
        for(let j = 0; j<dstLock.cols;j++){
            let pixel = dstLock.floatPtr(i, j);
            if(pixel[0] >=threshold){
                coords.push([i,j])
            }  
        }
    }
    
    // clean the coordinates
    skip = []
    clean = []
    for(let i = 0; i<coords.length;i++){
        dont = false
        if(ins(i,skip)){
            continue;
        }
        for(let j = i+1; j<coords.length;j++){
            if ((Math.abs(coords[i][0]-coords[j][0])+Math.abs(coords[i][1]-coords[j][1]))<64){
                let pixel = dst.floatPtr(i, j);
                if(dst.floatPtr(coords[i][0],coords[i][1])[0]>=dst.floatPtr(coords[j][0],coords[j][1])[0]){
                    skip.push(j)
                }
                else if(dst.floatPtr(coords[i][0],coords[i][1])[0]<dst.floatPtr(coords[j][0],coords[j][1])[0]){
                    dont = true
                    break;
                }
            }
        }
        if (!dont){
            clean.push(coords[i])
        } 
    }
    let count = []
    // create nodes
    for(let pt = 0; pt<clean.length;pt++){
        // print(pt1)
        main = identify(src,clean[pt],reqSkills,1)
        up = identify(src,clean[pt],reqSkills,2)
        last = identify(src,clean[pt],reqSkills,3)
        if(last==main || last == up || last == -1){
            last = identify(src,clean[pt],reqSkills,4)
        }
        if (main !=-1 && up !=-1 && last !=-1){
            count.push([main.toString(),up.toString(),last.toString()])
        }
    }
    dst.delete()
    dstLock.delete()
    source.delete()
    src.delete()
    return count 
}
inputElement.addEventListener('change', (e) => {
    for(let i = 0; i<e.target.files.length;i++){
        let tempim = document.createElement("img")
        let showim = document.createElement("img")
        showim.width = 400
        let source = URL.createObjectURL(e.target.files[i]);
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
}, false);
function filter1(nodes){
    clean = []
    for(let i = 0; i<nodes.length;i++){
        if(nodes[i][0]!=nodes[i][1] && nodes[i][0]!=nodes[i][2] && nodes[i][2]!=nodes[i][1]){
            clean.push(nodes[i])
        }
    }
    return clean
}
function display(){
    let fileList = file[clas]
    let skills = skillNames[clas]
    for(let i = 0; i<HugeSet[indexOfSet].length;i++){
        row1 = document.createElement('tr')
        for(let j = 0; j<3;j++){
            let image = document.createElement('img')
            let para = document.createElement('p')
            let data = document.createElement('td')
            let texty = document.createTextNode(skills[parseInt(HugeSet[indexOfSet][i][j])])
            image.src = directory+clas+"/"+fileList[parseInt(HugeSet[indexOfSet][i][j])]
            data.classList.add("tableDisplay"); 
            para.appendChild(texty)
            data.appendChild(image)
            data.appendChild(para)
            row1.appendChild(data)
        }
        let data = document.createElement('td')
        data.appendChild(document.createTextNode("#Copies: "+HugeSet[indexOfSet][i][3]))
        row1.appendChild(data)
        viewing.appendChild(row1)
    }
}
function showNext(){
    if(indexOfSet>=totalNodes-1){
        return
    }
    indexOfSet++
    let fileList = file[clas]
    viewing.innerHTML = ''
    TotalTag.innerHTML = "Total sets: "+ (indexOfSet+1)+"/"+totalNodes
    display()
}
function comparefn(a,b){
    suma = 0
    sumb = 0
    for(let i = 0;i<a.length;i++){
        suma+=a[i][3]
        sumb+=b[i][3]
    }
    return -(suma-sumb)
}
function showPrev(){
    if(indexOfSet<=0){
        return
    }
    indexOfSet--
    let fileList = file[clas]
    viewing.innerHTML = ''
    TotalTag.innerHTML = "Total sets: "+ (indexOfSet+1)+"/"+totalNodes
    display()
}
function calculate(tabs) {
    
    indexOfSet = 0
    totalNodes = 0
    nodelib = document.getElementsByClassName("nodeLib")
    viewing.innerHTML = ''
    let img_library =[] 
    let req = []
    let nodes = []
    let half = []
    for(let i = 0;i<nodelib.length;i++){
        img_library.push(cv.imread(nodelib[i]))
    }
    for(let i = 0; i<stateList.length;i++){
        if(stateList[i]){
            req.push(i.toString())
        }
    }
    for(let i = 0; i<halfState.length;i++){
        if(halfState[i]){
            half.push(i.toString())
        }
    }
    for(let i = 0; i<readimgs.length;i++){
        nodes = [...nodes,...trioFinder(readimgs[i],'template','template1',img_library)]
    }
    
    let fileList = file[clas]
    if(tabs){

        nodesolver = new NodeSolver(nodes,req,half)
        trios = nodesolver.solve()
        if(trios =="impossible"){
            viewing.appendChild(document.createTextNode(trios))
        }
        else if (trios == "You do not have enough nodes for this combination"){
            viewing.appendChild(document.createTextNode(trios))
        }
        else{
            HugeSet = trios
            // HugeSet.sort(comparefn)
            totalNodes = HugeSet.length
            TotalTag.innerHTML = "Total sets: "+ (indexOfSet+1)+"/"+totalNodes
            display()
        }
    }
    else{
        let skills = skillNames[clas]
        TotalTag.innerHTML = "Total sets: "+ (indexOfSet)+"/"+totalNodes
        nodes = filter1(nodes)
        for(let i = 0; i<nodes.length;i++){
                row1 = document.createElement('tr')
                for(let j = 0; j<3;j++){
                    let image = document.createElement('img')
                    let para = document.createElement('p')
                    let data = document.createElement('td')
                    let texty = document.createTextNode(skills[parseInt(nodes[i][j])])
                    image.src = directory+clas+"/"+fileList[parseInt(nodes[i][j])]
                    data.classList.add("tableDisplay"); 
                    para.appendChild(texty)
                    data.appendChild(image)
                    data.appendChild(para)
                    row1.appendChild(data)
                }
                viewing.appendChild(row1)
            }
    }
    
    
};
function hideVid(){
    var x = document.getElementById("video");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }