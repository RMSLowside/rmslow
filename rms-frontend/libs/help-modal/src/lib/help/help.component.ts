import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rms-frontend-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  @Input() title: string = 'Help Modal';
  @Input() contents: any = [];

  loading: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  goToPage(link) {    
    console.log(link);
    window.location.href = link;
  }

}
