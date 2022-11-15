const gameState = {
  players: ['X', 'O'],
  currentPlayer : Math.floor(Math.random()*2),
  gameBoard: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],
  clear: function (){
    this.gameBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]},
}

let begin = document.querySelector(".begin");
let board = document.querySelector(".board");
let cell = document.querySelectorAll(".cell");
let instructions = document.querySelector(".instructions");
let form = document.querySelector("form");
let startButton = document.querySelector(".startButton"); 
let reset = document.querySelector(".reset");
let input1 = document.querySelector(".input1");
let input2 = document.querySelector(".input2");
let playerOrder = document.querySelector(".playerOrder");
let players = gameState.players;
let gameBoard = gameState.gameBoard;


form.addEventListener('submit',function(event){
  event.preventDefault()
})

begin.addEventListener('click', function(){

  begin.classList.toggle('hidden')
  board.classList.toggle('hidden')
  reset.classList.toggle('hidden')
  input1.classList.toggle('hidden')
  input2.classList.toggle('hidden')
  playerOrder.classList.toggle('hidden')
  instructions.textContent = '';

  let player1 = input1.value.toUpperCase()
  let player2 = input2.value.toUpperCase()

  let sym =  gameState.players[gameState.currentPlayer] 

  function oppSym (){
    if (sym === "X"){
      return "O"
    }else if (sym === "O"){
      return "X"
    }
  }

  if (gameState.currentPlayer === 0){
    playerOrder.textContent = `${player1} (${sym}) will go first. ${player2} (${oppSym()}) will go second`
  } else if (gameState.currentPlayer === 1) {
    playerOrder.textContent = `${player2} (${sym}) will go first. ${player1} (${oppSym()}) will go second`
  }

})

function makeCell(rowIndex, columnIndex){
  const cell = document.createElement('div');

  cell.classList.add('cell');
  cell.dataset.row = rowIndex; // takes index and puts it on cell
  cell.dataset.column = columnIndex;
  cell.textContent = gameState.gameBoard[rowIndex][columnIndex]
  board.appendChild(cell);
}

function renderBoard(){
  board.innerHTML = ''
  gameState.gameBoard.forEach((row,rowIndex) =>{
    for (let i = 0; i < row.length; i++){
      makeCell(rowIndex, i)
    }
  })
}
renderBoard()

//Data attributes: alls the storing of extra inof on a standard HTML element
  // retrieve data => element.dataset.term

board.addEventListener('click', function (event){
  const {gameBoard} = gameState;
  const row = event.target.dataset.row; // 1
  const column = event.target.dataset.column; //2 
// event.target = refereces the clicked element(in this case, "board")
  if (event.target.matches('.cell')){
    if(gameBoard[row][column]){
      return instructions.textContent = "Cell is already filled";
    }else{
      gameBoard[row][column] = players[gameState.currentPlayer]
    }
  }

  switchPlayer();
  renderBoard();
  checkWinner();

  function checkWinner (){
    if(gameBoard[row][0] === gameBoard[row][1] && gameBoard[row][1] === gameBoard[row][2] && gameBoard[row][0] !== null ){
      instructions.textContent = 'Winner';
    }else if(gameBoard[0][column] === gameBoard[1][column] && gameBoard[1][column] === gameBoard[2][column] && gameBoard [0][column] !== null){
      instructions.textContent = 'Winner';
    } else if(gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[0][0] !== null){
      instructions.textContent = 'Winner';
    } else if(gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] !== null){
      instructions.textContent = 'Winner';
    // } else if(gameBoard !== null){
    //   instructions.textContent = "Tie"
    }
  }
  
})



function switchPlayer () {
  gameState.currentPlayer = gameState.currentPlayer === 0 ? 1 : 0;
}

reset.addEventListener('click', function (){
  begin.classList.toggle('hidden'); 
  board.classList.toggle('hidden');
  reset.classList.toggle('hidden');
  input1.classList.toggle('hidden');
  input2.classList.toggle('hidden');
  playerOrder.classList.toggle('hidden');
  input1.value = '';
  input2.value = '';
  instructions.textContent = 'Welcome, please enter your name below.';
  gameState.clear();
  renderBoard();
})

