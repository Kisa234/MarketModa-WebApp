import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';
import { Observable, Subject, map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
const baseUrl = enviroment.base;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = `${baseUrl}/usuarios`;
  private listaCambio = new Subject<Usuario[]>();
  constructor(private http: HttpClient) {}
  list(): Observable<any> {
    console.log(this.url);
    return this.http.get<Usuario[]>(this.url);
  }
  insert(Usuario: Usuario) {
    return this.http.post(this.url, Usuario);
  }
  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    this.listaCambio.asObservable();
  }
}
