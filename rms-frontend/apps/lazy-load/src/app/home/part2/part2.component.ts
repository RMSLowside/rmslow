import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rms-frontend-part2',
  templateUrl: './part2.component.html',
  styleUrls: ['./part2.component.scss']
})
export class Part2Component implements OnInit {

  @Input() name: string;

  constructor() { }

  ngOnInit(): void {
  }

}
