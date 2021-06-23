import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NoteState } from "../reducer/notes.reducer";

export const selectState = createFeatureSelector<NoteState>("noteState");

export const selectNotes = createSelector(selectState, state => state.notes);