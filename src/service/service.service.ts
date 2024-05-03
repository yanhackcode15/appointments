import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceService {
  private readonly services = [
    { id: 1, name: 'Haircut' },
    { id: 2, name: 'Shampoo and Dry' }
  ];

  findAll() {
    return this.services;
  }
}
