import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Notes } from '../../models/Notes';
import { NotesService } from '../../services/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotespageListarComponent } from "./notespage-listar/notespage-listar.component";

@Component({
  selector: 'app-notespage',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, NotespageListarComponent],
  templateUrl: './notespage.component.html',
  styleUrl: './notespage.component.css'
})
export class NotespageComponent {
  constructor(public route:ActivatedRoute){}
}
