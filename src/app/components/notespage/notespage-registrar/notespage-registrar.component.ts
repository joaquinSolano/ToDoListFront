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
import { Router, ActivatedRoute, Params } from '@angular/router'; // Cambiado aquíimport { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notespage-registrar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './notespage-registrar.component.html',
  styleUrl: './notespage-registrar.component.css'
})
export class NotespageRegistrarComponent implements OnInit{
  form:FormGroup=new FormGroup([])
  listausers:User[]=[]
  notes:Notes= new Notes()
  edicion:boolean=false
  id:number=0;
  constructor(
    private formBuilder: FormBuilder,
    private nt:NotesService,
    private us: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ){}
  ngOnInit(): void {
      this.route.params.subscribe((data:Params)=>{
        this.id=data['id'];
        this.edicion=data['id']>0
        this.init()
      })
      this.form=this.formBuilder.group({
        nid:[''],
        ndescription:['',[Validators.required,Validators.minLength(10)]],
        nuser:['',[Validators.required]]
      })
      this.us.list().subscribe((data)=>{
        this.listausers=data
      })
  }
  insertar():void{
    if (this.form.valid) {
      this.notes.id=this.form.value.nid;
      this.notes.description = this.form.value.ndescription;
      this.notes.user.id = this.form.value.nuser;
      if (this.edicion) {
        this.nt.update(this.notes).subscribe((data) => {
          this.nt.list().subscribe((data) => {
            this.nt.setList(data);
          }); 
        });
      } else {
        this.nt.insert(this.notes).subscribe((data) => {
          this.nt.list().subscribe((data) => {
            this.nt.setList(data);
          });
        });
      }
      this.router.navigate(['notes']);
      this.snackBar.open('Se registro de manera exitosa', 'Cerrar', {
        duration: 3000,
      });
    } else {
      this.snackBar.open('Por favor, ingresa al menos 8 caracteres en nombre del rol.', 'Cerrar', {
        duration: 5000,
      });
    } 
  }
  init(){
    if(this.edicion){
      this.nt.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          nid:new FormControl(data.id),
          ndescription:new FormControl(data.description),
          nuser:new FormControl(data.user.id)
        })
      })
    }
  }
}
