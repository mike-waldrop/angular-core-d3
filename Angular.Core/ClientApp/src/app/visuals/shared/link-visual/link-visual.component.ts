import { Component, Input } from '@angular/core';
import { Link } from '../../../d3';

@Component({
  selector: '[linkVisual]',
  template: `
 <svg:g>
    <svg:line
        class="link"
        [attr.x1]="link.source.x"
        [attr.y1]="link.source.y"
        [attr.x2]="link.target.x"
        [attr.y2]="link.target.y">
   </svg:line>
   <svg:text [attr.font-size]="25" [attr.font-color]="red"
        [attr.x]="getMidPoint().x"
        [attr.y]="getMidPoint().y">
           {{link.distance}}
    </svg:text>
</svg:g>
  `,
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent {
  @Input('linkVisual') link: Link;
    
  getMidPoint() {
    let x = (this.link.source.x + this.link.target.x) / 2;
    let y = (this.link.source.y + this.link.target.y) / 2;
    return { x: x, y: y };
  }

  
}
