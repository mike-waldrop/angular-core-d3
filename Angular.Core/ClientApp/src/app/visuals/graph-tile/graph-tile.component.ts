import { Component, OnInit, Input } from '@angular/core';
import { DirectedGraph } from '../../d3';

@Component({
  selector: 'graph-tile',
  templateUrl: './graph-tile.component.html',
  styleUrls: ['./graph-tile.component.css']
})
export class GraphTileComponent implements OnInit {
  @Input('DirectedGraph') directedGraph: DirectedGraph;

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.directedGraph.save();
  }
}
