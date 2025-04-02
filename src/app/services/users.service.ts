import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url=`https://todolist-backend-v32k.onrender.com/users`
  private listacambio=new Subject<User[]>()
  constructor(private http:HttpClient) {}
    list(){
      return this.http.get<User[]>(this.url)
    }
    insert(users:User){
      return this.http.post(this.url,users)
    }
    getList(){
      return this.listacambio.asObservable()
    }
    setList(listaNueva:User[]){
      this.listacambio.next(listaNueva)
    }
    delete(id:number){
      return this.http.delete(`${this.url}/${id}`)
    }
    update(users:User){
      return this.http.put(this.url,users)
    }
}
