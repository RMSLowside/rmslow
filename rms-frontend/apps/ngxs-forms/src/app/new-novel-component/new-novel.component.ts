import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NovelsState } from '../+state/forms.state'
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

@Component({
  selector: 'new-novel-form',
  templateUrl: './new-novel.component.html',
  styleUrls: ['./new-novel.component.scss']
})
export class NewNovelComponent implements OnInit {
  @Select(NovelsState) form$: Observable<any>;
  
  newNovelForm = new FormGroup({
    novelName: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    //
  }
}