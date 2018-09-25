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
           {{getDistance()}}
    </svg:text>
</svg:g>
  `,
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent {
  @Input('linkVisual') link: Link;
  distance: number;

  getDistance() {
    this.distance = Math.round(this.calcDistance(this.link.source, this.link.target));
    return this.distance;
  }

  getMidPoint() {
    let x = (this.link.source.x + this.link.target.x) / 2;
    let y = (this.link.source.y + this.link.target.y) / 2;
    return { x: x, y: y };
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
