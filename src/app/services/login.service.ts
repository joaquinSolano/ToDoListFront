import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { getItem } from '../utils/storage';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}
login(request: JwtRequest) {
  return this.http.post(`https://todolist-backend-3.onrender.com/login`, request);
}
  verificar() {
    let token = getItem('token');
    return token != null;
  }
  showRole() {
    let token = getItem('token');
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }

}
