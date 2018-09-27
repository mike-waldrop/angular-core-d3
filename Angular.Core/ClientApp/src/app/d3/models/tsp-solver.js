"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TspSolver = /** @class */ (function () {
    function TspSolver(dg) {
        this.vals = [];
        this.letters = ['A', 'B', 'C', 'D'];
        this.log = new core_1.EventEmitter();
        this.dg = dg;
    }
    TspSolver.prototype.execute = function () {
        for (var i = 0; i < this.dg.nodes.length; i++) {
            this.vals.push(i);
        }
        this.draw();
    };
    TspSolver.prototype.draw = function () {
        this.getCurrentOrder();
        while (true) {
            // STEP 1 of the algorithm
            // https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
            var largestI = -1;
            for (var i = 0; i < this.vals.length - 1; i++) {
                if (this.vals[i] < this.vals[i + 1]) {
                    largestI = i;
                }
            }
            if (largestI == -1) {
                this.log.emit('finished');
                break;
            }
            // STEP 2
            var largestJ = -1;
            for (var j = 0; j < this.vals.length; j++) {
                if (this.vals[largestI] < this.vals[j]) {
                    largestJ = j;
                }
            }
            // STEP 3
            this.swap(this.vals, largestI, largestJ);
            // STEP 4: reverse from largestI + 1 to the end
            var endArray = this.vals.splice(largestI + 1);
            endArray.reverse();
            this.vals = this.vals.concat(endArray);
            this.getCurrentOrder();
        }
    };
    TspSolver.prototype.getCurrentOrder = function () {
        var s = '';
        for (var i = 0; i < this.vals.length; i++) {
            s += this.dg.nodes[this.vals[i]].id;
        }
        this.log.emit(s);
    };
    TspSolver.prototype.swap = function (a, i, j) {
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    };
    return TspSolver;
}());
exports.TspSolver = TspSolver;
//# sourceMappingURL=tsp-solver.js.map