import { async, TestBed } from '@angular/core/testing';
import { FileExplorerModule } from './file-explorer.module';

describe('FileExplorerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FileExplorerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FileExplorerModule).toBeDefined();
  });
});
