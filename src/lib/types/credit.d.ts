export type ICredit = {
  _id: string;
  principalAmount: number;
  interestRate: number;
  currentInterestAmount: number;
  balance: number;
  creditDate: Date;
  dueDate: Date;
  settlements: ISettlement[];
  history: ICreditHistory[];
};

export type ISettlement = {
  _id: string;
  settlementAmount: number;
  interestAmount: number;
  settlementDate: Date;
};

export type ICreditHistory = {
  _id: string;
  type: "Settlement" | "Adjustment";
  date: Date;
  note: string;
};

export type ICreditSnapshot = {
  _id: string;
  principalAmount: number;
  balance: number;
  creditDate: Date;
  dueDate: Date;
};
