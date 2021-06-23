import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NotesService } from "../../../../../data/service/notes.service";
import { Note } from "../../../../../data/model/note.model";
import {MatDialogRef} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { NoteState } from '../../../../../core/reducer/notes.reducer';
import * as notesActions from "../../../../../core/action/notes.actions";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    public dialogRef: MatDialogRef<CreateComponent>,
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
  }

  onSubmit(){
    const note: Partial<Note> = {
      title: this.noteForm.get("title")?.value,
      description: this.noteForm.get("description")?.value
    };

    this.store.dispatch(notesActions.createNote({note}));
    this.dialogRef.close();
  }

}
