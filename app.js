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
  }
  createBoard();
})