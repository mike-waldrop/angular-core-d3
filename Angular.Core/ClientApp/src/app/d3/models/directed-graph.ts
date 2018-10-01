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
      if (n1 && n2) {
        let l = new Link(n1, n2)
        this.links.push(l);
        n1.links.push(l);
      }
        
    }
  }

  setNodes(nodes: Node[]) {
    this.nodes = nodes;
  }

  setLinks(links: Link[]) {
    this.links = [];
    for (let e of links) {
      var n1 = this.nodes.find(n => n.id == e.source.id);
      var n2 = this.nodes.find(n => n.id == e.target.id);
      if (n1 && n2) {
        let l = new Link(n1, n2)
        this.links.push(l);
        n1.links.push(l);
      }

    }
  }

  save() {
    this.graph = new GraphFormat();
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
