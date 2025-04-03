import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../models/User';
import { Notes } from '../../../models/Notes';
import { NotesService } from '../../../services/notes.service';
import { UsersService } from '../../../services/users.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-notespage-registrar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    NgIf,
    MatCard
  ],
  templateUrl: './notespage-registrar.component.html',
  styleUrls: ['./notespage-registrar.component.css'] // Corregido: Cambiado a styleUrls
})
export class NotespageRegistrarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listausers: User[] = [];
  listanotes: Notes[] = [];
  notes: Notes = new Notes();
  edicion: boolean = false;
  id: number = 0;
  

  constructor(
    private formBuilder: FormBuilder,
    private notesService: NotesService, // Renombrado para seguir convención camelCase
    private usersService: UsersService, // Renombrado para consistencia
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id > 0;
      this.init();
    });
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] > 0;
      this.init();
    });
    this.form = this.formBuilder.group({
      Id: [''],
      Description: ['', [Validators.required, Validators.minLength(3),, Validators.maxLength(20)]],
      Userid: ['', [Validators.required]]
    });
    this.usersService.list().subscribe((data) => {
      this.listausers = data;
    });
    this.notesService.list().subscribe((data) => {
      this.listanotes = data;
    });
  }
  
  insertar(): void {
    if (this.form.valid) {
      this.notes.id = this.form.value.Id;
      this.notes.description = this.form.value.Description;
      this.notes.user.id = this.form.value.Userid;
      if (this.edicion) {
        this.notesService.update(this.notes).subscribe((data) => {
          this.notesService.list().subscribe((data) => {
            this.notesService.setList(data);
          }); 
        });
      } else {
        this.notesService.insert(this.notes).subscribe((data) => {
          this.notesService.list().subscribe((data) => {
            this.notesService.setList(data);
          });
        });
      }
      this.navigateAndRefresh();
      this.snackBar.open('Se registro de manera exitosa', 'Cerrar', {
        duration: 3000,
      });
    }
  }
  private navigateAndRefresh(): void {
    this.notesService.list().subscribe(data => {
      this.notesService.setList(data); // Esto actualiza la lista global compartida
      this.router.navigate(['notes']); // Redirige después de actualizar los datos
    });
    this.snackBar.open('Operación exitosa', 'Cerrar', { duration: 3000 });
  }
  
  init(){
    if(this.edicion){
      this.notesService.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          Id:new FormControl(data.id),
          Description: new FormControl(data.description),
          Userid: new FormControl(data.user.id)
        })
      })
    }
  }
}