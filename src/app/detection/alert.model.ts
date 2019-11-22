export interface Alert {
  id: string;
  acctno: string;
  name: string;
  amount: number;
  transfers: number;
  date?: Date;
  risk?: 'low' | 'high' | null;
  decision?: 'release' | 'hold' | null;
}
