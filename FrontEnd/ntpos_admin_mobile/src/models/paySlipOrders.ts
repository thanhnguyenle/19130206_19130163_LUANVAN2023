export interface PaySlipOrderOutput {
  id: string;
  orderReturnID: string;
  total: number;
  totalReceive: number;
  totalReturn: number;
  status: string;
  description: string;
  paymentType: string;
  accountSend: string;
  accountReceive: string;
  createdAt: number;
}
