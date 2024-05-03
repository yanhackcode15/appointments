import { Controller, Get } from '@nestjs/common';
import { ServiceService } from './service.service';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  getAllServices() {
    return this.serviceService.findAll();
  }
}
