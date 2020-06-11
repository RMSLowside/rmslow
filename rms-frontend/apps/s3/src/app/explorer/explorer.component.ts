import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { FileElement } from '@rms-frontend/file-explorer';
import { Select, Store } from '@ngxs/store';
import { ExplorerState } from '../+state/file.state';
import { v4 } from 'uuid';
import {
  AddFolder,
  DeleteFolder,
  DeleteFile,
  MoveFolder,
  MoveFile,
  RenameFolder,
  RenameFile,
  NavigateUp,
  NavigateTo,
  UploadFiles
} from '../+state/file.actions';
import { EncryptService } from '../encrypt.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 's3-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit, OnDestroy {
  fileElements: Observable<FileElement[]>;
  currentRoot: FileElement;
  canNavigateUp = false;

  @Select(ExplorerState.currentSpace) files$: Observable<FileElement[]>;

  @Select(ExplorerState.currentRoot) root$: Observable<FileElement>;

  @Select(ExplorerState.currentPath) currentPath$: Observable<string>;

  rootSub = this.root$.subscribe(a => {
    this.currentRoot = a;
    this.canNavigateUp = !!a?.parent;
  });

  ngOnDestroy(): void {
    this.rootSub.unsubscribe();
  }

  ngOnInit(): void {
    const initialFolders: FileElement[] = [];
    if (this.store.selectSnapshot(state => state.explorer?.files.length) === 0)
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

  constructor(
    public store: Store,
    public encryptService: EncryptService,
    public logService: LoggerService
  ) {}

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
    const newParent = event.moveTo?.id || this.currentRoot.parent;
    if (event.element.isFolder)
      this.store.dispatch(new MoveFolder(event.element.id, newParent));
    else this.store.dispatch(new MoveFile(event.element.id, newParent));
  }

  renameElement(element: FileElement) {
    if (element.isFolder)
      this.store.dispatch(new RenameFolder(element.id, element.name));
    else this.store.dispatch(new RenameFile(element.id, element.name));
  }

  navigateUp() {
    this.store.dispatch(new NavigateUp());
  }

  navigateToFolder(element: FileElement) {
    this.store.dispatch(new NavigateTo(element));
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

  encrypt(file: FileElement) {
    const encryptedName = this.encryptService.encrypt(file.name);
    this.store.dispatch(new RenameFile(file.id, encryptedName));
  }

  decrypt(file: FileElement) {
    if (file.name.startsWith('U2')) {
      const decryptedName = this.encryptService.decrypt(file.name);
      this.store.dispatch(new RenameFile(file.id, decryptedName));
    } else alert(`File not encrypted`);
  }
}
