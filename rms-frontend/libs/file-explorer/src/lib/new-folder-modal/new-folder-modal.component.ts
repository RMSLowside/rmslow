import { Component, OnInit } from '@angular/core';

@Component({
  selector: 's3-new-folder-modal',
  templateUrl: './new-folder-modal.component.html',
  styleUrls: ['./new-folder-modal.component.scss']
})
export class NewFolderModalComponent implements OnInit {
  folderName: string;

  constructor() {}

  ngOnInit(): void {}
}
