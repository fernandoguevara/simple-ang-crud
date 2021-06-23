import { Action, createAction, props } from "@ngrx/store";
import { Note } from "../../data/model/note.model";

export const loadNotesBegin = createAction(
  '[Notes] Load Notes Begin'
);
 
export const loadNotesSuccess = createAction(
  '[Notes] Load Notes Success',
  props<{ notes: Note[] }>()
);
 
export const loadNotesFailure = createAction(
  '[Notes] Load Notes Failure',
  props<{ error: any }>()
);




export const createNote = createAction(
  '[Notes] Create Note',
  props<{ note: Partial<Note> }>()
);

export const createNoteSucess = createAction(
  '[Notes] Create Note Success',
  props<{ note: Partial<Note> }>()
);

export const createNoteFailure = createAction(
  '[Notes] Create Note Failture',
  props<{ error: any }>()
);




export const deleteNote = createAction(
  '[Notes] Delete Note',
  props<{ id: string }>()
);

export const deleteNoteSucess = createAction(
  '[Notes] Delete Note Success',
  props<{ id: string }>()
);

export const deleteNoteFailure = createAction(
  '[Notes] Delete Note Failture',
  props<{ error: any }>()
);




export const updateNote = createAction(
  '[Notes] Update Note',
  props<{ id:string, note: Partial<Note> }>()
);

export const updateNoteSucess = createAction(
  '[Notes] Update Note Success',
  props<{ id:string, note: Partial<Note> }>()
);

export const updateNoteFailure = createAction(
  '[Notes] Update Note Failture',
  props<{ error: any }>()
);