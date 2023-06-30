import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/environments/environment';
import { Comentarios } from '../model/comentarios';
import { Observable, Subject, map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
const baseUrl = enviroment.base;
@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private url = `${baseUrl}/comentarios`;
  private listaCambio = new Subject<Comentarios[]>();
  constructor(private http: HttpClient) {}
  list(): Observable<any> {
    console.log(this.url);
    return this.http.get<Comentarios[]>(this.url);
  }
  insert(Comentario: Comentarios) {
    return this.http.post(this.url, Comentario);
  }
  setList(listaNueva: Comentarios[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    this.listaCambio.asObservable();
  }
}
