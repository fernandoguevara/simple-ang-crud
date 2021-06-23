import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, concatMap, switchMap } from 'rxjs/operators';
import { NotesService } from '../../data/service/notes.service';
import * as notesActions from "../action/notes.actions";
 
@Injectable()
export class NotesEffects {
 
  loadNotes$ = createEffect(() => this.actions$.pipe(
    ofType(notesActions.loadNotesBegin),
    mergeMap(() => this.notesService.getNotes()
      .pipe(
        map(notes => notesActions.loadNotesSuccess({notes})),
        catchError(error => of(notesActions.loadNotesFailure(error)))
      ))
    )
  );

  createNote$ = createEffect(() => this.actions$.pipe(
    ofType(notesActions.createNote),
      switchMap(action => {    
        return this.notesService.createNote(action.note).pipe(
          map((note) => {
              return notesActions.createNoteSucess({ note })
          }),
          catchError(error => {
            return of(notesActions.createNoteFailure({error}))
          })
        )
      })
  ));

  deleteNote$ = createEffect(() => this.actions$.pipe(
    ofType(notesActions.deleteNote),
      switchMap(action => {    
        return this.notesService.deleteNote(action.id).pipe(
          map(() => {
              return notesActions.deleteNoteSucess({id: action.id})
          }),
          catchError(error => {
            return of(notesActions.deleteNoteFailure({error}))
          })
        )
      })
  ));

  updateNote$ = createEffect(() => this.actions$.pipe(
    ofType(notesActions.updateNote),
      switchMap(action => {    
        return this.notesService.updateNote(action.id, action.note).pipe(
          map(() => {
              return notesActions.updateNoteSucess({id: action.id, note: action.note})
          }),
          catchError(error => {
            return of(notesActions.updateNoteFailure({error}))
          })
        )
      })
  ));
 
  constructor(
    private actions$: Actions,
    private notesService: NotesService
  ) {}
}