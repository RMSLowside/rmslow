import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExplorerComponent } from './file-explorer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '@rms-frontend/core';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileElement } from '../models/file-element';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

const fileUploadEvent = {
  srcElement: {
    files: [
      {
        name: 'TestFile1',
        lastModified: 1585922888960,
        lastModifiedDate: {},
        webkitRelativePath: '',
        size: 199,
        type: 'application/json'
      },
      {
        name: 'TestFile2',
        lastModified: 1585922888960,
        lastModifiedDate: {},
        webkitRelativePath: '',
        size: 199,
        type: 'application/json'
      },
      {
        name: 'TestFile3',
        lastModified: 1585922888960,
        lastModifiedDate: {},
        webkitRelativePath: '',
        size: 199,
        type: 'application/json'
      }
    ]
  }
};

class MatDialogMock {
  open() {
    return {
      afterClosed: () => of('')
    };
  }
}

describe('FileExplorerComponent', () => {
  let component: FileExplorerComponent;
  let fixture: ComponentFixture<FileExplorerComponent>;
  let dialog: MatDialogMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        NgxFileDropModule
      ],
      declarations: [FileExplorerComponent],
      providers: [
        {
          provide: MatDialog,
          useClass: MatDialogMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileExplorerComponent);
    component = fixture.componentInstance;
    component.canNavigateUp = false;
    component.dragged = false;
    component.fileElements = [];
    component.path = 'Files';
    dialog = TestBed.get(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.canNavigateUp).toBeFalsy();
    expect(component.dragged).toBeFalsy();
    expect(component.fileElements).toEqual([]);
    expect(component.path).toEqual('Files');
  });

  it('should ouput a delete event', () => {
    const removedEmitSpy = jest.spyOn(component.elementRemoved, 'emit');
    const file = new FileElement();
    file.id = '1';
    file.isFolder = false;
    file.name = 'test';
    file.parent = 'root';
    component.deleteElement(file);
    expect(removedEmitSpy).toHaveBeenLastCalledWith(file);
  });

  it('should ouput a navigate event', () => {
    const navigateEmitSpy = jest.spyOn(component.navigatedDown, 'emit');
    const file = new FileElement();
    file.id = '1';
    file.isFolder = true;
    file.name = 'test';
    file.parent = 'root';
    component.navigate(file);
    expect(navigateEmitSpy).toHaveBeenLastCalledWith(file);
  });
  it('should not ouput a navigate event, and alert', () => {
    const navigateEmitSpy = jest.spyOn(component.navigatedDown, 'emit');
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const file = new FileElement();
    file.id = '1';
    file.isFolder = false;
    file.name = 'test';
    file.parent = 'root';
    component.navigate(file);
    expect(navigateEmitSpy).toHaveBeenCalledTimes(0);
    expect(alertSpy).toHaveBeenCalledWith(`You clicked ${file.name}`);
  });

  it('should ouput a navigateup event', () => {
    const navigateUpEmitSpy = jest.spyOn(component.navigatedUp, 'emit');
    component.navigateUp();
    expect(navigateUpEmitSpy).toHaveBeenCalled();
  });

  it('should ouput a moved event', () => {
    const moveEmitSpy = jest.spyOn(component.elementMoved, 'emit');
    const file = new FileElement();
    file.id = '1';
    file.isFolder = true;
    file.name = 'test';
    file.parent = 'root';

    const file2 = new FileElement();
    file.id = '12';
    file.isFolder = true;
    file.name = 'test';
    file.parent = 'root';
    component.moveElement(file, file2);
    expect(moveEmitSpy).toHaveBeenLastCalledWith({
      element: file,
      moveTo: file2
    });
  });

  it('should open the new folder dialog', () => {
    spyOn(dialog, 'open').and.callThrough();
    component.openNewFolderDialog();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should open the new folder dialog, and output a new folder', () => {
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('NewFolder')
    });
    const newFolderEmitSpy = jest.spyOn(component.folderAdded, 'emit');
    component.openNewFolderDialog();
    expect(dialog.open).toHaveBeenCalled();
    expect(newFolderEmitSpy).toHaveBeenCalledWith({ name: 'NewFolder' });
  });

  it('should open the rename dialog', () => {
    spyOn(dialog, 'open').and.callThrough();
    const renameEmitSpy = jest.spyOn(component.elementRenamed, 'emit');
    const file = new FileElement();
    file.id = '1';
    file.isFolder = false;
    file.name = 'test';
    file.parent = 'root';
    component.openRenameDialog(file);
    expect(dialog.open).toHaveBeenCalled();
    expect(renameEmitSpy).toHaveBeenCalledTimes(0);
  });

  it('should open the rename dialog, and output a new name', () => {
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('NewName')
    });
    const renameEmitSpy = jest.spyOn(component.elementRenamed, 'emit');
    const file = new FileElement();
    file.id = '1';
    file.isFolder = false;
    file.name = 'test';
    file.parent = 'root';
    const renamed = new FileElement();
    renamed.id = '1';
    renamed.isFolder = false;
    renamed.name = 'NewName';
    renamed.parent = 'root';
    component.openRenameDialog(file);
    expect(dialog.open).toHaveBeenCalled();
    expect(renameEmitSpy).toHaveBeenCalledWith(renamed);
  });

  it('should format and emit FileElements', () => {
    const fileUploadEmitSpy = jest.spyOn(component.filesUploaded, 'emit');
    const fileElems = fileUploadEvent.srcElement.files.map(file => {
      const elem = new FileElement();
      elem.actualFile = (file as unknown) as File;
      elem.isFolder = false;
      elem.name = file.name;
      return elem;
    });
    component.uploadFile(fileUploadEvent);
    expect(fileUploadEmitSpy).toHaveBeenCalledWith(fileElems);
  });

  it('should get dropped files, format, and emit FileElements', () => {
    // Not sure how to test this one yet need to make a full NgxFileDropEntry[] and pass it in.
    // const fileUploadEmitSpy = jest.spyOn(component.filesUploaded, 'emit');
    // component.dropped();
    // expect(fileUploadEmitSpy).toHaveBeenCalledWith();
  });

  it('should right click the button and open the menu', () => {
    // Not sure how to test this one yet either. Need to pass in a fake click, element and viewChild
  });
});
