
var RectangleLayer = require('./rectangleLayer/rectanglelayer');

console.log("Generating random rectangles");
var rectLayer = RectangleLayer.prototype.randomRectLayer(0, 100, 0, 100, 10000000);
console.log("Random rectangles generated");

var totalArea = 0.0, totalPerimeter = 0.0;

setTimeout(
    () => {
        console.log("Calculating Total Area");
        totalArea = rectLayer.totalArea();
        console.log("Total Area : " + totalArea + "\n");
    },
    1000);

setTimeout(
    () => {
        console.log("Calculating Total Perimeter");
        totalPerimeter = rectLayer.totalPerimeter();
        console.log("Total Perimeter : " + totalPerimeter + "\n");
    },
    2000);

console.log("Event Loop Empty\n");