const gameboard = document.querySelector('.gameboard');
const gameStatus = document.querySelector('.gamestatus');
const gameCells = ['','','','','','','','','',];
const resetBtn = document.querySelector('#resetButton');
let turn = "circle";
gameStatus.textContent = 'Circle Goes First';
gameCells.forEach((_cell,index)=>{
    const cellElement = document.createElement('div');
    cellElement.classList.add('cells');
    cellElement.id = index;

    cellElement.addEventListener('click',displayMove);
    gameboard.append(cellElement);
});

function displayMove(e)
{
    const showDisplay = document.createElement('div')
    showDisplay.classList.add(turn);
    e.target.append(showDisplay);
    turn = turn === 'circle'?'cross' : 'circle';
    gameStatus.textContent = 'It is now ' + turn + "'s turn.";
    e.target.removeEventListener('click',displayMove);
    checkScore()
}

function checkScore()
{
    const allCells = document.querySelectorAll('.cells');
    console.log(allCells);

    const winArr = [
        [0,1,2], [3,4,5], [6,7,8],[0,3,6], [1,4,7],[2,5,8], [0,4,8], [2,4,6]
    ]
    let gameOver = false;

    //If Circle Wins
    winArr.forEach(array =>{
        const circleWins = array.every(cell => allCells[cell].firstChild?.classList.contains('circle')) 

        if(circleWins)
        {
            gameStatus.textContent = "Circle Wins";
            allCells.forEach(cell => cell.replaceWith(cell.cloneNode(true)))
            resetBtn.style.display = 'block';
            resetBtn.addEventListener('click',resetBoard);
            gameOver = true;
        }

    })

    //If Cross Wins
    winArr.forEach(array =>{
        const crossWins = array.every(cell => allCells[cell].firstChild?.classList.contains('cross')) 

        if(crossWins)
        {
            gameStatus.textContent = "Cross Wins";
            allCells.forEach(cell => cell.replaceWith(cell.cloneNode(true)))
            resetBtn.style.display = 'block';
            resetBtn.addEventListener('click',resetBoard);
            gameOver = true;
        }


    })

    //If the game results to Draw
    if (!gameOver && Array.from(allCells).every(cell => cell.firstChild)) {
        gameStatus.textContent = "It's a Draw!";
        gameOver = true;
        resetBtn.addEventListener('click',resetBoard);

    }

    if (gameOver) {
        resetButton.style.display = "block";
        allCells.forEach(cell => cell.removeEventListener('click', displayMove));
        resetBtn.addEventListener('click',resetBoard);

    }

}


//Resetting the Board
function resetBoard(){
    gameCells.fill('')
    const cellElements = document.querySelectorAll('.cells');
    cellElements.forEach((cell) => {
        cell.textContent = '';
        cell.addEventListener('click', displayMove);})

    turn = 'circle';
    gameStatus.textContent = 'Circle Goes First';
    resetBtn.style.display = 'none';
}




