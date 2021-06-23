import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { NoteState } from '../../../../../core/reducer/notes.reducer';
import { NotesService } from '../../../../../data/service/notes.service';
import { Note } from '../../../../../data/model/note.model';
import * as notesActions from "../../../../../core/action/notes.actions";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Note,
    private fb: FormBuilder,
    private notesService: NotesService,
    public dialogRef: MatDialogRef<EditComponent>,
    private store: Store<NoteState>
    ) { }

  noteForm = this.fb.group({
    title: ['', Validators.compose([
              Validators.required, Validators.minLength(5), Validators.maxLength(200)
          ])],
    description: ['', Validators.compose([
            Validators.required, Validators.minLength(10), Validators.maxLength(500)
        ])],
  });

  ngOnInit(): void {
    this.notesService.getNote(this.data.id)
      .subscribe(resp => {
        this.noteForm.patchValue({
          title: resp.title,
          description: resp.description
        });
      });
  }

  onSubmit(){

    this.data.title = this.noteForm.get("title")?.value;
    this.data.description = this.noteForm.get("description")?.value;

    this.store.dispatch(notesActions.updateNote({id: this.data.id, note: this.data}));
    this.dialogRef.close();
  }

}
