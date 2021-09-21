import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  customURL = 'http://localhost/banks_proyect/';

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get<any[]>(`${this.customURL}api_cliente/read_clientes.php`);
  }

  createClients(cc: string, name: string, tel: string) {
    const params = new HttpParams()
      .set('cedula', cc)
      .set('nombres', name)
      .set('telefono', tel);
console.log('params :>> ', params);
    return this.http.get<any[]>(`${this.customURL}api_cliente/create_cliente.php`, { params });
  }

}
