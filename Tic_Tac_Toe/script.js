let currentPlayer = "";
let XScoreInt = 0;
let OScoreInt = 0;
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let cellOptions = ["", "", "", "", "", "", "", "", ""];
const cells = document.querySelectorAll(".cell");
let running;

startGame();

function selectPlayer() {
    document.getElementById("status-text").innerHTML = `
    <h3>Wer soll beginnen?</h3>
    <button id="choose-x-player">X</button>
    <button id="choose-o-player">O</button>`;
    const submitPlayerX = document.getElementById("choose-x-player");
    const submitPlayerO = document.getElementById("choose-o-player");
    submitPlayerX.onclick = function() {
        currentPlayer = "X";
        document.getElementById("status-text").innerHTML = `<h2 id="status-text">${currentPlayer} muss sein Zug machen.</h2>`;
        console.log(currentPlayer);
        clearBoard();
        running = true;
    };
    submitPlayerO.onclick = function() {        
        currentPlayer = "O";
        document.getElementById("status-text").innerHTML = `<h2 id="status-text">${currentPlayer} muss sein Zug machen.</h2>`;
        console.log(currentPlayer);
        clearBoard();
        running = true;
    };
}
function startGame() {
    running = false;
    selectPlayer();
    for (i = 0; i < 9; i++)
    {
        cells[i].addEventListener("click", cellClicked);
    }
    const restartButton = document.getElementById("restrart-button");
    restartButton.addEventListener("click", clearBoard);
}
function cellClicked() {
    const cellId = this.getAttribute("cellId");
    if(cellOptions[cellId] === "" && running === true){
        updateCell(this, cellId);
        checkWinner();
    }
}
function updateCell(cell, index){
    cellOptions[index] = currentPlayer;
    cell.innerHTML = currentPlayer;
}
function changePlayer(){
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    document.getElementById("status-text").innerHTML = `<h2 id="status-text">${currentPlayer} muss sein Zug machen.</h2>`;
}
function checkWinner(){
    try {
        let roundWon = false;
        for(let i = 0; i < winConditions.length; i++){
            const condition = winConditions[i];
            const cellA = cellOptions[condition[0]];
            const cellB = cellOptions[condition[1]];
            const cellC = cellOptions[condition[2]];
            if(cellA == "" || cellB == "" || cellC == ""){
                continue;
            }
            if(cellA == cellB && cellB == cellC){
                roundWon = true;
                break;
            }
        }
        if(roundWon === true){
            alert(`${currentPlayer} hat die Runde gewonnen!`);
            running = false;
            if (currentPlayer === "X") {
                XScoreInt += 1;
                document.getElementById("x-score").innerHTML = XScoreInt;
    
            } else if (currentPlayer === "O") {
                OScoreInt += 1;
                document.getElementById("o-score").innerHTML = OScoreInt;
            }
            throw "myException";
        }
        cellGetter = document.querySelectorAll(".cell");
        cellsFree = 0;
        for (i = 0; i < 9; i++) {
            console.log(cellGetter[i].innerHTML);
            if(cellGetter[i].innerHTML === ""){
                cellsFree += 1;
            }
        }
        if (cellsFree === 0) {
            alert("Es ist unentschieden!")
            running = false;
        }else {
            changePlayer();
        }
    }
    catch (myException) {

    }
}
function clearBoard() {
    cellOptions = ["", "", "", "", "", "", "", "", ""];
    for (i = 0; i < 9; i++)
    {
        cells[i].innerHTML = "";
    }
    running = false;
}

/* 
Hat mir beim erstellen geholfen(ich habe Sachen kopiert), falls ich nicht weiter wusste.
https://www.youtube.com/watch?v=AnmwHjpEhtA
z.B:
Ein Teil der CheckWinner Funktion wurde kopiert, aber auch andere Teile.
*/