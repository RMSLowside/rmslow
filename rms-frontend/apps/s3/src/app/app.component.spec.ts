import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@rms-frontend/core';
import { FileExplorerModule, FileElement } from '@rms-frontend/file-explorer';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        FileExplorerModule,
        NgxsModule.forRoot([])
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    spyOn(store, 'select').and.returnValue(of(null));
    spyOn(store, 'selectSnapshot').and.returnValue(null);
    spyOn(store, 'dispatch').and.returnValue(null);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 's3'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('s3');
  });
  it(`should ititialize by creating 10 folders`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledTimes(10);
  });
  it(`should call Addfolder`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.addFolder({ name: 'test' });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
  it(`should call deleteFolder`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const folder = new FileElement();
    folder.isFolder = true;
    folder.id = '1';
    app.removeElement(folder);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({ id: '1' });
  });
  it(`should call deleteFile`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const file = new FileElement();
    file.isFolder = false;
    file.id = '1';
    app.removeElement(file);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({ id: '1' });
  });
  it(`should call renameFile`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const file = new FileElement();
    file.isFolder = false;
    file.id = '1';
    file.name = 'newname';
    app.renameElement(file);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({ id: '1', name: 'newname' });
  });
  it(`should call renameFolder`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const folder = new FileElement();
    folder.isFolder = true;
    folder.id = '1';
    folder.name = 'newname';
    app.renameElement(folder);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({ id: '1', name: 'newname' });
  });
  it(`should call moveFile`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const file = new FileElement();
    file.isFolder = false;
    file.id = '1';
    const moveto = new FileElement();
    moveto.isFolder = true;
    moveto.id = '12';
    app.moveElement({ element: file, moveTo: moveto });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({ id: '1', parent: '12' });
  });
  it(`should call moveFile`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const folder = new FileElement();
    folder.isFolder = true;
    folder.id = '1';
    const moveto = new FileElement();
    moveto.isFolder = true;
    moveto.id = '12';
    app.moveElement({ element: folder, moveTo: moveto });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({ id: '1', parent: '12' });
  });
  it(`should call navigateUp`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.navigateUp();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
  it(`should call navigateTo`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const folder = new FileElement();
    folder.isFolder = true;
    folder.id = '1';
    app.navigateToFolder(folder);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({ folder: folder });
  });
  it(`should call uploadFiles`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const file = new FileElement();
    file.isFolder = false;
    file.id = '1';
    app.filesUploaded([file]);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({ files: [file] });
  });
  it(`should push to path`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const path = app.pushToPath('first/', 'second');
    expect(path).toEqual('first/second/');
  });
  it(`should make the path the second arg`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const path = app.pushToPath('Files', 'second');
    expect(path).toEqual('second/');
  });
  it(`should pop the last part of the path`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const path = app.popFromPath('first/second/');
    expect(path).toEqual('first/');
  });

  it(`should alert the file clicked`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const file = new FileElement();
    file.id = '1';
    file.isFolder = false;
    file.name = 'test';
    file.parent = 'root';
    app.fileSelected(file);
    expect(alertSpy).toHaveBeenCalledWith(`You clicked ${file.name}`);
  });
});
