import { Component, OnInit, ViewChild } from '@angular/core';
import { Notes } from '../../../models/Notes';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NotesService } from '../../../services/notes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-notespage-listar',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule,MatPaginator],
  templateUrl: './notespage-listar.component.html',
  styleUrl: './notespage-listar.component.css'
})
export class NotespageListarComponent implements OnInit {
  datasource: MatTableDataSource<Notes> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2','accion01']; // Cambiado a 'displayedColumns'
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  username: string = '';
  role:string=''
  constructor(private Notes: NotesService,private snackBar: MatSnackBar,private login:LoginService) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username') || ''; // Recupera el nombre de usuario
    this.role = this.login.showRole();
  
    switch (this.role) {
      case 'USER':
        this.Notes.list().subscribe(data => {
          this.datasource = new MatTableDataSource(data.filter(note => note.user?.username === this.username)); // Compara el username con la lista recuperada
          this.datasource.paginator = this.paginator;
        });
        this.Notes.getList().subscribe(data => {
          this.datasource = new MatTableDataSource(data.filter(note => note.user?.username === this.username));
          this.datasource.paginator = this.paginator;
        });
        break;
  
      case 'ADMIN':
        this.Notes.list().subscribe(data => {
          this.datasource = new MatTableDataSource(data); // Muestra todos los datos para un administrador
          this.datasource.paginator = this.paginator;
        });
        this.Notes.getList().subscribe(data => {
          this.datasource = new MatTableDataSource(data);
          this.datasource.paginator = this.paginator;
        });
        break;
  
      default:
        console.warn('Role not recognized: ', this.role); // Manejo de caso no previsto
        break;
    }
  }
  
  delete(id: number) {
    this.Notes.delete(id).subscribe(
      (data) => {
        console.log('Respuesta de eliminación:', data);  
        this.Notes.list().subscribe((data) => {
          this.Notes.setList(data);
          this.snackBar.open('Nota eliminada con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        });
      },
      (error) => {
        console.error('Error al eliminar la nota:', error);  
        this.snackBar.open('Hubo un error al eliminar la nota ', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    );
  }
}
