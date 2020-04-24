import { Component, OnInit, Input, NgModule } from '@angular/core';
import { CoreModule } from '@rms-frontend/core';

@Component({
  selector: 'rms-frontend-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.scss']
})
export class Part1Component implements OnInit {
  @Input() name: string = '';

  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  declarations: [Part1Component],
  imports: [CoreModule]
})
class Part1ComponentModule {}
