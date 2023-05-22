export interface CashReceipt {
    id: number;
    createdAt: Date;
    paymentOption: string;
    userId: string;
    bank: string;
    employeeId: number;
    amountTotal: number;
}