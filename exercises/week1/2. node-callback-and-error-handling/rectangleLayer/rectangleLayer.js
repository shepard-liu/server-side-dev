var Rectangle = require("../rectangle/rectangle");

function RectangleLayer(rectArray) {
    if (Array.isArray(rectArray) == false && rectArray != null)
        throw "Constructor for RectangleLayer accepts only Array argument";
    this.array = rectArray;
}

RectangleLayer.prototype.type = "RectangleLayer";

RectangleLayer.prototype.totalArea = function () {
    var sum = 0.0;

    this.array.forEach(rect => {
        sum += rect.area();
    });

    return sum;
};

RectangleLayer.prototype.totalPerimeter = function () {
    var sum = 0.0;

    this.array.forEach(rect => {
        sum += rect.perimeter();
    });

    return sum;
}

RectangleLayer.prototype.randomRectLayer = function (minWidth, maxWidth, minHeight, maxHeight, count) {
    var rectArray = [];

    if (minWidth < 0 || minWidth > maxWidth || minHeight < 0 || minHeight > maxHeight)
        throw "invalid arguments.";

    let wSpan = maxWidth - minWidth;
    let hSpan = maxHeight - minHeight;

    for (let i = 0; i < count; ++i) {
        let w = Math.random() * wSpan + minWidth;
        let h = Math.random() * hSpan + minHeight;
        rectArray.push(new Rectangle(w, h));
    }

    return new RectangleLayer(rectArray);
}

module.exports = RectangleLayer;