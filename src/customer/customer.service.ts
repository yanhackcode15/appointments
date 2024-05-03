import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.interface';

@Injectable()
export class CustomerService {
  private readonly appointments: Appointment[] = [];  // In-memory storage for appointments

  // Method to create a new appointment and add it to the in-memory array
  create(appointment: Appointment) {
    this.appointments.push({ ...appointment, id: Math.random().toString(36).substring(7) });
    return appointment;
  }

  // Method to retrieve all appointments
  findAll(): Appointment[] {
    return this.appointments;
  }
}
