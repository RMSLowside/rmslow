import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'rms-frontend-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit, AfterViewInit {
  @Input() title: string = 'Help Modal';
  @Input() contents: any = [];

  loading: boolean = true;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<HelpComponent>) { }

  ngOnInit(): void {
    this.contents = this.contents.sort((a, b) => a.order - b.order)
  }

  ngAfterViewInit(): void {
    this.loading = false;
  }

  goToPage(link) {
    console.log(link);
    window.location.href = link;
  }

}
