export interface Transaction {
  transactionId: number;
  invoiceId: number;
  type: "AR" | "AP";
  transactionDate: string;
  description: string;
  amount: number;
  creationDate: string;
  name: string;
  referenceNumber: string;
}
