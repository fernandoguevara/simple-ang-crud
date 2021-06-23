import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { from, Observable, of } from 'rxjs';
import { CreateComponent } from "../../modules/notes/page/notes/create/create.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private keycloak: KeycloakService,
    private router: Router
  ) { }

  isUserLogged$: Observable<boolean> = of(false);

  ngOnInit(): void {
    this.isUserLogged$ = from(this.keycloak.isLoggedIn());
  }

  onLogin(){
    this.keycloak.login();
  }

  onLogout(){
    this.keycloak.logout(window.location.origin);
  }

  onAdd(){
    const dialogRef = this.dialog.open(CreateComponent);
  }

  goNotes(){
    this.router.navigate(['notes']);
  }

}
