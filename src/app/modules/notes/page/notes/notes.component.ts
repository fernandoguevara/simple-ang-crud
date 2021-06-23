import { Component, OnInit } from '@angular/core';
import { Note } from "../../../../data/model/note.model";
import { transition, trigger, state, style, animate } from "@angular/animations";
import {MatDialog} from '@angular/material/dialog';
import { NotesService } from "../../../../data/service/notes.service";
import { DeleteComponent } from "./delete/delete.component";
import { EditComponent } from "./edit/edit.component";
import { Store } from "@ngrx/store";
import { NoteState } from "../../../../core/reducer/notes.reducer";
import * as notesActions from "../../../../core/action/notes.actions";
import { selectNotes } from "../../../../core/selector/notes.selectors";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  animations: [
    trigger('fade', [      
      transition('void => *', [
        style({opacity: 0}),
        animate(1000, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(1000, style({opacity: 0}))
      ])
    ])
  ]
})
export class NotesComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private notesService: NotesService,
    private store: Store<NoteState>
    ) { }

  notes$ = this.store.select(selectNotes);

  ngOnInit(): void {
    this.store.dispatch(notesActions.loadNotesBegin());
  }

  onEdit(note: Partial<Note>){

    const dialogRef = this.dialog.open(EditComponent, {
      data: {
        id: note?.id,
        userId: note?.userId,
        title: note?.title,
        description: note?.description
      }
    });
  }

  onDelete(note: Partial<Note>){

    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        id: note?.id,
        userId: note?.userId,
        title: note?.title,
        description: note?.description
      }
    });
  }

}
