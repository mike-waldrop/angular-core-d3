import { DirectedGraph } from "./directed-graph";
import { EventEmitter } from '@angular/core';
import { Node } from './node';
import { Link } from ".";

function delay() {
  return new Promise(resolve => setTimeout(resolve, 20));
}

export class TspSolver {
  vals: number[]=[];
  letters = ['A', 'B', 'C', 'D'];
  bestEdges;
  bestSum = 0;
  bestDesc: string;
  dg: DirectedGraph;
  public log: EventEmitter<any> = new EventEmitter();
  public bestFoundEmitter: EventEmitter<Link[]> = new EventEmitter();

  constructor(dg: DirectedGraph) {
    this.dg = dg;
  }

  execute() {
    for (var i = 0; i < this.dg.nodes.length; i++) {
      this.vals.push(i);
    }
    this.draw();
  }

 async draw() {
    this.getCurrentOrder();
    while (true) {
      await delay();
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
        this.log.emit(`BEST IS ${this.bestDesc}`);
        this.bestFoundEmitter.emit(this.bestEdges);
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
  }

  getCurrentOrder() {
    var s = '';
    var tmp: Node[] = [];
    var foundEdges: Link[] = [];
    for (var i = 0; i < this.vals.length; i++) {
      let n = this.dg.nodes[this.vals[i]];
      tmp.push(n);
      s += n.id;
    }

    let sum: number = 0;
    
    for (var i = 0; i < tmp.length; i++) {
      if (i < tmp.length-1) {
        var thisLink = this.dg.links.find(l => l.source.id == tmp[i].id && l.target.id == tmp[i + 1].id);
        foundEdges.push(thisLink);
        sum += thisLink.distance;
        this.log.emit(`${thisLink.source.id}  ${thisLink.target.id}  ${thisLink.distance}`);
      }
    }

    if (this.bestSum === 0)
      this.bestSum = sum;

    if (sum < this.bestSum) {
      this.bestSum = sum;
      this.bestEdges = foundEdges;
      this.bestDesc = `${s}  ${this.bestSum}`;
      //this.bestFoundEmitter.emit(this.bestEdges);
    }
    this.bestFoundEmitter.emit(foundEdges);
    this.log.emit(`${s}  ${sum}`);
  }
   

  swap(a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
}

