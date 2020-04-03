import { State, Action, StateContext, Selector } from '@ngxs/store';
import { FileElement } from '@rms-frontend/file-explorer';
import {
  UploadFiles,
  AddFolder,
  DeleteFolder,
  DeleteFile,
  RenameFile,
  RenameFolder,
  MoveFolder,
  MoveFile,
  NavigateTo,
  NavigateUp
} from './file.actions';

export interface ExplorerStateModel {
  files: FileElement[];
  currentRoot: FileElement;
}

@State<ExplorerStateModel>({
  name: 'explorer',
  defaults: {
    files: [],
    currentRoot: { id: 'root', name: 'Files', isFolder: true, parent: '' }
  }
})
export class ExplorerState {
  @Selector()
  static currentSpace(state: ExplorerStateModel) {
    return state.files.filter(file => file.parent === state.currentRoot.id);
  }

  @Selector()
  static currentRoot(state: ExplorerStateModel) {
    return state.currentRoot;
  }

  @Action(UploadFiles)
  uploadFiles(ctx: StateContext<ExplorerStateModel>, action: UploadFiles) {
    const state = ctx.getState();
    const files = state.files;
    files.push(...action.files);
    ctx.patchState({
      files: files
    });
    //Add code to send files to server here
  }

  @Action(AddFolder)
  addFolder(ctx: StateContext<ExplorerStateModel>, action: AddFolder) {
    const state = ctx.getState();
    const files = state.files;
    files.push(action.folder);
    ctx.patchState({
      files: files
    });
    //Add code to send files to server here
  }
  @Action(DeleteFolder)
  deleteFolder(ctx: StateContext<ExplorerStateModel>, action: DeleteFolder) {
    const state = ctx.getState();
    const files = state.files;
    ctx.patchState({
      files: files.filter(
        entry => entry.id != action.id && entry.parent != action.id
      )
    });
    //Add code to send files to server here
  }

  @Action(DeleteFile)
  deleteFile(ctx: StateContext<ExplorerStateModel>, action: DeleteFile) {
    const state = ctx.getState();
    const files = state.files;
    const filteredFiles = files.filter(entry => entry.id != action.id);
    ctx.patchState({
      files: filteredFiles
    });
    //Add code to send files to server here
  }

  @Action(RenameFile)
  renameFile(ctx: StateContext<ExplorerStateModel>, action: RenameFile) {
    const state = ctx.getState();
    const files = state.files;
    files.find(file => file.id === action.id).name = action.name;
    ctx.patchState({
      files: files
    });
    //Add code to send files to server here
  }

  @Action(RenameFolder)
  renameFolder(ctx: StateContext<ExplorerStateModel>, action: RenameFolder) {
    const state = ctx.getState();
    const files = state.files;
    files.find(file => file.id === action.id).name = action.name;
    ctx.patchState({
      files: files
    });
    //Add code to send files to server here
  }

  @Action(MoveFolder)
  moveFolder(ctx: StateContext<ExplorerStateModel>, action: MoveFolder) {
    const state = ctx.getState();
    const files = state.files;
    files.find(file => file.id === action.id).parent = action.parent;
    ctx.patchState({
      files: files
    });
    //Add code to send files to server here
  }

  @Action(MoveFile)
  moveFile(ctx: StateContext<ExplorerStateModel>, action: MoveFile) {
    const state = ctx.getState();
    const files = state.files;
    files.find(file => file.id === action.id).parent = action.parent;
    ctx.patchState({
      files: files
    });
    //Add code to send files to server here
  }

  @Action(NavigateTo)
  navigateTo(ctx: StateContext<ExplorerStateModel>, action: NavigateTo) {
    ctx.patchState({
      currentRoot: action.folder
    });
    //Add code to send files to server here
  }

  @Action(NavigateUp)
  navigateUp(ctx: StateContext<ExplorerStateModel>, action: NavigateUp) {
    const state = ctx.getState();
    const files = state.files;
    const newRoot = files.find(a => a.id === state.currentRoot.parent) || {
      id: 'root',
      name: 'Files',
      isFolder: true,
      parent: ''
    };
    ctx.patchState({
      currentRoot: newRoot
    });
    //Add code to send files to server here
  }
}
