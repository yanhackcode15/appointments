// interfaces/customer.interface.ts
export interface Customer {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    notes: string;
    transactionHistory: TransactionHistory[];
}

interface TransactionHistory {
    date: Date;
    details: string;
}
