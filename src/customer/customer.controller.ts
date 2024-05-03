import { Controller, Get, Post, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Appointment } from './appointment.interface';
import { CreateAppointmentDto } from './dto/createAppointments.dto';
import { from } from 'rxjs';

@Controller('customers') //route '/customers'
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // HTTP POST endpoint to create a new appointment
  @Post()
  create(@Body() CreateAppointmentDto: CreateAppointmentDto) {
    return this.customerService.create(CreateAppointmentDto);
  }

  // HTTP GET endpoint to retrieve all appointments
  @Get()
  findAll(): Appointment[] {
    return this.customerService.findAll();
  }
}
