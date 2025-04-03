import { Component, OnInit } from '@angular/core';
import { Notes } from '../../../models/Notes';
import { NotesService } from '../../../services/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notespage-listar',
  standalone: true,
  imports: [MatCardModule, MatIcon, CommonModule, RouterLink],
  templateUrl: './notespage-listar.component.html',
  styleUrls: ['./notespage-listar.component.css']
})
export class NotespageListarComponent implements OnInit {
  notes: Notes[] = [];
  username: string = '';
  role: string = '';

  constructor(
    private notesService: NotesService, // Renombrado para seguir la convención de camelCase
    private snackBar: MatSnackBar,
    private loginService: LoginService // Renombrado para mantener consistencia
  ) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username') || '';
    this.FilterRol(); // Esto cubre tanto la lista inicial como el filtrado por rol
  }
  
  private FilterRol(): void {
    this.username = sessionStorage.getItem('username') || '';
    this.role = this.loginService.showRole();
    // Asegúrate de que la lista solo se actualice cuando los datos estén completamente cargados
    this.filterrolList()
    this.filterrolGetList()

  }
  delete(id: number): void {
    this.notesService.delete(id).subscribe(
      () => {
        this.notesService.list().subscribe(data => {
          this.filterrolList()
          this.snackBar.open('Nota eliminada con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        });
      },
      error => {
        console.error('Error al eliminar la nota:', error);
        this.snackBar.open('Hubo un error al eliminar la nota', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    );

  }
  private filterrolList():void{
    this.notesService.list().subscribe(data => {
      switch (this.role) {
        case 'USER':
          this.notes = data.filter(note => note.user?.username === this.username);
          break;
        case 'ADMIN':
          this.notes = data; // Admin ve todo
          break;
        default:
          console.warn('Rol no reconocido:', this.role);
          this.notes = [];
          break;
      }
    });
  }
  private filterrolGetList():void{
    this.notesService.getList().subscribe(data => {
      switch (this.role) {
        case 'USER':
          this.notes = data.filter(note => note.user?.username === this.username);
          break;
        case 'ADMIN':
          this.notes = data; // Admin ve todo
          break;
        default:
          console.warn('Rol no reconocido:', this.role);
          this.notes = [];
          break;
      }
    });
  }
}