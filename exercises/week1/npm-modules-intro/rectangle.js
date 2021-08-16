function rectangle(a, b) {
    this.a = a;
    this.b = b;
};

rectangle.prototype.area = function () {
    console.log("Calculating Area");
    return this.a * this.b;
}

rectangle.prototype.perimeter = function () {
    console.log("Calculating Perimeter");
    return (this.a + this.b) * 2.0;
}

rectangle.prototype.type = "rectangle";

module.exports = rectangle;