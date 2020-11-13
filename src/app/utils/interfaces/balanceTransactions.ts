export interface BalanceTransaction {
  id: string;
  amount: number;
  net: number;
  available_on: string;
  created: string;
  currency: string;
  description: string;
  status: string;
  type: string;
}
