import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { FileElement } from '@rms-frontend/file-explorer';
import { Select, Store } from '@ngxs/store';
import { v4 } from 'uuid';
import {
  AddFolder,
  DeleteFile,
  DeleteFolder,
  MoveFolder,
  MoveFile,
  RenameFolder,
  UploadFiles,
  NavigateTo,
  NavigateUp,
  RenameFile
} from './+state/file.actions';
import { ExplorerState } from './+state/file.state';

@Component({
  selector: 's3-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 's3';
  fileElements: Observable<FileElement[]>;
  currentRoot: FileElement;
  currentPath: string;
  canNavigateUp = false;

  @Select(ExplorerState.currentSpace) files$: Observable<FileElement[]>;

  @Select(ExplorerState.currentRoot) root$: Observable<FileElement>;

  rootSub = this.root$.subscribe(a => {
    this.currentRoot = a;
    this.canNavigateUp = !!a?.parent;
  });

  ngOnInit(): void {
    const initialFolders: FileElement[] = [];
    for (let i = 0; i < 10; i++) {
      const folder = new FileElement();
      folder.isFolder = true;
      folder.name = `Folder${i}`;
      folder.parent = 'root';
      folder.id = v4();
      initialFolders.push(folder);
    }
    initialFolders.forEach(element => {
      this.store.dispatch(new AddFolder(element));
    });
  }

  constructor(public store: Store) {}

  addFolder(folder: { name: string }) {
    this.store.dispatch(
      new AddFolder({
        id: v4(),
        isFolder: true,
        name: folder.name,
        parent: this.currentRoot ? this.currentRoot.id : 'root'
      })
    );
  }

  removeElement(element: FileElement) {
    if (element.isFolder) this.store.dispatch(new DeleteFolder(element.id));
    else this.store.dispatch(new DeleteFile(element.id));
  }

  moveElement(event: { element: FileElement; moveTo: FileElement }) {
    if (event.element.isFolder)
      this.store.dispatch(new MoveFolder(event.element.id, event.moveTo.id));
    else this.store.dispatch(new MoveFile(event.element.id, event.moveTo.id));
  }

  renameElement(element: FileElement) {
    if (element.isFolder)
      this.store.dispatch(new RenameFolder(element.id, element.name));
    else this.store.dispatch(new RenameFile(element.id, element.name));
  }

  navigateUp() {
    this.store.dispatch(new NavigateUp());
    this.currentPath = this.popFromPath(this.currentPath) || 'Files';
  }

  navigateToFolder(element: FileElement) {
    this.store.dispatch(new NavigateTo(element));
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  filesUploaded(files: FileElement[]) {
    this.store.dispatch(
      new UploadFiles(
        files.map(file => {
          file.id = v4();
          file.parent = this.currentRoot?.id || 'root';
          return file;
        })
      )
    );
  }

  pushToPath(path: string, folderName: string) {
    if (path === 'Files') path = '';
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }

  popFromPath(path: string) {
    let p = path ? path : '';
    const split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }
}
