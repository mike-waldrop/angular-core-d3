import { Link, Node } from "./";
import { GraphFormat, Vertex, Edge } from "./graph-format";

export class DirectedGraph {
  nodes: Node[] = [];
  links: Link[] = [];
  graph: GraphFormat;

  load(g: GraphFormat) {
    this.graph = g;
    for (let n of this.graph.nodes) {
      var node = new Node(n.id);
      node.x = n.x;
      node.y = n.y;
      this.nodes.push(node);
    }

    for (let e of this.graph.edges) {
      var n1 = this.nodes.find(n => n.id == e.source);
      var n2 = this.nodes.find(n => n.id == e.target);
      this.links.push(new Link(n1, n2));
    }
  }

  save() {
    this.graph.nodes = [];
    this.graph.edges = [];
    for (let n of this.nodes) {
      let v = new Vertex();
      v.id = n.id;
      v.x = n.x;
      v.y = n.y;
      this.graph.nodes.push(v)
    }
    for (let l of this.links) {
      let e = new Edge();
      e.source = l.source.id;
      e.target = l.target.id;
      this.graph.edges.push(e);
    }
  }
}
