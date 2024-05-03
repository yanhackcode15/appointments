import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { CustomerService} from '../customer/customer.service';

@Injectable()
export class AuthService {
  private customers = new Map<string, any>();

  signIn(phoneNumber: string): any {
    if (!this.customers.has(phoneNumber)) {
      return { isNewCustomer: true };
    }
    return { isNewCustomer: false, customer: this.customers.get(phoneNumber) };
  }

  onboardCustomer(phoneNumber: string, details: any): any {
    this.customers.set(phoneNumber, details);
    return { success: true, customer: details };
  }
}
