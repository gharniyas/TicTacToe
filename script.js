const boxs=document.querySelectorAll('.box');
const statusTxt=document.querySelector("#status");
const btnRestart=document.querySelector("#restart");
x="<div class='X'>X</div>";
o="<div class='O'>O</div>";
const win=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

options=["","","","","","","","",""];
currentPlayer=x;
player='X';
running=false;
init()
function init()
{
    boxs.forEach(box=>box.addEventListener('click',boxClick));
    running=true;
    btnRestart.addEventListener('click',restartGame)
    statusTxt.textContent=`${player} your turn`
}
function boxClick(){
    const index=this.dataset.index;
    if(options[index]!=""||!running){
        return;
    }
    updateBox(this,index);
    checkWinner()

}
function checkWinner(){
isWon=false
for(i=0;i<win.length;i++){
    const condition=win[i];
    const box1=options[condition[0]];
    const box2=options[condition[1]];
    const box3=options[condition[2]];
    if(box1==""||box2==""||box3==""){
        continue;
    }
    if(box1==box2&&box2==box3){
        isWon=true;
        boxs[condition[0]].classList.add('win');
        boxs[condition[1]].classList.add('win');
        boxs[condition[2]].classList.add('win');
    }

}
if(isWon){
    statusTxt.textContent=`${player} won......` 
    running=false

}
else if(!options.includes("")){
    statusTxt.textContent=`Game draw....!`;
    running=false;

}
else{
    changePlayer()
}
}
function changePlayer(){
player=(player=='X')?"O":"X";
currentPlayer=(currentPlayer==x)?o:x;
statusTxt.textContent=`${player} your Turn`;
}
function updateBox(box,index){
    options[index]=player;
    box.innerHTML=currentPlayer;
}
function restartGame(){
    options=["","","","","","","","",""];
    currentPlayer=x;
    player='X';
    running=true;
    statusTxt.textContent=`${player} your turn`;
    boxs.forEach(box=>{
        box.innerHTML="";
        box.classList.remove('win');
    })
}