// Create the grid
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let width = 10;
  let squares = [];
  let bombsAmount = 20;
  let isGameOver = false;
  let flags = 0;

  // Create board
  function createBoard() {
    // Fill some random bombs
    const bombsArray = Array(bombsAmount).fill('bomb');
    const emptyArray = Array(width*width - bombsAmount).fill('valid');
    const gameArray = emptyArray.concat(bombsArray);
    // You can use this too =): 
    //const gameArray = [...emptyArray, bombsArray];
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
    
    // Create board
    for(let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.setAttribute('id', i);
      // Add a class with the current value for each div
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);

      // normal click 
      square.addEventListener('click', function(e) {
        click(square)
        checkForWin(square);
      })
      // ctrl and left click
      square.oncontextmenu = function(e) {
        e.preventDefault();
        addFlag(square);
      }
    }
    
    // Add numbers
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const isLeftEdge = (i % width === 0); // index is multiple of 10
      const isRightEdge = (i % width === width - 1); // index 19, 29 etc

      if (squares[i].classList.contains('valid')) {
        if(i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++;
        if(i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++;
        if(i > 10 && squares[i - width].classList.contains('bomb')) total++;
        if(i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total++;
        if(i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++;
        if(i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++;
        if(i < 88 && !isRightEdge && squares[i +1 + width].classList.contains('bomb'))total++;
        if(i < 89 && squares[i + width].classList.contains('bomb')) total++;

        squares[i].setAttribute('data', total);
      }
      
    }
  }
  createBoard();
  // add Flag with right click 
  function addFlag(square) {
    if(isGameOver) return;
    if(!square.classList.contains('checked') && (flags < bombsAmount)) {
      if(!square.classList.contains('flag')) {
        square.classList.add('flag');
        square.innerText = '🚩';
        flags++;
        checkForWin(square);
      } else {
        square.classList.remove('flag');
        square.innerText = '';
        flags--;
      }
    }
  }

  // click on square actions
  function click(square) {
    let currentId = square.id;
    if(isGameOver) return;
    if(square.classList.contains('checked') || square.classList.contains('flag')) return;
    if(square.classList.contains('bomb')) {
      console.log('Game over');
      return gameOver(square);
    } else {
      let total = square.getAttribute('data');
      if (total != 0) {
        square.classList.add('checked');
        square.innerText = total;
        return
      }
  
      checkSquare(square, currentId);
    }
    square.classList.add('checked');
  }

  // check neighboring squares once square is clicked
  function checkSquare(square, currentId) {
    const isLeftEdge = (currentId % width === 0);
    const isRightEdge = (currentId % width === width -1);

    setTimeout(() => {
      if(currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId - 1)].id;
        const newSquare = document.getElementById(newId);
        click(newSquare)
      }

      if(currentId > 9 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      if(currentId  > 10) {
        const newId = squares[parseInt(currentId) - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      if(currentId > 11 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      if(currentId < 98 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      if(currentId < 90 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      if(currentId < 88 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }

      if(currentId < 89) {
        const newId = squares[parseInt(currentId) + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
    }, 10);
  }

  function gameOver(square) {
    const failMessage = document.getElementById('messages');
    failMessage.innerHTML = "💥 BOOM!!! You loose!"
    isGameOver = true;

    squares.forEach(square => {
      if(square.classList.contains('bomb')){
        square.innerText = '💣';
      }
    })
  }
  // check for win 
  function checkForWin(square) {
    let matches = 0;
    for (let i = 0; i < squares.length; i++) {
      if(squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
        matches++;
      }
      if (matches === bombsAmount) {
        const winMessage = document.getElementById('messages');
        winMessage.innerHTML = "🎉 YOU WIN!!! 🎉 "
      }
    }
  }
})
