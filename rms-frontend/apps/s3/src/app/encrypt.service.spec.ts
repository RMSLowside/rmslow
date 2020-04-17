import { TestBed } from '@angular/core/testing';

import { EncryptService } from './encrypt.service';
import { FileElement } from '@rms-frontend/file-explorer';
import { AppComponent } from './app.component';

describe('EncryptService', () => {
  let service: EncryptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it(`should encrypt the file and call rename`, () => {
    const toEncrypt = 'test';
    const encryptedText = service.encrypt(toEncrypt);
    expect(encryptedText).toEqual(expect.not.stringMatching(toEncrypt));
  });
  it(`should decrypt the file and call rename`, () => {
    const toEncrypt = 'test';
    const encryptedText = service.encrypt(toEncrypt);
    expect(encryptedText).toEqual(expect.not.stringMatching(toEncrypt));
    const decryptedText = service.decrypt(encryptedText);
    expect(encryptedText).not.toEqual(decryptedText);
    expect(toEncrypt).toEqual(decryptedText);
  });
});
