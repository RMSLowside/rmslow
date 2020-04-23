import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rms-frontend-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  @Input() title: string = 'Help Modal';
  @Input() contents: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
