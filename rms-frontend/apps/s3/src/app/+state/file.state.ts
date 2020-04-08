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
import { ImmutableContext, ImmutableSelector } from '@ngxs-labs/immer-adapter';
import { Injectable } from '@angular/core';

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
@Injectable()
export class ExplorerState {
  @Selector()
  @ImmutableSelector()
  static currentSpace(state: ExplorerStateModel) {
    return state.files.filter(file => file.parent === state.currentRoot.id);
  }

  @Selector()
  @ImmutableSelector()
  static currentRoot(state: ExplorerStateModel) {
    return state.currentRoot;
  }

  @Action(UploadFiles)
  @ImmutableContext()
  uploadFiles(ctx: StateContext<ExplorerStateModel>, action: UploadFiles) {
    const state = ctx.getState();
    const files = state.files;
    files.push(...action.files);
    ctx.setState((hereState: ExplorerStateModel) => {
      hereState.files = files;
      return hereState;
    });
    //Add code to send files to server here
  }

  @Action(AddFolder)
  @ImmutableContext()
  addFolder(ctx: StateContext<ExplorerStateModel>, action: AddFolder) {
    const state = ctx.getState();
    const files = state.files;
    files.push(action.folder);
    ctx.setState((hereState: ExplorerStateModel) => {
      hereState.files = files;
      return hereState;
    });
    //Add code to send files to server here
  }
  @Action(DeleteFolder)
  @ImmutableContext()
  deleteFolder(ctx: StateContext<ExplorerStateModel>, action: DeleteFolder) {
    const state = ctx.getState();
    const files = state.files;
    ctx.setState((hereState: ExplorerStateModel) => {
      hereState.files = files.filter(
        entry => entry.id !== action.id && entry.parent !== action.id
      );
      return hereState;
    });
    //Add code to send files to server here
  }

  @Action(DeleteFile)
  @ImmutableContext()
  deleteFile(ctx: StateContext<ExplorerStateModel>, action: DeleteFile) {
    const state = ctx.getState();
    const files = state.files;
    const filteredFiles = files.filter(entry => entry.id !== action.id);
    ctx.setState((hereState: ExplorerStateModel) => {
      hereState.files = filteredFiles;
      return hereState;
    });
    //Add code to send files to server here
  }

  @Action(RenameFile)
  @ImmutableContext()
  renameFile(ctx: StateContext<ExplorerStateModel>, action: RenameFile) {
    const state = ctx.getState();
    const files = state.files;
    files.find(file => file.id === action.id).name = action.name;
    ctx.setState((hereState: ExplorerStateModel) => {
      hereState.files = files;
      return hereState;
    });
    //Add code to send files to server here
  }

  @Action(RenameFolder)
  @ImmutableContext()
  renameFolder(ctx: StateContext<ExplorerStateModel>, action: RenameFolder) {
    const state = ctx.getState();
    const files = state.files;
    files.find(file => file.id === action.id).name = action.name;
    ctx.setState((hereState: ExplorerStateModel) => {
      hereState.files = files;
      return hereState;
    });
    //Add code to send files to server here
  }

  @Action(MoveFolder)
  @ImmutableContext()
  moveFolder(ctx: StateContext<ExplorerStateModel>, action: MoveFolder) {
    const state = ctx.getState();
    const files = state.files;
    files.find(file => file.id === action.id).parent = action.parent;
    ctx.setState((hereState: ExplorerStateModel) => {
      hereState.files = files;
      return hereState;
    });
    //Add code to send files to server here
  }

  @Action(MoveFile)
  @ImmutableContext()
  moveFile(ctx: StateContext<ExplorerStateModel>, action: MoveFile) {
    const state = ctx.getState();
    const files = state.files;
    files.find(file => file.id === action.id).parent = action.parent;
    ctx.setState((hereState: ExplorerStateModel) => {
      hereState.files = files;
      return hereState;
    });
    //Add code to send files to server here
  }

  @Action(NavigateTo)
  @ImmutableContext()
  navigateTo(ctx: StateContext<ExplorerStateModel>, action: NavigateTo) {
    ctx.setState((hereState: ExplorerStateModel) => {
      hereState.currentRoot = action.folder;
      return hereState;
    });
    //Add code to send files to server here
  }

  @Action(NavigateUp)
  @ImmutableContext()
  navigateUp(ctx: StateContext<ExplorerStateModel>, action: NavigateUp) {
    const state = ctx.getState();
    const files = state.files;
    const newRoot = files.find(a => a.id === state.currentRoot.parent) || {
      id: 'root',
      name: 'Files',
      isFolder: true,
      parent: ''
    };
    ctx.setState((hereState: ExplorerStateModel) => {
      hereState.currentRoot = newRoot;
      return hereState;
    });
    //Add code to send files to server here
  }
}
