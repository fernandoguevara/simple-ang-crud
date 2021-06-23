import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from "./layout/not-found/not-found.component";
import { AuthGuard } from "./core/guard/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: "home",
    loadChildren: () => 
      import("./modules/home/home.module")
      .then(m => m.HomeModule)
  },
  {
    path: "notes",
    loadChildren: () => 
      import("./modules/notes/notes.module")
      .then(m => m.NotesModule),
      canActivate: [AuthGuard], data: { roles: ['admin'] }
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
