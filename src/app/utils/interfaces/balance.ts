export interface Balance {
  available: BalanceContent[];
  pending: BalanceContent[];
}

export interface BalanceContent {
  amount: number;
  currency: string;
}
