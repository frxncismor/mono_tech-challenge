export interface BalanceTransaction {
  id: string;
  amount: number;
  net: number;
  available_on: number;
  created: number;
  currency: string;
  description: string;
  status: string;
  type: string;
}
