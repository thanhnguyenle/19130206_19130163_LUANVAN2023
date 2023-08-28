interface ReceiptOrderOutput {
  id: string;
  orderID: string;
  total: number;
  totalReceive: number;
  totalReturn: number;
  status: string;
  description: string;
  paymentType: string;
  createdAt: string;
}
export default ReceiptOrderOutput;
