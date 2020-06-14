var container = document.getElementById('pixelGrid');
var gridSize = 10;

for(var i =0; i< gridSize; i++ ) {
  for(var j = 0; j < gridSize; j++) {
    var div = document.createElement('div');
    div.classList.add('cell');
  }
}
