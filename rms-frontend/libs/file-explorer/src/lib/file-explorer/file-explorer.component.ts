import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ComponentFactoryResolver,
  HostListener
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
  // tslint:disable-next-line: component-selector
  selector: 'rms-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileExplorerComponent {
  @HostListener('document: dragover', ['$event'])
  onDragStart(ev: DragEvent) {
    if (ev.dataTransfer.types.includes('Files')) this.dragged = true;
  }
  constructor(public dialog: MatDialog) {}

  dragged: boolean;
  selected: FileElement[] = [];
  _fileElements: FileElement[] = [];
  @Input('fileElements')
  set fileElements(value: FileElement[]) {
    this._fileElements = value;
    this.selected = [];
  }
  @Input() canNavigateUp: boolean;
  @Input() path: string;

  @Output() folderAdded = new EventEmitter<{ name: string }>();
  @Output() filesUploaded = new EventEmitter<FileElement[]>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() elementRenamed = new EventEmitter<FileElement>();
  @Output() elementMoved = new EventEmitter<{
    element: FileElement;
    moveTo?: FileElement;
  }>();
  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() fileSelected = new EventEmitter<FileElement>();
  @Output() navigatedUp = new EventEmitter();
  @Output() encryptEmitter = new EventEmitter<FileElement>();
  @Output() decryptEmitter = new EventEmitter<FileElement>();

  deleteElement(element: FileElement) {
    if (this.selected.length) {
      if (!this.selected.includes(element)) this.selected.push(element);
      this.selected.forEach(elem => {
        this.elementRemoved.emit(elem);
      });
    } else this.elementRemoved.emit(element);
  }

  navigate(element: FileElement, event: MouseEvent) {
    if (event.ctrlKey) {
      this.selected = this.toggleInArray(this.selected, element);
    } else {
      this.selected = [];
      if (element.isFolder) {
        this.navigatedDown.emit(element);
      } else {
        this.fileSelected.emit(element);
      }
    }
  }

  navigateUp() {
    this.navigatedUp.emit();
  }

  moveElement(element: FileElement, moveTo: FileElement) {
    if (this.selected.length) {
      if (!this.selected.includes(element)) this.selected.push(element);
      this.selected.forEach(elem => {
        this.elementMoved.emit({ element: elem, moveTo: moveTo });
      });
    } else this.elementMoved.emit({ element: element, moveTo: moveTo });
  }

  openNewFolderDialog() {
    const dialogRef = this.dialog.open(NewFolderModalComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.folderAdded.emit({ name: res });
      }
    });
  }

  openRenameDialog(element: FileElement) {
    const dialogRef = this.dialog.open(RenameModalComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        element.name = res;
        this.elementRenamed.emit(element);
      }
    });
  }

  openMenu(event: MouseEvent, element: FileElement, viewChild: MatMenuTrigger) {
    event.preventDefault();
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

  public dropped(files: NgxFileDropEntry[], element?: FileElement) {
    const fileArray: FileElement[] = [];
    const total = files.length;
    let count = 0;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          let relPath = droppedFile.relativePath;
          const pathArray = relPath.split('/');
          pathArray.pop();
          relPath = pathArray.join('/');
          count++;
          const fileElem = new FileElement();
          fileElem.actualFile = file;
          fileElem.isFolder = false;
          fileElem.name = file.name;
          fileElem.parent = relPath;
          fileArray.push(fileElem);
          if (count === total) this.filesUploaded.emit(fileArray);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  public fileOver(event) {
    //Add any fileOver code
  }

  public fileLeave(event) {
    //Add any fileLeave code
  }

  encrypt(file: FileElement) {
    this.encryptEmitter.emit(file);
  }

  decrypt(file: FileElement) {
    this.decryptEmitter.emit(file);
  }

  private toggleInArray(array: any[], element: any) {
    const index = array.indexOf(element);
    if (index === -1) {
      array.push(element);
    } else {
      array.splice(index, 1);
    }
    return array;
  }
}
