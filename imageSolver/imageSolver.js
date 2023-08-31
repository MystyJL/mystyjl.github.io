selecting = document.getElementById("classes")
imgs = document.getElementById("imgL")
console.log(selecting)

file = {Adele:['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
AngelicBuster:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Aran:['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Ark:['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
BattleMage:['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
BeastTamer:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S15.png', 'S16.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Bishop:
['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
Blaster:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
BlazeWizard:
['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Bowmaster:
['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Buccaneer:
['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
Cadena:
['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
CannonMaster:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S15.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Corsair:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
DarkKnight:
['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
DawnWarrior:
['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
DemonAvenger:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
DemonSlayer:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S15.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
DualBlade:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S15.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Evan:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
FirePoison:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Hayato:
['S14.png', 'S17.png', 'S19.png', 'S2.png', 'S20.png', 'S21.png', 'S22.png', 'S23.png', 'S5.png', 'S8.png'],
Hero:
['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Hoyoung:
['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
IceLightning:
['S1.png', 'S10.png', 'S11.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Illium:
['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
Jett:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Kain:
['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
Kaiser:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Kanna:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S15.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Khali:
['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Kinesis:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Lara:
['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png'],
Luminous:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Marksman:
['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png'],
Mechanic:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Mercedes:
['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Mihile:
['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
NightLord:
['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
NightWalker:
['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Paladin:
['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
PathFinder:
['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Phantom:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Shade:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S15.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Shadower:
['S1.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
ThunderBreaker:
['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
WildHunter:
['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
WindArcher:
['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Xenon:
['S1.png', 'S10.png', 'S11.png', 'S12.png', 'S13.png', 'S14.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png'],
Zero:
['S1.png', 'S10.png', 'S2.png', 'S3.png', 'S4.png', 'S5.png', 'S6.png', 'S7.png', 'S8.png', 'S9.png']};
classes = ["Adele","AngelicBuster","Aran","Ark","BattleMage","BeastTamer","Bishop","Blaster","BlazeWizard","Bowmaster","Buccaneer","Cadena","CannonMaster","Corsair","DarkKnight","DawnWarrior","DemonAvenger","DemonSlayer","DualBlade","Evan","FirePoison","Hayato","Hero","Hoyoung","IceLightning","Illium","Jett","Kain","Kaiser","Kanna","Khali","Kinesis","Lara","Luminous","Marksman","Mechanic","Mercedes","Mihile","NightLord","NightWalker","Paladin","PathFinder","Phantom","Shade","Shadower","ThunderBreaker","WildHunter","WindArcher","Xenon","Zero"]
directory = "../resources/"
for(let i = 0; i<classes.length;i++){
    option = document.createElement("option")
    option.text = classes[i]
    option.value = classes[i]
    selecting.add(option)
}
selecting.addEventListener("change",(event) => {
    imgs.innerHTML = ''
    clas = event.target.value
    console.log(event.target)
    for(let i = 0; i<file[clas].length;i++){
        image =  document.createElement("img")
        image.src = directory+clas+"/"+file[clas][i]
        image.classList.add("nodeLib"); 
        imgs.appendChild(image)
        console.log(image)
    }

  });
selecting.value = "Adele"


