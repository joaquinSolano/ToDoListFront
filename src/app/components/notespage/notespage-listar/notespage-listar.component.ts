import { Component, OnInit, ViewChild } from '@angular/core';
import { Notes } from '../../../models/Notes';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NotesService } from '../../../services/notes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notespage-listar',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule,MatPaginator],
  templateUrl: './notespage-listar.component.html',
  styleUrl: './notespage-listar.component.css'
})
export class NotespageListarComponent implements OnInit {
  datasource: MatTableDataSource<Notes> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2']; // Cambiado a 'displayedColumns'
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  username: string = '';
  constructor(private Notes: NotesService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username') || ''; // Recupera el nombre de usuario
    this.Notes.list().subscribe(data => {
      this.datasource = new MatTableDataSource(data.filter(note => note.user?.username === this.username));
      this.datasource.paginator = this.paginator
    });
    this.Notes.getList().subscribe(data => {
      this.datasource = new MatTableDataSource(data.filter(note => note.user?.username === this.username));
      this.datasource.paginator = this.paginator
    });
  }
}
