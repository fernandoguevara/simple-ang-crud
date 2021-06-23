import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotesService } from '../../../../../data/service/notes.service';
import { Note } from "../../../../../data/model/note.model";
import { Store } from "@ngrx/store";
import { NoteState } from '../../../../../core/reducer/notes.reducer';
import * as notesActions from "../../../../../core/action/notes.actions";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public note: Note,
    private notesService: NotesService,
    public dialogRef: MatDialogRef<DeleteComponent>,
    private store: Store<NoteState>
    ) { }

  ngOnInit(): void {
  }

  onAccept(){
    this.store.dispatch(notesActions.deleteNote({id: this.note.id}));
    this.dialogRef.close();
  }

}
