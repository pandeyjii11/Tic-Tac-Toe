// console.log("Hello jee");

const gameInfo = document.querySelector("[data-gameInfo]");
const boxes = document.querySelectorAll(".box");
const btn = document.querySelector(".btn");

let currentPLayer;
let gameGrid;
let winPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6]
]

initGame();

// console.log(winPosition);


// Initialzing the game
function initGame() {
    currentPLayer="X";
    gameInfo.innerText = `Current Player - ${currentPLayer}`;
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    btn.classList.remove("active");
}


// Changing Player Turns
function swapPlayer() {
    if(currentPLayer === "X")
    {
        currentPLayer="O";
    }
    else {
        currentPLayer="X";
    }

    gameInfo.innerText = `Current Player - ${currentPLayer}`;
}

// Cheking for winner and Game Over
function gameOverCheck() {
    // console.log(winPosition);
    for(let i=0;i<winPosition.length;i++)
    {
        // console.log("Entring");
        let combination = winPosition[i];
        
        // console.log(combination[0]+" "+combination[1]+" "+combination[2]);
        
        if(gameGrid[combination[0]] === gameGrid[combination[1]] && 
            gameGrid[combination[1]] === gameGrid[combination[2]] && 
            gameGrid[combination[2]] === gameGrid[combination[0]] && 
            gameGrid[combination[0]] !== "" && gameGrid[combination[1]] !== "" &&
            gameGrid[combination[2]] !== "")
        {
            // console.log("Enteirng");

            // console.log(currentPLayer);

            gameInfo.innerText = `Winner Is - ${currentPLayer}`;
            boxes[combination[0]].classList.add("win");
            boxes[combination[1]].classList.add("win");
            boxes[combination[2]].classList.add("win");
            return true;
        }

        // console.log(combination);
    }
    return false;
}


// Checking for Draw Condition 
function checkDraw() {
    for(let i=0;i<gameGrid.length;i++)
    {
        if(gameGrid[i] === "")
        {
            return false;
        }
    }
    return true;
}

// Handling Function for Click on Boxes 
function handleClick(index) {
    if(gameGrid[index] === "")
    {
        boxes[index].innerText = `${currentPLayer}`;
        gameGrid[index]=currentPLayer;
        boxes[index].style.pointerEvents = "none";
        
        if(gameOverCheck())
        {
            for(let i=0;i<gameGrid.length;i++)
            {
                if(gameGrid[i] === "")
                {
                    gameGrid[i]="X";
                    boxes[i].style.pointerEvents = "none";
                }
                btn.classList.add("active");
            }
        }
        else if(checkDraw())
        {
            gameInfo.innerText = `Game Tied!`;
            btn.classList.add("active");
        }
        else {
            swapPlayer();
        }
    }
}

/* ------------------------Event Listeners--------------------------- */

// Event Listener for Box Click
for(let i=0;i<boxes.length;i++)
{
    boxes[i].addEventListener("click", () => {
        handleClick(i);
    });
}


// Event Listener for Click event on New Game Button
btn.addEventListener("click", () => {
    initGame();
    for(let i=0;i<boxes.length;i++)
    {
        boxes[i].innerText = "";
        boxes[i].style.pointerEvents = "all";
        boxes[i].classList.remove("win");
    }
});