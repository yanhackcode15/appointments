export interface Appointment {
    id?: string;  // Optional, will be assigned in the service
    clientName: string;
    phoneNumber: string;
    time: Date;
  }
//  In NestJS, as in TypeScript in general, an interface is a construct that defines the shape of an object.
//id?: denotes it's optional