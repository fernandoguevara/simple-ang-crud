import { createReducer, on, Action, State, createSelector, createFeatureSelector } from '@ngrx/store';
import * as notesActions from '../action/notes.actions';
import { Note } from '../../data/model/note.model';

export interface NoteState {
  notes: Partial<Note>[];
  loading: boolean;
  error: any;
}

export const initialState: NoteState = {
  notes: [],
  loading: false,
  error: null
};

export const notesReducer = createReducer(
  initialState,
  on(notesActions.loadNotesBegin, (state) => 
    ({
      ...state,
      loading: true,
      error: null
    })
  ),
  on(notesActions.loadNotesSuccess, (state, {notes}) =>
    ({
      ...state,
      loading: false,
      notes: notes
    })
  ),
  on(notesActions.loadNotesFailure, (state, {error}) => 
    ({
      ...state,
      loading: false,
      error: error
    })
  ),


  on(notesActions.createNote, (state) => 
    ({
      ...state,
      loading: true,
      error: null
    })
  ),
  on(notesActions.createNoteSucess, (state, {note}) => 
    ({
      ...state,
      notes: [...state.notes, note],
      loading: false,
    })
  ),
  on(notesActions.createNoteFailure, (state, {error}) => 
    ({
      ...state,
      loading: false,
      error: error
    })
  ),


  on(notesActions.deleteNote, (state) => 
    ({
      ...state,
      loading: true,
      error: null
    })
  ),
  on(notesActions.deleteNoteSucess, (state, {id}) => 
    ({
      ...state,
      notes: state.notes.filter(i => i.id != id),
      loading: false
    })
  ),
  on(notesActions.updateNoteFailure, (state, {error}) => 
    ({
      ...state,
      loading: false,
      error: error
    })
  ),


  on(notesActions.updateNote, (state) => 
    ({
      ...state,
      loading: true,
      error: null
    })
  ),
  on(notesActions.updateNoteSucess, (state, {id, note}) => 
    ({
      ...state,
      notes: state.notes.map(i => i.id == id ? note : i),
      loading: false
    })
  ),
  on(notesActions.updateNoteFailure, (state, {error}) => 
    ({
      ...state,
      loading: false,
      error: error
    })
  ),
);


