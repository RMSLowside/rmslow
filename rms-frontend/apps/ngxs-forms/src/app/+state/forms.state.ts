import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ImmutableContext, ImmutableSelector } from '@ngxs-labs/immer-adapter';
import { Injectable } from '@angular/core';

interface NovelsStateModel {
  newNovelForm: {
    model?: {
      novelName: string;
      authors: {
        name: string;
      }[];
    };
  };
}

@State<NovelsStateModel>({
  name: 'novels',
  defaults: {
    newNovelForm: {
      model: undefined
    }
  }
})
@Injectable()
export class NovelsState {}



interface FormStateModel {
  dynamicForm: {
    model?: {
      novelName: string;
      authors: {
        name: string;
      }[];
    };
  };
}

@State<FormStateModel>({
  name: 'forms',
  defaults: {
    dynamicForm: {
      model: undefined
    }
  }
})
@Injectable()
export class FormState {}