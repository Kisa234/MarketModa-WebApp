import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/environments/environment';
import { Prenda } from '../model/prenda';
import { Observable } from 'rxjs';

const baseUrl = enviroment.base;

@Injectable({
  providedIn: 'root',
})
export class PrendaService {
  private url = `${baseUrl}/prendas`;

  private prendas: Prenda[];

  constructor(private http: HttpClient) {
    this.prendas = [];
  }

  agregarPrenda(prenda: Prenda): Observable<any> {
    return this.http.post(this.url, prenda);
  }

  listarPrendas(): Observable<Prenda[]> {
    return this.http.get<Prenda[]>(this.url);
  }

  listarPrendasPorIdCreador(idCreador: number): Observable<Prenda[]> {
    return this.http.get<Prenda[]>(`${this.url}?idCreador=${idCreador}`);
  }
  
  eliminarPrenda(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }

  editarPrenda(id: number, prendaActualizada: Prenda): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.put(url, prendaActualizada);
  }

  obtenerPrendaPorId(id: number): Observable<Prenda> {
    const url = `${this.url}/${id}`;
    return this.http.get<Prenda>(url);
  }
}
