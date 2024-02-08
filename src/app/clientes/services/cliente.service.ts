import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Cliente } from '../interfaces/cliente';
import { HttpApi } from '../models/http-api';

@Injectable()
export class ClienteService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {Cliente
    //return of(CLIENTES);
    return this.http.get(`${HttpApi.HOST_BASE}/${HttpApi.GET_CLIENTES}`).pipe(
      map(response => response as Cliente[])
    );
  }

  getCliente(id:number): Observable<Cliente>{
    return this.http.get<Cliente>(`${HttpApi.HOST_BASE}/${HttpApi.GET_CLIENTES}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post(`${HttpApi.HOST_BASE}/${HttpApi.GET_CLIENTES}`, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        /*if (e.status == 400) {
          return throwError(() => e);
        }*/

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${HttpApi.HOST_BASE}/${HttpApi.GET_CLIENTES}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        /*if (e.status == 400) {
          return throwError(() => e);
        }*/

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  searchClientsSharedKey(sharedKey: string): Observable<Cliente[]> {
    const params = { sharedKey: sharedKey };
    return this.http.get<Cliente[]>(`${HttpApi.HOST_BASE}/${HttpApi.GET_CLIENTES}/${HttpApi.GET_FILTRO}`, { params });
  }

}
