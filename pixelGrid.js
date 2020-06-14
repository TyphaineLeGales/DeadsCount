var container = document.getElementById('pixelGridContainer');
var gridSize = 100;
var cellSize = 1;

window.addEventListener("DOMContentLoaded", (event) => {
  console.log(container);
  generateGrid();
});

function generateGrid() {
  for(var i =0; i< gridSize; i++ ) {
    for(var j = 0; j < gridSize; j++) {
      var div = document.createElement('div');
      div.classList.add('cell');
      div.style.left = cellSize*i + "px";
      div.style.top = cellSize*j + "px";
      div.style.opacity = Math.random();
      container.appendChild(div);
    }
  }
}
