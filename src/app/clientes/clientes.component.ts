import { Component, OnInit } from '@angular/core';
import { Cliente } from './interfaces/cliente.interface';
import { ClienteService } from './services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent  implements OnInit{

  sharedKey: string;
  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }
  
  searchClients() {
    this.clienteService.searchClientsSharedKey(this.sharedKey)
      .subscribe(clientes => this.clientes = clientes);
  }

}
