"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Link = /** @class */ (function () {
    function Link(source, target) {
        this.source = source;
        this.target = target;
    }
    Object.defineProperty(Link.prototype, "distance", {
        get: function () {
            return Math.round(this.calcDistance(this.source, this.target));
        },
        enumerable: true,
        configurable: true
    });
    Link.prototype.calcDistance = function (point1, point2) {
        var xs = 0;
        var ys = 0;
        xs = point2.x - point1.x;
        xs = xs * xs;
        ys = point2.y - point1.y;
        ys = ys * ys;
        return Math.sqrt(xs + ys);
    };
    return Link;
}());
exports.Link = Link;
//# sourceMappingURL=link.js.map