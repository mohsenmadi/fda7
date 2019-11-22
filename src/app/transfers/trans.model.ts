export interface Trans {
  _id:string;
  accno: string;
  time: Date;
  amount: number;
  beneficiary?: string;
  jointAcc?: boolean
}
