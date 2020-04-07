import { TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { ExplorerState } from './file.state';
import { FileElement } from '@rms-frontend/file-explorer';
import {
  UploadFiles,
  AddFolder,
  DeleteFolder,
  DeleteFile,
  RenameFolder,
  RenameFile,
  MoveFile,
  MoveFolder,
  NavigateTo,
  NavigateUp
} from './file.actions';
import { of } from 'rxjs';

export const DEFAULT_STATE = {
  explorer: {
    files: [],
    currentRoot: { id: 'root', name: 'Files', isFolder: true, parent: '' }
  }
};

describe('Explorer', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ExplorerState])]
    });
    store = TestBed.inject(Store);
    store.reset(DEFAULT_STATE);
  });
  it('adds files to state', () => {
    const filesToUpload: FileElement[] = [];
    for (let i = 0; i < 4; i++) {
      const folder = new FileElement();
      folder.isFolder = false;
      folder.name = `file${i}`;
      folder.parent = 'root';
      folder.id = i.toString();
      filesToUpload.push(folder);
    }
    store.dispatch(new UploadFiles(filesToUpload));
    let files = [...store.selectSnapshot(state => state.explorer.files)];
    expect(files).toEqual(filesToUpload);
    store.dispatch(new UploadFiles([filesToUpload[0]]));
    filesToUpload.push(filesToUpload[0]);
    files = store.selectSnapshot(state => state.explorer.files);
    expect(files).toEqual(filesToUpload);
  });
  it('adds a file then Deletes a file from state', () => {
    const file = new FileElement();
    file.isFolder = false;
    file.name = `file`;
    file.parent = 'root';
    file.id = '1';
    store.dispatch(new UploadFiles([file]));
    const oneFolder = store.selectSnapshot(state => state.explorer.files);
    expect(oneFolder).toEqual([file]);
    store.dispatch(new DeleteFile('1'));
    const empty = store.selectSnapshot(state => state.explorer.files);
    expect(empty).toEqual([]);
  });
  it('adds a file then renames the file in state', () => {
    const file = new FileElement();
    file.isFolder = true;
    file.name = `Folder`;
    file.parent = 'root';
    file.id = '1';
    store.dispatch(new UploadFiles([file]));
    const oneFile = store.selectSnapshot(state => state.explorer.files);
    expect(oneFile).toEqual([file]);
    store.dispatch(new RenameFile('1', 'NewName'));
    const renamedFolder = store.selectSnapshot(state => state.explorer.files);
    file.id = 'NewName';
    expect(renamedFolder).toEqual([file]);
  });
  it('adds a file and a folder then moves the file into the folder in  state', () => {
    const file = new FileElement();
    file.isFolder = false;
    file.name = `File`;
    file.parent = 'root';
    file.id = '1';
    const empty = store.selectSnapshot(state => state.explorer.files);
    expect(empty).toEqual([]);
    store.dispatch(new UploadFiles([file]));
    const oneFile = store.selectSnapshot(state => state.explorer.files);
    const folder = new FileElement();
    folder.isFolder = true;
    folder.name = `Folder`;
    folder.parent = 'root';
    folder.id = '2';
    store.dispatch(new AddFolder(folder));
    const oneFileOnFolder = store.selectSnapshot(state => state.explorer.files);
    expect(oneFileOnFolder).toEqual([file, folder]);
    store.dispatch(new MoveFile('1', '2'));
    const movedFile = store.selectSnapshot(state => state.explorer.files);
    file.parent = '2';
    expect(movedFile).toEqual([file, folder]);
  });
  it('adds folders to state', () => {
    const folder = new FileElement();
    folder.isFolder = true;
    folder.name = `Folder`;
    folder.parent = 'root';
    folder.id = '1';
    const empty = store.selectSnapshot(state => state.explorer.files);
    expect(empty).toEqual([]);
    store.dispatch(new AddFolder(folder));
    const oneFolder = store.selectSnapshot(state => state.explorer.files);
    expect(oneFolder).toEqual([folder]);
  });
  it('adds a folder then Deletes a folders from state', () => {
    const folder = new FileElement();
    folder.isFolder = true;
    folder.name = `Folder`;
    folder.parent = 'root';
    folder.id = '1';
    store.dispatch(new AddFolder(folder));
    const oneFolder = store.selectSnapshot(state => state.explorer.files);
    expect(oneFolder).toEqual([folder]);
    store.dispatch(new DeleteFolder('1'));
    const empty = store.selectSnapshot(state => state.explorer.files);
    expect(empty).toEqual([]);
  });
  it('adds a folder and a file inside then Deletes a folder from state', () => {
    const folder = new FileElement();
    folder.isFolder = true;
    folder.name = `Folder`;
    folder.parent = 'root';
    folder.id = '1';
    store.dispatch(new AddFolder(folder));
    const file = new FileElement();
    file.isFolder = false;
    file.name = `file`;
    file.parent = '1';
    file.id = '12';
    store.dispatch(new UploadFiles([file]));
    const folderAndFile = store.selectSnapshot(state => state.explorer.files);
    expect(folderAndFile).toEqual([folder, file]);
    store.dispatch(new DeleteFolder('1'));
    const empty = store.selectSnapshot(state => state.explorer.files);
    expect(empty).toEqual([]);
  });
  it('adds a folder then renames the folder in state', () => {
    const folder = new FileElement();
    folder.isFolder = true;
    folder.name = `Folder`;
    folder.parent = 'root';
    folder.id = '1';
    store.dispatch(new AddFolder(folder));
    const oneFolder = store.selectSnapshot(state => state.explorer.files);
    expect(oneFolder).toEqual([folder]);
    store.dispatch(new RenameFolder('1', 'NewName'));
    const renamedFolder = store.selectSnapshot(state => state.explorer.files);
    folder.name = 'NewName';
    expect(renamedFolder).toEqual([folder]);
  });
  it('adds 2 folders then moves one into the other in  state', () => {
    const folderOne = new FileElement();
    folderOne.isFolder = true;
    folderOne.name = `Folder`;
    folderOne.parent = 'root';
    folderOne.id = '1';
    store.dispatch(new AddFolder(folderOne));
    const folder = new FileElement();
    folder.isFolder = true;
    folder.name = `Folder`;
    folder.parent = 'root';
    folder.id = '2';
    store.dispatch(new AddFolder(folder));
    const twoFolders = store.selectSnapshot(state => state.explorer.files);
    expect(twoFolders[0]).toEqual(folderOne);
    expect(twoFolders[1]).toEqual(folder);
    store.dispatch(new MoveFolder('1', '2'));
    const movedFolder = store.selectSnapshot(state => state.explorer.files);
    folder.parent = '2';
    expect(movedFolder[0]).toEqual(folderOne);
    expect(movedFolder[1]).toEqual(folder);
  });
  it('adds a folder and navigates to it, and navigates up ', () => {
    const folder = new FileElement();
    folder.isFolder = true;
    folder.name = `Folder`;
    folder.parent = 'root';
    folder.id = '1';
    const empty = store.selectSnapshot(state => state.explorer.files);
    expect(empty).toEqual([]);
    store.dispatch(new AddFolder(folder));
    const oneFolder = store.selectSnapshot(state => state.explorer.files);
    expect(oneFolder).toEqual([folder]);
    store.dispatch(new NavigateTo(folder));
    const newRoot = store.selectSnapshot(state => state.explorer.currentRoot);
    expect(newRoot).toEqual(folder);
    store.dispatch(new NavigateUp());
    const upRoot = store.selectSnapshot(state => state.explorer.currentRoot);
    expect(upRoot).toEqual({
      id: 'root',
      name: 'Files',
      isFolder: true,
      parent: ''
    });
  });
});
