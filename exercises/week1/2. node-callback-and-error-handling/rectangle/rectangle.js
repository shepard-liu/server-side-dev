function Rectangle(a, b) {
    this.a = a;
    this.b = b;
};

Rectangle.prototype.area = function () {
    //console.log("Calculating Area");
    return this.a * this.b;
}

Rectangle.prototype.perimeter = function () {
    //console.log("Calculating Perimeter");
    return (this.a + this.b) * 2.0;
}

Rectangle.prototype.type = "rectangle";

module.exports = Rectangle;