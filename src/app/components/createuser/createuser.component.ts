import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../models/User';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createuser',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './createuser.component.html',
  styleUrl: './createuser.component.css',
})
export class CreateuserComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listausers: User[] = [];
  id: number = 0;
  users: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService, // Renombrado para consistencia
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
    });
    this.form = this.formBuilder.group({
      Id: [''],
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
    this.usersService.list().subscribe((data) => {
      this.listausers = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.users.id = this.form.value.Id;
      this.users.username = this.form.value.Username;
      this.users.password = this.form.value.Password;

      this.usersService.insert(this.users).subscribe((data) => {
        this.usersService.list().subscribe((data) => {
          this.usersService.setList(data);
        });
      });
    }
    this.router.navigate(['login']);
    this.snackBar.open('Se registro de manera exitosa', 'Cerrar', {
      duration: 3000,
    });
  }
}
