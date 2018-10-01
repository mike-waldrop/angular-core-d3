import { Component } from '@angular/core';
import APP_CONFIG from './app.config';
import { Node, Link } from './d3';
import { GraphFormat, Vertex, Edge } from './d3/models/graph-format';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DirectedGraph } from './d3/models/directed-graph';
import * as _ from 'lodash';
import { TspSolver } from './d3/models/tsp-solver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientApp';
  directedGraph: DirectedGraph = new DirectedGraph();
  directedGraph2: DirectedGraph = new DirectedGraph();
 // nodes: Node[] = [];
 // links: Link[] = [];
  //graph: GraphFormat;

  constructor(private http: HttpClient) {
  }

  

  logger: string[] = [];

  snapShot() {
    this.directedGraph2.setNodes(_.cloneDeep(this.directedGraph.nodes));
    let tsp = new TspSolver(this.directedGraph);
    tsp.log.subscribe(o => {
      this.logger.splice(0, 0, o); 
    });
    tsp.bestFoundEmitter.subscribe(b => {
      this.directedGraph2.setLinks(_.cloneDeep(b));
    });
    tsp.execute();
  }

  ngOnInit() {
    this.getGraph();
  }


  getGraph() {
    let that = this;
    this.http.get<GraphFormat>('assets/graph.json').subscribe(g => {
      this.directedGraph.load(g);
    });
  }
}


