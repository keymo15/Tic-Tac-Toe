const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const gamesPlayedSpan = document.getElementById("gamesPlayed");
const xWinsSpan = document.getElementById("xWins");
const oWinsSpan = document.getElementById("oWins");
const tiesSpan = document.getElementById("ties");

let gamesPlayed = 0;
let xWins = 0;
let oWins = 0;
let ties = 0;

function updateResults(winner) {
    gamesPlayed++;
    gamesPlayedSpan.innerText = gamesPlayed;
    if (winner === "X") {
      xWins++;
      xWinsSpan.innerText = xWins;
    } else if (winner === "O") {
      oWins++;
      oWinsSpan.innerText = oWins;
    } else if (winner === "tie") {
      ties++;
      tiesSpan.innerText = ties;
    }
  }
  
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

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.innerText = `${currentPlayer}'s turn`;
        running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] !== "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.innerText = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;
    let winningCells = [];
  
    for (let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i];
      const cellA = options[condition[0]];
      const cellB = options[condition[1]];
      const cellC = options[condition[2]];
  
      if (cellA == "" || cellB == "" || cellC == "") {
        continue;
      }
      if (cellA == cellB && cellB == cellC) {
        roundWon = true;
        winningCells = condition;
        break;
      }
    }
  
    if (roundWon) {
      statusText.textContent = `${currentPlayer} wins!`;
      running = false;
      updateResults(currentPlayer);
      cells.forEach(cell => {
        let cellIndex = cell.getAttribute("cellIndex");
        if (winningCells.includes(parseInt(cellIndex))) {
          cell.style.backgroundColor = "green";
        }
      });
    } else if (!options.includes("")) {
      statusText.textContent = `Draw!`;
      running = false;
      updateResults("tie");
    } else {
      changePlayer();
    }
  }  

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
      cell.textContent = "";
      cell.style.backgroundColor = "white";
      cell.addEventListener("mouseover", function() {
        this.style.backgroundColor = "lightgray";
      });
      cell.addEventListener("mouseout", function() {
        this.style.backgroundColor = "white";
      });
    });
    running = true;
  }  