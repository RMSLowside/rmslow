import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { FileElement } from '../models/file-element';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { NewFolderModalComponent } from '../new-folder-modal/new-folder-modal.component';
import { RenameModalComponent } from '../rename-modal/rename-modal.component';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry
} from 'ngx-file-drop';

@Component({
  selector: 'rms-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileExplorerComponent {
  constructor(public dialog: MatDialog) {}

  dragged: boolean;
  @Input() fileElements: FileElement[];
  @Input() canNavigateUp: string;
  @Input() path: string;

  @Output() folderAdded = new EventEmitter<{ name: string }>();
  @Output() filesUploaded = new EventEmitter<FileElement[]>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() elementRenamed = new EventEmitter<FileElement>();
  @Output() elementMoved = new EventEmitter<{
    element: FileElement;
    moveTo: FileElement;
  }>();
  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() navigatedUp = new EventEmitter();

  deleteElement(element: FileElement) {
    this.elementRemoved.emit(element);
  }

  navigate(element: FileElement) {
    if (element.isFolder) {
      this.navigatedDown.emit(element);
    } else {
      alert(`You clicked ${element.name}`);
    }
  }

  navigateUp() {
    this.navigatedUp.emit();
  }

  moveElement(element: FileElement, moveTo: FileElement) {
    this.elementMoved.emit({ element: element, moveTo: moveTo });
  }

  openNewFolderDialog() {
    let dialogRef = this.dialog.open(NewFolderModalComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.folderAdded.emit({ name: res });
      }
    });
  }

  openRenameDialog(element: FileElement) {
    let dialogRef = this.dialog.open(RenameModalComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        element.name = res;
        this.elementRenamed.emit(element);
      }
    });
  }

  setdraggedFalse() {
    setTimeout(() => {
      this.dragged = false;
    }, 1000);
  }
  openMenu(event: MouseEvent, element: FileElement, viewChild: MatMenuTrigger) {
    event.preventDefault();
    console.log('here');
    viewChild.openMenu();
  }

  uploadFile(event) {
    const files: FileList = event.srcElement.files;
    const fileArray: FileElement[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileElem = new FileElement();
      fileElem.actualFile = file;
      fileElem.isFolder = false;
      fileElem.name = file.name;
      fileArray.push(fileElem);
    }
    this.filesUploaded.emit(fileArray);
  }

  public dropped(files: NgxFileDropEntry[]) {
    const fileArray: FileElement[] = [];
    const total = files.length;
    let count = 0;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          count++;
          const fileElem = new FileElement();
          fileElem.actualFile = file;
          fileElem.isFolder = false;
          fileElem.name = file.name;
          fileElem.parent = this.path || 'root';
          fileArray.push(fileElem);
          if (count === total) this.filesUploaded.emit(fileArray);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
