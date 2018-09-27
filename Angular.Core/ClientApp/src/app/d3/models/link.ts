import { Node } from './';
import * as d3 from 'd3';

export class Link implements d3.SimulationLinkDatum<Node> {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // must - defining enforced implementation properties
  source: Node;
  target: Node;
  
  constructor(source, target) {
    this.source = source;
    this.target = target;
  }

  get distance(): number {
    return Math.round(this.calcDistance(this.source, this.target));
    
  }

  calcDistance(point1, point2) {
    var xs = 0;
    var ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;

    ys = point2.y - point1.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
  }
}
