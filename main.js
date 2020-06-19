var number = 0;
var systemSelected = "linearAnimation";

var datGUI = new dat.GUI();
var guiControls = new function () {
  this.linearAnimation = true;
  this.cubeFractal = false;
  this.clickInteraction = false;
  this.scrollInteraction = false;
  this.number = 0;
  this.speed = 0;
}

var typeOfVis = datGUI.addFolder('typeOfVisualization');

typeOfVis.add(guiControls, "linearAnimation").listen().onChange(function(value){
  if(value) {
    systemSelected = "linearAnimation";
    guiControls.cubeFractal = false;
    guiControls.clickInteraction = false;
    guiControls.scrollInteraction = false;
  }
  logSystemSelected();
})

typeOfVis.add(guiControls, "cubeFractal").listen().onChange(function(value){
  if(value) {
    systemSelected = "cubeFractal";
    guiControls.linearAnimation = false;
    guiControls.clickInteraction = false;
    guiControls.scrollInteraction = false;
  }
   logSystemSelected();
})

typeOfVis.add(guiControls, "clickInteraction").listen().onChange(function(value){
  if(value) {
    systemSelected = "clickInteraction";
    guiControls.linearAnimation = false;
    guiControls.cubeFractal = false;
    guiControls.scrollInteraction = false;
  }
   logSystemSelected();
})

typeOfVis.add(guiControls, "scrollInteraction").listen().onChange(function(value){
  if(value) {
    systemSelected = "scrollInteraction";
    guiControls.linearAnimation = false;
    guiControls.cubeFractal = false;
    guiControls.clickInteraction = false;
  }
   logSystemSelected();
})

datGUI.add(guiControls, 'speed', 1, 10, 1);

datGUI.add(guiControls, 'number').step(1).onChange(function(value) {

  // header.innerHTML = value;
  number = value;
  numberHeader.innerHTML = value;

})

function logSystemSelected() {

  switch(systemSelected) {

    case "linearAnimation" : console.log(systemSelected);
    break;

    case "cubeFractal" : console.log(systemSelected);
    break;

    case "clickInteraction" : console.log(systemSelected);
    break;

    case "scrollInteraction" : console.log(systemSelected);
    break;
  }
}


