// Create the grid
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let width = 10;
  let squares = [] 
  const bombsAmount = 20;

  // Create board
  function createBoard() {
    // Fill some random bombs
    const bombsArray = Array(bombsAmount).fill('bomb');
    const emptyArray = Array(width*width - bombsAmount).fill('valid');
    const gameArray = emptyArray.concat(bombsArray);
    // You can use this too =): 
    //const gameArray = [...emptyArray, bombsArray];
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
    console.log(shuffledArray)
    
    // Create board
    for(let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      // Add a class with the current value for each div
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);
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
        squares[i].innerText = total;        
      }
      
    }


  }
  createBoard();
})