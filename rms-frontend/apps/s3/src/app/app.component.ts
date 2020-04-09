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
import * as CryptoJS from 'crypto-js';

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
  password = 'testpassword';
  serverkey = 'randomkey';

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

  fileSelected(file: FileElement) {
    alert(`You clicked ${file.name}`);
  }

  filesUploaded(files: FileElement[]) {
    const pathFolders: FileElement[] = [];
    const createfFolders: string[] = [];
    files.forEach((element, totalIndex) => {
      if (element.parent) {
        const path = element.parent.split('/');
        let previd = '';
        path.forEach((newFolderName, index, array) => {
          if (!createfFolders.includes(newFolderName)) {
            createfFolders.push(newFolderName);
            const folder = new FileElement();
            folder.isFolder = true;
            folder.name = newFolderName;
            if (index === 0) {
              folder.parent = this.currentRoot?.id || 'root';
            } else {
              if (previd.length) folder.parent = previd;
              else {
                folder.parent = pathFolders.find(
                  a => a.name === array[index - 1]
                ).id;
              }
            }
            folder.id = v4();
            previd = folder.id;
            this.store.dispatch(new AddFolder(folder));
            pathFolders.push(folder);
          }
        });
      }
    });
    this.store.dispatch(
      new UploadFiles(
        files.map(file => {
          file.id = v4();
          if (file.parent) {
            const filePath = file.parent.split('/');
            file.parent = pathFolders.find(
              folder => folder.name === filePath[filePath.length - 1]
            ).id;
          } else file.parent = this.currentRoot?.id || 'root';
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

  encrypt(file: FileElement) {
    const text = file.name;
    const encrypted = CryptoJS.AES.encrypt(text, this.password).toString();
    file.name = CryptoJS.AES.encrypt(
      encrypted.toString(),
      this.serverkey
    ).toString();
    this.store.dispatch(new RenameFile(file.id, file.name));
  }

  decrypt(file: FileElement) {
    if (file.name.startsWith('U2')) {
      const encrypted = file.name;
      let decrypted1 = CryptoJS.AES.decrypt(encrypted, this.serverkey);
      decrypted1 = decrypted1.toString(CryptoJS.enc.Utf8);
      const decrypted = CryptoJS.AES.decrypt(
        decrypted1.toString(),
        this.password
      );
      file.name = decrypted.toString(CryptoJS.enc.Utf8);
      this.store.dispatch(new RenameFile(file.id, file.name));
    } else alert(`File not encrypted`);
  }
}
