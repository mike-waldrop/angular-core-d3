import { Component } from '@angular/core';
import APP_CONFIG from './app.config';
import { Node, Link } from './d3';
import { GraphFormat, Vertex, Edge } from './d3/models/graph-format';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nodes: Node[] = [];
  links: Link[] = [];
  graph: GraphFormat;

  constructor(private http: HttpClient) {
    


    //const N = APP_CONFIG.N,
    //  getIndex = number => number - 1;

    ///** constructing the nodes array */
    //for (let i = 1; i <= N; i++) {
    //  var node = new Node(i);
    //  node.x = 200 + 100 * i;
    //  node.y = 200;
    //  this.nodes.push(node);
    //}

    //for (let i = 0; i < N; i++) {
    //  for (let m = 0; m < N; m++) {
    //    var n1 = this.nodes[i];
    //    var n2 = this.nodes[m];
    //    if (n1.id !== n2.id)
    //      this.links.push(new Link(n1, n2));
    //  }
    //}
  }

  title = 'ClientApp';

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

  public currentCount = 0;

  ngOnInit() {
    let that = this;
    this.getGraph().subscribe(g => {
      that.graph = g;
      for (let n of g.nodes) {
        var node = new Node(n.id);
        node.x = n.x;
        node.y = n.y;
        that.nodes.push(node);
      }

      for (let e of g.edges) {
        var n1 = that.nodes.find(n => n.id == e.source);
        var n2 = that.nodes.find(n => n.id == e.target);
        that.links.push(new Link(n1, n2));
      }
    });
  }

  public incrementCounter() {
    this.currentCount++;
  }

  getGraph() {
    return this.http.get<GraphFormat>('assets/graph.json');
  }
}


