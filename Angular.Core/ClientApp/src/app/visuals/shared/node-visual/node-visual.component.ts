import { Component, Input } from '@angular/core';
import { Node } from '../../../d3';

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
     <svg:g [attr.transform]="'translate(' + 0 + ',' + -30 + ')'">
       <svg:text
          class="node-weight"
          [attr.font-size]="25">
         {{weight}}
       </svg:text>
     </svg:g>

      <svg:circle
          class="node"
          [attr.fill]="node.color"
          cx="0"
          cy="0"
          [attr.r]="20">
      </svg:circle>
      <svg:text
          class="node-name"
          [attr.font-size]="25">
        {{node.id}}
      </svg:text>
      
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;
  get weight() {
    var sum = 0;
    this.node.links.forEach((l) => sum += l.distance);
    return sum;
  }

}
