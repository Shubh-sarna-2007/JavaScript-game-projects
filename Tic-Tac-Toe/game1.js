let boxes = document.querySelectorAll(".box");
let restetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".message-container");
let msg = document.querySelector("#message");
let turnO= true;//playerX,player O
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame =()=>{
    turnO = true;
    count = 0;
    enable_box();
    msgContainer.classList.add("hide");
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if(turnO){ // player O
            box.innerText="O";
            turnO=false;
        }else{ // playter X
            box.innerText="X";
            turnO=true;
        }
        box.disabled = true;
        count++;
        let win = checkWinner();
        if(count === 9 && !win){
            game_draw();
        }
    });
});
const game_draw = () =>{
    msg.innerText = "Game was Draw";
    msgContainer.classList.remove("hide");
    disable_box();
}
const disable_box = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enable_box = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
}
const showWinner = (winner) =>{
    msg.innerText = `🎉 Congratulations , Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disable_box();
}
const checkWinner = () =>{
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !="" && pos2Val !="" && pos3Val !=""){
            if(pos1Val === pos2Val && pos2Val === pos3Val ){
                showWinner(pos1Val);
            }
        }
    }
}

newGameBtn.addEventListener("click",resetGame);
restetBtn.addEventListener("click",resetGame);
