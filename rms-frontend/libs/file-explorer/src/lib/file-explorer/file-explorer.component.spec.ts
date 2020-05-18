import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExplorerComponent } from './file-explorer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '@rms-frontend/core';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileElement } from '../models/file-element';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EllipsisPipe } from '@rms-frontend/core';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        NgxFileDropModule
      ],
      declarations: [FileExplorerComponent, EllipsisPipe],
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
    component._fileElements = [];
    component.selected = [];
    component.path = 'Files';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.canNavigateUp).toBeFalsy();
    expect(component.dragged).toBeFalsy();
    expect(component._fileElements).toEqual([]);
    expect(component.path).toEqual('Files');
  });

  it('should set file elements', () => {
    const file = new FileElement();
    file.id = '1';
    file.isFolder = false;
    file.name = 'test';
    file.parent = 'root';
    component.fileElements = [file];
    expect(component._fileElements).toEqual([file]);
    expect(component.selected).toEqual([]);
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

  it('should ouput 5 delete events', () => {
    const removedEmitSpy = jest.spyOn(component.elementRemoved, 'emit');
    const file = new FileElement();
    file.id = '1';
    file.isFolder = false;
    file.name = 'test';
    file.parent = 'root';
    component.selected = [file, file, file, file, file];
    component.deleteElement(file);
    expect(removedEmitSpy).toHaveBeenLastCalledWith(file);
    expect(removedEmitSpy).toHaveBeenCalledTimes(5);
  });

  it('should ouput 2  by adding one delete events', () => {
    const removedEmitSpy = jest.spyOn(component.elementRemoved, 'emit');
    const file = new FileElement();
    file.id = '1';
    file.isFolder = false;
    file.name = 'test';
    file.parent = 'root';
    const file2 = new FileElement();
    file.id = '12';
    file.isFolder = false;
    file.name = 'test2';
    file.parent = 'root2';

    component.selected = [file];
    component.deleteElement(file2);
    expect(removedEmitSpy).toHaveBeenLastCalledWith(file2);
    expect(removedEmitSpy).toHaveBeenCalledTimes(2);
  });

  it('should ouput a navigate event', () => {
    const navigateEmitSpy = jest.spyOn(component.navigatedDown, 'emit');
    const file = new FileElement();
    file.id = '1';
    file.isFolder = true;
    file.name = 'test';
    file.parent = 'root';
    const mouseClick = new MouseEvent('click');
    component.navigate(file, mouseClick);
    expect(navigateEmitSpy).toHaveBeenLastCalledWith(file);
  });

  it('should add to selected', () => {
    const navigateEmitSpy = jest.spyOn(component.navigatedDown, 'emit');
    const file = new FileElement();
    file.id = '1';
    file.isFolder = true;
    file.name = 'test';
    file.parent = 'root';
    const mouseClick = { ctrlKey: true } as MouseEvent;
    component.navigate(file, mouseClick);
    expect(navigateEmitSpy).toHaveBeenCalledTimes(0);
    expect(component.selected).toEqual([file]);
  });

  it('should remove from selected', () => {
    const navigateEmitSpy = jest.spyOn(component.navigatedDown, 'emit');
    const file = new FileElement();
    file.id = '1';
    file.isFolder = true;
    file.name = 'test';
    file.parent = 'root';
    component.selected = [file];
    const mouseClick = { ctrlKey: true } as MouseEvent;
    component.navigate(file, mouseClick);
    expect(navigateEmitSpy).toHaveBeenCalledTimes(0);
    expect(component.selected).toEqual([]);
  });

  it('should ouput a file select event,', () => {
    const fileSelecteEmitSpy = jest.spyOn(component.fileSelected, 'emit');
    const file = new FileElement();
    file.id = '1';
    file.isFolder = false;
    file.name = 'test';
    file.parent = 'root';
    const mouseClick = new MouseEvent('click');
    component.navigate(file, mouseClick);
    expect(fileSelecteEmitSpy).toHaveBeenLastCalledWith(file);
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

  it('should ouput 5 moved events', () => {
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
    component.selected = [file, file, file, file, file];
    component.moveElement(file, file2);
    expect(moveEmitSpy).toHaveBeenLastCalledWith({
      element: file,
      moveTo: file2
    });
    expect(moveEmitSpy).toHaveBeenCalledTimes(5);
  });

  it('should ouput 2  by adding one moved events', () => {
    const moveEmitSpy = jest.spyOn(component.elementMoved, 'emit');
    const file = new FileElement();
    file.id = '1';
    file.isFolder = false;
    file.name = 'test';
    file.parent = 'root';
    const file2 = new FileElement();
    file.id = '12';
    file.isFolder = false;
    file.name = 'test2';
    file.parent = 'root';
    const file23 = new FileElement();
    file.id = '123';
    file.isFolder = true;
    file.name = 'test';
    file.parent = 'root';

    component.selected = [file23];
    component.moveElement(file, file2);
    expect(moveEmitSpy).toHaveBeenLastCalledWith({
      element: file,
      moveTo: file2
    });
    expect(moveEmitSpy).toHaveBeenCalledTimes(2);
  });

  it('should open the new folder dialog', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    component.openNewFolderDialog();
    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('should open the new folder dialog, and output a new folder', () => {
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of('NewFolder')
    });
    const newFolderEmitSpy = jest.spyOn(component.folderAdded, 'emit');
    component.openNewFolderDialog();
    expect(component.dialog.open).toHaveBeenCalled();
    expect(newFolderEmitSpy).toHaveBeenCalledWith({ name: 'NewFolder' });
  });

  it('should open the rename dialog', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    const renameEmitSpy = jest.spyOn(component.elementRenamed, 'emit');
    const file = new FileElement();
    file.id = '1';
    file.isFolder = false;
    file.name = 'test';
    file.parent = 'root';
    component.openRenameDialog(file);
    expect(component.dialog.open).toHaveBeenCalled();
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
    expect(component.dialog.open).toHaveBeenCalled();
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

  it('should ouput a encrypt event', () => {
    const encryptdEmitSpy = jest.spyOn(component.encryptEmitter, 'emit');
    const file = new FileElement();
    file.id = '1';
    file.isFolder = false;
    file.name = 'test';
    file.parent = 'root';
    component.encrypt(file);
    expect(encryptdEmitSpy).toHaveBeenLastCalledWith(file);
  });

  it('should ouput a decrypt event', () => {
    const decryptEmitSpy = jest.spyOn(component.decryptEmitter, 'emit');
    const file = new FileElement();
    file.id = '1';
    file.isFolder = false;
    file.name = 'test';
    file.parent = 'root';
    component.decrypt(file);
    expect(decryptEmitSpy).toHaveBeenLastCalledWith(file);
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
