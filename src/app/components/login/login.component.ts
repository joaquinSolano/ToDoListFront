import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from '../../models/jwtRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corregido: styleUrls en plural
})
export class LoginComponent implements OnInit {
  username: string = '';
  role: string = '';
  password: string = '';
  mensaje: string = '';

  constructor(
    private loginService: LoginService, // Corregido: renombrado para seguir la convención de camelCase
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  login(): void {
    const request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;

    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigate(['notes']);
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }
}