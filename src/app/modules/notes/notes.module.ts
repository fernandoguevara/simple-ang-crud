import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './page/notes/notes.component';
import { MaterialModule } from "../../shared/material.module";
import { CreateComponent } from './page/notes/create/create.component';
import { EditComponent } from './page/notes/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './page/notes/delete/delete.component';

@NgModule({
  declarations: [NotesComponent, CreateComponent, EditComponent, DeleteComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class NotesModule { }
