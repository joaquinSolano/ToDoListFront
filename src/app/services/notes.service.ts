import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Notes } from '../models/Notes';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private url=`https://todolist-backend-v32k.onrender.com/notes`
  private listacambio=new Subject<Notes[]>()
  constructor(private http:HttpClient) {}
  list(){
    return this.http.get<Notes[]>(this.url)
  }
  insert(notes:Notes){
    return this.http.post(this.url,notes)
  }
  getList(){
    return this.listacambio.asObservable()
  }
  setList(listaNueva:Notes[]){
    this.listacambio.next(listaNueva)
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  update(notes:Notes){
    return this.http.put(this.url,notes)
  }
  listId(id:number){
    return this.http.get<Notes>(`${this.url}/${id}`);
  }
}
