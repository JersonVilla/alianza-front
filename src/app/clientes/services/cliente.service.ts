import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Cliente, ClienteResponse } from '../interfaces/cliente.interface';
import { HttpApi } from '../models/http-api';

@Injectable()
export class ClienteService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<ClienteResponse>(`${HttpApi.HOST_BASE}/${HttpApi.GET_CLIENTES}`).pipe(
      map(response => {
        if (response.httpStatus === "OK") {
          return response.data.clientes;
        } else {
          throw new Error("Error en la solicitud");
        }
    })
    )
  }

  getCliente(id:number): Observable<Cliente>{
    return this.http.get<ClienteResponse>(`${HttpApi.HOST_BASE}/${HttpApi.GET_CLIENTES}/${id}`).pipe(
      map(response => {
        if (response.httpStatus !== "OK") {
          this.router.navigate(['/clientes']);
          throw new Error("Error en la solicitud");
        }
        return response.data.clientes[0];
    })
    )
  }

  create(cliente: Cliente) : Observable<void> {
    return this.http.post<ClienteResponse>(`${HttpApi.HOST_BASE}/${HttpApi.GET_CLIENTES}`, cliente, {headers: this.httpHeaders}).pipe(
      map(response => {
        if (response.httpStatus !== "OK") {
          throw new Error("Error en la solicitud");
        }
        this.router.navigate(['/clientes']);
        return;
    })
    )
  }

  update(cliente: Cliente): Observable<void>{
    return this.http.put<ClienteResponse>(`${HttpApi.HOST_BASE}/${HttpApi.GET_CLIENTES}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      map(response => {
        if (response.httpStatus !== "OK") {
          throw new Error("Error en la solicitud");
        }
        this.router.navigate(['/clientes']);
        return;
    })
    )
  }

  searchClientsSharedKey(sharedKey: string): Observable<Cliente[]> {
    const params = { sharedKey: sharedKey };
    return this.http.get<ClienteResponse>(`${HttpApi.HOST_BASE}/${HttpApi.GET_CLIENTES}/${HttpApi.GET_FILTRO}`, { params }).pipe(
      map(response => {
        if (response.httpStatus !== "OK") {
          throw new Error("Error en la solicitud");
        }
        return response.data.clientes;
    })
    );
  }

}
