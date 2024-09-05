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