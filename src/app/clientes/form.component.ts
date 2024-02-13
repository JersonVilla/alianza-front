import { Component, OnInit } from '@angular/core';
import { Cliente } from './interfaces/cliente.interface';
import { ClienteService } from './services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  cliente: Cliente = {
    id: '',
    sharedKey: '',
    businessId: '',
    email: '',
    phone: '',
    dataAdd: new Date(),
  };

  titulo: string = 'Crear Cliente';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clienteService
          .getCliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe({
      next: () => {
        swal.fire(
          'Nuevo cliente',
          `El cliente ${this.cliente.sharedKey} ha sido creado con éxito`,
          'success'
        );
      },
      error: error => {
        swal.fire(
          'Nuevo cliente',
          `El cliente ${this.cliente.sharedKey} no ha sido creado con éxito`,
          'success'
        );
      }
    });
  }  

  update(): void {
    this.clienteService.update(this.cliente).subscribe((json) => {
      this.router.navigate(['/clientes']);
      swal.fire(
        'Cliente Actualizado',
        ``,
        'success'
      );
    });
  }
}
