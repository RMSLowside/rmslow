import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  password = 'testpassword';
  serverkey = 'randomkey';

  constructor() {}

  encrypt(stringToEncrypt: string) {
    const text = stringToEncrypt;
    const encrypted = CryptoJS.AES.encrypt(text, this.password).toString();
    return CryptoJS.AES.encrypt(
      encrypted.toString(),
      this.serverkey
    ).toString();
  }

  decrypt(stringToDecrypt: string) {
    const encrypted = stringToDecrypt;
    let decrypted1 = CryptoJS.AES.decrypt(encrypted, this.serverkey);
    decrypted1 = decrypted1.toString(CryptoJS.enc.Utf8);
    const decrypted = CryptoJS.AES.decrypt(
      decrypted1.toString(),
      this.password
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
