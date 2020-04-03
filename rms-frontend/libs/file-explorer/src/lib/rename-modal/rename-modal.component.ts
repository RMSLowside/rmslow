import { Component, OnInit } from '@angular/core';

@Component({
  selector: 's3-rename-modal',
  templateUrl: './rename-modal.component.html',
  styleUrls: ['./rename-modal.component.scss']
})
export class RenameModalComponent implements OnInit {
  folderName: string;
  constructor() {}

  ngOnInit(): void {}
}
